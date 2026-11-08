// 約旦聖經足跡：畫面與遊戲邏輯
// 內容在 data.js、經文在 verses.js；這裡只負責顯示、蓋章、問答、存進度。
"use strict";

const STORE_KEY = "bibleTrail.v1";
const LANG_KEY = "bibleTrail.lang";
const INTRO_KEY = "bibleTrail.introSeen";

// ---------- 介面文字（中英一定要一起改） ----------
const T = {
  appName: { zh: "約旦聖經足跡", en: "Jordan Bible Trail" },
  tabMap: { zh: "地圖", en: "Map" },
  tabChapters: { zh: "關卡", en: "Chapters" },
  tabPassport: { zh: "護照", en: "Passport" },
  tabAbout: { zh: "說明", en: "About" },
  showMe: { zh: "📍 我在哪", en: "📍 Where am I" },
  mapOffline: { zh: "地圖需要網路才能顯示。沒有網路時，請到「關卡」分頁看所有地點，蓋章和經文都能照常使用。", en: "The map needs an internet connection. Offline, use the Chapters tab—stamps and scripture still work." },
  rankPrefix: { zh: "稱號：", en: "Rank: " },
  chapter: { zh: "第 {n} 章", en: "Chapter {n}" },
  required: { zh: "必去", en: "Must-see" },
  bonus: { zh: "加分", en: "Bonus" },
  open: { zh: "查看", en: "Open" },
  close: { zh: "← 返回", en: "← Back" },
  passed: { zh: "已過關", en: "Completed" },
  goldDone: { zh: "金色徽章！", en: "Gold badge!" },
  notPassed: { zh: "去完「必去」的站就過關", en: "Visit the must-see stops to complete" },
  stampsOf: { zh: "已蓋章 {a} / {b}", en: "Stamps {a} / {b}" },
  starsOf: { zh: "問答答對 {a} / {b}", en: "Quiz stars {a} / {b}" },
  scripture: { zh: "📖 經文", en: "📖 Scripture" },
  story: { zh: "📜 故事", en: "📜 The Story" },
  reflect: { zh: "💭 想一想", en: "💭 Reflect" },
  mission: { zh: "🎯 現場任務", en: "🎯 On-site Mission" },
  quiz: { zh: "❓ 小問答", en: "❓ Quiz" },
  howto: { zh: "🚗 怎麼去", en: "🚗 Getting There" },
  checkinTitle: { zh: "🛂 蓋章", en: "🛂 Get Your Stamp" },
  checkinHelp: { zh: "人到了現場，按下面的按鈕。手機會確認你的位置，在範圍內就幫你蓋章。位置只在你的手機上比對，不會傳到任何地方。", en: "When you're on site, tap the button. Your phone checks your location and stamps your passport if you're in range. Your location is only compared on your phone and never sent anywhere." },
  checkinBtn: { zh: "📍 我到了，蓋章！", en: "📍 I'm here — stamp it!" },
  checking: { zh: "正在確認位置…（最多 20 秒）", en: "Checking your location… (up to 20 seconds)" },
  stamped: { zh: "已蓋章", en: "Stamped" },
  stampedOn: { zh: "{d} 蓋章", en: "Stamped {d}" },
  manualMark: { zh: "（手動）", en: " (manual)" },
  tooFar: { zh: "你離這裡還有大約 {km} 公里。到了再試一次！", en: "You're about {km} km away. Try again when you arrive!" },
  geoDenied: { zh: "沒有取得位置權限。請到手機設定允許瀏覽器使用位置，再試一次。", en: "Location permission was denied. Allow location for your browser in phone settings, then try again." },
  geoFail: { zh: "暫時抓不到位置（可能在室內或訊號不好）。", en: "Couldn't get your location (maybe indoors or weak signal)." },
  noGeo: { zh: "這支手機的瀏覽器不支援定位。", en: "This browser doesn't support location." },
  manualHint: { zh: "GPS 不準、但你確定人在現場？可以手動蓋章（護照上會標「手動」）。", en: "GPS inaccurate but you're sure you're on site? You can stamp manually (marked 'manual' in your passport)." },
  manualBtn: { zh: "我確定在現場，手動蓋章", en: "I'm on site — stamp manually" },
  manualConfirm: { zh: "確定嗎？按「確定蓋章」完成。", en: "Are you sure? Tap 'Confirm' to stamp." },
  confirm: { zh: "確定蓋章", en: "Confirm" },
  cancel: { zh: "取消", en: "Cancel" },
  rightAns: { zh: "答對了！⭐ 獲得一顆星", en: "Correct! ⭐ You earned a star" },
  wrongAns: { zh: "再想想，經文裡有答案喔！", en: "Not quite—the answer is in the scripture!" },
  quizDone: { zh: "⭐ 已答對", en: "⭐ Answered" },
  photoBy: { zh: "照片：", en: "Photo: " },
  noFacilities: { zh: "⚠️ 沒有遊客設施", en: "⚠️ No visitor facilities" },
  approx: { zh: "📍 大約位置（待實地確認）", en: "📍 Approximate location (to be verified)" },
  certYes: { zh: "✅ 學者大多同意就在這裡", en: "✅ Widely accepted location" },
  certLikely: { zh: "🤔 很可能在這裡", en: "🤔 Probable location" },
  certTradition: { zh: "🕯️ 傳統說法（信徒世代紀念的地方）", en: "🕯️ Traditional site (remembered by believers for centuries)" },
  certArea: { zh: "🗺️ 一整個區域", en: "🗺️ A whole region" },
  certUnknown: { zh: "❓ 位置不確定", en: "❓ Location uncertain" },
  hiddenTag: { zh: "隱藏", en: "Hidden" },
  hiddenHelp: { zh: "🔒 這是隱藏關卡：位置不確定，不用到現場。讀完經文和故事，答對下面的小問答，就會解鎖印章。", en: "🔒 This is a hidden level: the location is uncertain, so no visit is needed. Read the scripture and story, then answer the quiz below to unlock the stamp." },
  chapterPassed: { zh: "🎉 {c}過關！獲得徽章 {b}", en: "🎉 {c} complete! Badge earned {b}" },
  chapterGold: { zh: "🏆 {c}全部完成！徽章變成金色了", en: "🏆 {c} fully complete! Your badge turned gold" },
  newRank: { zh: "🎖️ 新稱號：{r}", en: "🎖️ New rank: {r}" },
  stampToast: { zh: "🛂 蓋章成功：{s}", en: "🛂 Stamped: {s}" },
  myStamps: { zh: "我的印章", en: "My Stamps" },
  myBadges: { zh: "章節徽章", en: "Chapter Badges" },
  backup: { zh: "備份進度", en: "Back Up Progress" },
  backupHelp: { zh: "進度只存在這支手機的瀏覽器裡。換手機或清除瀏覽器資料前，先匯出一個備份檔；之後再匯入就能接著玩。", en: "Progress is saved only in this phone's browser. Before switching phones or clearing browser data, export a backup file; import it later to continue." },
  exportBtn: { zh: "匯出備份檔", en: "Export backup" },
  importBtn: { zh: "匯入備份檔", en: "Import backup" },
  importOk: { zh: "已匯入進度：{n} 個印章", en: "Progress imported: {n} stamps" },
  importBad: { zh: "這個檔案看起來不是聖經足跡的備份檔，沒有匯入。", en: "This file doesn't look like a Bible Trail backup, so nothing was imported." },
  storageOff: { zh: "⚠️ 這個瀏覽器不能存資料（可能是無痕模式），關掉後進度會不見。", en: "⚠️ This browser can't save data (maybe private mode); progress will be lost when you close it." },
  introTitle: { zh: "歡迎來到約旦聖經足跡！", en: "Welcome to the Jordan Bible Trail!" },
  introBody: {
    zh: "主線共 {c} 章、{n} 個地點，從北部的基列山地一路走到紅海邊。\n・經文和故事隨時都能讀，適合出發前預習。\n・人到了現場，按「我到了，蓋章」，手機用 GPS 確認位置後幫你蓋章。\n・標「隱藏」的關卡位置不確定，不用到現場，答對問答就解鎖。\n・去完一章的「必去」站就過關；全部去完，徽章會變金色。\n・「支線」是額外的路線，想走再走，不影響破關證書。\n・九章的「必去」站都蓋完，可以在「護照」分頁領取破關紀念證書。\n・地圖要有網路；其他內容沒網路也能用。",
    en: "The main trail has {c} chapters and {n} sites, from the hills of Gilead in the north to the Red Sea.\n• Read the scripture and stories anytime—great for preparing before you go.\n• On site, tap \"I'm here — stamp it!\" and your phone's GPS confirms your location.\n• 'Hidden' levels have uncertain locations—no visit needed; answer the quiz to unlock them.\n• Visit a chapter's must-see stops to complete it; visit them all to earn a gold badge.\n• Side trails are optional extra routes and don't affect your certificate.\n• Complete the must-see stops of all nine chapters to claim your certificate in the Passport tab.\n• The map needs internet; everything else works offline."
  },
  gotIt: { zh: "知道了，開始！", en: "Got it, let's go!" },
  locating: { zh: "正在找你的位置…", en: "Finding you…" },
  youAreHere: { zh: "你在這裡", en: "You are here" },
  navBtn: { zh: "🧭 Google 地圖導航", en: "🧭 Navigate with Google Maps" },
  navApprox: { zh: "這是大約位置，快到的時候請看當地路標或問路。", en: "This is an approximate location—watch for local signs or ask for directions as you get close." },
  sideChapter: { zh: "支線", en: "Side Trail" },
  foodTitle: { zh: "🍽️ 聖經餐桌", en: "🍽️ Bible Table" },
  noteLabel: { zh: "✍️ 我的回答（只存在這支手機）", en: "✍️ My answer (saved only on this phone)" },
  notePlaceholder: { zh: "寫一兩句就好……", en: "A sentence or two is enough…" },
  noteSaved: { zh: "✓ 已存", en: "✓ Saved" },
  journalTitle: { zh: "📓 我的旅程日記", en: "📓 My Journey Journal" },
  journalHelp: { zh: "每站「想一想」底下寫的回答，都會收在這裡。只存在這支手機，不會傳到任何地方；換手機前用下面的「匯出備份檔」，日記也會一起備份。", en: "Your answers under each site's \"Reflect\" are collected here. They're saved only on this phone and never sent anywhere; before switching phones, use \"Export backup\" below and your journal is backed up too." },
  journalCount: { zh: "已經寫了 {n} 站", en: "Sites with an answer: {n}" },
  journalEmpty: { zh: "還沒有寫任何一站。打開任何地點，在「想一想」底下寫下你的回答。", en: "Nothing yet. Open any site and write your answer under \"Reflect\"." },
  journalDownload: { zh: "⬇️ 下載日記（文字檔）", en: "⬇️ Download journal (text file)" },
  journalHeading: { zh: "約旦聖經足跡・我的旅程日記", en: "Jordan Bible Trail · My Journey Journal" },
  homeTitle: { zh: "🏠 還沒出發，就能先拿 {n} 個章", en: "🏠 Earn {n} stamps before you even set out" },
  homeHelp: { zh: "這 {n} 個「隱藏關卡」位置不確定，不用到現場：讀完故事、答對小問答就能解鎖。出發前先在家讀一讀，旅程還沒開始就有進度。", en: "These {n} hidden levels have uncertain locations, so no visit is needed: read the story and answer the quiz to unlock each one. Read them at home before your trip and you'll have progress before the journey begins." },
  homeProgress: { zh: "已解鎖 {a} / {b}", en: "Unlocked {a} / {b}" },
  tripsTitle: { zh: "🗓️ 現成行程", en: "🗓️ Ready-Made Itineraries" },
  tripsHelp: { zh: "給自己開車的人：照著走就好，點地點可以看故事和導航。打勾的是已經蓋過章的。", en: "For self-drive travelers: just follow along; tap a site for its story and directions. Ticks mark stamps you already have." },
  tripDay: { zh: "第 {n} 天", en: "Day {n}" },
  tripSleep: { zh: "🛏️ 住：", en: "🛏️ Stay: " },
  sideNote: { zh: "支線是額外的路線，想走再走，不影響破關證書。", en: "Side trails are optional extra routes; they don't affect your certificate." },
  certTitle: { zh: "🏅 破關紀念證書", en: "🏅 Certificate of Completion" },
  certHow: { zh: "九章的「必去」站全部蓋完，就能領取證書；全部 {n} 個地點都蓋完，證書會變成金色版。", en: "Stamp every must-see stop in all nine chapters to earn your certificate; stamp all {n} sites and it becomes the gold edition." },
  certLeft: { zh: "還差 {a} 個必去站（已完成 {b} / {c} 章）", en: "{a} must-see stops to go ({b} / {c} chapters complete)" },
  certReady: { zh: "🎉 恭喜！你走完了主線九章，可以領取證書了。", en: "🎉 Congratulations! You've completed all nine chapters—your certificate is ready." },
  certGoldReady: { zh: "🏆 你蓋完了全部地點！這是金色版證書。", en: "🏆 You've stamped every site! This is the gold edition." },
  certName: { zh: "證書上的名字", en: "Name on the certificate" },
  certNameHint: { zh: "例如：Benson and Esther", en: "e.g. Benson and Esther" },
  certMake: { zh: "產生證書", en: "Create certificate" },
  certSave: { zh: "⬇️ 下載圖片", en: "⬇️ Download image" },
  certShare: { zh: "📤 分享", en: "📤 Share" },
  certPrivacy: { zh: "證書只在你的手機上產生，名字不會傳到任何地方。想換語言，切換右上角的語言再按一次「產生證書」。", en: "The certificate is made on your phone; your name is never sent anywhere. For another language, switch the language at the top right and tap \"Create certificate\" again." },
  certHeading: { zh: "破關紀念證書", en: "Certificate of Completion" },
  certGoldHeading: { zh: "金色版", en: "Gold Edition" },
  certThis: { zh: "茲證明", en: "This certifies that" },
  certAnon: { zh: "一位旅人", en: "A Traveler" },
  certBody: { zh: "走完了約旦聖經足跡主線九章，從北部的基列山地一路走到紅海邊，獲得稱號", en: "has walked all nine chapters of the Jordan Bible Trail, from the hills of Gilead in the north to the shore of the Red Sea, and earned the title" },
  certStats: { zh: "印章 {a} / {b} ・ 問答 ⭐ {c} / {b}", en: "Stamps {a} / {b} · Quiz ⭐ {c} / {b}" },
  certDates: { zh: "{d1} 啟程 ・ {d2} 完成", en: "Began {d1} · Completed {d2}" }
};

