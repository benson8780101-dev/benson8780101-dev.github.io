/* Benson 的食譜 App
 * 資料：data/recipes.js（從 Gemini 對話整理）＋ 使用者自己新增的食譜（IndexedDB）
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
    const out = fn(s); t.oncomplete = () => res(out && out.result !== undefined ? out.result : out); t.onerror = () => rej(t.error);
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
const favs = () => new Set(ls.get("favs", []));
let logCount = {};

// ---------- 食材字典與替代 ----------
const DICT = (window.ING_DICT || []).slice().sort((a, b) => b[0].length - a[0].length);
function arOf(name) { for (const d of DICT) if (name.includes(d[0])) return { ar: d[1], p: d[2], en: d[3] }; return null; }
function subOf(name) { for (const k of Object.keys(window.SUBS || {})) if (name.includes(k)) return window.SUBS[k]; return null; }

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
const NO_SCALE = /^\s*(°|℃|度|分鐘|分|秒|小時|公分|cm|mm|吋|%)/;
const NUM_RE = /(\d[\d,]*(?:\.\d+)?|\d+\/\d+|[½¼¾⅓⅔])(\s*[-–～~至到]\s*(\d[\d,]*(?:\.\d+)?|\d+\/\d+))?/g;
function scaleText(s, f) {
  if (!s || f === 1) return s;
  return s.replace(NUM_RE, (m, a, rng, b, off, all) => {
    const after = all.slice(off + m.length, off + m.length + 3);
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
  saveTimers(); unlockAudio(); askNotify(); toast(`⏱ 開始計時：${label}（${hms(sec)}）`); render();
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
  try { if (window.Notification && Notification.permission === "granted") list.forEach(t => new Notification("⏰ 時間到", { body: t.label })); } catch {}
}
function askNotify() { try { if (window.Notification && Notification.permission === "default") Notification.requestPermission(); } catch {} }

// ---------- 購物清單 ----------
let shop = ls.get("shop", []);
const saveShop = () => { ls.set("shop", shop); updateBadges(); };
function addShop(name, amt, from) { if (shop.some(x => x.name === name && !x.got)) { toast(`已經在清單：${name}`); return; } shop.push({ id: uid(), name, amt, from, got: false }); saveShop(); toast(`🛒 已加入：${name}`); }

function updateBadges() {
  $("#timer-count").textContent = timers.filter(t => !t.done).length || "";
  $("#shop-count").textContent = shop.filter(x => !x.got).length || "";
}
let toastT;
function toast(msg) { let el = $("#toast"); if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "float-timers"; el.style.bottom = "70px"; document.body.appendChild(el); } el.textContent = msg; el.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => el.hidden = true, 2200); }

// ---------- 畫面：清單 ----------
let listState = ls.get("listState", { q: "", mode: "name", cat: "全部", tag: "" });
function recipeText(r) { return [r.title, r.cat, ...(r.tags || []), ...r.groups.flatMap(g => g.items.map(i => i.name))].join(" "); }
function renderList() {
  const s = listState, fv = favs();
  const terms = s.q.split(/[\s,，、]+/).filter(Boolean);
  let rs = allRecipes().map(r => ({ r, hit: [] }));
  if (s.cat !== "全部") rs = rs.filter(x => x.r.cat === s.cat || (x.r.tags || []).includes(s.cat));
  if (s.tag === "收藏") rs = rs.filter(x => fv.has(x.r.id));
  else if (s.tag === "我的版本") rs = rs.filter(x => (x.r.mine || []).length || x.r.user);
  else if (s.tag === "有紀錄") rs = rs.filter(x => logCount[x.r.id]);
  else if (s.tag) rs = rs.filter(x => (x.r.tags || []).includes(s.tag));
  if (terms.length) {
    if (s.mode === "have") {
      rs.forEach(x => { const names = x.r.groups.flatMap(g => g.items.map(i => i.name)).join(" ") + " " + x.r.title; x.hit = terms.filter(t => names.includes(t)); });
      rs = rs.filter(x => x.hit.length).sort((a, b) => b.hit.length - a.hit.length);
    } else rs = rs.filter(x => { const t = recipeText(x.r); return terms.every(q => t.includes(q)); });
  }
  const catChips = CATS.map(c => `<button class="chip ${s.cat === c ? "on" : ""}" data-cat="${c}">${c}</button>`).join("");
  const tagChips = TAGS.map(c => `<button class="chip ${s.tag === c ? "on" : ""}" data-tag="${c}">${c === "收藏" ? "★ " : ""}${c}</button>`).join("");
  $("#view").innerHTML = `
    <div class="seg"><button data-mode="name" class="${s.mode === "name" ? "on" : ""}">找菜名</button><button data-mode="have" class="${s.mode === "have" ? "on" : ""}">用手邊食材找</button></div>
    <div class="search"><input id="q" type="search" value="${esc(s.q)}" placeholder="${s.mode === "have" ? "例如：雞肉 高麗菜 洋蔥" : "搜尋菜名或材料，例如：鹹酥雞"}" autocomplete="off"></div>
    <div class="chips">${catChips}</div>
    <div class="chips">${tagChips}</div>
    <p class="muted">${rs.length} 道食譜</p>
    <div class="list">${rs.map(({ r, hit }) => `
      <a class="card" href="#/r/${r.id}">
        <div class="t">${fv.has(r.id) ? "★ " : ""}${esc(r.title)}</div>
        <div class="m">${esc(r.cat)}${r.servings ? ` · ${r.servings} 人份` : ""}${logCount[r.id] ? ` · 做過 ${logCount[r.id]} 次` : ""}
          ${(r.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}${(r.mine || []).length || r.user ? `<span class="tag ok">我的版本</span>` : ""}</div>
        ${hit.length ? `<div class="match">✓ 有：${hit.map(esc).join("、")}</div>` : ""}
      </a>`).join("") || `<div class="empty">找不到符合的食譜</div>`}</div>`;
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
  // 計時按鈕：X 分鐘／X–Y 分鐘／X 小時／X 秒／半小時
  h = h.replace(/(\d+(?:\.\d+)?)(?:\s*[-–～~至到]\s*(\d+(?:\.\d+)?))?\s*(分鐘|分|小時|秒)(?![a-zA-Z])/g, (m, a, b, u) => {
    const v = +(b || a); const sec = u === "小時" ? v * 3600 : u === "秒" ? v : v * 60;
    if (!sec || sec > 12 * 3600) return m;
    return `${m}<button class="tbtn" data-timer="${sec}" data-step="${i}">⏱</button>`;
  }).replace(/半小時/g, `半小時<button class="tbtn" data-timer="1800" data-step="${i}">⏱</button>`);
  return h;
}
async function renderRecipe(id) {
  const r = findRecipe(id); if (!r) { $("#view").innerHTML = `<div class="empty">找不到這道食譜</div>`; return; }
  if (view.id !== id) view = { id, f: 1, base: null };
  const p = prefs(), fv = favs(), f = view.f;
  const logs = (await idbAll("logs").catch(() => [])).filter(l => l.rid === id).sort((a, b) => b.date.localeCompare(a.date));
  const sv = r.servings;
  const ingRow = (it, gi, ii) => {
    const ar = p.ar ? arOf(it.name) : null, sub = subOf(it.name);
    const amt = scaleText(it.amt, f);
    const editing = view.edit === `${gi}-${ii}`;
    return `<div class="ing">
      <div class="n">${esc(it.name)}${it.note ? `<span class="note">${esc(it.note)}</span>` : ""}
        ${ar ? `<span class="ar"><bdi dir="rtl">${esc(ar.ar)}</bdi>　${esc(ar.p)}</span>` : ""}
        ${sub ? `<span class="sub">💡 約旦替代：${esc(sub)}</span>` : ""}
        ${editing ? `<div class="inline-edit"><input id="base-in" inputmode="decimal" placeholder="我實際有多少"><button class="btn small primary" data-base="${gi}-${ii}">換算</button><button class="btn small ghost" data-cancel>取消</button></div>` : ""}
      </div>
      <div class="a ${f !== 1 ? "scaled" : ""}" data-edit="${gi}-${ii}" title="點一下：以這個材料為基準換算">${esc(amt || "—")}</div>
      <button class="add-shop" data-shop="${gi}-${ii}" title="加入購物清單">🛒</button>
    </div>`;
  };
  $("#view").innerHTML = `
    <div class="row" style="justify-content:space-between"><a href="#/">← 全部食譜</a>
      <button class="star" data-fav>${fv.has(id) ? "★" : "☆"}</button></div>
    <h1>${esc(r.title)}</h1>
    <div class="muted">${esc(r.cat)}${sv ? ` · 原食譜 ${sv} 人份` : ""} ${(r.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
    ${r.intro ? `<p class="muted">${esc(r.intro)}</p>` : ""}
    ${(r.mine || []).map(m => `<div class="mine"><b>🧑‍🍳 我的版本</b>（${esc(m.date)}）<br>${esc(m.text)}</div>`).join("")}
    ${r.groups.length ? `
    <div class="scale">
      <span>份量</span>
      <button class="btn small" data-f="0.5">×½</button>
      <button class="btn small" data-step="-1">−</button>
      <span class="f">${sv ? `${fmt(sv * f)} 人` : `×${fmt(f)}`}</span>
      <button class="btn small" data-step="1">＋</button>
      <button class="btn small" data-f="2">×2</button>
      ${f !== 1 ? `<button class="btn small ghost" data-f="1">還原</button>` : ""}
      <div class="toggles" style="width:100%">
        <button class="chip ${p.ar ? "on" : ""}" data-pref="ar">阿拉伯文</button>
        <button class="chip ${p.temp === "C" ? "on" : ""}" data-temp="C">°C</button>
        <button class="chip ${p.temp === "F" ? "on" : ""}" data-temp="F">°F</button>
        <button class="chip ${p.temp === "both" ? "on" : ""}" data-temp="both">°C＋°F</button>
        <button class="chip" data-shopall>全部加入購物清單</button>
      </div>
      ${view.base ? `<div class="muted" style="width:100%">以「${esc(view.base)}」為基準換算</div>` : `<div class="muted" style="width:100%">點右邊的份量，可以輸入你實際有的量，其他材料會一起換算</div>`}
    </div>
    ${r.groups.map((g, gi) => `<div class="group"><h3>${esc(g.name)}</h3>${g.items.map((it, ii) => ingRow(it, gi, ii)).join("")}</div>`).join("")}` : `
    <div class="toggles"><button class="chip ${p.temp === "C" ? "on" : ""}" data-temp="C">°C</button><button class="chip ${p.temp === "F" ? "on" : ""}" data-temp="F">°F</button><button class="chip ${p.temp === "both" ? "on" : ""}" data-temp="both">°C＋°F</button></div>`}
    ${r.steps.length ? `<h2>做法</h2><ol class="steps">${r.steps.map((s, i) => `<li>${stepHtml(scaleIfNeeded(s, f), r, i, p.temp)}</li>`).join("")}</ol>` : ""}
    ${r.tips.length ? `<details><summary>💡 小撇步（${r.tips.length}）</summary><ul>${r.tips.map(t => `<li>${tempText(t, p.temp).replace(/\n/g, "<br>")}</li>`).join("")}</ul></details>` : ""}
    <h2>📒 我的實作紀錄</h2>
    <div class="log">
      <textarea id="log-text" placeholder="例如：這次鹽少放一點、烤 25 分鐘剛好、Esther 很喜歡"></textarea>
      <div class="row" style="margin-top:8px">
        <label class="btn small">📷 加照片<input id="log-photo" type="file" accept="image/*" capture="environment" multiple hidden></label>
        <span id="photo-n" class="muted"></span>
        <span style="flex:1"></span>
        <select id="log-rate" style="width:auto"><option value="">評價</option><option>⭐</option><option>⭐⭐</option><option>⭐⭐⭐</option></select>
        <button class="btn small primary" data-savelog>儲存紀錄</button>
      </div>
    </div>
    <div id="logs">${logs.map(l => `<div class="log"><div class="row" style="justify-content:space-between"><b>${esc(l.date)} ${esc(l.rate || "")}</b><button class="btn small ghost" data-dellog="${l.id}">刪除</button></div>
      ${l.f && l.f !== 1 ? `<div class="muted">當時份量 ×${fmt(l.f)}</div>` : ""}<div>${esc(l.text).replace(/\n/g, "<br>")}</div>
      <div class="photos">${(l.photos || []).map(pid => `<img data-photo="${pid}" alt="成品照片">`).join("")}</div></div>`).join("") || `<p class="muted">還沒有紀錄。做完可以記下調整和照片，下次就知道怎麼做。</p>`}</div>
    <div class="source">來源：${r.user ? "自己新增" : `${esc(r.source.from)} 對話（${esc(r.source.date)}）`}${r.source && r.source.ask ? `<br>當時問：「${esc(r.source.ask)}」` : ""}
      ${r.user ? `<div class="row" style="margin-top:8px"><a class="btn small" href="#/add/${r.id}">編輯</a><button class="btn small ghost" data-deluser>刪除這道食譜</button></div>` : ""}</div>`;
  // 載入照片
  document.querySelectorAll("img[data-photo]").forEach(async img => { const ph = await idbGet("photos", img.dataset.photo).catch(() => null); if (ph) img.src = URL.createObjectURL(ph.blob); });
  const pendingPhotos = [];
  $("#log-photo").onchange = async e => { for (const file of e.target.files) pendingPhotos.push(await shrink(file)); $("#photo-n").textContent = `已選 ${pendingPhotos.length} 張`; };
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
      if (!orig || !want) { toast("這個材料沒有數字，或輸入的不是數字"); return; } view.f = want / orig; view.base = it.name; view.edit = null; }
    else if (d.timer) { const i = +d.step; addTimer(`${r.title}・步驟 ${i + 1}`, +d.timer, r.steps[i].slice(0, 40)); return; }
    else if (d.fav !== undefined) { const s = favs(); s.has(id) ? s.delete(id) : s.add(id); ls.set("favs", [...s]); }
    else if (d.shop) { const [gi, ii] = d.shop.split("-").map(Number); const it = r.groups[gi].items[ii]; addShop(it.name, scaleText(it.amt, view.f), r.title); return; }
    else if (d.shopall !== undefined) { r.groups.forEach(g => g.items.forEach(it => { if (/^(水|冰塊|熱水|冷水|溫水|開水|清水)$/.test(it.name.replace(/[（(].*$/,"").trim())) return; if (!shop.some(x => x.name === it.name && !x.got)) shop.push({ id: uid(), name: it.name, amt: scaleText(it.amt, view.f), from: r.title, got: false }); })); saveShop(); toast("🛒 全部材料已加入購物清單"); return; }
    else if (d.savelog !== undefined) {
      const text = $("#log-text").value.trim(); if (!text && !pendingPhotos.length) { toast("先寫一點紀錄或加照片"); return; }
      const photos = []; for (const blob of pendingPhotos) { const pid = uid(); await idbPut("photos", { id: pid, blob }); photos.push(pid); }
      await idbPut("logs", { id: uid(), rid: id, date: today(), text, rate: $("#log-rate").value, f: view.f, photos }); logCount[id] = (logCount[id] || 0) + 1; toast("📒 紀錄已儲存");
    }
    else if (d.dellog) { if (!confirmInline(b, "確定刪除？")) return; const l = await idbGet("logs", d.dellog); for (const pid of (l.photos || [])) await idbDel("photos", pid); await idbDel("logs", d.dellog); logCount[id] = Math.max(0, (logCount[id] || 1) - 1); }
    else if (d.deluser !== undefined) { if (!confirmInline(b, "再按一次確定刪除")) return; await idbDel("recipes", id); userRecipes = userRecipes.filter(x => x.id !== id); location.hash = "#/"; return; }
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
  const presets = [["一次發酵", 0], ["烤箱", 0], ["燉煮", 0], ["醃肉", 0]];
  $("#view").innerHTML = `<h1>⏱ 計時器</h1><p class="muted">可以同時跑好幾個。關掉畫面也會繼續算，打開時會提醒。手機要打開音量；iPhone 請把 App 加到主畫面效果最好。</p>
    ${timers.map(t => `<div class="timer ${t.done ? "done" : ""} ${t.paused ? "paused" : ""}">
      <div class="lbl"><b>${esc(t.label)}</b><small>${esc(t.sub || "")}</small></div>
      <div class="left" data-left="${t.id}">${t.done ? "0:00" : hms(leftOf(t))}</div>
      ${t.done ? `<button class="btn small" data-restart="${t.id}">再一次</button>` : `<button class="btn small" data-pause="${t.id}">${t.paused ? "繼續" : "暫停"}</button><button class="btn small" data-plus="${t.id}">+1分</button>`}
      <button class="btn small ghost" data-del="${t.id}">✕</button></div>`).join("") || `<div class="empty">目前沒有計時器。在食譜步驟裡點 ⏱ 就能開始。</div>`}
    <h2>新增計時器</h2>
    <div class="field"><label>名稱</label><input id="t-name" placeholder="例如：一次發酵、烤箱、滷牛腱"></div>
    <div class="row"><input id="t-h" inputmode="numeric" placeholder="時" style="width:70px"><input id="t-m" inputmode="numeric" placeholder="分" style="width:70px"><input id="t-s" inputmode="numeric" placeholder="秒" style="width:70px"><button class="btn primary" data-new>開始</button></div>
    <div class="chips" style="margin-top:10px">${presets.map(p => `<button class="chip" data-preset="${p[0]}">${p[0]}</button>`).join("")}</div>`;
  $("#view").onclick = e => {
    const b = e.target.closest("button"); if (!b) return; const d = b.dataset; const t = timers.find(x => x.id === (d.pause || d.plus || d.del || d.restart));
    if (d.preset) { $("#t-name").value = d.preset; $("#t-m").focus(); return; }
    if (d.new !== undefined) { const sec = (+$("#t-h").value || 0) * 3600 + (+$("#t-m").value || 0) * 60 + (+$("#t-s").value || 0); if (!sec) { toast("請輸入時間"); return; } addTimer($("#t-name").value.trim() || "計時器", sec); return; }
    if (d.pause && t) { if (t.paused) { t.end = Date.now() + t.left * 1000; t.paused = false; } else { t.left = leftOf(t); t.paused = true; } }
    if (d.plus && t) { if (t.paused) t.left += 60; else t.end += 60000; }
    if (d.restart && t) { t.done = false; t.paused = false; t.end = Date.now() + t.dur * 1000; }
    if (d.del && t) timers = timers.filter(x => x !== t);
    saveTimers(); renderTimers();
  };
}

// ---------- 畫面：購物清單 ----------
function renderShop() {
  const p = prefs();
  $("#view").innerHTML = `<h1>🛒 購物清單</h1><p class="muted">附上約旦阿拉伯文，可以直接拿給店員看。</p>
    <div class="row"><input id="s-new" placeholder="自己加一項，例如：牛腱 1 公斤"><button class="btn primary" data-add>加入</button></div>
    <div style="margin-top:8px">${shop.map(x => { const ar = arOf(x.name); return `<div class="shop-item ${x.got ? "got" : ""}">
      <input type="checkbox" data-got="${x.id}" ${x.got ? "checked" : ""} style="width:22px;height:22px">
      <div class="nm">${esc(x.name)} <span class="muted">${esc(x.amt || "")}</span>${ar ? `<span class="ar"><bdi dir="rtl">${esc(ar.ar)}</bdi>　${esc(ar.p)}</span>` : ""}${x.from ? `<span class="note">${esc(x.from)}</span>` : ""}</div>
      <button class="btn small ghost" data-rm="${x.id}">✕</button></div>`; }).join("") || `<div class="empty">清單是空的。在食譜裡點材料旁的 🛒 就能加入。</div>`}</div>
    ${shop.length ? `<div class="row" style="margin-top:14px"><button class="btn" data-copy>複製清單（含阿拉伯文）</button><button class="btn ghost" data-clear>清掉已買的</button></div>` : ""}`;
  $("#view").onclick = async e => {
    const el = e.target.closest("[data-got],[data-rm],[data-add],[data-copy],[data-clear]"); if (!el) return; const d = el.dataset;
    if (d.got) { const x = shop.find(y => y.id === d.got); x.got = el.checked; }
    if (d.rm) shop = shop.filter(y => y.id !== d.rm);
    if (d.add !== undefined) { const v = $("#s-new").value.trim(); if (!v) return; const m = v.match(/^(.+?)\s+([\d½].*)$/); shop.push({ id: uid(), name: m ? m[1] : v, amt: m ? m[2] : "", got: false }); }
    if (d.clear !== undefined) shop = shop.filter(y => !y.got);
    if (d.copy !== undefined) { const txt = shop.filter(y => !y.got).map(y => { const ar = arOf(y.name); return `• ${y.name} ${y.amt || ""}${ar ? `　${ar.ar}` : ""}`; }).join("\n"); try { await navigator.clipboard.writeText(txt); toast("已複製，可以貼到 WhatsApp"); } catch { toast("無法複製，請手動選取"); } return; }
    saveShop(); renderShop();
  };
}

// ---------- 畫面：新增／編輯食譜 ----------
function parsePasted(text) {
  const lines = text.split(/\n+/).map(s => s.replace(/^[\s•・*\-#]+/, "").replace(/\*\*/g, "").trim()).filter(Boolean);
  const groups = [], steps = [], tips = []; let mode = "", cur = null, title = "";
  for (const l of lines) {
    const bare = l.replace(/[：:]$/, "");
    if (/步驟|做法|作法|流程/.test(bare) && bare.length < 20) { mode = "step"; continue; }
    if (/秘訣|技巧|小撇步|提醒|注意/.test(bare) && bare.length < 20) { mode = "tip"; continue; }
    if (/材料|食材|醃料|醬汁|調味/.test(bare) && bare.length < 20) { mode = "ing"; cur = { name: bare, items: [] }; groups.push(cur); continue; }
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
  $("#view").innerHTML = `<h1>${ex ? "編輯食譜" : "＋ 新增食譜"}</h1>
    <p class="muted">把 Gemini 或 Claude 的食譜整段貼上，會自動分成材料和做法；也可以自己打。格式小提示：標題一行、「材料：」下面一行一個「名稱：份量」、「做法：」下面一行一步。</p>
    <div class="field"><label>貼上或輸入食譜</label><textarea id="a-text" style="min-height:260px">${ex ? esc(toText(ex)) : ""}</textarea></div>
    <div class="row"><div class="field" style="flex:1"><label>分類</label><select id="a-cat">${CATS.slice(1).map(c => `<option ${ex && ex.cat === c ? "selected" : ""}>${c}</option>`).join("")}</select></div>
      <div class="field" style="width:120px"><label>幾人份</label><input id="a-sv" inputmode="numeric" value="${ex && ex.servings ? ex.servings : ""}"></div></div>
    <div class="field"><label>標籤（用空格分開，例如：請客 低渣）</label><input id="a-tags" value="${ex ? esc((ex.tags || []).join(" ")) : ""}"></div>
    <div class="row"><button class="btn" data-preview>預覽分段</button><button class="btn primary" data-save>儲存</button></div>
    <div id="a-prev"></div>`;
  $("#view").onclick = async e => {
    const b = e.target.closest("button"); if (!b) return;
    const p = parsePasted($("#a-text").value);
    if (b.dataset.preview !== undefined) { $("#a-prev").innerHTML = `<h2>${esc(p.title || "（沒有標題）")}</h2>${p.groups.map(g => `<div class="group"><h3>${esc(g.name)}</h3>${g.items.map(i => `<div class="ing"><div class="n">${esc(i.name)}</div><div class="a">${esc(i.amt)}</div></div>`).join("")}</div>`).join("")}<ol class="steps">${p.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>`; return; }
    if (b.dataset.save !== undefined) {
      if (!p.title) { toast("第一行請寫菜名"); return; }
      const r = { id: ex ? ex.id : "u" + uid(), user: true, title: p.title, cat: $("#a-cat").value, tags: $("#a-tags").value.split(/\s+/).filter(Boolean), servings: +$("#a-sv").value || null, intro: "", groups: p.groups, steps: p.steps, tips: p.tips, mine: [], source: { from: "自己新增", date: today(), ask: "" } };
      await idbPut("recipes", r); userRecipes = [r, ...userRecipes.filter(x => x.id !== r.id)]; location.hash = `#/r/${r.id}`;
    }
  };
}

