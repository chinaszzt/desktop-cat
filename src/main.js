const { invoke } = window.__TAURI__.core;
const { listen } = window.__TAURI__.event;

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

  <path d="M 30 40 Q 28 30, 40 30 Q 50 34, 48 42 Q 40 44, 30 40 Z" fill="var(--body)"/>
  <path d="M 36 38 Q 36 33, 42 34 Q 45 38, 42 41 Q 38 41, 36 38 Z" fill="var(--inner-ear)" opacity="0.85"/>
  <path d="M 90 40 Q 92 30, 80 30 Q 70 34, 72 42 Q 80 44, 90 40 Z" fill="var(--body)"/>
  <path d="M 84 38 Q 84 33, 78 34 Q 75 38, 78 41 Q 82 41, 84 38 Z" fill="var(--inner-ear)" opacity="0.85"/>

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

  <path d="M 57 70 L 63 70 L 60 73 Z" fill="var(--nose)"/>

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

  <path d="M 40 72 L 26 70" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
  <path d="M 40 74 L 26 76" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
  <path d="M 80 72 L 94 70" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>
  <path d="M 80 74 L 94 76" stroke="var(--whisker)" stroke-width="1" stroke-linecap="round" opacity="0.85"/>

  <g id="leg-fl" style="transform-origin: 42px 95px;">
    <ellipse cx="42" cy="98" rx="9" ry="5" fill="var(--body-dark)"/>
  </g>
  <g id="leg-fr" style="transform-origin: 82px 95px;">
    <ellipse cx="82" cy="98" rx="9" ry="5" fill="var(--body-dark)"/>
  </g>