// 巴西葡萄牙文介面文字（跟上面 T 的 key 一一對應；T 新增文字時這裡也要加）
const T_PT = {
  appName: "Trilha Bíblica da Jordânia",
  tabMap: "Mapa", tabChapters: "Capítulos", tabPassport: "Passaporte", tabAbout: "Sobre",
  showMe: "📍 Onde estou",
  mapOffline: "O mapa precisa de internet. Sem conexão, use a aba Capítulos — os carimbos e as passagens bíblicas continuam funcionando.",
  rankPrefix: "Título: ",
  chapter: "Capítulo {n}",
  required: "Obrigatório", bonus: "Bônus", open: "Abrir", close: "← Voltar",
  passed: "Concluído", goldDone: "Medalha de ouro!", notPassed: "Visite as paradas obrigatórias para concluir",
  stampsOf: "Carimbos {a} / {b}", starsOf: "Estrelas {a} / {b}",
  scripture: "📖 Bíblia", story: "📜 A História", reflect: "💭 Para Refletir", mission: "🎯 Missão no Local", quiz: "❓ Quiz", howto: "🚗 Como Chegar",
  checkinTitle: "🛂 Pegue Seu Carimbo",
  checkinHelp: "Quando estiver no local, toque no botão. O celular confere a sua localização e carimba o passaporte se você estiver dentro da área. A localização só é comparada no seu celular e nunca é enviada a lugar nenhum.",
  checkinBtn: "📍 Cheguei — carimbar!",
  checking: "Verificando sua localização… (até 20 segundos)",
  stamped: "Carimbado", stampedOn: "Carimbado em {d}", manualMark: " (manual)",
  tooFar: "Você está a cerca de {km} km daqui. Tente de novo quando chegar!",
  geoDenied: "A permissão de localização foi negada. Permita a localização para o navegador nas configurações do celular e tente de novo.",
  geoFail: "Não foi possível obter sua localização (talvez você esteja em local fechado ou com sinal fraco).",
  noGeo: "Este navegador não tem suporte a localização.",
  manualHint: "O GPS não está preciso, mas você tem certeza de que está no local? Dá para carimbar manualmente (fica marcado como \"manual\" no passaporte).",
  manualBtn: "Estou no local — carimbar manualmente",
  manualConfirm: "Tem certeza? Toque em \"Confirmar\" para carimbar.",
  confirm: "Confirmar", cancel: "Cancelar",
  rightAns: "Acertou! ⭐ Você ganhou uma estrela",
  wrongAns: "Ainda não — a resposta está na passagem bíblica!",
  quizDone: "⭐ Respondido",
  photoBy: "Foto: ",
  noFacilities: "⚠️ Sem estrutura para visitantes",
  approx: "📍 Localização aproximada (a confirmar)",
  certYes: "✅ Localização amplamente aceita",
  certLikely: "🤔 Localização provável",
  certTradition: "🕯️ Local tradicional (lembrado pelos cristãos há séculos)",
  certArea: "🗺️ Uma região inteira",
  certUnknown: "❓ Localização incerta",
  hiddenTag: "Secreta",
  hiddenHelp: "🔒 Esta é uma fase secreta: a localização é incerta, então não é preciso ir até lá. Leia a passagem e a história e responda o quiz abaixo para ganhar o carimbo.",
  chapterPassed: "🎉 {c} concluído! Medalha conquistada {b}",
  chapterGold: "🏆 {c} completo! Sua medalha ficou dourada",
  newRank: "🎖️ Novo título: {r}",
  stampToast: "🛂 Carimbado: {s}",
  myStamps: "Meus Carimbos", myBadges: "Medalhas dos Capítulos",
  backup: "Backup do Progresso",
  backupHelp: "O progresso fica salvo só no navegador deste celular. Antes de trocar de celular ou apagar os dados do navegador, exporte um arquivo de backup; depois é só importá-lo para continuar.",
  exportBtn: "Exportar backup", importBtn: "Importar backup",
  importOk: "Progresso importado: {n} carimbos",
  importBad: "Este arquivo não parece ser um backup da Trilha Bíblica, então nada foi importado.",
  storageOff: "⚠️ Este navegador não consegue salvar dados (talvez esteja em modo anônimo); o progresso se perde ao fechar.",
  introTitle: "Bem-vindo à Trilha Bíblica da Jordânia!",
  introBody: "A trilha principal tem {c} capítulos e {n} lugares, das colinas de Gileade, no norte, até o mar Vermelho.\n• Leia as passagens e as histórias quando quiser — ótimo para se preparar antes da viagem.\n• No local, toque em \"Cheguei — carimbar!\" e o GPS do celular confirma onde você está.\n• As fases \"secretas\" têm localização incerta — não precisa ir até lá; responda o quiz para desbloqueá-las.\n• Visite as paradas obrigatórias de um capítulo para concluí-lo; visite todas para ganhar a medalha de ouro.\n• As trilhas extras são rotas opcionais e não afetam o certificado.\n• Conclua as paradas obrigatórias dos nove capítulos para pegar seu certificado na aba Passaporte.\n• O mapa precisa de internet; todo o resto funciona offline.",
  gotIt: "Entendi, vamos lá!",
  locating: "Procurando você…",
  youAreHere: "Você está aqui",
  navBtn: "🧭 Ir com o Google Maps",
  navApprox: "Esta é uma localização aproximada — fique atento às placas ou peça informações quando estiver chegando.",
  sideChapter: "Trilha Extra",
  foodTitle: "🍽️ Mesa Bíblica",
  noteLabel: "✍️ Minha resposta (salva só neste celular)",
  notePlaceholder: "Uma ou duas frases bastam…",
  noteSaved: "✓ Salvo",
  journalTitle: "📓 Meu Diário de Viagem",
  journalHelp: "Suas respostas em \"Para Refletir\" de cada lugar ficam reunidas aqui. Elas ficam salvas só neste celular e nunca são enviadas a lugar nenhum; antes de trocar de celular, use \"Exportar backup\" abaixo e o diário também vai junto.",
  journalCount: "Lugares com resposta: {n}",
  journalEmpty: "Nada ainda. Abra qualquer lugar e escreva sua resposta em \"Para Refletir\".",
  journalDownload: "⬇️ Baixar diário (arquivo de texto)",
  journalHeading: "Trilha Bíblica da Jordânia · Meu Diário de Viagem",
  homeTitle: "🏠 Ganhe {n} carimbos antes mesmo de sair",
  homeHelp: "Estas {n} fases secretas têm localização incerta, então não é preciso ir até lá: leia a história e responda o quiz para desbloquear cada uma. Leia em casa antes da viagem e você já terá progresso antes de a jornada começar.",
  homeProgress: "Desbloqueadas {a} / {b}",
  tripsTitle: "🗓️ Roteiros Prontos",
  tripsHelp: "Para quem dirige por conta própria: é só seguir; toque num lugar para ver a história e o caminho. Os marcados já foram carimbados.",
  tripDay: "Dia {n}",
  tripSleep: "🛏️ Pernoite: ",
  sideNote: "As trilhas extras são rotas opcionais; não afetam o certificado.",
  certTitle: "🏅 Certificado de Conclusão",
  certHow: "Carimbe todas as paradas obrigatórias dos nove capítulos para ganhar o certificado; carimbe todos os {n} lugares e ele vira a edição dourada.",
  certLeft: "Faltam {a} paradas obrigatórias ({b} / {c} capítulos concluídos)",
  certReady: "🎉 Parabéns! Você concluiu os nove capítulos — seu certificado está pronto.",
  certGoldReady: "🏆 Você carimbou todos os lugares! Esta é a edição dourada.",
  certName: "Nome no certificado",
  certNameHint: "ex.: Benson and Esther",
  certMake: "Gerar certificado",
  certSave: "⬇️ Baixar imagem",
  certShare: "📤 Compartilhar",
  certPrivacy: "O certificado é gerado no seu celular; seu nome nunca é enviado a lugar nenhum. Para outro idioma, troque o idioma no canto superior direito e toque em \"Gerar certificado\" de novo.",
  certHeading: "Certificado de Conclusão",
  certGoldHeading: "Edição Dourada",
  certThis: "Certificamos que",
  certAnon: "Um Viajante",
  certBody: "percorreu os nove capítulos da Trilha Bíblica da Jordânia, das colinas de Gileade, no norte, até a beira do mar Vermelho, e conquistou o título",
  certStats: "Carimbos {a} / {b} · Quiz ⭐ {c} / {b}",
  certDates: "Início {d1} · Conclusão {d2}"
};
for (const [k, v] of Object.entries(T_PT)) if (T[k]) T[k].pt = v;

