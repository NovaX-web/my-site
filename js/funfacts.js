// funfacts.js

const funFactBtn = document.getElementById("funFactBtn");
const funFactDisplay = document.getElementById("funFactDisplay");

// Add your fun facts here
const funFacts = [
  "Honey never spoils — archaeologists have found edible honey in ancient Egyptian tombs.",
  "Octopuses have three hearts and blue blood.",
  "Bananas are berries, but strawberries aren’t.",
  "Wombat poop is cube-shaped.",
  "The Eiffel Tower can be 15 cm taller during the summer due to heat expansion.",
  "A group of flamingos is called a 'flamboyance'.",
  "Sharks have been around longer than trees.",
  "There are more stars in the universe than grains of sand on Earth.",
  "A day on Venus is longer than its year.",
  "Cows have best friends and can get stressed when separated."
  // You can add more here
];

funFactBtn.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * funFacts.length);
  funFactDisplay.textContent = funFacts[randomIndex];
});
