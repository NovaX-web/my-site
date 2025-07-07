document.addEventListener("DOMContentLoaded", () => {
// --- DARK/LIGHT MODE TOGGLE ---
const btn = document.getElementById("darkModeBtn");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

const setTheme = (theme) => {
if (theme === "light") {
body.classList.add("light-mode");
btn.textContent = "☀️";
} else {
body.classList.remove("light-mode");
btn.textContent = "🌙";
}
};

if (!savedTheme) {
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(prefersDark ? "dark" : "light");
} else {
setTheme(savedTheme);
}

btn.addEventListener("click", () => {
const next = body.classList.contains("light-mode") ? "dark" : "light";
setTheme(next);
localStorage.setItem("theme", next);
});

// --- COUNTDOWN TIMER ---
const target = new Date("2025-07-31T12:00:00").getTime();
const cd = document.getElementById("countdown");
const nav = document.getElementById("mainNav");

const interval = setInterval(() => {
const now = Date.now();
const dist = target - now;

if (dist <= 0) {
clearInterval(interval);
cd.textContent = "🎉 We're Live!";
nav.style.display = "block";
return;
}

const days = Math.floor(dist / (1000 * 60 * 60 * 24));
const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const mins = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
const secs = Math.floor((dist % (1000 * 60)) / 1000);

cd.textContent = `${days}d : ${hours}h : ${mins}m : ${secs}s`;
}, 1000);

// --- FUN FACTS ---
// (Omitted here to save space, same as your original code...)

// --- CONTACT FORM ---
// (Omitted here to save space, same as your original code...)

// --- AUDIO PLAYER ---
// (Omitted here to save space, same as your original code...)

// --- UNSPLASH IMAGE GALLERY ---
// (Omitted here to save space, same as your original code...)

// --- DONATION MODAL LOGIC ---
const donationBtn = document.getElementById("donationButton");
const donationModal = document.getElementById("donationModal");
const closeDonationModal = document.getElementById("closeDonationModal");

if (donationBtn && donationModal && closeDonationModal) {
donationBtn.addEventListener("click", () => {
donationModal.classList.remove("hidden");
});

closeDonationModal.addEventListener("click", () => {
donationModal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
if (e.target === donationModal) {
donationModal.classList.add("hidden");
}
});
}

// --- PAYMENT METHOD TOGGLE (Lazy load QR, Animate, LocalStorage) ---

// Define payment methods with their links and QR codes
const payments = {
stripe: {
linkId: "stripeLink",
qrId: "stripeQR",
linkUrl: "https://buy.stripe.com/28E00kgp2f9i40e2Oh2VG00",
qrData: "https://buy.stripe.com/28E00kgp2f9i40e2Oh2VG00",
qrImgLoaded: false
},
cashApp: {
linkId: "cashAppLink",
qrId: "cashAppQR",
linkUrl: "https://cash.app/$leosound41",
qrData: "https://cash.app/$leosound41",
qrImgLoaded: false
},
paypal: {
linkId: "paypalLink",
qrId: "paypalQR",
linkUrl: "https://www.paypal.com/donate/?business=A5ZHTX338TPVG&no_recurring=0&currency_code=USD",
qrData: "https://www.paypal.com/donate/?business=A5ZHTX338TPVG&no_recurring=0&currency_code=USD",
qrImgLoaded: false
},
kofi: {
linkId: "kofiLink",
qrId: "kofiQR",
linkUrl: "https://coff.ee/abdikadir5j",
qrData: "https://coff.ee/abdikadir5j",
qrImgLoaded: false
}
};

function fadeIn(element) {
element.style.opacity = 0;
element.style.display = "block";
let op = 0;
const step = 0.05;
function fade() {
op += step;
if (op >= 1) {
element.style.opacity = 1;
} else {
element.style.opacity = op;
requestAnimationFrame(fade);
}
}
fade();
}

function fadeOut(element, callback) {
let op = 1;
const step = 0.05;
function fade() {
op -= step;
if (op <= 0) {
element.style.opacity = 0;
element.style.display = "none";
if (callback) callback();
} else {
element.style.opacity = op;
requestAnimationFrame(fade);
}
}
fade();
}

Object.entries(payments).forEach(([key, { linkId, qrId, linkUrl, qrData }]) => {
const radios = document.querySelectorAll(`input[name="${key}Option"]`);
const linkElem = document.getElementById(linkId);
const qrElem = document.getElementById(qrId);

if (!radios.length || !linkElem || !qrElem) return;

// Load QR img on demand (lazy load)
function loadQR() {
if (!payments[key].qrImgLoaded) {
const img = document.createElement("img");
img.alt = `${key} QR code`;
img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200`;
img.style.width = "200px";
img.style.height = "200px";
qrElem.appendChild(img);
payments[key].qrImgLoaded = true;
}
}

// Show/hide function with animation
function showContent(type) {
if (type === "link") {
fadeOut(qrElem, () => {
fadeIn(linkElem);
});
} else if (type === "qr") {
fadeOut(linkElem, () => {
loadQR();
fadeIn(qrElem);
});
}
}

// Restore last choice from localStorage
const savedChoice = localStorage.getItem(`${key}Option`) || "link";
radios.forEach(r => r.checked = false);
const savedRadio = [...radios].find(r => r.value === savedChoice);
if (savedRadio) savedRadio.checked = true;
showContent(savedChoice);

radios.forEach(radio => {
radio.addEventListener("change", () => {
if (!radio.checked) return;
localStorage.setItem(`${key}Option`, radio.value);
showContent(radio.value);
});
});
});
});