// 把 data-pt.js 的葡萄牙文合併進 data.js 的內容（每段文字多一個 pt）
function mergePortuguese() {
  if (!window.PT) return;
  for (const ch of CHAPTERS) {
    const p = PT.chapters[ch.id];
    if (p) { ch.title.pt = p.title; ch.intro.pt = p.intro; }
    if (p && p.food && ch.food) { ch.food.dish.pt = p.food.dish; ch.food.text.pt = p.food.text; }
  }
  for (const [id, s] of Object.entries(STATIONS)) {
    const p = PT.stations[id];
    if (!p) { console.warn("[BibleTrail] 缺少葡萄牙文：" + id); continue; }
    for (const k of ["name", "place", "story", "reflect", "mission", "howto"]) s[k].pt = p[k];
    s.quiz.q.pt = p.quiz.q;
    s.quiz.options.forEach((o, i) => { o.pt = p.quiz.options[i]; });
  }
  TITLES.forEach((x, i) => { x.pt = PT.titles[i]; });
}
mergePortuguese();

// ---------- 小工具 ----------
// 中英葡三語直接寫在 data.js／data-pt.js 裡；其他 8 種語言各一個「語言包」lang/<代碼>.js，
// 選到那個語言才下載，手機不用一次載入 10 種語言。語言包的翻譯用「英文原文的編號」對應（見 textId）。
const LANGS = ["zh", "zhs", "en", "pt", "es", "fr", "de", "nl", "no", "ar", "ko"];
const PACK_LANGS = ["zhs", "es", "fr", "de", "nl", "no", "ar", "ko"];
const LANG_INFO = {
  zh: { html: "zh-Hant", locale: "zh-TW" }, zhs: { html: "zh-Hans", locale: "zh-CN" },
  en: { html: "en", locale: "en-GB" }, pt: { html: "pt-BR", locale: "pt-BR" },
  es: { html: "es", locale: "es-ES" }, fr: { html: "fr", locale: "fr-FR" },
  de: { html: "de", locale: "de-DE" }, nl: { html: "nl", locale: "nl-NL" }, no: { html: "nb", locale: "nb-NO" },
  ar: { html: "ar", locale: "ar-JO", rtl: true }, ko: { html: "ko", locale: "ko-KR" }
};
const LOCALE = Object.fromEntries(LANGS.map((k) => [k, LANG_INFO[k].locale]));
window.LANGPACK = window.LANGPACK || {};
let lang = loadLang();
// 英文原文 → 短編號（FNV-1a 雜湊）。工具/build_langpacks.js 用一樣的算法，兩邊一定要一致
const idCache = new Map();
function textId(s) {
  let id = idCache.get(s);
  if (id) return id;
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  id = h.toString(36);
  idCache.set(s, id);
  return id;
}
const missingSeen = new Set();
// 從語言包找翻譯；找不到就記在主控台（檢查工具會抓），畫面先用英文
function fromPack(o) {
  const pack = LANGPACK[lang];
  if (!pack || !o || typeof o.en !== "string") return null;
  const v = pack.text[textId(o.en)];
  if (v == null && !missingSeen.has(o.en)) { missingSeen.add(o.en); console.warn("[BibleTrail] 缺少翻譯（" + lang + "）：" + o.en.slice(0, 60)); }
  return v;
}
// 缺哪個語言就先用英文，再用中文，畫面不會空白
const t = (key, vars) => { const e = T[key] || {}; return fill(e[lang] || fromPack(e) || e.en || key, vars); };
const pick = (obj) => (obj ? obj[lang] || fromPack(obj) || obj.en || obj.zh : "");
// 一段只出現在程式裡的多語文字（說明頁用）。注意：不能取名 L，L 是地圖套件 Leaflet 的名字
const tri = (o) => pick(o);
// 經文：中英葡在 verses.js，其他語言在語言包的 verses 裡
function verseOf(ref) {
  const v = VERSES[ref];
  if (!v) return null;
  if (v[lang]) return { text: v[lang], ref: v[lang + "Ref"] };
  const pv = LANGPACK[lang] && LANGPACK[lang].verses && LANGPACK[lang].verses[ref];
  if (pv) return { text: pv.text, ref: pv.ref };
  if (PACK_LANGS.includes(lang)) console.warn("[BibleTrail] 缺少經文（" + lang + "）：" + ref);
  return { text: v.en, ref: v.enRef };
}
// 語言包下載：成功或失敗都會 resolve，失敗時畫面先用英文，不會整個壞掉
function loadPack(code) {
  if (!PACK_LANGS.includes(code) || LANGPACK[code]) return Promise.resolve();
  return new Promise((resolve) => {
    const sc = document.createElement("script");
    sc.src = "lang/" + code + ".js";
    sc.onload = resolve;
    sc.onerror = () => { console.error("[BibleTrail] 語言包沒載到：" + code); resolve(); };
    document.head.append(sc);
  });
}
function fill(s, vars) {
  if (!vars) return s;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : ""));
}
// 一律用 textContent 放文字，避免任何內容被當成網頁程式碼執行
function el(tag, attrs, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === "class") n.className = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false) continue;
    n.append(kid instanceof Node ? kid : document.createTextNode(String(kid)));
  }
  return n;
}
// 證書（cert.js）、日記（journal.js）是另外的檔案。網路不好時其中一個可能沒載到，
// 這時只少那一塊，App 其他部分照常能用，並在主控台記下是哪個沒載到。
function part(fnName, ...args) {
  const fn = window[fnName];
  if (typeof fn === "function") return fn(...args);
  console.error("[BibleTrail] 這個功能的檔案沒載入：" + fnName);
  return null;
}
function textBlock(s) { return s.split("\n").map((line) => el("p", null, line)); }
function fmtDate(ts) {
  try { return new Date(ts).toLocaleDateString(LOCALE[lang]); } catch { return ""; }
}

