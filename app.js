/*
  TimOk Portfolio configuration
  ----------------------------
  Add, change or remove project, current-build and social entries below.
  Empty social URLs are displayed as clearly marked placeholders.
*/
const portfolio = {
  // Set this to TimOk's real e-mail address. The form then opens the visitor's mail app with a prefilled message.
  contactEmail: "timneumann1517@gmail.com",
  // Set Discord to TimOk's personal profile URL — never a server invite.
  // Format: https://discord.com/users/DEINE-NUMERISCHE-DISCORD-ID
  discordUrl: "https://discord.com/users/1526684405748465904",
  skills: [
    { icon: "H", name: "HTML", description: "Struktur für Ideen, Seiten und kleine digitale Orte.", status: "Lerne und nutze ich aktiv", color: "#f4a27d" },
    { icon: "C", name: "CSS", description: "Für Layout, Details und die Stimmung eines Projekts.", status: "Aktuell im Fokus", color: "#8fbaff" },
  /*  { icon: "JS", name: "JavaScript", description: "Damit aus einer Seite etwas wird, das reagiert und lebt.", status: "Grundkenntnisse & eigene Projekte", color: "#f5dc73" }, */
    { icon: "Py", name: "Python", description: "Zum Ausprobieren, Automatisieren und Weiterdenken.", status: "Neugierig am Vertiefen", color: "#a9d9a3" },
  ],
  // Replace these placeholders with actual projects whenever one is ready.
  projects: [
    { number: "0", title: "Projekt in Arbeit", description: "Hier könnte bald eine Idee stehen, die gerade aus Notizen und ersten Zeilen Code wächst.", tags: ["HTML", "CSS", "JavaScript"], status: "PLATZHALTER", color: "#839bff" },
   /*{ number: "01", title: "Nächstes Projekt", description: "Hier könnte bald eine Idee stehen, die gerade aus Notizen und ersten Zeilen Code wächst.", tags: ["HTML", "CSS", "JavaScript"], status: "PLATZHALTER", color: "#839bff" },
    { number: "02", title: "In Entwicklung", description: "Ein Platz für ein Projekt, das noch ausprobiert, verändert und Schritt für Schritt besser wird.", tags: ["JavaScript", "Learning"], status: "IN ARBEIT", color: "#c3a0ff" },*/
  ],
  building: [
    { title: "Eigene Projektideen sortieren", detail: "aus einer Liste wird ein Plan", state: "notiert" },
    { title: "JavaScript weiter ausprobieren", detail: "mehr Interaktion, mehr Verständnis", state: "fokus" },
    { title: "Dieses Portfolio weiterfüllen", detail: "mit Dingen, die wirklich von mir sind", state: "läuft" },
  ],
  journey: [
    { year: "2022", title: "Mit dem Programmieren angefangen", detail: "Neugier, erste Tutorials und ganz viele Fragen." },
    { year: "2026", title: "Erste eigene Webseiten erstellt", detail: "Nicht perfekt – aber selbst gemacht und online gedacht." },
   /* { year: "Next", title: "JavaScript gelernt", detail: "Erste Interaktionen und die Freude daran, wenn Dinge reagieren." },
    { year: "Jetzt", title: "Python ausprobiert", detail: "Neue Wege entdecken und über den Browser hinausdenken." },
    { year: "Weiter", title: "Eigene größere Projekte entwickeln", detail: "Ideen mehr Raum geben, bauen und daraus lernen." }, */
  ],
  // Add real URLs here. For Discord, use the personal profile URL — never a server invite (see discordUrl above).
  socials: [
    { label: "GitHub", url: "https://github.com/TizOfficial" },
    { label: "Discord-Profil", url: "https://discord.com/users/1526684405748465904" },
    { label: "YouTube", url: "https://youtube.com/@timok691?si=1bZo3vR0CWxZqMwF" },
  ],
};

const $ = (selector) => document.querySelector(selector);
const create = (tag, className = "") => { const el = document.createElement(tag); el.className = className; return el; };

function renderSkills() {
  const target = $("#skills-grid");
  portfolio.skills.forEach((skill) => {
    const card = create("article", "role-card reveal");
    card.style.setProperty("--c", skill.color);
    card.innerHTML = `<span class="role-icon">${skill.icon}</span><div><h3>${skill.name}</h3><p>${skill.description}</p><span class="role-status"><i></i>${skill.status}</span></div>`;
    target.append(card);
  });
}

