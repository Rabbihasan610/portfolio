"use strict";

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id]");
const servicesGrid = document.querySelector("#services-grid");
const caseGrid = document.querySelector("#case-grid");
const caseFilters = document.querySelector("#case-filters");
const caseSearch = document.querySelector("#case-search");
const caseModal = document.querySelector("#case-modal");
const modalContent = document.querySelector("#modal-content");
let portfolioProjects = [];
let activeCategory = "All";

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

const observeReveals = (root = document) => root.querySelectorAll(".reveal:not([data-observed])").forEach((element, index) => {
  element.dataset.observed = "true";
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(element);
});
observeReveals();

const countUp = (element) => {
  const target = Number(element.dataset.count);
  const suffix = element.dataset.suffix || "";
  const decimals = Number.isInteger(target) ? 0 : 1;
  const duration = 1500;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${(target * eased).toFixed(decimals)}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

const metricObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll("[data-count]").forEach(countUp);
      metricObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.45 });

const metrics = document.querySelector(".metrics");
if (metrics) metricObserver.observe(metrics);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55%", threshold: 0 });

sections.forEach((section) => sectionObserver.observe(section));

const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
} else {
  glow.remove();
}

const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", () => {
  const status = contactForm.querySelector(".form-status");
  status.textContent = "Sending your project brief...";
  contactForm.querySelector("button[type='submit']").disabled = true;
});

document.querySelector("#year").textContent = new Date().getFullYear();

const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
}[character]));

const serviceTemplate = (service, index) => `
  <article class="service-card reveal">
    <div class="icon-box"><i class="${escapeHTML(service.icon)}"></i></div>
    <span>${String(index + 1).padStart(2, "0")}</span>
    <h3>${escapeHTML(service.title)}</h3>
    <p>${escapeHTML(service.description)}</p>
    <a href="#contact">Discuss a project <i class="fa-solid fa-arrow-right"></i></a>
  </article>`;

const projectTemplate = (project, index) => `
  <article class="case-card ${project.featured ? "featured" : ""} reveal">
    <button class="case-open" type="button" data-project-index="${index}" aria-label="View ${escapeHTML(project.title)} details"></button>
    <div class="case-number">${String(index + 1).padStart(2, "0")}</div>
    <div class="case-top"><span class="case-type">${escapeHTML(project.type)}</span><i class="${escapeHTML(project.icon)}"></i></div>
    <h3>${escapeHTML(project.title)}</h3>
    <div class="case-details">
      <div><small>Problem</small><p>${escapeHTML(project.problem)}</p></div>
      <div><small>Solution</small><p>${escapeHTML(project.solution)}</p></div>
      <div><small>Result</small><p>${escapeHTML(project.result)}</p></div>
    </div>
    <div class="tags">${project.stack.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
  </article>`;

const renderProjects = () => {
  const term = caseSearch.value.trim().toLowerCase();
  const filtered = portfolioProjects.filter((project) => {
    const categoryMatch = activeCategory === "All" || project.category === activeCategory;
    const searchable = `${project.title} ${project.type} ${project.category} ${project.stack.join(" ")}`.toLowerCase();
    return categoryMatch && searchable.includes(term);
  });

  caseGrid.innerHTML = filtered.length
    ? filtered.map((project) => projectTemplate(project, portfolioProjects.indexOf(project))).join("")
    : '<p class="empty-projects">No matching case study found.</p>';
  observeReveals(caseGrid);
};

const renderFilters = () => {
  const categories = ["All", ...new Set(portfolioProjects.map((project) => project.category))];
  caseFilters.innerHTML = categories.map((category) => `
    <button class="filter-button ${category === activeCategory ? "active" : ""}" type="button" data-category="${escapeHTML(category)}">
      ${escapeHTML(category)}
    </button>`).join("");
};

caseFilters.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderFilters();
  renderProjects();
});

caseSearch.addEventListener("input", renderProjects);

caseGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project-index]");
  if (!button) return;
  const project = portfolioProjects[Number(button.dataset.projectIndex)];
  modalContent.innerHTML = `
    <div class="modal-body">
      <div class="icon-box"><i class="${escapeHTML(project.icon)}"></i></div>
      <p class="eyebrow">${escapeHTML(project.type)}</p>
      <h2>${escapeHTML(project.title)}</h2>
      <p>Production-focused case study built around measurable reliability and maintainability.</p>
      <div class="modal-details">
        <div><small>Problem</small><p>${escapeHTML(project.problem)}</p></div>
        <div><small>Solution</small><p>${escapeHTML(project.solution)}</p></div>
        <div><small>Result</small><p>${escapeHTML(project.result)}</p></div>
      </div>
      <div class="tags">${project.stack.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
    </div>`;
  caseModal.showModal();
});

caseModal.querySelector(".modal-close").addEventListener("click", () => caseModal.close());
caseModal.addEventListener("click", (event) => {
  if (event.target === caseModal) caseModal.close();
});

const loadPortfolioContent = async () => {
  try {
    const response = await fetch("assets/data/content.json");
    if (!response.ok) throw new Error(`Content request failed: ${response.status}`);
    const content = await response.json();

    servicesGrid.innerHTML = content.services.map(serviceTemplate).join("");
    portfolioProjects = content.projects;
    renderFilters();
    renderProjects();
    observeReveals(servicesGrid);

    document.querySelectorAll("[data-social]").forEach((link) => {
      const url = content.profile[link.dataset.social];
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }
    });
  } catch (error) {
    console.warn("Using the built-in portfolio content because dynamic content could not load.", error);
    portfolioProjects = [];
    caseFilters.innerHTML = '<span class="case-type">Built-in content</span>';
  }
};

loadPortfolioContent();