// ---------- 存資料（瀏覽器可能不讓存，所以每次都包 try） ----------
let storageOk = true;
function loadLang() {
  try { const v = localStorage.getItem(LANG_KEY); if (LANGS.includes(v)) return v; } catch {}
  // 第一次打開：照手機語言挑；簡體地區（中國、新加坡、zh-Hans）用簡體，其他中文用繁體
  const nav = (navigator.language || "").toLowerCase();
  if (nav.startsWith("zh")) return /hans|cn|sg|my/.test(nav) ? "zhs" : "zh";
  if (/^(nb|nn|no)\b/.test(nav)) return "no";  // 挪威文的瀏覽器代碼是 nb／nn
  const two = nav.slice(0, 2);
  return LANGS.includes(two) ? two : "en";
}
function emptyState() { return { stamps: {}, stars: {}, notes: {} }; }
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? sanitize(JSON.parse(raw)) || emptyState() : emptyState();
  } catch (e) {
    storageOk = false;
    console.warn("[BibleTrail] 讀不到進度", e);
    return emptyState();
  }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); storageOk = true; }
  catch (e) { storageOk = false; console.warn("[BibleTrail] 存不了進度", e); }
}
// 外部資料（備份檔、舊資料）進來先檢查：只留認得的地點、正確的格式
function sanitize(obj) {
  if (!obj || typeof obj !== "object") return null;
  const out = emptyState();
  const stamps = obj.stamps && typeof obj.stamps === "object" ? obj.stamps : {};
  const stars = obj.stars && typeof obj.stars === "object" ? obj.stars : {};
  const notes = obj.notes && typeof obj.notes === "object" ? obj.notes : {};
  for (const id of Object.keys(STATIONS)) {
    const s = stamps[id];
    if (s && typeof s === "object" && Number.isFinite(s.t)) out.stamps[id] = { t: s.t, manual: s.manual === true };
    if (stars[id] === true) out.stars[id] = true;
    const n = typeof notes[id] === "string" ? (typeof cleanNote === "function" ? cleanNote(notes[id]) : notes[id].trim().slice(0, 1500)) : "";
    if (n) out.notes[id] = n;
  }
  return out;
}
let state = loadState();