function renderProjects() {
  const target = $("#projects-grid");
  portfolio.projects.forEach((project) => {
    const card = create("article", "embed reveal");
    card.style.setProperty("--accent", project.color);
    card.innerHTML = `<div class="embed-line"></div><div class="embed-content"><div class="embed-type">// ${project.number} · ${project.status}</div><h3>${project.title}</h3><p>${project.description}</p><div class="embed-fields">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div><div class="embed-actions"><button class="card-button" data-project="${project.number}" type="button">Projekt ansehen ↗</button><button class="card-button" data-project="${project.number}" type="button">Mehr erfahren →</button></div></div>`;
    target.append(card);
  });
}

function renderBuilding() {
  const target = $("#building-list");
  portfolio.building.forEach((item, index) => {
    const row = create("div", "build-item");
    row.innerHTML = `<span class="marker">0${index + 1}</span><div><strong>${item.title}</strong><small>${item.detail}</small></div><span>${item.state}</span>`;
    target.append(row);
  });
}

function renderJourney() {
  const target = $("#journey-list");
  portfolio.journey.forEach((item) => {
    const row = create("li", "journey-item reveal");
    row.innerHTML = `<span class="journey-year">${item.year}</span><div><h3>${item.title}</h3><p>${item.detail}</p></div><span class="journey-arrow">↗</span>`;
    target.append(row);
  });
}

function renderSocials() {
  const target = $("#social-links");
  portfolio.socials.forEach((social) => {
    const url = social.label === "Discord-Profil" ? portfolio.discordUrl : social.url;
    const link = create("a", "social-link");
    link.textContent = url ? `${social.label} ↗` : `${social.label} · folgt`;
    if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; }
    else { link.href = "#"; link.title = "Link in app.js hinterlegen"; link.addEventListener("click", (event) => event.preventDefault()); }
    target.append(link);
  });
}

function setUpDialog() {
  const dialog = $("#project-dialog");
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-project]");
    if (!button) return;
    const project = portfolio.projects.find((entry) => entry.number === button.dataset.project);
    $("#dialog-title").textContent = project.title;
    $("#dialog-description").textContent = project.description;
    $("#dialog-type").textContent = `// ${project.number} · ${project.status}`;
    $("#dialog-tags").innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");
    dialog.showModal();
  });
  $(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
}

function setUpMenu() {
  const button = document.querySelector(".menu-button"), links = document.querySelector(".nav-links");
  if (!button) return;
  button.addEventListener("click", () => { const open = links.classList.toggle("open"); button.setAttribute("aria-expanded", open); });
  links.addEventListener("click", (event) => { if (event.target.matches("a")) { links.classList.remove("open"); button.setAttribute("aria-expanded", "false"); } });
}

function setUpContactForm() {
  const form = $("#contact-form");
  const status = $("#form-status");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (!portfolio.contactEmail) {
      status.textContent = "Kontaktadresse in app.js hinterlegen, dann ist das Formular bereit.";
      status.className = "form-status error";
      return;
    }
    const subject = encodeURIComponent(`Portfolio-Nachricht von ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nE-Mail: ${data.get("email")}\n\n${data.get("message")}`);
    status.textContent = "Dein E-Mail-Programm wird geöffnet …";
    status.className = "form-status";
    window.location.href = `mailto:${portfolio.contactEmail}?subject=${subject}&body=${body}`;
  });
}

function setUpMotion() {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
  const bar = $(".scroll-progress span");
  window.addEventListener("scroll", () => { const max = document.documentElement.scrollHeight - innerHeight; bar.style.width = `${max ? (scrollY / max) * 100 : 0}%`; }, { passive: true });
}

function setUpDiscordLink() {
  const nav = document.querySelector("#nav-discord");
  if (nav) {
    if (portfolio.discordUrl) nav.href = portfolio.discordUrl;
    else { nav.title = "Discord-Link in app.js hinterlegen"; nav.addEventListener("click", (event) => event.preventDefault()); }
  }
}

renderSkills(); renderProjects(); renderBuilding(); renderJourney(); renderSocials(); setUpDialog(); setUpMenu(); setUpContactForm(); setUpDiscordLink(); setUpMotion();
$("#year").textContent = new Date().getFullYear();
