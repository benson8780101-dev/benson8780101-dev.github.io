// 約旦聖經足跡：試玩版內容（第 1～8 章）
// 每一段文字都有 zh（繁體中文）和 en（英文），兩種語言一定要一起改。
// 座標來源：OpenBible.info 聖經地理資料庫（CC BY 4.0）；標「approx: true」的是大約位置，待實地確認。
// certainty：yes＝學者大多同意｜likely＝可能｜tradition＝傳統說法｜area＝一整個區域｜unknown＝位置不確定
// hidden: true＝隱藏關卡：位置不確定，不用到現場，答對問答就解鎖印章（沒有座標、地圖上不顯示）
// points：同一站有好幾個可以蓋章的地點（例如一整條河），任何一個點的範圍內都算到了

window.CHAPTERS = [
  {
    id: "ch1",
    no: 1,
    title: { zh: "基列山地", en: "The Hills of Gilead" },
    intro: {
      zh: "約旦北部長滿橡樹和橄欖樹的山地，就是聖經裡的「基列」，以出產乳香聞名。先知以利亞從這裡出來；大衛在這裡為兒子痛哭；耶穌在這一帶的低加坡里城市行過神蹟。",
      en: "The oak- and olive-covered hills of northern Jordan are the biblical 'Gilead,' famous for its balm. The prophet Elijah came from here; David wept for his son here; and Jesus worked miracles around the Decapolis cities of this region."
    },
    badge: "🌳",
    required: ["gadara", "gerasa", "tishbe"],
    bonus: ["irbid", "ramoth", "jabesh", "cherith", "ephraimforest"]
  },
  {
    id: "ch2",
    no: 2,
    title: { zh: "雅各回家路", en: "Jacob's Road Home" },
    intro: {
      zh: "雅各離家二十年，帶著全家回鄉，心裡卻很怕見到被他騙過的哥哥以掃。就在約旦河東這段路上，他遇見天使、跟神摔跤了一整夜，最後和哥哥抱頭痛哭。",
      en: "After twenty years away, Jacob headed home with his whole family, dreading a meeting with Esau, the brother he had cheated. On this stretch east of the Jordan he met angels, wrestled with God all night, and finally wept in his brother's arms."
    },
    badge: "🤼",
    required: ["jabbok", "succoth"],
    bonus: ["penuel", "mahanaim", "mizpahgilead"]
  },
  {
    id: "ch3",
    no: 3,
    title: { zh: "亞捫人的京城", en: "The Ammonite Capital" },
    intro: {
      zh: "今天的安曼，就是聖經裡亞捫人的京城拉巴。大衛的軍隊圍攻過這裡；後來它改名非拉鐵非，成為低加坡里的城市之一。",
      en: "Today's Amman is Rabbah, the capital of the Ammonites in the Bible. David's army besieged it; later it was renamed Philadelphia and became one of the cities of the Decapolis."
    },
    badge: "🏰",
    required: ["citadel"],
    bonus: ["theatre", "raselain", "jubeiha", "abelkeramim"]
  },
  {
    id: "ch4",
    no: 4,
    title: { zh: "約旦河邊", en: "By the Jordan" },
    intro: {
      zh: "以色列人從這裡過河進入應許之地；以利亞從這裡被接升天；一千多年後，耶穌在這裡受洗。",
      en: "Israel crossed into the Promised Land here; Elijah was taken up to heaven here; over a thousand years later, Jesus was baptized here."
    },
    badge: "🌊",
    required: ["bethany", "elijah"],
    bonus: ["shittim", "moab"]
  },
  {
    id: "ch5",
    no: 5,
    title: { zh: "摩西的最後一眼", en: "Moses' Last View" },
    intro: {
      zh: "四十年曠野路走到盡頭。摩西站在尼波山上，遠望一輩子盼望、卻不能進去的應許之地。",
      en: "Forty years in the wilderness come to an end. From Mount Nebo, Moses looks out over the land he longed for but would not enter."
    },
    badge: "⛰️",
    required: ["nebo", "madaba"],
    bonus: ["heshbon", "peor", "elealeh", "maein"]
  },
  {
    id: "ch6",
    no: 6,
    title: { zh: "施洗約翰與摩押王", en: "John the Baptist and the King of Moab" },
    intro: {
      zh: "過了尼波山往南，就進入古時候的摩押。施洗約翰在這裡的山頂堡壘被斬首；摩押王米沙在這裡刻下一塊石碑，三千年後被挖出來，跟列王紀的記載互相印證。",
      en: "South of Mount Nebo lies ancient Moab. Here John the Baptist was beheaded in a hilltop fortress, and King Mesha of Moab carved a stone that, unearthed three thousand years later, echoes the account in Kings."
    },
    badge: "🪨",
    required: ["machaerus", "dibon"],
    bonus: ["mephaath", "aroer", "arnon", "callirrhoe", "ataroth", "jahaz"]
  },
  {
    id: "ch7",
    no: 7,
    title: { zh: "路得的故鄉", en: "Ruth's Homeland" },
    intro: {
      zh: "過了亞嫩河谷，就是摩押人的老家：卡拉克一帶的高原。路得從這裡跟著婆婆回到伯利恆，成了大衛王的曾祖母；往西下到死海南端，則是羅得逃離所多瑪的地方，摩押人的故事就是從那裡開始的。",
      en: "Beyond the Arnon canyon lies the heartland of Moab: the high plateau around Kerak. From here Ruth followed her mother-in-law to Bethlehem and became King David's great-grandmother. Down to the west, at the south end of the Dead Sea, is where Lot fled from Sodom, and where the story of the Moabites began."
    },
    badge: "🌾",
    required: ["kerak"],
    bonus: ["ruthmoab", "ar", "lotcave", "zoar", "sodom"]
  },
  {
    id: "ch8",
    no: 8,
    title: { zh: "以東之地", en: "The Land of Edom" },
    intro: {
      zh: "過了撒烈溪，就進入以掃的後代以東人的地。以東的意思是「紅」，這一帶的山也真的是紅色的。以色列人在這裡結束了三十八年的曠野漂流，也在這條路上仰望摩西舉起的銅蛇。",
      en: "Beyond the Brook Zered lies the land of Esau's descendants, the Edomites. Edom means 'red,' and the mountains here really are red. Here Israel's thirty-eight years of wandering came to an end, and along this road they looked up at the bronze serpent Moses lifted high."
    },
    badge: "🐍",
    required: ["zered", "bozrah"],
    bonus: ["tophel", "sela", "punon", "teman"]
  }
];

