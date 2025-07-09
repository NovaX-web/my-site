// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
document.querySelector(this.getAttribute('href'))
.scrollIntoView({ behavior: 'smooth' });
});
});

// Fade-in on scroll (basic)
const sections = document.querySelectorAll("section");
const options = {
threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = 1;
entry.target.style.transform = "translateY(0)";
}
});
}, options);

sections.forEach(section => {
section.style.opacity = 0;
section.style.transform = "translateY(50px)";
section.style.transition = "all 0.6s ease-out";
observer.observe(section);
});