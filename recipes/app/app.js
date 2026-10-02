/* Benson 的食譜 App
 * 資料：recipes-data.js（從 Gemini 對話整理）＋ 使用者自己新增的食譜（IndexedDB）
 * 同步：設定頁填入 Google Apps Script 同步中心的網址與密碼後，紀錄、照片、收藏、購物清單、
 *       自己的食譜會在各支手機之間同步（每筆資料帶修改時間 t，刪除時留下 del 標記，較新的勝出）
 * 功能：搜尋／用手邊食材找、份量換算（倍數、人數、以某個材料為基準）、°C/°F、
 *       食材阿拉伯文、替代食材、多工計時器、實作紀錄（含照片）、購物清單、備份
 */
(() => {
"use strict";

// ---------- 小工具 ----------
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ls = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const today = () => new Date().toLocaleDateString("sv-SE");

// ---------- 語言（中文／English） ----------
let lang = ls.get("lang", /^zh/i.test(navigator.language || "zh") ? "zh" : "en");
const EN = () => lang === "en";
const L = (zh, en) => EN() ? en : zh;
const CAT_EN = { 全部: "All", 雞: "Chicken", 牛: "Beef", 羊: "Lamb", 豬: "Pork", 海鮮: "Seafood", 蔬菜: "Vegetables", 蛋豆腐: "Eggs & Tofu", 湯鍋: "Soups & Stews", 飯麵: "Rice & Noodles", 醬料: "Sauces", 醃料: "Marinades", 沙拉: "Salads", 點心: "Snacks", 甜點: "Desserts", 飲料: "Drinks", 麵包酸種: "Bread & Sourdough", 發酵: "Fermentation" };
const TAG_EN = { 收藏: "Favorites", 我的版本: "My version", 有紀錄: "Cooked", 請客: "For guests", 低渣: "Low-residue", 生病時: "When sick", ...CAT_EN };
const catName = c => EN() ? CAT_EN[c] || c : c;
const tagName = c => EN() ? TAG_EN[c] || c : c;
function setLang(l) { lang = l; ls.set("lang", l); applyStatic(); render(); }
function applyStatic() {
  document.documentElement.lang = L("zh-Hant", "en");
  document.title = L("Benson 的食譜", "Benson & Esther's Recipes");
  $(".brand").textContent = L("🍳 食譜", "🍳 Recipes");
  $("#nav-shop").title = L("購物清單", "Shopping list"); $("#nav-timers").title = L("計時器", "Timers");
  $("#nav-add").title = L("新增食譜", "Add recipe"); $("#nav-set").title = L("設定", "Settings");
  $("#nav-lang").textContent = L("EN", "中"); $("#nav-lang").title = L("Switch to English", "切換成中文");
  $(".alarm-title").textContent = L("⏰ 時間到！", "⏰ Time's up!");
  $("#alarm-stop").textContent = L("知道了，停止鈴聲", "OK, stop the alarm");
}
// 英文翻譯：內建食譜在 recipes-en.js（RECIPES_EN[id]），同步進來的食譜放在 r.en。
// 結構跟中文一樣（groups/items/steps/tips 的順序一一對應），items 是 [名稱, 份量, 備註]
function loc(r) {
  const e = EN() && (r.en || (window.RECIPES_EN || {})[r.id]);
  const base = { ...r, zhTitle: r.title, groups: r.groups.map(g => ({ ...g, items: g.items.map(it => ({ ...it, zh: it.name })) })) };
  if (!e) return { ...base, zhTitle: null };
  return { ...base, title: e.title || r.title, intro: e.intro ?? r.intro,
    groups: base.groups.map((g, gi) => { const eg = (e.groups || [])[gi] || {}; return { name: eg.name || g.name, items: g.items.map((it, ii) => { const ei = (eg.items || [])[ii]; return ei ? { ...it, name: ei[0] || it.name, amt: ei[1] ?? it.amt, note: ei[2] ?? it.note } : it; }) }; }),
    steps: r.steps.map((s, i) => (e.steps || [])[i] || s), tips: r.tips.map((s, i) => (e.tips || [])[i] || s),
    mine: (r.mine || []).map((m, i) => ({ ...m, text: (e.mine || [])[i] || m.text })), ask: e.ask || "" };
}

// ---------- IndexedDB（使用者食譜、實作紀錄、照片） ----------
let dbp;
function db() {
  if (!dbp) dbp = new Promise((res, rej) => {
    const r = indexedDB.open("benson-recipes", 1);
    r.onupgradeneeded = () => {
      const d = r.result;
      d.createObjectStore("recipes", { keyPath: "id" });
      d.createObjectStore("logs", { keyPath: "id" }).createIndex("rid", "rid");
      d.createObjectStore("photos", { keyPath: "id" });
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return dbp;
}
async function tx(store, mode, fn) {
  const d = await db();
  return new Promise((res, rej) => {
    const t = d.transaction(store, mode); const s = t.objectStore(store);
    const out = fn(s); t.oncomplete = () => res(out instanceof IDBRequest ? out.result : out); t.onerror = () => rej(t.error);
  });
}
const idbAll = store => tx(store, "readonly", s => s.getAll());
const idbPut = (store, v) => tx(store, "readwrite", s => s.put(v));
const idbDel = (store, k) => tx(store, "readwrite", s => s.delete(k));
const idbGet = (store, k) => tx(store, "readonly", s => s.get(k));

// ---------- 資料 ----------
let userRecipes = [];
const allRecipes = () => [...userRecipes, ...window.RECIPES];
const findRecipe = id => allRecipes().find(r => r.id === id);
const CATS = ["全部", "雞", "牛", "羊", "豬", "海鮮", "蔬菜", "蛋豆腐", "湯鍋", "飯麵", "醬料", "醃料", "沙拉", "點心", "甜點", "飲料", "麵包酸種", "發酵"];
const TAGS = ["收藏", "我的版本", "有紀錄", "請客", "低渣", "生病時"];
function favRecs() {
  let m = ls.get("favRecs", null);
  if (!m) { m = {}; for (const id of ls.get("favs", [])) m[id] = { id, on: true, t: Date.now() }; ls.set("favRecs", m); }
  return m;
}
const favs = () => new Set(Object.values(favRecs()).filter(x => x.on).map(x => x.id));
function setFav(id, on) { const m = favRecs(); m[id] = { id, on, t: Date.now() }; ls.set("favRecs", m); markDirty("favs", id); }

// ---------- 同步 ----------
const syncCfg = () => ls.get("sync", { url: "", token: "" });
let syncState = { busy: false, msg: "", last: ls.get("syncLast", 0) };
function markDirty(coll, id) { const d = ls.get("dirty", {}); (d[coll] = d[coll] || {})[id] = 1; ls.set("dirty", d); scheduleSync(); }
let syncT;
function scheduleSync(ms = 2500) { clearTimeout(syncT); syncT = setTimeout(() => syncNow(), ms); }
async function api(body) {
  const c = syncCfg(); if (!c.url || !c.token) throw new Error(L("還沒設定同步", "sync is not set up"));
  const r = await fetch(c.url, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify({ ...body, token: c.token }) });
  const j = await r.json(); if (!j.ok) throw new Error(j.error || L("同步失敗", "sync failed")); return j;
}
async function syncNow(manual) {
  const c = syncCfg(); if (!c.url || !c.token || syncState.busy || !navigator.onLine) return;
  syncState.busy = true;
  try {
    const dirty = ls.get("dirty", {});
    const changes = { recipes: [], logs: [], favs: [], shop: [] };
    for (const id of Object.keys(dirty.recipes || {})) { const r = await idbGet("recipes", id); if (r) changes.recipes.push(r); }
    for (const id of Object.keys(dirty.logs || {})) { const r = await idbGet("logs", id); if (r) changes.logs.push(r); }
    const fm = favRecs(); for (const id of Object.keys(dirty.favs || {})) if (fm[id]) changes.favs.push(fm[id]);
    for (const id of Object.keys(dirty.shop || {})) { const x = shop.find(y => y.id === id); if (x) changes.shop.push(x); }
    const res = await api({ action: "sync", since: syncState.last, changes });
    // 送出成功：清掉這次送出的待同步標記（同步途中又改的會留著）
    const d2 = ls.get("dirty", {});
    for (const k of Object.keys(changes)) for (const r of changes[k]) if (d2[k]) delete d2[k][r.id];
    ls.set("dirty", d2);
    let changed = false;
    for (const r of res.data.recipes) { const l = await idbGet("recipes", r.id); if (!l || (r.t || 0) > (l.t || 0)) { await idbPut("recipes", r); changed = true; } }
    for (const r of res.data.logs) { const l = await idbGet("logs", r.id); if (!l || (r.t || 0) > (l.t || 0)) { await idbPut("logs", r); changed = true; } }
    const fm2 = favRecs(); for (const r of res.data.favs) { if (!fm2[r.id] || (r.t || 0) > (fm2[r.id].t || 0)) { fm2[r.id] = r; changed = true; } } ls.set("favRecs", fm2);
    for (const r of res.data.shop) { const i = shop.findIndex(y => y.id === r.id); if (i < 0) { shop.push(r); changed = true; } else if ((r.t || 0) > (shop[i].t || 0)) { shop[i] = r; changed = true; } }
    if (changed) { shopSnap = snapOf(shop); ls.set("shop", shop); }
    // 上傳還沒上傳過的照片
    for (const p of await idbAll("photos")) if (!p.up) {
      const b64 = await new Promise(ok => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(",")[1]); fr.readAsDataURL(p.blob); });
      await api({ action: "putPhoto", id: p.id, data: b64 }); p.up = true; await idbPut("photos", p);
    }
    syncState.last = res.time; ls.set("syncLast", res.time);
    syncState.msg = L("✓ 已同步 ", "✓ Synced ") + new Date().toLocaleTimeString(L("zh-TW", "en-GB"), { hour: "2-digit", minute: "2-digit" });
    if (changed) { await load(); if (!location.hash.startsWith("#/add") && !document.activeElement.matches("textarea,input")) render(); }
    if (manual) toast(syncState.msg);
  } catch (e) { syncState.msg = L("⚠︎ 同步失敗：", "⚠︎ Sync failed: ") + e.message; if (manual) toast(syncState.msg); }
  finally { syncState.busy = false; const el = $("#sync-msg"); if (el) el.textContent = syncState.msg; }
}
async function photoBlob(pid) {
  const ph = await idbGet("photos", pid).catch(() => null); if (ph) return ph.blob;
  try { const j = await api({ action: "getPhoto", id: pid }); const blob = await (await fetch("data:image/jpeg;base64," + j.data)).blob(); await idbPut("photos", { id: pid, blob, up: true }); return blob; } catch { return null; }
}
let logCount = {};

// ---------- 食材字典與替代 ----------
const DICT = (window.ING_DICT || []).slice().sort((a, b) => b[0].length - a[0].length);
function arOf(name) { for (const d of DICT) if (name.includes(d[0])) return { ar: d[1], p: d[2], en: d[3] }; return null; }
function subOf(name) { for (const k of Object.keys(window.SUBS || {})) if (name.includes(k)) return (EN() && (window.SUBS_EN || {})[k]) || window.SUBS[k]; return null; }

// ---------- 份量換算 ----------
const FRAC = { "½": .5, "¼": .25, "¾": .75, "⅓": 1 / 3, "⅔": 2 / 3 };
function num(s) { s = String(s).replace(/,/g, ""); if (FRAC[s]) return FRAC[s]; if (/^\d+\/\d+$/.test(s)) { const [a, b] = s.split("/"); return +a / +b; } return parseFloat(s); }
function fmt(n) {
  if (!isFinite(n)) return "";
  if (n >= 100) return String(Math.round(n));
  if (n >= 10) return String(Math.round(n * 2) / 2).replace(/\.0$/, "");
  if (n >= 1) return String(Math.round(n * 10) / 10); // 1–10：小數一位
  return String(Math.round(n * 100) / 100);           // 小於 1：小數兩位
}
// 不換算：溫度、時間、長度
const NO_SCALE = /^\s*(°|℃|度|分鐘|分|秒|小時|公分|cm|mm|吋|%|(?:min|mins|minutes?|sec|secs|seconds?|hours?|hrs?|inch(?:es)?|days?)\b)/i;
const NUM_RE = /(\d[\d,]*(?:\.\d+)?|\d+\/\d+|[½¼¾⅓⅔])(\s*[-–～~至到]\s*(\d[\d,]*(?:\.\d+)?|\d+\/\d+))?/g;
function scaleText(s, f) {
  if (!s || f === 1) return s;
  return s.replace(NUM_RE, (m, a, rng, b, off, all) => {
    const after = all.slice(off + m.length, off + m.length + 10);
    if (NO_SCALE.test(after)) return m;
    const x = fmt(num(a) * f);
    return b ? `${x}–${fmt(num(b) * f)}` : x;
  });
}
function firstNum(s) { const m = String(s).match(/(\d[\d,]*(?:\.\d+)?|\d+\/\d+|[½¼¾⅓⅔])/); return m ? num(m[1]) : null; }

// ---------- 溫度 ----------
function tempText(s, unit) {
  // 找「數字＋°C/℃/度C」或「烤箱/油溫…數字＋度」
  return esc(s).replace(/(\d{2,3})(?:\s*[-–～~]\s*(\d{2,3}))?\s*(°\s*C|℃|度\s*C|°F|度\s*F|度)/g, (m, a, b, u) => {
    const isF = /F/.test(u);
    if (/^度$/.test(u.trim()) && (+a < 40 || +a > 300)) return m; // 不像溫度
    const c = isF ? v => Math.round((v - 32) * 5 / 9) : v => v;
    const toF = v => Math.round(v * 9 / 5 + 32);
    const cA = c(+a), cB = b ? c(+b) : null;
    const C = cB ? `${cA}–${cB}°C` : `${cA}°C`;
    const F = cB ? `${toF(cA)}–${toF(cB)}°F` : `${toF(cA)}°F`;
    const show = unit === "F" ? F : unit === "both" ? `${C}（${F}）` : C;
    return `<span class="temp">${show}</span>`;
  });
}

// ---------- 計時器 ----------
let timers = ls.get("timers", []);
const saveTimers = () => { ls.set("timers", timers); updateBadges(); };
function addTimer(label, sec, sub = "") {
  timers.push({ id: uid(), label, sub, dur: sec, end: Date.now() + sec * 1000, paused: false, left: sec, done: false });
  saveTimers(); unlockAudio(); askNotify(); toast(L(`⏱ 開始計時：${label}（${hms(sec)}）`, `⏱ Timer started: ${label} (${hms(sec)})`)); render();
}
const hms = s => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return (h ? h + ":" + String(m).padStart(2, "0") : m) + ":" + String(x).padStart(2, "0"); };
const leftOf = t => t.paused ? t.left : Math.max(0, (t.end - Date.now()) / 1000);
function tick() {
  let ring = [];
  for (const t of timers) if (!t.paused && !t.done && leftOf(t) <= 0) { t.done = true; ring.push(t); }
  if (ring.length) { saveTimers(); alarm(ring); }
  document.querySelectorAll("[data-left]").forEach(el => { const t = timers.find(x => x.id === el.dataset.left); if (t) el.textContent = t.done ? "0:00" : hms(leftOf(t)); });
  const f = $("#float-timer"); const run = timers.filter(t => !t.done);
  if (f) { if (run.length && !location.hash.startsWith("#/timers")) { const n = run.slice().sort((a, b) => leftOf(a) - leftOf(b))[0]; f.hidden = false; f.textContent = `⏱ ${n.label} ${hms(leftOf(n))}${run.length > 1 ? `　＋${run.length - 1}` : ""}`; } else f.hidden = true; }
}
let actx, ringing = null;
function unlockAudio() { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); if (actx.state === "suspended") actx.resume(); } catch {} }
function beep() {
  if (!actx) return;
  const t0 = actx.currentTime;
  for (let i = 0; i < 3; i++) { const o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = 880; o.connect(g); g.connect(actx.destination);
    g.gain.setValueAtTime(.0001, t0 + i * .35); g.gain.exponentialRampToValueAtTime(.4, t0 + i * .35 + .02); g.gain.exponentialRampToValueAtTime(.0001, t0 + i * .35 + .25);
    o.start(t0 + i * .35); o.stop(t0 + i * .35 + .3); }
}
function alarm(list) {
  $("#alarm-list").innerHTML = list.map(t => `<div>${esc(t.label)}</div>`).join("");
  $("#alarm").hidden = false;
  beep(); clearInterval(ringing); ringing = setInterval(beep, 1500);
  try { navigator.vibrate && navigator.vibrate([400, 200, 400, 200, 400]); } catch {}
  try { if (window.Notification && Notification.permission === "granted") list.forEach(t => new Notification(L("⏰ 時間到", "⏰ Time's up"), { body: t.label })); } catch {}
}
function askNotify() { try { if (window.Notification && Notification.permission === "default") Notification.requestPermission(); } catch {} }

