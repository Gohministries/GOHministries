const CACHE = "goh-v1";

const FILES = [
  "/",
  "/index.html",
  "/about.html",
  "/ministries.html",
  "/bible-school.html",
  "/courses.html",
  "/enroll.html",
  "/events.html",
  "/media.html",
  "/sermons.html",
  "/prayer.html",
  "/contact.html",
  "/privacy.html",
  "/terms.html",
  "/refund.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request)
      .then(response => {

        if (
          !response ||
          response.status !== 200 ||
          response.type !== "basic"
        ) {
          return response;
        }

        const copy = response.clone();

        caches.open(CACHE).then(cache => {
          cache.put(event.request, copy);
        });

        return response;
      })
      .catch(() => caches.match(event.request))
  );
});