// ---------- 進度計算 ----------
const stationIds = () => Object.keys(STATIONS);
const stampCount = () => Object.keys(state.stamps).length;
const starCount = () => Object.keys(state.stars).length;
function rankFor(n) {
  let r = TITLES[0];
  for (const x of TITLES) if (x.all ? mainStationIds().every((id) => state.stamps[id]) : n >= x.min) r = x;
  return r;
}
const introVars = () => ({ c: mainChapters().length, n: mainStationIds().length });
function chapterStatus(ch) {
  const passed = ch.required.every((id) => state.stamps[id]);
  const gold = passed && ch.bonus.every((id) => state.stamps[id]);
  const all = ch.required.concat(ch.bonus);
  return { passed, gold, done: all.filter((id) => state.stamps[id]).length, total: all.length };
}
// 主線＝不是支線的章節；破關證書、最高稱號只算主線
const mainChapters = () => CHAPTERS.filter((c) => !c.side);
const mainStationIds = () => mainChapters().flatMap((c) => c.required.concat(c.bonus));
const chapterLabel = (ch) => (ch.side ? t("sideChapter") : t("chapter", { n: ch.no }));
function chapterOf(id) { return CHAPTERS.find((c) => c.required.includes(id) || c.bonus.includes(id)); }
function isRequired(id) { return CHAPTERS.some((c) => c.required.includes(id)); }

// ---------- 蓋章 ----------
function distanceM(lat1, lng1, lat2, lng2) {
  const R = 6371000, rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function getPosition() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject({ code: "none" });
    navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 20000, maximumAge: 30000 });
  });
}
function stamp(id, manual) {
  const ch = chapterOf(id);
  const before = ch ? chapterStatus(ch) : null;
  const rankBefore = rankFor(stampCount());
  state.stamps[id] = { t: Date.now(), manual: !!manual };
  saveState();
  const msgs = [t("stampToast", { s: pick(STATIONS[id].name) })];
  if (ch) {
    const after = chapterStatus(ch);
    if (after.passed && !before.passed) msgs.push(t("chapterPassed", { c: chapterLabel(ch), b: ch.badge }));
    if (after.gold && !before.gold) msgs.push(t("chapterGold", { c: chapterLabel(ch) }));
  }
  const rankAfter = rankFor(stampCount());
  if (rankAfter !== rankBefore) msgs.push(t("newRank", { r: pick(rankAfter) }));
  toast(msgs.join("\n"));
  refresh();
}

// ---------- 畫面：上方稱號 ----------
function renderTop() {
  document.documentElement.lang = LANG_INFO[lang].html;
  document.documentElement.dir = LANG_INFO[lang].rtl ? "rtl" : "ltr";
  document.getElementById("langSel").value = lang;
  document.querySelectorAll("[data-t]").forEach((n) => { n.textContent = t(n.dataset.t); });
  document.getElementById("rank").textContent = t("rankPrefix") + pick(rankFor(stampCount())) + " · " + t("stampsOf", { a: stampCount(), b: stationIds().length });
}

// ---------- 畫面：關卡 ----------
function stopRow(id) {
  const s = STATIONS[id], done = !!state.stamps[id];
  return el("li", null,
    el("span", { class: "dot" + (done ? " done" : ""), "aria-label": done ? t("stamped") : "" }, done ? "✓" : ""),
    el("button", { class: "link", type: "button", onclick: () => openStation(id) }, pick(s.name)),
    state.stars[id] ? el("span", { "aria-label": "star" }, "⭐") : null,
    el("span", { class: "tag" + (isRequired(id) ? " req" : "") }, isRequired(id) ? t("required") : s.hidden ? "🔒 " + t("hiddenTag") : t("bonus"))
  );
}
function renderChapters() {
  const v = document.getElementById("view-chapters");
  v.replaceChildren();
  if (!introSeen) v.append(introBox());
  v.append(homeCard());
  if (window.ITINERARIES) v.append(tripsCard());
  if (!storageOk) v.append(el("div", { class: "notice" }, t("storageOff")));
  for (const ch of CHAPTERS) {
    const st = chapterStatus(ch);
    v.append(el("article", { class: "card" + (ch.side ? " side" : "") },
      el("div", { class: "chapter-head" },
        el("div", { class: "badge" + (st.gold ? " gold" : st.passed ? " earned" : ""), "aria-hidden": "true" }, ch.badge),
        el("div", null,
          el("div", { class: "no" }, chapterLabel(ch)),
          el("h2", null, pick(ch.title)),
          el("div", { class: "muted" }, st.gold ? t("goldDone") : st.passed ? t("passed") : t("notPassed"))
        )
      ),
      el("p", null, pick(ch.intro)),
      ch.side ? el("p", { class: "muted" }, t("sideNote")) : null,
      el("div", { class: "progress", role: "progressbar", "aria-valuenow": st.done, "aria-valuemax": st.total },
        el("i", { style: `width:${Math.round((st.done / st.total) * 100)}%` })),
      el("ul", { class: "stop-list" }, ch.required.map(stopRow), ch.bonus.map(stopRow)),
      ch.food ? foodBox(ch.food) : null
    ));
  }
}

// 每章的「聖經餐桌」：這一章可以吃到的聖經食物
function verseQuote(ref) {
  const v = verseOf(ref);
  return v ? el("blockquote", { class: "verse" }, v.text, el("cite", null, v.ref)) : null;
}
function foodBox(food) {
  return el("div", { class: "food" },
    el("h3", null, t("foodTitle")),
    el("p", null, el("b", null, pick(food.dish))),
    el("p", null, pick(food.text)),
    food.verses.map(verseQuote));
}