// ---------- 購物清單 ----------
let shop = ls.get("shop", []);
const snapOf = arr => Object.fromEntries(arr.map(x => [x.id, JSON.stringify({ ...x, t: 0 })]));
let shopSnap = snapOf(shop);
const liveShop = () => shop.filter(x => !x.del);
function saveShop() {
  const now = Date.now(), ids = new Set(shop.map(x => x.id));
  for (const id of Object.keys(shopSnap)) if (!ids.has(id)) { shop.push({ id, del: true, t: now }); markDirty("shop", id); }
  for (const x of shop) { const j = JSON.stringify({ ...x, t: 0 }); if (shopSnap[x.id] !== j) { x.t = now; markDirty("shop", x.id); } }
  shopSnap = snapOf(shop); ls.set("shop", shop); updateBadges();
}
function addShop(name, amt, from, zh) { if (liveShop().some(x => x.name === name && !x.got)) { toast(L(`已經在清單：${name}`, `Already on the list: ${name}`)); return; } shop.push({ id: uid(), name, amt, from, zh, got: false }); saveShop(); toast(L(`🛒 已加入：${name}`, `🛒 Added: ${name}`)); }

function updateBadges() {
  $("#timer-count").textContent = timers.filter(t => !t.done).length || "";
  $("#shop-count").textContent = liveShop().filter(x => !x.got).length || "";
}
let toastT;
function toast(msg) { let el = $("#toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "float-timers"; el.style.bottom = "70px"; document.body.appendChild(el); } el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 2200); }

// ---------- 畫面：清單 ----------
let listState = ls.get("listState", { q: "", mode: "name", cat: "全部", tag: "" });
// 搜尋同時比對中文和英文（不分大小寫）
const ingNames = r => r.groups.flatMap(g => g.items.map(i => i.name + (i.zh && i.zh !== i.name ? " " + i.zh : "")));
function recipeText(r) { return [r.title, r.zhTitle || "", r.cat, catName(r.cat), ...(r.tags || []).map(t => t + " " + tagName(t)), ...ingNames(r)].join(" ").toLowerCase(); }
function renderList() {
  const s = listState, fv = favs();
  // 有逗號時用逗號分開（英文材料常是兩個字，例如 green onion），否則用空格
  const terms = s.q.toLowerCase().split(/[,，、]/.test(s.q) ? /\s*[,，、]+\s*/ : /\s+/).filter(Boolean);
  let rs = allRecipes().map(r => ({ r: loc(r), hit: [] }));
  if (s.cat !== "全部") rs = rs.filter(x => x.r.cat === s.cat || (x.r.tags || []).includes(s.cat));
  if (s.tag === "收藏") rs = rs.filter(x => fv.has(x.r.id));
  else if (s.tag === "我的版本") rs = rs.filter(x => (x.r.mine || []).length || x.r.user);
  else if (s.tag === "有紀錄") rs = rs.filter(x => logCount[x.r.id]);
  else if (s.tag) rs = rs.filter(x => (x.r.tags || []).includes(s.tag));
  if (terms.length) {
    if (s.mode === "have") {
      rs.forEach(x => { const names = (ingNames(x.r).join(" ") + " " + x.r.title + " " + (x.r.zhTitle || "")).toLowerCase(); x.hit = terms.filter(t => names.includes(t)); });
      rs = rs.filter(x => x.hit.length).sort((a, b) => b.hit.length - a.hit.length);
    } else rs = rs.filter(x => { const t = recipeText(x.r); return terms.every(q => t.includes(q)); });
  }
  const catChips = CATS.map(c => `<button class="chip ${s.cat === c ? "on" : ""}" data-cat="${c}">${esc(catName(c))}</button>`).join("");
  const tagChips = TAGS.map(c => `<button class="chip ${s.tag === c ? "on" : ""}" data-tag="${c}">${c === "收藏" ? "★ " : ""}${esc(tagName(c))}</button>`).join("");
  $("#view").innerHTML = `
    <div class="seg"><button data-mode="name" class="${s.mode === "name" ? "on" : ""}">${L("找菜名", "By name")}</button><button data-mode="have" class="${s.mode === "have" ? "on" : ""}">${L("用手邊食材找", "By what I have")}</button></div>
    <div class="search"><input id="q" type="search" value="${esc(s.q)}" placeholder="${s.mode === "have" ? L("例如：雞肉 高麗菜 洋蔥", "e.g. chicken, cabbage, onion") : L("搜尋菜名或材料，例如：鹹酥雞", "Search dishes or ingredients, e.g. popcorn chicken")}" autocomplete="off"></div>
    <div class="chips">${catChips}</div>
    <div class="chips">${tagChips}</div>
    <p class="muted">${L(`${rs.length} 道食譜`, `${rs.length} recipe${rs.length === 1 ? "" : "s"}`)}</p>
    <div class="list">${rs.map(({ r, hit }) => `
      <a class="card" href="#/r/${r.id}">
        <div class="t">${fv.has(r.id) ? "★ " : ""}${esc(r.title)}${r.zhTitle && r.zhTitle !== r.title ? ` <span class="zh-sub">${esc(r.zhTitle)}</span>` : ""}</div>
        <div class="m">${esc(catName(r.cat))}${r.servings ? L(` · ${r.servings} 人份`, ` · serves ${r.servings}`) : ""}${logCount[r.id] ? L(` · 做過 ${logCount[r.id]} 次`, ` · made ${logCount[r.id]}×`) : ""}
          ${(r.tags || []).map(t => `<span class="tag">${esc(tagName(t))}</span>`).join("")}${(r.mine || []).length || r.user ? `<span class="tag ok">${L("我的版本", "My version")}</span>` : ""}</div>
        ${hit.length ? `<div class="match">${L("✓ 有：", "✓ Have: ")}${hit.map(esc).join(L("、", ", "))}</div>` : ""}
      </a>`).join("") || `<div class="empty">${L("找不到符合的食譜", "No matching recipes")}</div>`}</div>`;
  const q = $("#q");
  q.oninput = () => { s.q = q.value; ls.set("listState", s); clearTimeout(q._t); q._t = setTimeout(() => { const pos = q.selectionStart; renderList(); const n = $("#q"); n.focus(); n.setSelectionRange(pos, pos); }, 250); };
  $("#view").onclick = e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.mode) { s.mode = b.dataset.mode; } else if (b.dataset.cat) { s.cat = b.dataset.cat; } else if (b.dataset.tag) { s.tag = s.tag === b.dataset.tag ? "" : b.dataset.tag; } else return;
    ls.set("listState", s); renderList();
  };
}

