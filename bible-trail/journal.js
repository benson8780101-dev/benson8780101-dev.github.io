// 旅程日記：每站「想一想」底下可以寫自己的回答，只存在這支手機（跟印章一起存、一起備份）。
// 護照分頁可以把全部回答下載成一個文字檔，破關時也可以跟證書一起下載。
// 要在 app.js 之前載入：這裡只定義函式，用到的 t、el、state 等等是 app.js 的，呼叫時才會讀。
"use strict";

// 一站最多存這麼多字，免得備份檔變得太大
const NOTE_MAX = 1500;
// 打字停下來多久才存（毫秒）：每打一個字就存太頻繁
const NOTE_SAVE_DELAY = 600;

function cleanNote(raw) {
  return String(raw || "").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, NOTE_MAX);
}
const noteCount = () => Object.keys(state.notes).length;

// ---------- 地點詳細頁：「想一想」底下的回答框 ----------
function noteBox(id) {
  const status = el("span", { class: "note-status muted", "aria-live": "polite" });
  const area = el("textarea", { class: "text-input note-input", rows: "3", maxlength: String(NOTE_MAX), placeholder: t("notePlaceholder"), "aria-label": t("noteLabel") });
  area.value = state.notes[id] || "";
  let timer = null;
  area.addEventListener("input", () => {
    status.textContent = "";
    clearTimeout(timer);
    timer = setTimeout(() => {
      const v = cleanNote(area.value);
      if (v) state.notes[id] = v; else delete state.notes[id];
      saveState();
      // 存不了（例如無痕模式）要說出來，不能讓人以為存好了
      status.textContent = storageOk ? t("noteSaved") : t("storageOff");
      // 護照分頁的「已經寫了幾站」跟著更新（只重畫護照，不動正在打字的這一頁）
      renderPassport();
    }, NOTE_SAVE_DELAY);
  });
  return el("label", { class: "field note" }, el("span", null, t("noteLabel")), area, status);
}

// ---------- 護照分頁：日記卡片 ----------
function journalCard() {
  const n = noteCount();
  return el("div", { class: "card" },
    el("h2", null, t("journalTitle")),
    el("p", { class: "muted" }, t("journalHelp")),
    el("p", null, el("b", null, n ? t("journalCount", { n }) : t("journalEmpty"))),
    n ? el("button", { class: "btn small", type: "button", onclick: downloadJournal }, t("journalDownload")) : null);
}

// 照章節順序整理成文字檔（用目前選的語言）
function journalText() {
  const lines = [t("journalHeading"), new Date().toLocaleDateString(LOCALE[lang]), ""];
  for (const ch of CHAPTERS) {
    const ids = ch.required.concat(ch.bonus).filter((id) => state.notes[id]);
    if (!ids.length) continue;
    lines.push("━━ " + chapterLabel(ch) + "・" + pick(ch.title) + " ━━", "");
    for (const id of ids) {
      const s = STATIONS[id], st = state.stamps[id];
      lines.push("■ " + pick(s.name));
      if (st) lines.push("  🛂 " + t("stampedOn", { d: fmtDate(st.t) }));
      lines.push("  💭 " + pick(s.reflect), "  ✍️ " + state.notes[id], "");
    }
  }
  lines.push(location.host + location.pathname.replace(/index\.html$/, ""));
  return lines.join("\n");
}
function downloadJournal() {
  const blob = new Blob([journalText()], { type: "text/plain;charset=utf-8" });
  const a = el("a", { href: URL.createObjectURL(blob), download: `bible-trail-journal-${new Date().toISOString().slice(0, 10)}.txt` });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