// 「在家先拿」：隱藏關卡不用到現場，放在關卡分頁最上面，讓人出發前就有進度
function homeCard() {
  const ids = stationIds().filter((id) => STATIONS[id].hidden);
  const done = ids.filter((id) => state.stamps[id]).length;
  return el("div", { class: "card home" },
    el("h2", null, t("homeTitle", { n: ids.length })),
    el("p", { class: "muted" }, t("homeHelp", { n: ids.length })),
    el("p", null, el("b", null, t("homeProgress", { a: done, b: ids.length }))),
    el("div", { class: "row" }, ids.map((id) => el("button", { class: "trip-stop" + (state.stamps[id] ? " done" : ""), type: "button", onclick: () => openStation(id) },
      (state.stamps[id] ? "✓ " : "🔒 ") + pick(STATIONS[id].name).split("（")[0].split(" (")[0]))));
}

// 現成行程（trips.js）：每個行程收合起來，點開才看每天的安排
function tripsCard() {
  const stopLink = (id) => el("button", { class: "trip-stop" + (state.stamps[id] ? " done" : ""), type: "button", onclick: () => openStation(id) },
    (state.stamps[id] ? "✓ " : "") + pick(STATIONS[id].name).split("（")[0].split(" (")[0]);
  return el("div", { class: "card trips" },
    el("h2", null, t("tripsTitle")),
    el("p", { class: "muted" }, t("tripsHelp")),
    ITINERARIES.map((it) => el("details", { class: "trip" },
      el("summary", null, pick(it.title)),
      el("p", null, pick(it.intro)),
      el("ol", { class: "trip-days" }, it.days.map((d, i) => el("li", null,
        el("b", null, t("tripDay", { n: i + 1 })),
        el("div", { class: "row" }, d.stops.map(stopLink)),
        el("p", null, pick(d.note)),
        el("p", { class: "muted" }, t("tripSleep") + pick(d.sleep))))))));
}

