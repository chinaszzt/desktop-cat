// ===== i18n: follow the system language (zh / en / ja / ko) =====
// The webview's navigator.language mirrors the OS locale, so detection is
// zero-config. Anything not one of the four supported languages falls back to
// English.

export function detectLang() {
  const raw = ((navigator.languages && navigator.languages[0]) || navigator.language || "en").toLowerCase();
  if (raw.startsWith("zh")) return "zh";
  if (raw.startsWith("ja")) return "ja";
  if (raw.startsWith("ko")) return "ko";
  return "en";
}

export const LANG = detectLang();

// Each language pack mirrors the same shape:
//   ui        — context-menu labels
//   say       — one-off / small-pool speech bubbles
//   eat       — the "just got fed" bubble, per species
//   sounds    — ambient mood pools, per species
//   idleStart — bubble shown as an idle sub-action begins, per species
const PACKS = {
  zh: {
    ui: {
      animal: "动物", color: "毛色", interact: "互动", toys: "玩具", quit: "退出",
      species: { cat: "猫", pig: "猪", bear: "熊" },
      colors: {
        orange: "橘猫", calico: "三花", cow: "奶牛", tabby: "灰虎斑", tuxedo: "黑白",
        pink: "粉猪", cream: "奶白猪", brown: "棕熊", black: "黑熊", polar: "北极熊",
      },
      interactItems: { feed: "投食", sleep: "让她睡一下", goHome: "回窝睡觉", photo: "拍照模式" },
      toyItems: { yarn: "毛线球", ball: "弹力球", paper: "纸团", mouse: "假老鼠", laser: "激光笔", wand: "逗猫棒", cancel: "收起玩具" },
    },
    say: {
      photo: "茄子~ 📸", sleepWell: "睡饱啦~", purr: "咕噜咕噜~", hmph: "哼", burp: "嗝~",
      gift: "给你的~♡", lookGood: "好看吗?", huh: "...?",
      grumpy: ["嘶!", "哼!", "走开!", "别碰!"],
      wave: ["嗨~", "哟~", "你好!"],
      shy: ["...", "唔...", "(///∇///)"],
      toyDone: { yarn: "玩够了~", ball: "嘿!", paper: "...", mouse: "抓住啦!" },
      toyDoneDefault: "玩够了~",
      sneeze: ["啊嚏!", "阿嚏!", "啾!"],
      kiss: ["啾~", "mua~", "啾♡"],
    },
    eat: { cat: "好饱~ 喵呜!", pig: "哼噜~ 好吃!", bear: "嗯~ 好甜~♡" },
    sounds: {
      cat: {
        happy: ["喵~", "喵♪", "咕噜咕噜~", "喵呼~", "喵♡"],
        excited: ["喵!", "喵喵!", "嗷呜!", "喵呜!", "喵—!"],
        curious: ["喵?", "嗯?", "...?", "喵嗯?", "唔?"],
        sleepy: ["唔...", "喵...", "...zzz", "嗯......"],
        grumpy: ["嘶!", "哼!", "fff...", "走开!"],
        shy: ["...", "唔...", "(///)", "嗯?"],
        neutral: ["喵~", "喵喵~", "喵呜~", "咕噜咕噜..."],
      },
      pig: {
        happy: ["哼噜~", "呼噜~", "嘿嘿~", "哼♪"],
        excited: ["哼!", "嘿嘿!", "嗯哼!"],
        curious: ["哼?", "嗯?", "...?"],
        sleepy: ["呼...", "哼...", "..."],
        grumpy: ["哼!", "呼噜!", "走开!"],
        shy: ["...", "唔...", "(///)"],
        neutral: ["哼噜~", "呼~", "嘿~"],
      },
      bear: {
        happy: ["嗷呜~", "嗯~", "呼噜~", "唔~"],
        excited: ["嗷!", "吼!", "呜啊!"],
        curious: ["嗷?", "嗯?", "...?"],
        sleepy: ["呼...", "嗯...", "ZZ..."],
        grumpy: ["吼!", "呼!", "嗷!"],
        shy: ["...", "唔...", "嗯..."],
        neutral: ["嗷~", "嗯~", "呼~"],
      },
    },
    idleStart: {
      knead: { cat: "咕噜咕噜~", pig: "哼噜噜~", bear: "呼噜~" },
      belly_up: { cat: "摸摸我~", pig: "哼~ 摸摸~", bear: "嗷~ 摸摸~" },
      groom: { cat: "舔舔~", pig: "蹭蹭~", bear: "抹抹~" },
      mud_roll: { cat: "哼噜~ 舒服!", pig: "哼噜~ 舒服!", bear: "哼噜~ 舒服!" },
      back_scratch: { cat: "嗷~ 舒服~", pig: "嗷~ 舒服~", bear: "嗷~ 舒服~" },
    },
  },

  en: {
    ui: {
      animal: "Animal", color: "Color", interact: "Play", toys: "Toys", quit: "Quit",
      species: { cat: "Cat", pig: "Pig", bear: "Bear" },
      colors: {
        orange: "Orange", calico: "Calico", cow: "Cow", tabby: "Gray Tabby", tuxedo: "Tuxedo",
        pink: "Pink", cream: "Cream", brown: "Brown", black: "Black", polar: "Polar",
      },
      interactItems: { feed: "Feed", sleep: "Take a nap", goHome: "Go to bed", photo: "Photo mode" },
      toyItems: { yarn: "Yarn ball", ball: "Bouncy ball", paper: "Paper ball", mouse: "Toy mouse", laser: "Laser", wand: "Feather wand", cancel: "Put away" },
    },
    say: {
      photo: "Cheese~ 📸", sleepWell: "All rested~", purr: "*purr purr*~", hmph: "Hmph", burp: "*burp*~",
      gift: "For you~♡", lookGood: "Like it?", huh: "...?",
      grumpy: ["Hiss!", "Hmph!", "Go away!", "Don't!"],
      wave: ["Hi~", "Yo~", "Hey!"],
      shy: ["...", "um...", "(///∇///)"],
      toyDone: { yarn: "All played out~", ball: "Hah!", paper: "...", mouse: "Gotcha!" },
      toyDoneDefault: "All played out~",
      sneeze: ["Achoo!", "Atishoo!", "Hep-choo!"],
      kiss: ["Mwah~", "mua~", "Mwah♡"],
    },
    eat: { cat: "So full~ meow!", pig: "Oink~ yummy!", bear: "Mmm~ so sweet~♡" },
    sounds: {
      cat: {
        happy: ["Meow~", "Mew♪", "*purr purr*~", "Mrrp~", "Meow♡"],
        excited: ["Meow!", "Mew mew!", "Mrow!", "Meoww!", "Meow—!"],
        curious: ["Meow?", "Hm?", "...?", "Mrrp?", "Mm?"],
        sleepy: ["Mm...", "Mew...", "...zzz", "Mnn......"],
        grumpy: ["Hiss!", "Hmph!", "fff...", "Go away!"],
        shy: ["...", "um...", "(///)", "hm?"],
        neutral: ["Meow~", "Mew mew~", "Mrow~", "*purr*..."],
      },
      pig: {
        happy: ["Oink~", "Snrf~", "Hehe~", "Oink♪"],
        excited: ["Oink!", "Hehe!", "Snort!"],
        curious: ["Oink?", "Hm?", "...?"],
        sleepy: ["Snrf...", "Oink...", "..."],
        grumpy: ["Oink!", "Snort!", "Go away!"],
        shy: ["...", "um...", "(///)"],
        neutral: ["Oink~", "Snrf~", "Heh~"],
      },
      bear: {
        happy: ["Grr~", "Mmm~", "*rumble*~", "Mrr~"],
        excited: ["Rawr!", "Roar!", "Grah!"],
        curious: ["Grr?", "Hm?", "...?"],
        sleepy: ["Hrr...", "Mm...", "ZZ..."],
        grumpy: ["Roar!", "Grr!", "Rawr!"],
        shy: ["...", "um...", "mm..."],
        neutral: ["Grr~", "Mmm~", "Hrr~"],
      },
    },
    idleStart: {
      knead: { cat: "*purr purr*~", pig: "snrf~", bear: "*rumble*~" },
      belly_up: { cat: "Rub me~", pig: "Rub~", bear: "Rub my belly~" },
      groom: { cat: "*lick lick*~", pig: "*nuzzle*~", bear: "*wipe wipe*~" },
      mud_roll: { cat: "Ahh~ so nice!", pig: "Ahh~ so nice!", bear: "Ahh~ so nice!" },
      back_scratch: { cat: "Ohh~ so good~", pig: "Ohh~ so good~", bear: "Ohh~ so good~" },
    },
  },

  ja: {
    ui: {
      animal: "どうぶつ", color: "毛色", interact: "ふれあい", toys: "おもちゃ", quit: "終了",
      species: { cat: "ネコ", pig: "ブタ", bear: "クマ" },
      colors: {
        orange: "茶トラ", calico: "三毛", cow: "牛柄", tabby: "キジトラ", tuxedo: "白黒",
        pink: "ピンク", cream: "クリーム", brown: "茶色", black: "黒", polar: "シロクマ",
      },
      interactItems: { feed: "ごはん", sleep: "ねんねさせる", goHome: "おうちへ", photo: "しゃしん" },
      toyItems: { yarn: "毛糸玉", ball: "ボール", paper: "紙くず", mouse: "ねずみ", laser: "レーザー", wand: "ねこじゃらし", cancel: "かたづける" },
    },
    say: {
      photo: "チーズ~ 📸", sleepWell: "ぐっすり~", purr: "ゴロゴロ~", hmph: "ふん", burp: "げふ~",
      gift: "あげる~♡", lookGood: "どう?", huh: "...?",
      grumpy: ["シャー!", "ふん!", "あっち行って!", "さわらないで!"],
      wave: ["やあ~", "よっ~", "こんにちは!"],
      shy: ["...", "うぅ...", "(///∇///)"],
      toyDone: { yarn: "あそんだ~", ball: "えいっ!", paper: "...", mouse: "つかまえた!" },
      toyDoneDefault: "あそんだ~",
      sneeze: ["はっくしょん!", "くしゅん!", "へくちっ!"],
      kiss: ["ちゅ~", "むぎゅ~", "ちゅっ♡"],
    },
    eat: { cat: "おなかいっぱい~ にゃー!", pig: "ぶぅ~ おいしい!", bear: "んん~ あまい~♡" },
    sounds: {
      cat: {
        happy: ["にゃー~", "にゃん♪", "ゴロゴロ~", "にゃぁ~", "にゃ♡"],
        excited: ["にゃっ!", "にゃにゃ!", "みゃお!", "にゃー!", "にゃー—!"],
        curious: ["にゃ?", "ん?", "...?", "にゃん?", "う?"],
        sleepy: ["う...", "にゃ...", "...zzz", "んん......"],
        grumpy: ["シャー!", "ふん!", "ふーっ...", "あっち行って!"],
        shy: ["...", "うぅ...", "(///)", "ん?"],
        neutral: ["にゃー~", "にゃにゃ~", "にゃぁ~", "ゴロゴロ..."],
      },
      pig: {
        happy: ["ぶぅ~", "ふがふが~", "へへ~", "ぶぅ♪"],
        excited: ["ぶひっ!", "へへっ!", "ぶうっ!"],
        curious: ["ぶぅ?", "ん?", "...?"],
        sleepy: ["ふが...", "ぶぅ...", "..."],
        grumpy: ["ぶひっ!", "ぶうっ!", "あっち行って!"],
        shy: ["...", "うぅ...", "(///)"],
        neutral: ["ぶぅ~", "ふが~", "へ~"],
      },
      bear: {
        happy: ["がおぅ~", "んん~", "ゴロゴロ~", "むぅ~"],
        excited: ["がおっ!", "ガオー!", "うぉー!"],
        curious: ["がう?", "ん?", "...?"],
        sleepy: ["ふがー...", "んん...", "ZZ..."],
        grumpy: ["ガオー!", "ぐるる!", "がおっ!"],
        shy: ["...", "うぅ...", "んん..."],
        neutral: ["がおぅ~", "んん~", "ふぅ~"],
      },
    },
    idleStart: {
      knead: { cat: "ゴロゴロ~", pig: "ふがふが~", bear: "ゴロゴロ~" },
      belly_up: { cat: "なでて~", pig: "ぶぅ~ なでて~", bear: "がおぅ~ なでて~" },
      groom: { cat: "ぺろぺろ~", pig: "すりすり~", bear: "ふきふき~" },
      mud_roll: { cat: "あぁ~ きもちいい!", pig: "あぁ~ きもちいい!", bear: "あぁ~ きもちいい!" },
      back_scratch: { cat: "あぁ~ きもちいい~", pig: "あぁ~ きもちいい~", bear: "あぁ~ きもちいい~" },
    },
  },

  ko: {
    ui: {
      animal: "동물", color: "털색", interact: "상호작용", toys: "장난감", quit: "종료",
      species: { cat: "고양이", pig: "돼지", bear: "곰" },
      colors: {
        orange: "치즈", calico: "삼색이", cow: "젖소", tabby: "고등어", tuxedo: "턱시도",
        pink: "분홍", cream: "크림", brown: "갈색", black: "검정", polar: "북극곰",
      },
      interactItems: { feed: "먹이주기", sleep: "재우기", goHome: "집으로", photo: "사진 모드" },
      toyItems: { yarn: "털실공", ball: "탱탱볼", paper: "종이뭉치", mouse: "장난감쥐", laser: "레이저", wand: "낚싯대", cancel: "치우기" },
    },
    say: {
      photo: "김치~ 📸", sleepWell: "잘 잤다~", purr: "골골골~", hmph: "흥", burp: "끄윽~",
      gift: "선물이야~♡", lookGood: "어때?", huh: "...?",
      grumpy: ["쉬익!", "흥!", "저리 가!", "만지지 마!"],
      wave: ["안녕~", "요~", "안녕하세요!"],
      shy: ["...", "으...", "(///∇///)"],
      toyDone: { yarn: "실컷 놀았다~", ball: "얍!", paper: "...", mouse: "잡았다!" },
      toyDoneDefault: "실컷 놀았다~",
      sneeze: ["에취!", "엣취!", "에엣취!"],
      kiss: ["쪽~", "쪽쪽~", "쪽♡"],
    },
    eat: { cat: "배불러~ 야옹!", pig: "꿀꿀~ 맛있어!", bear: "음~ 달아~♡" },
    sounds: {
      cat: {
        happy: ["야옹~", "냐옹♪", "골골골~", "야아옹~", "냐♡"],
        excited: ["야옹!", "냐냐!", "먀오!", "야옹!", "야옹—!"],
        curious: ["야옹?", "음?", "...?", "냐옹?", "응?"],
        sleepy: ["으...", "냐...", "...zzz", "음......"],
        grumpy: ["쉬익!", "흥!", "프으...", "저리 가!"],
        shy: ["...", "으...", "(///)", "응?"],
        neutral: ["야옹~", "냐냐~", "야아옹~", "골골골..."],
      },
      pig: {
        happy: ["꿀꿀~", "꾸울~", "헤헤~", "꿀♪"],
        excited: ["꿀꿀!", "헤헤!", "꿀꿀!"],
        curious: ["꿀꿀?", "음?", "...?"],
        sleepy: ["꾸울...", "꿀...", "..."],
        grumpy: ["꿀꿀!", "꾸울!", "저리 가!"],
        shy: ["...", "으...", "(///)"],
        neutral: ["꿀꿀~", "꾸울~", "헤~"],
      },
      bear: {
        happy: ["어흥~", "음~", "그르릉~", "으음~"],
        excited: ["어흥!", "크앙!", "우어!"],
        curious: ["어흥?", "음?", "...?"],
        sleepy: ["흐음...", "음...", "ZZ..."],
        grumpy: ["크앙!", "그르릉!", "어흥!"],
        shy: ["...", "으...", "음..."],
        neutral: ["어흥~", "음~", "흐음~"],
      },
    },
    idleStart: {
      knead: { cat: "골골골~", pig: "꾸울~", bear: "그르릉~" },
      belly_up: { cat: "쓰다듬어줘~", pig: "꿀~ 쓰다듬어~", bear: "어흥~ 쓰다듬어~" },
      groom: { cat: "핥짝핥짝~", pig: "부비부비~", bear: "쓱쓱~" },
      mud_roll: { cat: "아~ 시원해!", pig: "아~ 시원해!", bear: "아~ 시원해!" },
      back_scratch: { cat: "아~ 좋아~", pig: "아~ 좋아~", bear: "아~ 좋아~" },
    },
  },
};

// The resolved language pack for this session.
export const L = PACKS[LANG] || PACKS.en;

// Look up a dotted path in the active pack, e.g. t("ui.species.cat") or
// t("say.grumpy"). Returns whatever is stored — string, array, or object —
// so callers can pick() over pools directly. Falls back to the English pack,
// then to the raw key, so a typo shows the key rather than crashing.
export function t(path) {
  const walk = (obj) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
  const hit = walk(L);
  if (hit !== undefined) return hit;
  const fallback = walk(PACKS.en);
  return fallback !== undefined ? fallback : path;
}
