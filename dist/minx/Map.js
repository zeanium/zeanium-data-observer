!function(i){i.Class("zn.data.Map",{properties:{count:{get:function(){var t=0;return this.each(function(){t++}),t}},keys:{get:function(){return Object.keys(this._map)},set:function(){throw new Error("Unable to set keys of Map")}},values:{get:function(){return this.__getMapValues()},set:function(){throw new Error("Unable to set values of Map")}}},methods:{init:{auto:!0,value:function(t){this._map={},this.concat(t)}},concat:function(t){if(t){this._map;var e=this;i.each(t,function(t,n){e.set(n,t)})}return this},contains:function(t){return t in this._map},getItem:function(t){return this._map[t]},get:function(t){if(this.has(t))return this.super(t);var n=this.getItem(t);return n&&n.value},set:function(t,n){if(this.has(t))return this.super(t);var e=t,i=this._map[e];return(i=i||(this._map[e]={key:e})).value=n,this},remove:function(t){return delete this._map[t],this},clear:function(){return this._map={},this},each:function(t,n){return i.each(this._map,t,n),this},eachKey:function(t,n){return i.each(this.keys,t,n),this},eachValue:function(t,n){return i.each(this.values,t,n),this},toArray:function(){var n=[];return this.each(function(t){n.push(t)}),n},toObject:function(){var n={};return this.each(function(t){n[t.key]=t.value}),n},__getMapValues:function(){var n=[];return this.each(function(t){n.push(t.value)}),n}}})}(zn);