window.STATIONS = {
  gadara: {
    name: { zh: "加大拉（烏姆蓋斯）", en: "Gadara (Umm Qais)" },
    place: { zh: "Umm Qais 考古遺址，俯瞰加利利海", en: "Umm Qais archaeological site, overlooking the Sea of Galilee" },
    lat: 32.655998, lng: 35.679352, radius: 1000,
    certainty: "yes",
    verses: ["Matt 8:28", "Matt 8:32"],
    story: {
      zh: "耶穌渡過加利利海，來到「加大拉人的地方」，遇見兩個被鬼附、住在墳墓裡的人，兇猛到沒有人敢從那條路經過。耶穌把鬼趕出來，鬼央求進入一大群豬，那群豬就闖下山崖、投在海裡淹死了。加大拉是低加坡里的城市之一，就是今天的烏姆蓋斯。這座城離湖邊大約 10 公里，所以神蹟比較可能發生在湖邊屬於加大拉的土地上。站在黑色玄武岩劇場旁邊，可以俯瞰整個加利利海和戈蘭高地，那正是耶穌大部分傳道的地方。",
      en: "Jesus crossed the Sea of Galilee to 'the country of the Gadarenes' (some manuscripts and translations, including the World English Bible, read 'Gergesenes') and met two demon-possessed men living among the tombs, so fierce that no one dared pass that way. Jesus drove out the demons; they begged to enter a large herd of pigs, and the herd rushed down the steep bank into the sea and drowned. Gadara was one of the Decapolis cities—today's Umm Qais. The town itself is about 10 km from the lake, so the miracle more likely took place on Gadara's land along the shore. Standing beside the black basalt theatre, you can look out over the whole Sea of Galilee and the Golan Heights—the very region where Jesus did most of his ministry."
    },
    reflect: {
      zh: "那兩個人得醫治以後，城裡的人卻央求耶穌離開，因為他們損失了豬群。有沒有什麼「損失」，讓你不太希望神在你的生活中動工？",
      en: "After the two men were healed, the townspeople begged Jesus to leave—they had lost their pigs. Is there some 'loss' that makes you reluctant to let God work in your life?"
    },
    mission: {
      zh: "🌊 任務：走到西邊的觀景處，拍一張有加利利海的照片。耶穌大部分的神蹟，就發生在你眼前這片湖的周圍。",
      en: "🌊 Mission: Walk to the western viewpoint and take a photo with the Sea of Galilee in it. Most of Jesus' miracles happened around the lake in front of you."
    },
    quiz: {
      q: { zh: "耶穌趕出來的鬼，進入了什麼動物？", en: "What animals did the demons enter when Jesus cast them out?" },
      options: [{ zh: "羊群", en: "A flock of sheep" }, { zh: "豬群", en: "A herd of pigs" }, { zh: "牛群", en: "A herd of cattle" }],
      answer: 1
    },
    howto: {
      zh: "在約旦西北角，從安曼開車約 2 小時，從伊爾比德約 30 分鐘。要買票（約旦通行證 Jordan Pass 可用）。遺址裡有餐廳，可以邊吃邊看湖景。這裡靠近邊境，請帶好護照。",
      en: "In Jordan's northwest corner, about 2 hours' drive from Amman or 30 minutes from Irbid. There's an entrance fee (the Jordan Pass is accepted). A restaurant on site offers lake views with your meal. It's near the border—carry your passport."
    },
    photo: "gadara"
  },

  gerasa: {
    name: { zh: "格拉森（傑拉什）", en: "Gerasa (Jerash)" },
    place: { zh: "傑拉什古城，羅馬時代的低加坡里城市", en: "The ancient city of Jerash, a Roman Decapolis city" },
    lat: 32.272281, lng: 35.891397, radius: 1200,
    certainty: "yes",
    verses: ["Mark 5:1", "Mark 5:19-20"],
    story: {
      zh: "馬可福音和路加福音把趕鬼入豬的地方寫成「格拉森人的地方」。格拉森就是今天的傑拉什，但它離加利利海有五十多公里，所以這個說法大概是指這座大城管轄的廣大地區；幾卷福音書的地名寫法也不太一樣。得醫治的人想跟著耶穌走，耶穌卻叫他回家，把主為他做的大事告訴親友。他就在低加坡里傳揚，眾人都希奇。傑拉什是全世界保存最好的羅馬城市之一：有哈德良拱門、橢圓廣場、柱廊大街，還有十幾座拜占庭教堂，地上留著精美的馬賽克。",
      en: "Mark and Luke call the place of the pig miracle 'the country of the Gerasenes.' Gerasa is today's Jerash, but it lies over fifty kilometers from the Sea of Galilee, so the phrase probably refers to the wide territory this great city controlled; the Gospels also spell the place differently. The healed man wanted to follow Jesus, but Jesus told him to go home and tell his friends what the Lord had done for him. He proclaimed it throughout the Decapolis, and everyone marveled. Jerash is one of the best-preserved Roman cities in the world, with Hadrian's Arch, the Oval Plaza, a colonnaded street, and more than a dozen Byzantine churches with beautiful mosaic floors."
    },
    reflect: {
      zh: "耶穌沒有讓這個人跟著走，而是叫他「回家」去說。對你來說，最需要聽到你故事的，會不會就是你的家人和鄰居？",
      en: "Jesus didn't let the man follow him; he sent him 'home' to tell his story. Could it be that the people who most need to hear your story are your own family and neighbors?"
    },
    mission: {
      zh: "⛪ 任務：找一座拜占庭教堂的馬賽克地板（例如聖葛斯默與達米安教堂），看看上面有哪些動物。這是一千四百多年前的信徒留下的。",
      en: "⛪ Mission: Find a Byzantine church mosaic floor (for example, the Church of Saints Cosmas and Damian) and see which animals appear in it. Believers left these more than 1,400 years ago."
    },
    quiz: {
      q: { zh: "得醫治的人，後來在哪裡傳揚耶穌為他做的事？", en: "Where did the healed man go on to proclaim what Jesus had done for him?" },
      options: [{ zh: "耶路撒冷", en: "Jerusalem" }, { zh: "低加坡里", en: "The Decapolis" }, { zh: "埃及", en: "Egypt" }],
      answer: 1
    },
    howto: {
      zh: "在安曼北邊約 50 公里，開車約 1 小時；安曼北巴士站（Tabarbour）也有巴士。要買票。遺址很大，至少留半天，帶水、帽子，穿好走的鞋。",
      en: "About 50 km north of Amman, roughly an hour's drive; buses also run from Amman's North Bus Station (Tabarbour). There's an entrance fee. The site is huge—allow at least half a day, and bring water, a hat, and comfortable shoes."
    },
    photo: "gerasa"
  },

  tishbe: {
    name: { zh: "提斯比：以利亞的家鄉（Mar Elias）", en: "Tishbe: Elijah's Hometown (Mar Elias)" },
    place: { zh: "阿傑隆附近 Listib 村旁的山頂教堂遺址", en: "Hilltop church ruins beside Listib village, near Ajloun" },
    lat: 32.3658, lng: 35.718, radius: 1500, approx: true,
    certainty: "tradition",
    verses: ["1 Kgs 17:1", "Jas 5:17", "Jer 8:22"],
    story: {
      zh: "列王紀上第 17 章，以利亞突然出現在歷史舞台上，介紹只有一句：「基列寄居的提斯比人以利亞」。他對亞哈王說，這幾年若不是他禱告，必不降露、不下雨。雅各書提醒我們：「以利亞是與我們性情一樣的人」。提斯比確切在哪裡，學者還有不同看法；傳統認為就在阿傑隆附近的 Listib 村，山頂上有一座拜占庭時期的教堂遺跡，叫 Mar Elias（聖以利亞），是約旦的基督教朝聖地之一。滿山的橡樹和橄欖樹，就是聖經裡以乳香聞名的「基列」。",
      en: "In 1 Kings 17, Elijah bursts onto the stage of history with a one-line introduction: 'Elijah the Tishbite, who was one of the settlers of Gilead.' He told King Ahab there would be neither dew nor rain except at his word. James reminds us that 'Elijah was a man with a nature like ours.' Scholars still debate where Tishbe was; tradition places it near the village of Listib by Ajloun, where a hilltop holds the ruins of a Byzantine church called Mar Elias (Saint Elijah), one of Jordan's Christian pilgrimage sites. The surrounding hills of oak and olive are the biblical 'Gilead,' famous for its balm."
    },
    reflect: {
      zh: "以利亞是從鄉下山區出來的普通人，卻敢對國王說真話。你身邊有沒有一件事，需要你勇敢地說出真話？",
      en: "Elijah was an ordinary man from the rural hills, yet he dared to speak the truth to a king. Is there something around you that needs you to speak the truth with courage?"
    },
    mission: {
      zh: "🌳 任務：在山頂找找看教堂地板殘留的馬賽克，再看看四周的山，數數看你認得出幾種樹。",
      en: "🌳 Mission: Look for remnants of the church's mosaic floor on the summit, then look at the hills around you—how many kinds of trees can you identify?"
    },
    quiz: {
      q: { zh: "以利亞對亞哈王說，什麼不會降下？", en: "What did Elijah tell King Ahab would not fall?" },
      options: [{ zh: "火和硫磺", en: "Fire and sulfur" }, { zh: "露和雨", en: "Dew and rain" }, { zh: "嗎哪", en: "Manna" }],
      answer: 1
    },
    howto: {
      zh: "在阿傑隆附近 Listib 村旁的山頂，從安曼開車約 1 個半小時，路上有「Mar Elias」的指標。遺址不大，有停車的地方。可以和阿傑隆城堡排在同一天。山上風大，冬天很冷。（App 用的是大約位置，蓋章範圍設得比較大。）",
      en: "On a hilltop by Listib village near Ajloun, about an hour and a half's drive from Amman; follow signs for 'Mar Elias.' The site is small, with parking. Easy to combine with Ajloun Castle. It's windy up there and cold in winter. (Approximate location, so the check-in range is wide.)"
    },
    photo: null
  },

  irbid: {
    name: { zh: "伯亞比勒（伊爾比德）", en: "Beth-arbel (Irbid)" },
    place: { zh: "伊爾比德市中心的古土丘 Tell Irbid", en: "Tell Irbid, the ancient mound in downtown Irbid" },
    lat: 32.558661, lng: 35.847589, radius: 800,
    certainty: "likely",
    verses: ["Hos 10:14"],
    story: {
      zh: "先知何西阿警告以色列時，提到一件當時大家都知道的慘事：「就如沙勒幔在爭戰的日子拆毀伯‧亞比勒」，連母親和孩子都被摔死。許多學者認為伯亞比勒就是今天伊爾比德市中心的古土丘 Tell Irbid，名字幾乎沒變。今天伊爾比德是約旦北部的大城，也是大學城；土丘上有一棟鄂圖曼時期的老石頭建築，改成了博物館。",
      en: "Warning Israel, the prophet Hosea recalled a disaster everyone knew: 'as Shalman destroyed Beth Arbel in the day of battle,' when even mothers and children were dashed to pieces. Many scholars identify Beth-arbel with Tell Irbid, the ancient mound in downtown Irbid—the name has barely changed. Today Irbid is a major city and university town in northern Jordan, and an old Ottoman-era stone building on the mound has become a museum."
    },
    reflect: {
      zh: "何西阿用一場慘痛的歷史提醒百姓：倚靠自己的力量是靠不住的。你現在最倚靠的是什麼？",
      en: "Hosea used a painful piece of history to remind the people that trusting their own strength would fail them. What are you relying on most right now?"
    },
    mission: {
      zh: "🏛️ 任務：爬上市中心的土丘，找到那棟老石頭建築（Dar As-Saraya 博物館）。你腳下是幾千年來一層一層疊起來的城市。",
      en: "🏛️ Mission: Climb the mound downtown and find the old stone building (Dar As-Saraya Museum). Beneath your feet are cities stacked layer upon layer over thousands of years."
    },
    quiz: {
      q: { zh: "哪一位先知提到伯亞比勒？", en: "Which prophet mentions Beth-arbel?" },
      options: [{ zh: "何西阿", en: "Hosea" }, { zh: "約拿", en: "Jonah" }, { zh: "哈該", en: "Haggai" }],
      answer: 0
    },
    howto: {
      zh: "在伊爾比德市中心，從安曼開車約 1 小時 15 分鐘，安曼北巴士站也有車。博物館開放時間請先向當地確認。",
      en: "In downtown Irbid, about 1 hour 15 minutes' drive from Amman; buses also run from Amman's North Bus Station. Check the museum's opening hours locally before you go."
    },
    photo: "irbid"
  },

  ramoth: {
    name: { zh: "基列的拉末", en: "Ramoth-gilead" },
    place: { zh: "蘭塔（Ramtha）附近的 Tell er-Rumeith", en: "Tell er-Rumeith near Ramtha" },
    lat: 32.499852, lng: 36.014988, radius: 800,
    certainty: "likely",
    noFacilities: true,
    verses: ["Deut 4:43", "1 Kgs 22:34"],
    story: {
      zh: "基列的拉末是約旦河東的重要城市，也是三座「逃城」之一：誤殺人的人可以逃到這裡受保護。亞哈王不聽先知米該雅的警告，喬裝成普通士兵上戰場，結果「有一人隨便開弓」，箭恰巧射進他的甲縫裡，亞哈就死了。後來先知以利沙派一個少年人到這裡，膏耶戶作以色列王。許多學者認為就是今天蘭塔附近的 Tell er-Rumeith，就在敘利亞邊界旁，自古就是邊境要塞。",
      en: "Ramoth-gilead was an important city east of the Jordan and one of the three 'cities of refuge,' where someone who had killed by accident could flee for protection. King Ahab ignored the prophet Micaiah's warning and went into battle disguised as an ordinary soldier—but 'a certain man drew his bow at random' and the arrow struck him between the joints of his armor, and Ahab died. Later the prophet Elisha sent a young man here to anoint Jehu king of Israel. Many scholars identify it with Tell er-Rumeith near Ramtha, right by the Syrian border—a frontier fortress since ancient times."
    },
    reflect: {
      zh: "亞哈以為喬裝就能躲過神的話，一支「隨便」射出的箭卻找到了他。有沒有什麼事，你以為躲得掉，其實需要正面面對？",
      en: "Ahab thought a disguise could dodge God's word, yet an arrow shot 'at random' found him. Is there something you think you can avoid that you actually need to face head-on?"
    },
    mission: {
      zh: "🛡️ 任務：站在土丘上想像古代的逃城：走投無路的人，看到這座城就有了盼望。（請不要靠近邊界管制區。）",
      en: "🛡️ Mission: Stand on the mound and imagine an ancient city of refuge: for someone with nowhere to run, the sight of this city meant hope. (Please stay away from border control zones.)"
    },
    quiz: {
      q: { zh: "亞哈王上戰場時做了什麼？", en: "What did King Ahab do when he went into battle?" },
      options: [{ zh: "穿上王袍", en: "Wore his royal robes" }, { zh: "喬裝改扮", en: "Disguised himself" }, { zh: "留在城裡", en: "Stayed in the city" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 考古土丘，沒有遊客設施，能不能進去還沒確認。在蘭塔附近，靠近敘利亞邊界：請帶護照、遵守軍警指示，不要靠近邊界管制區。",
      en: "⚠️ An archaeological mound with no visitor facilities; access hasn't been confirmed. It's near Ramtha by the Syrian border: carry your passport, follow police and military instructions, and stay away from border control zones."
    },
    photo: null
  },

  jabesh: {
    name: { zh: "基列雅比", en: "Jabesh-gilead" },
    place: { zh: "Wadi al-Yabis 山谷裡的 Tell el-Maqlub", en: "Tell el-Maqlub in the Wadi al-Yabis valley" },
    lat: 32.40237, lng: 35.6823, radius: 1000,
    certainty: "likely",
    noFacilities: true,
    verses: ["1 Sam 31:11-13"],
    story: {
      zh: "亞捫王拿轄圍住基列雅比，開出的投降條件是：剜出城裡每個人的右眼。掃羅聽到後被神的靈感動，連夜出兵救了這座城，這是他作王後的第一場勝仗。多年後，掃羅在基利波山戰死，非利士人把他的屍體釘在伯珊的城牆上。雅比的勇士們沒有忘記當年的恩情，走了一整夜，把掃羅和他兒子們的屍體取回來安葬，又禁食七天。今天這條山谷叫 Wadi al-Yabis，「雅比」的名字還留著；許多學者認為城址就是谷中的 Tell el-Maqlub。",
      en: "King Nahash of Ammon besieged Jabesh-gilead and offered terms of surrender: he would gouge out every citizen's right eye. When Saul heard, the Spirit of God came upon him, and he marched through the night to rescue the city—his first victory as king. Years later Saul fell on Mount Gilboa, and the Philistines fastened his body to the wall of Beth-shan. The valiant men of Jabesh never forgot his kindness: they walked all night, brought back the bodies of Saul and his sons, buried them, and fasted seven days. Today the valley is called Wadi al-Yabis, still carrying the name 'Jabesh'; many scholars identify the town with Tell el-Maqlub in the valley."
    },
    reflect: {
      zh: "雅比人幾十年後還記得掃羅的恩情，冒著生命危險去回報。有沒有一個曾經幫助過你的人，你可以去謝謝他？",
      en: "Decades later, the people of Jabesh still remembered Saul's kindness and risked their lives to repay it. Is there someone who once helped you whom you could thank?"
    },
    mission: {
      zh: "🙏 任務：想一個曾經幫過你的人，今天就傳個訊息謝謝他。",
      en: "🙏 Mission: Think of someone who once helped you, and send them a thank-you message today."
    },
    quiz: {
      q: { zh: "掃羅死後，雅比的勇士做了什麼？", en: "After Saul died, what did the valiant men of Jabesh do?" },
      options: [{ zh: "投降非利士人", en: "Surrendered to the Philistines" }, { zh: "連夜取回並安葬掃羅", en: "Retrieved and buried Saul's body overnight" }, { zh: "逃到亞捫", en: "Fled to Ammon" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 在 Wadi al-Yabis 山谷裡的考古土丘，沒有遊客設施，能不能上去還沒確認。從阿傑隆往約旦河谷的方向。只要人在這附近就能蓋章。",
      en: "⚠️ An archaeological mound in the Wadi al-Yabis valley with no visitor facilities; access hasn't been confirmed. It's on the way from Ajloun down to the Jordan Valley. You can check in anywhere nearby."
    },
    photo: null
  },

  cherith: {
    name: { zh: "基立溪（烏鴉餵以利亞）", en: "The Brook Cherith (Ravens Feed Elijah)" },
    place: { zh: "位置不確定：有人說是 Wadi al-Yabis，也有人說是受洗處旁的 Wadi Kharrar", en: "Location uncertain: Wadi al-Yabis or Wadi Kharrar by the Baptism Site have been suggested" },
    hidden: true,
    certainty: "unknown",
    verses: ["1 Kgs 17:5-6"],
    story: {
      zh: "以利亞對亞哈說完不會下雨，神就叫他躲到約旦河東的基立溪旁。他喝溪裡的水，烏鴉早晚給他叼餅和肉來。過了些日子，因為一直沒有下雨，溪水也乾了，神又帶他往下一個地方去。基立溪確切在哪裡並不確定：有人說是 Wadi al-Yabis，也有人說是受洗處旁的 Wadi Kharrar，所以這是隱藏關卡。",
      en: "After Elijah told Ahab no rain would fall, God sent him to hide by the Brook Cherith, east of the Jordan. He drank from the brook, and ravens brought him bread and meat morning and evening. After a while the brook dried up because there was no rain, and God led him on to his next place. Cherith's exact location is uncertain—Wadi al-Yabis and Wadi Kharrar by the Baptism Site have both been suggested—so this is a hidden level."
    },
    reflect: {
      zh: "溪水乾了，以利亞才往下一個地方去。有沒有一條你曾經依靠的「溪水」乾了，後來才發現是神要帶你往前走？",
      en: "Only when the brook dried up did Elijah move on. Has a 'brook' you relied on ever dried up, and you later realized God was leading you forward?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完列王紀上 17 章，看看溪水乾了以後，神帶以利亞去了哪裡，再回來答題。",
      en: "🔒 Hidden mission: Read 1 Kings 17 to see where God sent Elijah after the brook dried up, then come back for the quiz."
    },
    quiz: {
      q: { zh: "在基立溪旁，誰給以利亞送食物？", en: "By the Brook Cherith, who brought Elijah food?" },
      options: [{ zh: "天使", en: "An angel" }, { zh: "烏鴉", en: "Ravens" }, { zh: "一個寡婦", en: "A widow" }],
      answer: 1
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: null
  },

  ephraimforest: {
    name: { zh: "以法蓮樹林（押沙龍之死）", en: "The Forest of Ephraim (Absalom's Death)" },
    place: { zh: "位置不確定，在約旦河東的基列山地", en: "Location uncertain, in the hills of Gilead east of the Jordan" },
    hidden: true,
    certainty: "unknown",
    verses: ["2 Sam 18:9", "2 Sam 18:33"],
    story: {
      zh: "名字雖然叫以法蓮，這片樹林其實在約旦河東的基列。大衛的兒子押沙龍造反，兩軍在以法蓮樹林決戰，「死於樹林的比死於刀劍的更多」。押沙龍騎著騾子從大橡樹的密枝底下經過，頭髮被樹枝繞住，懸在半空，後來被約押殺死。消息傳到大衛那裡，他一邊走一邊哭：「我兒押沙龍啊！我兒，我兒押沙龍啊！我恨不得替你死！」確切位置不知道，所以這是隱藏關卡。",
      en: "Despite its name, this forest was in Gilead, east of the Jordan. When David's son Absalom rebelled, the two armies fought in the Forest of Ephraim, and 'the forest devoured more people than the sword.' Riding his mule under the thick branches of a great oak, Absalom got caught by the head and was left hanging in midair, and Joab killed him. When the news reached David, he wept as he walked: 'My son Absalom! My son, my son Absalom! I wish I had died for you!' The exact location is unknown, so this is a hidden level."
    },
    reflect: {
      zh: "押沙龍背叛了大衛，大衛卻哭得心碎，父母的心常常就是這樣。今天你可以為你的父母或家人做一件什麼事？",
      en: "Absalom betrayed David, yet David's heart broke for him—that is so often a parent's heart. What is one thing you could do for your parents or family today?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完撒母耳記下 18 章，再回來答題。",
      en: "🔒 Hidden mission: Read 2 Samuel 18, then come back for the quiz."
    },
    quiz: {
      q: { zh: "押沙龍騎著騾子經過時，被什麼纏住？", en: "As Absalom rode by on his mule, what caught him?" },
      options: [{ zh: "葡萄樹", en: "A grapevine" }, { zh: "大橡樹的密枝", en: "The thick branches of a great oak" }, { zh: "城門", en: "A city gate" }],
      answer: 1
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: null
  },

  jabbok: {
    name: { zh: "雅博河（今天的 Zarqa 河）", en: "The Jabbok (Today's Zarqa River)" },
    place: { zh: "雅博河谷：塔拉勒國王水庫、金子山丘一帶", en: "Jabbok valley: King Talal Dam and Tulul adh-Dhahab area" },
    lat: 32.1866, lng: 35.6894, radius: 3000, approx: true,
    points: [{ lat: 32.1897, lng: 35.8018 }],
    certainty: "yes",
    verses: ["Gen 32:24", "Gen 32:28", "Gen 33:4"],
    story: {
      zh: "雅各在舅舅拉班家住了二十年，帶著妻子、孩子和牲畜回鄉。聽說哥哥以掃帶了四百人來迎接，他嚇壞了。那天夜裡，他讓全家先渡過雅博河的渡口，自己一個人留下。有一個人來和他摔跤，直到黎明；雅各的大腿窩被摸了一下就扭了，他卻說：「你不給我祝福，我就不容你去。」那人就給他改名叫「以色列」。有趣的是，在希伯來文裡，「雅博」和「摔跤」聽起來很像。第二天，以掃跑來抱住他，兩兄弟都哭了。這條河今天叫 Zarqa（藍色的意思），是約旦河的第二大支流。",
      en: "Jacob had lived twenty years with his uncle Laban. Now he headed home with his wives, children, and flocks—then heard that his brother Esau was coming with four hundred men, and he was terrified. That night he sent his family across the ford of the Jabbok and stayed behind alone. A man wrestled with him until dawn; Jacob's hip was wrenched at a touch, yet he said, 'I won't let you go unless you bless me.' The man renamed him 'Israel.' Interestingly, in Hebrew 'Jabbok' sounds like the word for 'wrestled.' The next day Esau ran to embrace him, and both brothers wept. Today the river is called the Zarqa ('blue'), the Jordan's second-largest tributary."
    },
    reflect: {
      zh: "雅各和哥哥和好之前，先跟神摔了一整夜。你現在有沒有一段需要修復的關係？在去面對那個人之前，你需要先跟神談什麼？",
      en: "Before reconciling with his brother, Jacob wrestled with God all night. Is there a relationship you need to mend? Before facing that person, what do you need to bring to God first?"
    },
    mission: {
      zh: "🌄 任務：在河谷邊找一個地方，一個人安靜五分鐘。雅各那一夜也是一個人。如果是清晨，看看太陽從哪邊的山升起。",
      en: "🌄 Mission: Find a spot above the valley and be alone and quiet for five minutes—Jacob was alone that night too. If it's early morning, watch which hills the sun rises over."
    },
    quiz: {
      q: { zh: "雅各在雅博河邊摔跤之後，被改名叫什麼？", en: "After wrestling by the Jabbok, what was Jacob renamed?" },
      options: [{ zh: "亞伯拉罕", en: "Abraham" }, { zh: "以色列", en: "Israel" }, { zh: "以東", en: "Edom" }],
      answer: 1
    },
    howto: {
      zh: "雅博河谷很長，這一站有兩個蓋章地點，到任一個都算：① 塔拉勒國王水庫（King Talal Dam），從安曼往傑拉什的路上可以繞過去看；② 約旦河谷 Deir Alla 東邊、河谷出口的「金子山丘」一帶。（App 用的是大約位置，蓋章範圍設得比較大。）",
      en: "The Jabbok valley is long, so this stop has two check-in areas—either counts: ① King Talal Dam, a short detour on the road from Amman to Jerash; ② the Tulul adh-Dhahab area where the valley opens east of Deir Alla in the Jordan Valley. (Approximate locations, so the check-in range is wide.)"
    },
    photo: "jabbok"
  },

  succoth: {
    name: { zh: "疏割（雅各搭棚的地方）", en: "Succoth (Where Jacob Built Shelters)" },
    place: { zh: "Tell Deir Alla 考古土丘，約旦河谷", en: "Tell Deir Alla archaeological mound, Jordan Valley" },
    lat: 32.1966, lng: 35.62118, radius: 800,
    certainty: "yes",
    verses: ["Gen 33:17", "1 Kgs 7:46", "Num 22:5"],
    story: {
      zh: "和以掃和好之後，雅各來到疏割，為自己蓋房子，也為牲畜搭棚，所以這地方叫「疏割」，就是「棚」的意思。猶太人的住棚節，用的也是同一個字。幾百年後，所羅門王在「疏割和撒拉但中間」的黏土平原，鑄造聖殿用的銅器。1967 年，荷蘭考古隊在這座土丘上挖到一面寫在灰泥牆上的古文字，裡面竟然提到「比珥的兒子巴蘭」，就是民數記裡那位先知。這是第一次在聖經以外的地方找到巴蘭的名字。",
      en: "After making peace with Esau, Jacob came to Succoth, built himself a house and made shelters for his livestock—so the place was called 'Succoth,' meaning 'shelters' or 'booths.' The Jewish Feast of Tabernacles uses the same word. Centuries later, King Solomon cast the bronze for the Temple in the clay plain 'between Succoth and Zarethan.' In 1967, Dutch archaeologists excavating this mound found an ancient text written on plaster that names 'Balaam son of Beor'—the very prophet of Numbers. It was the first time Balaam's name was found outside the Bible."
    },
    reflect: {
      zh: "經過那一夜的掙扎和那一場和好，雅各終於在疏割安頓下來。你的生活裡，哪裡是讓你可以停下來、好好休息的「棚」？",
      en: "After that night of struggle and that reconciliation, Jacob finally settled at Succoth. Where is the 'shelter' in your life where you can stop and truly rest?"
    },
    mission: {
      zh: "🏺 任務：站在土丘上看看四周的農田。這片黏土平原，就是所羅門鑄造聖殿銅器的地方。蹲下來摸摸看這裡的土。",
      en: "🏺 Mission: Stand on the mound and look over the farmland around it. This clay plain is where Solomon cast the Temple bronzes. Crouch down and feel the soil."
    },
    quiz: {
      q: { zh: "「疏割」是什麼意思？", en: "What does 'Succoth' mean?" },
      options: [{ zh: "泉水", en: "Springs" }, { zh: "棚", en: "Shelters / booths" }, { zh: "高山", en: "High mountain" }],
      answer: 1
    },
    howto: {
      zh: "在約旦河谷的 Deir Alla 鎮旁邊，從安曼經鹽城（Salt）開下去大約 1 小時。土丘就在路邊，規模不大，設施很少。河谷夏天非常熱，最好早上去。",
      en: "Beside the town of Deir Alla in the Jordan Valley, about an hour's drive from Amman via Salt. The mound is right by the road; it's small with few facilities. The valley is very hot in summer—go in the morning."
    },
    photo: null
  },

  penuel: {
    name: { zh: "毘努伊勒（神之面）", en: "Penuel (The Face of God)" },
    place: { zh: "金子山丘（Tulul adh-Dhahab）的東丘", en: "The eastern hill of Tulul adh-Dhahab ('Hills of Gold')" },
    lat: 32.187016, lng: 35.69211, radius: 700,
    certainty: "likely",
    noFacilities: true,
    verses: ["Gen 32:30-31", "Judg 8:17"],
    story: {
      zh: "摔跤之後，雅各給這地方起名叫毘努伊勒，意思是「神之面」，因為他說：「我面對面見了神，我的性命仍得保全。」日頭剛出來的時候，他一跛一跛地經過這裡。幾百年後，士師基甸追趕敵人，又累又餓的士兵向毘努伊勒人要餅，城裡的人卻拒絕了，後來基甸就拆了他們的城樓。雅博河在這裡轉了一個大彎，夾著兩座山丘，阿拉伯文叫 Tulul adh-Dhahab，意思是「金子山丘」。許多學者認為東邊這一座就是毘努伊勒。",
      en: "After the wrestling, Jacob named this place Peniel, 'the face of God,' saying, 'I have seen God face to face, and my life is preserved.' The sun rose as he passed by, limping. Centuries later, when the judge Gideon was chasing the enemy, his exhausted, hungry soldiers asked the people of Penuel for bread—and were refused; afterward Gideon tore down their tower. Here the Jabbok makes a great bend between two hills called Tulul adh-Dhahab, Arabic for 'Hills of Gold.' Many scholars identify the eastern hill as Penuel."
    },
    reflect: {
      zh: "雅各是一跛一跛地走進日出的。有沒有一個傷，後來反而成了你遇見神的記號？",
      en: "Jacob limped into the sunrise. Is there a wound in your life that later became a sign of meeting God?"
    },
    mission: {
      zh: "🌅 任務：從遠處看看兩座山丘中間的河彎，想像雅各一家在夜裡涉水過河的樣子。",
      en: "🌅 Mission: From a distance, look at the river bend between the two hills, and imagine Jacob's family wading across in the night."
    },
    quiz: {
      q: { zh: "「毘努伊勒」是什麼意思？", en: "What does 'Penuel' mean?" },
      options: [{ zh: "神之面", en: "The face of God" }, { zh: "神的家", en: "The house of God" }, { zh: "神的山", en: "The mountain of God" }],
      answer: 0
    },
    howto: {
      zh: "⚠️ 這是河谷裡的考古山丘，沒有遊客設施，能不能上去還沒確認，坡也很陡。在 Deir Alla 東邊的雅博河谷裡。建議跟熟悉當地的人一起去；下大雨、河水暴漲時不要靠近。",
      en: "⚠️ An archaeological hill in the river valley with no visitor facilities; access hasn't been confirmed, and the slopes are steep. It's in the Jabbok valley east of Deir Alla. Go with someone who knows the area, and stay away during heavy rain or high water."
    },
    photo: "penuel"
  },

  mahanaim: {
    name: { zh: "瑪哈念（二軍兵）", en: "Mahanaim (Two Camps)" },
    place: { zh: "金子山丘（Tulul adh-Dhahab）的西丘", en: "The western hill of Tulul adh-Dhahab" },
    lat: 32.18575, lng: 35.68667, radius: 700,
    certainty: "likely",
    noFacilities: true,
    verses: ["Gen 32:1-2", "2 Sam 17:27-29"],
    story: {
      zh: "雅各在回鄉路上遇見神的使者，就說：「這是神的軍兵」，給這地方起名叫瑪哈念，意思是「二軍兵」。後來瑪哈念變成一座重要的城：掃羅的兒子伊施波設在這裡作王；大衛被兒子押沙龍追殺、最落魄的時候，也逃到這裡。那時，基列人巴西萊和幾個朋友帶著被褥、碗盆、麥子、豆子、蜂蜜、奶油來，說：「民在曠野，必飢渴困乏了。」許多學者認為，金子山丘的西丘就是瑪哈念，但也有其他說法。",
      en: "On his way home, Jacob met the angels of God and said, 'This is God's army,' naming the place Mahanaim, 'two camps.' Later Mahanaim became an important city: Saul's son Ish-bosheth reigned here, and when David fled from his son Absalom—at his lowest point—he came here too. Barzillai the Gileadite and some friends brought bedding, bowls, wheat, beans, honey, and butter, saying, 'The people are hungry, weary, and thirsty in the wilderness.' Many scholars identify the western hill of Tulul adh-Dhahab as Mahanaim, though there are other proposals."
    },
    reflect: {
      zh: "大衛最落魄的時候，有人帶著被褥和食物來。你身邊有沒有正在「曠野」裡的人？你可以帶點什麼給他？",
      en: "At David's lowest point, friends came with bedding and food. Is someone around you in the 'wilderness' right now? What could you bring them?"
    },
    mission: {
      zh: "🍯 任務：像巴西萊一樣，帶一點吃的，和同行的人或在這裡遇到的人分享。",
      en: "🍯 Mission: Like Barzillai, bring some food to share with your companions or someone you meet here."
    },
    quiz: {
      q: { zh: "「瑪哈念」是什麼意思？", en: "What does 'Mahanaim' mean?" },
      options: [{ zh: "泉水的源頭", en: "Head of the spring" }, { zh: "二軍兵（兩個營）", en: "Two camps" }, { zh: "葡萄園", en: "Vineyards" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 和毘努伊勒是一對山丘，在河彎的西邊，一樣沒有遊客設施、能不能上去還沒確認。建議跟熟悉當地的人一起去。",
      en: "⚠️ The twin of Penuel, on the west side of the river bend; likewise no visitor facilities and access unconfirmed. Go with someone who knows the area."
    },
    photo: null
  },

  mizpahgilead: {
    name: { zh: "基列的米斯巴（雅各與拉班立約）", en: "Mizpah of Gilead (Jacob and Laban's Covenant)" },
    place: { zh: "位置不確定，有人推測在鹽城北邊的 Jal'ad 山一帶", en: "Location uncertain; some suggest Mount Jal'ad north of Salt" },
    hidden: true,
    certainty: "unknown",
    verses: ["Gen 31:49"],
    story: {
      zh: "雅各帶著全家偷偷離開舅舅拉班，拉班追了七天，在基列山追上他。兩人吵了一架，最後立約，堆了一堆石頭作見證。拉班用亞蘭話叫它「伊迦爾撒哈杜他」，雅各用希伯來話叫它「迦累得」，都是「見證的石堆」的意思；又叫「米斯巴」，就是「守望台」。拉班說：「我們彼此離別以後，願耶和華在你我中間鑒察。」今天這句話常被刻在情侶的項鍊上當成祝福，但它原本是兩個互不信任的人劃下的界線：誰都不可越過這石堆去害對方。這地方確切在哪裡還不知道，所以是隱藏關卡。",
      en: "Jacob slipped away from his uncle Laban with his whole family; Laban chased him for seven days and caught up in the hill country of Gilead. After a quarrel they made a covenant and piled up stones as a witness. Laban called it Jegar-sahadutha in Aramaic, and Jacob called it Galeed in Hebrew—both mean 'heap of witness.' It was also called Mizpah, 'watchtower,' for Laban said, 'Yahweh watch between me and you, when we are absent one from another.' Today that line is often engraved on couples' necklaces as a blessing, but it was originally a boundary between two men who didn't trust each other: neither would cross the heap to harm the other. Its exact location is unknown, so this is a hidden level."
    },
    reflect: {
      zh: "米斯巴原本是一條讓兩個人可以和平相處的界線。在你的關係裡，有沒有需要好好說清楚、畫出健康界線的地方？",
      en: "Mizpah was originally a boundary that let two people live in peace. In your relationships, is there somewhere you need to speak clearly and set a healthy boundary?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完創世記 31 章，看看雅各和拉班到底在吵什麼，再回來答題。",
      en: "🔒 Hidden mission: Read Genesis 31 to find out what Jacob and Laban were arguing about, then come back for the quiz."
    },
    quiz: {
      q: { zh: "雅各用希伯來話給那堆石頭起的名字是？", en: "What Hebrew name did Jacob give the heap of stones?" },
      options: [{ zh: "迦累得", en: "Galeed" }, { zh: "伯特利", en: "Bethel" }, { zh: "吉甲", en: "Gilgal" }],
      answer: 0
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: null
  },

  citadel: {
    name: { zh: "拉巴：安曼城堡", en: "Rabbah: The Amman Citadel" },
    place: { zh: "Jabal al-Qal'a（城堡山），安曼市中心", en: "Jabal al-Qal'a (Citadel Hill), downtown Amman" },
    lat: 31.9547, lng: 35.9343, radius: 500,
    certainty: "yes",
    verses: ["Gen 19:38", "Deut 3:11", "2 Sam 11:1", "2 Sam 11:15", "Amos 1:14"],
    story: {
      zh: "亞捫人是羅得的後代，他們的京城拉巴就建在這座山上。申命記說，巴珊王噩那張九肘長的大鐵床，當時就放在拉巴。後來大衛派約押率軍圍攻拉巴，自己卻留在耶路撒冷，因此犯下拔示巴的罪；為了掩蓋，他寫信要約押把拔示巴的丈夫烏利亞派到「陣勢極險之處」，烏利亞就戰死在這座城下。幾百年後，先知阿摩司預言火要燒滅拉巴的宮殿。今天山上看得到羅馬時期的海克力士神廟、拜占庭教堂和伍麥亞王朝的宮殿，一層一層疊著三千多年的歷史。",
      en: "The Ammonites were descendants of Lot, and their capital, Rabbah, stood on this hill. Deuteronomy says the giant iron bed of Og, king of Bashan—nine cubits long—was kept in Rabbah. Later David sent Joab to besiege Rabbah while he himself stayed in Jerusalem, where he sinned with Bathsheba. To cover it up, he wrote to Joab to put her husband Uriah 'in the forefront of the hottest battle,' and Uriah died beneath these walls. Centuries later, the prophet Amos foretold fire consuming Rabbah's palaces. Today the hill holds a Roman Temple of Hercules, a Byzantine church, and an Umayyad palace—over three thousand years of history in layers."
    },
    reflect: {
      zh: "大衛的跌倒，是從「列王出戰的時候」他卻留在家裡開始的。你的生活裡，有沒有哪個地方是該警醒、卻放鬆了的？",
      en: "David's fall began when, 'at the time when kings go out to battle,' he stayed home. Is there an area of your life where you should be watchful but have let your guard down?"
    },
    mission: {
      zh: "✋ 任務：找到海克力士神廟旁邊那隻巨大的石頭手掌，把你的手放在旁邊拍一張照（只拍，不要爬上去）。再走到城牆邊，往下找找看羅馬劇場。",
      en: "✋ Mission: Find the giant stone hand beside the Temple of Hercules and take a photo with your hand next to it (photo only—don't climb). Then walk to the wall and look down for the Roman Theatre."
    },
    quiz: {
      q: { zh: "大衛派誰率軍圍攻拉巴？", en: "Whom did David send to besiege Rabbah?" },
      options: [{ zh: "押尼珥", en: "Abner" }, { zh: "約押", en: "Joab" }, { zh: "拿單", en: "Nathan" }],
      answer: 1
    },
    howto: {
      zh: "在安曼市中心的山頂，搭計程車、Careem 或 Uber 說「Al-Qal'a」（城堡）就到了。要買票。山上有一間小型考古博物館，展出包括亞捫時期在內的出土文物。傍晚的夕陽和城市景色很美，但山上沒什麼遮蔭，白天記得帶水。",
      en: "On a hilltop in downtown Amman; tell your taxi, Careem, or Uber 'Al-Qal'a' (the Citadel). There's an entrance fee. A small archaeological museum on the hill displays finds from many periods, including the Ammonite era. Sunset views over the city are beautiful, but there's little shade—bring water during the day."
    },
    photo: "citadel"
  },

  theatre: {
    name: { zh: "非拉鐵非：羅馬劇場", en: "Philadelphia: The Roman Theatre" },
    place: { zh: "安曼市中心，城堡山腳下", en: "Downtown Amman, below Citadel Hill" },
    lat: 31.9517, lng: 35.9394, radius: 400,
    certainty: "yes",
    verses: ["Matt 4:25", "Mark 7:31"],
    story: {
      zh: "西元前三世紀，埃及的托勒密二世把拉巴改名為「非拉鐵非」（意思是「兄弟之愛」）。到了羅馬時代，它是「低加坡里」（十座城）之一。這座劇場是西元二世紀蓋的，可以坐大約六千人，到今天還在使用。福音書說，有許多人「從低加坡里」來跟隨耶穌；耶穌也曾經走過低加坡里地區。聖經沒有說耶穌到過非拉鐵非，但當年從這座城出發去聽耶穌講道的人，很可能就坐過這些石階。",
      en: "In the 3rd century BC, Ptolemy II of Egypt renamed Rabbah 'Philadelphia' (meaning 'brotherly love'). In Roman times it was one of the Decapolis, the 'Ten Cities.' This theatre was built in the 2nd century AD, seats about six thousand, and is still used today. The Gospels say great crowds 'from the Decapolis' followed Jesus, and Jesus himself passed through the Decapolis region. The Bible doesn't say Jesus came to Philadelphia, but people from this city who went to hear him may well have sat on these very steps."
    },
    reflect: {
      zh: "這座城的名字叫「兄弟之愛」。在你住的城市裡，你可以怎樣活出這個名字？",
      en: "This city's name means 'brotherly love.' How could you live out that name in the city where you live?"
    },
    mission: {
      zh: "🗣️ 任務：站在舞台正中央的圓點上，小聲說一句話，請同伴坐到高處的座位聽聽看。古羅馬人沒有麥克風，音效卻這麼好！",
      en: "🗣️ Mission: Stand on the center spot of the stage and speak softly while a companion listens from the upper seats. The Romans had no microphones, yet the acoustics are amazing!"
    },
    quiz: {
      q: { zh: "拉巴在希臘羅馬時代改叫什麼名字？", en: "What was Rabbah renamed in Greek and Roman times?" },
      options: [{ zh: "非拉鐵非", en: "Philadelphia" }, { zh: "該撒利亞", en: "Caesarea" }, { zh: "安提阿", en: "Antioch" }],
      answer: 0
    },
    howto: {
      zh: "在城堡山腳下，從城堡走下來大約 15～20 分鐘，或搭車到「Roman Theatre／Al-Mudarraj al-Roumani」。要買票，劇場兩側有兩間小型民俗博物館。旁邊的哈希姆廣場可以休息。",
      en: "At the foot of Citadel Hill—about a 15–20 minute walk down from the Citadel, or take a car to 'Roman Theatre / Al-Mudarraj al-Roumani.' There's an entrance fee, and two small folklore museums flank the theatre. The Hashemite Plaza next door is a nice place to rest."
    },
    photo: "theatre"
  },

  raselain: {
    name: { zh: "拉巴的「水城」：泉源", en: "Rabbah's 'City of Waters': Ras al-Ain" },
    place: { zh: "Ras al-Ain（泉水的源頭），安曼市中心西南", en: "Ras al-Ain ('head of the spring'), southwest of downtown Amman" },
    lat: 31.9440, lng: 35.9230, radius: 800, approx: true,
    certainty: "likely",
    verses: ["2 Sam 12:26-27"],
    story: {
      zh: "約押圍攻拉巴，先攻下了「水城」，就派人告訴大衛：快來，城就要拿下了。古代的城最怕斷水，誰控制了水源，誰就贏了一半。安曼的山谷裡曾有一條溪，從 Ras al-Ain（意思是「泉水的源頭」）的泉水流出，穿過市中心。許多學者認為，約押攻下的「水城」，就是守著這條水源的下城。這條溪一直流到二十世紀，今天已經被城市蓋住，只留下地名。",
      en: "Besieging Rabbah, Joab first captured the 'city of waters' and sent word to David: come quickly, the city is about to fall. Ancient cities feared losing their water most; whoever held the water source had half the battle won. A stream once flowed through Amman's valley from the springs at Ras al-Ain ('head of the spring') through downtown. Many scholars think the 'city of waters' Joab took was the lower city guarding this water supply. The stream flowed into the 20th century; today the city has covered it, and only the name remains."
    },
    reflect: {
      zh: "城的力量，其實在看不見的水源。你的力量，是從哪裡來的？",
      en: "A city's strength lay in its hidden water source. Where does your strength come from?"
    },
    mission: {
      zh: "💧 任務：在附近的路牌或店名裡找找看「Ain」或「عين」（泉水）這個字。安曼有很多地名都跟水有關！",
      en: "💧 Mission: Look for 'Ain' or 'عين' (spring) on nearby street signs or shop names. Many place names in Amman are related to water!"
    },
    quiz: {
      q: { zh: "「Ras al-Ain」是什麼意思？", en: "What does 'Ras al-Ain' mean?" },
      options: [{ zh: "國王的山", en: "The king's hill" }, { zh: "泉水的源頭", en: "Head of the spring" }, { zh: "大城門", en: "The great gate" }],
      answer: 1
    },
    howto: {
      zh: "在安曼市中心西南邊，大安曼市政府一帶，搭車說「Ras al-Ain」就到。這裡是一般市區，沒有遺址可看，比較適合帶著故事走一走。（App 用的是大約位置，蓋章範圍設得比較大。）",
      en: "Southwest of downtown, around the Greater Amman Municipality; ask a driver for 'Ras al-Ain.' It's an ordinary city area with no ruins to see—best enjoyed as a walk with the story in mind. (The app uses an approximate location, so the check-in range is wide.)"
    },
    photo: null
  },

  jubeiha: {
    name: { zh: "約比哈", en: "Jogbehah" },
    place: { zh: "安曼北區 Jubeiha（約旦大學一帶）", en: "Jubeiha, north Amman (near the University of Jordan)" },
    lat: 32.013531, lng: 35.855751, radius: 1200,
    certainty: "yes",
    noFacilities: true,
    verses: ["Num 32:35", "Judg 8:11"],
    story: {
      zh: "以色列人進迦南之前，迦得支派在約旦河東建造了幾座城，約比哈就是其中一座。後來士師基甸追趕米甸人的軍隊，就是「由挪巴和約比哈東邊」上去，趁敵人以為安全的時候突襲得勝。三千年過去，這個地名幾乎沒變：今天的 Jubeiha 是安曼北邊熱鬧的住宅區，約旦大學就在這裡。",
      en: "Before Israel entered Canaan, the tribe of Gad built several towns east of the Jordan, and Jogbehah was one of them. Later, the judge Gideon pursued the Midianite army 'on the east of Nobah and Jogbehah,' striking while the enemy felt secure. Three thousand years later the name has hardly changed: today's Jubeiha is a busy residential district in north Amman, home to the University of Jordan."
    },
    reflect: {
      zh: "你可能每天經過一個三千年前就出現在聖經裡的地方。你身邊還有哪些「平凡」的地方，其實藏著故事？",
      en: "You might pass a place named in the Bible three thousand years ago every day. What other 'ordinary' places around you hide a story?"
    },
    mission: {
      zh: "🗺️ 任務：在路牌上找到「Jubeiha／الجبيهة」，拍下來。三千年前的人，也用差不多的名字叫這裡！",
      en: "🗺️ Mission: Find 'Jubeiha / الجبيهة' on a street sign and photograph it. People three thousand years ago used nearly the same name!"
    },
    quiz: {
      q: { zh: "哪一位士師追趕敵人時經過約比哈？", en: "Which judge passed by Jogbehah while pursuing the enemy?" },
      options: [{ zh: "參孫", en: "Samson" }, { zh: "底波拉", en: "Deborah" }, { zh: "基甸", en: "Gideon" }],
      answer: 2
    },
    howto: {
      zh: "⚠️ 這是一般住宅區，沒有遺址或遊客設施。在安曼北邊，搭車到約旦大學或 Jubeiha 都可以。只要人在這一區就能蓋章。",
      en: "⚠️ An ordinary residential area with no ruins or visitor facilities. In north Amman—take a car to the University of Jordan or Jubeiha. You can check in anywhere in the area."
    },
    photo: null
  },

  abelkeramim: {
    name: { zh: "亞備勒基拉明（葡萄園之原）", en: "Abel-keramim (Meadow of the Vineyards)" },
    place: { zh: "位置不確定，有人推測在 Sahab 一帶", en: "Location uncertain; some suggest the Sahab area" },
    hidden: true,
    certainty: "unknown",
    verses: ["Judg 11:32-33"],
    story: {
      zh: "士師耶弗他原本被家人趕走，後來基列的長老卻回頭求他帶兵對抗亞捫人。耶弗他大大打敗亞捫人，從亞羅珥一直打到米匿，又到「亞備勒基拉明」，意思是「葡萄園之原」。可惜他在出戰前許了一個輕率的誓，後來為此付上了令人心碎的代價（士師記 11 章）。這個地方確切在哪裡，學者還不知道，有人推測在安曼東南的 Sahab 一帶，所以這是一個隱藏關卡。",
      en: "The judge Jephthah had been driven out by his family, yet later the elders of Gilead came back begging him to lead them against the Ammonites. Jephthah defeated them thoroughly, from Aroer to Minnith and on to 'Abel-keramim'—'meadow of the vineyards.' Sadly, before the battle he made a rash vow and later paid a heartbreaking price for it (Judges 11). Scholars don't know exactly where this place was; some suggest the Sahab area southeast of Amman—so this is a hidden level."
    },
    reflect: {
      zh: "耶弗他的勝利，被一個衝動的承諾蒙上陰影。你最近有沒有在情緒裡答應了什麼，需要好好想清楚？",
      en: "Jephthah's victory was overshadowed by an impulsive promise. Have you recently agreed to something in the heat of the moment that you should think through?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完士師記 11 章的整個故事，再回來答題。",
      en: "🔒 Hidden mission: Read the whole story in Judges 11, then come back for the quiz."
    },
    quiz: {
      q: { zh: "哪一位士師一路打敗亞捫人，直到亞備勒基拉明？", en: "Which judge defeated the Ammonites all the way to Abel-keramim?" },
      options: [{ zh: "耶弗他", en: "Jephthah" }, { zh: "以笏", en: "Ehud" }, { zh: "俄陀聶", en: "Othniel" }],
      answer: 0
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: null
  },

  bethany: {
    name: { zh: "約旦河外的伯大尼（耶穌受洗處）", en: "Bethany Beyond the Jordan (Baptism Site)" },
    place: { zh: "Al-Maghtas，聯合國世界遺產", en: "Al-Maghtas, UNESCO World Heritage Site" },
    lat: 31.837109, lng: 35.550301, radius: 1500,
    certainty: "yes",
    verses: ["John 1:28", "Matt 3:16-17", "John 10:40"],
    story: {
      zh: "施洗約翰在約旦河東岸的曠野呼喊人悔改，許多人從耶路撒冷下來受洗。耶穌也來到這裡，從約翰手中受洗；天開了，聖靈像鴿子降下。後來耶穌被人拿石頭要打時，又退回「約翰起初施洗的地方」住下。拜占庭時期的信徒在這裡蓋了好幾座教堂，考古隊挖出了它們的遺跡和受洗池。2015 年這裡被列為世界遺產。",
      en: "John the Baptist called people to repent in the wilderness east of the Jordan, and crowds came down from Jerusalem to be baptized. Jesus came here too and was baptized by John; the heavens opened and the Spirit descended like a dove. Later, when people tried to stone him, Jesus withdrew again to 'the place where John was baptizing at first.' Byzantine Christians built several churches here, and archaeologists have uncovered their remains and baptismal pools. It became a World Heritage Site in 2015."
    },
    reflect: {
      zh: "耶穌在開始傳道之前，先在這裡受洗。你的人生有沒有一個「重新開始」的時刻？",
      en: "Before beginning his ministry, Jesus was baptized here. Has there been a moment of 'new beginning' in your life?"
    },
    mission: {
      zh: "📸 任務：找到約旦河邊的木棧道，拍一張河水的照片。河的對岸就是另一個國家，寬度可能比你想像的窄很多！",
      en: "📸 Mission: Find the wooden walkway by the Jordan River and photograph the water. The other bank is a different country, and the river may be much narrower than you imagine!"
    },
    quiz: {
      q: { zh: "約翰福音說，約翰在哪裡施洗？", en: "According to John's Gospel, where was John baptizing?" },
      options: [
        { zh: "加利利海邊", en: "By the Sea of Galilee" },
        { zh: "約旦河外的伯大尼", en: "Bethany beyond the Jordan" },
        { zh: "耶路撒冷的畢士大池", en: "The Pool of Bethesda in Jerusalem" }
      ],
      answer: 1
    },
    howto: {
      zh: "從安曼開車約 50 分鐘，往死海方向走，路上有指標「Baptism Site」。要先在遊客中心買票，再搭園區的接駁車、跟導覽進去，不能自己開車進園區。服裝要端莊（遮肩、過膝）。夏天非常熱，帶水和帽子。門票和開放時間請看官方網站 baptismsite.com。",
      en: "About a 50-minute drive from Amman toward the Dead Sea; follow signs for 'Baptism Site'. Buy tickets at the visitor center, then take the site shuttle with a guided tour—private cars can't drive in. Dress modestly (shoulders and knees covered). Summers are very hot; bring water and a hat. For tickets and hours, see the official site baptismsite.com."
    },
    photo: "bethany"
  },

  elijah: {
    name: { zh: "以利亞山丘（以利亞升天處）", en: "Elijah's Hill (Tell Mar Elias)" },
    place: { zh: "受洗處園區內，Wadi Kharrar 旁", en: "Inside the Baptism Site, by Wadi Kharrar" },
    lat: 31.8386, lng: 35.5590, radius: 2500, approx: true,
    certainty: "tradition",
    verses: ["2 Kgs 2:8", "2 Kgs 2:11"],
    story: {
      zh: "以利亞和以利沙一起走到約旦河，以利亞用外衣打水，河水分開，兩人走乾地過到河東。他們一邊走一邊說話，忽然有火車火馬把兩人隔開，以利亞乘旋風升天。聖經沒有寫出確切是哪一座山丘，但從拜占庭時期起，信徒就在受洗處旁邊的這座小山丘紀念這件事，山上留有修道院和教堂的遺跡。有趣的是：施洗約翰被稱為「有以利亞的心志和能力」的人，他施洗的地方，正好就在以利亞離開的地方旁邊。",
      en: "Elijah and Elisha walked to the Jordan. Elijah struck the water with his cloak, the river parted, and they crossed on dry ground to the east bank. As they walked and talked, a chariot of fire and horses of fire separated them, and Elijah went up by a whirlwind into heaven. The Bible doesn't name the exact hill, but since Byzantine times believers have remembered the event on this small hill beside the Baptism Site, where remains of a monastery and churches survive. Interestingly, John the Baptist came 'in the spirit and power of Elijah'—and he baptized right next to the place where Elijah departed."
    },
    reflect: {
      zh: "以利沙求「感動你的靈加倍地感動我」。如果你可以向一位屬靈的前輩求一樣東西，你會求什麼？",
      en: "Elisha asked for 'a double portion' of Elijah's spirit. If you could ask a spiritual mentor for one thing, what would it be?"
    },
    mission: {
      zh: "🔍 任務：在山丘附近找一找古代的水池或水道遺跡。古時候這裡的修士怎麼取水？",
      en: "🔍 Mission: Look for ancient pools or water channels near the hill. How did the monks here get their water?"
    },
    quiz: {
      q: { zh: "以利亞用什麼東西打水，讓約旦河分開？", en: "What did Elijah strike the water with to part the Jordan?" },
      options: [
        { zh: "他的杖", en: "His staff" },
        { zh: "他的外衣", en: "His cloak" },
        { zh: "一塊石頭", en: "A stone" }
      ],
      answer: 1
    },
    howto: {
      zh: "在受洗處園區裡面，跟著園區導覽就會經過或看到。不需要另外買票。（App 用的是大約位置，蓋章範圍設得比較大。）",
      en: "Inside the Baptism Site; the guided tour passes by or within view of it. No separate ticket needed. (The app uses an approximate location, so the check-in range is wide.)"
    },
    photo: "elijah"
  },

  shittim: {
    name: { zh: "什亭（以色列人過河前的營地）", en: "Shittim (Israel's Last Camp)" },
    place: { zh: "Tall el-Hammam 考古遺址", en: "Tall el-Hammam archaeological site" },
    lat: 31.84018, lng: 35.67368, radius: 800,
    certainty: "likely",
    noFacilities: true,
    verses: ["Num 25:1", "Josh 2:1"],
    story: {
      zh: "以色列人過約旦河之前，最後紮營在什亭。約書亞從這裡暗暗派出兩個探子，去窺探耶利哥，後來被妓女喇合藏起來。可惜也是在什亭，百姓和摩押女子行淫亂、拜巴力毗珥。Tall el-Hammam 是約旦河谷一座很大的古代土丘，許多學者認為它就是什亭；也有人主張它是所多瑪，但這個說法爭議很大。",
      en: "Shittim was Israel's last camp before crossing the Jordan. From here Joshua secretly sent two spies to Jericho, where Rahab hid them. Sadly, it was also at Shittim that the people fell into immorality with Moabite women and worshiped Baal of Peor. Tall el-Hammam is a large ancient mound in the Jordan Valley that many scholars identify as Shittim; some argue it was Sodom, but that claim is highly disputed."
    },
    reflect: {
      zh: "同一個地方，有派出探子的勇氣，也有拜偶像的跌倒。最靠近應許的時候，為什麼也可能是最危險的時候？",
      en: "The same place saw both the courage of the spies and the fall into idolatry. Why might the moment closest to a promise also be the most dangerous?"
    },
    mission: {
      zh: "👀 任務：站在土丘上往西看。你看得到約旦河谷對面的山嗎？那就是探子們要去的方向。",
      en: "👀 Mission: Stand on the mound and look west. Can you see the hills across the Jordan Valley? That's where the spies were heading."
    },
    quiz: {
      q: { zh: "約書亞從什亭派出幾個探子？", en: "How many spies did Joshua send out from Shittim?" },
      options: [{ zh: "兩個", en: "Two" }, { zh: "十二個", en: "Twelve" }, { zh: "七個", en: "Seven" }],
      answer: 0
    },
    howto: {
      zh: "⚠️ 這是考古遺址，沒有遊客中心或設施，進入方式還沒確認。在安曼往死海的路上，靠近南舒納（South Shuneh）一帶。建議跟熟悉當地的人一起去，不要擅自進入圍起來的挖掘區。",
      en: "⚠️ This is an archaeological site with no visitor center or facilities; access has not been confirmed. It's near South Shuneh on the way from Amman to the Dead Sea. Go with someone who knows the area, and don't enter fenced excavation zones."
    },
    photo: "shittim"
  },

  moab: {
    name: { zh: "摩押平原", en: "The Plains of Moab" },
    place: { zh: "死海北邊的約旦河谷", en: "Jordan Valley north of the Dead Sea" },
    lat: 31.82, lng: 35.63, radius: 9000,
    certainty: "area",
    verses: ["Num 22:1", "Deut 1:5"],
    story: {
      zh: "以色列人出埃及、在曠野四十年後，來到摩押平原，對著耶利哥安營。整卷申命記，就是摩西在這片平原上對百姓講的最後一番話：重述律法、提醒他們不要忘記神。摩押王巴勒也是在這時候請巴蘭來詛咒以色列，結果巴蘭開口卻是祝福。今天這片平原長滿了椰棗樹和菜園。",
      en: "After the Exodus and forty years in the wilderness, Israel camped on the plains of Moab, across from Jericho. The whole book of Deuteronomy is Moses' final address to the people on these plains: retelling the law and urging them never to forget God. It was also then that King Balak of Moab hired Balaam to curse Israel—but every time Balaam opened his mouth, he blessed them. Today the plains are full of date palms and farms."
    },
    reflect: {
      zh: "摩西在進入應許之地之前，花了一整卷書提醒百姓「要記得」。你最不想忘記的一件事是什麼？",
      en: "Before entering the land, Moses spent an entire book urging the people to 'remember.' What is one thing you never want to forget?"
    },
    mission: {
      zh: "🌴 任務：開車經過時，數一數你看到幾片椰棗園。",
      en: "🌴 Mission: As you drive through, count how many date-palm groves you see."
    },
    quiz: {
      q: { zh: "哪一卷書是摩西在摩押平原講的？", en: "Which book records Moses' speeches on the plains of Moab?" },
      options: [{ zh: "創世記", en: "Genesis" }, { zh: "利未記", en: "Leviticus" }, { zh: "申命記", en: "Deuteronomy" }],
      answer: 2
    },
    howto: {
      zh: "這是一整個區域，從安曼往死海或受洗處的路上就會經過。只要進入這一帶就能蓋章。",
      en: "This is a whole region you pass through on the way from Amman to the Dead Sea or the Baptism Site. You can check in anywhere in the area."
    },
    photo: "moab"
  },

  nebo: {
    name: { zh: "尼波山／毘斯迦山頂", en: "Mount Nebo / Pisgah" },
    place: { zh: "Siyagha 摩西紀念教堂", en: "Memorial Church of Moses at Siyagha" },
    lat: 31.767778, lng: 35.725556, radius: 800,
    certainty: "yes",
    verses: ["Deut 34:1", "Deut 34:4", "Deut 34:5-6"],
    story: {
      zh: "摩西帶領百姓走了四十年，最後神叫他登上尼波山，把整片應許之地指給他看，卻告訴他：「你卻不得過到那裡去。」摩西就死在摩押地，神親自埋葬他，到今天沒有人知道他的墳墓在哪裡。四世紀的信徒在山頂蓋了紀念摩西的教堂，留下很美的馬賽克地板。天氣好的時候，可以看到死海、耶利哥，甚至遠方的耶路撒冷。",
      en: "After leading the people for forty years, Moses was told by God to climb Mount Nebo. God showed him the whole Promised Land, then said, 'You shall not go over there.' Moses died in the land of Moab, and God himself buried him; to this day no one knows where his grave is. In the 4th century, believers built a church on the summit in Moses' memory, with beautiful mosaic floors. On a clear day you can see the Dead Sea, Jericho, and even distant Jerusalem."
    },
    reflect: {
      zh: "摩西看見了應許，卻沒有走進去。有什麼事情是你盼望、但可能要交給下一代去完成的？",
      en: "Moses saw the promise but didn't enter it. Is there something you long for that you may need to hand on to the next generation?"
    },
    mission: {
      zh: "🐍 任務：找到山頂上的「銅蛇」雕塑，拍一張照片。它紀念的是民數記 21 章的哪一件事？",
      en: "🐍 Mission: Find the bronze serpent sculpture on the summit and take a photo. Which event in Numbers 21 does it recall?"
    },
    quiz: {
      q: { zh: "申命記說，摩西的墳墓在哪裡？", en: "According to Deuteronomy, where is Moses' grave?" },
      options: [
        { zh: "在尼波山頂的教堂底下", en: "Under the church on Mount Nebo" },
        { zh: "到今日沒有人知道", en: "No one knows to this day" },
        { zh: "在耶路撒冷", en: "In Jerusalem" }
      ],
      answer: 1
    },
    howto: {
      zh: "在馬達巴西邊約 10 公里，從安曼開車約 45 分鐘。山頂有教堂、觀景台、小賣部和洗手間。可以和馬達巴排在同一天。風很大，帶件外套。",
      en: "About 10 km west of Madaba, roughly 45 minutes' drive from Amman. The summit has the church, a viewing terrace, a shop, and restrooms. Easy to combine with Madaba in one day. It's windy—bring a jacket."
    },
    photo: "nebo"
  },

  madaba: {
    name: { zh: "米底巴（馬達巴）", en: "Medeba (Madaba)" },
    place: { zh: "聖喬治教堂的馬賽克地圖", en: "Mosaic Map in St. George's Church" },
    lat: 31.716107, lng: 35.79548, radius: 1500,
    certainty: "yes",
    verses: ["Num 21:30"],
    story: {
      zh: "米底巴是聖經裡就有的城名，三千年來地名幾乎沒有變過。這座城最有名的寶貝，是聖喬治東正教教堂地上一幅六世紀的馬賽克地圖：用上百萬顆小石頭拼出整片聖地，有約旦河、死海，還有城牆圍著的耶路撒冷。這是世界上最古老的聖地地圖之一，考古學家還靠它找到了好幾個古代地點。所以馬達巴也被叫做「馬賽克之城」。",
      en: "Medeba is a biblical city name that has barely changed in three thousand years. Its greatest treasure is a 6th-century mosaic map on the floor of St. George's Greek Orthodox Church: over a million tiny stones depicting the Holy Land, with the Jordan River, the Dead Sea, and walled Jerusalem. It is one of the oldest surviving maps of the Holy Land, and archaeologists have used it to locate several ancient sites. That's why Madaba is called the 'City of Mosaics.'"
    },
    reflect: {
      zh: "古時候的信徒把他們認識的聖地一顆一顆石頭拼出來。如果要你畫一張自己的「信仰地圖」，上面會有哪些地方？",
      en: "Ancient believers pieced together the Holy Land they knew, stone by stone. If you drew a 'map of your faith,' which places would be on it?"
    },
    mission: {
      zh: "🗺️ 任務：在馬賽克地圖上找到耶路撒冷（有城牆的那一個）。再找找看約旦河裡的魚，牠們在往哪個方向游？",
      en: "🗺️ Mission: Find Jerusalem on the mosaic map (the walled city). Then look for the fish in the Jordan River—which way are they swimming?"
    },
    quiz: {
      q: { zh: "馬達巴最有名的古物是什麼？", en: "What is Madaba's most famous ancient treasure?" },
      options: [
        { zh: "一幅馬賽克聖地地圖", en: "A mosaic map of the Holy Land" },
        { zh: "摩西的杖", en: "Moses' staff" },
        { zh: "一座金字塔", en: "A pyramid" }
      ],
      answer: 0
    },
    howto: {
      zh: "在安曼南邊約 30 公里，開車約 40 分鐘；也可以搭計程車、Careem 或 Uber。從安曼也有小巴可以到，出發的車站請先查最新資訊。聖喬治教堂在市中心，要買票，禮拜時間不開放參觀。",
      en: "About 30 km south of Amman, roughly a 40-minute drive; taxis, Careem, and Uber also work. Minibuses run from Amman too—check current departure stations before you go. St. George's Church is downtown; there's an entrance fee, and it's closed to visitors during services."
    },
    photo: "madaba"
  },

  heshbon: {
    name: { zh: "希實本", en: "Heshbon" },
    place: { zh: "Tell Hisban 考古遺址", en: "Tell Hisban archaeological site" },
    lat: 31.800811, lng: 35.809062, radius: 600,
    certainty: "likely",
    verses: ["Num 21:26", "Song 7:4"],
    story: {
      zh: "希實本是亞摩利王西宏的京城。以色列人求借道經過，西宏不但不肯，還出兵攻打，結果被以色列人打敗，這片地就歸了流便和迦得支派。雅歌用「希實本的水池」來形容新娘清澈的眼睛。考古隊從 1968 年起在這裡挖掘，真的挖出一座古代的大蓄水池。",
      en: "Heshbon was the capital of Sihon, king of the Amorites. When Israel asked to pass through, Sihon refused and attacked, but was defeated, and the land went to the tribes of Reuben and Gad. The Song of Songs compares the bride's clear eyes to 'the pools in Heshbon.' Archaeologists have excavated here since 1968—and they did uncover a large ancient reservoir."
    },
    reflect: {
      zh: "雅歌用一座城的水池來讚美所愛的人。你上一次具體地稱讚身邊最親近的人，是什麼時候？",
      en: "The Song of Songs praises a beloved using a city's pools. When did you last specifically praise the person closest to you?"
    },
    mission: {
      zh: "💧 任務：在遺址裡找到古代蓄水池。想像一下，雅歌的作者看到的水池是什麼樣子？",
      en: "💧 Mission: Find the ancient reservoir on the site. Imagine what the pools looked like to the poet of the Song of Songs."
    },
    quiz: {
      q: { zh: "希實本是哪一位王的京城？", en: "Heshbon was the capital of which king?" },
      options: [{ zh: "摩押王巴勒", en: "Balak of Moab" }, { zh: "亞摩利王西宏", en: "Sihon of the Amorites" }, { zh: "巴珊王噩", en: "Og of Bashan" }],
      answer: 1
    },
    howto: {
      zh: "在安曼和馬達巴之間，Hisban 村旁邊，從主要道路開過去很近。遺址規模不大，設施很少。",
      en: "Between Amman and Madaba, next to the village of Hisban, a short detour from the main road. A small site with few facilities."
    },
    photo: "heshbon"
  },

  peor: {
    name: { zh: "伯毘珥（摩西泉）", en: "Beth-peor (Springs of Moses)" },
    place: { zh: "Ayun Musa，尼波山腳下", en: "Ayun Musa, below Mount Nebo" },
    lat: 31.777021, lng: 35.738498, radius: 700,
    certainty: "tradition",
    verses: ["Deut 34:5-6"],
    story: {
      zh: "申命記說，神把摩西「埋葬在摩押地、伯毘珥對面的谷中」。尼波山北邊山谷裡的泉水，阿拉伯文叫 Ayun Musa，意思是「摩西的泉水」。這裡有拜占庭時期教堂的遺跡。伯毘珥的確切位置學者還沒有定論，但這個山谷就在摩西最後站立的山腳下。",
      en: "Deuteronomy says God buried Moses 'in the valley in the land of Moab opposite Beth-peor.' The springs in the valley north of Mount Nebo are called Ayun Musa—Arabic for 'the Springs of Moses'—and there are remains of Byzantine churches here. Scholars haven't settled Beth-peor's exact location, but this valley lies at the foot of the mountain where Moses last stood."
    },
    reflect: {
      zh: "沒有人知道摩西的墳墓在哪裡。為什麼神可能不想讓人找到它？",
      en: "No one knows where Moses' grave is. Why might God not have wanted it to be found?"
    },
    mission: {
      zh: "💦 任務：找到泉水，聽聽看水流的聲音。",
      en: "💦 Mission: Find the spring and listen to the sound of the water."
    },
    quiz: {
      q: { zh: "「Ayun Musa」的意思是？", en: "What does 'Ayun Musa' mean?" },
      options: [{ zh: "摩西的山", en: "Moses' mountain" }, { zh: "摩西的泉水", en: "Moses' springs" }, { zh: "摩西的家", en: "Moses' house" }],
      answer: 1
    },
    howto: {
      zh: "從尼波山往下走的山谷裡，路比較窄，建議開車或請當地司機帶路。設施很少。",
      en: "In the valley below Mount Nebo; the road is narrow, so drive or ask a local driver. Few facilities."
    },
    photo: null
  },

  elealeh: {
    name: { zh: "以利亞利", en: "Elealeh" },
    place: { zh: "El-Al 村", en: "The village of El-Al" },
    lat: 31.819308, lng: 35.828315, radius: 700,
    certainty: "likely",
    noFacilities: true,
    verses: ["Num 32:37-38", "Isa 15:4"],
    story: {
      zh: "以利亞利是流便支派重建的城之一，跟希實本是鄰居。幾百年後，以賽亞為摩押發出哀歌：「希實本和以利亞利悲哀的聲音達到雅雜。」今天村名 El-Al 還保留著古時候的名字。",
      en: "Elealeh was one of the towns rebuilt by the tribe of Reuben, a neighbor of Heshbon. Centuries later, Isaiah lamented over Moab: 'Heshbon cries out with Elealeh; their voice is heard even to Jahaz.' Today the village name El-Al still preserves the ancient name."
    },
    reflect: {
      zh: "以賽亞為敵國摩押哀哭。你能為一個不喜歡你的人感到難過嗎？",
      en: "Isaiah wept over Moab, Israel's enemy. Could you grieve for someone who doesn't like you?"
    },
    mission: {
      zh: "🏘️ 任務：站在村子的高處，找找看希實本在哪個方向（往南）。",
      en: "🏘️ Mission: From a high point in the village, find the direction of Heshbon (to the south)."
    },
    quiz: {
      q: { zh: "以利亞利跟哪一座城常常一起被提到？", en: "Elealeh is often mentioned together with which city?" },
      options: [{ zh: "希實本", en: "Heshbon" }, { zh: "耶利哥", en: "Jericho" }, { zh: "大馬士革", en: "Damascus" }],
      answer: 0
    },
    howto: {
      zh: "⚠️ 這是一般村莊，沒有遊客設施。在希實本北邊約 3 公里。請尊重村民，不要隨意進入私人土地。",
      en: "⚠️ This is an ordinary village with no visitor facilities, about 3 km north of Heshbon. Please respect residents and don't enter private land."
    },
    photo: null
  },

  maein: {
    name: { zh: "巴力免", en: "Baal-meon" },
    place: { zh: "Ma'in 村（不是馬因溫泉）", en: "The village of Ma'in (not the Ma'in Hot Springs)" },
    lat: 31.679501, lng: 35.735321, radius: 800,
    certainty: "likely",
    verses: ["Num 32:37-38"],
    story: {
      zh: "巴力免也是流便支派建造、改了名字的城。後來摩押王米沙在他刻的石碑上誇口說，是他建造了巴力免，可見這座城在以色列和摩押之間換過好幾次主人。今天的 Ma'in 村也發現了拜占庭時期的教堂馬賽克。注意：它跟觀光客常去的「馬因溫泉」是兩個不同的地方。",
      en: "Baal-meon was another town built and renamed by the tribe of Reuben. Later, King Mesha of Moab boasted on his inscribed stone that he had built Baal-meon—so the town changed hands between Israel and Moab more than once. Byzantine church mosaics have also been found in today's village of Ma'in. Note: it's not the same place as the popular Ma'in Hot Springs."
    },
    reflect: {
      zh: "流便人把帶有外邦神明名字的城「改了名字」。你的生活裡有沒有什麼需要「改名」、重新定義的東西？",
      en: "The Reubenites renamed towns that carried the names of pagan gods. Is there anything in your life that needs 'renaming'—a new definition?"
    },
    mission: {
      zh: "🧩 任務：馬達巴附近有很多馬賽克。比較一下你今天看到的馬賽克，哪一幅你最喜歡？",
      en: "🧩 Mission: The Madaba area is full of mosaics. Compare the ones you've seen today—which is your favorite?"
    },
    quiz: {
      q: { zh: "哪一位王在石碑上說他建造了巴力免？", en: "Which king claimed on a stone inscription that he built Baal-meon?" },
      options: [{ zh: "大衛王", en: "King David" }, { zh: "摩押王米沙", en: "King Mesha of Moab" }, { zh: "希律王", en: "King Herod" }],
      answer: 1
    },
    howto: {
      zh: "在馬達巴西南邊約 7 公里，開車很近。這是一般村莊，設施很少。",
      en: "About 7 km southwest of Madaba, a short drive. An ordinary village with few facilities."
    },
    photo: null
  },

  machaerus: {
    name: { zh: "馬蓋耳斯堡（施洗約翰殉道處）", en: "Machaerus (Where John the Baptist Died)" },
    place: { zh: "Mukawir 村旁的山頂堡壘遺址", en: "Hilltop fortress ruins beside the village of Mukawir" },
    lat: 31.5683, lng: 35.6261, radius: 800,
    certainty: "yes",
    verses: ["Mark 6:17-18", "Mark 6:27-28"],
    story: {
      zh: "施洗約翰當面指責希律安提帕：「你娶你兄弟的妻子是不合理的。」希律就把他鎖在監裡。後來在希律的生日宴上，希羅底的女兒跳舞討他歡心，希律隨口發誓要賞她任何東西，她照母親的意思求要約翰的頭。希律雖然憂愁，還是派人去監裡斬了約翰。福音書沒有寫出監獄在哪裡，但第一世紀的猶太史學家約瑟夫明確記載：約翰是在馬蓋耳斯堡被殺的。這座堡壘是大希律王建的，蓋在俯瞰死海的山頂上，今天還看得到重新立起來的石柱。",
      en: "John the Baptist confronted Herod Antipas to his face: 'It is not lawful for you to have your brother's wife.' So Herod had him chained in prison. Later, at Herod's birthday banquet, Herodias' daughter danced and pleased him; Herod rashly swore to give her anything, and at her mother's urging she asked for John's head. Though grieved, Herod sent an executioner to the prison. The Gospels don't name the prison, but the first-century Jewish historian Josephus states plainly that John was killed at Machaerus. Herod the Great built this fortress on a hilltop overlooking the Dead Sea, and you can still see columns that have been set upright again."
    },
    reflect: {
      zh: "約翰對有權勢的人說真話，付上了生命的代價；希律為了顧全面子，做了自己也不想做的事。你比較常像約翰，還是像希律？",
      en: "John spoke the truth to a powerful man and paid with his life; Herod, to save face, did what he himself did not want to do. Are you more often like John, or like Herod?"
    },
    mission: {
      zh: "🌅 任務：爬到山頂（大約 15 分鐘），往西看死海。天氣好的時候，可以看到對岸的山。想像約翰在這裡的監牢裡，最後幾天在想什麼。",
      en: "🌅 Mission: Climb to the summit (about 15 minutes) and look west over the Dead Sea; on a clear day you can see the hills across it. Imagine what John was thinking during his last days in a cell here."
    },
    quiz: {
      q: { zh: "哪一位歷史學家記載約翰是在馬蓋耳斯堡被殺的？", en: "Which historian recorded that John was killed at Machaerus?" },
      options: [{ zh: "約瑟夫", en: "Josephus" }, { zh: "希羅多德", en: "Herodotus" }, { zh: "路加", en: "Luke" }],
      answer: 0
    },
    howto: {
      zh: "從馬達巴往西南開車約 40 分鐘，到 Mukawir 村，再往前到山腳下的停車場。從停車場爬上山頂大約 15 分鐘，坡有點陡，穿好走的鞋。山頂沒有遮蔭，帶水和帽子。村裡有婦女編織合作社，可以順道支持當地。",
      en: "About 40 minutes' drive southwest of Madaba to the village of Mukawir, then on to the parking area at the foot of the hill. The climb to the summit takes about 15 minutes and is a bit steep—wear good shoes. There's no shade on top, so bring water and a hat. The village has a women's weaving cooperative you can support on the way."
    },
    photo: "machaerus"
  },

  dibon: {
    name: { zh: "底本（米沙石碑出土地）", en: "Dibon (Where the Mesha Stele Was Found)" },
    place: { zh: "Dhiban 鎮旁的古土丘", en: "The ancient mound beside the town of Dhiban" },
    lat: 31.502236, lng: 35.776574, radius: 800,
    certainty: "yes",
    verses: ["2 Kgs 3:4-5", "Num 32:34"],
    story: {
      zh: "列王紀下說，摩押王米沙是牧羊的，每年要向以色列王進貢大量的羊和羊毛；亞哈死後，米沙就背叛了以色列。1868 年，一位傳教士在底本發現一塊黑色玄武岩石碑，上面就是米沙自己刻的戰功：他說以色列王暗利曾經欺壓摩押，後來他奪回了好幾座城。石碑上還提到以色列的神的名字，也可能提到了「大衛家」。可惜當地人後來把石碑打碎了，碎片陸續找回來拼好，現在收藏在巴黎羅浮宮。這是聖經以外，和列王紀記載最直接互相印證的古代文物之一。",
      en: "2 Kings says Mesha king of Moab was a sheep breeder who paid Israel's king a huge annual tribute of lambs and wool; after Ahab died, Mesha rebelled. In 1868 a missionary found a black basalt stone at Dibon on which Mesha himself had carved his achievements: he says Omri king of Israel had oppressed Moab, and that he later took back several towns. The stone also names the God of Israel and may mention the 'House of David.' Sadly, locals later broke it apart; the fragments were gathered and pieced together, and it is now in the Louvre in Paris. It is one of the ancient artifacts outside the Bible that most directly echoes the account in Kings."
    },
    reflect: {
      zh: "同一場戰爭，列王紀和米沙石碑從兩個不同角度記錄。你最近遇到的一場衝突，換成對方的角度來寫，會是什麼樣子？",
      en: "Kings and the Mesha Stele record the same conflict from two different sides. If the other person wrote the story of a recent conflict of yours, how would it read?"
    },
    mission: {
      zh: "🪨 任務：站在土丘上，想像 1868 年那塊石碑就躺在這附近。之後有機會去安曼的約旦博物館，找找看米沙石碑的複製品。",
      en: "🪨 Mission: Stand on the mound and imagine the stone lying somewhere nearby in 1868. Later, if you visit the Jordan Museum in Amman, look for its replica of the Mesha Stele."
    },
    quiz: {
      q: { zh: "米沙石碑的原件現在收藏在哪裡？", en: "Where is the original Mesha Stele kept today?" },
      options: [{ zh: "安曼城堡", en: "The Amman Citadel" }, { zh: "巴黎羅浮宮", en: "The Louvre in Paris" }, { zh: "大英博物館", en: "The British Museum" }],
      answer: 1
    },
    howto: {
      zh: "在馬達巴南邊約 30 分鐘車程的 Dhiban 鎮，沿著君王大道（35 號公路）就會經過。土丘在鎮旁邊，有部分挖掘的遺跡，設施很少。可以和亞羅珥、亞嫩河谷排在一起。",
      en: "In the town of Dhiban, about 30 minutes' drive south of Madaba along the King's Highway (Route 35). The mound is beside the town, with some excavated remains and few facilities. Easy to combine with Aroer and the Arnon canyon."
    },
    photo: "dibon"
  },

  mephaath: {
    name: { zh: "米法押（Umm ar-Rasas）", en: "Mephaath (Umm ar-Rasas)" },
    place: { zh: "Umm ar-Rasas，聯合國世界遺產", en: "Umm ar-Rasas, UNESCO World Heritage Site" },
    lat: 31.499722, lng: 35.919722, radius: 1000,
    certainty: "yes",
    verses: ["Josh 13:18", "Jer 48:21"],
    story: {
      zh: "米法押是約書亞分給流便支派的城，後來成了利未人的城；耶利米也預言審判要臨到它。考古學家在這裡的聖司提反教堂，挖到一大片八世紀的馬賽克地板，上面畫著聖地和約旦河東的城市，其中一座就標著「Kastron Mefaa」，證明這裡就是聖經裡的米法押。遺址旁還有一座十幾公尺高的石塔，是古代修士獨自住在塔頂禱告的地方。2004 年這裡被列為世界遺產。",
      en: "Mephaath was a town Joshua allotted to the tribe of Reuben, later a Levitical city; Jeremiah also prophesied judgment on it. In the Church of St. Stephen here, archaeologists uncovered a vast 8th-century mosaic floor depicting cities of the Holy Land and east of the Jordan—one of them labeled 'Kastron Mefaa,' proving this is biblical Mephaath. Beside the ruins stands a stone tower over a dozen meters tall, where an ancient monk lived alone at the top in prayer. It became a World Heritage Site in 2004."
    },
    reflect: {
      zh: "古代的修士爬上高塔，離開熱鬧，專心禱告。你的生活裡，有沒有一個可以讓你安靜下來的「高塔」？",
      en: "Ancient monks climbed a tower to leave the noise behind and pray. Is there a 'tower' in your life where you can be still?"
    },
    mission: {
      zh: "🗺️ 任務：在聖司提反教堂的馬賽克地板上，找找看有城牆的城市圖案，看看你能不能認出幾座城的名字。",
      en: "🗺️ Mission: On the mosaic floor of the Church of St. Stephen, look for the walled city pictures and see how many city names you can recognize."
    },
    quiz: {
      q: { zh: "考古學家怎麼確定這裡就是米法押？", en: "How did archaeologists confirm this is Mephaath?" },
      options: [{ zh: "挖到一把刻著名字的劍", en: "They found a sword engraved with its name" }, { zh: "馬賽克地板上寫著城名", en: "A mosaic floor labels the city by name" }, { zh: "當地人一直這樣叫", en: "Locals always called it that" }],
      answer: 1
    },
    howto: {
      zh: "在馬達巴東南方約 30 公里，開車約 40 分鐘。有遊客中心，要買票（約旦通行證可用）。馬賽克在有屋頂的保護棚裡。遺址很大、幾乎沒有遮蔭，帶水和帽子。",
      en: "About 30 km southeast of Madaba, roughly 40 minutes' drive. There's a visitor center and an entrance fee (the Jordan Pass is accepted). The mosaics are under a protective roof. The site is large with almost no shade—bring water and a hat."
    },
    photo: "mephaath"
  },

  aroer: {
    name: { zh: "亞羅珥（亞嫩谷邊的城）", en: "Aroer (On the Rim of the Arnon)" },
    place: { zh: "Ara'ir 村旁，亞嫩河谷北邊的崖頂", en: "Beside the village of Ara'ir, on the north rim of the Arnon canyon" },
    lat: 31.4708, lng: 35.819389, radius: 800,
    certainty: "yes",
    noFacilities: true,
    verses: ["Deut 2:36"],
    story: {
      zh: "亞羅珥站在亞嫩河谷北邊的崖頂，是以色列在約旦河東的南方邊界。摩西說：「從亞嫩谷邊的亞羅珥……沒有一座城高得使我們不能攻取的。」有趣的是，米沙石碑也提到這座城：米沙說他「建造了亞羅珥，又在亞嫩谷開了一條大路」。一座城，同時出現在聖經和摩押王的石碑上。",
      en: "Aroer stood on the north rim of the Arnon canyon, Israel's southern border east of the Jordan. Moses said: 'From Aroer, which is on the edge of the valley of the Arnon… there was not a city too high for us.' Interestingly, the Mesha Stele mentions this town too: Mesha says he 'built Aroer and made the highway in the Arnon.' One town, named both in the Bible and on the Moabite king's stone."
    },
    reflect: {
      zh: "站在崖邊往下看很嚇人，但摩西說「沒有一座城高得使我們不能攻取」。你眼前有什麼看起來太高、太難的事？",
      en: "Looking down from the rim is frightening, yet Moses said 'there was not a city too high for us.' What in front of you looks too high or too hard right now?"
    },
    mission: {
      zh: "🏞️ 任務：走到崖邊安全的地方，往下看亞嫩河谷有多深。（不要靠近沒有護欄的崖邊。）",
      en: "🏞️ Mission: Walk to a safe spot near the rim and look down into the Arnon canyon. (Stay away from unfenced edges.)"
    },
    quiz: {
      q: { zh: "除了聖經，還有什麼古物提到亞羅珥？", en: "Besides the Bible, what ancient artifact mentions Aroer?" },
      options: [{ zh: "米沙石碑", en: "The Mesha Stele" }, { zh: "死海古卷", en: "The Dead Sea Scrolls" }, { zh: "馬達巴地圖", en: "The Madaba Map" }],
      answer: 0
    },
    howto: {
      zh: "⚠️ 在 Dhiban 南邊，君王大道往亞嫩河谷下坡之前、Ara'ir 村旁的小遺址，沒有遊客設施。路邊停車要注意安全，不要靠近崖邊。",
      en: "⚠️ A small ruin beside the village of Ara'ir, south of Dhiban, just before the King's Highway descends into the Arnon canyon; no visitor facilities. Park safely off the road and stay away from the cliff edge."
    },
    photo: null
  },

  arnon: {
    name: { zh: "亞嫩河谷（Wadi Mujib）", en: "The Arnon Canyon (Wadi Mujib)" },
    place: { zh: "君王大道穿過的大峽谷，下游是穆吉布自然保護區", en: "The great canyon crossed by the King's Highway; downstream is the Mujib Nature Reserve" },
    lat: 31.465833, lng: 35.573333, radius: 3000, approx: true,
    points: [{ lat: 31.4515, lng: 35.8095 }],
    certainty: "yes",
    verses: ["Num 21:13", "Deut 2:24"],
    story: {
      zh: "亞嫩河是摩押和亞摩利人之間的邊界。以色列人走曠野路到這裡，神說：「你們起來前往，過亞嫩谷。」從此開始取得約旦河東的土地。這條峽谷又深又寬，被稱為「約旦的大峽谷」；君王大道（35 號公路）要先繞下谷底、過水壩，再爬上對岸。峽谷流進死海的出口，就是穆吉布自然保護區，是地球上海拔最低的自然保護區之一，可以涉水走峽谷步道。",
      en: "The Arnon was the border between Moab and the Amorites. When Israel reached it on their wilderness journey, God said: 'Rise up, take your journey, and pass over the valley of the Arnon'—the start of their conquest east of the Jordan. The canyon is so deep and wide it's called 'Jordan's Grand Canyon'; the King's Highway (Route 35) winds down to the bottom, crosses a dam, and climbs the far side. Where the canyon meets the Dead Sea lies the Mujib Nature Reserve, one of the lowest nature reserves on earth, with trails that wade up the gorge."
    },
    reflect: {
      zh: "「你們起來前往，過亞嫩谷」：邊界過了，就不能回頭了。你人生中有沒有一條需要勇敢跨過去的「亞嫩河」？",
      en: "'Rise up, take your journey, and pass over the Arnon'—once the border was crossed, there was no turning back. Is there an 'Arnon' in your life you need to cross with courage?"
    },
    mission: {
      zh: "🚗 任務：沿著君王大道開下峽谷時，在安全的觀景點停下來，數數看山壁上有幾種顏色的岩層。",
      en: "🚗 Mission: As you drive the King's Highway into the canyon, stop at a safe viewpoint and count how many colors of rock layers you can see in the cliffs."
    },
    quiz: {
      q: { zh: "亞嫩河是哪兩個民族之間的邊界？", en: "The Arnon was the border between which two peoples?" },
      options: [{ zh: "摩押和亞摩利人", en: "Moab and the Amorites" }, { zh: "以東和以色列", en: "Edom and Israel" }, { zh: "亞捫和非利士", en: "Ammon and the Philistines" }],
      answer: 0
    },
    howto: {
      zh: "這一站有兩個蓋章地點，到任一個都算：① 君王大道（35 號公路）在 Dhiban 南邊下到峽谷的觀景點和水壩一帶；② 死海公路旁的穆吉布自然保護區遊客中心（峽谷步道要事先預約，夏天比較適合，冬天可能因為水量大而關閉）。開下峽谷的路很彎，慢慢開。（App 用的是大約位置，蓋章範圍設得比較大。）",
      en: "This stop has two check-in areas—either counts: ① the viewpoints and dam where the King's Highway (Route 35) descends into the canyon south of Dhiban; ② the Mujib Nature Reserve visitor center on the Dead Sea highway (gorge trails need advance booking, are best in summer, and may close in winter when water is high). The canyon road is winding—drive slowly. (Approximate locations, so the check-in range is wide.)"
    },
    photo: "arnon"
  },

  callirrhoe: {
    name: { zh: "卡利羅溫泉（細列哈沙轄）", en: "Callirrhoe (Zereth-shahar)" },
    place: { zh: "死海東岸的 Ez-Zara 溫泉一帶", en: "The Ez-Zara hot springs on the Dead Sea's eastern shore" },
    lat: 31.597, lng: 35.559306, radius: 1500,
    certainty: "likely",
    verses: ["Josh 13:19"],
    story: {
      zh: "約書亞把「谷中山的細列‧哈沙轄」分給流便支派，許多學者認為就是死海東岸這片有溫泉的地方。到了新約時代，這裡叫卡利羅（意思是「美麗的流水」）。史學家約瑟夫記載，大希律王臨死前病重，特地來這裡泡溫泉治病，卻沒有好轉。馬達巴馬賽克地圖上也畫著這裡：溫泉、棕櫚樹，就在死海岸邊。山上不遠處就是他兒子後來關押施洗約翰的馬蓋耳斯堡。",
      en: "Joshua allotted 'Zereth Shahar on the mountain of the valley' to the tribe of Reuben, and many scholars place it at these hot springs on the Dead Sea's eastern shore. In New Testament times the place was called Callirrhoe ('beautiful flow'). Josephus records that Herod the Great, gravely ill near death, came here to bathe in the hot springs for healing—without improvement. The Madaba mosaic map shows it too: springs and palm trees on the Dead Sea shore. Up in the hills nearby is Machaerus, where his son later imprisoned John the Baptist."
    },
    reflect: {
      zh: "希律王有權有錢，連最好的溫泉都買得到，卻買不到健康和平安。你現在最想用錢解決、其實錢解決不了的是什麼？",
      en: "King Herod had power and money enough to buy the finest hot springs, yet couldn't buy health or peace. What are you hoping money will solve that money can't really fix?"
    },
    mission: {
      zh: "♨️ 任務：找到溫泉水流進死海的地方，摸摸看水有多溫暖（小心燙）。",
      en: "♨️ Mission: Find where the hot spring water flows toward the Dead Sea and feel how warm it is (careful—it can be hot)."
    },
    quiz: {
      q: { zh: "哪一位王臨死前來卡利羅泡溫泉治病？", en: "Which king came to bathe at Callirrhoe before his death?" },
      options: [{ zh: "大希律王", en: "Herod the Great" }, { zh: "所羅門王", en: "King Solomon" }, { zh: "米沙王", en: "King Mesha" }],
      answer: 0
    },
    howto: {
      zh: "在死海公路上，從死海北邊的度假飯店區往南開約 30 分鐘。溫泉旁有私人度假村，部分區域要付費進入。死海公路很熱，夏天中午避免停留太久。",
      en: "On the Dead Sea highway, about 30 minutes' drive south of the northern Dead Sea resort area. There's a private resort by the springs, and some areas require a fee. The Dead Sea road is very hot—avoid lingering at midday in summer."
    },
    photo: null
  },

  ataroth: {
    name: { zh: "亞他錄（Khirbet Ataruz）", en: "Ataroth (Khirbet Ataruz)" },
    place: { zh: "馬蓋耳斯堡附近的山頂遺址", en: "Hilltop ruins near Machaerus" },
    lat: 31.5753, lng: 35.665938, radius: 800,
    certainty: "yes",
    noFacilities: true,
    verses: ["Num 32:34"],
    story: {
      zh: "迦得支派在約旦河東建造了亞他錄。米沙石碑說：「迦得人自古住在亞他錄的地」，後來米沙攻下這座城。考古隊在這裡挖到一座摩押時期的神廟，還有刻著古文字的祭壇，讓聖經、米沙石碑和考古三方面的資料互相對照。",
      en: "The tribe of Gad built Ataroth east of the Jordan. The Mesha Stele says, 'The men of Gad had lived in the land of Ataroth from of old,' and that Mesha later captured the town. Archaeologists here uncovered a Moabite-era temple and an altar inscribed with ancient writing—letting the Bible, the Mesha Stele, and archaeology be compared side by side."
    },
    reflect: {
      zh: "同一片土地，換過好幾次主人。你現在「擁有」的東西裡，有哪些其實只是暫時託付給你的？",
      en: "The same land changed hands several times. Of the things you 'own' now, which are really only entrusted to you for a while?"
    },
    mission: {
      zh: "🔭 任務：從這裡找找看馬蓋耳斯堡的山頭在哪個方向。",
      en: "🔭 Mission: From here, see if you can spot the hilltop of Machaerus."
    },
    quiz: {
      q: { zh: "哪一個支派建造了亞他錄？", en: "Which tribe built Ataroth?" },
      options: [{ zh: "猶大", en: "Judah" }, { zh: "迦得", en: "Gad" }, { zh: "便雅憫", en: "Benjamin" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 考古遺址，沒有遊客設施，能不能進去還沒確認。在 Mukawir 村東邊不遠，可以和馬蓋耳斯堡排在一起。",
      en: "⚠️ An archaeological site with no visitor facilities; access hasn't been confirmed. It's a short distance east of Mukawir village—easy to combine with Machaerus."
    },
    photo: null
  },

  jahaz: {
    name: { zh: "雅雜（西宏王最後一戰）", en: "Jahaz (King Sihon's Last Battle)" },
    place: { zh: "位置不確定，可能在 Dhiban 東北方", en: "Location uncertain, possibly northeast of Dhiban" },
    hidden: true,
    certainty: "unknown",
    verses: ["Num 21:23-24"],
    story: {
      zh: "以色列人客客氣氣地請亞摩利王西宏讓他們借道經過，保證不進田地、不喝井水，只走大道。西宏不但不肯，還招聚全軍出到曠野，在雅雜跟以色列打仗，結果大敗，以色列就得了從亞嫩河到雅博河的地。後來米沙石碑也提到雅雜，說米沙把這城奪回來。雅雜確切在哪裡還不確定，所以這是隱藏關卡。",
      en: "Israel politely asked Sihon king of the Amorites for passage, promising not to enter fields or drink from wells, but only to walk the highway. Sihon not only refused, but gathered his whole army into the wilderness and fought Israel at Jahaz—and was badly defeated, and Israel took the land from the Arnon to the Jabbok. The Mesha Stele later mentions Jahaz too, saying Mesha took it back. Its exact location is still uncertain, so this is a hidden level."
    },
    reflect: {
      zh: "以色列人先客氣地請求，被拒絕後才有衝突。你在跟人有摩擦之前，有沒有先好好地說清楚、請求過？",
      en: "Israel asked politely first; conflict came only after refusal. Before friction with someone, do you first speak clearly and ask kindly?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完民數記 21 章 21～35 節，再回來答題。",
      en: "🔒 Hidden mission: Read Numbers 21:21–35, then come back for the quiz."
    },
    quiz: {
      q: { zh: "以色列人在雅雜打敗了哪一位王？", en: "Which king did Israel defeat at Jahaz?" },
      options: [{ zh: "巴珊王噩", en: "Og king of Bashan" }, { zh: "亞摩利王西宏", en: "Sihon king of the Amorites" }, { zh: "摩押王巴勒", en: "Balak king of Moab" }],
      answer: 1
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: null
  },

  kerak: {
    name: { zh: "吉珥哈列設（卡拉克城堡）", en: "Kir-hareseth (Kerak Castle)" },
    place: { zh: "卡拉克市山頂的十字軍城堡", en: "The Crusader castle on the hilltop of Kerak city" },
    lat: 31.1808, lng: 35.7013, radius: 800,
    certainty: "yes",
    verses: ["2 Kgs 3:26-27", "1 Sam 22:3"],
    story: {
      zh: "卡拉克就是摩押的堅固城吉珥哈列設。以色列、猶大、以東三個王聯合攻打摩押，把整片土地毀了，只剩下這座城還在。摩押王米沙帶七百個拿刀的兵想衝出去，沒有成功；走投無路之下，他把要接續作王的長子，在城牆上獻為燔祭。以色列人看到這一幕，就撤兵回去了。更早以前，大衛被掃羅追殺的時候，曾經到「摩押的米斯巴」，請摩押王照顧他的父母；有學者認為米斯巴就是這裡。大衛會想到摩押，可能是因為他的曾祖母路得就是摩押人。今天山頂上的巨大城堡，是十字軍在 1142 年蓋的，後來被薩拉丁和馬木路克王朝接手擴建。",
      en: "Kerak is Kir-hareseth, the stronghold of Moab. The kings of Israel, Judah and Edom joined forces against Moab and laid the land waste until only this city was left standing. King Mesha of Moab led seven hundred swordsmen in an attempt to break out, and failed. Out of options, he offered his eldest son, the heir to his throne, as a burnt offering on the city wall, and Israel withdrew and went home. Long before that, while Saul was hunting him, David went to 'Mizpeh of Moab' and asked the king of Moab to look after his father and mother; some scholars think that Mizpeh was this place. David may have turned to Moab because his great-grandmother Ruth was a Moabite. The massive castle on the hilltop today was built by the Crusaders in 1142 and later taken over and enlarged by Saladin and the Mamluks."
    },
    reflect: {
      zh: "以賽亞先知宣告摩押要受審判，卻說「我心腸為摩押哀鳴如琴」：神連對敵人都心疼。你有沒有一個很難去愛的人，可以試著用神的眼光看他？",
      en: "The prophet Isaiah announced judgment on Moab, yet said, 'My heart sounds like a harp for Moab': God grieves even over enemies. Is there someone hard for you to love whom you could try to see through God's eyes?"
    },
    mission: {
      zh: "🏰 任務：走到城牆邊往西看，天氣好時可以看到死海。想像當年米沙站在城牆上，被三國大軍團團圍住，心裡有多絕望。",
      en: "🏰 Mission: Walk to the wall and look west; on a clear day you can see the Dead Sea. Imagine Mesha standing on the city wall, surrounded by the armies of three kingdoms, and how desperate he must have felt."
    },
    quiz: {
      q: { zh: "大衛把父母託給誰照顧？", en: "Whom did David ask to look after his parents?" },
      options: [{ zh: "以東王", en: "The king of Edom" }, { zh: "摩押王", en: "The king of Moab" }, { zh: "亞捫王", en: "The king of Ammon" }],
      answer: 1
    },
    howto: {
      zh: "從安曼往南開車約 2 小時（走沙漠公路較快，走君王大道可以沿路經過第 6 章的地點）。有遊客中心，要買票（約旦通行證可用）。城堡裡有很多又暗又長的地道，帶手電筒或用手機照明，地面不平要小心。城堡外的街上有餐廳可以吃午餐。",
      en: "About 2 hours' drive south of Amman (the Desert Highway is faster; the King's Highway passes the Chapter 6 sites on the way). There's a visitor center and an entrance fee (the Jordan Pass is accepted). The castle has many long, dark tunnels—bring a flashlight or use your phone, and watch your step on the uneven floors. There are restaurants on the streets outside for lunch."
    },
    photo: "kerak"
  },

  ruthmoab: {
    name: { zh: "摩押地（路得的故鄉）", en: "The Fields of Moab (Ruth's Homeland)" },
    place: { zh: "亞嫩河谷南邊到卡拉克之間的摩押高原", en: "The Moab plateau between the Arnon canyon and Kerak" },
    lat: 31.3, lng: 35.72, radius: 15000,
    certainty: "area",
    verses: ["Ruth 1:1", "Ruth 1:16"],
    story: {
      zh: "士師時代，伯利恆鬧饑荒，以利米勒帶著妻子拿俄米和兩個兒子，搬到「摩押地」寄居。兩個兒子娶了摩押女子俄珥巴和路得，後來三個男人都死了。拿俄米決定回伯利恆，勸兩個媳婦回娘家。俄珥巴哭著離開，路得卻緊緊跟著婆婆，說出聖經裡最動人的承諾之一：「你往哪裡去，我也往那裡去……你的國就是我的國，你的神就是我的神。」路得後來嫁給波阿斯，成了大衛王的曾祖母，馬太福音還把她的名字寫進耶穌的家譜。聖經沒說他們住在摩押哪一座城，所以整片摩押高原都算。",
      en: "In the days of the judges, a famine struck Bethlehem, and Elimelech took his wife Naomi and their two sons to live in 'the country of Moab.' The sons married Moabite women, Orpah and Ruth, and then all three men died. Naomi decided to return to Bethlehem and urged her daughters-in-law to go home to their families. Orpah left in tears, but Ruth clung to her mother-in-law and made one of the most moving promises in the Bible: 'Where you go, I will go… your people will be my people, and your God my God.' Ruth later married Boaz and became King David's great-grandmother, and Matthew even writes her name into Jesus' family tree. The Bible doesn't say which town in Moab they lived in, so the whole Moab plateau counts."
    },
    reflect: {
      zh: "路得是外國人、寡婦，前途一片模糊，卻選擇留下來陪伴拿俄米。你身邊有沒有一個正在低谷裡的人，需要你說「我陪你」？",
      en: "Ruth was a foreigner and a widow with an uncertain future, yet she chose to stay with Naomi. Is there someone near you, in a low place, who needs to hear you say, 'I'll go with you'?"
    },
    mission: {
      zh: "🌾 任務：在摩押高原的田野邊停下來，讀一遍路得記 1 章 16～17 節，拍一張田野的照片。路得和拿俄米回到伯利恆時，正是「動手割大麥的時候」。",
      en: "🌾 Mission: Stop beside a field on the Moab plateau, read Ruth 1:16–17, and take a photo of the fields. When Ruth and Naomi reached Bethlehem, it was 'the beginning of the barley harvest.'"
    },
    quiz: {
      q: { zh: "路得是哪一位以色列王的曾祖母？", en: "Ruth was the great-grandmother of which king of Israel?" },
      options: [{ zh: "掃羅王", en: "King Saul" }, { zh: "所羅門王", en: "King Solomon" }, { zh: "大衛王", en: "King David" }],
      answer: 2
    },
    howto: {
      zh: "不用到特定地點：沿著君王大道（35 號公路）從亞嫩河谷南岸往卡拉克開，一路上就是摩押高原，在這範圍內都能蓋章。春天（3～4 月）麥田最綠。路邊停車拍照請找安全的地方，注意來車。",
      en: "No specific spot needed: driving the King's Highway (Route 35) from the south rim of the Arnon canyon toward Kerak, you're on the Moab plateau the whole way, and anywhere in this area counts. The wheat fields are greenest in spring (March–April). If you stop by the road for photos, find a safe place and watch for traffic."
    },
    photo: null
  },

  ar: {
    name: { zh: "亞珥（賜給羅得子孫的地）", en: "Ar (Given to the Descendants of Lot)" },
    place: { zh: "Khirbet al-Balu'a 遺址，君王大道東邊", en: "The ruins of Khirbet al-Balu'a, east of the King's Highway" },
    lat: 31.359913, lng: 35.782764, radius: 1000,
    certainty: "likely",
    noFacilities: true,
    verses: ["Deut 2:9"],
    story: {
      zh: "以色列人從曠野北上，經過摩押的時候，神特別吩咐摩西：「不可擾害摩押人，也不可與他們爭戰」，因為神已經把亞珥賜給羅得的子孫。摩押人是羅得的後代，神沒有忘記羅得，也照顧他的子孫。許多學者認為亞珥就是這裡的 Balu'a 大遺址；這裡曾經出土一塊古老的石碑，刻著一位王站在兩位神明之間，是摩押時期的重要文物，現在收藏在安曼的博物館。",
      en: "As Israel came north from the wilderness past Moab, God gave Moses a specific command: 'Don't bother Moab, neither contend with them in battle,' because he had given Ar to the descendants of Lot. The Moabites descended from Lot; God had not forgotten Lot, and cared for his descendants too. Many scholars think Ar is the large ruin here at Balu'a. An ancient stele was found here showing a king standing between two gods, an important Moabite-era artifact now kept in a museum in Amman."
    },
    reflect: {
      zh: "神叫以色列人不要搶摩押人的地，即使他們有能力搶。你有能力爭、卻選擇讓步的時候，心裡在想什麼？",
      en: "God told Israel not to take Moab's land, even though they could have. When you have the power to fight for something but choose to give way, what goes on in your heart?"
    },
    mission: {
      zh: "🔭 任務：從遺址往北看，找找看亞嫩河谷的方向。以色列人當年就是在這一帶繞過摩押人的城，沒有攻打。",
      en: "🔭 Mission: From the ruins, look north toward the Arnon canyon. Somewhere around here, Israel passed by the Moabite towns without attacking them."
    },
    quiz: {
      q: { zh: "神為什麼不讓以色列人攻打摩押？", en: "Why did God tell Israel not to fight Moab?" },
      options: [{ zh: "摩押人太強大", en: "Moab was too strong" }, { zh: "神已經把亞珥賜給羅得的子孫", en: "God had given Ar to the descendants of Lot" }, { zh: "以色列人迷路了", en: "Israel had lost its way" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 考古遺址，沒有遊客設施，能不能進去還沒確認。在君王大道上、亞嫩河谷南邊不遠處往東，可以和摩押高原、卡拉克排在同一天。",
      en: "⚠️ An archaeological site with no visitor facilities; access hasn't been confirmed. It lies a short way east of the King's Highway, not far south of the Arnon canyon—easy to combine with the Moab plateau and Kerak on the same day."
    },
    photo: null
  },

  lotcave: {
    name: { zh: "羅得洞（聖羅得修道院）", en: "Lot's Cave (Monastery of St. Lot)" },
    place: { zh: "Ghor es-Safi 附近山坡上的拜占庭修道院遺址", en: "Byzantine monastery ruins on a hillside near Ghor es-Safi" },
    lat: 31.0468, lng: 35.5027, radius: 1500,
    certainty: "tradition",
    approx: true,
    verses: ["Gen 19:30", "Gen 19:37-38"],
    story: {
      zh: "所多瑪被毀滅後，羅得先逃到瑣珥，後來不敢住在城裡，就帶著兩個女兒上山，住在一個山洞裡。兩個女兒以為世上再也沒有男人，做了違背倫常的事，各生了一個兒子：摩押，就是摩押人的祖先；便亞米，就是亞捫人的祖先。拜占庭時代的基督徒相信就是這個山洞，在洞口旁蓋了修道院和教堂，地上的馬賽克銘文還寫著「聖羅得」。馬達巴馬賽克地圖上也畫著這座聖所。山下的「地球最低點博物館」收藏了這裡挖出來的文物。",
      en: "After Sodom was destroyed, Lot first fled to Zoar, but was afraid to stay in the town, so he went up into the hills with his two daughters and lived in a cave. Thinking there were no men left in the world, the daughters did something deeply wrong, and each bore a son: Moab, ancestor of the Moabites, and Ben-ammi, ancestor of the Ammonites. Byzantine Christians believed this was the cave and built a monastery and church beside its entrance, with mosaic inscriptions naming 'Saint Lot.' The Madaba mosaic map shows this sanctuary too. The Museum at the Lowest Place on Earth, below the hill, displays finds from the site."
    },
    reflect: {
      zh: "羅得一家逃出了所多瑪，所多瑪的影響卻還留在心裡。你有沒有一個已經離開、卻還在影響你的環境或習慣？",
      en: "Lot's family escaped Sodom, but Sodom's influence stayed with them. Is there a place or habit you've left behind that still shapes you?"
    },
    mission: {
      zh: "⛰️ 任務：爬到修道院，找到通往山洞的入口，回頭往下看死海南端的平原。",
      en: "⛰️ Mission: Climb up to the monastery, find the entrance to the cave, and look back down over the plain at the south end of the Dead Sea."
    },
    quiz: {
      q: { zh: "羅得的大女兒生的兒子摩押，是哪一個民族的祖先？", en: "Lot's elder daughter's son Moab was the ancestor of which people?" },
      options: [{ zh: "摩押人", en: "The Moabites" }, { zh: "以東人", en: "The Edomites" }, { zh: "非利士人", en: "The Philistines" }],
      answer: 0
    },
    howto: {
      zh: "在死海公路南段，Ghor es-Safi 鎮北邊。先導航到「地球最低點博物館」（Museum at the Lowest Place on Earth），修道院在博物館後方的山坡上，要爬一段很陡的階梯（大約 10～15 分鐘）。這裡是全世界最低的地方之一，非常熱，避開夏天中午，帶足水。座標是大約位置，快到時看路標。",
      en: "On the southern stretch of the Dead Sea highway, just north of the town of Ghor es-Safi. Navigate first to the Museum at the Lowest Place on Earth; the monastery is on the hillside behind it, up a steep flight of steps (about 10–15 minutes). This is one of the lowest places on Earth and extremely hot—avoid summer middays and bring plenty of water. The coordinates are approximate, so watch for signs as you get close."
    },
    photo: null
  },

  zoar: {
    name: { zh: "瑣珥（羅得逃去的小城）", en: "Zoar (The Little Town Lot Fled To)" },
    place: { zh: "死海南端的 Ghor es-Safi 鎮", en: "The town of Ghor es-Safi at the south end of the Dead Sea" },
    lat: 31.036904, lng: 35.487657, radius: 2500,
    certainty: "likely",
    verses: ["Gen 19:22-23"],
    story: {
      zh: "天使催羅得趕快逃到山上，羅得卻求說：「這城又小又近，讓我逃到那裡吧，這不是一個小的嗎？」天使答應了，所以那城叫「瑣珥」，意思就是「小」。羅得到瑣珥的時候，太陽已經出來了，接著所多瑪就被毀滅。更早以前，羅得選地的時候，看見約旦河平原「都是滋潤的……直到瑣珥」。拜占庭時代這裡叫 Zoora，馬達巴馬賽克地圖上畫著這座城和一片棕櫚樹。今天 Ghor es-Safi 還是一大片農田，種番茄、香蕉。",
      en: "The angels urged Lot to flee to the hills, but Lot pleaded, 'This city is near and small—let me escape there. Isn't it a little one?' The angels agreed, so the town was called Zoar, meaning 'little.' The sun had risen by the time Lot reached Zoar, and then Sodom was destroyed. Earlier, when Lot chose his land, he saw that the Jordan plain was 'well-watered everywhere… as you go to Zoar.' In Byzantine times the town was called Zoora, and the Madaba mosaic map shows it among palm trees. Today Ghor es-Safi is still a sea of farms growing tomatoes and bananas."
    },
    reflect: {
      zh: "羅得當年看哪裡肥沃就往哪裡去，結果一路退到一座小城、再退到山洞。你做選擇的時候，最常看的是眼前的好處，還是長遠的方向？",
      en: "Lot moved toward whatever land looked richest, and ended up retreating to a little town, then to a cave. When you make choices, do you look more at the immediate benefit or at the long-term direction?"
    },
    mission: {
      zh: "🍅 任務：看看四周的農田，跟死海邊光禿禿的山比一比。想像羅得當年看到的「滋潤之地」大概就是這個樣子。",
      en: "🍅 Mission: Look at the farms around you and compare them with the bare hills by the Dead Sea. Imagine this is something like the 'well-watered' land Lot saw."
    },
    quiz: {
      q: { zh: "「瑣珥」這個名字是什麼意思？", en: "What does the name 'Zoar' mean?" },
      options: [{ zh: "鹽", en: "Salt" }, { zh: "小", en: "Little" }, { zh: "泉水", en: "Spring" }],
      answer: 1
    },
    howto: {
      zh: "在死海公路南段，從死海北邊的度假飯店區往南開約 1 小時 15 分。鎮上有加油站和小商店，可以和羅得洞、地球最低點博物館排在一起，再往東上山去卡拉克（約 1 小時）。",
      en: "On the southern stretch of the Dead Sea highway, about 1 hour 15 minutes' drive south of the northern Dead Sea resort area. The town has gas stations and small shops. Combine it with Lot's Cave and the Museum at the Lowest Place on Earth, then head east up into the hills to Kerak (about 1 hour)."
    },
    photo: null
  },

  sodom: {
    name: { zh: "所多瑪與蛾摩拉", en: "Sodom and Gomorrah" },
    place: { zh: "位置不確定，可能在死海南端或北端", en: "Location uncertain, possibly at the south or north end of the Dead Sea" },
    hidden: true,
    certainty: "unknown",
    verses: ["Gen 19:26", "Luke 17:32"],
    story: {
      zh: "所多瑪城的罪惡極重，神決定毀滅它。亞伯拉罕為這城向神求情，神答應：只要城裡有十個義人，就不毀滅。結果連十個都沒有。天使拉著羅得一家的手把他們帶出城，吩咐他們不可回頭看。羅得的妻子卻在後邊回頭一看，就變成了一根鹽柱。耶穌後來提醒門徒：「你們要回想羅得的妻子。」所多瑪和蛾摩拉到底在哪裡，學者到現在還沒有定論：傳統說法在死海南端，也有人認為在北端，例如第 4 章的什亭 Tall el-Hammam。所以這是隱藏關卡。照片是死海西岸的一根鹽岩柱，當地人叫它「羅得的妻子」。",
      en: "Sodom's sin was grievous, and God decided to destroy it. Abraham pleaded with God for the city, and God agreed not to destroy it if even ten righteous people were found there. There weren't even ten. The angels took Lot's family by the hand and led them out, telling them not to look back. But Lot's wife looked back and became a pillar of salt. Jesus later warned his disciples, 'Remember Lot's wife.' Where Sodom and Gomorrah actually stood is still debated: tradition places them at the south end of the Dead Sea, while others argue for the north end, for example Tall el-Hammam (Shittim in Chapter 4). So this is a hidden level. The photo shows a salt-rock pillar on the Dead Sea's western shore that locals call 'Lot's Wife.'"
    },
    reflect: {
      zh: "羅得的妻子人已經走出來了，心卻還留在所多瑪。有沒有什麼是神要你放下、你卻一直回頭看的？",
      en: "Lot's wife had left the city with her feet, but her heart was still in Sodom. Is there something God is asking you to let go of that you keep looking back at?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完創世記 18 章 16 節到 19 章 29 節，再回來答題。",
      en: "🔒 Hidden mission: Read Genesis 18:16–19:29, then come back for the quiz."
    },
    quiz: {
      q: { zh: "羅得的妻子回頭一看，變成了什麼？", en: "What did Lot's wife become when she looked back?" },
      options: [{ zh: "一塊石頭", en: "A stone" }, { zh: "一根鹽柱", en: "A pillar of salt" }, { zh: "一棵樹", en: "A tree" }],
      answer: 1
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: "sodom"
  },

  zered: {
    name: { zh: "撒烈溪（Wadi al-Hasa）", en: "The Brook Zered (Wadi al-Hasa)" },
    place: { zh: "摩押和以東交界的大峽谷，君王大道從谷底穿過", en: "The great canyon on the border of Moab and Edom, crossed by the King's Highway" },
    lat: 30.965, lng: 35.7307, radius: 3000, approx: true,
    points: [{ lat: 31.02701, lng: 35.48533 }],
    certainty: "yes",
    verses: ["Deut 2:13-14"],
    story: {
      zh: "撒烈溪是摩押南邊的界河，過了河就是以東。神對以色列人說：「現在，起來過撒烈溪！」摩西接著寫下一句很重的話：從加低斯巴尼亞出來，到過撒烈溪，一共三十八年，等到那一代不信神、不敢進迦南的戰士都死光了。也就是說，走到這條溪邊，曠野漂流才真正結束，新的一代開始往應許之地前進。今天這條峽谷叫 Wadi al-Hasa，君王大道要彎彎曲曲下到谷底再爬上去；峽谷的出口在死海南端、靠近瑣珥。",
      en: "The Zered was the border stream at Moab's southern edge; beyond it lay Edom. God told Israel, 'Rise up and cross over the brook Zered.' Then Moses added a sobering line: from leaving Kadesh Barnea until crossing the Zered took thirty-eight years—until the whole generation of fighting men who had refused to trust God and enter Canaan had died. In other words, reaching this stream marked the real end of the wilderness wandering, as a new generation began moving toward the Promised Land. Today the canyon is called Wadi al-Hasa; the King's Highway winds down to the bottom and climbs out again, and the canyon opens onto the south end of the Dead Sea near Zoar."
    },
    reflect: {
      zh: "三十八年繞圈子，才走到這條溪邊。你生命中有沒有一段「繞了很久」的路？回頭看，神在那段路上教了你什麼？",
      en: "Thirty-eight years of going in circles before reaching this stream. Is there a stretch of your life where you 'wandered' a long time? Looking back, what did God teach you on that road?"
    },
    mission: {
      zh: "🏞️ 任務：在君王大道下到谷底的路上，找安全的地方停車，看看峽谷有多深。想像幾十萬以色列人帶著牛羊，從這裡走下去再爬上來。",
      en: "🏞️ Mission: On the King's Highway descent, find a safe place to pull over and see how deep the canyon is. Imagine hundreds of thousands of Israelites with their flocks walking down and climbing back up here."
    },
    quiz: {
      q: { zh: "從加低斯巴尼亞到過撒烈溪，以色列人走了多少年？", en: "How many years passed from Kadesh Barnea to crossing the Zered?" },
      options: [{ zh: "七年", en: "Seven years" }, { zh: "三十八年", en: "Thirty-eight years" }, { zh: "四十年", en: "Forty years" }],
      answer: 1
    },
    howto: {
      zh: "從卡拉克沿君王大道（35 號公路）往南開約 40 分鐘，公路會下到峽谷底再爬上南岸，整段都在蓋章範圍內。另一個蓋章點在死海公路南段、Ghor es-Safi 附近的峽谷出口，可以和瑣珥、羅得洞排在一起。山路彎多又陡，慢慢開。",
      en: "From Kerak, drive about 40 minutes south on the King's Highway (Route 35); the road drops to the canyon floor and climbs the south side, and the whole stretch counts. The other stamp point is the canyon mouth on the southern Dead Sea highway near Ghor es-Safi—easy to combine with Zoar and Lot's Cave. The mountain road is steep with many bends, so drive slowly."
    },
    photo: null
  },

  bozrah: {
    name: { zh: "波斯拉（以東的京城）", en: "Bozrah (Capital of Edom)" },
    place: { zh: "Busayra 村旁的以東王城遺址", en: "Ruins of the Edomite royal city beside the village of Busayra" },
    lat: 30.7384, lng: 35.6064, radius: 1000,
    certainty: "yes",
    verses: ["Isa 63:1", "Gen 36:8"],
    story: {
      zh: "以東人是以掃的後代。以掃曾經為了一碗紅豆湯賣了長子的名分，所以又叫「以東」，意思是「紅」。波斯拉是以東最重要的城，創世記列出的以東王裡就有一位來自波斯拉。先知們常拿波斯拉代表整個以東，以賽亞書 63 章有一幅很震撼的畫面：「這從以東的波斯拉來，穿紅衣服……是誰呢？」那是一位為百姓伸冤、得勝歸來的戰士，許多基督徒把這段讀成彌賽亞的預表。1970 年代考古學家在這裡挖出以東時期的宮殿和神廟，證明這裡曾經是以東的首都。",
      en: "The Edomites descended from Esau. Esau once sold his birthright for a bowl of red stew, so he was also called Edom, meaning 'red.' Bozrah was Edom's most important city; one of the Edomite kings listed in Genesis came from Bozrah. The prophets often used Bozrah to stand for all of Edom, and Isaiah 63 paints a striking picture: 'Who is this who comes from Edom, with dyed garments from Bozrah?' It is a victorious warrior returning after bringing justice for his people, a passage many Christians read as pointing to the Messiah. In the 1970s archaeologists uncovered an Edomite-period palace and temple here, confirming it was once Edom's capital."
    },
    reflect: {
      zh: "以掃為了一時的飢餓，放掉了長遠的祝福。你最近有沒有為了眼前的「一碗湯」，差點放掉更重要的東西？",
      en: "Esau gave up a lasting blessing for a moment's hunger. Have you recently been tempted to trade something important for a 'bowl of stew' right in front of you?"
    },
    mission: {
      zh: "🔴 任務：看看遺址四周岩石和泥土的顏色，找找看哪裡最「紅」。以東（紅）這個名字，也很符合這一帶紅色的山。",
      en: "🔴 Mission: Look at the color of the rocks and soil around the ruins and find the 'reddest' spot. The name Edom ('red') suits the red mountains of this region."
    },
    quiz: {
      q: { zh: "「以東」這個名字是什麼意思？", en: "What does the name 'Edom' mean?" },
      options: [{ zh: "紅", en: "Red" }, { zh: "山", en: "Mountain" }, { zh: "長子", en: "Firstborn" }],
      answer: 0
    },
    howto: {
      zh: "在塔菲拉南邊約 20 分鐘車程的 Busayra 村，沿君王大道就會經過。遺址就在村子旁邊，沒有遊客中心，也沒有門票，看得到石牆和房間的基礎。往西不遠就是丹娜自然保護區，可以排在同一天。",
      en: "In the village of Busayra, about 20 minutes' drive south of Tafila along the King's Highway. The ruins are right beside the village, with no visitor center or ticket; you can see stone walls and room foundations. The Dana Biosphere Reserve is a short way west, so you can combine them in one day."
    },
    photo: "bozrah"
  },

  tophel: {
    name: { zh: "陀弗（塔菲拉）", en: "Tophel (Tafila)" },
    place: { zh: "以東高原上的塔菲拉市", en: "The town of Tafila on the Edomite highlands" },
    lat: 30.8375, lng: 35.604167, radius: 2500,
    certainty: "unknown",
    verses: ["Deut 1:1"],
    story: {
      zh: "申命記一開頭就說，這是摩西在約旦河東的曠野，在「巴蘭、陀弗、拉班、哈洗錄、底撒哈中間」對以色列眾人說的話。陀弗只在聖經出現這一次，因為名字跟今天的塔菲拉（Tafila）很像，有人認為就是這裡，但學者還沒有定論。塔菲拉是約旦南部的山城，四周是橄欖園，冬天有時還會下雪。",
      en: "Deuteronomy opens by saying these are the words Moses spoke to all Israel in the wilderness east of the Jordan, 'between Paran, Tophel, Laban, Hazeroth, and Dizahab.' Tophel appears only once in the Bible. Because the name sounds so much like today's Tafila, some think this is the place, but scholars haven't settled it. Tafila is a hill town in southern Jordan surrounded by olive groves, and it sometimes even snows here in winter."
    },
    reflect: {
      zh: "陀弗在聖經裡只出現一次，卻被記下來了。在神的故事裡，沒有一個地方、一個人是多餘的。你覺得自己在哪裡被忽略了？神看見了嗎？",
      en: "Tophel appears just once in the Bible, yet it was recorded. In God's story, no place and no person is superfluous. Where do you feel overlooked? Does God see it?"
    },
    mission: {
      zh: "🫒 任務：在塔菲拉找一片橄欖園，或在市區找間小店喝杯茶，跟當地人聊聊這座城的名字。",
      en: "🫒 Mission: Find an olive grove in Tafila, or have tea at a small shop in town and chat with locals about the town's name."
    },
    quiz: {
      q: { zh: "陀弗這個地名在聖經裡出現幾次？", en: "How many times does the name Tophel appear in the Bible?" },
      options: [{ zh: "一次", en: "Once" }, { zh: "七次", en: "Seven times" }, { zh: "五十次", en: "Fifty times" }],
      answer: 0
    },
    howto: {
      zh: "從卡拉克沿君王大道往南約 1 小時（過了撒烈溪再往上爬）。塔菲拉是省會，有加油站、餐廳和商店，適合在這裡休息、吃午餐。⚠️ 陀弗是不是塔菲拉還沒有定論，蓋章是紀念申命記開頭的這段話。",
      en: "About 1 hour south of Kerak on the King's Highway (climbing up after the Zered canyon). Tafila is a provincial capital with gas stations, restaurants and shops—a good place for a break and lunch. ⚠️ Whether Tophel is Tafila isn't settled; this stamp remembers the opening lines of Deuteronomy."
    },
    photo: "tophel"
  },

  sela: {
    name: { zh: "西拉（以東的磐石堡壘）", en: "Sela (Edom's Rock Fortress)" },
    place: { zh: "as-Sela 村旁的岩山堡壘", en: "The rock-mountain fortress beside the village of as-Sela" },
    lat: 30.7819, lng: 35.5754, radius: 1000,
    certainty: "likely",
    noFacilities: true,
    verses: ["2 Kgs 14:7"],
    story: {
      zh: "「西拉」的意思就是「磐石」。猶大王亞瑪謝在鹽谷殺了一萬以東人，又攻取了西拉，改名叫約帖。這座岩山四面幾乎都是峭壁，只有一條在岩縫裡鑿出來的階梯可以上去，難怪俄巴底亞先知形容以東人「住在山穴中、居所在高處」，以為沒人拉得下他們。在山壁上很高的地方，還刻著巴比倫最後一位王拿波尼度的浮雕和銘文，大約是主前六世紀刻的，學者要用繩索垂降才能靠近研究。",
      en: "'Sela' means 'rock.' King Amaziah of Judah killed ten thousand Edomites in the Valley of Salt, then captured Sela and renamed it Joktheel. This rock mountain is almost entirely surrounded by cliffs, with just one staircase cut into a cleft in the rock leading up—no wonder the prophet Obadiah described Edom as 'you who dwell in the clefts of the rock, whose habitation is high,' thinking no one could bring them down. High on the cliff face is a relief and inscription of Nabonidus, the last king of Babylon, carved around the 6th century BC; researchers have had to rappel down on ropes to study it."
    },
    reflect: {
      zh: "以東人以為住在高高的磐石上就很安全。你最常把安全感建立在什麼「磐石」上？是存款、能力、人脈，還是神？",
      en: "Edom thought living high on the rock made them safe. What 'rock' do you most often build your sense of security on—savings, skills, connections, or God?"
    },
    mission: {
      zh: "🧗 任務：從村子這邊看看整座岩山，找找看岩縫裡的階梯從哪裡開始。眼力好的話，試著在峭壁上找拿波尼度的浮雕。",
      en: "🧗 Mission: Take in the whole rock mountain from the village side and look for where the staircase in the cleft begins. If your eyes are sharp, try to spot Nabonidus' relief on the cliff."
    },
    quiz: {
      q: { zh: "「西拉」這個名字是什麼意思？", en: "What does the name 'Sela' mean?" },
      options: [{ zh: "鹽", en: "Salt" }, { zh: "磐石", en: "Rock" }, { zh: "高塔", en: "Tower" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 沒有遊客設施，能不能上去、路況如何都還沒確認。在塔菲拉和波斯拉之間，從君王大道往西轉進 as-Sela 村。上山只有岩縫裡的古老階梯，又陡又窄，不建議單獨攀爬，也不要在雨天去。在村子這邊看岩山就可以蓋章。",
      en: "⚠️ No visitor facilities; access and conditions haven't been confirmed. It's between Tafila and Bozrah—turn west off the King's Highway into the village of as-Sela. The only way up is an ancient staircase in a rock cleft, steep and narrow; don't climb alone, and avoid rainy days. Viewing the rock from the village is enough to earn the stamp."
    },
    photo: "sela"
  },

  punon: {
    name: { zh: "普嫩（Feinan 銅礦谷）", en: "Punon (The Copper Valley of Feinan)" },
    place: { zh: "亞拉巴谷東邊的 Khirbet Faynan 遺址", en: "The ruins of Khirbet Faynan on the east side of the Arabah valley" },
    lat: 30.62775, lng: 35.493647, radius: 1500,
    certainty: "yes",
    noFacilities: true,
    verses: ["Num 33:42", "Num 21:9", "John 3:14"],
    story: {
      zh: "以色列人在曠野的路線表裡，有一站就是普嫩。這裡是古代中東最大的銅礦區之一，山谷裡到處是黑色的煉銅爐渣。民數記 21 章記載，百姓繞著以東地走、心裡煩躁、埋怨神，就有火蛇進到營中；摩西照神的吩咐造了一條銅蛇掛在杆子上，被咬的人一望，就活了。聖經沒說銅蛇是在哪裡造的，但因為普嫩就在這條路上、又盛產銅，有學者推測跟這裡有關。耶穌後來說：「摩西在曠野怎樣舉蛇，人子也必照樣被舉起來。」到了羅馬時代，這裡叫 Phaeno，史學家優西比烏記載，有基督徒因為信仰被判到這裡的銅礦做苦工，甚至殉道。",
      en: "One of the stops in Israel's wilderness itinerary is Punon. This was one of the largest copper-mining areas of the ancient Middle East, and the valley is still scattered with black copper slag. Numbers 21 records that as the people went around Edom, they grew impatient and complained against God, and fiery serpents came into the camp; at God's command Moses made a bronze serpent and set it on a pole, and anyone bitten who looked at it lived. The Bible doesn't say where the serpent was made, but because Punon lay on this route and was rich in copper, some scholars suggest a link. Jesus later said, 'As Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up.' In Roman times the place was called Phaeno, and the historian Eusebius records that Christians were sentenced to hard labor in its copper mines for their faith, and some were martyred here."
    },
    reflect: {
      zh: "被蛇咬的人不用做什麼大事，只要「望一望」就得救。你是不是常常想靠自己努力解決問題，卻忘了抬頭仰望？",
      en: "Those who were bitten didn't have to do anything great—they only had to look. Do you often try to fix things by your own effort and forget to look up?"
    },
    mission: {
      zh: "⚒️ 任務：在地上找找看黑色、像玻璃一樣的煉銅爐渣（看就好，不要帶走），想像幾千年來在這裡挖礦、煉銅的人。",
      en: "⚒️ Mission: Look on the ground for black, glassy copper slag (look only—don't take any) and imagine the people who mined and smelted copper here over thousands of years."
    },
    quiz: {
      q: { zh: "摩西在曠野舉起的是什麼？", en: "What did Moses lift up in the wilderness?" },
      options: [{ zh: "一根杖", en: "A staff" }, { zh: "一條銅蛇", en: "A bronze serpent" }, { zh: "約櫃", en: "The Ark of the Covenant" }],
      answer: 1
    },
    howto: {
      zh: "⚠️ 遺址沒有遊客設施，路況還沒確認。從死海公路南段（亞拉巴谷公路）往東轉進 Qurayqira 村，最後一段是沒有鋪柏油的碎石路，一般車不好走；附近的 Feynan 生態旅館可以安排四輪傳動車，出發前先聯絡確認。谷底夏天非常熱，最好秋冬去，帶足水。",
      en: "⚠️ No visitor facilities at the ruins, and road conditions haven't been confirmed. From the southern Dead Sea (Wadi Araba) highway, turn east into the village of Qurayqira; the last stretch is an unpaved gravel track that's hard on ordinary cars. The nearby Feynan Ecolodge can arrange 4x4 transport—contact them before you go. The valley is extremely hot in summer, so autumn or winter is best; bring plenty of water."
    },
    photo: "punon"
  },

  teman: {
    name: { zh: "提幔（以東的智慧之地）", en: "Teman (Edom's Land of Wisdom)" },
    place: { zh: "位置不確定，可能在波斯拉一帶", en: "Location uncertain, possibly around Bozrah" },
    hidden: true,
    certainty: "unknown",
    verses: ["Jer 49:7", "Job 2:11"],
    story: {
      zh: "提幔是以掃的孫子，他的名字後來變成以東一個地區的名字。提幔以智慧出名，耶利米先知問：「提幔中再沒有智慧嗎？」約伯受苦的時候，來安慰他的三個朋友裡，第一位就是「提幔人以利法」。以利法一開始陪約伯安靜坐了七天，後來卻一直說約伯一定是犯了罪才受苦，最後神說他們講的不對。提幔確切在哪裡，學者還不確定，所以這是隱藏關卡。",
      en: "Teman was a grandson of Esau, and his name later became the name of a region of Edom. Teman was famous for wisdom; the prophet Jeremiah asked, 'Is wisdom no more in Teman?' When Job was suffering, the first of the three friends who came to comfort him was 'Eliphaz the Temanite.' Eliphaz began by sitting silently with Job for seven days, but then kept insisting Job must have sinned to suffer so; in the end God said they had not spoken rightly. Teman's exact location is uncertain, so this is a hidden level."
    },
    reflect: {
      zh: "以利法最好的安慰，是剛開始陪約伯安靜坐著的那七天。朋友受苦的時候，你比較常急著給答案，還是願意先陪著？",
      en: "Eliphaz's best comfort was the first seven days he sat silently with Job. When a friend is suffering, are you quicker to give answers, or willing to simply stay with them first?"
    },
    mission: {
      zh: "🔒 隱藏任務：讀完約伯記 2 章 11～13 節和 42 章 7～9 節，再回來答題。",
      en: "🔒 Hidden mission: Read Job 2:11–13 and 42:7–9, then come back for the quiz."
    },
    quiz: {
      q: { zh: "約伯的朋友裡，誰是提幔人？", en: "Which of Job's friends was from Teman?" },
      options: [{ zh: "以利法", en: "Eliphaz" }, { zh: "比勒達", en: "Bildad" }, { zh: "瑣法", en: "Zophar" }],
      answer: 0
    },
    howto: {
      zh: "這是隱藏關卡：確切位置不知道，不需要到現場。答對上面的問答就能解鎖印章。",
      en: "This is a hidden level: the exact location is unknown, so you don't need to visit. Answer the quiz correctly to unlock the stamp."
    },
    photo: null
  }
};

// 稱號：依蓋章數升級；all: true＝全部地點都蓋完才拿得到（以後加新章節也不用改）
window.TITLES = [
  { min: 0, zh: "旅人", en: "Traveler" },
  { min: 2, zh: "尋路人", en: "Seeker" },
  { min: 5, zh: "朝聖者", en: "Pilgrim" },
  { min: 9, zh: "守望者", en: "Watchman" },
  { all: true, zh: "約旦河東見證人", en: "Witness Beyond the Jordan" }
];

// Google 地圖導航用的目的地（給自己開車的人）
// 有正式入口的景點用「景點名稱」，Google 會帶到遊客中心／停車場；沒列在這裡的站，用上面的座標導航。
// 受洗處和以利亞山丘都要先到遊客中心買票、搭接駁車，所以兩站都導航到同一個景點。
// 每個名稱都在 Google 地圖試過（2026-10-30），確認會直接找到該地點；找不到單一地點的（例如 Mar Elias）改用座標。
window.NAV = {
  gadara: "Umm Qais Archaeological Site, Jordan",
  gerasa: "Ancient City of Jerash",
  irbid: "Dar As-Saraya Museum, Irbid, Jordan",
  jabbok: "King Talal Dam, Jordan",
  succoth: "Tell Deir Alla, Jordan",
  citadel: "Amman Citadel, Amman, Jordan",
  theatre: "Roman Theater, Amman, Jordan",
  jubeiha: "Al Jubeiha, Amman, Jordan",
  bethany: "Baptism Site of Jesus Christ",
  elijah: "Baptism Site of Jesus Christ",
  nebo: "Memorial of Moses, Mount Nebo, Jordan",
  madaba: "St. George's Church, Madaba, Jordan",
  heshbon: "Tell Hesban, Jordan",
  machaerus: "Mukawir Castle",
  mephaath: "Umm ar-Rasas",
  arnon: "Wadi Mujib Viewpoint",
  kerak: "Kerak Castle"
};
