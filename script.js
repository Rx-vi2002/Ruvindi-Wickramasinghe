// Theme Toggle Functionality
const themeToggle = document.querySelector(".theme-toggle");
const toggleIcon = themeToggle.querySelector("i");
const toggleText = themeToggle.querySelector(".toggle-text");

// Check for saved user preference or use system preference
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const currentTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

// Apply the current theme
document.documentElement.setAttribute("data-theme", currentTheme);
updateToggle(currentTheme);

// Toggle between themes
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateToggle(newTheme);
});

// Update the toggle button appearance
function updateToggle(theme) {
  if (theme === "dark") {
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
    toggleText.textContent = "Light Mode";
  } else {
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
    toggleText.textContent = "Dark Mode";
  }
}

// Listen for system theme changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      // Only change if user hasn't set a preference
      const newTheme = e.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      updateToggle(newTheme);
    }
  });

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

// Disable right-click and keyboard shortcuts that could reveal source
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && e.key === "I") ||
    (e.ctrlKey && e.shiftKey && e.key === "J") ||
    (e.ctrlKey && e.key === "U")
  ) {
    e.preventDefault();
    alert("This function has been disabled.");
  }
});
