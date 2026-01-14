// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Typing Animation
const typingText = document.querySelector(".typing-text");
const roles = [
  "Cybersecurity Undergraduate",
  "SOC Analyst-Intern",
  "Junior Penetration Tester",
  "Network Security Intern",
  "Frontend Developer",
  "Graphic Designer",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function type() {
  const currentRole = roles[roleIndex];

  if (!isDeleting && charIndex < currentRole.length) {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(type, 1000);
  }
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", () => {
  type();

  // Initialize counters
  initCounters();

  // Initialize project filtering
  initProjectFilter();

  // Initialize form submission
  initContactForm();
});

// Counter Animation
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Start counter when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Project Filtering
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category").split(" ");

        if (filter === "all" || categories.includes(filter)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 100);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Contact Form Submission
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Show loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Success
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
          contactForm.reset();

          // Show success message
          showNotification("Message sent successfully!", "success");
        } else {
          // Error
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          showNotification("Error sending message. Please try again.", "error");
        }
      } catch (error) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification(
          "Network error. Please check your connection.",
          "error"
        );
      }

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 3000);
    });
  }
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${
      type === "success" ? "check-circle" : "exclamation-circle"
    }"></i>
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `;

  document.body.appendChild(notification);

  // Add styles for notification
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        background: white;
        color: #333;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
      }
      
      [data-theme="dark"] .notification {
        background: #2d2d2d;
        color: white;
      }
      
      .notification-success {
        border-left: 4px solid #27ae60;
      }
      
      .notification-error {
        border-left: 4px solid #e74c3c;
      }
      
      .notification-info {
        border-left: 4px solid #3498db;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
      }
      
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styles);
  }

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.remove();
    });
}

// Add slideOutRight animation
const slideOutRight = `
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Add active class to nav links based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const headerHeight = document.querySelector(".header").offsetHeight;

    if (scrollY >= sectionTop - headerHeight - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

// Update active nav link on scroll
window.addEventListener("scroll", updateActiveNavLink);

// Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
});

// Add animation to elements when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document
  .querySelectorAll(".animate-slide-up, .animate-fade-in")
  .forEach((el) => {
    observer.observe(el);
  });

