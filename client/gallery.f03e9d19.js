import{S as t,i as e,s,u as a,c as l,a as n,v as r,w as o,x as c,e as f,d as i,b as h,y as u,A as m,f as g,z as v,m as d,t as p,g as $,h as x,q as y,l as E,G as j,L as b,k as I}from"./client.9c352b4c.js";import{a as w,g as A,C as L}from"./CanvasTixy.7af22586.js";function B(t,e,s){const a=t.slice();return a[1]=e[s],a}function C(t){let e,s,y,E,j,b,I,w,B,C=A(t[1]).name+"";return y=new L({props:{code:A(t[1]).code,n:A(t[1]).n,time:t[0],resolution:300}}),{c(){e=a("div"),s=a("a"),l(y.$$.fragment),j=n(),b=a("label"),I=r(C),w=n(),this.h()},l(t){e=o(t,"DIV",{class:!0});var a=c(e);s=o(a,"A",{href:!0});var l=c(s);f(y.$$.fragment,l),l.forEach(i),j=h(a),b=o(a,"LABEL",{class:!0});var n=c(b);I=u(n,C),n.forEach(i),w=h(a),a.forEach(i),this.h()},h(){m(s,"href",E="tixy/"+t[1]),m(b,"class","name-label svelte-gjf91t"),m(e,"class","tixy svelte-gjf91t")},m(t,a){g(t,e,a),v(e,s),d(y,s,null),v(e,j),v(e,b),v(b,I),v(e,w),B=!0},p(t,e){const s={};1&e&&(s.time=t[0]),y.$set(s)},i(t){B||(p(y.$$.fragment,t),B=!0)},o(t){$(y.$$.fragment,t),B=!1},d(t){t&&i(e),x(y)}}}function D(t){let e,s,l,r=w,f=[];for(let e=0;e<r.length;e+=1)f[e]=C(B(t,r,e));const u=t=>$(f[t],1,1,(()=>{f[t]=null}));return{c(){e=n(),s=a("div");for(let t=0;t<f.length;t+=1)f[t].c();this.h()},l(t){y('[data-svelte="svelte-fw82y6"]',document.head).forEach(i),e=h(t),s=o(t,"DIV",{class:!0});var a=c(s);for(let t=0;t<f.length;t+=1)f[t].l(a);a.forEach(i),this.h()},h(){document.title="Gallery",m(s,"class","container svelte-gjf91t")},m(t,a){g(t,e,a),g(t,s,a);for(let t=0;t<f.length;t+=1)f[t].m(s,null);l=!0},p(t,[e]){if(1&e){let a;for(r=w,a=0;a<r.length;a+=1){const l=B(t,r,a);f[a]?(f[a].p(l,e),p(f[a],1)):(f[a]=C(l),f[a].c(),p(f[a],1),f[a].m(s,null))}for(I(),a=r.length;a<f.length;a+=1)u(a);E()}},i(t){if(!l){for(let t=0;t<r.length;t+=1)p(f[t]);l=!0}},o(t){f=f.filter(Boolean);for(let t=0;t<f.length;t+=1)$(f[t]);l=!1},d(t){t&&i(e),t&&i(s),j(f,t)}}}function G(t,e,s){let a=0;return b((()=>{const t=setInterval((function(){s(0,a+=.15)}),150);return()=>{clearInterval(t)}})),[a]}export default class extends t{constructor(t){super(),e(this,t,G,D,s,{})}}
