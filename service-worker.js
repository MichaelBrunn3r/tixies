!function(){"use strict";const e=1607908029450,t=`cache${e}`,c=["/client/client.32976650.js","/client/inject_styles.5607aec6.js","/client/index.2716e270.js","/client/TixyEditor.2744c647.js","/client/tixies.bc638bcc.js","/client/gallery.f8a2c7f6.js","/client/about.cba9ca22.js","/client/[tixyId].d6fcb5c7.js"].concat(["/service-worker-index.html","/favicon.png","/global.css"]),s=new Set(c);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(c))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const c of e)c!==t&&await caches.delete(c);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const c=new URL(t.request.url),n=c.protocol.startsWith("http"),a=c.hostname===self.location.hostname&&c.port!==self.location.port,i=c.host===self.location.host&&s.has(c.pathname),l="only-if-cached"===t.request.cache&&!i;!n||a||l||t.respondWith((async()=>i&&await caches.match(t.request)||async function(t){const c=await caches.open(`offline${e}`);try{const e=await fetch(t);return c.put(t,e.clone()),e}catch(e){const s=await c.match(t);if(s)return s;throw e}}(t.request))())}))}();
