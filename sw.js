var C="paquetes-v1",J="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js";
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.all([c.add("./"),c.add("./index.html"),c.add(new Request(J,{mode:"no-cors"}))]);
  }));self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  e.respondWith(fetch(e.request).then(function(r){
    var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r;
  }).catch(function(){return caches.match(e.request,{ignoreSearch:true})}));
});