// Certificate Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector(".cert-modal");
  const modalImage = document.querySelector(".modal-cert-image");
  const modalTitle = document.querySelector(".modal-title");
  const modalIssuer = document.querySelector(".modal-issuer");
  const modalDate = document.querySelector(".modal-date");
  const downloadModalBtn = document.querySelector(".download-modal-btn");
  const verifyModalBtn = document.querySelector(".verify-modal-btn");

  // Certificate data
  const certificates = [
    {
      id: "advent-of-cyber-2025",
      title: "Advent of Cyber 2025",
      issuer: "TryHackMe",
      date: "Issued December 2025",
      image: "certificates/AOC.png",
      pdf: "certificates/AOC.pdf",
      verify:
        "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-5BU5MHEA7S.pdf",
    },
    {
      id: "certified-cybersecurity-educator-professional",
      title: "Certified Cybersecurity Educator Professional",
      issuer: "Red Team Leaders",
      date: "Issued 15th December 2025",
      image: "certificates/CCEP.png",
      pdf: null,
      verify:
        "https://courses.redteamleaders.com/exam-completion/123b12b7b716c497",
    },
    {
      id: "introduction-to-bug-bounty",
      title: "Introduction to Bug Bounty",
      issuer: "Red Team Leaders",
      date: "Issued December 2025",
      image: "certificates/BugBounty.png",
      pdf: "certificates/BugBounty.pdf",
      verify: "https://courses.redteamleaders.com/competition/665ba81581a266dd",
    },
    {
      id: "ethical-hacker",
      title: "Ethical Hacker",
      issuer: "Cisco Networking Academy",
      date: "Issued 19 Jul 2025",
      image: "certificates/EthicalHacker.png",
      pdf: "certificates/EthicalHacker.pdf",
      verify:
        "https://www.netacad.com/certificates/?issuanceId=0c34010e-b011-4f3a-8f31-d14cd7d2ab5f",
    },
    {
      id: "python-for-beginners",
      title: "Python for Beginners",
      issuer: "University of Moratuwa",
      date: "Issued 11 Jul 2025",
      image: "certificates/Python_for_Beginners_E-Certificate.png",
      pdf: "certificates/Python_for_Beginners_E-Certificate.pdf",
      verify: "https://open.uom.lk/verify",
    },
    {
      id: "exploring-networking with-cisco-packet-tracer",
      title: "Exploring Networking with Cisco Packet Tracer",
      issuer: "Cisco Networking Academy",
      date: "Issued 18 Jun 2025",
      image: "certificates/Exploring Networking with Cisco Packet Tracer.png",
      pdf: "certificates/Exploring_Networking_with_Cisco_Packet_Tracer_certificate_ruvindiwickramasinghe100-gmail-com_3c29fa5a-981d-44c4-8c17-135e313e86f4.pdf",
      verify: "#",
    },
    {
      id: "introduction-to-the-threat-landscape",
      title: "Introduction to the Threat Landscape 3.0",
      issuer: "Fortinet",
      date: "Issued 17 June 2025",
      image: "certificates/Introduction to the Threat Landscape 3.0.png",
      pdf: null,
      verify:
        "https://www.credly.com/badges/a67c400a-b13c-4733-a3a5-494b941caf4d/public_url",
    },
    {
      id: "getting-started-with-cisco-packet-tracer",
      title: "Getting Started with Cisco Packet Tracer",
      issuer: "Cisco Networking Academy",
      date: "Issued 15 Jun 2025",
      image: "certificates/Getting Started with Cisco Packet Tracer.png",
      pdf: "Getting_Started_with_Cisco_Packet_Tracer_certificate.pdf",
      verify: "#",
    },
    {
      id: "aI-for-beginners",
      title: "AI for Beginners",
      issuer: "HP LIFE",
      date: "Issued 17 Jun 2025",
      image: "certificates/AI for Beginners.png",
      pdf: null,
      verify:
        "https://www.life-global.org/certificate/6e2be36e-dd68-4af2-81fb-1e7b487e4604",
    },
    {
      id: "introduction-to-cybersecurity",
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Issued 24 Nov 2024",
      image: "certificates/IntroductionTo Cybersecurity.png",
      pdf: null,
      verify:
        "https://www.credly.com/badges/a22f585d-4b78-41ca-9eb8-767223a73c53/public_url",
    },
    {
      id: "3-day-streak-badge",
      title: "3 Day Streak Badge",
      issuer: "TryHackMe",
      date: "Issued November 20, 2025",
      image: "certificates//THM-3DayStreak(1).png",
      pdf: null,
      verify:
        "https://tryhackme.com/Rx2002/badges/3-day-streak?utm_campaign=social_share&utm_medium=social&utm_content=badge&utm_source=copy&sharerId=68c80396fe8358b648d26d0f",
    },
    {
      id: "7-day-streak-badge",
      title: "7 Day Streak Badge",
      issuer: "TryHackMe",
      date: "Issued November November 24, 2025",
      image: "certificates/THM-7DayStreak(1).png",
      pdf: null,
      verify:
        "https://tryhackme.com/Rx2002/badges/7-day-streak?utm_campaign=social_share&utm_medium=social&utm_content=badge&utm_source=copy&sharerId=68c80396fe8358b648d26d0f",
    },
  ];

  let currentIndex = 0;

  // Open modal when view button is clicked
  document.querySelectorAll(".view-cert-btn").forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;
      openModal(currentIndex);
    });
  });

  // Open modal with specific certificate
  function openModal(index) {
    const cert = certificates[index];

    modalImage.src = cert.image;
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = cert.issuer;
    modalDate.textContent = cert.date;

    // Set download button
    if (cert.pdf) {
      downloadModalBtn.href = cert.pdf;
      downloadModalBtn.style.display = "flex";
      downloadModalBtn.innerHTML =
        '<i class="fas fa-download"></i> Download PDF';
    } else {
      downloadModalBtn.style.display = "none";
    }

    // Set verify button
    verifyModalBtn.href = cert.verify;

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // Close modal
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  // Close modal events
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  document
    .querySelector(".close-modal-btn")
    .addEventListener("click", closeModal);
  document
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);

  // Navigation buttons
  document.querySelector(".prev-btn").addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + certificates.length) % certificates.length;
    openModal(currentIndex);
  });

  document.querySelector(".next-btn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % certificates.length;
    openModal(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      currentIndex =
        (currentIndex - 1 + certificates.length) % certificates.length;
      openModal(currentIndex);
    } else if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % certificates.length;
      openModal(currentIndex);
    }
  });
});
