document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile nav
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      const icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    // Close menu on link click
    navMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-xmark");
        }
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // ScrollSpy (active nav link)
  const sections = ["home","about","services","works","team","partners","contact"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

  sections.forEach(s => spy.observe(s));

  // Modal
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalImg = document.getElementById("modalImg");
  const modalDesc = document.getElementById("modalDesc");
  const modalWA = document.getElementById("modalWA");
  const modalMail = document.getElementById("modalMail");

  function openModal({ title, desc, img }) {
    if (!modalBackdrop) return;

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImg.src = img;
    modalImg.alt = title;

    const waText = `Hi TGBS, I’m interested in: ${title}. Please share next steps.`;
    modalWA.href = `https://wa.me/971552738118?text=${encodeURIComponent(waText)}`;
    modalMail.href = `pricing.html`; // Change to your pricing page or mailto link

    modalBackdrop.classList.add("open");
    modalBackdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("open");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modalClose?.addEventListener("click", closeModal);
  modalBackdrop?.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // Attach modal to services & works
  document.querySelectorAll("[data-title][data-desc][data-img]").forEach(card => {
    card.addEventListener("click", () => {
      openModal({
        title: card.getAttribute("data-title") || "TGBS",
        desc: card.getAttribute("data-desc") || "",
        img: card.getAttribute("data-img") || ""
      });
    });
  });

  // Contact form (mailto)
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const prefillBtn = document.getElementById("prefillBtn");

  prefillBtn?.addEventListener("click", () => {
    document.getElementById("topic").value = "Service Inquiry";
    document.getElementById("message").value =
      "Hi TGBS,\n\nI’m interested in your services. Here’s what I need:\n- Project type:\n- Timeline:\n- Budget range:\n\nThank you.";
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !topic || !message) {
      if (note) note.textContent = "Please fill all fields.";
      return;
    }

    const subject = `TGBS Inquiry — ${topic} — ${name}`;
    const body =
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}\n\nSent from TGBS website.`;

    window.location.href =
      `mailto:info@thegoldenbrainservices.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

    // Partnerships: stagger reveal delays
  const staggerItems = document.querySelectorAll("[data-stagger]");
  staggerItems.forEach((el, i) => {
    el.style.setProperty("--d", `${i * 90}ms`);
  });

  // Pause marquee on hover (nice modern UX)
  const marquee = document.querySelector("[data-marquee] .logo-track");
  if (marquee) {
    marquee.addEventListener("mouseenter", () => marquee.style.animationPlayState = "paused");
    marquee.addEventListener("mouseleave", () => marquee.style.animationPlayState = "running");
  }

});
