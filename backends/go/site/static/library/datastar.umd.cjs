(function(k,C){typeof exports=="object"&&typeof module<"u"?C(exports):typeof define=="function"&&define.amd?define(["exports"],C):(k=typeof globalThis<"u"?globalThis:k||self,C(k.Datastar={}))})(this,function(k){"use strict";function C(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function K(){throw new Error("Cycle detected")}function Xe(){throw new Error("Computed cannot have side-effects")}const Ye=Symbol.for("preact-signals"),T=1,O=2,D=4,H=8,F=16,M=32;function J(){j++}function z(){if(j>1){j--;return}let t,e=!1;for(;V!==void 0;){let n=V;for(V=void 0,se++;n!==void 0;){const r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~O,!(n._flags&H)&&me(n))try{n._callback()}catch(s){e||(t=s,e=!0)}n=r}}if(se=0,j--,e)throw t}function Qe(t){if(j>0)return t();J();try{return t()}finally{z()}}let g,V,j=0,se=0,Z=0;function he(t){if(g===void 0)return;let e=t._node;if(e===void 0||e._target!==g)return e={_version:0,_source:t,_prevSource:g._sources,_nextSource:void 0,_target:g,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},g._sources!==void 0&&(g._sources._nextSource=e),g._sources=e,t._node=e,g._flags&M&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=g._sources,e._nextSource=void 0,g._sources._nextSource=e,g._sources=e),e}function y(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}y.prototype.brand=Ye,y.prototype._refresh=function(){return!0},y.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},y.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}},y.prototype.subscribe=function(t){const e=this;return be(function(){const n=e.value,r=this._flags&M;this._flags&=~M;try{t(n)}finally{this._flags|=r}})},y.prototype.valueOf=function(){return this.value},y.prototype.toString=function(){return this.value+""},y.prototype.toJSON=function(){return this.value},y.prototype.peek=function(){return this._value},Object.defineProperty(y.prototype,"value",{get(){const t=he(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(g instanceof L&&Xe(),t!==this._value){se>100&&K(),this._value=t,this._version++,Z++,J();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{z()}}}});function pe(t){return new y(t)}function me(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function ge(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function ve(t){let e=t._sources,n;for(;e!==void 0;){const r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function L(t){y.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=Z-1,this._flags=D}L.prototype=new y,L.prototype._refresh=function(){if(this._flags&=~O,this._flags&T)return!1;if((this._flags&(D|M))===M||(this._flags&=~D,this._globalVersion===Z))return!0;if(this._globalVersion=Z,this._flags|=T,this._version>0&&!me(this))return this._flags&=~T,!0;const t=g;try{ge(this),g=this;const e=this._compute();(this._flags&F||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~F,this._version++)}catch(e){this._value=e,this._flags|=F,this._version++}return g=t,ve(this),this._flags&=~T,!0},L.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=D|M;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}y.prototype._subscribe.call(this,t)},L.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(y.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~M;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},L.prototype._notify=function(){if(!(this._flags&O)){this._flags|=D|O;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},L.prototype.peek=function(){if(this._refresh()||K(),this._flags&F)throw this._value;return this._value},Object.defineProperty(L.prototype,"value",{get(){this._flags&T&&K();const t=he(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&F)throw this._value;return this._value}});function et(t){return new L(t)}function ye(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){J();const n=g;g=void 0;try{e()}catch(r){throw t._flags&=~T,t._flags|=H,oe(t),r}finally{g=n,z()}}}function oe(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,ye(t)}function tt(t){if(g!==this)throw new Error("Out-of-order effect");ve(this),g=t,this._flags&=~T,this._flags&H&&oe(this),z()}function B(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=M}B.prototype._callback=function(){const t=this._start();try{if(this._flags&H||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},B.prototype._start=function(){this._flags&T&&K(),this._flags|=T,this._flags&=~H,ye(this),ge(this),J();const t=g;return g=this,tt.bind(this,t)},B.prototype._notify=function(){this._flags&O||(this._flags|=O,this._nextBatchedEffect=V,V=this)},B.prototype._dispose=function(){this._flags|=H,this._flags&T||oe(this)};function be(t){const e=new B(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}class we{get value(){return ae(this)}set value(e){Qe(()=>nt(this,e))}peek(){return ae(this,{peek:!0})}}const ie=t=>Object.assign(new we,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(s=>s===n))throw new Error(`${n} is a reserved property name`);return typeof r!="object"||r===null||Array.isArray(r)?e[n]=pe(r):e[n]=ie(r),e},{})),nt=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),ae=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,s])=>(s instanceof y?n[r]=e?s.peek():s.value:s instanceof we&&(n[r]=ae(s,{peek:e})),n),{});function _e(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return e;if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=_e(n[r],e[r])}),n}const rt="[a-zA-Z_$][0-9a-zA-Z_$.]*";function le(t,e,n){return new RegExp(`(?<whole>\\${t}(?<${e}>${rt})${n})`,"g")}const st={regexp:le("$","signal",""),replacer:t=>{const{signal:e}=t;return`ctx.store().${e}.value`}},ot={regexp:le("$\\$","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>{const n=["ctx"];e&&n.push(...e.split(",").map(s=>s.trim()));const r=n.join(",");return`ctx.actions.${t}(${r})`}},it={regexp:le("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},at=[ot,st,it],lt=[{prefix:"store",preprocessors:{pre:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`Object.assign({...ctx.store()}, ${e})`}}]},onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,expression:n}=t;return t.refs[n]=e,()=>delete t.refs[n]}}];class Ee{plugins=[];store=ie({});actions={};refs={};reactivity={signal:pe,computed:et,effect:be};parentID="";missingIDNext=0;removals=new Map;constructor(e={},...n){if(this.actions=Object.assign(this.actions,e),n=[...lt,...n],!n.length)throw new Error("No plugins provided");const r=new Set;for(const s of n){if(s.requiredPluginPrefixes){for(const o of s.requiredPluginPrefixes)if(!r.has(o))throw new Error(`${s.prefix} requires ${o}`)}this.plugins.push(s),r.add(s.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}cleanupElementRemovals(e){const n=this.removals.get(e);if(n){for(const r of n)r();this.removals.delete(e)}}mergeStore(e){const n=_e(this.store.value,e);this.store=ie(n)}signalByName(e){return this.store[e]}applyPlugins(e){const n=new Set;this.plugins.forEach((r,s)=>{this.walkDownDOM(e,o=>{s||this.cleanupElementRemovals(o);for(const i in o.dataset){let a=o.dataset[i]||"";if(!i.startsWith(r.prefix))continue;if(o.id.length===0&&(o.id=`ds-${this.parentID}-${this.missingIDNext++}`),n.clear(),r.allowedTagRegexps){const p=o.tagName.toLowerCase();if(![...r.allowedTagRegexps].some(d=>p.match(d)))throw new Error(`'${o.tagName}' not allowed for '${i}', allowed ${[[...r.allowedTagRegexps].map(d=>`'${d}'`)].join(", ")}`)}let u=i.slice(r.prefix.length),[h,...l]=u.split(".");if(r.mustHaveEmptyKey&&h.length>0)throw new Error(`'${i}' must have empty key`);if(r.mustNotEmptyKey&&h.length===0)throw new Error(`'${i}' must have non-empty key`);h.length&&(h=h[0].toLowerCase()+h.slice(1));const c=l.map(p=>{const[m,...d]=p.split("_");return{label:m,args:d}});if(r.allowedModifiers){for(const p of c)if(!r.allowedModifiers.has(p.label))throw new Error(`'${p.label}' is not allowed`)}const f=new Map;for(const p of c)f.set(p.label,p.args);if(r.mustHaveEmptyExpression&&a.length)throw new Error(`'${i}' must have empty expression`);if(r.mustNotEmptyExpression&&!a.length)throw new Error(`'${i}' must have non-empty expression`);const w=[...r.preprocessors?.pre||[],...at,...r.preprocessors?.post||[]];for(const p of w){if(n.has(p))continue;n.add(p);const m=a.split(";"),d=[];m.forEach(E=>{let v=E;const $=[...v.matchAll(p.regexp)];if($.length)for(const P of $){if(!P.groups)continue;const{groups:S}=P,{whole:G}=S;v=v.replace(G,p.replacer(S))}d.push(v)}),a=d.join("; ")}const b={store:()=>this.store,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:this.actions,refs:this.refs,reactivity:this.reactivity,el:o,key:h,expression:a,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:f};if(!r.bypassExpressionFunctionCreation?.(b)&&!r.mustHaveEmptyExpression&&a.length){const p=a.split(";").map(d=>d.trim());p[p.length-1]=`return ${p[p.length-1]}`;let m=`
try {
${p.map(d=>`  ${d}`).join(`;
`)}
} catch (e) {
  throw e
}
            `;try{const d=new Function("ctx",m);b.expressionFn=d}catch(d){throw new Error(`Error creating expression function for '${m}', error: ${d}`)}}const _=r.onLoad(b);_&&(this.removals.has(o)||this.removals.set(o,new Set),this.removals.get(o).add(_)),console.log(`Removing attribute '${i}' from '${o.tagName}'`),delete o.dataset[i]}})})}walkSignalsStore(e,n){const r=Object.keys(e);for(let s=0;s<r.length;s++){const o=r[s],i=e[o],a=i instanceof y,u=typeof i=="object"&&Object.keys(i).length>0;if(a){n(o,i);continue}u&&this.walkSignalsStore(i,n)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,n,r=0){if(!e)return;const s=C(e);if(s)for(n(s),r=0,e=e.firstElementChild;e;)this.walkDownDOM(e,n,r++),e=e.nextElementSibling}}const ct="0.12.1",Se=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),ut={prefix:"bind",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=Se(t.key),r=`${t.expressionFn(t)}`;!r||r==="false"||r==="null"||r==="undefined"?t.el.removeAttribute(e):t.el.setAttribute(e,r)})},ft=/^data:(?<mime>[^;]+);base64,(?<contents>.*)$/,X=["change","input","keydown"],dt=[ut,{prefix:"model",mustHaveEmptyKey:!0,preprocessors:{post:[{regexp:/(?<whole>.+)/g,replacer:t=>{const{whole:e}=t;return`ctx.store().${e}`}}]},allowedTagRegexps:new Set(["input","textarea","select","checkbox","radio"]),onLoad:t=>{const{el:e,expression:n}=t,r=t.expressionFn(t),s=e.tagName.toLowerCase(),o=s.includes("input"),i=s.includes("select"),a=s.includes("textarea"),u=s.includes("radio"),h=e.getAttribute("type"),l=s.includes("checkbox")||o&&h==="checkbox",c=o&&h==="file";if(!o&&!i&&!a&&!l&&!u)throw new Error("Element must be input, select, textarea, checkbox or radio");const f=()=>{if(!r)throw new Error(`Signal ${n} not found`);const m="value"in e,d=r.value;l?e.checked=d:c||(m?e.value=`${d}`:e.setAttribute("value",`${d}`))},w=t.reactivity.effect(f),b=()=>{if(c){const[E]=e?.files||[];if(!E){r.value="";return}const v=new FileReader,$=t.store();v.onload=()=>{if(typeof v.result!="string")throw new Error("Unsupported type");const S=v.result.match(ft);if(!S?.groups)throw new Error("Invalid data URI");const{mime:G,contents:R}=S.groups;r.value=R;const x=`${n}Mime`;if(x in $){const Ze=$[`${x}`];Ze.value=G}},v.readAsDataURL(E);const P=`${n}Name`;if(P in $){const S=$[`${P}`];S.value=E.name}return}const m=r.value,d=e;if(typeof m=="number")r.value=Number(d.value);else if(typeof m=="string")r.value=d.value;else if(typeof m=="boolean")l?r.value=d.checked:r.value=!!d.value;else if(!(typeof m>"u"))if(typeof m=="bigint")r.value=BigInt(d.value);else throw console.log(typeof m),new Error("Unsupported type")},_=e.tagName.split("-");if(_.length>1){const m=_[0].toLowerCase();X.forEach(d=>{X.push(`${m}-${d}`)})}return X.forEach(m=>e.addEventListener(m,b)),()=>{w(),X.forEach(m=>e.removeEventListener(m,b))}}},{prefix:"text",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{const r=n(t);e.textContent=`${r}`})}},{prefix:"focus",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:n,expressionFn:r}=t;let s=()=>{r(t)};const o=t.modifiers.get("debounce");if(o){const h=Te(o),l=Y(o,"leading",!1),c=Y(o,"noTrail",!0);s=ht(s,h,l,c)}const i=t.modifiers.get("throttle");if(i){const h=Te(i),l=Y(i,"noLead",!0),c=Y(i,"noTrail",!0);s=pt(s,h,l,c)}const a={capture:!0,passive:!1,once:!1};t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0);const u=Se(n).toLowerCase();return u==="load"?(s(),e.removeAttribute("data-on-load"),()=>{}):(e.addEventListener(u,s,a),()=>e.removeEventListener(u,s))}}];function Te(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function Y(t,e,n=!1){return t?t.includes(e)||n:!1}function ht(t,e,n=!1,r=!0){let s;const o=()=>s&&clearTimeout(s);return function(...a){o(),n&&!s&&t(...a),s=setTimeout(()=>{r&&t(...a),o()},e)}}function pt(t,e,n=!0,r=!1){let s=!1,o=null;return function(...a){s?o=a:(s=!0,n?t(...a):o=a,setTimeout(()=>{r&&o&&(t(...o),o=null),s=!1},e))}}function mt(t,{signal:e,headers:n,onopen:r,onmessage:s,onclose:o,onerror:i,openWhenHidden:a,...u}){return new Promise((h,l)=>{const c={...n};c.accept||(c.accept=ce);let f;function w(){f.abort(),document.hidden||d()}a||document.addEventListener("visibilitychange",w);let b=gt,_=0;function p(){document.removeEventListener("visibilitychange",w),window.clearTimeout(_),f.abort()}e?.addEventListener("abort",()=>{p(),h()});const m=r??vt;async function d(){f=new AbortController;try{const E=await fetch(t,{...u,headers:c,signal:f.signal});await m(E),await yt(E.body,bt(wt(v=>{v?c[Ae]=v:delete c[Ae]},v=>{b=v},s))),o?.(),p(),h()}catch(E){if(!f.signal.aborted)try{const v=i?.(E)??b;window.clearTimeout(_),_=window.setTimeout(d,v)}catch(v){p(),l(v)}}}d()})}const ce="text/event-stream",gt=1e3,Ae="last-event-id";function vt(t){const e=t.headers.get("content-type");if(!e?.startsWith(ce))throw new Error(`Expected content-type to be ${ce}, Actual: ${e}`)}async function yt(t,e){const n=t.getReader();for(;;){const r=await n.read();if(r.done)break;e(r.value)}}function bt(t){let e,n,r,s=!1;return function(i){e===void 0?(e=i,n=0,r=-1):e=_t(e,i);const a=e.length;let u=0;for(;n<a;){s&&(e[n]===10&&(u=++n),s=!1);let h=-1;for(;n<a&&h===-1;++n)switch(e[n]){case 58:r===-1&&(r=n-u);break;case 13:s=!0;case 10:h=n;break}if(h===-1)break;t(e.subarray(u,h),r),u=n,r=-1}u===a?e=void 0:u!==0&&(e=e.subarray(u),n-=u)}}function wt(t,e,n){let r=ke();const s=new TextDecoder;return function(i,a){if(i.length===0)n?.(r),r=ke();else if(a>0){const u=s.decode(i.subarray(0,a)),h=a+(i[a+1]===32?2:1),l=s.decode(i.subarray(h));switch(u){case"data":r.data=r.data?r.data+`
`+l:l;break;case"event":r.event=l;break;case"id":t(r.id=l);break;case"retry":const c=parseInt(l,10);isNaN(c)||e(r.retry=c);break}}}}function _t(t,e){const n=new Uint8Array(t.length+e.length);return n.set(t),n.set(e,t.length),n}function ke(){return{data:"",event:"",id:"",retry:void 0}}const Q=new WeakSet;function Et(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=Lt(e):r=e;const s=Pt(r),o=Tt(t,s,n);return Le(t,s,o)}function Le(t,e,n){if(n.head.block){const r=t.querySelector("head"),s=e.querySelector("head");if(r&&s){const o=Me(s,r,n);Promise.all(o).then(()=>{Le(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return Pe(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){const r=Nt(e,t,n);if(!r)throw new Error("Could not find best match");const s=r?.previousSibling,o=r?.nextSibling,i=ee(t,r,n);return r?Mt(s,i,o):[]}else throw"Do not understand how to morph style "+n.morphStyle}function ee(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(ne(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!=="morph"?Me(e,t,n):(St(e,t),Pe(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function Pe(t,e,n){let r=t.firstChild,s=e.firstChild,o;for(;r;){if(o=r,r=o.nextSibling,s==null){if(n.callbacks.beforeNodeAdded(o)===!1)return;e.appendChild(o),n.callbacks.afterNodeAdded(o),I(n,o);continue}if(Ne(o,s,n)){ee(s,o,n),s=s.nextSibling,I(n,o);continue}let i=At(t,e,o,s,n);if(i){s=$e(s,i,n),ee(i,o,n),I(n,o);continue}let a=kt(t,o,s,n);if(a){s=$e(s,a,n),ee(a,o,n),I(n,o);continue}if(n.callbacks.beforeNodeAdded(o)===!1)return;e.insertBefore(o,s),n.callbacks.afterNodeAdded(o),I(n,o)}for(;s!==null;){let i=s;s=s.nextSibling,Ce(i,n)}}function St(t,e){let n=t.nodeType;if(n===1){for(const r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(const r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",te(t,e,"value"),te(t,e,"checked"),te(t,e,"disabled");else if(t instanceof HTMLOptionElement)te(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const r=t.value,s=e.value;r!==s&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function te(t,e,n){const r=t.getAttribute(n),s=e.getAttribute(n);r!==s&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function Me(t,e,n){const r=[],s=[],o=[],i=[],a=n.head.style,u=new Map;for(const l of t.children)u.set(l.outerHTML,l);for(const l of e.children){let c=u.has(l.outerHTML),f=n.head.shouldReAppend(l),w=n.head.shouldPreserve(l);c||w?f?s.push(l):(u.delete(l.outerHTML),o.push(l)):a==="append"?f&&(s.push(l),i.push(l)):n.head.shouldRemove(l)!==!1&&s.push(l)}i.push(...u.values());const h=[];for(const l of i){const c=document.createRange().createContextualFragment(l.outerHTML).firstChild;if(!c)throw new Error("could not create new element from: "+l.outerHTML);if(n.callbacks.beforeNodeAdded(c)){if(c.hasAttribute("href")||c.hasAttribute("src")){let f;const w=new Promise(b=>{f=b});c.addEventListener("load",function(){f(void 0)}),h.push(w)}e.appendChild(c),n.callbacks.afterNodeAdded(c),r.push(c)}}for(const l of s)n.callbacks.beforeNodeRemoved(l)!==!1&&(e.removeChild(l),n.callbacks.afterNodeRemoved(l));return n.head.afterHeadMorphed(e,{added:r,kept:o,removed:s}),h}function N(){}function Tt(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:It(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:N,afterNodeAdded:N,beforeNodeMorphed:N,afterNodeMorphed:N,beforeNodeRemoved:N,afterNodeRemoved:N},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:N,afterHeadMorphed:N},n.head)}}function Ne(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:U(n,t,e)>0:!1}function ne(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function $e(t,e,n){for(;t!==e;){const r=t;if(t=t?.nextSibling,!r)throw new Error("tempNode is null");Ce(r,n)}return I(n,e),e.nextSibling}function At(t,e,n,r,s){const o=U(s,n,e);let i=null;if(o>0){i=r;let a=0;for(;i!=null;){if(Ne(n,i,s))return i;if(a+=U(s,i,t),a>o)return null;i=i.nextSibling}}return i}function kt(t,e,n,r){let s=n,o=e.nextSibling,i=0;for(;s&&o;){if(U(r,s,t)>0)return null;if(ne(e,s))return s;if(ne(o,s)&&(i++,o=o.nextSibling,i>=2))return null;s=s.nextSibling}return s}const Re=new DOMParser;function Lt(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const n=Re.parseFromString(t,"text/html");if(e.match(/<\/html>/))return Q.add(n),n;{let r=n.firstChild;return r?(Q.add(r),r):null}}else{const r=Re.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw new Error("content is null");return Q.add(r),r}}function Pt(t){if(t==null)return document.createElement("div");if(Q.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const n of[...t])e.append(n);return e}}function Mt(t,e,n){const r=[],s=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){const o=r.pop();s.push(o),e?.parentElement?.insertBefore(o,e)}for(s.push(e);n;)r.push(n),s.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return s}function Nt(t,e,n){let r=t.firstChild,s=r,o=0;for(;r;){let i=$t(r,e,n);i>o&&(s=r,o=i),r=r.nextSibling}return s}function $t(t,e,n){return ne(t,e)?.5+U(n,t,e):0}function Ce(t,e){I(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function Rt(t,e){return!t.deadIds.has(e)}function Ct(t,e,n){return t.idMap.get(n)?.has(e)||!1}function I(t,e){const n=t.idMap.get(e);if(n)for(const r of n)t.deadIds.add(r)}function U(t,e,n){const r=t.idMap.get(e);if(!r)return 0;let s=0;for(const o of r)Rt(t,o)&&Ct(t,o,n)&&++s;return s}function Ie(t,e){const n=t.parentElement,r=t.querySelectorAll("[id]");for(const s of r){let o=s;for(;o!==n&&o;){let i=e.get(o);i==null&&(i=new Set,e.set(o,i)),i.add(s.id),o=o.parentElement}}}function It(t,e){const n=new Map;return Ie(t,n),Ie(e,n),n}const ue="display",Oe="none",fe="important",Ot={prefix:"show",allowedModifiers:new Set([fe]),onLoad:t=>{const{el:e,modifiers:n,expressionFn:r,reactivity:s}=t;return s.effect(()=>{const i=!!r(t),u=n.has(fe)?fe:void 0;i?e.style.length===1&&e.style.display===Oe?e.style.removeProperty(ue):e.style.setProperty(ue,"",u):e.style.setProperty(ue,Oe,u)})}},Ht="intersects",He="once",xe="half",De="full",xt={prefix:Ht,allowedModifiers:new Set([He,xe,De]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,n={threshold:0};e.has(De)?n.threshold=1:e.has(xe)&&(n.threshold=.5);const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(t.expressionFn(t),e.has(He)&&r.disconnect())})},n);return r.observe(t.el),()=>r.disconnect()}},Fe="prepend",Ve="append",je=new Error("Target element must have a parent if using prepend or append"),Dt={prefix:"teleport",allowedModifiers:new Set([Fe,Ve]),allowedTagRegexps:new Set(["template"]),bypassExpressionFunctionCreation:()=>!0,onLoad:t=>{const{el:e,modifiers:n,expression:r}=t;if(!(e instanceof HTMLTemplateElement))throw new Error("el must be a template element");const s=document.querySelector(r);if(!s)throw new Error(`Target element not found: ${r}`);if(!e.content)throw new Error("Template element must have content");const o=e.content.cloneNode(!0);if(C(o)?.firstElementChild)throw new Error("Empty template");if(n.has(Fe)){if(!s.parentNode)throw je;s.parentNode.insertBefore(o,s)}else if(n.has(Ve)){if(!s.parentNode)throw je;s.parentNode.insertBefore(o,s.nextSibling)}else s.appendChild(o)}},Ft={prefix:"scrollIntoView",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}},Be=document,Ue=!!Be.startViewTransition,Vt=[Ot,xt,Dt,Ft,{prefix:"viewTransition",onGlobalInit(t){let e=!1;if(document.head.childNodes.forEach(n=>{n instanceof HTMLMetaElement&&n.name==="view-transition"&&(e=!0)}),!e){const n=document.createElement("meta");n.name="view-transition",n.content="same-origin",document.head.appendChild(n)}t.mergeStore({viewTransitionRefCounts:{}})},onLoad:t=>{if(!Ue){console.error("Browser does not support view transitions");return}return t.reactivity.effect(()=>{const{el:e,expressionFn:n}=t;let r=n(t);if(!r)return;const s=e.style;s.viewTransitionName=r})}}],jt=["get","post","put","patch","delete"].reduce((t,e)=>(t[e]=async(n,r)=>{const s=Document;if(!s.startViewTransition){await qe(e,r,n);return}new Promise(o=>{s.startViewTransition(async()=>{await qe(e,r,n),o(void 0)})})},t),{}),Bt="Content-Type",Ut="datastar-request",Wt="application/json",qt="true",W="datastar-",q=`${W}indicator`,de=`${q}-loading`,We=`${W}settling`,re=`${W}swapping`,Gt="self",A={MorphElement:"morph_element",InnerElement:"inner_element",OuterElement:"outer_element",PrependElement:"prepend_element",AppendElement:"append_element",BeforeElement:"before_element",AfterElement:"after_element",DeleteElement:"delete_element",UpsertAttributes:"upsert_attributes"},Kt=[{prefix:"header",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store();e.fetch||(e.fetch={}),e.fetch.headers||(e.fetch.headers={});const n=e.fetch.headers,r=t.key[0].toUpperCase()+t.key.slice(1);return n[r]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete n[r]}}},{prefix:"fetchIndicator",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:()=>{const t=document.createElement("style");t.innerHTML=`
.${q}{
 opacity:0;
 transition: opacity 300ms ease-out;
}
.${de} {
 opacity:1;
 transition: opacity 300ms ease-in;
}
`,document.head.appendChild(t)},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`),n=t.store();n.fetch||(n.fetch={}),n.fetch.indicatorSelectors||(n.fetch.indicatorSelectors={}),n.fetch.indicatorSelectors[t.el.id]=e;const r=document.querySelector(e.value);if(!r)throw new Error("No indicator found");return r.classList.add(q),()=>{delete n.fetch.indicatorSelectors[t.el.id]}})}];async function qe(t,e,n){const r=n.store();if(!e)throw new Error(`No signal for ${t} on ${e}`);const s={...r.value};delete s.fetch;const o=JSON.stringify(s);let i=!1,a=n.el;const u=r.fetch?.indicatorSelectors?.[a.id]||null;if(u){const c=document.querySelector(u.value);c&&(a=c,a.classList.remove(q),a.classList.add(de),i=!0)}const h=new URL(e,window.location.origin);t=t.toUpperCase();const l={method:t,headers:{[Bt]:Wt,[Ut]:qt},onmessage:c=>{if(!c.event)return;let f="",w="morph_element",b="",_=500,p=!1,m="",d,E=!1,v=!1;if(!c.event.startsWith(W))throw new Error(`Unknown event: ${c.event}`);switch(c.event.slice(W.length)){case"redirect":p=!0;break;case"fragment":v=!0;break;case"error":E=!0;break;default:throw`Unknown event: ${c}`}if(c.data.split(`
`).forEach(P=>{const S=P.indexOf(" ");if(S===-1)throw new Error("Missing space in data");const G=P.slice(0,S),R=P.slice(S+1);switch(G){case"selector":b=R;break;case"merge":const x=R;if(!Object.values(A).includes(x))throw new Error(`Unknown merge option: ${x}`);w=x;break;case"settle":_=parseInt(R);break;case"fragment":case"html":f=R;break;case"redirect":m=R;break;case"error":d=new Error(R);break;default:throw new Error("Unknown data type")}}),E&&d)throw d;if(p&&m)window.location.href=m;else if(v&&f)Jt(n,b,w,f,_);else throw new Error(`Unknown event: ${c}`)},onclose:()=>{i&&setTimeout(()=>{a.classList.remove(de),a.classList.add(q)},300)}};if(r.fetch?.headers?.value&&l.headers)for(const c in r.fetch.headers.value){const f=r.fetch.headers.value[c];l.headers[c]=f}if(t==="GET"){const c=new URLSearchParams(h.search);c.append("datastar",o),h.search=c.toString()}else l.body=o;await mt(h,l)}const Ge=document.createElement("template");function Jt(t,e,n,r,s){const{el:o}=t;Ge.innerHTML=r;const i=Ge.content.firstChild;if(!(i instanceof Element))throw new Error("No fragment found");const a=e===Gt;let u;if(a)u=[o];else{const l=e||`#${i.getAttribute("id")}`;if(u=document.querySelectorAll(l)||[],!u)throw new Error(`No targets found for ${l}`)}const h=()=>{for(const l of u){l.classList.add(re);const c=l.outerHTML;let f=l;switch(n){case A.MorphElement:const b=Et(f,i);if(!b?.length)throw new Error("No morph result");f=b[0];break;case A.InnerElement:f.innerHTML=i.innerHTML;break;case A.OuterElement:f.replaceWith(i);break;case A.PrependElement:f.prepend(i);break;case A.AppendElement:f.append(i);break;case A.BeforeElement:f.before(i);break;case A.AfterElement:f.after(i);break;case A.DeleteElement:setTimeout(()=>f.remove(),s);break;case A.UpsertAttributes:i.getAttributeNames().forEach(p=>{const m=i.getAttribute(p);f.setAttribute(p,m)});break;default:throw new Error(`Unknown merge type: ${n}`)}f.classList.add(re),t.cleanupElementRemovals(l),t.applyPlugins(document.body),setTimeout(()=>{l.classList.remove(re),f.classList.remove(re)},s);const w=f.outerHTML;c!==w&&(f.classList.add(We),setTimeout(()=>{f.classList.remove(We)},s))}};Ue?Be.startViewTransition(()=>h()):h()}const zt={setAll:async(t,e,n)=>{const r=new RegExp(e);t.walkSignals((s,o)=>r.test(s)&&(o.value=n))},toggleAll:async(t,e)=>{const n=new RegExp(e);t.walkSignals((r,s)=>n.test(r)&&(s.value=!s.value))}};function Ke(t={},...e){const n=performance.now(),r=new Ee(t,...e);r.run();const s=performance.now();return console.log(`Datastar v${ct} loaded and attached to all DOM elements in ${s-n}ms`),r}function Je(t={},...e){const n=Object.assign({},zt,jt,t),r=[...Kt,...Vt,...dt,...e];return Ke(n,...r)}const ze=window;ze.ds=Je(),ze.dispatchEvent(new CustomEvent("datastar-ready")),k.Datastar=Ee,k.runDatastarWith=Ke,k.runDatastarWithAllPlugins=Je,k.toHTMLorSVGElement=C,Object.defineProperty(k,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=datastar.umd.cjs.map
