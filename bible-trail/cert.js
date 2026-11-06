// 破關紀念證書：九章的「必去」站都蓋完就能領，全部地點都蓋完是金色版。
// 證書用 canvas 在手機上畫成圖片（不用網路、不用套件），名字不會傳到任何地方。
// 要在 app.js 之前載入：這裡只定義函式，用到的 t、el、state 等等是 app.js 的，呼叫時才會讀。
"use strict";

const CERT_NAME_KEY = "bibleTrail.certName";
const CERT_W = 1200, CERT_H = 1650;
// 證書固定用羊皮紙配色，不跟著深色模式變，下載後印出來才好看
const CERT_COLORS = { paper: "#fbf4e6", ink: "#2b211a", muted: "#7a6a5c", accent: "#8a4b2a", gold: "#c8962e", line: "#e4d6c3" };
const SERIF = '"Songti TC", "Noto Serif TC", "PMingLiU", Georgia, "Times New Roman", "Noto Naskh Arabic", "Geeza Pro", serif';
const SANS = '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", "Segoe UI", "Noto Naskh Arabic", "Geeza Pro", sans-serif';

function certStatus() {
  // 只算主線，支線是額外的
  const missing = mainChapters().flatMap((ch) => ch.required).filter((id) => !state.stamps[id]);
  const passedChapters = mainChapters().filter((ch) => chapterStatus(ch).passed).length;
  const ready = missing.length === 0;
  const ids = mainStationIds();
  const stamped = ids.filter((id) => state.stamps[id]).length;
  const stars = ids.filter((id) => state.stars[id]).length;
  return { ready, gold: ready && stamped === ids.length, missing: missing.length, passedChapters, stamped, stars, total: ids.length };
}

