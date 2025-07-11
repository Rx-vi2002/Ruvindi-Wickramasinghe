// Typing animation script
const typingText = document.querySelector(".typing-text");
const words = [
  "Cybersecurity Undergraduate",
  "Frontend Developer",
  "Graphic Designer",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  typingText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    wordIndex =
      !isDeleting && !isEnd ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(type, 1000);
  }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
  type();

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.style.display =
      navLinks.style.display === "flex" ? "none" : "flex";
  });
});

// Form submission handling
//const contactForm = document.getElementById("contact-form");
//if (contactForm) {
//contactForm.addEventListener("submit", (e) => {
//e.preventDefault();
// Add form submission logic here
//alert("Form submitted successfully!");
//contactForm.reset();
//});
//}
