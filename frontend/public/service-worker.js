self.addEventListener("fetch", (event) => {
    if (event.request.method === "POST") {
      event.respondWith(
        (async () => {
          try {
            const response = await fetch(event.request.clone());
            return response;
          } catch (err) {
            console.error(err);
            const clonedRequest = await event.request.clone().text();
            storeRequestOffline(event.request.url, clonedRequest, event.request.method);
            return new Response(
              JSON.stringify({ success: false, message: "Request stored offline" }),
              { headers: { "Content-Type": "application/json" } }
            );
          }
        })()
      );
    } else {
      // GET request handling
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });
  
  // Fonction pour ajouter des requêtes dans IndexedDB
  function storeRequestOffline(url, body, method) {
    const request = indexedDB.open("offline-requests", 1);
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("requests", "readwrite");
      const store = tx.objectStore("requests");
      store.add({ url, body, method });
    };
  }
  