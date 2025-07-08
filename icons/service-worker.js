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

// Install event: cache static assets
self.addEventListener("install", (event) => {
event.waitUntil(
caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
);
// Activate worker immediately after install
self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", (event) => {
event.waitUntil(
caches.keys().then((cacheNames) =>
Promise.all(
cacheNames.map((key) => {
if (key !== CACHE_NAME) {
return caches.delete(key);
}
})
)
)
);
// Take control of clients immediately
self.clients.claim();
});

// Fetch event: serve cached assets first, then fallback to network
self.addEventListener("fetch", (event) => {
const req = event.request;

// Only handle GET requests
if (req.method !== "GET") return;

event.respondWith(
caches.match(req).then((cachedResponse) => {
if (cachedResponse) {
return cachedResponse;
}
return fetch(req).then((networkResponse) => {
// Dynamically cache Unsplash images (optional)
if (req.url.includes("images.unsplash.com")) {
return caches.open(CACHE_NAME).then((cache) => {
cache.put(req, networkResponse.clone());
return networkResponse;
});
}
return networkResponse;
});
})
);
});