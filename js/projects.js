// Project Modal
const projectModal = document.createElement("div");
projectModal.className = "project-modal";
projectModal.innerHTML = `
  <div class="modal-content">
    <button class="close-modal">&times;</button>
    <div class="modal-body"></div>
  </div>
`;

document.body.appendChild(modalStyles);
document.body.appendChild(projectModal);

// Modal Styles
const modalStyles = document.createElement("style");
modalStyles.textContent = `
  .project-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-modal.active {
    display: flex;
    opacity: 1;
  }
  
  .modal-content {
    background: var(--card-bg);
    border-radius: 10px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    transform: translateY(50px);
    transition: transform 0.3s ease;
  }
  
  .project-modal.active .modal-content {
    transform: translateY(0);
  }
  
  .close-modal {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--text-color);
    cursor: pointer;
    z-index: 1;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: var(--transition);
  }
  
  .close-modal:hover {
    background: var(--border-color);
  }
  
  .modal-body {
    padding: 40px;
  }
  
  .modal-body img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 2rem;
  }
  
  .modal-body h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  .modal-body .project-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  
  .modal-body .project-category {
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
  
  .modal-body .project-date {
    color: var(--text-light);
  }
  
  .modal-body .project-description {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 2rem;
    color: var(--text-color);
  }
  
  .modal-body .project-features {
    margin-bottom: 2rem;
  }
  
  .modal-body .project-features h4 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  .modal-body .project-features ul {
    list-style: none;
    padding-left: 0;
  }
  
  .modal-body .project-features li {
    padding: 0.5rem 0;
    color: var(--text-light);
    position: relative;
    padding-left: 1.5rem;
  }
  
  .modal-body .project-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
  }
  
  .modal-body .tech-stack {
    margin-bottom: 2rem;
  }
  
  .modal-body .tech-stack h4 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  .modal-body .tech-stack-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .modal-body .tech-stack-item {
    background: var(--border-color);
    color: var(--text-color);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
  
  .modal-body .project-links {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .modal-body .project-link {
    padding: 0.8rem 1.5rem;
    background: var(--primary-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 500;
    transition: var(--transition);
  }
  
  .modal-body .project-link:hover {
    background: var(--primary-dark);
  }
  
  .modal-body .project-link.secondary {
    background: transparent;
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
  }
  
  .modal-body .project-link.secondary:hover {
    background: var(--primary-color);
    color: white;
  }
`;

// Project Data
const projects = {
  "gallery-cafe": {
    title: "Gallery Café",
    category: "Web Development",
    image: "GalleryCafe.png",
    description:
      "A dynamic, database-driven website built for The Gallery Café in Colombo as part of the Web Application Development module at ICBT. The system enhances customer interaction with features like table reservations, pre-ordering, menu filters, and user/admin management.",
    features: [
      "User Registration & Authentication",
      "Online Table Reservations",
      "Pre-ordering System",
      "Menu Browsing with Filters",
      "Admin Dashboard",
      "User Profile Management",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    github: "https://github.com/Rx-vi2002/gallery_cafe.git",
    liveDemo: "#",
    date: "2023",
  },
  "doggie-delights": {
    title: "Doggie Delights",
    category: "Mobile Development",
    image: "DoggiDelight.png",
    description:
      "An e-commerce Android app for dog owners to shop and learn about dog nutrition. Built for the Mobile App Development module at ICBT, it features product listings, a cart system, educational content, and user authentication.",
    features: [
      "User Registration & Login",
      "Product Catalog",
      "Shopping Cart System",
      "Educational Content",
      "Order History",
      "Push Notifications",
    ],
    techStack: [
      "Java",
      "XML",
      "Firebase",
      "Android Studio",
      "Volley",
      "RecyclerView",
    ],
    github: "https://github.com/Rx-vi2002/Dog_Nutrition_App.git",
    liveDemo: "#",
    date: "2023",
  },
  donorlink: {
    title: "DonorLink",
    category: "Web Development",
    image: "BloodDonation.png",
    description:
      "A web-based platform connecting blood donors, recipients, and hospitals. Developed as a group project for the Internet and Web Technologies module at SLIIT. Features include appointment scheduling and an admin dashboard for managing donors and blood drives.",
    features: [
      "Donor Registration",
      "Appointment Booking",
      "Blood Drive Management",
      "Donation History",
      "Admin Dashboard",
      "Email Notifications",
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "AJAX"],
    github: "https://github.com/Rx-vi2002/Blood_Donation_System.git",
    liveDemo: "#",
    date: "2024",
  },
  "zero-trust": {
    title: "Zero Trust Architecture",
    category: "Cybersecurity Research",
    image: "ZeroTrust.png",
    description:
      "A comprehensive study on Zero Trust Architecture (ZTA), completed for the Introduction to Cyber Security module at SLIIT. The paper explores ZTA's core principles, compares it with traditional models, and examines future trends like AI integration and quantum-resistant security.",
    features: [
      "Abstract & Introduction",
      "Evolution of Security Models",
      "Core Principles of ZTA",
      "Implementation Strategies",
      "Benefits & Challenges",
      "Future Developments",
    ],
    techStack: [
      "Research",
      "Cybersecurity",
      "Network Security",
      "Risk Assessment",
    ],
    github:
      "https://github.com/Rx-vi2002/Ruvindi-Wickramasinghe/blob/main/IT23839274.pdf",
    liveDemo: "#",
    date: "2024",
  },
  "linux-admin": {
    title: "Linux System Administration",
    category: "System Administration",
    image: "Linux.png",
    description:
      "A hands-on project for the Systems and Network Programming module at SLIIT. Covered Linux VM setup, network services (DHCP, DNS, NTP), server deployments (Apache, Postfix), firewall rules, secure SSH, and GDB-based debugging.",
    features: [
      "Linux VM Setup & Configuration",
      "Network Services Deployment",
      "Server Administration",
      "Firewall Configuration",
      "Security Hardening",
      "Debugging with GDB",
    ],
    techStack: [
      "Kali Linux",
      "Ubuntu",
      "Bash Scripting",
      "Apache",
      "Postfix",
      "UFW",
    ],
    github:
      "https://github.com/Rx-vi2002/Ruvindi-Wickramasinghe/blob/main/Report%20on%20Linux%20System%20Administration.pdf",
    liveDemo: "#",
    date: "2024",
  },
  portfolio: {
    title: "Personal Portfolio",
    category: "Web Development",
    image: "Portfolio.png",
    description:
      "This portfolio was built using HTML5, CSS3, and JavaScript, and is hosted on GitHub Pages for reliable and fast deployment. I designed the layout with a focus on clarity, responsiveness, and a minimalist aesthetic, ensuring a smooth browsing experience across devices.",
    features: [
      "Responsive Design",
      "Project Showcase",
      "Skills Section",
      "Contact Form",
      "Dark/Light Mode",
      "GitHub Integration",
    ],
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GitHub Pages",
      "Figma",
      "Formspree",
    ],
    github: "https://github.com/Rx-vi2002/Ruvindi-Wickramasinghe.git",
    liveDemo: "https://rx-vi2002.github.io/Ruvindi-Wickramasinghe/",
    date: "2024",
  },
};

