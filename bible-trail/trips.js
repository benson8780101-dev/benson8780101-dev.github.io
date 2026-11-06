// 現成行程（3／5／7 天）：給自己開車的自助旅行者。stops 是地點代號，照順序走，都從安曼出發。
// 每段文字都有中文、英文、巴西葡萄牙文、挪威文四語（這個檔案四語放在一起，改的時候四種一起改）。
// 車程是大約時間，沒算停留和塞車；出發前看一下 Google 地圖。
window.ITINERARIES = [
 {
  "id": "d3",
  "title": {
   "zh": "3 天：南線精華",
   "en": "3 Days: Southern Highlights",
   "pt": "3 dias: o melhor do sul",
   "no": "3 dager: Høydepunkter i sør"
  },
  "intro": {
   "zh": "時間不多的人：約旦河、尼波山、君王大道、佩特拉。走得到主線 6 章，但不含北部和亞喀巴，所以還拿不到證書。",
   "en": "Short on time: the Jordan River, Mount Nebo, the King's Highway and Petra. You'll cover six chapters of the main trail, but not the north or Aqaba, so not the certificate yet.",
   "pt": "Para quem tem pouco tempo: o rio Jordão, o monte Nebo, a Estrada dos Reis e Petra. Você passa por seis capítulos da trilha principal, mas não pelo norte nem por Ácaba, então ainda não ganha o certificado.",
   "no": "For deg som har dårlig tid: Jordanelva, Nebo-fjellet, Kongeveien og Petra. Du får med deg seks kapitler av hovedstien, men ikke nord eller Aqaba, så diplomet får du ikke ennå."
  },
  "days": [
   {
    "stops": [
     "citadel",
     "theatre",
     "bethany",
     "elijah",
     "nebo",
     "madaba"
    ],
    "note": {
     "zh": "早上安曼城堡和羅馬劇場，在市中心吃 ful 當早餐。中午開 1 小時到受洗處，下午上尼波山看夕陽，晚上住馬達巴。",
     "en": "Morning at the Amman Citadel and Roman Theater, with ful for breakfast downtown. Drive an hour to the Baptism Site for midday, then Mount Nebo for sunset; sleep in Madaba.",
     "pt": "Manhã na Cidadela de Amã e no Teatro Romano, com fūl no café da manhã no centro. Uma hora de carro até o Local do Batismo ao meio-dia, depois o monte Nebo para o pôr do sol; durma em Madaba.",
     "no": "Morgen ved citadellet og det romerske teatret i Amman, med ful til frokost i sentrum. Kjør en time til dåpsstedet midt på dagen, så Nebo-fjellet i solnedgangen; overnatt i Madaba."
    },
    "sleep": {
     "zh": "馬達巴",
     "en": "Madaba",
     "pt": "Madaba",
     "no": "Madaba"
    }
   },
   {
    "stops": [
     "machaerus",
     "dibon",
     "arnon",
     "kingshighway",
     "kerak",
     "zered",
     "bozrah"
    ],
    "note": {
     "zh": "沿君王大道一路往南，光開車就要 5～6 小時，早上 7 點前出發。午餐在卡拉克吃 mansaf，傍晚到 Wadi Musa。",
     "en": "Head south the whole way on the King's Highway—5 to 6 hours of driving alone, so leave before 7 a.m. Lunch on mansaf in Kerak; reach Wadi Musa by evening.",
     "pt": "Desça para o sul pela Estrada dos Reis o dia inteiro — só de carro são 5 a 6 horas, então saia antes das 7h. Almoço de mansaf em Kerak; chegue a Wadi Musa à noite.",
     "no": "Kjør sørover hele veien langs Kongeveien – 5 til 6 timer bare med kjøring, så dra før kl. 7. Lunsj med mansaf i Kerak; fremme i Wadi Musa om kvelden."
    },
    "sleep": {
     "zh": "Wadi Musa（佩特拉）",
     "en": "Wadi Musa (Petra)",
     "pt": "Wadi Musa (Petra)",
     "no": "Wadi Musa (Petra)"
    }
   },
   {
    "stops": [
     "ainmusa",
     "petra",
     "seir"
    ],
    "note": {
     "zh": "早上先到摩西泉，再進佩特拉待一整天。體力好的話爬到山上的修道院。",
     "en": "Stop at Moses' Spring first, then spend the whole day in Petra. If you have the energy, climb up to the Monastery.",
     "pt": "Passe primeiro na Fonte de Moisés e depois fique o dia inteiro em Petra. Se tiver fôlego, suba até o Mosteiro.",
     "no": "Stopp først ved Moses’ kilde, og bruk så hele dagen i Petra. Har du krefter igjen, kan du gå opp til Klosteret."
    },
    "sleep": {
     "zh": "Wadi Musa，或開 2 小時到亞喀巴",
     "en": "Wadi Musa, or drive 2 hours to Aqaba",
     "pt": "Wadi Musa, ou 2 horas de carro até Ácaba",
     "no": "Wadi Musa, eller kjør 2 timer til Aqaba"
    }
   }
  ]
 },
 {
  "id": "d5",
  "title": {
   "zh": "5 天：剛好拿到破關證書",
   "en": "5 Days: Just Enough for the Certificate",
   "pt": "5 dias: o suficiente para o certificado",
   "no": "5 dager: Akkurat nok til diplomet"
  },
  "intro": {
   "zh": "走完主線九章全部 17 個「必去」站，第 5 天傍晚在紅海邊領證書。每天都排得滿，喜歡慢慢走的人可以在佩特拉多住一晚。",
   "en": "Visit all 17 must-see stops of the nine main chapters and claim your certificate by the Red Sea on the evening of day 5. Every day is full; if you like a slower pace, add an extra night at Petra.",
   "pt": "Visite as 17 paradas obrigatórias dos nove capítulos principais e pegue seu certificado à beira do mar Vermelho na noite do 5º dia. Todos os dias são cheios; se preferir um ritmo mais calmo, acrescente uma noite em Petra.",
   "no": "Besøk alle de 17 stedene som må sees i de ni hovedkapitlene, og hent diplomet ved Rødehavet på kvelden dag 5. Alle dagene er fulle; liker du et roligere tempo, kan du legge til en ekstra natt i Petra."
  },
  "days": [
   {
    "stops": [
     "gerasa",
     "tishbe",
     "gadara"
    ],
    "note": {
     "zh": "安曼 → 傑拉什（50 分鐘）→ 阿傑隆的 Mar Elias（40 分鐘）→ Umm Qais（1 小時），在加大拉看加利利海的夕陽。",
     "en": "Amman → Jerash (50 min) → Mar Elias near Ajloun (40 min) → Umm Qais (1 hr) for sunset over the Sea of Galilee at Gadara.",
     "pt": "Amã → Jerash (50 min) → Mar Elias, perto de Ajloun (40 min) → Umm Qais (1 h) para o pôr do sol sobre o mar da Galileia em Gadara.",
     "no": "Amman → Jerash (50 min) → Mar Elias ved Ajloun (40 min) → Umm Qais (1 t) for solnedgangen over Genesaretsjøen fra Gadara."
    },
    "sleep": {
     "zh": "伊爾比德或 Umm Qais",
     "en": "Irbid or Umm Qais",
     "pt": "Irbid ou Umm Qais",
     "no": "Irbid eller Umm Qais"
    }
   },
   {
    "stops": [
     "pella",
     "succoth",
     "jabbok",
     "citadel"
    ],
    "note": {
     "zh": "下到約旦河谷：佩拉 → 往南到疏割 → 塔拉勒國王水壩（雅博河）→ 傍晚回安曼城堡。",
     "en": "Down into the Jordan Valley: Pella → south to Succoth → King Talal Dam (the Jabbok) → back to the Amman Citadel by late afternoon.",
     "pt": "Desça ao vale do Jordão: Pela → para o sul até Sucote → represa do Rei Talal (o Jaboque) → de volta à Cidadela de Amã no fim da tarde.",
     "no": "Ned i Jordandalen: Pella → sørover til Sukkot → King Talal-demningen (Jabbok) → tilbake til citadellet i Amman sent på ettermiddagen."
    },
    "sleep": {
     "zh": "安曼",
     "en": "Amman",
     "pt": "Amã",
     "no": "Amman"
    }
   },
   {
    "stops": [
     "bethany",
     "elijah",
     "deadsea",
     "nebo",
     "madaba"
    ],
    "note": {
     "zh": "早上受洗處，中午在死海漂浮，下午上尼波山，晚上住馬達巴。",
     "en": "Baptism Site in the morning, float in the Dead Sea at midday, Mount Nebo in the afternoon, and sleep in Madaba.",
     "pt": "Local do Batismo de manhã, flutuar no mar Morto ao meio-dia, monte Nebo à tarde e dormir em Madaba.",
     "no": "Dåpsstedet om morgenen, flyt i Dødehavet midt på dagen, Nebo-fjellet om ettermiddagen og overnatting i Madaba."
    },
    "sleep": {
     "zh": "馬達巴",
     "en": "Madaba",
     "pt": "Madaba",
     "no": "Madaba"
    }
   },
   {
    "stops": [
     "machaerus",
     "dibon",
     "arnon",
     "kerak",
     "zered",
     "bozrah"
    ],
    "note": {
     "zh": "君王大道整天往南，早上 7 點前出發。午餐在卡拉克，傍晚到 Wadi Musa。",
     "en": "A full day south on the King's Highway; leave before 7 a.m. Lunch in Kerak, Wadi Musa by evening.",
     "pt": "Um dia inteiro para o sul pela Estrada dos Reis; saia antes das 7h. Almoço em Kerak, Wadi Musa à noite.",
     "no": "En hel dag sørover langs Kongeveien; dra før kl. 7. Lunsj i Kerak, Wadi Musa om kvelden."
    },
    "sleep": {
     "zh": "Wadi Musa（佩特拉）",
     "en": "Wadi Musa (Petra)",
     "pt": "Wadi Musa (Petra)",
     "no": "Wadi Musa (Petra)"
    }
   },
   {
    "stops": [
     "petra",
     "elath"
    ],
    "note": {
     "zh": "一早進佩特拉，至少待半天；下午開 2 小時到亞喀巴，傍晚把手放進紅海，在護照分頁領證書。",
     "en": "Into Petra early for at least half a day; in the afternoon drive 2 hours to Aqaba, put your hand in the Red Sea at dusk, and claim your certificate in the Passport tab.",
     "pt": "Entre cedo em Petra e fique pelo menos meio dia; à tarde, 2 horas de carro até Ácaba, coloque a mão no mar Vermelho ao entardecer e pegue o certificado na aba Passaporte.",
     "no": "Tidlig inn i Petra i minst en halv dag; om ettermiddagen kjører du 2 timer til Aqaba, stikker hånden i Rødehavet i skumringen og henter diplomet i fanen Pass."
    },
    "sleep": {
     "zh": "亞喀巴",
     "en": "Aqaba",
     "pt": "Ácaba",
     "no": "Aqaba"
    }
   }
  ]
 },
 {
  "id": "d7",
  "title": {
   "zh": "7 天：慢慢走，加上支線",
   "en": "7 Days: Slow Pace, with Side Trails",
   "pt": "7 dias: sem pressa, com as trilhas extras",
   "no": "7 dager: Rolig tempo, med sidestier"
  },
  "intro": {
   "zh": "主線 17 個必去站全部走到，也拿得到證書；每天留時間讀經、想一想，順路加上幾個支線的地點。最推薦的走法。",
   "en": "All 17 must-see stops of the main trail (so you'll earn the certificate), with time each day to read and reflect, plus side-trail stops along the way. Our top recommendation.",
   "pt": "Todas as 17 paradas obrigatórias da trilha principal (então você ganha o certificado), com tempo cada dia para ler e refletir, e paradas das trilhas extras pelo caminho. É a nossa recomendação.",
   "no": "Alle de 17 stedene som må sees på hovedstien (så du får diplomet), med tid hver dag til å lese og tenke, og steder fra sidestiene underveis. Vår beste anbefaling."
  },
  "days": [
   {
    "stops": [
     "citadel",
     "theatre",
     "jubeiha"
    ],
    "note": {
     "zh": "第一天輕鬆走安曼：城堡、羅馬劇場，在市中心吃 ful。先把 App 裡的隱藏關卡讀一讀，出發前就能先拿到幾個章。",
     "en": "An easy first day in Amman: the Citadel and Roman Theater, with ful downtown. Read through the hidden levels in the app tonight—you can earn several stamps before you even set out.",
     "pt": "Um primeiro dia tranquilo em Amã: a Cidadela e o Teatro Romano, com fūl no centro. À noite, leia as fases secretas no app — dá para ganhar vários carimbos antes mesmo de sair.",
     "no": "En rolig første dag i Amman: citadellet og det romerske teatret, med ful i sentrum. Les gjennom de skjulte nivåene i appen i kveld – du kan få flere stempler før du i det hele tatt drar."
    },
    "sleep": {
     "zh": "安曼",
     "en": "Amman",
     "pt": "Amã",
     "no": "Amman"
    }
   },
   {
    "stops": [
     "gerasa",
     "anjara",
     "tishbe",
     "gadara"
    ],
    "note": {
     "zh": "北部山區：傑拉什 → 安佳拉 → 以利亞的家鄉 → Umm Qais 看夕陽。10～12 月可以順路去油坊看榨橄欖油。",
     "en": "The northern hills: Jerash → Anjara → Elijah's hometown → Umm Qais for sunset. October to December, stop at an olive press along the way.",
     "pt": "As colinas do norte: Jerash → Anjara → a terra de Elias → Umm Qais para o pôr do sol. De outubro a dezembro, pare num lagar de azeite pelo caminho.",
     "no": "Åsene i nord: Jerash → Anjara → Elias’ hjemtrakter → Umm Qais for solnedgangen. Fra oktober til desember kan du stoppe ved en olivenpresse underveis."
    },
    "sleep": {
     "zh": "伊爾比德或 Umm Qais",
     "en": "Irbid or Umm Qais",
     "pt": "Irbid ou Umm Qais",
     "no": "Irbid eller Umm Qais"
    }
   },
   {
    "stops": [
     "pella",
     "abelmeholah",
     "zaphon",
     "succoth",
     "adam",
     "jabbok"
    ],
    "note": {
     "zh": "沿約旦河谷往南：以利沙、示播列、河水停住的亞當城，最後到雅博河。傍晚下到死海邊住。",
     "en": "South along the Jordan Valley: Elisha, Shibboleth, and Adam where the river stopped, ending at the Jabbok. Drive down to the Dead Sea for the night.",
     "pt": "Para o sul pelo vale do Jordão: Eliseu, o Chibolete e Adã, onde o rio parou, terminando no Jaboque. Desça ao mar Morto para dormir.",
     "no": "Sørover gjennom Jordandalen: Elisa, sjibbolet og Adam der elva stanset, og til slutt Jabbok. Kjør ned til Dødehavet for natten."
    },
    "sleep": {
     "zh": "死海北岸",
     "en": "Northern Dead Sea",
     "pt": "Norte do mar Morto",
     "no": "Nordlige Dødehavet"
    }
   },
   {
    "stops": [
     "bethany",
     "elijah",
     "shittim",
     "deadsea",
     "nebo",
     "balaam",
     "madaba"
    ],
    "note": {
     "zh": "早上受洗處，中午在死海漂浮、讀以西結書 47 章，下午上尼波山、巴蘭祝福的山脊，晚上住馬達巴。",
     "en": "Baptism Site in the morning, float in the Dead Sea and read Ezekiel 47 at midday, then Mount Nebo and Balaam's ridge in the afternoon; sleep in Madaba.",
     "pt": "Local do Batismo de manhã, flutuar no mar Morto e ler Ezequiel 47 ao meio-dia, depois o monte Nebo e a encosta das bênçãos de Balaão à tarde; durma em Madaba.",
     "no": "Dåpsstedet om morgenen, flyt i Dødehavet og les Esekiel 47 midt på dagen, så Nebo-fjellet og Bileams høydedrag om ettermiddagen; overnatt i Madaba."
    },
    "sleep": {
     "zh": "馬達巴",
     "en": "Madaba",
     "pt": "Madaba",
     "no": "Madaba"
    }
   },
   {
    "stops": [
     "mephaath",
     "machaerus",
     "dibon",
     "arnon",
     "ruthmoab",
     "kerak"
    ],
    "note": {
     "zh": "君王大道北段：米法押的馬賽克、施洗約翰的堡壘、亞嫩河谷，再穿過路得的摩押高原到卡拉克。晚餐吃 mansaf。",
     "en": "The northern King's Highway: the mosaics of Mephaath, John the Baptist's fortress, the Arnon canyon, then across Ruth's Moab plateau to Kerak. Mansaf for dinner.",
     "pt": "O norte da Estrada dos Reis: os mosaicos de Mefaate, a fortaleza de João Batista, o vale do Arnom e depois o planalto de Moabe, terra de Rute, até Kerak. Mansaf no jantar.",
     "no": "Den nordlige delen av Kongeveien: mosaikkene i Mefaat, Johannes døperens festning, Arnon-kløften og så over Moab-platået, Ruts land, til Kerak. Mansaf til middag."
    },
    "sleep": {
     "zh": "卡拉克",
     "en": "Kerak",
     "pt": "Kerak",
     "no": "Kerak"
    }
   },
   {
    "stops": [
     "zered",
     "tophel",
     "bozrah",
     "ainmusa"
    ],
    "note": {
     "zh": "過撒烈溪進入以東：塔菲拉、波斯拉（在以掃的家鄉喝扁豆湯），傍晚到摩西泉和 Wadi Musa。",
     "en": "Cross the Zered into Edom: Tafila and Bozrah (lentil soup in Esau's homeland), reaching Moses' Spring and Wadi Musa by evening.",
     "pt": "Atravesse o Zerede e entre em Edom: Tafila e Bozra (sopa de lentilha na terra de Esaú), chegando à Fonte de Moisés e a Wadi Musa no fim do dia.",
     "no": "Kryss Sered inn i Edom: Tafila og Bosra (linsesuppe i Esaus hjemland), og fremme ved Moses’ kilde og Wadi Musa om kvelden."
    },
    "sleep": {
     "zh": "Wadi Musa（佩特拉）",
     "en": "Wadi Musa (Petra)",
     "pt": "Wadi Musa (Petra)",
     "no": "Wadi Musa (Petra)"
    }
   },
   {
    "stops": [
     "petra",
     "seir",
     "elath",
     "aylachurch"
    ],
    "note": {
     "zh": "早上佩特拉，下午開 2 小時到亞喀巴：古教堂、紅海邊。在海邊領證書，回頭看看這七天。",
     "en": "Petra in the morning, then 2 hours to Aqaba for the ancient church and the Red Sea. Claim your certificate by the shore and look back over the seven days.",
     "pt": "Petra de manhã, depois 2 horas até Ácaba, para a igreja antiga e o mar Vermelho. Pegue o certificado à beira-mar e olhe para trás, para estes sete dias.",
     "no": "Petra om morgenen, så 2 timer til Aqaba for den eldgamle kirken og Rødehavet. Hent diplomet ved stranden og se tilbake på de sju dagene."
    },
    "sleep": {
     "zh": "亞喀巴",
     "en": "Aqaba",
     "pt": "Ácaba",
     "no": "Aqaba"
    }
   }
  ]
 }
];
