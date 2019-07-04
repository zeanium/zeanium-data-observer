!function(t){t.Class("zn.data.ObservableList",t.data.List,{mixins:[t.data.Observable],events:["change"],methods:{add:function(t){var i=this.super(t);return this.notify("count"),this.fire("change",{action:"add",items:[t],index:i}),i},addRange:function(t){var i=this.super(t);return this.notify("count"),this.fire("change",{action:"add",items:t,index:i}),i},insert:function(t,i){return this.super(t,i),this.notify("count"),this.fire("change",{action:"add",items:[t],index:i}),i},insertRange:function(t,i){return this.super(t,i),this.notify("count"),this.fire("change",{action:"add",items:t,index:i}),i},remove:function(t){var i=this.super(t);return 0<=i&&(this.notify("count"),this.fire("change",{action:"remove",items:[t],index:i})),index},removeAt:function(t){var i=this.super(t);return void 0!==i&&(this.notify("count"),this.fire("change",{action:"remove",items:[i],index:t})),i},clear:function(){var t=this.super();return this.notify("count"),this.fire("change",{action:"clear",items:t}),t},sort:function(t){var i=this.super(t);return this.notify("count"),this.fire("change",{action:"sort",sort:t||function(t,i){return i<t?1:t<i?-1:0}}),i}}})}(zn);