// ---------- 畫面：設定與備份 ----------
function renderSettings() {
  $("#view").innerHTML = `<h1>⚙︎ 設定與備份</h1>
    <h2>加到手機主畫面</h2>
    <p>iPhone：用 Safari 打開 → 分享按鈕 → 「加入主畫面」。Android：Chrome 選單 → 「安裝應用程式」。加好之後沒有網路也能看食譜。</p>
    <h2>備份</h2>
    <p class="muted">實作紀錄、照片、自己新增的食譜、收藏和購物清單都存在這支手機裡。換手機或清除瀏覽器資料前，先下載備份。</p>
    <div class="row"><button class="btn primary" data-export>下載備份檔</button><label class="btn">匯入備份<input id="imp" type="file" accept="application/json" hidden></label></div>
    <p id="bk-msg" class="muted"></p>
    <h2>關於</h2>
    <p class="muted">${window.RECIPES.length} 道食譜整理自 2024-10 到 2026-09 跟 Gemini 的對話。份量換算只改材料，不會改步驟裡的時間和溫度。阿拉伯文是約旦口語說法，買菜前可以先跟店員確認。</p>`;
  $("#view").onclick = async e => {
    if (!e.target.closest("[data-export]")) return;
    const logs = await idbAll("logs"), photos = await idbAll("photos"), recs = await idbAll("recipes");
    const ph = await Promise.all(photos.map(p => new Promise(res => { const fr = new FileReader(); fr.onload = () => res({ id: p.id, data: fr.result }); fr.readAsDataURL(p.blob); })));
    const blob = new Blob([JSON.stringify({ v: 1, date: today(), recipes: recs, logs, photos: ph, favs: ls.get("favs", []), shop, prefs: prefs() })], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `食譜備份-${today()}.json`; a.click();
    $("#bk-msg").textContent = `已下載：${recs.length} 道自己的食譜、${logs.length} 筆紀錄、${ph.length} 張照片`;
  };
  $("#imp").onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      for (const r of d.recipes || []) await idbPut("recipes", r);
      for (const l of d.logs || []) await idbPut("logs", l);
      for (const p of d.photos || []) { const blob = await (await fetch(p.data)).blob(); await idbPut("photos", { id: p.id, blob }); }
      ls.set("favs", [...new Set([...ls.get("favs", []), ...(d.favs || [])])]);
      await load(); $("#bk-msg").textContent = "匯入完成！";
    } catch (err) { $("#bk-msg").textContent = "匯入失敗：檔案格式不對"; }
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
  userRecipes = await idbAll("recipes").catch(() => []);
  logCount = {}; (await idbAll("logs").catch(() => [])).forEach(l => logCount[l.rid] = (logCount[l.rid] || 0) + 1);
}
window.addEventListener("hashchange", () => { window.scrollTo(0, 0); render(); });
$("#alarm-stop").onclick = () => { $("#alarm").hidden = true; clearInterval(ringing); ringing = null; };
document.addEventListener("click", unlockAudio, { once: true });
const ft = document.createElement("a"); ft.id = "float-timer"; ft.className = "float-timers"; ft.href = "#/timers"; ft.hidden = true; document.body.appendChild(ft);
setInterval(tick, 1000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => {});
load().then(render);
})();