// ---------- 畫面：食譜內容 ----------
let view = { id: null, f: 1, base: null };
const prefs = () => ls.get("prefs", { ar: true, temp: "both" });
function stepHtml(s, r, i, unit) {
  let h = tempText(s, unit);
  // 計時按鈕：X 分鐘／X–Y 分鐘／X 小時／X 秒／半小時；英文 X min / X–Y minutes / X hours / X seconds / half an hour
  h = h.replace(/(\d+(?:\.\d+)?)(?:\s*[-–～~至到]\s*(\d+(?:\.\d+)?))?\s*(分鐘|分|小時|秒)(?![a-zA-Z])/g, (m, a, b, u) => {
    const v = +(b || a); const sec = u === "小時" ? v * 3600 : u === "秒" ? v : v * 60;
    if (!sec || sec > 12 * 3600) return m;
    return `${m}<button class="tbtn" data-timer="${sec}" data-step="${i}">⏱</button>`;
  }).replace(/半小時/g, `半小時<button class="tbtn" data-timer="1800" data-step="${i}">⏱</button>`);
  h = h.replace(/(\d+(?:\.\d+)?)(?:\s*(?:-|–|to)\s*(\d+(?:\.\d+)?))?[\s-]*(minutes?|mins?|hours?|hrs?|seconds?|secs?)\b/gi, (m, a, b, u) => {
    const v = +(b || a); u = u.toLowerCase(); const sec = u.startsWith("h") ? v * 3600 : u.startsWith("s") ? v : v * 60;
    if (!sec || sec > 12 * 3600) return m;
    return `${m}<button class="tbtn" data-timer="${sec}" data-step="${i}">⏱</button>`;
  }).replace(/\bhalf an hour\b/gi, m => `${m}<button class="tbtn" data-timer="1800" data-step="${i}">⏱</button>`);
  return h;
}
async function renderRecipe(id) {
  const r0 = findRecipe(id); if (!r0) { $("#view").innerHTML = `<div class="empty">${L("找不到這道食譜", "Recipe not found")}</div>`; return; }
  const r = loc(r0);
  if (view.id !== id) view = { id, f: 1, base: null };
  const p = prefs(), fv = favs(), f = view.f;
  const logs = (await idbAll("logs").catch(() => [])).filter(l => l.rid === id && !l.del).sort((a, b) => b.date.localeCompare(a.date));
  const sv = r.servings;
  const tempChips = `<button class="chip ${p.temp === "C" ? "on" : ""}" data-temp="C">°C</button><button class="chip ${p.temp === "F" ? "on" : ""}" data-temp="F">°F</button><button class="chip ${p.temp === "both" ? "on" : ""}" data-temp="both">°C＋°F</button>`;
  const ingRow = (it, gi, ii) => {
    const ar = p.ar ? arOf(it.zh) : null, sub = subOf(it.zh);
    const amt = scaleText(it.amt, f);
    const editing = view.edit === `${gi}-${ii}`;
    return `<div class="ing">
      <div class="n">${esc(it.name)}${it.note ? `<span class="note">${esc(it.note)}</span>` : ""}
        ${ar ? `<span class="ar"><bdi dir="rtl">${esc(ar.ar)}</bdi>　${esc(ar.p)}</span>` : ""}
        ${sub ? `<span class="sub">${L("💡 約旦替代：", "💡 In Jordan: ")}${esc(sub)}</span>` : ""}
        ${editing ? `<div class="inline-edit"><input id="base-in" inputmode="decimal" placeholder="${L("我實際有多少", "How much I actually have")}"><button class="btn small primary" data-base="${gi}-${ii}">${L("換算", "Scale")}</button><button class="btn small ghost" data-cancel>${L("取消", "Cancel")}</button></div>` : ""}
      </div>
      <div class="a ${f !== 1 ? "scaled" : ""}" data-edit="${gi}-${ii}" title="${L("點一下：以這個材料為基準換算", "Tap to scale the recipe from this ingredient")}">${esc(amt || "—")}</div>
      <button class="add-shop" data-shop="${gi}-${ii}" title="${L("加入購物清單", "Add to shopping list")}">🛒</button>
    </div>`;
  };
  const src = r.source || {};
  const srcText = r.user && (!r.source || src.from === "自己新增") ? L("自己新增", "Added by us")
    : L(`${esc(src.from)} 對話（${esc(src.date)}）`, `a conversation with ${esc(src.from)} (${esc(src.date)})`);
  const ask = EN() ? r.ask : src.ask;
  $("#view").innerHTML = `
    <div class="row" style="justify-content:space-between"><a href="#/">${L("← 全部食譜", "← All recipes")}</a>
      <button class="star" data-fav>${fv.has(id) ? "★" : "☆"}</button></div>
    <h1>${esc(r.title)}</h1>
    ${r.zhTitle && r.zhTitle !== r.title ? `<div class="zh-sub big">${esc(r.zhTitle)}</div>` : ""}
    ${EN() && !(r0.en || (window.RECIPES_EN || {})[id]) ? `<p class="muted">This recipe hasn't been translated yet, so it's shown in Chinese.</p>` : ""}
    <div class="muted">${esc(catName(r.cat))}${sv ? L(` · 原食譜 ${sv} 人份`, ` · original recipe serves ${sv}`) : ""} ${(r.tags || []).map(t => `<span class="tag">${esc(tagName(t))}</span>`).join("")}</div>
    ${r.intro ? `<p class="muted">${esc(r.intro)}</p>` : ""}
    ${(r.mine || []).map(m => `<div class="mine"><b>${L("🧑‍🍳 我的版本", "🧑‍🍳 My version")}</b>（${esc(m.date)}）<br>${esc(m.text)}</div>`).join("")}
    ${r.groups.length ? `
    <div class="scale">
      <span>${L("份量", "Amount")}</span>
      <button class="btn small" data-f="0.5">×½</button>
      <button class="btn small" data-step="-1">−</button>
      <span class="f">${sv ? L(`${fmt(sv * f)} 人`, `${fmt(sv * f)} ${sv * f === 1 ? "person" : "people"}`) : `×${fmt(f)}`}</span>
      <button class="btn small" data-step="1">＋</button>
      <button class="btn small" data-f="2">×2</button>
      ${f !== 1 ? `<button class="btn small ghost" data-f="1">${L("還原", "Reset")}</button>` : ""}
      <div class="toggles" style="width:100%">
        <button class="chip ${p.ar ? "on" : ""}" data-pref="ar">${L("阿拉伯文", "Arabic")}</button>
        ${tempChips}
        <button class="chip" data-shopall>${L("全部加入購物清單", "Add all to shopping list")}</button>
      </div>
      ${view.base ? `<div class="muted" style="width:100%">${L(`以「${esc(view.base)}」為基準換算`, `Scaled from “${esc(view.base)}”`)}</div>` : `<div class="muted" style="width:100%">${L("點右邊的份量，可以輸入你實際有的量，其他材料會一起換算", "Tap an amount on the right to enter how much you actually have — everything else scales with it")}</div>`}
    </div>
    ${r.groups.map((g, gi) => `<div class="group"><h3>${esc(g.name)}</h3>${g.items.map((it, ii) => ingRow(it, gi, ii)).join("")}</div>`).join("")}` : `
    <div class="toggles">${tempChips}</div>`}
    ${r.steps.length ? `<h2>${L("做法", "Method")}</h2><ol class="steps">${r.steps.map((s, i) => `<li>${stepHtml(scaleIfNeeded(s, f), r, i, p.temp)}</li>`).join("")}</ol>` : ""}
    ${r.tips.length ? `<details><summary>${L(`💡 小撇步（${r.tips.length}）`, `💡 Tips (${r.tips.length})`)}</summary><ul>${r.tips.map(t => `<li>${tempText(t, p.temp).replace(/\n/g, "<br>")}</li>`).join("")}</ul></details>` : ""}
    <h2>${L("📒 我的實作紀錄", "📒 Cooking notes")}</h2>
    <div class="log">
      <textarea id="log-text" placeholder="${L("例如：這次鹽少放一點、烤 25 分鐘剛好、Esther 很喜歡", "e.g. less salt this time, 25 minutes in the oven was perfect, everyone loved it")}"></textarea>
      <div class="row" style="margin-top:8px">
        <label class="btn small">${L("📷 加照片", "📷 Add photo")}<input id="log-photo" type="file" accept="image/*" capture="environment" multiple hidden></label>
        <span id="photo-n" class="muted"></span>
        <span style="flex:1"></span>
        <select id="log-rate" style="width:auto"><option value="">${L("評價", "Rating")}</option><option>⭐</option><option>⭐⭐</option><option>⭐⭐⭐</option></select>
        <button class="btn small primary" data-savelog>${L("儲存紀錄", "Save note")}</button>
      </div>
    </div>
    <div id="logs">${logs.map(l => `<div class="log"><div class="row" style="justify-content:space-between"><b>${esc(l.date)} ${esc(l.rate || "")}</b><button class="btn small ghost" data-dellog="${l.id}">${L("刪除", "Delete")}</button></div>
      ${l.f && l.f !== 1 ? `<div class="muted">${L("當時份量", "Amount used")} ×${fmt(l.f)}</div>` : ""}<div>${esc(l.text).replace(/\n/g, "<br>")}</div>
      <div class="photos">${(l.photos || []).map(pid => `<img data-photo="${pid}" alt="${L("成品照片", "Photo of the result")}">`).join("")}</div></div>`).join("") || `<p class="muted">${L("還沒有紀錄。做完可以記下調整和照片，下次就知道怎麼做。", "No notes yet. After cooking, jot down tweaks and add photos so you'll know for next time.")}</p>`}</div>
    <div class="source">${L("來源：", "Source: ")}${srcText}${ask ? `<br>${L(`當時問：「${esc(ask)}」`, `Original question: “${esc(ask)}”`)}` : ""}
      ${r.user ? `<div class="row" style="margin-top:8px"><a class="btn small" href="#/add/${r.id}">${L("編輯", "Edit")}</a><button class="btn small ghost" data-deluser>${L("刪除這道食譜", "Delete this recipe")}</button></div>` : ""}</div>`;
  // 載入照片
  document.querySelectorAll("img[data-photo]").forEach(async img => { const b = await photoBlob(img.dataset.photo); if (b) img.src = URL.createObjectURL(b); });
  const pendingPhotos = [];
  $("#log-photo").onchange = async e => { for (const file of e.target.files) pendingPhotos.push(await shrink(file)); $("#photo-n").textContent = L(`已選 ${pendingPhotos.length} 張`, `${pendingPhotos.length} selected`); };
  if (view.edit) { const i = $("#base-in"); i && i.focus(); }
  $("#view").onclick = async e => {
    const b = e.target.closest("[data-f],[data-step],[data-pref],[data-temp],[data-edit],[data-base],[data-cancel],[data-timer],[data-fav],[data-shop],[data-shopall],[data-savelog],[data-dellog],[data-deluser]"); if (!b) return;
    const d = b.dataset;
    if (d.f) { view.f = +d.f; view.base = null; }
    else if (d.step && !d.timer) { const step = sv ? 1 / sv : .5; view.f = Math.max(step, Math.round((view.f + (+d.step) * step) * 1000) / 1000); view.base = null; }
    else if (d.pref) { const q = prefs(); q[d.pref] = !q[d.pref]; ls.set("prefs", q); }
    else if (d.temp) { const q = prefs(); q.temp = d.temp; ls.set("prefs", q); }
    else if (d.edit) { view.edit = d.edit; }
    else if (d.cancel !== undefined) { view.edit = null; }
    else if (d.base) { const [gi, ii] = d.base.split("-").map(Number); const it = r.groups[gi].items[ii]; const orig = firstNum(it.amt); const want = num(($("#base-in").value || "").trim());
      if (!orig || !want) { toast(L("這個材料沒有數字，或輸入的不是數字", "This ingredient has no number, or what you typed isn't a number")); return; } view.f = want / orig; view.base = it.name; view.edit = null; }
    else if (d.timer) { const i = +d.step; addTimer(L(`${r.title}・步驟 ${i + 1}`, `${r.title} · Step ${i + 1}`), +d.timer, r.steps[i].slice(0, EN() ? 70 : 40)); return; }
    else if (d.fav !== undefined) { setFav(id, !favs().has(id)); }
    else if (d.shop) { const [gi, ii] = d.shop.split("-").map(Number); const it = r.groups[gi].items[ii]; addShop(it.name, scaleText(it.amt, view.f), r.title, it.zh); return; }
    else if (d.shopall !== undefined) { r.groups.forEach(g => g.items.forEach(it => { if (/^(水|冰塊|熱水|冷水|溫水|開水|清水)$/.test(it.zh.replace(/[（(].*$/,"").trim())) return; if (!liveShop().some(x => x.name === it.name && !x.got)) shop.push({ id: uid(), name: it.name, amt: scaleText(it.amt, view.f), from: r.title, zh: it.zh, got: false }); })); saveShop(); toast(L("🛒 全部材料已加入購物清單", "🛒 All ingredients added to the shopping list")); return; }
    else if (d.savelog !== undefined) {
      const text = $("#log-text").value.trim(); if (!text && !pendingPhotos.length) { toast(L("先寫一點紀錄或加照片", "Write a note or add a photo first")); return; }
      const photos = []; for (const blob of pendingPhotos) { const pid = uid(); await idbPut("photos", { id: pid, blob, up: false }); photos.push(pid); }
      const lid = uid(); await idbPut("logs", { id: lid, rid: id, date: today(), text, rate: $("#log-rate").value, f: view.f, photos, t: Date.now() }); markDirty("logs", lid); logCount[id] = (logCount[id] || 0) + 1; toast(L("📒 紀錄已儲存", "📒 Note saved"));
    }
    else if (d.dellog) { if (!confirmInline(b, L("確定刪除？", "Delete?"))) return; const l = await idbGet("logs", d.dellog); await idbPut("logs", { id: l.id, rid: l.rid, del: true, t: Date.now() }); markDirty("logs", l.id); logCount[id] = Math.max(0, (logCount[id] || 1) - 1); }
    else if (d.deluser !== undefined) { if (!confirmInline(b, L("再按一次確定刪除", "Tap again to delete"))) return; await idbPut("recipes", { id, del: true, t: Date.now() }); markDirty("recipes", id); userRecipes = userRecipes.filter(x => x.id !== id); location.hash = "#/"; return; }
    renderRecipe(id);
  };
}
function scaleIfNeeded(s, f) { return f === 1 ? s : s; } // 步驟文字不自動換算，避免把時間、溫度改錯
function confirmInline(btn, msg) { if (btn.dataset.sure) return true; btn.dataset.sure = 1; btn.textContent = msg; setTimeout(() => { delete btn.dataset.sure; }, 3000); return false; }
function shrink(file, max = 1400) {
  return new Promise(res => { const img = new Image(); img.onload = () => { const k = Math.min(1, max / Math.max(img.width, img.height)); const c = document.createElement("canvas"); c.width = img.width * k; c.height = img.height * k; c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); c.toBlob(b => res(b || file), "image/jpeg", .82); URL.revokeObjectURL(img.src); }; img.onerror = () => res(file); img.src = URL.createObjectURL(file); });
}