</svg>`;

// ===== State =====
const COLORS = ["orange", "calico", "cow", "tabby", "tuxedo"];
const MEOWS = ["喵~", "喵喵~", "喵呜~", "咕噜咕噜..."];
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
  // smoothed display values (1st-order low-pass per frame) — kills mode-switch pops
  disp: {
    bodyTilt: 0, bodyScaleX: 1, bodyScaleY: 1, bodyBob: 0,
    tailSwing: 0, legFLY: 0, legFRY: 0,
    eyeScaleY: 1, eyeShiftX: 0, eyeShiftY: 0,
    mouthScaleY: 1, mouthOpenOpacity: 0,
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

bodyEl.innerHTML = CAT_SVG;

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

function spawnFeed(now) {
  if (state.feed) return;
  if (state.mode === "sleeping") wakeUp(now);
  const b = bounds();
  const dir = state.facing;
  const fx = clamp(state.x + (dir > 0 ? 120 : -120) + rand(-30, 30), b.minX + 10, b.maxX - 10);
  const fy = clamp(state.y + rand(-10, 30), b.minY + 10, b.maxY - 10);
  state.feed = { x: fx, y: fy, eaten: false, t0: now, expireT: now + 25000 };
  feedEl.style.left = (fx + 30) + "px";
  feedEl.style.top  = (fy + 30) + "px";
  feedEl.classList.remove("hidden");
  feedEl.style.animation = "none"; void feedEl.offsetWidth; feedEl.style.animation = "";
  // cat heads toward feed
  state.mode = "feeding";
  state.modeStartT = now;
  state.targetX = fx - CAT_W / 2 + 20;
  state.targetY = fy - CAT_H / 2 + 30;
  state.modeUntil = now + 12000;
  state.chase = null; state.jump = null;
}

function spawnToy(now) {
  if (state.toy) return;
  if (state.mode === "sleeping") wakeUp(now);
  const b = bounds();
  const tx = clamp(state.x + rand(-300, 300), b.minX + 50, b.maxX - 50);
  const ty = clamp(state.y + rand(-200, 200), b.minY + 50, b.maxY - 50);
  state.toy = { x: tx, y: ty, hits: 0, target: 3 + Math.floor(Math.random() * 3), t0: now, expireT: now + 30000 };
  state.lastToySpawnT = now;
  toyEl.style.left = (tx + 30) + "px";
  toyEl.style.top  = (ty + 30) + "px";
  toyEl.classList.remove("hidden");
  toyEl.style.animation = "none"; void toyEl.offsetWidth; toyEl.style.animation = "";
  state.mode = "playing";
  state.modeStartT = now;
  state.targetX = tx - CAT_W / 2 + 20;
  state.targetY = ty - CAT_H / 2 + 30;
  state.modeUntil = now + 20000;
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
  if (action === "meow")   { showBubble(pick(MEOWS), 1300); triggerBlink(); }
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
  const dt = Math.min(50, now - lastT);
  lastT = now;

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
    "feeding", "playing", "clingy", "scratching", "photo", "startled"
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
        const sp = (state.gait === "run" ? BASE_SPEED_RUN : BASE_SPEED_WALK) * easing * zoomBoost;
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
          state.sleepiness = Math.max(0, state.sleepiness - 25);
          triggerTailWag(now, 30, 7, 1800);
          showBubble("好饱~ 喵呜!", 1500);
          state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
        }
      } else {
        const sp = BASE_SPEED_RUN;
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
      const tdx = state.toy.x - 20 - state.x;
      const tdy = state.toy.y - 30 - state.y;
      const tdist = Math.hypot(tdx, tdy);
      if (tdist < 35) {
        // close → swat the toy on a short cooldown
        if (!state.toy.swatT0) state.toy.swatT0 = now;
        if (now - state.toy.swatT0 > 550) {
          state.toy.hits += 1;
          state.toy.swatT0 = now;
          // toy bounces to a new spot nearby
          const b = bounds();
          state.toy.x = clamp(state.toy.x + rand(-90, 90), b.minX + 20, b.maxX - 20);
          state.toy.y = clamp(state.toy.y + rand(-50, 50), b.minY + 20, b.maxY - 20);
          toyEl.style.left = (state.toy.x + 30) + "px";
          toyEl.style.top  = (state.toy.y + 30) + "px";
          if (state.toy.hits >= state.toy.target) {
            toyEl.classList.add("hidden");
            state.toy = null;
            showBubble("玩够了~", 1200);
            state.mode = "walking"; pickNewTarget(); startWalkLeg(now, false);
          }
        }
      } else {
        const sp = BASE_SPEED_RUN;
        state.x += (tdx / tdist) * sp * dt;
        state.y += (tdy / tdist) * sp * dt;
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
        const sp = BASE_SPEED_WALK * 1.1;
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
      const sp = BASE_SPEED_WALK * 1.1;
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
      const sp = BASE_SPEED_RUN * 0.7 * state.facing;
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
    // swat the toy mid-strike
    const t = (now - state.toy.swatT0) / 550;
    if (t < 0.4) {
      const k = Math.sin(t / 0.4 * Math.PI);
      bodyTilt += -12 * state.facing * k;
      const ext = 12 * k;
      if (state.facing > 0) legFRY = -ext * 0.7;
      else legFLY = -ext * 0.7;
      mouthOpenOpacity = 1; mouthScaleY = 1.3; eyeScaleY = 1.15;
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
  let swatPawShiftX = 0, swatPawShiftY = 0;
  let swatPawWhich = null;
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

  eyeL.style.transform = `translate(${D.eyeShiftX}px, ${D.eyeShiftY}px) scaleY(${D.eyeScaleY})`;
  eyeR.style.transform = `translate(${D.eyeShiftX}px, ${D.eyeShiftY}px) scaleY(${D.eyeScaleY})`;
  mouthOpen.style.opacity = String(D.mouthOpenOpacity);
  mouth.style.transform = `scaleY(${D.mouthScaleY})`;

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
}

// ===== Wire up =====
window.addEventListener("DOMContentLoaded", () => {
  // default starting position
  state.x = window.innerWidth * 0.5 - CAT_W / 2;
  state.y = window.innerHeight * 0.6;
  pickNewTarget();
  applyHoliday();

  catEl.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    const now = performance.now();
    if (state.mode === "sleeping") {
      wakeUp(now);
      return;
    }
    state.press = { t0: now, x: e.clientX, y: e.clientY, drag: false, pet: false };
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
      // released after dragging → dizzy reaction
      state.mode = "dizzy";
      state.modeStartT = now;
      state.modeUntil = now + 900;
      showBubble("(°ロ°)", 800);
    } else if (press.pet) {
      // end pet
      state.mode = "walking";
      pickNewTarget();
      startWalkLeg(now, false);
      bubbleEl.classList.add("hidden");
      triggerTailWag(now, 26, 5, 1000);
    } else {
      // short click → trick
      const r = Math.random();
      let action;
      if      (r < 0.26) action = "meow";
      else if (r < 0.44) action = "heart";
      else if (r < 0.56) action = "spin";
      else if (r < 0.65) action = "pounce";
      else if (r < 0.73) action = "happy_jump";
      else if (r < 0.83) action = "grumpy";
      else if (r < 0.92) action = "wave";
      else               action = "shy";
      startTrick(now, action);
    }
  });

  catEl.addEventListener("dblclick", (e) => {
    if (e.button !== 0) return;
    if (state.mode === "sleeping" || state.mode === "feeding") return;
    spawnFeed(performance.now());
  });

  // ===== Right-click context menu =====
  function showCtxMenu(clientX, clientY) {
    ctxMenuEl.classList.remove("hidden");
    // measure then position so it never goes offscreen
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
    if (color && COLORS.includes(color)) {
      catEl.setAttribute("data-color", color);
      showBubble("好看吗?", 1200);
    } else if (act === "sleep") {
      startSleeping(performance.now());
    } else if (act === "photo") {
      takePhoto(performance.now());
    } else if (act === "toy") {
      spawnToy(performance.now());
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
    if (e.key === "Escape") hideCtxMenu();
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
