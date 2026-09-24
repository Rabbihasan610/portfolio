"use strict";

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
const sections = document.querySelectorAll("main section[id]");
const servicesGrid = document.querySelector("#services-grid");
const caseGrid = document.querySelector("#case-grid");
const featuredCaseGrid = document.querySelector("#featured-case-grid");
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
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    const status = contactForm.querySelector(".form-status");
    status.textContent = "Sending your project brief...";
    contactForm.querySelector("button[type='submit']").disabled = true;
  });
}

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
  <article class="case-card reveal project-card">
    <div class="project-image">
      <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.title)}" onerror="this.src='https://placehold.co/600x400/07111f/ffffff?text=Project+Image'">
    </div>
    <div class="project-content">
      <div class="case-top"><span class="case-type">${escapeHTML(project.purpos)}</span></div>
      <h3>${escapeHTML(project.title)}</h3>
      <div class="case-details" style="grid-template-columns: 1fr;">
        <div><small>Description</small><p>${escapeHTML(project.descrtion)}</p></div>
      </div>
      <div class="tags">
        ${(project.technology || "").split(',').map((item) => `<span>${escapeHTML(item.trim())}</span>`).join("")}
      </div>
      <a href="${escapeHTML(project.url)}" target="_blank" class="button button-secondary" style="margin-top:15px; width:100%; text-align:center;">View Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </div>
  </article>`;

const featuredCaseTemplate = (caseItem, index) => `
  <article class="case-card ${caseItem.featured ? 'featured' : ''} reveal">
    <div class="case-number">${String(index + 1).padStart(2, "0")}</div>
    <div class="case-top"><span class="case-type">${escapeHTML(caseItem.type)}</span><i class="${escapeHTML(caseItem.icon)}"></i></div>
    <h3>${escapeHTML(caseItem.title)}</h3>
    <div class="case-details">
      <div><small>Problem</small><p>${escapeHTML(caseItem.problem)}</p></div>
      <div><small>Solution</small><p>${escapeHTML(caseItem.solution)}</p></div>
      <div><small>Result</small><p>${escapeHTML(caseItem.result)}</p></div>
    </div>
    <div class="tags">
      ${(caseItem.stack || []).map((item) => `<span>${escapeHTML(item)}</span>`).join("")}
    </div>
  </article>`;

const renderProjects = () => {
  if (!caseGrid) return;

  let filteredProjects = portfolioProjects;
  if (caseSearch && caseSearch.value) {
    const q = caseSearch.value.toLowerCase();
    filteredProjects = filteredProjects.filter((p) => 
      (p.title || "").toLowerCase().includes(q) || 
      (p.descrtion || "").toLowerCase().includes(q) ||
      (p.purpos || "").toLowerCase().includes(q) ||
      (p.technology || "").toLowerCase().includes(q)
    );
  }

  caseGrid.innerHTML = filteredProjects.length
    ? filteredProjects.map((project, index) => projectTemplate(project, index)).join("")
    : '<p class="empty-projects">No projects found.</p>';
  observeReveals(caseGrid);
};

if (caseFilters) {
  caseFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    // renderFilters(); (Removed as it is undefined)
    renderProjects();
  });
}

if (caseSearch) {
  caseSearch.addEventListener("input", renderProjects);
}

if (caseGrid) {
  caseGrid.addEventListener("click", (event) => {
    // optional click listener
  });
}

if (caseModal) {
  caseModal.querySelector(".modal-close").addEventListener("click", () => caseModal.close());
  caseModal.addEventListener("click", (event) => {
    if (event.target === caseModal) caseModal.close();
  });
}

const loadPortfolioContent = async () => {
  try {
    const response = await fetch("assets/data/content.json");
    if (response.ok) {
        const content = await response.json();
        if (servicesGrid) {
            servicesGrid.innerHTML = content.services.map(serviceTemplate).join("");
            observeReveals(servicesGrid);
        }
        if (featuredCaseGrid && content.projects) {
            featuredCaseGrid.innerHTML = content.projects.map(featuredCaseTemplate).join("");
            observeReveals(featuredCaseGrid);
        }

        document.querySelectorAll("[data-social]").forEach((link) => {
          const url = content.profile[link.dataset.social];
          if (url) {
            link.href = url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
          }
        });
    }
  } catch (error) {
    console.warn("Using the built-in portfolio content for services.", error);
  }

  try {
    if (typeof portfolioProjectsData !== "undefined") {
      portfolioProjects = portfolioProjectsData;
      renderProjects();
    } else {
      const projResponse = await fetch("assets/data/projects.json");
      if (projResponse.ok) {
          portfolioProjects = await projResponse.json();
          renderProjects();
      }
    }
  } catch (error) {
    console.warn("Could not load projects.", error);
    if (caseGrid) caseGrid.innerHTML = '<p class="empty-projects">Could not load projects.</p>';
  }
};

loadPortfolioContent();