// ---------- 畫面：計時器 ----------
function renderTimers() {
  const presets = EN() ? ["First rise", "Oven", "Simmer", "Marinate"] : ["一次發酵", "烤箱", "燉煮", "醃肉"];
  $("#view").innerHTML = `<h1>${L("⏱ 計時器", "⏱ Timers")}</h1><p class="muted">${L("可以同時跑好幾個。關掉畫面也會繼續算，打開時會提醒。手機要打開音量；iPhone 請把 App 加到主畫面效果最好。", "Run several at once. They keep counting with the screen off and alert you when you come back. Turn your volume up; on iPhone, adding the app to your Home Screen works best.")}</p>
    ${timers.map(t => `<div class="timer ${t.done ? "done" : ""} ${t.paused ? "paused" : ""}">
      <div class="lbl"><b>${esc(t.label)}</b><small>${esc(t.sub || "")}</small></div>
      <div class="left" data-left="${t.id}">${t.done ? "0:00" : hms(leftOf(t))}</div>
      ${t.done ? `<button class="btn small" data-restart="${t.id}">${L("再一次", "Again")}</button>` : `<button class="btn small" data-pause="${t.id}">${t.paused ? L("繼續", "Resume") : L("暫停", "Pause")}</button><button class="btn small" data-plus="${t.id}">${L("+1分", "+1 min")}</button>`}
      <button class="btn small ghost" data-del="${t.id}">✕</button></div>`).join("") || `<div class="empty">${L("目前沒有計時器。在食譜步驟裡點 ⏱ 就能開始。", "No timers yet. Tap ⏱ in a recipe step to start one.")}</div>`}
    <h2>${L("新增計時器", "New timer")}</h2>
    <div class="field"><label>${L("名稱", "Name")}</label><input id="t-name" placeholder="${L("例如：一次發酵、烤箱、滷牛腱", "e.g. first rise, oven, braised beef")}"></div>
    <div class="row"><input id="t-h" inputmode="numeric" placeholder="${L("時", "h")}" style="width:70px"><input id="t-m" inputmode="numeric" placeholder="${L("分", "m")}" style="width:70px"><input id="t-s" inputmode="numeric" placeholder="${L("秒", "s")}" style="width:70px"><button class="btn primary" data-new>${L("開始", "Start")}</button></div>
    <div class="chips" style="margin-top:10px">${presets.map(p => `<button class="chip" data-preset="${p}">${p}</button>`).join("")}</div>`;
  $("#view").onclick = e => {
    const b = e.target.closest("button"); if (!b) return; const d = b.dataset; const t = timers.find(x => x.id === (d.pause || d.plus || d.del || d.restart));
    if (d.preset) { $("#t-name").value = d.preset; $("#t-m").focus(); return; }
    if (d.new !== undefined) { const sec = (+$("#t-h").value || 0) * 3600 + (+$("#t-m").value || 0) * 60 + (+$("#t-s").value || 0); if (!sec) { toast(L("請輸入時間", "Enter a time")); return; } addTimer($("#t-name").value.trim() || L("計時器", "Timer"), sec); return; }
    if (d.pause && t) { if (t.paused) { t.end = Date.now() + t.left * 1000; t.paused = false; } else { t.left = leftOf(t); t.paused = true; } }
    if (d.plus && t) { if (t.paused) t.left += 60; else t.end += 60000; }
    if (d.restart && t) { t.done = false; t.paused = false; t.end = Date.now() + t.dur * 1000; }
    if (d.del && t) timers = timers.filter(x => x !== t);
    saveTimers(); renderTimers();
  };
}

