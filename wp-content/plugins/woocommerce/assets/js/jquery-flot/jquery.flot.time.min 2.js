!function(n){function y(e,t){return t*Math.floor(e/t)}function o(e,t,n,r){if("function"==typeof e.strftime)return e.strftime(t);var i,a=function(e,t){return t=""+(null==t?"0":t),1==(e=""+e).length?t+e:e},o=[],u=!1,s=e.getHours(),c=s<12;null==n&&(n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]),null==r&&(r=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]),i=12<s?s-12:0==s?12:s;for(var m=0;m<t.length;++m){var h=t.charAt(m);if(u){switch(h){case"a":h=""+r[e.getDay()];break;case"b":h=""+n[e.getMonth()];break;case"d":h=a(e.getDate());break;case"e":h=a(e.getDate()," ");break;case"h":case"H":h=a(s);break;case"I":h=a(i);break;case"l":h=a(i," ");break;case"m":h=a(e.getMonth()+1);break;case"M":h=a(e.getMinutes());break;case"q":h=""+(Math.floor(e.getMonth()/3)+1);break;case"S":h=a(e.getSeconds());break;case"y":h=a(e.getFullYear()%100);break;case"Y":h=""+e.getFullYear();break;case"p":h=c?"am":"pm";break;case"P":h=c?"AM":"PM";break;case"w":h=""+e.getDay()}o.push(h),u=!1}else"%"==h?u=!0:o.push(h)}return o.join("")}function r(e){function t(e,t,n,r){e[t]=function(){return n[r].apply(n,arguments)}}var n={date:e};e.strftime!=undefined&&t(n,"strftime",e,"strftime"),t(n,"getTime",e,"getTime"),t(n,"setTime",e,"setTime");for(var r=["Date","Day","FullYear","Hours","Milliseconds","Minutes","Month","Seconds"],i=0;i<r.length;i++)t(n,"get"+r[i],e,"getUTC"+r[i]),t(n,"set"+r[i],e,"setUTC"+r[i]);return n}function S(e,t){if("browser"==t.timezone)return new Date(e);if(t.timezone&&"utc"!=t.timezone){if("undefined"==typeof timezoneJS||"undefined"==typeof timezoneJS.Date)return r(new Date(e));var n=new timezoneJS.Date;return n.setTimezone(t.timezone),n.setTime(e),n}return r(new Date(e))}var z={second:1e3,minute:6e4,hour:36e5,day:864e5,month:2592e6,quarter:7776e6,year:525949.2*60*1e3},e=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[.25,"month"],[.5,"month"],[1,"month"],[2,"month"]],p=e.concat([[3,"month"],[6,"month"],[1,"year"]]),T=e.concat([[1,"quarter"],[2,"quarter"],[1,"year"]]);n.plot.plugins.push({init:function(e){e.hooks.processOptions.push(function(e,t){n.each(e.getAxes(),function(e,t){var g=t.options;"time"==g.mode&&(t.tickGenerator=function(e){var t=[],n=S(e.min,g),r=0,i=g.tickSize&&"quarter"===g.tickSize[1]||g.minTickSize&&"quarter"===g.minTickSize[1]?T:p;null!=g.minTickSize&&(r="number"==typeof g.tickSize?g.tickSize:g.minTickSize[0]*z[g.minTickSize[1]]);for(var a=0;a<i.length-1&&!(e.delta<(i[a][0]*z[i[a][1]]+i[a+1][0]*z[i[a+1][1]])/2&&i[a][0]*z[i[a][1]]>=r);++a);var o,u,s=i[a][0];"year"==(m=i[a][1])&&(null!=g.minTickSize&&"year"==g.minTickSize[1]?s=Math.floor(g.minTickSize[0]):(o=Math.pow(10,Math.floor(Math.log(e.delta/z.year)/Math.LN10)),s=(u=e.delta/z.year/o)<1.5?1:u<3?2:u<7.5?5:10,s*=o),s<1&&(s=1)),e.tickSize=g.tickSize||[s,m];var c=e.tickSize[0],m=e.tickSize[1],h=c*z[m];"second"==m?n.setSeconds(y(n.getSeconds(),c)):"minute"==m?n.setMinutes(y(n.getMinutes(),c)):"hour"==m?n.setHours(y(n.getHours(),c)):"month"==m?n.setMonth(y(n.getMonth(),c)):"quarter"==m?n.setMonth(3*y(n.getMonth()/3,c)):"year"==m&&n.setFullYear(y(n.getFullYear(),c)),n.setMilliseconds(0),z.minute<=h&&n.setSeconds(0),z.hour<=h&&n.setMinutes(0),z.day<=h&&n.setHours(0),4*z.day<=h&&n.setDate(1),2*z.month<=h&&n.setMonth(y(n.getMonth(),3)),2*z.quarter<=h&&n.setMonth(y(n.getMonth(),6)),z.year<=h&&n.setMonth(0);var l=0,f=Number.NaN;do{var k,d,M=f,f=n.getTime();t.push(f),"month"==m||"quarter"==m?c<1?(n.setDate(1),k=n.getTime(),n.setMonth(n.getMonth()+("quarter"==m?3:1)),d=n.getTime(),n.setTime(f+l*z.hour+(d-k)*c),l=n.getHours(),n.setHours(0)):n.setMonth(n.getMonth()+c*("quarter"==m?3:1)):"year"==m?n.setFullYear(n.getFullYear()+c):n.setTime(f+h)}while(f<e.max&&f!=M);return t},t.tickFormatter=function(e,t){var n=S(e,t.options);if(null!=g.timeformat)return o(n,g.timeformat,g.monthNames,g.dayNames);var r=t.options.tickSize&&"quarter"==t.options.tickSize[1]||t.options.minTickSize&&"quarter"==t.options.minTickSize[1],i=t.tickSize[0]*z[t.tickSize[1]],a=t.max-t.min,e=g.twelveHourClock?" %p":"",t=g.twelveHourClock?"%I":"%H",a=i<z.minute?t+":%M:%S"+e:i<z.day?a<2*z.day?t+":%M"+e:"%b %d "+t+":%M"+e:i<z.month?"%b %d":r&&i<z.quarter||!r&&i<z.year?a<z.year?"%b":"%b %Y":r&&i<z.year?a<z.year?"Q%q":"Q%q %Y":"%Y";return o(n,a,g.monthNames,g.dayNames)})})})},options:{xaxis:{timezone:null,timeformat:null,twelveHourClock:!1,monthNames:null}},name:"time",version:"1.0"}),n.plot.formatDate=o}(jQuery);