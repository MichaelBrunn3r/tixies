import{S as t,i as n,s,e,c as a,a as i,d as c,b as r,f as o,n as u,o as l,g as h,h as f,j as d,t as m,k as p,l as v,m as x,p as y,q as $,r as w,u as g,v as F,w as E,x as A}from"./client.062d859f.js";function z(t,n,s){return Math.min(Math.max(t,n),s)}function B(t){let n,s;return{c(){n=e("canvas"),this.h()},l(t){n=a(t,"CANVAS",{width:!0,height:!0,class:!0}),i(n).forEach(c),this.h()},h(){r(n,"width",s=P+","),r(n,"height",P),r(n,"class","svelte-szljto")},m(s,e){o(s,n,e),t[4](n)},p:u,i:u,o:u,d(s){s&&c(n),t[4](null)}}}let P=1800;function M(t,n,s){var e=this&&this.__awaiter||function(t,n,s,e){return new(s||(s=Promise))((function(a,i){function c(t){try{o(e.next(t))}catch(t){i(t)}}function r(t){try{o(e.throw(t))}catch(t){i(t)}}function o(t){var n;t.done?a(t.value):(n=t.value,n instanceof s?n:new s((function(t){t(n)}))).then(c,r)}o((e=e.apply(t,n||[])).next())}))};let a,i,c,r,o,{functionBody:u}=n,{size:f}=n;return l((()=>e(void 0,void 0,void 0,(function*(){let t;return i=a.getContext("2d"),i.imageSmoothingEnabled=!0,t=requestAnimationFrame((function n(){!function(t,n){i.clearRect(0,0,a.width,a.height);for(let s=0;s<f;s++)for(let e=0;e<f;e++){const a=z(c(t,s*f+e,e,s),-1,1);n(i,e,s,Math.abs(a),a<0?"#FF0000":"#FFFFFF")}}(1*window.performance.now()/1e3,((t,n,s,e,a)=>function(t,n,s,e,a){t.fillStyle=a,t.beginPath(),t.arc(n,s,e,0,2*Math.PI),t.fill()}(t,r+n*o,r+s*o,r*e,a))),t=requestAnimationFrame(n)})),()=>{cancelAnimationFrame(t)}})))),t.$$set=t=>{"functionBody"in t&&s(1,u=t.functionBody),"size"in t&&s(2,f=t.size)},t.$$.update=()=>{if(4&t.$$.dirty&&s(3,r=P/f/2),8&t.$$.dirty&&(o=2*r),2&t.$$.dirty)try{c=new Function("t","i","x","y",`\n\t\t\t\ttry {\n\t\t\t\t\treturn ${u};\n\t\t\t\t} catch(e) {\n\t\t\t\t\treturn 0;\n\t\t\t\t}\n\t\t\t`)}catch(t){c=()=>1}},[a,u,f,r,function(t){h[t?"unshift":"push"]((()=>{a=t,s(0,a)}))}]}class b extends t{constructor(t){super(),n(this,t,M,B,s,{functionBody:1,size:2})}}function I(t){let n,s,u,l,h,z,B,P,M,I,V,j,q,D,C,R,T,_;return u=new b({props:{size:S,functionBody:t[0]}}),{c(){n=e("div"),s=e("div"),f(u.$$.fragment),l=d(),h=e("div"),z=e("p"),B=m("// time (seconds), index, column, row"),P=d(),M=e("p"),I=m("(t,i,x,y) => {"),V=d(),j=e("textarea"),q=d(),D=e("p"),C=m("}"),this.h()},l(t){n=a(t,"DIV",{class:!0});var e=i(n);s=a(e,"DIV",{class:!0});var r=i(s);p(u.$$.fragment,r),r.forEach(c),l=v(e),h=a(e,"DIV",{class:!0});var o=i(h);z=a(o,"P",{class:!0});var f=i(z);B=x(f,"// time (seconds), index, column, row"),f.forEach(c),P=v(o),M=a(o,"P",{class:!0});var d=i(M);I=x(d,"(t,i,x,y) => {"),d.forEach(c),V=v(o),j=a(o,"TEXTAREA",{type:!0,class:!0}),i(j).forEach(c),q=v(o),D=a(o,"P",{class:!0});var m=i(D);C=x(m,"}"),m.forEach(c),o.forEach(c),e.forEach(c),this.h()},h(){r(s,"class","tixy-wrapper svelte-4nuhix"),r(z,"class","comment svelte-4nuhix"),r(M,"class","svelte-4nuhix"),r(j,"type","text"),r(j,"class","svelte-4nuhix"),r(D,"class","svelte-4nuhix"),r(h,"class","input-wrapper svelte-4nuhix"),r(n,"class","wrapper svelte-4nuhix")},m(e,a){o(e,n,a),y(n,s),$(u,s,null),y(n,l),y(n,h),y(h,z),y(z,B),y(h,P),y(h,M),y(M,I),y(h,V),y(h,j),w(j,t[0]),y(h,q),y(h,D),y(D,C),R=!0,T||(_=g(j,"input",t[1]),T=!0)},p(t,[n]){const s={};1&n&&(s.functionBody=t[0]),u.$set(s),1&n&&w(j,t[0])},i(t){R||(F(u.$$.fragment,t),R=!0)},o(t){E(u.$$.fragment,t),R=!1},d(t){t&&c(n),A(u),T=!1,_()}}}let S=4;function V(t,n,s){let e="Math.sin(y/8+t)";return[e,function(){e=this.value,s(0,e)}]}export default class extends t{constructor(t){super(),n(this,t,V,I,s,{})}}