// ---------- 畫面：購物清單 ----------
function renderShop() {
  $("#view").innerHTML = `<h1>${L("🛒 購物清單", "🛒 Shopping list")}</h1><p class="muted">${L("附上約旦阿拉伯文，可以直接拿給店員看。", "Includes Jordanian Arabic names, so you can show it to the shopkeeper.")}</p>
    <div class="row"><input id="s-new" placeholder="${L("自己加一項，例如：牛腱 1 公斤", "Add an item, e.g. beef shank 1 kg")}"><button class="btn primary" data-add>${L("加入", "Add")}</button></div>
    <div style="margin-top:8px">${liveShop().map(x => { const ar = arOf(x.zh || x.name); return `<div class="shop-item ${x.got ? "got" : ""}">
      <input type="checkbox" data-got="${x.id}" ${x.got ? "checked" : ""} style="width:22px;height:22px">
      <div class="nm">${esc(x.name)} <span class="muted">${esc(x.amt || "")}</span>${ar ? `<span class="ar"><bdi dir="rtl">${esc(ar.ar)}</bdi>　${esc(ar.p)}</span>` : ""}${x.from ? `<span class="note">${esc(x.from)}</span>` : ""}</div>
      <button class="btn small ghost" data-rm="${x.id}">✕</button></div>`; }).join("") || `<div class="empty">${L("清單是空的。在食譜裡點材料旁的 🛒 就能加入。", "The list is empty. Tap 🛒 next to an ingredient in a recipe to add it.")}</div>`}</div>
    ${liveShop().length ? `<div class="row" style="margin-top:14px"><button class="btn" data-copy>${L("複製清單（含阿拉伯文）", "Copy list (with Arabic)")}</button><button class="btn ghost" data-clear>${L("清掉已買的", "Clear bought items")}</button></div>` : ""}`;
  $("#view").onclick = async e => {
    const el = e.target.closest("[data-got],[data-rm],[data-add],[data-copy],[data-clear]"); if (!el) return; const d = el.dataset;
    if (d.got) { const x = shop.find(y => y.id === d.got); x.got = el.checked; }
    if (d.rm) shop = shop.filter(y => y.id !== d.rm);
    if (d.add !== undefined) { const v = $("#s-new").value.trim(); if (!v) return; const m = v.match(/^(.+?)\s+([\d½].*)$/); shop.push({ id: uid(), name: m ? m[1] : v, amt: m ? m[2] : "", got: false }); }
    if (d.clear !== undefined) shop = shop.filter(y => y.del || !y.got);
    if (d.copy !== undefined) { const txt = liveShop().filter(y => !y.got).map(y => { const ar = arOf(y.zh || y.name); return `• ${y.name} ${y.amt || ""}${ar ? `　${ar.ar}` : ""}`; }).join("\n"); try { await navigator.clipboard.writeText(txt); toast(L("已複製，可以貼到 WhatsApp", "Copied — paste it into WhatsApp")); } catch { toast(L("無法複製，請手動選取", "Couldn't copy; please select it manually")); } return; }
    saveShop(); renderShop();
  };
}

// ---------- 畫面：新增／編輯食譜 ----------
function parsePasted(text) {
  const lines = text.split(/\n+/).map(s => s.replace(/^[\s•・*\-#]+/, "").replace(/\*\*/g, "").trim()).filter(Boolean);
  const groups = [], steps = [], tips = []; let mode = "", cur = null, title = "";
  for (const l of lines) {
    const bare = l.replace(/[：:]$/, "");
    if (/步驟|做法|作法|流程|^(steps?|method|directions|instructions)$/i.test(bare) && bare.length < 20) { mode = "step"; continue; }
    if (/秘訣|技巧|小撇步|提醒|注意|^(tips?|notes?)$/i.test(bare) && bare.length < 20) { mode = "tip"; continue; }
    if (/材料|食材|醃料|醬汁|調味|^(ingredients?|marinade|sauce|seasoning)\b/i.test(bare) && bare.length < 20) { mode = "ing"; cur = { name: bare, items: [] }; groups.push(cur); continue; }
    if (!title && !mode) { title = bare.slice(0, 40); continue; }
    if (mode === "ing") { const m = l.match(/^([^：:]{1,30})[：:]\s*(.+)$/) || l.match(/^(.{1,20}?)\s+([\d½¼¾少適一二三四五六七八九十半].*)$/); cur.items.push(m ? { name: m[1].trim(), amt: m[2].trim() } : { name: l, amt: "" }); }
    else if (mode === "tip") tips.push(l);
    else if (mode === "step" || /^\d+[\.、)]/.test(l)) steps.push(l.replace(/^\d+[\.、)]\s*/, ""));
    else tips.push(l);
  }
  return { title, groups, steps, tips };
}
function toText(r) {
  return [r.title, ...r.groups.flatMap(g => [`${g.name}：`, ...g.items.map(i => `${i.name}：${i.amt}`)]), "做法：", ...r.steps.map((s, i) => `${i + 1}. ${s}`), ...(r.tips.length ? ["小撇步：", ...r.tips] : [])].join("\n");
}
function renderAdd(editId) {
  const ex = editId ? findRecipe(editId) : null;
  $("#view").innerHTML = `<h1>${ex ? L("編輯食譜", "Edit recipe") : L("＋ 新增食譜", "＋ Add recipe")}</h1>
    <p class="muted">${L("把 Gemini 或 Claude 的食譜整段貼上，會自動分成材料和做法；也可以自己打。格式小提示：標題一行、「材料：」下面一行一個「名稱：份量」、「做法：」下面一行一步。", "Paste a whole recipe from Gemini or Claude and it will be split into ingredients and steps automatically, or type your own. Tip: title on the first line; under “Ingredients:” one “name: amount” per line; under “Method:” one step per line.")}</p>
    <div class="field"><label>${L("貼上或輸入食譜", "Paste or type a recipe")}</label><textarea id="a-text" style="min-height:260px">${ex ? esc(toText(ex)) : ""}</textarea></div>
    <div class="row"><div class="field" style="flex:1"><label>${L("分類", "Category")}</label><select id="a-cat">${CATS.slice(1).map(c => `<option value="${c}" ${ex && ex.cat === c ? "selected" : ""}>${esc(catName(c))}</option>`).join("")}</select></div>
      <div class="field" style="width:120px"><label>${L("幾人份", "Serves")}</label><input id="a-sv" inputmode="numeric" value="${ex && ex.servings ? ex.servings : ""}"></div></div>
    <div class="field"><label>${L("標籤（用空格分開，例如：請客 低渣）", "Tags (separated by spaces)")}</label><input id="a-tags" value="${ex ? esc((ex.tags || []).join(" ")) : ""}"></div>
    <div class="row"><button class="btn" data-preview>${L("預覽分段", "Preview")}</button><button class="btn primary" data-save>${L("儲存", "Save")}</button></div>
    <div id="a-prev"></div>`;
  $("#view").onclick = async e => {
    const b = e.target.closest("button"); if (!b) return;
    const p = parsePasted($("#a-text").value);
    if (b.dataset.preview !== undefined) { $("#a-prev").innerHTML = `<h2>${esc(p.title || L("（沒有標題）", "(no title)"))}</h2>${p.groups.map(g => `<div class="group"><h3>${esc(g.name)}</h3>${g.items.map(i => `<div class="ing"><div class="n">${esc(i.name)}</div><div class="a">${esc(i.amt)}</div></div>`).join("")}</div>`).join("")}<ol class="steps">${p.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`; return; }
    if (b.dataset.save !== undefined) {
      if (!p.title) { toast(L("第一行請寫菜名", "Put the dish name on the first line")); return; }
      // 編輯時清掉舊的英文翻譯（內容可能已經不同）
      const r = { id: ex ? ex.id : "u" + uid(), user: true, title: p.title, cat: $("#a-cat").value, tags: $("#a-tags").value.split(/\s+/).filter(Boolean), servings: +$("#a-sv").value || null, intro: "", groups: p.groups, steps: p.steps, tips: p.tips, mine: [], source: { from: "自己新增", date: today(), ask: "" }, t: Date.now() };
      await idbPut("recipes", r); markDirty("recipes", r.id); userRecipes = [r, ...userRecipes.filter(x => x.id !== r.id)]; location.hash = `#/r/${r.id}`;
    }
  };
}

// ---------- 畫面：設定與備份 ----------
function renderSettings() {
  const sc = syncCfg();
  $("#view").innerHTML = `<h1>${L("⚙︎ 設定與備份", "⚙︎ Settings & backup")}</h1>
    <h2>🌐 ${L("語言", "Language")}</h2>
    <div class="seg"><button data-lang="zh" class="${lang === "zh" ? "on" : ""}">中文</button><button data-lang="en" class="${lang === "en" ? "on" : ""}">English</button></div>
    <h2>${L("🔄 兩支手機同步", "🔄 Sync between phones")}</h2>
    <p class="muted">${L("填入同步中心的網址和密碼（兩支手機填一樣的），紀錄、照片、收藏、購物清單和自己加的食譜就會自動同步。資料存在 Benson 的 Google 雲端硬碟「食譜App同步」資料夾。", "Enter the sync URL and password (the same on both phones) to sync notes, photos, favorites, the shopping list and your own recipes automatically.")}</p>
    <div class="field"><label>${L("同步網址", "Sync URL")}</label><input id="sy-url" value="${esc(sc.url)}" placeholder="https://script.google.com/macros/s/…/exec" autocomplete="off"></div>
    <div class="field"><label>${L("同步密碼", "Sync password")}</label><input id="sy-tok" type="password" value="${esc(sc.token)}" autocomplete="off"></div>
    <div class="row"><button class="btn primary" data-sysave>${L("儲存並同步", "Save & sync")}</button><button class="btn" data-synow>${L("立即同步", "Sync now")}</button><span id="sync-msg" class="muted">${esc(syncState.msg)}</span></div>
    <h2>${L("加到手機主畫面", "Add to your Home Screen")}</h2>
    <p>${L("iPhone：用 Safari 打開 → 分享按鈕 → 「加入主畫面」。Android：Chrome 選單 → 「安裝應用程式」。加好之後沒有網路也能看食譜。", "iPhone: open in Safari → Share → “Add to Home Screen”. Android: Chrome menu → “Install app”. Once added, recipes work offline too.")}</p>
    <h2>${L("備份", "Backup")}</h2>
    <p class="muted">${L("實作紀錄、照片、自己新增的食譜、收藏和購物清單都存在這支手機裡。換手機或清除瀏覽器資料前，先下載備份。", "Notes, photos, your own recipes, favorites and the shopping list are stored on this phone. Download a backup before switching phones or clearing browser data.")}</p>
    <div class="row"><button class="btn primary" data-export>${L("下載備份檔", "Download backup")}</button><label class="btn">${L("匯入備份", "Import backup")}<input id="imp" type="file" accept="application/json" hidden></label></div>
    <p id="bk-msg" class="muted"></p>
    <h2>${L("關於", "About")}</h2>
    <p class="muted">${L(`${window.RECIPES.length} 道食譜整理自 2024-10 到 2026-09 跟 Gemini 的對話。份量換算只改材料，不會改步驟裡的時間和溫度。阿拉伯文是約旦口語說法，買菜前可以先跟店員確認。`, `${window.RECIPES.length} recipes collected from cooking conversations with Gemini (Oct 2024 – Sep 2026), translated from Chinese. Scaling only changes ingredient amounts, never the times or temperatures in the steps. Arabic names are Jordanian colloquial — double-check with the shopkeeper.`)}</p>`;
  $("#view").onclick = async e => {
    const lb = e.target.closest("[data-lang]"); if (lb) { setLang(lb.dataset.lang); return; }
    if (e.target.closest("[data-sysave]")) { ls.set("sync", { url: $("#sy-url").value.trim(), token: $("#sy-tok").value.trim() }); syncState.last = 0; ls.set("syncLast", 0);
      // 第一次連上：把這支手機已有的資料全部標成待同步
      const d = ls.get("dirty", {}); const put = (c, id) => (d[c] = d[c] || {})[id] = 1;
      (await idbAll("recipes")).forEach(r => put("recipes", r.id)); (await idbAll("logs")).forEach(r => put("logs", r.id));
      Object.keys(favRecs()).forEach(id => put("favs", id)); shop.forEach(x => { x.t = x.t || Date.now(); put("shop", x.id); }); ls.set("shop", shop); ls.set("dirty", d);
      syncNow(true); return; }
    if (e.target.closest("[data-synow]")) { syncNow(true); return; }
    if (!e.target.closest("[data-export]")) return;
    const logs = await idbAll("logs"), photos = await idbAll("photos"), recs = await idbAll("recipes");
    const ph = await Promise.all(photos.map(p => new Promise(res => { const fr = new FileReader(); fr.onload = () => res({ id: p.id, data: fr.result }); fr.readAsDataURL(p.blob); })));
    const blob = new Blob([JSON.stringify({ v: 1, date: today(), recipes: recs, logs, photos: ph, favs: [...favs()], shop: liveShop(), prefs: prefs() })], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = L(`食譜備份-${today()}.json`, `recipes-backup-${today()}.json`); a.click();
    $("#bk-msg").textContent = L(`已下載：${recs.length} 道自己的食譜、${logs.length} 筆紀錄、${ph.length} 張照片`, `Downloaded: ${recs.length} own recipes, ${logs.length} notes, ${ph.length} photos`);
  };
  $("#imp").onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      for (const r of d.recipes || []) await idbPut("recipes", r);
      for (const l of d.logs || []) await idbPut("logs", l);
      for (const p of d.photos || []) { const blob = await (await fetch(p.data)).blob(); await idbPut("photos", { id: p.id, blob }); }
      (d.favs || []).forEach(id => setFav(id, true));
      await load(); $("#bk-msg").textContent = L("匯入完成！", "Import complete!");
    } catch (err) { $("#bk-msg").textContent = L("匯入失敗：檔案格式不對", "Import failed: wrong file format"); }
  };
}

