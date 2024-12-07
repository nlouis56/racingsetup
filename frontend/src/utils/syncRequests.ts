// Ouvre la base IndexedDB pour stocker les requêtes
async function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("offline-requests", 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("requests")) {
          db.createObjectStore("requests", { keyPath: "id", autoIncrement: true });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  
  // Fonction pour ajouter une requête POST dans la base
  export async function storeOfflineRequest(url: string, body: string, method: string, headers: HeadersInit) {
    const db = await openDB();
    const tx = db.transaction('requests', 'readwrite');
    const store = tx.objectStore('requests');
  
    const offlineRequest = {
      url,
      body,
      method,
      headers, // Stocker les headers
      timestamp: new Date().toISOString(),
    };
  
    await store.add(offlineRequest);
  }
  
  // Synchronisation des requêtes stockées
  export async function syncOfflineRequests() {
    if (!navigator.onLine) return;
  
    const db = await openDB();
  
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction("requests", "readonly");
      const store = tx.objectStore("requests");
      const request = store.getAll(); // Récupère toutes les requêtes stockées
  
      request.onsuccess = async () => {
        const allRequests = request.result; // Tableau contenant les requêtes
  
        for (const req of allRequests) {
          try {
            const response = await fetch(req.url, {
              method: req.method,
              body: req.body,
              headers: { "Content-Type": "application/json", ...req.headers },
            });
  
            if (response.ok) {
              // Supprimer la requête si elle a été envoyée avec succès
              const deleteTx = db.transaction("requests", "readwrite");
              const deleteStore = deleteTx.objectStore("requests");
              deleteStore.delete(req.id);
            }
          } catch (error) {
            console.error("Error syncing request:", error);
          }
        }
        resolve();
      };
  
      request.onerror = () => reject(request.error);
    });
  }

  export async function fetchWithOfflineSupport(url: string, options: RequestInit) {
    const { method = 'POST', body = '', headers = {} } = options;
  
    if (navigator.onLine) {
      return fetch(url, options);
    } else {
      // Sauvegarde des headers pour un futur appel en ligne
      const bodyString = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : '';
      await storeOfflineRequest(url, bodyString, method, headers);
  
      return new Response(
        JSON.stringify({ message: 'Request stored for offline mode' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }
