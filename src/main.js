const { invoke } = window.__TAURI__.core;
const { listen } = window.__TAURI__.event;

// debug overlay
window.addEventListener("error", (e) => {
  const div = document.createElement("div");
  div.style.cssText = "position:fixed;top:20px;left:20px;background:#c33;color:#fff;padding:8px 12px;font:12px monospace;z-index:9999;border-radius:6px;max-width:80vw;pointer-events:auto;white-space:pre-wrap;";
  div.textContent = "ERR: " + (e.message || "?") + "\n@ " + (e.filename||"").split("/").pop() + ":" + (e.lineno||"?") + ":" + (e.colno||"?");
  document.body.appendChild(div);
});
window.addEventListener("unhandledrejection", (e) => {
  const div = document.createElement("div");
  div.style.cssText = "position:fixed;top:80px;left:20px;background:#c93;color:#fff;padding:8px 12px;font:12px monospace;z-index:9999;border-radius:6px;max-width:80vw;";
  div.textContent = "REJECT: " + (e.reason && e.reason.message || e.reason || "?");
  document.body.appendChild(div);
});

// ===== Cat SVG (团子款) =====
const CAT_SVG = `
<svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" class="cat-svg" preserveAspectRatio="xMidYMax meet">
  <ellipse cx="60" cy="103" rx="40" ry="3.2" fill="rgba(0,0,0,0.20)"/>

  <g id="tail" style="transform-origin: 22px 66px;">
    <path d="M 24 82 Q 8 80, 8 66 Q 10 56, 22 58" stroke="var(--body)" stroke-width="13" fill="none" stroke-linecap="round"/>
  </g>

  <g id="leg-bl" style="transform-origin: 42px 95px;"></g>
  <g id="leg-br" style="transform-origin: 82px 95px;"></g>

  <ellipse cx="60" cy="68" rx="42" ry="34" fill="var(--body)"/>

  <g class="pattern pattern-stripes">
    <path d="M 38 50 Q 44 46, 50 50" stroke="var(--body-dark)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M 54 46 Q 60 42, 66 46" stroke="var(--body-dark)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M 70 50 Q 76 46, 82 50" stroke="var(--body-dark)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
    <path d="M 32 70 Q 26 68, 24 76" stroke="var(--body-dark)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
    <path d="M 88 70 Q 94 68, 96 76" stroke="var(--body-dark)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.5"/>
  </g>
  <g class="pattern pattern-patches">
    <path d="M 32 56 Q 26 64, 32 76 Q 44 78, 48 66 Q 46 52, 32 56 Z" fill="var(--accent, #F4A56B)"/>
    <path d="M 76 50 Q 90 52, 92 64 Q 86 78, 72 74 Q 64 62, 76 50 Z" fill="var(--body-dark)"/>
    <ellipse cx="58" cy="86" rx="5" ry="3" fill="var(--accent, #F4A56B)"/>
  </g>
  <g class="pattern pattern-cow">
    <path d="M 28 56 Q 22 64, 28 80 Q 46 82, 52 66 Q 50 52, 28 56 Z" fill="var(--body-dark)"/>
    <path d="M 72 50 Q 92 52, 94 68 Q 86 84, 70 78 Q 60 64, 72 50 Z" fill="var(--body-dark)"/>
  </g>
  <g class="pattern pattern-tuxedo">
    <ellipse cx="60" cy="84" rx="30" ry="12" fill="var(--belly)"/>
    <ellipse cx="42" cy="98" rx="9" ry="5" fill="var(--belly)"/>
    <ellipse cx="82" cy="98" rx="9" ry="5" fill="var(--belly)"/>
  </g>

  <ellipse cx="60" cy="86" rx="28" ry="11" fill="var(--belly)" opacity="0.55" class="belly-default"/>

  <g id="cat-ears">
    <path d="M 30 40 Q 28 30, 40 30 Q 50 34, 48 42 Q 40 44, 30 40 Z" fill="var(--body)"/>
    <path d="M 36 38 Q 36 33, 42 34 Q 45 38, 42 41 Q 38 41, 36 38 Z" fill="var(--inner-ear)" opacity="0.85"/>
    <path d="M 90 40 Q 92 30, 80 30 Q 70 34, 72 42 Q 80 44, 90 40 Z" fill="var(--body)"/>
    <path d="M 84 38 Q 84 33, 78 34 Q 75 38, 78 41 Q 82 41, 84 38 Z" fill="var(--inner-ear)" opacity="0.85"/>
  </g>

  <ellipse cx="60" cy="74" rx="18" ry="10" fill="var(--belly)" opacity="0.55"/>

  <g id="head"></g>

  <g id="eye-l" style="transform-origin: 48px 62px;">
    <g class="eye-style eye-normal">
      <ellipse cx="48" cy="62" rx="5.5" ry="7.5" fill="var(--eye)"/>
      <ellipse cx="49.6" cy="60" rx="2" ry="2.4" fill="#FFFFFF"/>
      <circle cx="48.5" cy="65" r="0.7" fill="#FFFFFF" opacity="0.7"/>
    </g>
    <g class="eye-style eye-wide">
      <ellipse cx="48" cy="62" rx="6.8" ry="9" fill="var(--eye)"/>
      <ellipse cx="50" cy="59" rx="2.6" ry="3.2" fill="#FFFFFF"/>
      <circle cx="48" cy="65.5" r="1.2" fill="#FFFFFF" opacity="0.8"/>
    </g>
    <g class="eye-style eye-hearts">
      <path d="M 48 58.5 C 45.6 56, 42.5 56.5, 42.5 59.8 C 42.5 63.5, 48 68, 48 68 C 48 68, 53.5 63.5, 53.5 59.8 C 53.5 56.5, 50.4 56, 48 58.5 Z" fill="#E54F6B"/>
      <ellipse cx="46" cy="60" rx="1.1" ry="1.3" fill="#FFFFFF" opacity="0.7"/>
    </g>
    <g class="eye-style eye-stars">
      <path d="M 48 55 L 49.2 60.4 L 54.6 61.4 L 49.2 62.6 L 48 68.4 L 46.8 62.6 L 41.4 61.4 L 46.8 60.4 Z" fill="#FFD23B" stroke="#B47A30" stroke-width="0.4"/>
      <circle cx="48" cy="62" r="0.7" fill="#FFFFFF"/>
    </g>
    <g class="eye-style eye-x">
      <path d="M 44 58 L 52 66" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>
      <path d="M 52 58 L 44 66" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>
    </g>
    <g class="eye-style eye-happy">
      <path d="M 42.5 64 Q 48 57, 53.5 64" stroke="var(--eye)" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>
    <g class="eye-style eye-angry">
      <ellipse cx="48" cy="63" rx="5.2" ry="6.8" fill="var(--eye)"/>
      <ellipse cx="49.6" cy="61" rx="1.5" ry="1.8" fill="#FFFFFF"/>
      <path d="M 41 56 L 53.5 60" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>
    </g>
  </g>
  <g id="eye-r" style="transform-origin: 72px 62px;">
    <g class="eye-style eye-normal">
      <ellipse cx="72" cy="62" rx="5.5" ry="7.5" fill="var(--eye)"/>
      <ellipse cx="73.6" cy="60" rx="2" ry="2.4" fill="#FFFFFF"/>
      <circle cx="72.5" cy="65" r="0.7" fill="#FFFFFF" opacity="0.7"/>
    </g>
    <g class="eye-style eye-wide">
      <ellipse cx="72" cy="62" rx="6.8" ry="9" fill="var(--eye)"/>
      <ellipse cx="74" cy="59" rx="2.6" ry="3.2" fill="#FFFFFF"/>
      <circle cx="72" cy="65.5" r="1.2" fill="#FFFFFF" opacity="0.8"/>
    </g>
    <g class="eye-style eye-hearts">
      <path d="M 72 58.5 C 69.6 56, 66.5 56.5, 66.5 59.8 C 66.5 63.5, 72 68, 72 68 C 72 68, 77.5 63.5, 77.5 59.8 C 77.5 56.5, 74.4 56, 72 58.5 Z" fill="#E54F6B"/>
      <ellipse cx="70" cy="60" rx="1.1" ry="1.3" fill="#FFFFFF" opacity="0.7"/>
    </g>
    <g class="eye-style eye-stars">
      <path d="M 72 55 L 73.2 60.4 L 78.6 61.4 L 73.2 62.6 L 72 68.4 L 70.8 62.6 L 65.4 61.4 L 70.8 60.4 Z" fill="#FFD23B" stroke="#B47A30" stroke-width="0.4"/>
      <circle cx="72" cy="62" r="0.7" fill="#FFFFFF"/>
    </g>
    <g class="eye-style eye-x">
      <path d="M 68 58 L 76 66" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>
      <path d="M 76 58 L 68 66" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>
    </g>
    <g class="eye-style eye-happy">
      <path d="M 66.5 64 Q 72 57, 77.5 64" stroke="var(--eye)" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>
    <g class="eye-style eye-angry">
      <ellipse cx="72" cy="63" rx="5.2" ry="6.8" fill="var(--eye)"/>
      <ellipse cx="73.6" cy="61" rx="1.5" ry="1.8" fill="#FFFFFF"/>
      <path d="M 79 56 L 66.5 60" stroke="var(--eye)" stroke-width="2" stroke-linecap="round"/>
    </g>
  </g>

  <path id="cat-nose" d="M 57 70 L 63 70 L 60 73 Z" fill="var(--nose)"/>

  <g id="mouth" style="transform-origin: 60px 75px;">
    <g class="mouth-style mouth-normal">
      <path d="M 60 73 Q 56 78, 53 76" stroke="#3A2A20" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M 60 73 Q 64 78, 67 76" stroke="#3A2A20" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g>
    <g class="mouth-style mouth-smile">
      <path d="M 53 73 Q 60 81, 67 73" stroke="#3A2A20" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    </g>
    <g class="mouth-style mouth-grumpy">
      <path d="M 53 75 L 56 78 L 58 75 L 60 78 L 62 75 L 64 78 L 67 75" stroke="#3A2A20" stroke-width="1.2" fill="none" stroke-linejoin="round"/>
    </g>
    <g class="mouth-style mouth-tongue">
      <path d="M 60 73 Q 56 76, 54 76" stroke="#3A2A20" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M 60 73 Q 64 76, 66 76" stroke="#3A2A20" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="78" rx="2.8" ry="1.8" fill="#E76A8A"/>
    </g>
    <g class="mouth-style mouth-shy">
      <path d="M 57 76 L 63 76" stroke="#3A2A20" stroke-width="1.3" stroke-linecap="round"/>
    </g>
    <g class="mouth-style mouth-pursed">
      <ellipse cx="60" cy="76" rx="1.6" ry="0.9" fill="#3A2A20"/>
    </g>
    <path id="mouth-open" d="M 56 75 Q 60 81, 64 75 Q 60 78, 56 75 Z" fill="#C2546F" opacity="0"/>
  </g>

  <ellipse cx="42" cy="70" rx="4.5" ry="2.6" fill="var(--blush)" opacity="0.7"/>
  <ellipse cx="78" cy="70" rx="4.5" ry="2.6" fill="var(--blush)" opacity="0.7"/>

  <g id="whisker-l" style="transform-origin: 40px 73px;">
    <path d="M 40 72 L 26 70" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
    <path d="M 40 74 L 26 76" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
  </g>
  <g id="whisker-r" style="transform-origin: 80px 73px;">
    <path d="M 80 72 L 94 70" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
    <path d="M 80 74 L 94 76" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
  </g>

  <g id="leg-fl" style="transform-origin: 42px 95px;">
    <ellipse cx="42" cy="98" rx="9" ry="5" fill="var(--body-dark)"/>
  </g>
  <g id="leg-fr" style="transform-origin: 82px 95px;">
    <ellipse cx="82" cy="98" rx="9" ry="5" fill="var(--body-dark)"/>
  </g>

  <!-- pig parts: drooping ears, big snout, curly tail -->
  <g class="species-pig">
    <path d="M 24 80 Q 16 78, 14 82 Q 14 86, 20 86 Q 24 84, 20 80" stroke="var(--body-dark)" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M 32 38 Q 28 50, 42 50 Q 50 42, 44 30 Q 36 30, 32 38 Z" fill="var(--body-dark)"/>
    <path d="M 36 40 Q 36 46, 41 45 Q 43 41, 39 37 Z" fill="var(--inner-ear)" opacity="0.7"/>
    <path d="M 88 38 Q 92 50, 78 50 Q 70 42, 76 30 Q 84 30, 88 38 Z" fill="var(--body-dark)"/>
    <path d="M 84 40 Q 84 46, 79 45 Q 77 41, 81 37 Z" fill="var(--inner-ear)" opacity="0.7"/>
    <ellipse cx="60" cy="69" rx="11" ry="7" fill="var(--snout, #E89DAE)"/>
    <ellipse cx="55" cy="69" rx="1.4" ry="2.2" fill="#2D1A0A"/>
    <ellipse cx="65" cy="69" rx="1.4" ry="2.2" fill="#2D1A0A"/>
  </g>

  <!-- bear parts: round ears, big black nose, tiny round tail -->
  <g class="species-bear">
    <ellipse cx="22" cy="78" rx="6" ry="5" fill="var(--body)"/>
    <circle cx="38" cy="32" r="9" fill="var(--body)"/>
    <circle cx="82" cy="32" r="9" fill="var(--body)"/>
    <circle cx="38" cy="33" r="4.5" fill="var(--inner-ear)"/>
    <circle cx="82" cy="33" r="4.5" fill="var(--inner-ear)"/>
    <ellipse cx="60" cy="69" rx="5.5" ry="4" fill="#1A1A1A"/>
    <ellipse cx="58" cy="67" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.55"/>
  </g>
</svg>`;

// ===== State =====
const SPECIES_COLORS = {
  cat:  ["orange", "calico", "cow", "tabby", "tuxedo"],
  pig:  ["pink", "cream"],
  bear: ["brown", "black", "polar"],
};
const SPECIES_DEFAULT_COLOR = { cat: "orange", pig: "pink", bear: "brown" };
const ALL_SPECIES = ["cat", "pig", "bear"];
const SPECIES_FOOD = {
  cat:  { emoji: "🐟", eatBubble: "好饱~ 喵呜!",  moodGain: 15, heartParticles: 0 },
  pig:  { emoji: "🥕", eatBubble: "哼噜~ 好吃!", moodGain: 20, heartParticles: 1 },
  bear: { emoji: "🍯", eatBubble: "嗯~ 好甜~♡", moodGain: 28, heartParticles: 4 },
};
// pigs and bears amble slower than cats
const SPECIES_SPEED = { cat: 1.0, pig: 0.78, bear: 0.72 };
function speciesSpeed() { return SPECIES_SPEED[state.species] || 1; }

const SPECIES_DISPLAY_NAME = { cat: "🐈 小猫", pig: "🐷 小猪", bear: "🐻 小熊" };
const MODE_STATUS_TEXT = {
  walking:     "溜达中~",
  idle:        "发呆中...",
  interested:  "盯着鼠标看~",
  watching:    "警觉中!",
  chasing:     "狩猎中!",
  trick:       "在表演~",
  sleeping:    "睡着了 💤",
  pet:         "被抚摸~ ❤",
  dragged:     "被拎起来啦",
  dizzy:       "晕乎乎...",
  feeding:     "吃饭中~",
  playing:     "玩耍中!",
  clingy:      "想你了~ ❤",
  scratching:  "抓墙中!",
  photo:       "茄子~ 📸",
  startled:    "吓一跳!",
  bird_watch:  "看小鸟~",
  in_bed:      "窝里睡觉 💤",
  going_home:  "回窝中...",
};

function updateInfoPanel() {
  const nameEl = ctxMenuEl.querySelector(".info-name");
  const moodEl = ctxMenuEl.querySelector(".info-mood");
  const moodVal = ctxMenuEl.querySelector(".info-mood-val");
  const sleepEl = ctxMenuEl.querySelector(".info-sleep");
  const sleepVal = ctxMenuEl.querySelector(".info-sleep-val");
  const statusEl = ctxMenuEl.querySelector(".info-status");
  if (!nameEl) return;

  nameEl.textContent = SPECIES_DISPLAY_NAME[state.species] || "小动物";

  const mood = Math.round(state.mood);
  moodEl.style.width = mood + "%";
  moodVal.textContent = mood;
  moodEl.classList.toggle("is-low",  mood < 30);
  moodEl.classList.toggle("is-high", mood > 75);

  const sleepi = Math.round(state.sleepiness);
  sleepEl.style.width = sleepi + "%";
  sleepVal.textContent = sleepi;
  sleepEl.classList.toggle("is-high", sleepi > 70);

  statusEl.textContent = MODE_STATUS_TEXT[state.mode] || state.mode;
}
const COLORS = [...SPECIES_COLORS.cat, ...SPECIES_COLORS.pig, ...SPECIES_COLORS.bear];
const SPECIES_SOUNDS = {
  cat: {
    happy:   ["喵~", "喵♪", "咕噜咕噜~", "喵呼~", "喵♡"],
    excited: ["喵!", "喵喵!", "嗷呜!", "喵呜!", "喵—!"],
    curious: ["喵?", "嗯?", "...?", "喵嗯?", "唔?"],
    sleepy:  ["唔...", "喵...", "...zzz", "嗯......"],
    grumpy:  ["嘶!", "哼!", "fff...", "走开!"],
    shy:     ["...", "唔...", "(///)", "嗯?"],
    neutral: ["喵~", "喵喵~", "喵呜~", "咕噜咕噜..."],
  },
  pig: {
    happy:   ["哼噜~", "呼噜~", "嘿嘿~", "哼♪"],
    excited: ["哼!", "嘿嘿!", "嗯哼!"],
    curious: ["哼?", "嗯?", "...?"],
    sleepy:  ["呼...", "哼...", "..."],
    grumpy:  ["哼!", "呼噜!", "走开!"],
    shy:     ["...", "唔...", "(///)"],
    neutral: ["哼噜~", "呼~", "嘿~"],
  },
  bear: {
    happy:   ["嗷呜~", "嗯~", "呼噜~", "唔~"],
    excited: ["嗷!", "吼!", "呜啊!"],
    curious: ["嗷?", "嗯?", "...?"],
    sleepy:  ["呼...", "嗯...", "ZZ..."],
    grumpy:  ["吼!", "呼!", "嗷!"],
    shy:     ["...", "唔...", "嗯..."],
    neutral: ["嗷~", "嗯~", "呼~"],
  },
};
function pickMeowByMood(now) {
  const pool = SPECIES_SOUNDS[state.species] || SPECIES_SOUNDS.cat;
  if (state.mode === "sleeping" || state.sleepiness > 75) return pick(pool.sleepy);
  if (state.mood < 30) return pick(pool.grumpy);
  if (state.cursorMoveAmt > 220) return pick(pool.excited);
  if (now - state.lastSigMoveT > 30000) return pick(pool.curious);
  if (state.mood > 70) return pick(pool.happy);
  return pick(pool.neutral);
}
const MEOWS = SPECIES_SOUNDS.cat.neutral;  // legacy alias used in a couple spots
const HEARTS = ["❤", "❤❤", "♡", "(´• ω •`)♡"];
const SLEEPY = ["zzz...", "Zzz", "💤"];

const CAT_W = 120;
const CAT_H = 110;
const BASE_SPEED_WALK = 0.075;   // px/ms
const BASE_SPEED_RUN  = 0.20;    // px/ms

const state = {
  x: 200,
  y: 200,
  targetX: 200,
  targetY: 200,
  facing: 1,                       // target: 1 right, -1 left
  facingActual: 1,                 // displayed sign (snaps at hop apex)
  turn: null,                      // { t0, dur, height, from, to } when turning
  // mode: walking | idle | interested | watching | chasing | trick | sleeping
  //     | pet | dragged | dizzy | feeding | playing | clingy | scratching | photo
  mode: "walking",
  sleepiness: 0,                   // 0..100 — accumulates while awake, drains while sleeping
  // press tracking for click vs hold vs drag
  press: null,                     // { t0, x, y, drag, pet }
  dragOffsetX: 0,
  dragOffsetY: 0,
  modeStartT: 0,                   // generic start time for any new mode
  // toy
  toy: null,                       // { x, y, hits, t0 }
  lastToySpawnT: 0,
  // feed
  feed: null,                      // { x, y, eaten }
  // wall scratch cooldown
  lastWallScratchT: 0,
  // clingy: track sustained mouse inactivity
  lastSigMoveT: 0,
  lastClingyT: 0,
  // ambient meow
  lastAmbientMeowT: 0,
  // circle detection
  circleCooldown: 0,
  // stare lock prevents eye-follow during stare
  stareLocked: false,
  // swat_cursor (idle mouse near cat → cat takes a swat)
  cursorStillT0: 0,
  lastSwatCursorT: 0,
  // startle (mouse rushes at cat)
  lastStartleT: 0,
  // particle/atmos timers
  lastFootprintX: 0, lastFootprintY: 0, footprintSide: 0,
  lastZT: 0, lastHeartT: 0,
  // laser trail
  laserTrail: [],
  // bird / butterfly fly-by
  bird: null,
  lastBirdT: 0,
  // mood 0..100 (50 is neutral)
  mood: 50,
  species: "cat",
  // "home" — corner spot where the cat curls up to stay out of the way
  homeX: 0, homeY: 0,
  // smoothed display values (1st-order low-pass per frame) — kills mode-switch pops
  disp: {
    bodyTilt: 0, bodyScaleX: 1, bodyScaleY: 1, bodyBob: 0,
    tailSwing: 0, legFLY: 0, legFRY: 0,
    eyeScaleY: 1, eyeShiftX: 0, eyeShiftY: 0,
    mouthScaleY: 1, mouthOpenOpacity: 0,
    pupilScale: 1, rotateX: 0,
  },
  modeUntil: 0,
  // gait: walk | run  (only meaningful in walking / interested)
  gait: "walk",
  // jumping is a vertical-arc overlay that can ride on top of walk/run
  jump: null,                      // { t0, dur, height } when active
  // zoomies: short burst run toward a far random target
  zoom: false,
  // active hunt action: { variant: 'leap'|'swat'|'leap_swat', t0, ... }
  chase: null,
  // ad-hoc tail wag overlay (can fire in any mode)
  tailWag: null,                   // { t0, dur, intensity, freq }
  // tiny micro-pauses while walking
  pauseUntil: 0,
  // idle sub-action: sit | yawn | stretch | groom | look | nap | tail_curl
  idleAction: null,
  idleActionT0: 0,
  lookFlipped: false,
  // trick sub-action: meow | heart | spin | pounce | happy_jump
  trickAction: null,
  trickT0: 0,
  // cursor activity
  cursor: { x: -9999, y: -9999, ts: 0 },
  cursorTrail: [],                 // recent {x,y,t}
  cursorMoveAmt: 0,                // total movement in last 1.5s
  // walking sub-target drift for non-straight chase
  interestedJitter: 0,
  passthrough: true,
};

const catEl = document.getElementById("cat");
const bodyEl = document.getElementById("cat-body");
const bubbleEl = document.getElementById("bubble");
const bubbleTextEl = document.getElementById("bubble-text");
const ctxMenuEl = document.getElementById("ctx-menu");
const hatEl = document.getElementById("hat");
const toyEl = document.getElementById("toy");
const feedEl = document.getElementById("feed-emoji");
const flashEl = document.getElementById("flash");
const birdEl = document.getElementById("bird");
const bedEl = document.getElementById("bed");
const laserTrailEl = document.getElementById("laser-trail");
const particlesEl = document.getElementById("particles");

bodyEl.innerHTML = CAT_SVG;

// Top-down sleeping pose — shows when the cat is curled up in its bed.
const BED_BODY_SVG = `
<svg viewBox="0 0 120 110" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
  <ellipse cx="60" cy="104" rx="40" ry="3" fill="rgba(0,0,0,0.18)"/>
  <!-- tail trailing out behind -->
  <path d="M 38 86 Q 16 92, 10 78 Q 8 70, 18 70" stroke="var(--body)" stroke-width="9" fill="none" stroke-linecap="round"/>
  <!-- body (oval behind head, foreshortened) -->
  <ellipse cx="60" cy="78" rx="32" ry="16" fill="var(--body)"/>
  <ellipse cx="60" cy="80" rx="22" ry="7" fill="var(--belly)" opacity="0.5"/>
  <!-- head — large circle pushed toward viewer -->
  <circle cx="60" cy="50" r="30" fill="var(--body)"/>

  <!-- species-specific ears -->
  <g class="species-cat">
    <path d="M 32 42 Q 30 26, 44 28 Q 54 34, 50 44 Q 42 46, 32 42 Z" fill="var(--body)"/>
    <path d="M 38 38 Q 38 32, 44 34 Q 47 38, 44 41 Q 40 41, 38 38 Z" fill="var(--inner-ear)" opacity="0.85"/>
    <path d="M 88 42 Q 90 26, 76 28 Q 66 34, 70 44 Q 78 46, 88 42 Z" fill="var(--body)"/>
    <path d="M 82 38 Q 82 32, 76 34 Q 73 38, 76 41 Q 80 41, 82 38 Z" fill="var(--inner-ear)" opacity="0.85"/>
  </g>
  <g class="species-pig">
    <path d="M 34 36 Q 30 50, 46 50 Q 54 42, 48 28 Q 38 28, 34 36 Z" fill="var(--body-dark)"/>
    <path d="M 38 38 Q 38 46, 44 45 Q 47 41, 42 36 Z" fill="var(--inner-ear)" opacity="0.7"/>
    <path d="M 86 36 Q 90 50, 74 50 Q 66 42, 72 28 Q 82 28, 86 36 Z" fill="var(--body-dark)"/>
    <path d="M 82 38 Q 82 46, 76 45 Q 73 41, 78 36 Z" fill="var(--inner-ear)" opacity="0.7"/>
  </g>
  <g class="species-bear">
    <circle cx="36" cy="34" r="11" fill="var(--body)"/>
    <circle cx="36" cy="36" r="5.5" fill="var(--inner-ear)"/>
    <circle cx="84" cy="34" r="11" fill="var(--body)"/>
    <circle cx="84" cy="36" r="5.5" fill="var(--inner-ear)"/>
  </g>

  <!-- closed eyes (happy arcs) -->
  <path d="M 46 52 Q 51 47, 56 52" stroke="var(--eye)" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M 64 52 Q 69 47, 74 52" stroke="var(--eye)" stroke-width="2.4" fill="none" stroke-linecap="round"/>

  <!-- nose / snout -->
  <g class="species-cat">
    <path d="M 57 60 L 63 60 L 60 63 Z" fill="var(--nose)"/>
  </g>
  <g class="species-pig">
    <ellipse cx="60" cy="60" rx="10" ry="6" fill="var(--snout, #E89DAE)"/>
    <ellipse cx="56" cy="60" rx="1.3" ry="2" fill="#2D1A0A"/>
    <ellipse cx="64" cy="60" rx="1.3" ry="2" fill="#2D1A0A"/>
  </g>
  <g class="species-bear">
    <ellipse cx="60" cy="60" rx="5" ry="3.5" fill="#1A1A1A"/>
    <ellipse cx="58" cy="58.5" rx="1.4" ry="1" fill="#FFFFFF" opacity="0.45"/>
  </g>

  <!-- soft mouth -->
  <path d="M 60 63 Q 56 67, 53 66" stroke="#3A2A20" stroke-width="1.3" fill="none" stroke-linecap="round"/>
  <path d="M 60 63 Q 64 67, 67 66" stroke="#3A2A20" stroke-width="1.3" fill="none" stroke-linecap="round"/>

  <!-- blush -->
  <ellipse cx="42" cy="58" rx="3.6" ry="2.2" fill="var(--blush)" opacity="0.55"/>
  <ellipse cx="78" cy="58" rx="3.6" ry="2.2" fill="var(--blush)" opacity="0.55"/>

  <!-- cat-only whiskers -->
  <g class="species-cat">
    <path d="M 44 62 L 32 60" stroke="var(--whisker)" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>
    <path d="M 44 64 L 32 66" stroke="var(--whisker)" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>
    <path d="M 76 62 L 88 60" stroke="var(--whisker)" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>
    <path d="M 76 64 L 88 66" stroke="var(--whisker)" stroke-width="0.9" stroke-linecap="round" opacity="0.85"/>
  </g>
</svg>`;
const bedBodyEl = document.getElementById("bed-body");
bedBodyEl.innerHTML = BED_BODY_SVG;

const head = document.getElementById("head");
const tail = document.getElementById("tail");
const legFL = document.getElementById("leg-fl");
const legFR = document.getElementById("leg-fr");
const legBL = document.getElementById("leg-bl");
const legBR = document.getElementById("leg-br");
const eyeL = document.getElementById("eye-l");
const eyeR = document.getElementById("eye-r");
const mouth = document.getElementById("mouth");
const mouthOpen = document.getElementById("mouth-open");
const whiskerL = document.getElementById("whisker-l");
const whiskerR = document.getElementById("whisker-r");

// ===== Helpers =====
function rand(a, b) { return a + Math.random() * (b - a); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function bounds() {
  const m = 40;
  return {
    minX: m,
    maxX: window.innerWidth - CAT_W - m,
    minY: m,
    maxY: window.innerHeight - CAT_H - m,
  };
}

function pickNewTarget() {
  const b = bounds();
  state.targetX = rand(b.minX, b.maxX);
  state.targetY = rand(b.minY, b.maxY);
}

function pickFarTarget() {
  const b = bounds();
  for (let i = 0; i < 8; i++) {
    const x = rand(b.minX, b.maxX);
    const y = rand(b.minY, b.maxY);
    if (Math.hypot(x - state.x, y - state.y) > 280) {
      state.targetX = x; state.targetY = y;
      return;
    }
  }
  pickNewTarget();
}

function detectHoliday() {
  const d = new Date();
  const m = d.getMonth() + 1, day = d.getDate();
  if (m === 12 && day >= 24 && day <= 26) return "🎄";  // 圣诞
  if (m === 10 && day === 31) return "🎃";              // 万圣
  if (m === 1  && day === 1)  return "🎉";              // 新年
  if (m === 2  && day === 14) return "💝";              // 情人节
  return null;
}
function applyHoliday() {
  const h = detectHoliday();
  if (h) { hatEl.textContent = h; hatEl.classList.remove("hidden"); }
  else { hatEl.classList.add("hidden"); }
}
function isNightTime() {
  const h = new Date().getHours();
  return h >= 22 || h < 6;
}

function triggerTailWag(now, intensity, freq, dur) {
  state.tailWag = {
    t0: now,
    dur: dur ?? rand(800, 1500),
    intensity: intensity ?? rand(22, 36),
    freq: freq ?? rand(5, 8),
  };
}

let blinkUntil = 0;
let yawnUntil = 0;
const triggerBlink = () => { blinkUntil = performance.now() + 160; };
const triggerYawn  = (dur=700) => { yawnUntil = performance.now() + dur; };

// ===== Particle helpers =====
const FOOTPRINT_SVG = `<svg viewBox="0 0 20 20" width="20" height="20"><ellipse cx="10" cy="14" rx="4" ry="3" fill="#3A2A20" opacity="0.35"/><circle cx="6" cy="9" r="1.7" fill="#3A2A20" opacity="0.35"/><circle cx="10" cy="7" r="1.7" fill="#3A2A20" opacity="0.35"/><circle cx="14" cy="9" r="1.7" fill="#3A2A20" opacity="0.35"/></svg>`;

function _spawnParticle(klass, x, y, html, lifeMs) {
  const el = document.createElement("div");
  el.className = "particle " + klass;
  el.style.left = x + "px";
  el.style.top  = y + "px";
  if (html !== null) el.innerHTML = html;
  particlesEl.appendChild(el);
  setTimeout(() => { el.remove(); }, lifeMs);
}
function spawnFootprint(x, y) { _spawnParticle("footprint", x, y, FOOTPRINT_SVG, 1700); }
function spawnDust(x, y)      { _spawnParticle("dust",      x, y, "",            600); }
function spawnZ(x, y) {
  const c = pick(["z", "Z", "z", "Z"]);
  _spawnParticle("zzz", x, y, c, 2300);
}
function spawnHeart(x, y) { _spawnParticle("heart", x, y, "❤", 1700); }

// adjust mood, clamped
function bumpMood(delta) {
  state.mood = clamp(state.mood + delta, 0, 100);
}

function showBubble(text, dur = 1500) {
  bubbleTextEl.textContent = text;
  bubbleEl.classList.remove("hidden");
  bubbleEl.style.animation = "none";
  void bubbleEl.offsetWidth;
  bubbleEl.style.animation = "";
  clearTimeout(showBubble._t);
  showBubble._t = setTimeout(() => bubbleEl.classList.add("hidden"), dur);
}

// smoothstep easing — slow start, slow end, fast middle
function smoothstep(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }

// 1st-order low-pass: smoothly approach target. halfLife in ms.
function lerpDisp(name, target, dt, halfLife) {
  const k = 1 - Math.pow(0.5, dt / (halfLife || 70));
  state.disp[name] += (target - state.disp[name]) * k;
}

// Pick eyes + mouth variant from state. Called every frame.
function selectFace(now) {
  let eyes = "normal", mouth = "normal";

  if (state.mode === "pet")          { eyes = "hearts"; mouth = "smile"; }
  else if (state.mode === "dragged") { eyes = "wide";   mouth = "shy"; }
  else if (state.mode === "dizzy")   { eyes = "x";      mouth = "normal"; }
  else if (state.mode === "sleeping"){ eyes = "happy"; }
  else if (state.mode === "watching"){ eyes = "wide"; }
  else if (state.mode === "feeding" && state.feed && state.feed.eatT0) { eyes = "happy"; }
  else if (state.mode === "clingy" && state.clingyShown) { eyes = "hearts"; mouth = "smile"; }
  else if (state.mode === "scratching") { eyes = "wide"; }
  else if (state.mode === "photo")    { eyes = "stars";  mouth = "smile"; }
  else if (state.mode === "startled") { eyes = "wide"; }
  else if (state.mode === "bird_watch") { eyes = "wide"; mouth = "pursed"; }
  else if (state.mode === "in_bed")     { eyes = "happy"; }
  else if (state.mode === "going_home") { eyes = "happy"; }
  else if (state.mode === "chasing")  { eyes = "wide"; }
  else if (state.mode === "trick") {
    switch (state.trickAction) {
      case "heart":      eyes = "hearts"; mouth = "smile"; break;
      case "spin":       eyes = "stars";  mouth = "smile"; break;
      case "happy_jump": eyes = "stars";  mouth = "smile"; break;
      case "pounce":     eyes = "wide"; break;
      case "grumpy":     eyes = "angry";  mouth = "grumpy"; break;
      case "wave":       eyes = "happy";  mouth = "smile"; break;
      case "shy":        eyes = "happy";  mouth = "shy"; break;
      case "swat_cursor":eyes = "wide"; break;
    }
  }
  else if (state.mode === "idle") {
    switch (state.idleAction) {
      case "stare":         eyes = "wide"; break;
      case "loaf":          eyes = "happy"; break;
      case "rollover":      eyes = "happy"; break;
      case "shake":         eyes = "happy"; break;
      case "wiggle":        eyes = "wide"; break;
      case "itch":          eyes = "happy"; break;
      case "sniff_air":     mouth = "pursed"; break;
      case "sniff_ground":  mouth = "pursed"; break;
      case "sneeze":        eyes = "happy"; break;
      case "fold_paws":     eyes = "happy"; break;
      case "sideways":      eyes = "happy"; break;
    }
  }

  // very sleepy → drooping happy eyes
  if (state.sleepiness > 80 && state.mode !== "sleeping" && eyes === "normal") eyes = "happy";
  // mood influence on resting expression
  if (state.mood < 28 && state.mode !== "sleeping" && eyes === "normal") eyes = "angry";
  if (state.mood > 78 && state.mode !== "sleeping" && mouth === "normal") mouth = "smile";

  if (catEl.getAttribute("data-eyes")  !== eyes)  catEl.setAttribute("data-eyes",  eyes);
  if (catEl.getAttribute("data-mouth") !== mouth) catEl.setAttribute("data-mouth", mouth);
}

function startWalkLeg(now, isRun = false) {
  state.mode = "walking";
  state.gait = isRun ? "run" : "walk";
  state.zoom = false;
  state.pauseUntil = 0;
  state.modeUntil = now + (isRun ? rand(1200, 3000) : rand(4000, 10000));
  // very small chance of a jump leg
  if (Math.random() < (isRun ? 0.4 : 0.15)) {
    scheduleJump(now);
  }
}

function startZoom(now) {
  state.mode = "walking";
  state.gait = "run";
  state.zoom = true;
  pickFarTarget();
  state.modeUntil = now + rand(1300, 2500);
  state.pauseUntil = 0;
  if (Math.random() < 0.7) scheduleJump(now);
  triggerTailWag(now, 32, 8, 1500);
}

// Pick a hunt variant. dash = sprint run; leap = bounding hops; swat = pounce strike; leap_swat = leap then strike.
function startChase(now) {
  const r = Math.random();
  let variant;
  if      (r < 0.32) variant = "dash";
  else if (r < 0.58) variant = "leap";
  else if (r < 0.70) variant = "swat";
  else if (r < 0.86) variant = "leap_swat";
  else               variant = "chase_tail";

  if (variant === "dash") { startZoom(now); return; }

  state.mode = "chasing";
  state.chase = { variant, t0: now, leapsLeft: 0, leapT0: 0, pauseUntil: 0 };
  state.jump = null;
  triggerTailWag(now, 34, 9, 1600);

  if (variant === "chase_tail") {
    state.chase.spinT0 = now;
    state.modeUntil = now + rand(2200, 3000);   // 2-3 spins
    triggerTailWag(now, 38, 11, 2400);
    return;
  }

  if (variant === "swat") {
    // face a random side, swat at empty air
    state.facing = Math.random() < 0.5 ? 1 : -1;
    state.chase.swatT0 = now;
    state.chase.dur = 650;
    state.modeUntil = now + 700;
  } else {
    pickFarTarget();
    state.chase.leapsLeft = variant === "leap_swat"
      ? (Math.random() < 0.6 ? 1 : 2)
      : (2 + Math.floor(Math.random() * 2));   // 2..3 leaps
    state.modeUntil = now + 6000;
  }
}

function startLeapHop(now) {
  const c = state.chase;
  const dx = state.targetX - state.x;
  const dy = state.targetY - state.y;
  const d = Math.hypot(dx, dy);
  if (d < 14) return false;
  const hopDist = Math.min(d, rand(100, 170));
  const ratio = hopDist / d;
  c.leapFromX = state.x;
  c.leapFromY = state.y;
  c.leapToX = state.x + dx * ratio;
  c.leapToY = state.y + dy * ratio;
  c.leapT0 = now;
  c.leapDur = rand(420, 520);
  c.leapHeight = rand(28, 48);
  if (dx >  FACING_DEADZONE) state.facing = 1;
  else if (dx < -FACING_DEADZONE) state.facing = -1;
  return true;
}

function scheduleJump(now) {
  state.jump = {
    t0: now,
    dur: rand(380, 560),
    height: rand(14, 28),
  };
  // take-off dust at feet
  spawnDust(state.x + CAT_W / 2, state.y + CAT_H - 2);
}

function startIdle(now, longer = false) {
  state.mode = "idle";
  // pick weighted action; nap/groom heavier when user is afk
  const afk = state.cursorMoveAmt < 40;
  const pool = afk
    ? ["stretch", "sit", "yawn", "yawn", "look", "tail_curl", "loaf", "stare", "shake",
       "fold_paws", "sideways", "sniff_air"]
    : ["sit", "yawn", "stretch", "look", "tail_curl", "shake", "rollover", "loaf", "stare", "wiggle",
       "itch", "sniff_air", "sniff_ground", "fold_paws", "sideways", "sneeze"];
  const choice = pick(pool);
  state.idleAction = choice;
  state.idleActionT0 = now;
  state.lookFlipped = false;
  state.stareLocked = false;
  state.sneezeShown = false;
  const durs = {
    sit: rand(1500, 2800),
    yawn: 900,
    stretch: 900,
    look: rand(1400, 2400),
    tail_curl: rand(1800, 3200),
    shake: 700,
    rollover: 2400,
    loaf: rand(3500, 6500),
    stare: rand(4500, 7500),
    wiggle: 850,
    itch: rand(900, 1500),
    sniff_air: rand(1800, 2800),
    sniff_ground: rand(2200, 3500),
    sneeze: 700,
    fold_paws: rand(2200, 3800),
    sideways: rand(3500, 5500),
  };
  let d = durs[choice] || 2000;
  if (longer) d *= 1.5;
  state.modeUntil = now + d;
  if (choice === "yawn") triggerYawn(800);
}

function startSleeping(now) {
  state.mode = "sleeping";
  state.idleAction = null;
  state.chase = null;
  state.zoom = false;
  state.jump = null;
  state.turn = null;
  state.tailWag = null;
  showBubble(pick(SLEEPY), 2200);
}

function maybeSleep(now) {
  const s = state.sleepiness;
  let p = 0;
  if (s >= 100) p = 1;
  else if (s > 80) p = 0.55;
  else if (s > 65) p = 0.22;
  else if (s > 45) p = 0.05;
  if (Math.random() < p) { startSleeping(now); return true; }
  return false;
}

function wakeUp(now) {
  if (state.mode !== "sleeping") return;
  state.mode = "walking";
  pickNewTarget();
  startWalkLeg(now, false);
  showBubble("?", 900);
  triggerBlink();
}

function goHome(now) {
  state.mode = "going_home";
  state.modeStartT = now;
  state.targetX = state.homeX;
  state.targetY = state.homeY;
  state.modeUntil = now + 30000;        // safety
  state.chase = null;
  state.jump = null;
  if (state.toy) cancelToy(now);
}

function wakeFromBed(now) {
  state.mode = "walking";
  pickNewTarget();
  startWalkLeg(now, false);
  showBubble("?", 800);
  triggerBlink();
}

function spawnFeed(now) {
  if (state.feed) return;
  if (state.mode === "sleeping") wakeUp(now);
  if (state.mode === "in_bed") wakeFromBed(now);
  const food = SPECIES_FOOD[state.species] || SPECIES_FOOD.cat;
  const b = bounds();
  const dir = state.facing >= 0 ? 1 : -1;
  // place emoji CENTER in front of the cat's mouth (cat-mouth is at svg (60, 73))
  const fx = clamp(state.x + 60 + dir * 60 + rand(-12, 12), b.minX + 40, b.maxX - 40);
  const fy = clamp(state.y + 73 + rand(-8, 8),               b.minY + 40, b.maxY - 40);
  state.feed = { x: fx, y: fy, eaten: false, t0: now, expireT: now + 25000 };
  feedEl.textContent = food.emoji;
  feedEl.style.left = fx + "px";
  feedEl.style.top  = fy + "px";
  feedEl.classList.remove("hidden");
  feedEl.style.animation = "none"; void feedEl.offsetWidth; feedEl.style.animation = "";
  // cat target so its mouth touches the food edge (not the center) — keeps food unobscured
  state.mode = "feeding";
  state.modeStartT = now;
  state.targetX = fx - dir * 24 - 60;   // mouth at food rim
  state.targetY = fy - 73;
  state.modeUntil = now + 12000;
  state.chase = null; state.jump = null;
}

const TOY_EMOJI = {
  ball:  "⚽",
  paper: "📄",
  mouse: "🐭",
  laser: "🔴",
  wand:  "🪶",
};

// hand-drawn yarn ball — cartoon style, no emoji-renderer surprises
const YARN_SVG = `
<svg viewBox="0 0 56 60" width="56" height="60" overflow="visible">
  <ellipse cx="28" cy="56" rx="16" ry="2.5" fill="rgba(0,0,0,0.20)"/>
  <circle cx="28" cy="26" r="20" fill="#F4A8B0"/>
  <ellipse cx="22" cy="20" rx="7" ry="5" fill="#FFD0D9" opacity="0.75"/>
  <g stroke="#C24E6F" stroke-width="1.7" fill="none" stroke-linecap="round" opacity="0.9">
    <path d="M 10 26 Q 28 8, 46 28"/>
    <path d="M 8 30 Q 28 50, 48 28"/>
    <path d="M 14 12 Q 30 30, 44 44"/>
    <path d="M 14 42 Q 28 22, 44 10"/>
    <path d="M 28 8 Q 8 28, 28 46"/>
  </g>
  <path d="M 44 30 Q 52 36, 54 48" stroke="#C24E6F" stroke-width="2" fill="none" stroke-linecap="round"/>
  <circle cx="54" cy="48" r="1.6" fill="#C24E6F"/>
</svg>`;

function setToyVisual(type) {
  toyEl.setAttribute("data-type", type);
  if (type === "yarn") {
    toyEl.innerHTML = YARN_SVG;
  } else {
    toyEl.innerHTML = "";
    toyEl.textContent = TOY_EMOJI[type] || "?";
  }
}

// physics params per toy type
const TOY_PHYS = {
  yarn:  { friction: 0.00065, gravity: 0.0010, bounce: 0.68, spin: true,  hits: 4 },
  ball:  { friction: 0.00030, gravity: 0.0011, bounce: 0.92, spin: false, hits: 5 },
  paper: { friction: 0.00150, gravity: 0.0010, bounce: 0.38, spin: true,  hits: 3 },
};

function cancelToy(now) {
  if (!state.toy) return;
  toyEl.classList.add("hidden");
  state.toy = null;
  if (state.mode === "playing") {
    state.mode = "walking";
    pickNewTarget();
    startWalkLeg(now, false);
  }
}

function spawnBird(now) {
  if (state.bird) return;
  const isButterfly = Math.random() < 0.45;
  const goRight = Math.random() < 0.5;
  const yStart = rand(70, Math.max(140, window.innerHeight * 0.45));
  state.bird = {
    type: isButterfly ? "butterfly" : "bird",
    x: goRight ? -60 : window.innerWidth + 60,
    y: yStart,
    baseY: yStart,
    vx: (goRight ? 1 : -1) * rand(0.18, 0.30),
    t0: now,
    expireT: now + 18000,
  };
  birdEl.textContent = isButterfly ? "🦋" : "🐦";
  birdEl.style.left = state.bird.x + "px";
  birdEl.style.top  = state.bird.y + "px";
  birdEl.classList.remove("hidden");

  // cat notices unless busy
  if (state.mode === "walking" || state.mode === "idle") {
    state.mode = "bird_watch";
    state.modeStartT = now;
    state.modeUntil = now + 5000;
  }
}

function physBird(dt, now) {
  if (!state.bird) return;
  const b = state.bird;
  b.x += b.vx * dt;
  // wavy Y motion (more for butterfly)
  const amp = b.type === "butterfly" ? 18 : 7;
  const freq = b.type === "butterfly" ? 280 : 400;
  const dispY = b.baseY + Math.sin((now - b.t0) / freq) * amp;
  // flip direction emoji-wise (mirror via scale)
  birdEl.style.left = b.x + "px";
  birdEl.style.top  = dispY + "px";
  birdEl.style.transform = `translate(-50%, -50%) scaleX(${b.vx > 0 ? -1 : 1})`;

  if (now > b.expireT || b.x < -80 || b.x > window.innerWidth + 80) {
    birdEl.classList.add("hidden");
    state.bird = null;
  }
}

function pickToyType() {
  const r = Math.random();
  if (r < 0.30) return "yarn";
  if (r < 0.48) return "ball";
  if (r < 0.62) return "paper";
  if (r < 0.78) return "mouse";
  if (r < 0.90) return "laser";
  return "wand";
}

function spawnToy(now, type) {
  if (state.toy) return;
  if (state.mode === "sleeping") wakeUp(now);
  type = type || pickToyType();

  const b = bounds();
  let tx, ty;
  if (type === "laser" || type === "wand") {
    tx = state.cursor.ts ? state.cursor.x : (state.x + 150);
    ty = state.cursor.ts ? state.cursor.y : (state.y + 50);
  } else {
    tx = clamp(state.x + rand(-280, 280), b.minX + 40, b.maxX - 40);
    ty = clamp(state.y + rand(-180, 180), b.minY + 40, b.maxY - 40);
  }

  state.toy = {
    type, x: tx, y: ty,
    vx: 0, vy: 0,
    spin: 0, spinVel: 0,
    hits: 0, target: (TOY_PHYS[type] && TOY_PHYS[type].hits) || (type === "mouse" ? 3 : 99),
    t0: now,
    expireT: now + (type === "laser" || type === "wand" ? 18000 : 30000),
    swatT0: 0,
    ratNextT: 0,
  };
  state.lastToySpawnT = now;

  setToyVisual(type);
  toyEl.style.left = tx + "px";
  toyEl.style.top  = ty + "px";
  toyEl.style.transform = "translate(-50%, -50%)";
  toyEl.style.opacity = "0";
  toyEl.style.transition = "";   // make sure no leftover transform transition
  toyEl.classList.remove("hidden");
  // fade in via opacity only — physics owns transform / left / top
  requestAnimationFrame(() => {
    toyEl.style.transition = "opacity 0.3s ease-out";
    toyEl.style.opacity = "1";
    setTimeout(() => { toyEl.style.transition = ""; }, 320);
  });

  // pigs and bears don't chase the wand — leave the toy out but stay un-engaged
  if (type === "wand" && state.species !== "cat") {
    return;
  }

  state.mode = "playing";
  state.modeStartT = now;
  state.targetX = tx - CAT_W / 2 + 20;
  state.targetY = ty - CAT_H / 2 + 30;
  state.modeUntil = now + 25000;
}

// physics step for the active toy (independent of cat mode)
function physToy(dt, now) {
  if (!state.toy) return;
  const t = state.toy;
  if (t.type === "yarn" || t.type === "ball" || t.type === "paper") {
    const p = TOY_PHYS[t.type];
    // gravity
    t.vy += p.gravity * dt;
    // friction (linear-ish on speed)
    const sp = Math.hypot(t.vx, t.vy);
    if (sp > 0) {
      const decel = p.friction * dt;
      const newSp = Math.max(0, sp - decel);
      const k = newSp / sp;
      t.vx *= k; t.vy *= k;
    }
    // integrate
    t.x += t.vx * dt;
    t.y += t.vy * dt;
    // walls
    const b = bounds();
    if (t.x < b.minX) { t.x = b.minX; t.vx = -t.vx * p.bounce; }
    if (t.x > b.maxX) { t.x = b.maxX; t.vx = -t.vx * p.bounce; }
    if (t.y < b.minY) { t.y = b.minY; t.vy = -t.vy * p.bounce; }
    if (t.y > b.maxY) {
      t.y = b.maxY;
      t.vy = -t.vy * p.bounce;
      // ground friction kicks in
      t.vx *= 0.94;
    }
    // spin
    if (p.spin) {
      t.spin += (t.spinVel || 0) * dt;
      // air drag on spin
      t.spinVel *= 0.998;
    }
    // hard stop
    if (Math.hypot(t.vx, t.vy) < 0.006 && Math.abs(t.y - bounds().maxY) < 1) {
      t.vx = 0; t.vy = 0; t.spinVel = 0;
    }
  } else if (t.type === "mouse") {
    if (!t.ratNextT || now > t.ratNextT) {
      const b = bounds();
      t.ratX = clamp(t.x + rand(-220, 220), b.minX, b.maxX);
      t.ratY = clamp(t.y + rand(-120, 120), b.minY, b.maxY);
      t.ratNextT = now + rand(900, 1700);
      t.spinVel = rand(-0.4, 0.4);
    }
    const dx = (t.ratX || t.x) - t.x;
    const dy = (t.ratY || t.y) - t.y;
    const d = Math.hypot(dx, dy);
    if (d > 4) {
      const sp = 0.18;
      t.x += (dx / d) * sp * dt;
      t.y += (dy / d) * sp * dt;
      t.spin += (t.spinVel || 0) * dt;
    }
  } else if (t.type === "laser" || t.type === "wand") {
    // follow the cursor with a tiny lag so it looks alive
    if (state.cursor.ts) {
      const k = 1 - Math.pow(0.5, dt / (t.type === "laser" ? 30 : 80));
      t.x += (state.cursor.x - t.x) * k;
      t.y += (state.cursor.y - t.y) * k;
    }
    if (t.type === "wand") {
      t.spin = Math.sin(now / 380) * 22;   // gentle feather sway
    }
    if (t.type === "laser") {
      const last = state.laserTrail[state.laserTrail.length - 1];
      // only push when actually moving — keeps trail from piling up while idle
      if (!last || Math.hypot(t.x - last.x, t.y - last.y) > 2) {
        state.laserTrail.push({ x: t.x, y: t.y, t: now });
      }
      while (state.laserTrail.length > 12) state.laserTrail.shift();
      while (state.laserTrail.length && now - state.laserTrail[0].t > 220) state.laserTrail.shift();
    } else {
      state.laserTrail.length = 0;
    }
  }

  // mirror toy's screen position to DOM
  toyEl.style.left = t.x + "px";
  toyEl.style.top  = t.y + "px";
  let tform = "translate(-50%, -50%)";
  if (t.type === "laser") {
    const pulse = 1 + Math.sin(now / 110) * 0.18;
    tform += ` scale(${pulse})`;
  } else {
    tform += ` rotate(${t.spin || 0}deg)`;
  }
  toyEl.style.transform = tform;
}

function renderLaserTrail() {
  if (!state.toy || state.toy.type !== "laser" || state.laserTrail.length < 2) {
    if (laserTrailEl.firstChild) laserTrailEl.innerHTML = "";
    return;
  }
  const w = window.innerWidth, h = window.innerHeight;
  laserTrailEl.setAttribute("viewBox", `0 0 ${w} ${h}`);
  let html = "";
  const arr = state.laserTrail;
  for (let i = 1; i < arr.length; i++) {
    const a = arr[i - 1], b = arr[i];
    const op = (i / arr.length) * 0.55;
    html += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#ff3535" stroke-width="${2 + i * 0.25}" stroke-opacity="${op}" stroke-linecap="round"/>`;
  }
  laserTrailEl.innerHTML = html;
}

function takePhoto(now) {
  if (state.mode === "sleeping") wakeUp(now);
  state.mode = "photo";
  state.modeStartT = now;
  state.modeUntil = now + 1500;
  state.facing = 1;                  // face right; closest to "look at camera"
  state.facingActual = 1;            // snap; skip hop-turn during pose
  state.turn = null;
  state.chase = null; state.jump = null;
  setTimeout(() => {
    flashEl.classList.remove("hidden");
    flashEl.classList.add("shoot");
    setTimeout(() => flashEl.classList.remove("shoot"), 500);
  }, 600);
  showBubble("茄子~ 📸", 1300);
}

function detectCircle(now) {
  if (now < state.circleCooldown) return false;
  const trail = state.cursorTrail;
  if (trail.length < 10) return false;
  // last 900ms only
  const recent = [];
  for (let i = trail.length - 1; i >= 0; i--) {
    if (now - trail[i].t > 900) break;
    recent.unshift(trail[i]);
  }
  if (recent.length < 10) return false;
  let cx = 0, cy = 0;
  for (const p of recent) { cx += p.x; cy += p.y; }
  cx /= recent.length; cy /= recent.length;
  let total = 0;
  for (let i = 1; i < recent.length; i++) {
    const a1 = Math.atan2(recent[i - 1].y - cy, recent[i - 1].x - cx);
    const a2 = Math.atan2(recent[i].y - cy, recent[i].x - cx);
    let da = a2 - a1;
    if (da >  Math.PI) da -= Math.PI * 2;
    if (da < -Math.PI) da += Math.PI * 2;
    total += da;
  }
  // center must be near the cat
  const cd = Math.hypot(cx - (state.x + CAT_W / 2), cy - (state.y + CAT_H / 2));
  return Math.abs(total) > Math.PI * 2 * 1.5 && cd < 350;
}

function startTrick(now, action) {
  state.mode = "trick";
  state.trickAction = action;
  state.trickT0 = now;
  state.modeUntil = now + ({
    meow: 900, heart: 1300, spin: 700, pounce: 600, happy_jump: 900,
    grumpy: 1200, wave: 1400, shy: 1600, swat_cursor: 700,
  })[action];
  if (action === "meow")   { showBubble(pickMeowByMood(now), 1300); triggerBlink(); }
  if (action === "heart")  { showBubble(pick(HEARTS), 1500); triggerBlink(); }
  if (action === "grumpy") { showBubble(pick(["嘶!", "哼!", "走开!", "別碰!"]), 1200); }
  if (action === "wave")   { showBubble(pick(["嗨~", "哟~", "Hi!"]), 1300); }
  if (action === "shy")    { showBubble(pick(["...", "唔...", "(///∇///)"]), 1400); }
  if (action === "pounce" || action === "happy_jump") scheduleJump(now);
}

// ===== Animation loop =====
let lastT = performance.now();
let lastBlink = performance.now();
pickNewTarget();
startWalkLeg(lastT, false);

const CHASE_DEADZONE = 80;
const FACING_DEADZONE = 18;

function tick(now) {
 try {
  const dt = Math.min(50, now - lastT);
  lastT = now;

  // ---- mood slow decay toward neutral 50 ----
  state.mood += (50 - state.mood) * dt / 1000 * 0.003;

  // ---- sleepiness update ----
  if (state.mode === "sleeping") {
    state.sleepiness = Math.max(0, state.sleepiness - dt / 1000 * 2.5);
    if (state.sleepiness <= 0) {
      // fully rested — wake up on its own (no click needed)
      state.mode = "walking";
      pickNewTarget();
      startWalkLeg(now, false);
      showBubble("睡饱啦~", 1500);
      triggerTailWag(now, 28, 6, 1200);
    }
  } else if (state.mode === "in_bed") {
    // in bed: rest but never auto-wake (only click / drag dismisses)
    state.sleepiness = Math.max(0, state.sleepiness - dt / 1000 * 2.0);
  } else {
    // accumulate while awake; faster when idle; ×2 at night (22:00–06:00)
    let rate = state.mode === "idle" ? 0.55 : 0.32;
    if (isNightTime()) rate *= 2;
    state.sleepiness = Math.min(100, state.sleepiness + dt / 1000 * rate);
  }

  // ---- cursor trail / activity ----
  if (state.cursor.ts) {
    const last = state.cursorTrail[state.cursorTrail.length - 1];
    if (!last || last.x !== state.cursor.x || last.y !== state.cursor.y) {
      state.cursorTrail.push({ x: state.cursor.x, y: state.cursor.y, t: now });
    }
  }
  while (state.cursorTrail.length > 1 && now - state.cursorTrail[0].t > 1500) {
    state.cursorTrail.shift();
  }
  let amt = 0;
  for (let i = 1; i < state.cursorTrail.length; i++) {
    const a = state.cursorTrail[i - 1], b = state.cursorTrail[i];
    amt += Math.hypot(b.x - a.x, b.y - a.y);
  }
  state.cursorMoveAmt = amt;

  // ---- periodic blink ----
  if (now - lastBlink > rand(2800, 5200) && state.mode !== "trick") {
    triggerBlink();
    lastBlink = now;
  }

  // ---- toy physics (independent of cat mode) ----
  physToy(dt, now);
  renderLaserTrail();
  physBird(dt, now);

  // ---- chance for a bird / butterfly to fly through ----
  if (!state.bird && now - state.lastBirdT > rand(120000, 240000)) {
    state.lastBirdT = now;
    if (Math.random() < 0.55) spawnBird(now);
  }

  // ---- footprints (every ~36 px of horizontal travel) ----
  if (state.mode !== "sleeping" && state.mode !== "dragged" && state.mode !== "pet" && state.mode !== "photo") {
    const trav = Math.hypot(state.x - state.lastFootprintX, state.y - state.lastFootprintY);
    if (trav > 36) {
      const off = state.footprintSide ? 10 : -10;
      spawnFootprint(state.x + CAT_W / 2 + off, state.y + CAT_H - 6);
      state.footprintSide = 1 - state.footprintSide;
      state.lastFootprintX = state.x;
      state.lastFootprintY = state.y;
    }
  } else {
    // reset baseline so next motion doesn't dump a footprint
    state.lastFootprintX = state.x;
    state.lastFootprintY = state.y;
  }

  // ---- Zzz puffs while sleeping ----
  if (state.mode === "sleeping" && now - state.lastZT > rand(900, 1600)) {
    state.lastZT = now;
    spawnZ(state.x + CAT_W / 2 + rand(8, 24), state.y + 30 + rand(-6, 6));
  }

  // ---- heart particles while being petted ----
  if (state.mode === "pet" && now - state.lastHeartT > rand(450, 750)) {
    state.lastHeartT = now;
    spawnHeart(state.x + CAT_W / 2 + rand(-18, 18), state.y + 30);
  }

  // ---- global feed/toy expiry (independent of mode, so tricks can't strand them) ----
  if (state.feed && now > state.feed.expireT) {
    feedEl.classList.add("hidden");
    state.feed = null;
    if (state.mode === "feeding") {
      state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
    }
  }
  if (state.toy && now > state.toy.expireT) {
    toyEl.classList.add("hidden");
    state.toy = null;
    if (state.mode === "playing") {
      state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
    }
  }

  // ---- pet detection: held > 500ms without moving > 8px ----
  if (state.press && !state.press.drag && !state.press.pet && now - state.press.t0 > 500) {
    state.press.pet = true;
    state.mode = "pet";
    state.modeStartT = now;
    state.jump = null; state.turn = null; state.chase = null;
    showBubble("咕噜咕噜~", 10000);   // long; cleared on mouseup
    triggerTailWag(now, 22, 4, 5000);
  }

  // ---- ambient meow: occasionally talks to itself ----
  if (state.mode !== "sleeping" && state.mode !== "pet" && state.mode !== "photo"
      && now - state.lastAmbientMeowT > rand(35000, 70000)) {
    state.lastAmbientMeowT = now;
    if (Math.random() < 0.5) showBubble(pick(["喵?", "喵...", "嗯?", "..."]), 1100);
  }

  // ---- cursor-derived constants (used by env detection AND mode transitions below) ----
  const cursorAlive = now - state.cursor.ts < 400;
  const catCx_g = state.x + CAT_W / 2;
  const catCy_g = state.y + CAT_H / 2;
  const cdx_g = state.cursor.x - catCx_g;
  const cdy_g = state.cursor.y - catCy_g;
  const cdist_g = Math.hypot(cdx_g, cdy_g);

  // ---- swat_cursor: mouse parked near the cat for a few seconds ----
  if (cursorAlive && state.cursorMoveAmt < 14 && (state.mode === "walking" || state.mode === "idle")) {
    // approximate dist for trigger; we use the existing cdist later (computed below); recompute cheap here:
    const cx = state.x + CAT_W / 2;
    const cy = state.y + CAT_H / 2;
    const cd = Math.hypot(state.cursor.x - cx, state.cursor.y - cy);
    if (cd < 220) {
      if (!state.cursorStillT0) state.cursorStillT0 = now;
      if (now - state.cursorStillT0 > 4000 && now - state.lastSwatCursorT > 25000) {
        state.lastSwatCursorT = now;
        state.cursorStillT0 = 0;
        state.facing = (state.cursor.x - cx) > 0 ? 1 : -1;
        startTrick(now, "swat_cursor");
      }
    } else {
      state.cursorStillT0 = 0;
    }
  } else {
    state.cursorStillT0 = 0;
  }

  // ---- startle: cursor rushes at the cat fast and close ----
  if ((state.mode === "walking" || state.mode === "idle")
      && now - state.lastStartleT > 18000
      && state.cursorTrail.length >= 3) {
    const last = state.cursorTrail[state.cursorTrail.length - 1];
    const prev = state.cursorTrail[state.cursorTrail.length - 3];
    const cx2 = state.x + CAT_W / 2, cy2 = state.y + CAT_H / 2;
    const dPrev = Math.hypot(prev.x - cx2, prev.y - cy2);
    const dNow  = Math.hypot(last.x - cx2, last.y - cy2);
    const dtMs  = Math.max(1, last.t - prev.t);
    const speed = Math.hypot(last.x - prev.x, last.y - prev.y) / dtMs;
    if (speed > 1.4 && dNow < 160 && dPrev > dNow + 50) {
      state.lastStartleT = now;
      state.mode = "startled";
      state.modeStartT = now;
      state.modeUntil = now + 1100;
      state.facing = (last.x - cx2) > 0 ? 1 : -1;
      // hop back away from cursor
      state.x = clamp(state.x - state.facing * 28, bounds().minX, bounds().maxX);
    }
  }

  // ---- circle detection: triggers a spin trick ----
  if (state.mode === "walking" || state.mode === "idle" || state.mode === "interested") {
    if (detectCircle(now)) {
      state.circleCooldown = now + 4000;
      startTrick(now, "spin");
    }
  }

  // ---- toy ball: occasionally spawns one ----
  if (!state.toy && state.mode === "walking" && now - state.lastToySpawnT > rand(180000, 360000)) {
    if (Math.random() < 0.5) spawnToy(now);
  }

  // ---- clingy: cat seeks user after long inactivity ----
  if (state.cursorMoveAmt > 100) state.lastSigMoveT = now;
  if (!state.lastSigMoveT) state.lastSigMoveT = now;
  if ((state.mode === "walking" || state.mode === "idle")
      && now - state.lastSigMoveT > 90000
      && now - state.lastClingyT > 120000) {
    state.lastClingyT = now;
    if (now - state.cursor.ts < 500 && state.cursor.x > 0 && state.cursor.y > 0) {
      state.mode = "clingy";
      state.modeStartT = now;
      state.targetX = state.cursor.x - CAT_W / 2 + rand(-30, 30);
      state.targetY = state.cursor.y + rand(40, 80);
      state.modeUntil = now + 9000;
      state.chase = null;
      state.clingyShown = false;
    }
  }

  // ---- ambient tail wag: random short bursts, more likely when excited ----
  if (state.tailWag && now > state.tailWag.t0 + state.tailWag.dur) {
    state.tailWag = null;
  }
  if (!state.tailWag) {
    let perFrame = dt * 0.00010;
    if (state.mode === "interested") perFrame *= 2.5;
    if (state.mode === "watching")   perFrame *= 1.8;
    if (state.mode === "trick")      perFrame *= 2;
    if (Math.random() < perFrame) {
      triggerTailWag(now);
    }
  }

  // reuse the values computed at the top of tick
  const catCx = catCx_g, catCy = catCy_g;
  const cdx = cdx_g, cdy = cdy_g, cdist = cdist_g;

  // ---- mode transitions for cursor interest ----
  const cursorActive = state.cursorMoveAmt > 60;
  const cursorFast   = state.cursorMoveAmt > 220;
  // sleeping is sacred: only a click wakes the cat
  const lockedModes = new Set([
    "trick", "sleeping", "pet", "dragged", "dizzy",
    "feeding", "playing", "clingy", "scratching", "photo", "startled",
    "bird_watch", "in_bed", "going_home",
  ]);
  if (!lockedModes.has(state.mode)) {
    if (cursorAlive && cursorActive && cdist < 280 && state.mode !== "interested") {
      // close + moving: orbit/interested
      state.mode = "interested";
      state.modeUntil = now + rand(3000, 5500);
      state.interestedJitter = rand(0, Math.PI * 2);
    } else if (state.mode === "interested" && (!cursorAlive || !cursorActive || cdist > 380 || now > state.modeUntil)) {
      pickNewTarget();
      startWalkLeg(now, Math.random() < 0.2);
    } else if (cursorAlive && cursorFast && cdist >= 280 && cdist < 900
               && (state.mode === "walking" || state.mode === "idle")) {
      // far + fast: stop and watch
      state.mode = "watching";
      state.modeUntil = now + rand(900, 1800);
    } else if (state.mode === "watching" && (!cursorAlive || now > state.modeUntil
               || (cdist < 280 && cursorActive))) {
      // expired, or cursor came close → hand off to walking / interested next tick
      pickNewTarget();
      startWalkLeg(now, false);
    }
  }

  let moving = false;
  let moveDx = 0;

  if (state.mode === "walking") {
    // micro-pause?
    if (now < state.pauseUntil) {
      // stand still briefly
    } else {
      const tdx = state.targetX - state.x;
      const tdy = state.targetY - state.y;
      const tdist = Math.hypot(tdx, tdy);
      if (tdist < 6 || now > state.modeUntil) {
        // arrived or leg ended → decide next thing
        if (state.zoom) {
          // after zoomies: catch breath
          state.zoom = false;
          if (!maybeSleep(now)) {
            if (Math.random() < 0.75) startIdle(now);
            else { pickNewTarget(); startWalkLeg(now, false); }
          }
        } else if (!maybeSleep(now)) {
          const roll = Math.random();
          if (roll < 0.40) {
            startIdle(now);
          } else if (roll < 0.60) {
            pickNewTarget();
            startWalkLeg(now, false);
          } else if (roll < 0.85) {
            pickNewTarget();
            startWalkLeg(now, true);   // run leg
          } else {
            startChase(now);           // chase imaginary (dash / leap / swat / leap_swat)
          }
        }
      } else {
        // easing: smoothstep from start->end of leg by remaining-distance
        const baseDist = Math.max(80, Math.hypot(state.targetX - state.x, state.targetY - state.y) + 1);
        const remaining = tdist / baseDist;
        const easing = 0.4 + 0.6 * smoothstep(1 - Math.abs(remaining - 0.5) * 2); // peak at mid
        const zoomBoost = state.zoom ? 1.45 : 1.0;
        const sp = (state.gait === "run" ? BASE_SPEED_RUN : BASE_SPEED_WALK) * easing * zoomBoost * speciesSpeed();
        state.x += (tdx / tdist) * sp * dt;
        state.y += (tdy / tdist) * sp * dt;
        moving = true;
        moveDx = tdx;

        // chance of a micro-pause while walking (gives the "stop and look")
        if (state.gait === "walk" && Math.random() < dt * 0.0006) {
          state.pauseUntil = now + rand(300, 700);
        }
        // wall scratch: low chance when hugging a side
        if (state.gait === "walk" && now - state.lastWallScratchT > 25000) {
          const bb = bounds();
          if ((state.x < bb.minX + 30 || state.x > bb.maxX - 30) && Math.random() < dt * 0.0015) {
            state.lastWallScratchT = now;
            state.mode = "scratching";
            state.modeStartT = now;
            state.modeUntil = now + 1500;
            state.facing = state.x < bb.minX + 30 ? -1 : 1;  // face the wall
          }
        }
      }
    }
  } else if (state.mode === "idle") {
    if (now > state.modeUntil) {
      // wiggle always pre-pounces into a swat / leap_swat
      if (state.idleAction === "wiggle") {
        state.mode = "chasing";
        state.chase = { variant: Math.random() < 0.6 ? "swat" : "leap_swat", t0: now, leapsLeft: 0, leapT0: 0, pauseUntil: 0 };
        if (state.chase.variant === "swat") {
          state.facing = Math.random() < 0.5 ? 1 : -1;
          state.chase.swatT0 = now; state.chase.dur = 650;
          state.modeUntil = now + 700;
        } else {
          pickFarTarget();
          state.chase.leapsLeft = 1;
          state.modeUntil = now + 6000;
        }
        triggerTailWag(now, 34, 9, 1600);
      } else if (!maybeSleep(now)) {
        const r = Math.random();
        if (r < 0.15) {
          startChase(now);
        } else if (r < 0.30) {
          pickNewTarget();
          startWalkLeg(now, true);
        } else {
          pickNewTarget();
          startWalkLeg(now, false);
        }
      }
    }
  } else if (state.mode === "sleeping") {
    // do nothing here — sleepiness tick at top + click handler manage transitions
  } else if (state.mode === "pet") {
    // held; mouseup ends it
  } else if (state.mode === "dragged") {
    // position is set by mousemove handler
  } else if (state.mode === "dizzy") {
    if (now > state.modeUntil) {
      pickNewTarget();
      startWalkLeg(now, false);
    }
  } else if (state.mode === "feeding") {
    if (!state.feed) {
      state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
    } else if (now > state.modeUntil) {
      // expired — give up
      feedEl.classList.add("hidden");
      state.feed = null;
      state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
    } else {
      const tdx = state.targetX - state.x;
      const tdy = state.targetY - state.y;
      const tdist = Math.hypot(tdx, tdy);
      if (tdist < 16) {
        if (!state.feed.eatT0) state.feed.eatT0 = now;
        if (now - state.feed.eatT0 > 1500) {
          feedEl.classList.add("hidden");
          state.feed = null;
          const food = SPECIES_FOOD[state.species] || SPECIES_FOOD.cat;
          state.sleepiness = Math.max(0, state.sleepiness - 25);
          bumpMood(food.moodGain);
          triggerTailWag(now, 30, 7, 1800);
          showBubble(food.eatBubble, 1500);
          // burst hearts for bears (honey love)
          const headX = state.x + CAT_W / 2;
          const headY = state.y + 30;
          for (let i = 0; i < food.heartParticles; i++) {
            setTimeout(() => spawnHeart(headX + rand(-18, 18), headY), i * 120);
          }
          state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
        }
      } else {
        const sp = BASE_SPEED_RUN * speciesSpeed();
        state.x += (tdx / tdist) * sp * dt;
        state.y += (tdy / tdist) * sp * dt;
        moving = true; moveDx = tdx;
      }
    }
  } else if (state.mode === "playing") {
    if (!state.toy) {
      state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
    } else if (now > state.modeUntil) {
      toyEl.classList.add("hidden");
      state.toy = null;
      state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
    } else {
      const t = state.toy;
      const tdx = t.x - (state.x + CAT_W / 2);
      const tdy = t.y - (state.y + CAT_H / 2 - 10);
      const tdist = Math.hypot(tdx, tdy);
      const toySpeed = Math.hypot(t.vx || 0, t.vy || 0);

      // --- laser / wand: chase + pounce (cursor-driven, never depletes) ---
      if (t.type === "laser" || t.type === "wand") {
        const isLaser = t.type === "laser";
        const closeR  = isLaser ? 75 : 95;
        const cooldown = isLaser ? 620 : 950;
        if (tdist < closeR) {
          if (!t.lastSwatT || now - t.lastSwatT > cooldown) {
            t.lastSwatT = now;
            t.swatT0 = now;
            state.facing = tdx > 0 ? 1 : -1;
            if (isLaser) {
              // 激光：每次都短跳扑
              state.jump = { t0: now, dur: 420, height: 18 };
            } else if (Math.random() < 0.55) {
              // 逗猫棒：偶尔大跳够羽毛
              state.jump = { t0: now, dur: 560, height: 36 };
            }
          }
        } else {
          const sp = BASE_SPEED_RUN * (isLaser ? 1.45 : 1.10) * speciesSpeed();
          state.x += (tdx / tdist) * sp * dt;
          state.y += (tdy / tdist) * sp * dt;
          moving = true; moveDx = tdx;
        }
      } else if (tdist < 38 && toySpeed < 0.15) {
        // close + toy mostly settled → swat
        if (!t.swatT0) t.swatT0 = now;
        if (now - t.swatT0 > 520) {
          state.facing = tdx > 0 ? 1 : -1;
          t.swatT0 = 0;

          if (t.type === "yarn" || t.type === "ball" || t.type === "paper") {
            // per-type impulse: balls go boing, paper barely moves
            let pX, pY;
            if (t.type === "ball") { pX = 0.85; pY = 0.65 + Math.random() * 0.25; }
            else if (t.type === "yarn") { pX = 0.72; pY = 0.30 + Math.random() * 0.20; }
            else /* paper */           { pX = 0.50; pY = 0.20 + Math.random() * 0.15; }
            t.vx = state.facing * pX + rand(-0.10, 0.10);
            t.vy = -pY;
            t.spinVel = rand(-0.9, 0.9);
            t.hits += 1;
          } else if (t.type === "mouse") {
            // mouse darts away
            const b = bounds();
            const dirx = state.facing;
            t.ratX = clamp(t.x + dirx * rand(120, 220), b.minX, b.maxX);
            t.ratY = clamp(t.y + rand(-60, 60), b.minY, b.maxY);
            t.ratNextT = now + rand(400, 900);  // commit to dash
            t.hits += 1;
          } else if (t.type === "laser" || t.type === "wand") {
            // no impulse — cat just bats at the air; doesn't count toward hits
          }

          if (t.target && t.hits >= t.target) {
            toyEl.classList.add("hidden");
            state.toy = null;
            const msgs = {
              yarn: "玩够了~", ball: "嘿!", paper: "...", mouse: "抓住啦!",
            };
            showBubble(msgs[t.type] || "玩够了~", 1200);
            bumpMood(8);
            state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
          }
        }
      } else {
        // chase toy
        const sp = ((t.type === "laser" || t.type === "wand")
          ? BASE_SPEED_RUN * 1.2
          : BASE_SPEED_RUN) * speciesSpeed();
        if (tdist > 4) {
          state.x += (tdx / tdist) * sp * dt;
          state.y += (tdy / tdist) * sp * dt;
        }
        moving = true; moveDx = tdx;
      }
    }
  } else if (state.mode === "clingy") {
    if (now > state.modeUntil) {
      pickNewTarget(); startWalkLeg(now, false);
    } else {
      const tdx = state.targetX - state.x;
      const tdy = state.targetY - state.y;
      const tdist = Math.hypot(tdx, tdy);
      if (tdist > 8 && now < state.modeUntil - 5000) {
        const sp = BASE_SPEED_WALK * 1.1 * speciesSpeed();
        state.x += (tdx / tdist) * sp * dt;
        state.y += (tdy / tdist) * sp * dt;
        moving = true; moveDx = tdx;
      } else if (tdist <= 8) {
        // arrived — show heart bubble once
        if (!state.clingyShown) {
          state.clingyShown = true;
          showBubble("❤", 2200);
        }
      }
    }
  } else if (state.mode === "scratching") {
    if (now > state.modeUntil) {
      state.facing = -state.facing;
      pickNewTarget(); startWalkLeg(now, false);
    }
  } else if (state.mode === "photo") {
    if (now > state.modeUntil) {
      flashEl.classList.add("hidden");
      pickNewTarget(); startWalkLeg(now, false);
    }
  } else if (state.mode === "startled") {
    if (now > state.modeUntil) {
      pickNewTarget(); startWalkLeg(now, false);
    }
  } else if (state.mode === "bird_watch") {
    if (!state.bird || now > state.modeUntil) {
      pickNewTarget(); startWalkLeg(now, false);
    } else {
      // face the bird
      const bdx = state.bird.x - (state.x + CAT_W / 2);
      if (bdx >  FACING_DEADZONE) state.facing = 1;
      else if (bdx < -FACING_DEADZONE) state.facing = -1;
    }
  } else if (state.mode === "going_home") {
    const tdx = state.homeX - state.x;
    const tdy = state.homeY - state.y;
    const tdist = Math.hypot(tdx, tdy);
    if (tdist < 6 || now > state.modeUntil) {
      state.x = state.homeX;
      state.y = state.homeY;
      state.mode = "in_bed";
      state.modeStartT = now;
    } else {
      const sp = BASE_SPEED_WALK * speciesSpeed();
      state.x += (tdx / tdist) * sp * dt;
      state.y += (tdy / tdist) * sp * dt;
      moving = true; moveDx = tdx;
    }
  } else if (state.mode === "in_bed") {
    // bed-cat — no spontaneous transitions; click + drag handlers manage exit
  } else if (state.mode === "interested") {
    // not a straight chase — orbit/drift toward cursor area
    const desiredDist = 110;  // hover roughly 110px from cursor
    state.interestedJitter += dt * 0.0015;
    const ox = Math.cos(state.interestedJitter) * desiredDist;
    const oy = Math.sin(state.interestedJitter * 1.3) * desiredDist * 0.7;
    const tx = state.cursor.x + ox - CAT_W / 2;
    const ty = state.cursor.y + oy - CAT_H / 2;
    const dx = tx - state.x;
    const dy = ty - state.y;
    const d = Math.hypot(dx, dy);
    if (d > 10) {
      const sp = BASE_SPEED_WALK * 1.1 * speciesSpeed();
      state.x += (dx / d) * sp * dt;
      state.y += (dy / d) * sp * dt;
      moving = true;
      moveDx = cdx;  // facing follows the cursor, not the orbit tangent
    }
  } else if (state.mode === "watching") {
    // freeze, face the cursor (X axis only)
    if (cdx > FACING_DEADZONE) state.facing = 1;
    else if (cdx < -FACING_DEADZONE) state.facing = -1;
  } else if (state.mode === "chasing") {
    const c = state.chase;
    if (!c || now > state.modeUntil) {
      state.chase = null;
      startIdle(now);
    } else if (c.variant === "swat") {
      // pure swat: no movement, render handles the strike
      if (now - c.swatT0 > c.dur) {
        state.chase = null;
        startIdle(now);
      }
    } else if (c.variant === "chase_tail") {
      // spinning in place — render syncs bodyTilt directly
      if (now > state.modeUntil) {
        state.chase = null;
        startIdle(now);
      }
    } else if (c.variant === "leap" || c.variant === "leap_swat") {
      if (now < c.pauseUntil) {
        // between leaps - hold position
      } else if (c.leapT0 === 0) {
        const ok = startLeapHop(now);
        if (!ok) {
          if (c.variant === "leap_swat") {
            c.variant = "swat";
            c.swatT0 = now;
            c.dur = 650;
            state.modeUntil = now + 700;
          } else {
            state.chase = null;
            startIdle(now);
          }
        }
      } else {
        const t = (now - c.leapT0) / c.leapDur;
        if (t >= 1) {
          state.x = c.leapToX;
          state.y = c.leapToY;
          c.leapsLeft -= 1;
          c.leapT0 = 0;
          c.pauseUntil = now + rand(140, 280);
          if (c.leapsLeft <= 0) {
            if (c.variant === "leap_swat") {
              c.variant = "swat";
              c.swatT0 = now + 140;       // small pause then strike
              c.dur = 650;
              state.modeUntil = now + 850;
            } else {
              state.chase = null;
              startIdle(now);
            }
          }
        } else {
          const ease = smoothstep(t);
          state.x = c.leapFromX + (c.leapToX - c.leapFromX) * ease;
          state.y = c.leapFromY + (c.leapToY - c.leapFromY) * ease;
          moving = true;
          moveDx = c.leapToX - c.leapFromX;
        }
      }
    }
  } else if (state.mode === "trick") {
    if (now > state.modeUntil) {
      state.trickAction = null;
      // resume any pending interaction the cat was busy with
      if (state.feed) {
        state.mode = "feeding";
        state.targetX = state.feed.x - CAT_W / 2 + 20;
        state.targetY = state.feed.y - CAT_H / 2 + 30;
        state.modeUntil = state.feed.expireT;
      } else if (state.toy) {
        state.mode = "playing";
        state.targetX = state.toy.x - CAT_W / 2 + 20;
        state.targetY = state.toy.y - CAT_H / 2 + 30;
        state.modeUntil = state.toy.expireT;
      } else {
        pickNewTarget();
        startWalkLeg(now, false);
      }
    } else if (state.trickAction === "pounce" || state.trickAction === "happy_jump") {
      // small forward burst during pounce
      const sp = BASE_SPEED_RUN * 0.7 * speciesSpeed() * state.facing;
      state.x += sp * dt;
      moving = true;
      moveDx = state.facing;
    }
  }

  // facing — only flip when horizontal intent exceeds dead-zone
  if (moving && Math.abs(moveDx) > FACING_DEADZONE) {
    state.facing = moveDx > 0 ? 1 : -1;
  }

  // hop-turn: when facing target differs from current, do a short jump and flip at apex
  if (state.facing !== state.facingActual && !state.turn) {
    state.turn = {
      t0: now,
      dur: 240,
      height: 10,
      from: state.facingActual,
      to: state.facing,
    };
  }

  // keep cat in screen bounds
  const b = bounds();
  state.x = clamp(state.x, b.minX, b.maxX);
  state.y = clamp(state.y, b.minY, b.maxY);

  // ----- jump vertical offset -----
  let jumpY = 0, jumpSquish = 0;
  if (state.jump) {
    const t = (now - state.jump.t0) / state.jump.dur;
    if (t >= 1) {
      state.jump = null;
      jumpSquish = 0.06;   // small landing squish
      spawnDust(state.x + CAT_W / 2, state.y + CAT_H - 2);
    } else {
      jumpY = -Math.sin(t * Math.PI) * state.jump.height;
      if (t < 0.12) jumpSquish = (0.12 - t) / 0.12 * -0.08;  // crouch before jump
      else if (t > 0.92) jumpSquish = (t - 0.92) / 0.08 * 0.06;
    }
  }

  // ----- leap arc vertical offset (during chase leap) -----
  let chaseY = 0;
  if (state.chase && (state.chase.variant === "leap" || state.chase.variant === "leap_swat") && state.chase.leapT0 > 0) {
    const t = (now - state.chase.leapT0) / state.chase.leapDur;
    if (t > 0 && t < 1) chaseY = -Math.sin(t * Math.PI) * state.chase.leapHeight;
  }

  // ----- hop-turn vertical offset + facing flip at apex -----
  let turnY = 0;
  if (state.turn) {
    const t = (now - state.turn.t0) / state.turn.dur;
    if (t >= 1) {
      state.facingActual = state.turn.to;
      state.turn = null;
      spawnDust(state.x + CAT_W / 2, state.y + CAT_H - 2);
    } else {
      turnY = -Math.sin(t * Math.PI) * state.turn.height;
      state.facingActual = (t > 0.5) ? state.turn.to : state.turn.from;
      // tiny squish on take-off & landing
      if (t < 0.15) jumpSquish += (0.15 - t) / 0.15 * -0.05;
      else if (t > 0.85) jumpSquish += (t - 0.85) / 0.15 * 0.04;
    }
  }

  // ----- render base position -----
  catEl.style.left = state.x + "px";
  catEl.style.top  = (state.y + jumpY + turnY + chaseY) + "px";
  catEl.setAttribute("data-facing", state.facingActual >= 0 ? "right" : "left");

  // ----- compute body / leg / tail / face animation -----
  let bodyBob = 0, bodyTilt = 0, tailSwing = 0;
  let bodyScaleX = 1, bodyScaleY = 1;
  let legFLY = 0, legFRY = 0;
  let eyeScaleY = 1, eyeShiftX = 0, eyeShiftY = 0;
  let mouthScaleY = 1, mouthOpenOpacity = 0;

  if (moving) {
    const stepHz = state.gait === "run" ? 90 : 140;
    const phase = (now / stepHz) % (Math.PI * 2);
    const intensity = state.gait === "run" ? 1.5 : 1.0;
    bodyBob   = Math.sin(phase * 2) * 1.8 * intensity;
    bodyTilt  = Math.sin(phase) * 2;
    tailSwing = Math.sin(phase) * (state.gait === "run" ? 22 : 14);
    legFLY    = -Math.max(0, Math.sin(phase)) * 3 * intensity;
    legFRY    = -Math.max(0, Math.sin(phase + Math.PI)) * 3 * intensity;
  } else {
    const phase = (now / 600) % (Math.PI * 2);
    bodyBob   = Math.sin(phase) * 0.5;
    tailSwing = Math.sin(now / 800) * 8;
  }

  // ----- IDLE sub-action overlays -----
  if (state.mode === "idle") {
    const ageRatio = clamp((now - state.idleActionT0) / Math.max(1, state.modeUntil - state.idleActionT0), 0, 1);
    switch (state.idleAction) {
      case "sit":
        bodyScaleY = 0.94; bodyBob = 0; legFLY = 0; legFRY = 0;
        tailSwing = Math.sin(now / 700) * 12;
        break;
      case "yawn":
        mouthOpenOpacity = ageRatio < 0.7 ? 1 : 0;
        mouthScaleY = 1.8;
        eyeScaleY = 0.25;
        break;
      case "stretch":
        // pop into stretch around mid
        bodyScaleX = 1 + Math.sin(ageRatio * Math.PI) * 0.10;
        bodyScaleY = 1 - Math.sin(ageRatio * Math.PI) * 0.08;
        bodyBob = 0;
        tailSwing = Math.sin(now / 400) * 18;
        break;
      case "look":
        // glance to the other side once mid-action
        if (ageRatio > 0.4 && !state.lookFlipped) {
          state.facing = -state.facing;
          state.lookFlipped = true;
        }
        eyeShiftX = Math.sin(now / 300) * 1.2;
        break;
      case "tail_curl":
        tailSwing = -28;  // tail wrapped to side
        eyeShiftX = Math.sin(now / 500) * 0.8;
        break;
      case "shake": {
        // high-freq whole-body shake
        const tt = (now - state.idleActionT0) / 500;
        bodyTilt = Math.sin(now / 32) * 5 * Math.max(0, 1 - tt);
        legFLY = Math.sin(now / 26) * 2.5;
        legFRY = -Math.sin(now / 26) * 2.5;
        tailSwing = Math.sin(now / 38) * 28;
        bodyScaleY = 0.95;
        break;
      }
      case "rollover": {
        // tumble onto back: tilt to 65° and back, paws up
        const tt = clamp((now - state.idleActionT0) / 2400, 0, 1);
        bodyTilt = Math.sin(tt * Math.PI) * 70 * state.facing;
        legFLY = -7 * Math.sin(tt * Math.PI);
        legFRY = -9 * Math.sin(tt * Math.PI);
        tailSwing = Math.sin(tt * Math.PI) * 12;
        if (tt > 0.3 && tt < 0.7) eyeScaleY = 0.5; // squinting belly-up
        break;
      }
      case "loaf": {
        // tucked into a bread shape
        bodyScaleY = 0.86;
        bodyBob = 0;
        legFLY = 4; legFRY = 4;          // paws disappear into body
        tailSwing = -30;                 // tail curled tight
        eyeScaleY = 0.55;                // soft half-lids
        break;
      }
      case "stare": {
        // wide-eyed gaze into the void
        state.stareLocked = true;
        eyeScaleY = 1.15;
        bodyBob *= 0.3;
        break;
      }
      case "wiggle": {
        // pre-pounce butt wiggle
        const tt = clamp((now - state.idleActionT0) / 850, 0, 1);
        bodyTilt = Math.sin(tt * Math.PI * 10) * 7;
        bodyScaleY = 0.93;
        legFLY = 0; legFRY = 0;
        tailSwing = Math.sin(now / 90) * 8 + 6 * state.facing;
        eyeScaleY = 1.1;
        break;
      }
      case "itch": {
        // high-freq paw thump
        const phase = (now / 75) % (Math.PI * 2);
        legFLY = -Math.max(0, Math.sin(phase)) * 6;
        bodyTilt = -3 * state.facing;
        bodyBob = Math.sin(now / 150) * 1.4;
        tailSwing = Math.sin(now / 130) * 10;
        break;
      }
      case "sniff_air": {
        // head tilted up, body sways slightly
        bodyTilt = -8 * state.facing;
        bodyBob = Math.sin(now / 280) * 0.8;
        tailSwing = Math.sin(now / 700) * 6;
        break;
      }
      case "sniff_ground": {
        // head down, body crouched
        bodyTilt = 7 * state.facing;
        bodyScaleY = 0.96;
        bodyBob = Math.sin(now / 320) * 0.6;
        tailSwing = Math.sin(now / 900) * 5;
        break;
      }
      case "sneeze": {
        const t = (now - state.idleActionT0) / 700;
        if (t < 0.3) {
          bodyTilt = 5 * state.facing;
          eyeScaleY = 0.55;
        } else if (t < 0.5) {
          bodyTilt = -12 * state.facing;
          bodyScaleX = 1.06;
          bodyScaleY = 1.04;
          eyeScaleY = 0.08;
          if (!state.sneezeShown) {
            state.sneezeShown = true;
            showBubble(pick(["啊嚏!", "atishoo!", "啾!"]), 900);
          }
        } else {
          bodyTilt = -4 * state.facing;
        }
        break;
      }
      case "fold_paws": {
        bodyScaleY = 0.94;
        bodyBob = 0;
        legFLY = -1; legFRY = -1;
        tailSwing = -22;
        break;
      }
      case "sideways": {
        // settle onto side
        const t = clamp((now - state.idleActionT0) / 1200, 0, 1);
        bodyTilt = smoothstep(t) * 68 * state.facing;
        bodyBob = Math.sin(now / 1100) * 1.0;
        legFLY = -3; legFRY = -5;
        tailSwing = -16;
        break;
      }
    }
  }

  // ----- SLEEPING animation -----
  if (state.mode === "sleeping") {
    eyeScaleY = 0.05;
    bodyScaleY = 0.92;
    bodyBob = Math.sin(now / 1000) * 1.4;   // slow breathing
    tailSwing = Math.sin(now / 1800) * 4;
    legFLY = 0; legFRY = 0;
    mouthScaleY = 1;
    mouthOpenOpacity = 0;
    // occasional Zzz bubble
    if (!showBubble._t || (now - (showBubble._lastZzz || 0) > 5500)) {
      showBubble._lastZzz = now;
      showBubble(pick(SLEEPY), 2200);
    }
  }

  // sleepy but awake — start drooping
  if (state.mode !== "sleeping" && state.sleepiness > 75) {
    eyeScaleY = Math.min(eyeScaleY, 0.5);
  }

  // declarations used across multiple mode-render blocks below
  let swatPawShiftX = 0, swatPawShiftY = 0;
  let swatPawWhich = null;

  // ----- New mode visuals -----
  if (state.mode === "pet") {
    eyeScaleY = 0.35;
    bodyTilt = Math.sin(now / 240) * 6;
    bodyBob = Math.sin(now / 600) * 0.8;
    tailSwing = Math.sin(now / 700) * 12;
    mouthScaleY = 0.85;
  } else if (state.mode === "dragged") {
    legFLY = 7; legFRY = 7;
    tailSwing = -6;
    bodyTilt = 0;
    eyeScaleY = 1.2;
    mouthOpenOpacity = 0.6;
    mouthScaleY = 1.4;
  } else if (state.mode === "dizzy") {
    const tt = (now - state.modeStartT) / 900;
    bodyTilt = Math.sin(now / 70) * 14 * Math.max(0, 1 - tt);
    eyeScaleY = 0.5;
  } else if (state.mode === "feeding" && state.feed && state.feed.eatT0) {
    // eating animation
    const eatPhase = (now / 180) % (Math.PI * 2);
    mouthOpenOpacity = Math.abs(Math.sin(eatPhase)) > 0.5 ? 1 : 0;
    mouthScaleY = 1.3;
    bodyTilt = -8 * state.facing;
    bodyBob = Math.sin(now / 200) * 1.2;
  } else if (state.mode === "playing" && state.toy && state.toy.swatT0) {
    // swat / pounce on the toy
    const swatDur = (state.toy.type === "laser" || state.toy.type === "wand") ? 380 : 520;
    const t = (now - state.toy.swatT0) / swatDur;
    if (t < 1.0) {
      const k = Math.sin(clamp(t, 0, 1) * Math.PI);
      bodyTilt += -14 * state.facing * k;
      // paw shoots forward (use the swatPawShift system used by chasing swat)
      swatPawShiftX = 16 * k;
      swatPawShiftY = -7 * k;
      swatPawWhich = state.facing > 0 ? "fr" : "fl";
      mouthOpenOpacity = 1;
      mouthScaleY = 1.4;
      eyeScaleY = 1.18;
    } else {
      // clean up swat marker after animation
      state.toy.swatT0 = 0;
    }
  } else if (state.mode === "clingy" && state.clingyShown) {
    // sit beside user, slow tail wag, half-lid
    bodyScaleY = 0.94;
    legFLY = 0; legFRY = 0;
    tailSwing = Math.sin(now / 600) * 16;
    eyeScaleY = 0.65;
  } else if (state.mode === "scratching") {
    const tt = (now - state.modeStartT) / 1500;
    const phase = (now / 90) % (Math.PI * 2);
    bodyTilt = -10 * state.facing;
    // forelegs alternate at the wall
    if (state.facing > 0) {
      legFRY = -Math.max(0, Math.sin(phase)) * 5;
      legFLY = -Math.max(0, Math.sin(phase + Math.PI)) * 3;
    } else {
      legFLY = -Math.max(0, Math.sin(phase)) * 5;
      legFRY = -Math.max(0, Math.sin(phase + Math.PI)) * 3;
    }
    eyeScaleY = 1.05;
  } else if (state.mode === "startled") {
    const t = (now - state.modeStartT) / 1100;
    bodyScaleY = 0.86;
    bodyScaleX = 1.14;
    tailSwing = -55;
    bodyBob = Math.sin(now / 75) * 2 * Math.max(0, 1 - t);
    eyeScaleY = 1.15;
    legFLY = -2; legFRY = -2;
  } else if (state.mode === "bird_watch") {
    // tilt head up + excited tail swish
    bodyTilt = -7 * state.facing;
    bodyBob = Math.sin(now / 350) * 0.8;
    tailSwing = Math.sin(now / 220) * 18;
    eyeScaleY = 1.12;
    legFLY = 0; legFRY = 0;
  } else if (state.mode === "in_bed") {
    // standing pose, eyes closed, gentle breathing — no tilt, no scale change
    bodyTilt = 0;
    bodyScaleX = 1; bodyScaleY = 1;
    bodyBob = Math.sin(now / 1100) * 1.2;
    legFLY = 0; legFRY = 0;
    tailSwing = -10 + Math.sin(now / 1900) * 4;
    eyeScaleY = 0.05;
    mouthScaleY = 1; mouthOpenOpacity = 0;
  } else if (state.mode === "going_home") {
    // sleepy, drooping
    eyeScaleY = 0.5;
    bodyTilt = 2 * state.facing;
    tailSwing = Math.sin(now / 700) * 6;
  } else if (state.mode === "photo") {
    const t = (now - state.modeStartT) / 1500;
    bodyBob = 0; bodyTilt = 0;
    legFLY = 0; legFRY = 0;
    tailSwing = 0;
    // blink during flash
    if (t > 0.50 && t < 0.62) eyeScaleY = 0.08;
    else eyeScaleY = 1.05;
    mouthScaleY = 1.1;
  }

  // ----- TRICK animations -----
  if (state.mode === "trick") {
    const t = (now - state.trickT0) / Math.max(1, state.modeUntil - state.trickT0);
    switch (state.trickAction) {
      case "meow":
        mouthOpenOpacity = t < 0.6 ? 1 : 0;
        mouthScaleY = 1.5;
        break;
      case "heart":
        eyeScaleY = 1; mouthScaleY = 1.1;
        bodyBob = Math.sin(t * Math.PI * 2) * 2;
        break;
      case "spin":
        bodyTilt = t * 360;  // full spin
        break;
      case "pounce":
        bodyScaleX = 1 + Math.sin(t * Math.PI) * 0.05;
        eyeScaleY = 1.1;
        mouthOpenOpacity = t > 0.2 && t < 0.5 ? 1 : 0;
        break;
      case "happy_jump":
        bodyScaleX = 1 - Math.sin(t * Math.PI) * 0.05;
        bodyScaleY = 1 + Math.sin(t * Math.PI) * 0.08;
        break;
      case "grumpy":
        // puffed up + tail bristled + rapid micro-shake
        bodyScaleY = 1 + Math.sin(t * Math.PI) * 0.10;
        bodyScaleX = 1 + Math.sin(t * Math.PI) * 0.07;
        bodyTilt   = Math.sin(now / 60) * 2;
        tailSwing  = -55 + Math.sin(now / 80) * 10;
        legFLY     = Math.sin(now / 60) * 1.5;
        legFRY     = -Math.sin(now / 60) * 1.5;
        break;
      case "wave": {
        // raise the forward paw and shake it
        const liftK = Math.sin(Math.min(1, t * 1.5) * Math.PI / 2);
        const wagY  = Math.sin(t * Math.PI * 4) * 2;
        const lift  = -14 * liftK + wagY;
        if (state.facing > 0) legFRY = lift;
        else                  legFLY = lift;
        bodyBob = Math.sin(t * Math.PI * 2) * 0.8;
        break;
      }
      case "shy":
        bodyScaleY = 0.94;
        bodyTilt = -4 * state.facing;
        legFLY = 1; legFRY = 1;
        tailSwing = -28;
        bodyBob = Math.sin(now / 350) * 0.6;
        break;
      case "swat_cursor": {
        // see "chasing swat" — paw shoots toward cursor
        const tt = t;
        if (tt < 0.25) { bodyScaleY = 0.93; }
        else if (tt < 0.6) {
          const k = Math.sin((tt - 0.25) / 0.35 * Math.PI);
          bodyTilt += -12 * state.facing * k;
          mouthOpenOpacity = 1; mouthScaleY = 1.4;
        }
        break;
      }
    }
  }

  // chasing tilt (small)
  if (state.mode === "interested" && cdist > CHASE_DEADZONE) {
    bodyTilt += clamp(cdy / 30, -6, 6) * (state.facingActual >= 0 ? 1 : -1);
  }

  // zoomies: forward lean + ears-back vibe via slight pitch
  if (state.zoom && moving) {
    bodyTilt += 5 * (state.facingActual >= 0 ? 1 : -1);
  }

  // ----- CHASE rendering: leap forward lean + swat strike pose -----
  // (moved swatPaw* declarations earlier)
  if (state.mode === "chasing" && state.chase) {
    const c = state.chase;
    if (c.variant === "leap" || c.variant === "leap_swat") {
      if (c.leapT0 > 0) {
        const t = (now - c.leapT0) / c.leapDur;
        if (t > 0 && t < 1) {
          // forelegs stretch forward through the leap, tail trails up
          legFLY = -Math.sin(t * Math.PI) * 4;
          legFRY = -Math.sin(t * Math.PI) * 4;
          bodyTilt += -8 * (state.facingActual >= 0 ? 1 : -1);
          tailSwing = -28;
          eyeScaleY = 1.1;
        } else if (t >= 1) {
          jumpSquish += 0.06;  // land squish
        }
      } else if (now < c.pauseUntil) {
        // crouch between leaps
        bodyScaleY = 0.94;
        legFLY = 1; legFRY = 1;
      }
    }
    if (c.variant === "swat" && c.swatT0 && now >= c.swatT0) {
      const t = (now - c.swatT0) / c.dur;
      if (t < 0.20) {
        // anticipation - crouch low, eyes wide
        bodyScaleY = 0.90;
        bodyBob = 1.2;
        eyeScaleY = 1.15;
      } else if (t < 0.50) {
        // strike - lunge & paw forward
        const k = Math.sin((t - 0.20) / 0.30 * Math.PI);
        bodyTilt += -12 * (state.facingActual >= 0 ? 1 : -1) * k;
        swatPawShiftX = 14 * k;
        swatPawShiftY = -6 * k;
        swatPawWhich = state.facing > 0 ? "fr" : "fl";
        mouthOpenOpacity = 1; mouthScaleY = 1.4;
        eyeScaleY = 1.15;
      } else if (t < 0.80) {
        // recover
        const k = 1 - (t - 0.50) / 0.30;
        bodyTilt += -6 * (state.facingActual >= 0 ? 1 : -1) * k;
        swatPawShiftX = 6 * k;
        swatPawShiftY = -3 * k;
        swatPawWhich = state.facing > 0 ? "fr" : "fl";
        mouthScaleY = 1.1;
      }
    }
  }

  // tail wag overlay — additive on top of base tail motion (skip for poses that have their own tail look)
  const skipWag = (state.mode === "trick" && state.trickAction === "grumpy")
               || (state.mode === "startled");
  if (state.tailWag && !skipWag) {
    const w = state.tailWag;
    const localT = (now - w.t0) / 1000;
    const lifeT = (now - w.t0) / w.dur;
    const env = Math.sin(clamp(lifeT, 0, 1) * Math.PI); // fade in & out
    tailSwing += Math.sin(localT * Math.PI * 2 * w.freq) * w.intensity * env;
  }

  // watching visual: stand alert, tail up, slight pitch toward cursor
  if (state.mode === "watching") {
    bodyBob = 0;
    bodyScaleY = 0.97;
    tailSwing = -22;
    bodyTilt += clamp(cdy / 60, -3, 3);
    legFLY = 0; legFRY = 0;
  }

  // landing / take-off squish (from jump or hop-turn)
  bodyScaleY += jumpSquish;

  // ----- eye gaze tracking (follows cursor freely, small range) -----
  const eyeCx = state.x + CAT_W / 2;
  const eyeCy = state.y + 50;
  const exDir = state.cursor.x - eyeCx;
  const eyDir = state.cursor.y - eyeCy;
  const ed = Math.hypot(exDir, eyDir);
  if (cursorAlive && ed > 1 && !state.stareLocked) {
    const intensity = state.mode === "watching" ? 1.25 : 0.9;
    const fx = clamp((exDir / ed) * 2.6 * intensity, -2.6, 2.6);
    const fy = clamp((eyDir / ed) * 1.9 * intensity, -1.9, 1.9);
    const flip = state.facingActual >= 0 ? 1 : -1;  // counter the body scaleX
    eyeShiftX += fx * flip;
    eyeShiftY += fy;
  }

  // blink overrides eyeScaleY (apply before lerp so the blink is sharp)
  if (now < blinkUntil) eyeScaleY = Math.min(eyeScaleY, 0.08);
  // global yawn flag (auto from periodic)
  if (now < yawnUntil) { mouthOpenOpacity = 1; mouthScaleY = Math.max(mouthScaleY, 1.6); }

  // ----- select face (eyes + mouth variant) -----
  selectFace(now);

  // chase_tail: spinning in place — apply rotation directly (sync, not lerped)
  if (state.mode === "chasing" && state.chase && state.chase.variant === "chase_tail") {
    const spinT = (now - state.chase.spinT0) / Math.max(1, state.modeUntil - state.chase.spinT0);
    bodyTilt = spinT * 720 * state.facing;
    bodyBob = Math.sin(now / 90) * 1.5;
    tailSwing = Math.sin(now / 70) * 30;
    legFLY = Math.sin(now / 100) * 2;
    legFRY = -Math.sin(now / 100) * 2;
  }

  // ----- low-pass smoothing — kills mode-switch pops -----
  // spin / chase_tail need raw bodyTilt or rotation lags
  const isSpinning =
    (state.mode === "trick" && state.trickAction === "spin")
    || (state.mode === "chasing" && state.chase && state.chase.variant === "chase_tail");
  if (isSpinning) state.disp.bodyTilt = bodyTilt;
  else            lerpDisp("bodyTilt", bodyTilt, dt, 70);
  lerpDisp("bodyScaleX", bodyScaleX, dt, 70);
  lerpDisp("bodyScaleY", bodyScaleY, dt, 70);
  lerpDisp("bodyBob",    bodyBob,    dt, 50);
  lerpDisp("tailSwing",  tailSwing,  dt, 55);
  lerpDisp("legFLY",     legFLY,     dt, 55);
  lerpDisp("legFRY",     legFRY,     dt, 55);
  lerpDisp("eyeScaleY",  eyeScaleY,  dt, now < blinkUntil ? 25 : 60);  // crisper for blinks
  lerpDisp("eyeShiftX",  eyeShiftX,  dt, 80);
  lerpDisp("eyeShiftY",  eyeShiftY,  dt, 80);
  lerpDisp("mouthScaleY",      mouthScaleY,      dt, 70);
  lerpDisp("mouthOpenOpacity", mouthOpenOpacity, dt, 60);

  // pupil dilation: large when excited, small when calm
  let pupilTarget = 1;
  if (state.mode === "chasing" || state.mode === "interested" || state.mode === "playing"
      || state.mode === "watching" || state.mode === "startled" || state.mode === "feeding") {
    pupilTarget = 1.18;
  } else if (state.mode === "sleeping" || (state.mode === "idle" && (state.idleAction === "loaf" || state.idleAction === "sideways"))) {
    pupilTarget = 0.82;
  } else if (state.sleepiness > 70) {
    pupilTarget = 0.9;
  }
  lerpDisp("pupilScale", pupilTarget, dt, 220);
  // (top-down sleeping pose disabled — sleeping keeps the normal cat-body)
  const D = state.disp;

  // ----- apply transforms (using smoothed values) -----
  const finalScaleX = state.facingActual * D.bodyScaleX;
  bodyEl.style.transform = `translateY(${D.bodyBob}px) rotate(${D.bodyTilt}deg) scale(${finalScaleX}, ${D.bodyScaleY})`;
  tail.style.transform = `rotate(${D.tailSwing}deg)`;
  if (swatPawWhich === "fl") {
    legFL.style.transform = `translate(${swatPawShiftX}px, ${D.legFLY + swatPawShiftY}px)`;
    legFR.style.transform = `translateY(${D.legFRY}px)`;
  } else if (swatPawWhich === "fr") {
    legFL.style.transform = `translateY(${D.legFLY}px)`;
    legFR.style.transform = `translate(${swatPawShiftX}px, ${D.legFRY + swatPawShiftY}px)`;
  } else {
    legFL.style.transform = `translateY(${D.legFLY}px)`;
    legFR.style.transform = `translateY(${D.legFRY}px)`;
  }
  legBL.style.transform = "";
  legBR.style.transform = "";
  head.style.transform = "";

  eyeL.style.transform = `translate(${D.eyeShiftX}px, ${D.eyeShiftY}px) scale(${D.pupilScale}, ${D.pupilScale * D.eyeScaleY})`;
  eyeR.style.transform = `translate(${D.eyeShiftX}px, ${D.eyeShiftY}px) scale(${D.pupilScale}, ${D.pupilScale * D.eyeScaleY})`;
  mouthOpen.style.opacity = String(D.mouthOpenOpacity);
  mouth.style.transform = `scaleY(${D.mouthScaleY})`;

  // whisker independent sway — bigger when relaxed/pet, smaller when alert
  const wAmp = (state.mode === "pet" || state.mode === "sleeping") ? 4
             : (state.mode === "chasing" || state.mode === "interested" || state.mode === "playing") ? 1
             : 2.2;
  const wPhase = now / 700;
  whiskerL.style.transform = `rotate(${Math.sin(wPhase)       * wAmp}deg)`;
  whiskerR.style.transform = `rotate(${Math.sin(wPhase + 0.4) * wAmp}deg)`;

  // ----- bed (visible during go-home / in-bed / dragging a bed-cat) -----
  const draggingFromBed = state.mode === "dragged" && state.press && state.press.fromInBed;
  const bedVisible = state.mode === "in_bed" || state.mode === "going_home" || draggingFromBed;
  if (bedVisible) {
    if (bedEl.dataset.species !== state.species) {
      bedEl.dataset.species = state.species;
      const decoIcon = bedEl.querySelector(".bed-deco-icon");
      if (decoIcon) decoIcon.textContent = state.species === "pig" ? "🌾" : state.species === "bear" ? "🍯" : "💗";
    }
    // going_home: bed sits at home waiting; otherwise bed travels under the cat
    const bx = (state.mode === "going_home") ? state.homeX : state.x;
    const by = (state.mode === "going_home") ? state.homeY : state.y;
    bedEl.style.left = (bx + CAT_W / 2) + "px";
    bedEl.style.top  = (by + CAT_H - 18) + "px";
    bedEl.classList.remove("hidden");
  } else if (!bedEl.classList.contains("hidden")) {
    bedEl.classList.add("hidden");
  }

  // ----- passthrough hit-test -----
  const ctxOpen = !ctxMenuEl.classList.contains("hidden");
  let hit = ctxOpen;
  if (!hit && cursorAlive) {
    hit = state.cursor.x >= state.x - 6
       && state.cursor.x <= state.x + CAT_W + 6
       && state.cursor.y >= state.y - 6
       && state.cursor.y <= state.y + CAT_H + 6;
  }
  const want = !hit;
  if (want !== state.passthrough) {
    state.passthrough = want;
    invoke("set_passthrough", { enabled: want }).catch(() => {});
  }

  requestAnimationFrame(tick);
 } catch (err) {
  const div = document.createElement("div");
  div.style.cssText = "position:fixed;top:140px;left:20px;background:#900;color:#fff;padding:8px 12px;font:12px monospace;z-index:9999;border-radius:6px;max-width:80vw;white-space:pre-wrap;";
  div.textContent = "TICK ERR: " + (err && err.message) + "\n" + (err && err.stack || "").split("\n").slice(0, 4).join("\n");
  document.body.appendChild(div);
  // try to keep ticking so other frames can run
  requestAnimationFrame(tick);
 }
}

// ===== Wire up =====
window.addEventListener("DOMContentLoaded", () => {
  // default starting position
  state.x = window.innerWidth * 0.5 - CAT_W / 2;
  state.y = window.innerHeight * 0.6;
  // default "home" — bottom-right corner, out of the way
  state.homeX = window.innerWidth - CAT_W - 80;
  state.homeY = window.innerHeight - CAT_H - 80;
  pickNewTarget();
  applyHoliday();

  catEl.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    const now = performance.now();
    if (state.mode === "sleeping") {
      wakeUp(now);
      return;
    }
    state.press = {
      t0: now, x: e.clientX, y: e.clientY,
      drag: false, pet: false,
      fromInBed: state.mode === "in_bed",
    };
  });

  document.addEventListener("mousemove", (e) => {
    if (!state.press) return;
    const dx = e.clientX - state.press.x;
    const dy = e.clientY - state.press.y;
    if (!state.press.drag && !state.press.pet && Math.hypot(dx, dy) > 8) {
      // start drag
      state.press.drag = true;
      state.dragOffsetX = state.press.x - state.x;
      state.dragOffsetY = state.press.y - state.y;
      state.mode = "dragged";
      state.modeStartT = performance.now();
      state.jump = null; state.turn = null; state.chase = null;
    }
    if (state.mode === "dragged") {
      state.x = e.clientX - state.dragOffsetX;
      state.y = e.clientY - state.dragOffsetY;
    }
  });

  document.addEventListener("mouseup", (e) => {
    if (!state.press || e.button !== 0) return;
    const press = state.press; state.press = null;
    const now = performance.now();
    if (press.drag) {
      if (press.fromInBed) {
        // moved bed-bound cat → bed moves with her, stays asleep
        state.homeX = state.x;
        state.homeY = state.y;
        state.mode = "in_bed";
      } else {
        // released after dragging → dizzy reaction
        state.mode = "dizzy";
        state.modeStartT = now;
        state.modeUntil = now + 900;
        showBubble("(°ロ°)", 800);
        bumpMood(-8);
      }
    } else if (press.pet) {
      // end pet
      state.mode = "walking";
      pickNewTarget();
      startWalkLeg(now, false);
      bubbleEl.classList.add("hidden");
      triggerTailWag(now, 26, 5, 1000);
      bumpMood(12);
    } else if (press.fromInBed) {
      // short tap on bed-cat → wake her up
      wakeFromBed(now);
    } else {
      // short click → trick
      // mood-weighted pick — low mood gets more grumpy/shy, high mood gets more heart/jump
      const m = state.mood / 100;
      const weights = [
        ["meow",       0.22, 0.22],
        ["heart",      0.05, 0.32],
        ["spin",       0.10, 0.18],
        ["pounce",     0.10, 0.10],
        ["happy_jump", 0.04, 0.14],
        ["grumpy",     0.30, 0.02],
        ["wave",       0.05, 0.12],
        ["shy",        0.14, 0.06],
      ];
      let total = 0;
      const ws = weights.map(([, w0, w1]) => { const w = w0 * (1 - m) + w1 * m; total += w; return w; });
      let r = Math.random() * total;
      let action = "meow";
      for (let i = 0; i < weights.length; i++) {
        r -= ws[i];
        if (r < 0) { action = weights[i][0]; break; }
      }
      bumpMood(2);   // attention → small mood boost
      startTrick(now, action);
    }
  });

  catEl.addEventListener("dblclick", (e) => {
    if (e.button !== 0) return;
    if (state.mode === "sleeping" || state.mode === "feeding"
        || state.mode === "in_bed" || state.mode === "going_home") return;
    spawnFeed(performance.now());
  });

  // ===== Right-click context menu =====
  function showCtxMenu(clientX, clientY) {
    updateInfoPanel();
    // mark current species with ✓
    ctxMenuEl.querySelectorAll(".ctx-item[data-species]").forEach(it => {
      if (it.dataset.species === state.species) it.classList.add("active");
      else it.classList.remove("active");
    });
    // show only the color row for current species
    const currentColor = catEl.getAttribute("data-color");
    ctxMenuEl.querySelectorAll(".ctx-item[data-color]").forEach(it => {
      const shown = it.classList.contains("color-" + state.species);
      it.style.display = shown ? "" : "none";
      if (shown && it.dataset.color === currentColor) it.classList.add("active");
      else it.classList.remove("active");
    });
    // mark the currently-active toy with ✓
    ctxMenuEl.querySelectorAll(".ctx-item[data-toy]").forEach(it => {
      if (state.toy && it.dataset.toy === state.toy.type) it.classList.add("active");
      else it.classList.remove("active");
    });
    // hide the cancel row when no toy is out
    const cancelRow = ctxMenuEl.querySelector('.ctx-item[data-act="toy-cancel"]');
    if (cancelRow) cancelRow.style.display = state.toy ? "" : "none";

    ctxMenuEl.classList.remove("hidden");
    requestAnimationFrame(() => {
      const r = ctxMenuEl.getBoundingClientRect();
      let x = clientX, y = clientY;
      if (x + r.width  > window.innerWidth)  x = window.innerWidth  - r.width  - 8;
      if (y + r.height > window.innerHeight) y = window.innerHeight - r.height - 8;
      ctxMenuEl.style.left = x + "px";
      ctxMenuEl.style.top  = y + "px";
    });
  }
  function hideCtxMenu() { ctxMenuEl.classList.add("hidden"); }

  catEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
    showCtxMenu(e.clientX, e.clientY);
  });
  // also catch right-click on the bubble/anywhere on cat area
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  ctxMenuEl.addEventListener("click", (e) => {
    const item = e.target.closest(".ctx-item");
    if (!item) return;
    const color = item.dataset.color;
    const act = item.dataset.act;
    if (act === "species") {
      const sp = item.dataset.species;
      if (ALL_SPECIES.includes(sp) && sp !== state.species) {
        state.species = sp;
        catEl.setAttribute("data-species", sp);
        catEl.setAttribute("data-color", SPECIES_DEFAULT_COLOR[sp]);
        showBubble("...?", 900);
      }
    } else if (color && COLORS.includes(color)) {
      catEl.setAttribute("data-color", color);
      showBubble("好看吗?", 1200);
    } else if (act === "sleep") {
      startSleeping(performance.now());
    } else if (act === "go-home") {
      goHome(performance.now());
    } else if (act === "feed") {
      spawnFeed(performance.now());
    } else if (act === "photo") {
      takePhoto(performance.now());
    } else if (act === "toy") {
      const type = item.dataset.toy || undefined;
      const now = performance.now();
      if (state.toy && state.toy.type === type) {
        cancelToy(now);                       // toggle off the active toy
      } else {
        if (state.toy) cancelToy(now);        // swap out whatever was out
        spawnToy(now, type);
      }
    } else if (act === "toy-cancel") {
      cancelToy(performance.now());
    } else if (act === "quit") {
      invoke("quit_app").catch(() => {});
    }
    hideCtxMenu();
  });

  // dismiss menu on outside click / Escape
  document.addEventListener("mousedown", (e) => {
    if (ctxMenuEl.classList.contains("hidden")) return;
    if (!ctxMenuEl.contains(e.target)) hideCtxMenu();
  }, true);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideCtxMenu();
      if (state.toy) cancelToy(performance.now());
    }
  });

  listen("cursor", (event) => {
    const [x, y] = event.payload;
    state.cursor.x = x;
    state.cursor.y = y;
    state.cursor.ts = performance.now();
  });

  listen("change-color", (event) => {
    const c = event.payload;
    if (COLORS.includes(c)) {
      catEl.setAttribute("data-color", c);
      showBubble("好看吗?", 1200);
    }
  });

  requestAnimationFrame(tick);
});
