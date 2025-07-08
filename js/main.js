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
});