// ---------- 路由 ----------
function render() {
  const h = location.hash || "#/";
  let m;
  if ((m = h.match(/^#\/r\/(.+)$/))) renderRecipe(decodeURIComponent(m[1]));
  else if (h.startsWith("#/timers")) renderTimers();
  else if (h.startsWith("#/shop")) renderShop();
  else if ((m = h.match(/^#\/add(?:\/(.+))?$/))) renderAdd(m[1]);
  else if (h.startsWith("#/settings")) renderSettings();
  else renderList();
  updateBadges(); tick();
}
async function load() {
  userRecipes = (await idbAll("recipes").catch(() => [])).filter(r => !r.del).sort((a, b) => (b.t || 0) - (a.t || 0));
  logCount = {}; (await idbAll("logs").catch(() => [])).filter(l => !l.del).forEach(l => logCount[l.rid] = (logCount[l.rid] || 0) + 1);
}
window.addEventListener("hashchange", () => { window.scrollTo(0, 0); render(); });
$("#alarm-stop").onclick = () => { $("#alarm").hidden = true; clearInterval(ringing); ringing = null; };
document.addEventListener("click", unlockAudio, { once: true });
const ft = document.createElement("a"); ft.id = "float-timer"; ft.className = "float-timers"; ft.href = "#/timers"; ft.hidden = true; document.body.appendChild(ft);
setInterval(tick, 1000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) { tick(); scheduleSync(300); } });
window.addEventListener("online", () => scheduleSync(300));
setInterval(() => { if (!document.hidden) syncNow(); }, 60000);
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
$("#nav-lang").onclick = e => { e.preventDefault(); setLang(EN() ? "zh" : "en"); };
applyStatic();
load().then(() => { render(); scheduleSync(500); });
})();
