document.addEventListener("DOMContentLoaded", () => {
// === DARK/LIGHT MODE TOGGLE ===
const btn = document.getElementById("darkModeBtn");
const body = document.body;
const saved = localStorage.getItem("theme");

const setTheme = (theme) => {
body.classList.remove("light-mode", "theme-transition");
requestAnimationFrame(() => {
body.classList.add("theme-transition");
if (theme === "light") {
body.classList.add("light-mode");
btn.textContent = "☀️";
} else {
btn.textContent = "🌙";
}
});
};

if (!saved) {
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(prefersDark ? "dark" : "light");
} else {
setTheme(saved);
}

btn.addEventListener("click", () => {
const next = body.classList.contains("light-mode") ? "dark" : "light";
setTheme(next);
localStorage.setItem("theme", next);
});

// === COUNTDOWN TIMER ===
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

// === FUN FACTS ===
const facts = [
"Honey never spoils. Archaeologists found 3,000-year-old honey still edible.",
"Bananas are berries, but strawberries are not.",
"Octopuses have three hearts and blue blood.",
"Wombat poop is cube-shaped.",
"There are more stars in the universe than grains of sand on Earth.",
"Sharks existed before trees.",
"Some cats are allergic to humans.",
"The Eiffel Tower grows in summer due to heat.",
"Jellyfish Turritopsis dohrnii is biologically immortal.",
"Flamingos are naturally white — their diet turns them pink."
];

let fIndex = -1;
const disp = document.getElementById("funFactDisplay");
const randomBtn = document.getElementById("funFactBtn");
const nextBtn = document.getElementById("nextFactBtn");
const prevBtn = document.getElementById("prevFactBtn");
const addInput = document.getElementById("newFunFactInput");
const addBtn = document.getElementById("addFunFactBtn");
const status = document.getElementById("funFactAddStatus");

const showFact = (i) => {
if (i < 0 || i >= facts.length) return;
disp.textContent = facts[i];
fIndex = i;
if (facts.length > 1) {
nextBtn.style.display = "inline-block";
prevBtn.style.display = "inline-block";
}
};

randomBtn.addEventListener("click", () => {
const randomIndex = Math.floor(Math.random() * facts.length);
showFact(randomIndex);
});

nextBtn.addEventListener("click", () => {
if (fIndex >= 0) showFact((fIndex + 1) % facts.length);
});

prevBtn.addEventListener("click", () => {
if (fIndex >= 0) showFact((fIndex - 1 + facts.length) % facts.length);
});

addBtn.addEventListener("click", () => {
const fact = addInput.value.trim();
if (!fact) {
status.style.color = "red";
status.textContent = "❌ Please enter a valid fun fact.";
return;
}
facts.push(fact);
showFact(facts.length - 1);
addInput.value = "";
status.style.color = "lime";
status.textContent = "✅ Fun fact added!";
setTimeout(() => (status.textContent = ""), 2000);
});

// === CONTACT FORM ===
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (form) {
form.addEventListener("submit", (e) => {
e.preventDefault();
const data = new FormData(form);

fetch(form.action, {
method: "POST",
mode: "cors",
body: data,
headers: { Accept: "application/json" }
})
.then((res) => {
if (res.ok) {
formStatus.style.color = "lime";
formStatus.textContent = "✅ Message sent!";
form.reset();
} else {
return res.json().then((d) => {
throw new Error(d.error || "❌ Submission failed.");
});
}
})
.catch((err) => {
formStatus.style.color = "red";
formStatus.textContent = err.message;
});
});
}

// === AUDIO PLAYER ===
const playlist = [
"assets/music1.mp3",
"assets/music2.mp3",
"assets/music3.mp3",
"assets/music4.mp3",
"assets/music5.mp3",
"assets/music6.mp3"
];

let currentTrack = 0;
const audio = document.getElementById("bgMusic");
const source = document.getElementById("audioSource");
const nowPlaying = document.getElementById("nowPlaying");
const prevTrackBtn = document.getElementById("prevSongBtn");
const nextTrackBtn = document.getElementById("nextSongBtn");

function loadTrack(index) {
if (index < 0 || index >= playlist.length) return;
source.src = playlist[index];
audio.load();
audio.play().catch(() => {});
currentTrack = index;
nowPlaying.textContent = `🎵 Now Playing: ${playlist[index].split("/").pop()}`;
}

prevTrackBtn.addEventListener("click", () => {
loadTrack((currentTrack - 1 + playlist.length) % playlist.length);
});

nextTrackBtn.addEventListener("click", () => {
loadTrack((currentTrack + 1) % playlist.length);
});

const userInteractionHandler = () => {
loadTrack(currentTrack);
document.removeEventListener("click", userInteractionHandler);
document.removeEventListener("keydown", userInteractionHandler);
};

document.addEventListener("click", userInteractionHandler);
document.addEventListener("keydown", userInteractionHandler);

// === UNSPLASH IMAGE GALLERY ===
const galleryGrid = document.querySelector(".gallery-grid");
const unsplashAccessKey = "JQsl0EzN3CrhYmST0rmdD7You0PoaIUKWoRln8Mj2YI";

function loadGalleryImages() {
if (!galleryGrid) return;
const seed = new Date().toISOString().slice(0, 10);

fetch(`https://api.unsplash.com/photos/random?count=4&query=nature&client_id=${unsplashAccessKey}&sig=${seed}`)
.then(res => res.json())
.then(images => {
galleryGrid.innerHTML = "";
images.forEach(img => {
const image = document.createElement("img");
image.src = img.urls.small;
image.alt = img.alt_description || "Nature Image";
image.loading = "lazy";
galleryGrid.appendChild(image);
setTimeout(() => (image.style.opacity = 1), 100);
});
})
.catch(err => {
galleryGrid.innerHTML = "<p style='color:red;'>Failed to load images 😢</p>";
console.error("Unsplash error:", err);
});
}

loadGalleryImages();

// === DONATION MODAL LOGIC ===
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

// === QR Code Helper ===
function generateQR(id, url) {
const container = document.getElementById(id);
if (container && !container.querySelector("img")) {
const img = document.createElement("img");
img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=200x200`;
img.alt = "QR Code";
container.appendChild(img);
}
}

function togglePaymentOption(platform, selected, url) {
const linkDiv = document.getElementById(`${platform}Link`);
const qrDiv = document.getElementById(`${platform}QR`);
if (!linkDiv || !qrDiv) return;

if (selected === "qr") {
generateQR(`${platform}QR`, url);
}

linkDiv.style.display = selected === "link" ? "block" : "none";
qrDiv.style.display = selected === "qr" ? "block" : "none";
localStorage.setItem(`${platform}Option`, selected);
}

const paymentOptions = {
cashApp: "https://cash.app/$leosound41",
paypal: "https://www.paypal.com/donate/?business=A5ZHTX338TPVG&no_recurring=0&currency_code=USD",
kofi: "https://coff.ee/abdikadir5j",
stripe: "https://buy.stripe.com/28E00kgp2f9i40e2Oh2VG00"
};

Object.entries(paymentOptions).forEach(([platform, url]) => {
const options = document.querySelectorAll(`input[name="${platform}Option"]`);
const saved = localStorage.getItem(`${platform}Option`) || "link";

const inputToCheck = document.querySelector(`input[name="${platform}Option"][value="${saved}"]`);
if (inputToCheck) inputToCheck.checked = true;
togglePaymentOption(platform, saved, url);

options.forEach((opt) => {
opt.addEventListener("change", () => {
togglePaymentOption(platform, opt.value, url);
});
});
});

// For fallback detection
window.loadedMainJS = true;
});
