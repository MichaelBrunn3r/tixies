import{S as t,i as s,s as a,c as r,e as i,m as n,t as e,g as o,h as c}from"./client.6e025ad6.js";import"./CanvasTixy.31c0ab81.js";import{T as d}from"./TixyEditor.5725adcc.js";function x(t){let s,a;return s=new d({props:{tixyId:t[0]}}),{c(){r(s.$$.fragment)},l(t){i(s.$$.fragment,t)},m(t,r){n(s,t,r),a=!0},p(t,[a]){const r={};1&a&&(r.tixyId=t[0]),s.$set(r)},i(t){a||(e(s.$$.fragment,t),a=!0)},o(t){o(s.$$.fragment,t),a=!1},d(t){c(s,t)}}}async function m(t){const{tixyId:s}=t.params;return{tixyId:s}}function y(t,s,a){let{tixyId:r}=s;return t.$$set=t=>{"tixyId"in t&&a(0,r=t.tixyId)},[r]}export default class extends t{constructor(t){super(),s(this,t,y,x,a,{tixyId:0})}}export{m as preload};