// Open Modal Function
function openProjectModal(projectId) {
  const project = projects[projectId];
  if (!project) return;

  const modalBody = projectModal.querySelector(".modal-body");
  modalBody.innerHTML = `
    <img src="${project.image}" alt="${project.title}">
    <h3>${project.title}</h3>
    <div class="project-meta">
      <span class="project-category">${project.category}</span>
      <span class="project-date">${project.date}</span>
    </div>
    <p class="project-description">${project.description}</p>
    
    <div class="project-features">
      <h4>Key Features</h4>
      <ul>
        ${project.features.map((feature) => `<li>${feature}</li>`).join("")}
      </ul>
    </div>
    
    <div class="tech-stack">
      <h4>Technologies Used</h4>
      <div class="tech-stack-items">
        ${project.techStack
          .map((tech) => `<span class="tech-stack-item">${tech}</span>`)
          .join("")}
      </div>
    </div>
    
    <div class="project-links">
      <a href="${project.github}" target="_blank" class="project-link">
        <i class="fab fa-github"></i> View on GitHub
      </a>
      ${
        project.liveDemo !== "#"
          ? `
        <a href="${project.liveDemo}" target="_blank" class="project-link secondary">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
      `
          : ""
      }
    </div>
  `;

  projectModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close Modal Function
function closeProjectModal() {
  projectModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Event Listeners for Project Cards
document.addEventListener("DOMContentLoaded", () => {
  // Close modal when clicking outside
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      closeProjectModal();
    }
  });

  // Close modal with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal.classList.contains("active")) {
      closeProjectModal();
    }
  });

  // Close button
  projectModal
    .querySelector(".close-modal")
    .addEventListener("click", closeProjectModal);

  // Add click event to project cards (you'll need to add data-project-id attribute to your project cards)
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (!e.target.closest(".view-project")) return;
      e.preventDefault();
      const projectId = card.dataset.projectId;
      if (projectId) {
        openProjectModal(projectId);
      }
    });
  });
});

// Initialize project cards with data attributes
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  const projectIds = [
    "gallery-cafe",
    "doggie-delights",
    "donorlink",
    "zero-trust",
    "linux-admin",
    "portfolio",
  ];

  projectCards.forEach((card, index) => {
    if (index < projectIds.length) {
      card.setAttribute("data-project-id", projectIds[index]);
    }
  });
});

// Search functionality for projects
const searchInput = document.querySelector(".search-box input");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card
        .querySelector(".project-description")
        .textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll(".project-tags span")).map(
        (tag) => tag.textContent.toLowerCase()
      );

      const matches =
        title.includes(searchTerm) ||
        description.includes(searchTerm) ||
        tags.some((tag) => tag.includes(searchTerm));

      card.style.display = matches ? "block" : "none";

      if (matches) {
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      }
    });
  });
}