function loadCertName() {
  try { return localStorage.getItem(CERT_NAME_KEY) || ""; } catch { return ""; }
}
function saveCertName(name) {
  try { localStorage.setItem(CERT_NAME_KEY, name); } catch (e) { console.warn("[BibleTrail] 名字存不了（不影響證書）", e); }
}
// 名字是使用者輸入的：去掉控制字元、前後空白，限制長度，免得把證書擠爆
function cleanName(raw) {
  return String(raw || "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 40);
}

// ---------- 護照分頁裡的證書卡片 ----------
function certCard() {
  const cs = certStatus();
  const card = el("div", { class: "card cert-card" + (cs.gold ? " gold" : "") },
    el("h2", null, t("certTitle")),
    el("p", { class: "muted" }, t("certHow", { n: mainStationIds().length })));
  if (!cs.ready) {
    card.append(
      el("p", null, el("b", null, t("certLeft", { a: cs.missing, b: cs.passedChapters, c: mainChapters().length }))),
      el("div", { class: "progress" }, el("i", { style: `width:${Math.round((cs.passedChapters / mainChapters().length) * 100)}%` })));
    return card;
  }
  const input = el("input", { class: "text-input", type: "text", maxlength: "40", value: loadCertName(), placeholder: t("certNameHint"), "aria-label": t("certName") });
  const out = el("div", { class: "cert-out" });
  card.append(
    el("p", null, el("b", null, cs.gold ? t("certGoldReady") : t("certReady"))),
    el("label", { class: "field" }, el("span", null, t("certName")), input),
    el("button", { class: "btn", type: "button", onclick: () => makeCertificate(cleanName(input.value), out) }, t("certMake")),
    el("p", { class: "muted" }, t("certPrivacy")),
    out,
    noteCount() ? el("button", { class: "btn ghost", type: "button", onclick: downloadJournal }, t("journalDownload")) : null);
  return card;
}

function makeCertificate(name, out) {
  saveCertName(name);
  let canvas;
  try { canvas = drawCertificate(name); } catch (e) {
    console.error("[BibleTrail] 證書畫不出來", e);
    out.replaceChildren(el("p", { class: "warn" }, "⚠️ " + e.message));
    return;
  }
  canvas.toBlob((blob) => {
    if (!blob) { out.replaceChildren(el("p", { class: "warn" }, "⚠️ canvas")); return; }
    const url = URL.createObjectURL(blob);
    const file = `bible-trail-certificate-${lang}.png`;
    const shareBtn = canShareFile(blob, file)
      ? el("button", { class: "btn ghost", type: "button", onclick: () => shareCertificate(blob, file) }, t("certShare"))
      : null;
    out.replaceChildren(
      el("img", { class: "cert-img", src: url, alt: t("certHeading") }),
      el("div", { class: "row" }, el("a", { class: "btn", href: url, download: file }, t("certSave")), shareBtn));
  }, "image/png");
}

function canShareFile(blob, name) {
  try { return !!(navigator.canShare && navigator.canShare({ files: [new File([blob], name, { type: "image/png" })] })); } catch { return false; }
}
function shareCertificate(blob, name) {
  const file = new File([blob], name, { type: "image/png" });
  navigator.share({ files: [file], title: t("certHeading"), text: t("appName") + " · " + location.origin + location.pathname })
    // 使用者按「取消」也會跑到這裡，那是正常的，只記錄不跳錯誤
    .catch((e) => console.info("[BibleTrail] 沒有分享", e && e.name));
}

// ---------- 畫證書 ----------
function drawCertificate(name) {
  const cs = certStatus();
  const C = CERT_COLORS;
  const canvas = document.createElement("canvas");
  canvas.width = CERT_W; canvas.height = CERT_H;
  const g = canvas.getContext("2d");
  if (!g) throw new Error("This browser can't draw the certificate");
  const cx = CERT_W / 2;
  const frame = cs.gold ? C.gold : C.accent;

  g.fillStyle = C.paper; g.fillRect(0, 0, CERT_W, CERT_H);
  // 雙線外框＋四角的小菱形
  g.strokeStyle = frame; g.lineWidth = 10; g.strokeRect(40, 40, CERT_W - 80, CERT_H - 80);
  g.lineWidth = 2; g.strokeRect(62, 62, CERT_W - 124, CERT_H - 124);
  g.fillStyle = frame;
  for (const [x, y] of [[62, 62], [CERT_W - 62, 62], [62, CERT_H - 62], [CERT_W - 62, CERT_H - 62]]) {
    g.beginPath(); g.moveTo(x, y - 16); g.lineTo(x + 16, y); g.lineTo(x, y + 16); g.lineTo(x - 16, y); g.closePath(); g.fill();
  }
  g.textAlign = "center"; g.textBaseline = "alphabetic";
  // 阿拉伯文由右往左排，混到數字或英文名字時順序才會對
  g.direction = lang === "ar" ? "rtl" : "ltr";

  let y = 170;
  text(g, "✦  " + t("appName") + "  ✦", cx, y, `600 34px ${SANS}`, C.accent);
  y += 100;
  y = wrap(g, t("certHeading"), cx, y, CERT_W - 220, 76, `700 64px ${SERIF}`, C.ink);
  if (cs.gold) { text(g, "★ " + t("certGoldHeading") + " ★", cx, y - 6, `700 36px ${SERIF}`, C.gold); y += 44; }
  rule(g, cx, y - 20, 360, cs.gold ? C.gold : C.line);
  y += 70;
  text(g, t("certThis"), cx, y, `400 34px ${SERIF}`, C.muted);
  y += 110;
  y = wrap(g, name || t("certAnon"), cx, y, CERT_W - 240, 96, `700 ${fitSize(g, name || t("certAnon"), 84, CERT_W - 240)}px ${SERIF}`, C.accent);
  y += 10;
  y = wrap(g, t("certBody"), cx, y, CERT_W - 300, 52, `400 34px ${SERIF}`, C.ink);
  y += 30;
  text(g, quote(rankFor(stampCount())[lang]), cx, y, `700 56px ${SERIF}`, cs.gold ? C.gold : C.accent);
  y += 100;

  // 九章徽章：金色版的章節加金圈
  const chs = mainChapters();
  const gap = 112, startX = cx - ((chs.length - 1) * gap) / 2;
  chs.forEach((ch, i) => {
    const x = startX + i * gap, st = chapterStatus(ch);
    g.beginPath(); g.arc(x, y, 44, 0, Math.PI * 2);
    g.fillStyle = st.gold ? "rgba(200,150,46,.25)" : "rgba(138,75,42,.12)"; g.fill();
    if (st.gold) { g.lineWidth = 5; g.strokeStyle = C.gold; g.stroke(); }
    text(g, ch.badge, x, y + 16, `44px ${SANS}`, C.ink);
    text(g, String(ch.no), x, y + 78, `600 22px ${SANS}`, C.muted);
  });
  y += 160;

  text(g, t("certStats", { a: cs.stamped, b: cs.total, c: cs.stars }), cx, y, `600 32px ${SANS}`, C.ink);
  y += 54;
  const times = Object.values(state.stamps).map((s) => s.t).sort((a, b) => a - b);
  const reqTimes = chs.flatMap((ch) => ch.required).map((id) => state.stamps[id].t);
  text(g, t("certDates", { d1: fmtDate(times[0]), d2: fmtDate(Math.max(...reqTimes)) }), cx, y, `400 28px ${SANS}`, C.muted);
  y += 90;

  // 經文（三種譯本照語言挑）
  const v = VERSES[CERTIFICATE.verses[0]];
  if (v) {
    rule(g, cx, y - 40, 200, C.line);
    // 經文在下一節才講完，結尾的逗號改成「…」
    // 寬度留給右下角的印章，不會壓到經文
    y = wrap(g, quote(v[lang].replace(/[,，;；]\s*$/, "…")), cx, y, CERT_W - 460, 42, `${lang === "ar" ? "" : "italic "}400 28px ${SERIF}`, C.ink);
    text(g, "— " + v[lang + "Ref"], cx, y + 4, `600 26px ${SANS}`, C.muted);
  }

  // 底部印章
  seal(g, CERT_W - 180, CERT_H - 170, cs.gold ? C.gold : C.accent);
  text(g, "Benson and Esther", 220, CERT_H - 150, `600 26px ${SANS}`, C.muted);
  text(g, location.host + location.pathname.replace(/index\.html$/, ""), cx, CERT_H - 100, `400 24px ${SANS}`, C.muted);
  return canvas;
}

function text(g, s, x, y, font, color) { g.font = font; g.fillStyle = color; g.fillText(s, x, y); }
function rule(g, cx, y, w, color) { g.strokeStyle = color; g.lineWidth = 2; g.beginPath(); g.moveTo(cx - w / 2, y); g.lineTo(cx + w / 2, y); g.stroke(); }
// 名字太長就縮小字，最小 44px
function fitSize(g, s, max, width) {
  for (let size = max; size > 44; size -= 4) { g.font = `700 ${size}px ${SERIF}`; if (g.measureText(s).width <= width) return size; }
  return 44;
}
// 引號照語言：中文用「」，挪威文、阿拉伯文用 « »，英文、葡文用 “ ”
function quote(s) { return lang === "zh" ? "「" + s + "」" : lang === "no" || lang === "ar" ? "\u00ab" + s + "\u00bb" : "\u201c" + s + "\u201d"; }
// 自動換行：有漢字就一個字一個字斷，英文、葡文照單字斷；回傳下一行的 y
// 句尾標點（，。」…）不放到新的一行開頭，寧可這一行稍微長一點
const NO_LINE_START = /^[\uff0c\u3002\u3001\uff1b\uff1a\u300d\u300f\uff01\uff1f\u2026\uff09\u201d]$/;
function wrap(g, s, x, y, maxW, lineH, font, color) {
  g.font = font; g.fillStyle = color;
  const tokens = /[\u4e00-\u9fff]/.test(s) ? Array.from(s) : s.split(/(\s+)/);
  let line = "";
  for (const tok of tokens) {
    const test = line + tok;
    if (line && !NO_LINE_START.test(tok) && g.measureText(test).width > maxW) { g.fillText(line.trim(), x, y); y += lineH; line = tok.trimStart(); }
    else line = test;
  }
  if (line.trim()) { g.fillText(line.trim(), x, y); y += lineH; }
  return y;
}
function seal(g, x, y, color) {
  g.save();
  g.translate(x, y); g.rotate(-0.15);
  g.strokeStyle = color; g.fillStyle = color;
  g.lineWidth = 5; g.beginPath(); g.arc(0, 0, 78, 0, Math.PI * 2); g.stroke();
  g.lineWidth = 2; g.beginPath(); g.arc(0, 0, 66, 0, Math.PI * 2); g.stroke();
  g.textAlign = "center";
  g.font = `700 26px ${SANS}`; g.fillText("✦ " + mainChapters().length + " ✦", 0, -14);
  g.font = `600 17px ${SANS}`; g.fillText("JORDAN", 0, 14);
  g.fillText("BIBLE TRAIL", 0, 36);
  g.restore();
}