// ---------- 畫面：護照 ----------
function renderPassport() {
  const v = document.getElementById("view-passport");
  const r = rankFor(stampCount());
  v.replaceChildren(
    el("div", { class: "card" },
      el("h2", null, pick(r)),
      el("p", { class: "muted" }, t("stampsOf", { a: stampCount(), b: stationIds().length }), " · ", t("starsOf", { a: starCount(), b: stationIds().length })),
      el("div", { class: "progress" }, el("i", { style: `width:${Math.round((stampCount() / stationIds().length) * 100)}%` }))
    ),
    part("certCard"),
    part("journalCard"),
    el("div", { class: "card" },
      el("h3", null, t("myBadges")),
      el("div", { class: "row" }, CHAPTERS.map((ch) => {
        const st = chapterStatus(ch);
        return el("div", { class: "row" },
          el("div", { class: "badge" + (st.gold ? " gold" : st.passed ? " earned" : "") }, ch.badge),
          el("div", null, el("b", null, chapterLabel(ch)), el("div", { class: "muted" }, pick(ch.title))));
      }))
    ),
    el("div", { class: "card" },
      el("h3", null, t("myStamps")),
      el("div", { class: "stamps" }, stationIds().map((id) => {
        const s = state.stamps[id];
        return el("button", { class: "stamp" + (s ? " done" : ""), type: "button", onclick: () => openStation(id) },
          el("span", null, pick(STATIONS[id].name).split("（")[0].split(" (")[0],
            s ? el("small", null, fmtDate(s.t) + (s.manual ? t("manualMark") : "")) : null));
      }))
    ),
    el("div", { class: "card" },
      el("h3", null, t("backup")),
      el("p", { class: "muted" }, t("backupHelp")),
      storageOk ? null : el("p", { class: "warn" }, t("storageOff")),
      el("div", { class: "row" },
        el("button", { class: "btn small", type: "button", onclick: exportProgress }, t("exportBtn")),
        el("label", { class: "btn small ghost" }, t("importBtn"),
          el("input", { type: "file", accept: "application/json,.json", hidden: true, onchange: importProgress })))
    )
  );
}
function exportProgress() {
  const blob = new Blob([JSON.stringify({ app: "jordan-bible-trail", version: 1, ...state }, null, 1)], { type: "application/json" });
  const a = el("a", { href: URL.createObjectURL(blob), download: `bible-trail-backup-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
function importProgress(ev) {
  const file = ev.target.files && ev.target.files[0];
  ev.target.value = "";
  if (!file) return;
  // 日記會讓備份檔變大：71 站 × 每站最多 1500 字，留足空間
  if (file.size > 1000000) return toast(t("importBad"));
  file.text().then((txt) => {
    let data;
    try { data = JSON.parse(txt); } catch { data = null; }
    const clean = data && data.app === "jordan-bible-trail" ? sanitize(data) : null;
    if (!clean) return toast(t("importBad"));
    // 合併：兩邊都有的印章，留比較早的那一次
    for (const [id, s] of Object.entries(clean.stamps)) {
      if (!state.stamps[id] || s.t < state.stamps[id].t) state.stamps[id] = s;
    }
    Object.assign(state.stars, clean.stars);
    // 日記：手機上已經有的不蓋掉，只補上沒有的
    for (const [id, n] of Object.entries(clean.notes)) if (!state.notes[id]) state.notes[id] = n;
    saveState();
    toast(t("importOk", { n: stampCount() }));
    refresh();
  }).catch((e) => { console.warn("[BibleTrail] 匯入失敗", e); toast(t("importBad")); });
}

// ---------- 畫面：說明 ----------
function renderAbout() {
  const v = document.getElementById("view-about");
  const link = (href, text) => el("a", { href, target: "_blank", rel: "noopener" }, text);
  v.replaceChildren(
    el("div", { class: "card" }, el("h2", null, t("introTitle")), textBlock(t("introBody", introVars()))),
    el("div", { class: "card" },
      el("h2", null, tri({ zh: "可信度標記", en: "Certainty Labels", pt: "Grau de Certeza" })),
      el("ul", { class: "legend" }, ["certYes", "certLikely", "certTradition", "certArea", "certUnknown"].map((k) => el("li", null, t(k)))),
      el("p", { class: "muted" }, tri({
        zh: "聖經地點有的經過考古證實，有的是一千多年來信徒世代紀念的「傳統說法」。我們老實標出來，讓你自己判斷。",
        en: "Some biblical sites are confirmed by archaeology; others are 'traditional sites' that believers have honored for over a thousand years. We label them honestly so you can judge for yourself.",
        pt: "Alguns lugares bíblicos foram confirmados pela arqueologia; outros são \"locais tradicionais\", lembrados pelos cristãos há mais de mil anos. Indicamos isso com honestidade para que você mesmo possa avaliar."
      }))
    ),
    el("div", { class: "card" },
      el("h2", null, tri({ zh: "加到手機主畫面", en: "Add to Your Home Screen", pt: "Adicionar à Tela Inicial" })),
      el("p", null, tri({ zh: "不用安裝也能用。想要像 App 一樣有圖示：", en: "No install needed. For an app-like icon:", pt: "Não precisa instalar. Para ter um ícone como de aplicativo:" })),
      el("ul", null,
        el("li", null, tri({ zh: "iPhone（Safari）：點分享按鈕 → 加入主畫面", en: "iPhone (Safari): tap Share → Add to Home Screen", pt: "iPhone (Safari): toque em Compartilhar → Adicionar à Tela de Início" })),
        el("li", null, tri({ zh: "Android（Chrome）：點右上角 ⋮ → 加到主畫面", en: "Android (Chrome): tap ⋮ → Add to Home screen", pt: "Android (Chrome): toque em ⋮ → Adicionar à tela inicial" })))
    ),
    el("div", { class: "card" },
      el("h2", null, tri({ zh: "隱私", en: "Privacy", pt: "Privacidade" })),
      el("p", null, tri({
        zh: "這個 App 不需要帳號、不收集個人資料。蓋章時的位置只在你的手機上比對，進度只存在你的手機裡。",
        en: "No account, no personal data collected. Your location is only compared on your phone during check-in, and progress stays on your phone.",
        pt: "Sem conta e sem coleta de dados pessoais. Sua localização só é comparada no seu celular durante o check-in, e o progresso fica no seu celular."
      }))
    ),
    el("div", { class: "card" },
      el("h2", null, tri({ zh: "資料來源與授權", en: "Sources & Credits", pt: "Fontes e Créditos" })),
      el("ul", { class: "muted" },
        el("li", null, tri({ zh: "經文：《和合本》、World English Bible（皆為公共領域）", en: "Scripture: Chinese Union Version and World English Bible (both public domain)", pt: "Bíblia em chinês e inglês: Chinese Union Version e World English Bible (domínio público)" })),
        el("li", null, tri({ zh: "葡萄牙文經文：", en: "Portuguese scripture: ", pt: "Bíblia em português: " }), link("https://www.biblialivre.com.br/", "Bíblia Livre"), " (CC BY 3.0 BR)"),
        // 其他 7 種語言：顯示這個語言用的譯本（名稱寫在語言包裡，由 build_langpacks.js 產生）
        LANGPACK[lang] && LANGPACK[lang].bible ? el("li", null, tri({ zh: "這個語言的經文：", en: "Scripture in this language: ", pt: "Bíblia neste idioma: " }), LANGPACK[lang].bible) : null,
        el("li", null, tri({ zh: "地點與座標：", en: "Places & coordinates: ", pt: "Lugares e coordenadas: " }), link("https://www.openbible.info/geo/", "OpenBible.info"), " (CC BY 4.0)"),
        el("li", null, tri({ zh: "地圖：", en: "Map: ", pt: "Mapa: " }), "© ", link("https://www.openstreetmap.org/copyright", "OpenStreetMap"), tri({ zh: " 貢獻者", en: " contributors", pt: " colaboradores" })),
        el("li", null, tri({ zh: "照片：Wikimedia Commons，作者與授權標在每張照片下方", en: "Photos: Wikimedia Commons; author and license under each photo", pt: "Fotos: Wikimedia Commons; autor e licença abaixo de cada foto" }))
      ),
      el("p", { class: "muted" }, "Benson and Esther · 2026")
    )
  );
}

// ---------- 地點詳細頁 ----------
const CERT = { yes: "certYes", likely: "certLikely", tradition: "certTradition", area: "certArea", unknown: "certUnknown" };
function openStation(id) {
  const s = STATIONS[id];
  const sheet = document.getElementById("sheet");
  const photo = s.photo && PHOTOS[s.photo];
  const ch = chapterOf(id);
  sheet.replaceChildren(
    el("div", { class: "sheet-top" },
      el("button", { class: "close", type: "button", onclick: closeStation }, t("close")),
      el("span", { class: "muted" }, ch ? chapterLabel(ch) + " · " + pick(ch.title) : "")),
    el("div", { class: "sheet-body" },
      photo
        ? el("figure", { class: "hero" },
            el("img", { src: photo.src, alt: pick(s.name), loading: "lazy" }),
            el("figcaption", null, t("photoBy"), el("a", { href: photo.page, target: "_blank", rel: "noopener" }, photo.artist), " · " + photo.license))
        : el("div", { class: "hero placeholder", "aria-hidden": "true" }, ch ? ch.badge : "✦"),
      el("h2", null, pick(s.name)),
      el("div", { class: "muted" }, pick(s.place)),
      el("div", null,
        el("span", { class: "cert" }, t(CERT[s.certainty])),
        el("span", { class: "cert" }, isRequired(id) ? t("required") : t("bonus")),
        s.approx ? el("span", { class: "cert" }, t("approx")) : null,
        s.noFacilities ? el("span", { class: "cert warn" }, t("noFacilities")) : null),
      s.hidden ? null : el("div", { class: "row", style: "margin-top:10px" }, navButton(id, "btn small ghost")),
      checkinCard(id),
      el("div", { class: "card" }, el("h3", null, t("scripture")), s.verses.map(verseQuote)),
      el("div", { class: "card" }, el("h3", null, t("story")), el("p", null, pick(s.story))),
      el("div", { class: "card" }, el("h3", null, t("reflect")), el("p", null, pick(s.reflect)), part("noteBox", id)),
      el("div", { class: "card" }, el("h3", null, t("mission")), el("p", null, pick(s.mission))),
      quizCard(id),
      el("div", { class: "card" }, el("h3", null, t("howto")), el("p", null, pick(s.howto)),
        navButton(id, "btn"),
        s.approx && !(window.NAV && NAV[id]) ? el("p", { class: "muted", style: "margin-top:8px" }, t("navApprox")) : null)
    )
  );
  sheet.hidden = false;
  sheet.scrollTop = 0;
  sheet.dataset.id = id;
}
function closeStation() {
  const sheet = document.getElementById("sheet");
  sheet.hidden = true;
  delete sheet.dataset.id;
}
function checkinCard(id) {
  const s = state.stamps[id];
  const box = el("div", { class: "card checkin" }, el("h3", null, t("checkinTitle")));
  if (s) {
    box.append(el("div", { class: "big" }, "🛂"), el("p", null, el("b", null, t("stamped")), " · ", t("stampedOn", { d: fmtDate(s.t) }), s.manual ? t("manualMark") : ""));
    return box;
  }
  // 隱藏關卡沒有座標，靠答對問答解鎖（見 quizCard）
  if (STATIONS[id].hidden) {
    box.append(el("p", null, t("hiddenHelp")));
    return box;
  }
  const msg = el("p", { class: "muted" }, t("checkinHelp"));
  const manualArea = el("div");
  const btn = el("button", { class: "btn", type: "button" }, t("checkinBtn"));
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    msg.textContent = t("checking");
    try {
      const pos = await getPosition();
      const st = STATIONS[id];
      // 一站可能有好幾個蓋章點（例如一整條河），取最近的那一個
      const spots = [{ lat: st.lat, lng: st.lng }].concat(st.points || []);
      const d = Math.min(...spots.map((p) => distanceM(pos.coords.latitude, pos.coords.longitude, p.lat, p.lng)));
      // GPS 本身有誤差，所以把誤差（最多 300 公尺）也算進範圍裡
      const slack = Math.min(pos.coords.accuracy || 0, 300);
      if (d <= st.radius + slack) return stamp(id, false);
      msg.textContent = t("tooFar", { km: (d / 1000).toFixed(d < 10000 ? 1 : 0) });
    } catch (e) {
      console.warn("[BibleTrail] 定位失敗", e);
      msg.textContent = e && e.code === 1 ? t("geoDenied") : e && e.code === "none" ? t("noGeo") : t("geoFail");
    }
    btn.disabled = false;
    showManual(manualArea, id);
  });
  box.append(msg, btn, manualArea);
  return box;
}
// GPS 失敗或不準時才出現的手動蓋章（兩步確認，避免誤按）
function showManual(area, id) {
  if (area.childElementCount) return;
  const step2 = el("div", { class: "row", hidden: true, style: "justify-content:center;margin-top:8px" },
    el("span", { class: "muted" }, t("manualConfirm")),
    el("button", { class: "btn small", type: "button", onclick: () => stamp(id, true) }, t("confirm")),
    el("button", { class: "btn small ghost", type: "button", onclick: () => { step2.hidden = true; } }, t("cancel")));
  area.append(
    el("p", { class: "muted", style: "margin-top:14px" }, t("manualHint")),
    el("button", { class: "btn small ghost", type: "button", onclick: () => { step2.hidden = false; } }, t("manualBtn")),
    step2);
}
function quizCard(id) {
  const q = STATIONS[id].quiz;
  const box = el("div", { class: "card" }, el("h3", null, t("quiz")), el("p", null, el("b", null, pick(q.q))));
  const feedback = el("p", { role: "status" });
  const solved = !!state.stars[id];
  q.options.forEach((opt, i) => {
    const b = el("button", { class: "quiz-opt" + (solved && i === q.answer ? " right" : ""), type: "button", disabled: solved }, pick(opt));
    b.addEventListener("click", () => {
      if (i === q.answer) {
        b.classList.add("right");
        box.querySelectorAll(".quiz-opt").forEach((x) => { x.disabled = true; });
        feedback.textContent = t("rightAns");
        if (!state.stars[id]) { state.stars[id] = true; saveState(); }
        // 隱藏關卡：答對就蓋章（stamp 會重畫整頁）；一般關卡只更新列表
        if (STATIONS[id].hidden && !state.stamps[id]) stamp(id, false);
        else refreshLists();
      } else {
        b.classList.add("wrong");
        feedback.textContent = t("wrongAns");
      }
    });
    box.append(b);
  });
  if (solved) feedback.textContent = t("quizDone");
  box.append(feedback);
  return box;
}

// ---------- 地圖 ----------
let map = null, markers = {}, meMarker = null;
function initMap() {
  if (typeof L === "undefined") { document.getElementById("mapOffline").hidden = false; return; }
  map = L.map("map", { zoomControl: true }).setView([31.78, 35.68], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
  const bounds = [];
  for (const id of stationIds()) {
    const s = STATIONS[id];
    if (s.hidden) continue;
    bounds.push([s.lat, s.lng]);
    markers[id] = L.marker([s.lat, s.lng], { icon: pinIcon(id), title: pick(s.name) }).addTo(map);
    markers[id].bindPopup(() => popupFor(id));
  }
  map.fitBounds(bounds, { padding: [30, 30] });
}
function pinIcon(id) {
  const ch = chapterOf(id);
  const cls = "pin" + (state.stamps[id] ? " done" : isRequired(id) ? " req" : "");
  const label = state.stamps[id] ? "✓" : ch ? (ch.side ? "+" : String(ch.no)) : "";
  return L.divIcon({ className: "", html: `<div class="${cls}"><span>${label}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] });
}
// Google 地圖導航網址（手機上會直接打開 Google 地圖 App 並開始規劃開車路線）
function navUrl(id) {
  const s = STATIONS[id];
  if (s.hidden) return null;
  const dest = (window.NAV && NAV[id]) || `${s.lat},${s.lng}`;
  return "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + encodeURIComponent(dest);
}
function navButton(id, cls) {
  const url = navUrl(id);
  return url ? el("a", { class: cls, href: url, target: "_blank", rel: "noopener" }, t("navBtn")) : null;
}
function popupFor(id) {
  const s = STATIONS[id];
  return el("div", null,
    el("b", null, pick(s.name)), el("br"),
    el("span", { class: "muted" }, t(CERT[s.certainty])), el("br"),
    el("div", { class: "row popup-btn" },
      el("button", { class: "btn small", type: "button", onclick: () => openStation(id) }, t("open")),
      navButton(id, "btn small ghost")));
}
function refreshMap() {
  if (!map) return;
  for (const id of Object.keys(markers)) {
    markers[id].setIcon(pinIcon(id));
    markers[id].options.title = pick(STATIONS[id].name);
  }
}
async function showMe() {
  if (!map) return;
  toast(t("locating"));
  try {
    const pos = await getPosition();
    const ll = [pos.coords.latitude, pos.coords.longitude];
    if (meMarker) meMarker.remove();
    meMarker = L.circleMarker(ll, { radius: 8, color: "#fff", weight: 2, fillColor: "#2f6f86", fillOpacity: 1 }).addTo(map).bindPopup(t("youAreHere"));
    map.setView(ll, Math.max(map.getZoom(), 11));
  } catch (e) {
    console.warn("[BibleTrail] 定位失敗", e);
    toast(e && e.code === 1 ? t("geoDenied") : e && e.code === "none" ? t("noGeo") : t("geoFail"));
  }
}

