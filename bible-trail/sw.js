// 離線功能：有網路時先拿網站上的最新版，沒網路（或網路太慢）才用手機裡存的版本。
// 這樣每次更新，使用者打開一次就是新版；在山上沒訊號時也照樣能看。
// 改了任何 App 檔案，還是要把版本號 +1，舊的存檔才會被清掉、新的照片才會預先存好。
const VERSION = "bible-trail-v18";
const SHELL = ["./", "index.html", "style.css", "app.js", "data.js", "data-pt.js", "data-no.js", "data-ar.js", "verses.js", "cert.js", "journal.js", "trips.js", "manifest.webmanifest", "icon.svg", "icon-180.png", "icon-512.png",
  "img/bethany.jpg", "img/elijah.jpg", "img/shittim.jpg", "img/moab.jpg", "img/nebo.jpg", "img/madaba.jpg", "img/heshbon.jpg", "img/citadel.jpg", "img/theatre.jpg", "img/jabbok.jpg", "img/penuel.jpg", "img/gadara.jpg", "img/gerasa.jpg", "img/irbid.jpg",
  "img/machaerus.jpg", "img/dibon.jpg", "img/mephaath.jpg", "img/arnon.jpg", "img/kerak.jpg", "img/sodom.jpg", "img/bozrah.jpg", "img/sela.jpg", "img/tophel.jpg", "img/punon.jpg", "img/petra.jpg", "img/aaron.jpg", "img/aylachurch.jpg", "img/pella.jpg"];
const LIBS = ["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"];
// 網路超過這個時間還沒回應，就先用手機裡的版本，不讓人乾等
const NETWORK_TIMEOUT_MS = 4000;

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

// 先問網路，拿到就順便更新手機裡的存檔；網路失敗或太慢就用存檔
function networkFirst(request) {
  const url = new URL(request.url);
  url.search = "";
  const key = url.href;
  // cache: "no-cache" 讓瀏覽器每次都跟網站確認有沒有新版，不會拿到瀏覽器自己的舊快取
  const fromNetwork = fetch(key, { cache: "no-cache", credentials: "same-origin" }).then((res) => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(key, copy)).catch((err) => console.warn("[BibleTrail] 存檔失敗", err));
    }
    return res;
  });
  // 如果先用了存檔、網路後來才失敗，這裡接住，避免出現多餘的錯誤訊息
  fromNetwork.catch(() => {});
  const fromCache = () => caches.match(key);
  const timeout = new Promise((resolve) => setTimeout(resolve, NETWORK_TIMEOUT_MS));
  return Promise.race([fromNetwork, timeout.then(fromCache)])
    .then((res) => res || fromNetwork)
    .catch(() => fromCache().then((hit) => hit || Response.error()));
}

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // 地圖圖磚不存（量太大），直接走網路
  if (url.hostname.endsWith("tile.openstreetmap.org")) return;
  if (url.origin === self.location.origin) {
    e.respondWith(networkFirst(e.request));
    return;
  }
  // 地圖套件（固定版本，不會變）：先用存檔，沒有才上網抓
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
