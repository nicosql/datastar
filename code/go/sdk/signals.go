package datastar

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/valyala/bytebufferpool"
)

var (
	ErrNoPathsProvided = errors.New("no paths provided")
)

type MergeSignalsOptions struct {
	EventID       string
	RetryDuration time.Duration
	OnlyIfMissing bool
}

type MergeSignalsOption func(*MergeSignalsOptions)

func WithMergeSignalsEventID(id string) MergeSignalsOption {
	return func(o *MergeSignalsOptions) {
		o.EventID = id
	}
}

func WithMergeSignalsRetryDuration(retryDuration time.Duration) MergeSignalsOption {
	return func(o *MergeSignalsOptions) {
		o.RetryDuration = retryDuration
	}
}

func WithOnlyIfMissing(onlyIfMissing bool) MergeSignalsOption {
	return func(o *MergeSignalsOptions) {
		o.OnlyIfMissing = onlyIfMissing
	}
}

func (sse *ServerSentEventGenerator) MergeSignals(storeContents []byte, opts ...MergeSignalsOption) error {
	options := &MergeSignalsOptions{
		EventID:       "",
		RetryDuration: DefaultSseRetryDuration,
		OnlyIfMissing: false,
	}
	for _, opt := range opts {
		opt(options)
	}

	dataRows := make([]string, 0, 32)
	if options.OnlyIfMissing {
		dataRows = append(dataRows, OnlyIfMissingDatalineLiteral+strconv.FormatBool(options.OnlyIfMissing))
	}
	lines := bytes.Split(storeContents, newLineBuf)
	for _, line := range lines {
		dataRows = append(dataRows, SignalsDatalineLiteral+string(line))
	}

	sendOptions := make([]SSEEventOption, 0, 2)
	if options.EventID != "" {
		sendOptions = append(sendOptions, WithSSEEventId(options.EventID))
	}
	if options.RetryDuration != DefaultSseRetryDuration {
		sendOptions = append(sendOptions, WithSSERetryDuration(options.RetryDuration))
	}

	if err := sse.Send(
		EventTypeMergeSignals,
		dataRows,
		sendOptions...,
	); err != nil {
		return fmt.Errorf("failed to send merge store: %w", err)
	}
	return nil
}

func (sse *ServerSentEventGenerator) DeleteFromStore(paths ...string) error {
	if len(paths) == 0 {
		return ErrNoPathsProvided
	}

	if err := sse.Send(
		EventTypeRemoveSignals,
		[]string{PathsDatalineLiteral + strings.Join(paths, " ")},
	); err != nil {
		return fmt.Errorf("failed to send delete from store: %w", err)
	}
	return nil
}

func ReadSignals(r *http.Request, store any) error {
	var dsInput []byte

	if r.Method == "GET" {
		dsJSON := r.URL.Query().Get(DatastarKey)
		if dsJSON == "" {
			return nil
		} else {
			dsInput = []byte(dsJSON)
		}
	} else {
		buf := bytebufferpool.Get()
		defer bytebufferpool.Put(buf)
		if _, err := buf.ReadFrom(r.Body); err != nil {
			if err == http.ErrBodyReadAfterClose {
				return fmt.Errorf("body already closed, are you sure you created the SSE ***AFTER*** the ReadSignals? %w", err)
			}
			return fmt.Errorf("failed to read body: %w", err)
		}
		dsInput = buf.Bytes()
	}

	if err := json.Unmarshal(dsInput, store); err != nil {
		return fmt.Errorf("failed to unmarshal: %w", err)
	}
	return nil
}