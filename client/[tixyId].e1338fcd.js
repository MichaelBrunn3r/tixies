import{S as t,i as s,s as r,c as i,e as n,m as a,t as e,g as o,h as d}from"./client.5cf2e613.js";import"./CanvasTixy.02065d34.js";import{T as c}from"./TixyEditor.d4154613.js";function x(t){let s,r;return s=new c({props:{tixyId:t[0]}}),{c(){i(s.$$.fragment)},l(t){n(s.$$.fragment,t)},m(t,i){a(s,t,i),r=!0},p(t,[r]){const i={};1&r&&(i.tixyId=t[0]),s.$set(i)},i(t){r||(e(s.$$.fragment,t),r=!0)},o(t){o(s.$$.fragment,t),r=!1},d(t){d(s,t)}}}async function m(t){const{tixyId:s}=t.params;return{tixyId:s}}function f(t,s,r){let{tixyId:i}=s;return t.$$set=t=>{"tixyId"in t&&r(0,i=t.tixyId)},[i]}export default class extends t{constructor(t){super(),s(this,t,f,x,r,{tixyId:0})}}export{m as preload};