// ---------- 提示訊息 ----------
let toastTimer = null;
function toast(msg) {
  const n = document.getElementById("toast");
  n.replaceChildren(...msg.split("\n").map((line) => el("div", null, line)));
  n.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { n.hidden = true; }, msg.includes("\n") ? 6000 : 3500);
}

// ---------- 第一次打開的說明（先講清楚 App 會怎麼運作） ----------
let introSeen = false;
try { introSeen = localStorage.getItem(INTRO_KEY) === "1"; } catch {}
function introBox() {
  return el("div", { class: "notice" }, el("p", null, el("b", null, t("introTitle"))), textBlock(t("introBody", introVars())),
    el("button", { class: "btn small", type: "button", onclick: (e) => {
      introSeen = true;
      try { localStorage.setItem(INTRO_KEY, "1"); } catch {}
      e.target.closest(".notice").remove();
    } }, t("gotIt")));
}

// ---------- 切換分頁、語言 ----------
function switchView(name) {
  document.querySelectorAll(".tabs button").forEach((b) => b.classList.toggle("on", b.dataset.view === name));
  document.querySelectorAll(".view").forEach((v) => { v.hidden = v.id !== "view-" + name; });
  if (name === "map" && map) setTimeout(() => map.invalidateSize(), 50);
}
function refreshLists() {
  renderTop();
  renderPassport();
  renderAbout();
  renderChapters();
}
function refresh() {
  refreshLists();
  refreshMap();
  const sheet = document.getElementById("sheet");
  if (!sheet.hidden && sheet.dataset.id) {
    const y = sheet.scrollTop;
    openStation(sheet.dataset.id);
    sheet.scrollTop = y;
  }
}
document.getElementById("langSel").addEventListener("change", (e) => {
  if (!LANGS.includes(e.target.value)) return;
  const next = e.target.value;
  try { localStorage.setItem(LANG_KEY, next); } catch {}
  loadPack(next).then(() => { lang = next; refresh(); });
});
document.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => switchView(b.dataset.view)));
document.getElementById("locateBtn").addEventListener("click", showMe);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeStation(); });

// ---------- 啟動 ----------
initMap();
// 語言包要先載好再畫畫面，不然會先閃一下英文
loadPack(lang).then(refresh);
if (!introSeen) switchView("chapters");
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch((e) => console.warn("[BibleTrail] 離線功能沒開成", e));
}
