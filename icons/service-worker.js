const CACHE_NAME = "site-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/main.js",
  "/assets/music1.mp3",
  "/assets/music2.mp3",
  "/assets/music3.mp3",
  "/assets/music4.mp3",
  "/assets/music5.mp3",
  "/assets/music6.mp3",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Install: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch: serve from cache first, then fallback to network
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cachedRes) => {
      return (
        cachedRes ||
        fetch(req).then((res) => {
          // Dynamically cache Unsplash images
          if (req.url.includes("images.unsplash.com")) {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(req, res.clone());
              return res;
            });
          }
          return res;
        })
      );
    })
  );
});