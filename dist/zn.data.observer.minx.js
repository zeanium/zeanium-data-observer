zn||require("@zeanium/core");
!function(c){var i=c.Class({properties:{direction:{value:"oneway",readonly:!0},target:{value:null,readonly:!0},targetPath:{value:"",readonly:!0},source:{get:function(t){return t?this._owner:this._source},set:function(t){this._source=t,this.__rebind()}},sourcePaths:{get:function(){return this._sourcePaths},set:function(t){this._sourcePaths=this.__parseSourcePaths(t,function(t,e){t&&this.__rebind()}.bind(this))}},owner:{get:function(){return this._owner}},converter:{value:null},async:{value:!1}},methods:{init:function(t,e,n){var i=n||{},s=t.member(e);s&&s.meta.binding;c.overwrite(i,{direction:"oneway",converter:{}});var r=this._direction=i.direction;this._source=i.source,this._sourcePaths=this.__parseSourcePaths(i.sourcePaths),this._owner=i.owner||t,this._converter=this.__parseConverter(i),this._target=t,this._targetPath=e,"twoway"!==r&&"oneway"!==r||this.__rebind(),"twoway"!==r&&"inverse"!==r||t.watch(e,function(t){this.__updateSource(t)},this)},dispose:function(){this._source=null,this.__rebind()},__updateSource:function(e){var n=this._converter,i=null;return c.each(this.sourcePaths,function(t){i=n.revert.call(n.context,e),c.path(this.get("source",t[0]),t[1],i)},this),this},__updateTarget:function(){var t,e=this,n=[],i=null,s=this._owner,r=this._target,o=this._targetPath,h=this._converter;return c.each(this.sourcePaths,function(t){i=c.path(e.get("source",t[0]),t[1]),i=c.is(i,"function")?i.bind(s):i,n.push(i)}),t=h.convert.apply(h.context,n),r.set(o,t),this},__rebind:function(){var t=this._sourcePaths,s=this._watchers;return s&&(c.each(s,function(t){t.source.unwatch(t.path,t.handler)}),this._watchers=null),c.each(t,function(t){var e=t[0],n=t[1],i=this.get("source",e);c.can(i,"watch")&&(i.watch(n,this.__updateTarget.bind(this)),(s=s||[]).push({source:i,path:n,handler:this.__updateTarget}))},this),this.__updateTarget()},__parseSourcePaths:function(t,e){for(var n=t.split(","),i="",s=!1,r=0,o=n.length;r<o;r++)"#"===(i=n[r].trim()).charAt(0)&&(i=i.substring(1),s=!0),n[r]=[s,i],e&&e(s,i);return n},__parseConverter:function(t){var e=t.converter;(c.is(e,"string")||c.is(e,"function"))&&(e={convert:e});var n=e.convert=t.convert||e.convert||function(t){return t};if(e.revert=t.revert||function(t){return t},e.context=t.context||this.owner,c.is(n,"string")){var i=n.lastIndexOf("."),s=n,r=this.source||this.owner,o="";0<i&&(o=n.slice(0,i),s=n.slice(i+1),r=c.path(this.source,o)),n=r&&r[s]}return e.convert=n,e}}}),r=c.Class("zn.data.Bindable",c.data.Observable,{statics:{parseOptions:function(t,e){var n=null;if("string"==typeof t&&"{"===t.charAt(0)&&"}"===t.charAt(t.length-1)){var i=t.slice(1,-1).split(";");n={owner:e,sourcePaths:i.shift()},c.each(i,function(t){if(!t)return-1;var e=t.split("=");n[e[0]]=e[1]})}else"object"==typeof t&&(n=t);return n}},properties:{model:{get:function(){return this._model},set:function(e){this._model=e,c.each(this.__bindings__,function(t){t.set("source",e)})}}},methods:{init:{auto:!0,value:function(){this.__bindings__={}},after:function(){this.__binding()}},dispose:function(){this.super(),c.each(this.__bindings__,function(t){t.dispose()}),this.__bindings__=null},let:function(t,e,n,i){var s=r.parseOptions(e);s?(s.owner=n,this.setBinding(t,s,i)):this.set(t,e)},getBinding:function(t){return this.__bindings__[t]},setBinding:function(t,e,n){return e.source=e.model||this.get("model"),e.owner=e.owner||this,this.clearBinding(t),this.__bindings__[t]=new i(n||this,e.targetPath||t,e),this},clearBinding:function(t){var e=this.__bindings__[t];e&&(e.dispose(),delete this.__bindings__[t])},__binding:function(){var n=this,t=this.constructor.getMeta("properties");c.each(t,function(t,e){t&&t.binding&&n.let(e,t.binding)})}}})}(zn);
zn.Class("zn.data.Iterable",{methods:{init:function(n){},all:function(){},any:function(){},each:function(){},toArray:function(){}}});
!function(i){var t=Array.prototype,r=t.push,n=t.sort,e=t.join,o=t.slice,s=t.splice,u=t.indexOf,c=t.lastIndexOf,a=t.forEach,h=i.Class("zn.data.List",{properties:{count:{get:function(){return this.length},set:function(){throw new Error("Unable to set count of List")}}},methods:{init:{auto:!0,value:function(t){this.length=0,this.insertRange(t,0)}},unique:function(){},dispose:function(){this.clear()},add:function(t){var n=this.length;return r.call(this,t),n},addRange:function(t){return this.insertRange(t,this.length)},remove:function(t){var n=this.indexOf(t);return 0<=n?(s.call(this,n,1),n):-1},removeAt:function(t){return s.call(this,t,1)[0]},insert:function(t,n){return s.call(this,n,0,t),t},insertRange:function(t,n){return s.apply(this,[n,0].concat(function(t){if(i.is(t,h))return t.toArray();if(i.is(t,"array"))return t.slice(0);var n=[];return i.each(t,function(t){n.push(t)}),n}(t))),n},clear:function(){return s.call(this,0)},getItem:function(t){if(t<this.length)return this[t];throw new Error("Index out of range.")},setItem:function(t,n){if(!(t<this.length))throw new Error("Index out of range.");this[t]=n},getRange:function(t,n){return new h(o.call(this,t,t+n))},indexOf:function(t){return u.call(this,t)},lastIndexOf:function(t){return c.call(this,t)},contains:function(t){return 0<=this.indexOf(t)},toggle:function(t){this.contains(t)?this.remove(t):this.add(t)},sort:function(t){return n.call(this,t)},each:function(t,n){a.call(this,t,n)},toArray:function(){return o.call(this,0)},join:function(){return e.call(this)}}})}(zn);
!function(i){i.Class("zn.data.Map",{properties:{count:{get:function(){var t=0;return this.each(function(){t++}),t}},keys:{get:function(){return Object.keys(this._map)},set:function(){throw new Error("Unable to set keys of Map")}},values:{get:function(){return this.__getMapValues()},set:function(){throw new Error("Unable to set values of Map")}}},methods:{init:{auto:!0,value:function(t){this._map={},this.concat(t)}},concat:function(t){if(t){this._map;var e=this;i.each(t,function(t,n){e.set(n,t)})}return this},contains:function(t){return t in this._map},getItem:function(t){return this._map[t]},get:function(t){if(this.has(t))return this.super(t);var n=this.getItem(t);return n&&n.value},set:function(t,n){if(this.has(t))return this.super(t);var e=t,i=this._map[e];return(i=i||(this._map[e]={key:e})).value=n,this},remove:function(t){return delete this._map[t],this},clear:function(){return this._map={},this},each:function(t,n){return i.each(this._map,t,n),this},eachKey:function(t,n){return i.each(this.keys,t,n),this},eachValue:function(t,n){return i.each(this.values,t,n),this},toArray:function(){var n=[];return this.each(function(t){n.push(t)}),n},toObject:function(){var n={};return this.each(function(t){n[t.key]=t.value}),n},__getMapValues:function(){var n=[];return this.each(function(t){n.push(t.value)}),n}}})}(zn);
!function(n){var o=n.Class("zn.data.Observable",{properties:{},methods:{init:{auto:!0,value:function(){this.__watchers__={}}},dispose:function(){n.each(this.__watchers__,function(t,i){this.__unbind(i,this.get(i))},this),this.__watchers__=null},watch:function(t,i,h){return("*"===t?this.constructor._properties_:n.is(t,"array")?t:[t]).forEach(function(t){this.__watch(t,i,h)},this),this},unwatch:function(t,i,h){return("*"===t?this.constructor._properties_:n.is(t,"array")?t:[t]).forEach(function(t){this.__unwatch(t,i,h)},this),this},notify:function(t){var i="*"===t?Object.keys(this.__watchers__):n.is(t,"array")?t:[t];return n.each(i,function(t){this.__notify(t)},this),this},__watch:function(t,i,h){var n=t.indexOf("."),a=t,e="",s=this.__watchers__;if(0<=n){a=t.slice(0,n),e=t.slice(n+1);var c=this.get(a);c&&c.watch&&c.watch(e,i,h)}(s[a]=s[a]||[]).push({handler:i,context:h,fullPath:t,subPath:e});var r=this.member(a);if(r&&"property"===r.type&&!r.meta.watched){var _=r.getter,u=r.setter;o.defineProperty(a,{get:function(t){return _.call(this,t)},set:function(t,i){var h=_.call(this);(h!==t||i&&i.force)&&(this.__unbind(a,h),!1!==u.call(this,t,i)&&(this.__bind(a,t),this.notify(a)))},watched:!0},this)}},__unwatch:function(t,i,h){var n=t.indexOf("."),a=t,e="",s=this.__watchers__;if(0<=n){a=t.slice(0,n),e=t.slice(n+1);var c=this.get(a);c&&c.unwatch&&c.unwatch(e,i,h)}var r,_=s[a];if(!_)return!1;if(i){for(var u=0,o=_.length;u<o;u++)if((r=_[u]).handler===i&&r.context===h){_.splice(u,1);break}}else _.length=0},__bind:function(t,i){i&&i.watch&&n.each(this.__watchers__[t],function(t){t.subPath&&i.watch(t.subPath,t.handler,t.context)})},__unbind:function(t,i){i&&i.unwatch&&n.each(this.__watchers__[t],function(t){t.subPath&&i.unwatch(t.subPath,t.handler,t.context)})},__notify:function(t){var i=this.get(t);n.each(this.__watchers__[t],function(t){t&&t.handler&&t.handler.call(t.context,n.path(i,t.subPath),t.fullPath,this)},this)}}})}(zn);
!function(t){t.Class("zn.data.ObservableList",t.data.List,{mixins:[t.data.Observable],events:["change"],methods:{add:function(t){var i=this.super(t);return this.notify("count"),this.fire("change",{action:"add",items:[t],index:i}),i},addRange:function(t){var i=this.super(t);return this.notify("count"),this.fire("change",{action:"add",items:t,index:i}),i},insert:function(t,i){return this.super(t,i),this.notify("count"),this.fire("change",{action:"add",items:[t],index:i}),i},insertRange:function(t,i){return this.super(t,i),this.notify("count"),this.fire("change",{action:"add",items:t,index:i}),i},remove:function(t){var i=this.super(t);return 0<=i&&(this.notify("count"),this.fire("change",{action:"remove",items:[t],index:i})),index},removeAt:function(t){var i=this.super(t);return void 0!==i&&(this.notify("count"),this.fire("change",{action:"remove",items:[i],index:t})),i},clear:function(){var t=this.super();return this.notify("count"),this.fire("change",{action:"clear",items:t}),t},sort:function(t){var i=this.super(t);return this.notify("count"),this.fire("change",{action:"sort",sort:t||function(t,i){return i<t?1:t<i?-1:0}}),i}}})}(zn);
!function(t){t.Class("zn.data.ObservableMap",t.data.Map,{mixins:[t.data.Observable],events:["change"],methods:{set:function(t,e){if(this.has(t))return this.super(t);var i=this._map,a={key:t,value:e};if(t in i){var n=i[t];i[t]=a,this.fire("change",{action:"replace",oldItem:n,newItem:a})}else i[t]=a,this.notify("count"),this.fire("change",{action:"add",items:[a]})},remove:function(t){var e=this._map;if(t in e){var i=e[t];delete e[t],this.notify("count"),this.fire("change",{action:"remove",items:[i]})}},clear:function(){this.toArray();return this.super(),this.notify("count"),this.fire("change",{action:"clear",items:this.toArray()}),this}}})}(zn);
!function(s){s.Class("zn.data.TList",{statics:{getInstance:function(t){return new this(t)}},properties:{min:0,max:100,TClass:null,TClassArgv:{}},methods:{init:function(t){this.sets(t),this.reset()},reset:function(){this._data=[];for(var t=0;t<(this.min||0);t++)this.push(this.TClassArgv)},push:function(t){if(this.TClass){var s=new this.TClass(t||this.TClassArgv);return this._data.push(s),s}},findOneT:function(t){var n=null,i=t||s.idle;return s.each(this._data,function(t,s){if(i(t,s))return n=t,-1}),n},findAllT:function(t){var n=[],i=t||s.idle;return s.each(this._data,function(t,s){i(t,s)&&n.push(t)}),n}}})}(zn);
zn.Class("zn.data.Task",{statics:{getInstance:function(t){return new this(t)},PANDING:0,WAITING:1,DOING:2,DONE:3},properties:{statue:0},methods:{init:function(t){this.sets(t)}}});