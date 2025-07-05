const targetDate = new Date("2025-07-31T12:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    document.getElementById("countdown").innerHTML = "🎉 We're Live!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
}, 1000);
// 🌙 Dark Mode Toggle
const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});
// 📬 Handle Contact Form (just a fake response for now)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent actual reload

  status.textContent = "✅ Message sent! (Just a demo)";
  form.reset();
});
