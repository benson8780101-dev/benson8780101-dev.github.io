// 約旦聖經足跡：試玩版內容（第 4、5 章）
// 每一段文字都有 zh（繁體中文）和 en（英文），兩種語言一定要一起改。
// 座標來源：OpenBible.info 聖經地理資料庫（CC BY 4.0）；標「approx: true」的是大約位置，待實地確認。
// certainty：yes＝學者大多同意｜likely＝可能｜tradition＝傳統說法｜area＝一整個區域

window.CHAPTERS = [
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
  }
];

window.STATIONS = {
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
  }
};

// 稱號：依蓋章數升級
window.TITLES = [
  { min: 0, zh: "旅人", en: "Traveler" },
  { min: 2, zh: "尋路人", en: "Seeker" },
  { min: 4, zh: "朝聖者", en: "Pilgrim" },
  { min: 7, zh: "守望者", en: "Watchman" },
  { min: 10, zh: "約旦河東見證人", en: "Witness Beyond the Jordan" }
];
