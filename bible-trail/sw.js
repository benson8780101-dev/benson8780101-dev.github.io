// 離線功能：App 本身和照片先存在手機裡，沒網路也能看。
// 改了任何 App 檔案，都要把版本號 +1，手機才會拿到新版。
const VERSION = "bible-trail-v2";
const SHELL = ["./", "index.html", "style.css", "app.js", "data.js", "verses.js", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-512.png",
  "img/bethany.jpg", "img/elijah.jpg", "img/shittim.jpg", "img/moab.jpg", "img/nebo.jpg", "img/madaba.jpg", "img/heshbon.jpg", "img/citadel.jpg", "img/theatre.jpg"];
const LIBS = ["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then(async (c) => {
    await c.addAll(SHELL);
    // 地圖套件抓不到也沒關係，App 其他部分照樣能用
    await Promise.all(LIBS.map((u) => c.add(new Request(u, { mode: "cors" })).catch((err) => console.warn("[BibleTrail] 地圖套件沒存到", err))));
  }).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  // 地圖圖磚不存（量太大），直接走網路
  if (url.hostname.endsWith("tile.openstreetmap.org")) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request)));
});
