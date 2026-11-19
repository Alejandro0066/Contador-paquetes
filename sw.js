var C="paquetes-v2",J="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js";
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(C).then(function(c){
    return Promise.all([
      c.add("./index.html").catch(function(){}),
      fetch(new Request(J,{mode:"no-cors"})).then(function(r){return c.put(J,r)}).catch(function(){})
    ]);
  }));self.skipWaiting();
});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==C}).map(function(n){return caches.delete(n)}))}));
  self.clients.claim();
});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(function(r){
    var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)}).catch(function(){});return r;
  }).catch(function(){
    return caches.match(e.request,{ignoreSearch:true}).then(function(m){
      return m||(e.request.mode==="navigate"?caches.match("./index.html"):undefined);
    });
  }));
});
