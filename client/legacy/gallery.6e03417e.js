import{_ as t,a as n,b as a,c as r,i as e,d as f,S as s,s as c,y as o,f as i,e as u,z as l,A as h,B as v,j as m,g,h as d,C as p,E as y,k as $,D as E,m as j,t as x,n as D,o as R,q as I,l as b,u as A,K as B,T as C,r as w}from"./client.2af06130.js";import{a as L,g as S,C as T}from"./CanvasTixy.f74419a0.js";function V(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,f=n(t);if(r){var s=n(this).constructor;e=Reflect.construct(f,arguments,s)}else e=f.apply(this,arguments);return a(this,e)}}function k(t,n,a){var r=t.slice();return r[1]=n[a],r}function q(t){var n,a,r,e,f,s,c,I,b=S(t[1]).name+"";return r=new T({props:{code:S(t[1]).code,n:S(t[1]).n,time:t[0],resolution:300}}),{c:function(){n=o("div"),a=o("a"),i(r.$$.fragment),e=u(),f=o("label"),s=l(b),c=u(),this.h()},l:function(t){n=h(t,"DIV",{class:!0});var o=v(n);a=h(o,"A",{href:!0});var i=v(a);m(r.$$.fragment,i),i.forEach(g),e=d(o),f=h(o,"LABEL",{class:!0});var u=v(f);s=p(u,b),u.forEach(g),c=d(o),o.forEach(g),this.h()},h:function(){y(a,"href","tixy/"+t[1]),y(f,"class","name-label svelte-gjf91t"),y(n,"class","tixy svelte-gjf91t")},m:function(t,o){$(t,n,o),E(n,a),j(r,a,null),E(n,e),E(n,f),E(f,s),E(n,c),I=!0},p:function(t,n){var a={};1&n&&(a.time=t[0]),r.$set(a)},i:function(t){I||(x(r.$$.fragment,t),I=!0)},o:function(t){D(r.$$.fragment,t),I=!1},d:function(t){t&&g(n),R(r)}}}function z(t){for(var n,a,r,e=L,f=[],s=0;s<e.length;s+=1)f[s]=q(k(t,e,s));var c=function(t){return D(f[t],1,1,(function(){f[t]=null}))};return{c:function(){n=u(),a=o("div");for(var t=0;t<f.length;t+=1)f[t].c();this.h()},l:function(t){I('[data-svelte="svelte-fw82y6"]',document.head).forEach(g),n=d(t),a=h(t,"DIV",{class:!0});for(var r=v(a),e=0;e<f.length;e+=1)f[e].l(r);r.forEach(g),this.h()},h:function(){document.title="Gallery",y(a,"class","container svelte-gjf91t")},m:function(t,e){$(t,n,e),$(t,a,e);for(var s=0;s<f.length;s+=1)f[s].m(a,null);r=!0},p:function(t,n){var r=b(n,1)[0];if(1&r){var s;for(e=L,s=0;s<e.length;s+=1){var o=k(t,e,s);f[s]?(f[s].p(o,r),x(f[s],1)):(f[s]=q(o),f[s].c(),x(f[s],1),f[s].m(a,null))}for(w(),s=e.length;s<f.length;s+=1)c(s);A()}},i:function(t){if(!r){for(var n=0;n<e.length;n+=1)x(f[n]);r=!0}},o:function(t){f=f.filter(Boolean);for(var n=0;n<f.length;n+=1)D(f[n]);r=!1},d:function(t){t&&g(n),t&&g(a),B(f,t)}}}function G(t,n,a){var r=0;return C((function(){var t=setInterval((function(){a(0,r+=.15)}),150);return function(){clearInterval(t)}})),[r]}var K=function(n){t(o,s);var a=V(o);function o(t){var n;return r(this,o),n=a.call(this),e(f(n),t,G,z,c,{}),n}return o}();export default K;
