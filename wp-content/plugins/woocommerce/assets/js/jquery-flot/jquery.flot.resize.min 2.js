!function(s,i,o){var n,h=s([]),a=s.resize=s.extend(s.resize,{}),u="setTimeout",r="resize",d=r+"-special-event",c="delay",l="throttleWindow";a[c]=250,a[l]=!0,s.event.special[r]={setup:function(){if(!a[l]&&this[u])return!1;var t=s(this);h=h.add(t),s.data(this,d,{w:t.width(),h:t.height()}),1===h.length&&function e(){n=i[u](function(){h.each(function(){var t=s(this),e=t.width(),i=t.height(),n=s.data(this,d);e===n.w&&i===n.h||t.trigger(r,[n.w=e,n.h=i])}),e()},a[c])}()},teardown:function(){if(!a[l]&&this[u])return!1;var t=s(this);h=h.not(t),t.removeData(d),h.length||clearTimeout(n)},add:function(t){return!(!a[l]&&this[u])&&(s.isFunction(t)?(r=t,e):(r=t.handler,void(t.handler=e)));var r;function e(t,e,i){var n=s(this),h=s.data(this,d);h.w=e!==o?e:n.width(),h.h=i!==o?i:n.height(),r.apply(this,arguments)}}}}(jQuery,this),jQuery.plot.plugins.push({init:function(e){function i(){var t=e.getPlaceholder();0!=t.width()&&0!=t.height()&&(e.resize(),e.setupGrid(),e.draw())}e.hooks.bindEvents.push(function(t,e){t.getPlaceholder().resize(i)}),e.hooks.shutdown.push(function(t,e){t.getPlaceholder().unbind("resize",i)})},options:{},name:"resize",version:"1.0"});