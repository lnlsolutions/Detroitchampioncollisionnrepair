// Detroit Champion Premium Interactions

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  const quoteModal = document.getElementById("quoteModal");
  const quoteBackdrop = document.getElementById("quoteBackdrop");
  const quoteClose = document.getElementById("quoteClose");
  const quoteButtons = document.querySelectorAll(".open-quote");
  const quoteForm = document.getElementById("quoteForm");
  const quoteSuccess = document.getElementById("quoteSuccess");

  let popupShown = sessionStorage.getItem("detroitChampionPopupShown") === "true";

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.classList.remove("active");
      });
    });
  }

  // Quote modal controls
  const openQuoteModal = () => {
    if (!quoteModal) return;

    quoteModal.classList.add("active");
    quoteModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    sessionStorage.setItem("detroitChampionPopupShown", "true");
    popupShown = true;
  };

  const closeQuoteModal = () => {
    if (!quoteModal) return;

    quoteModal.classList.remove("active");
    quoteModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  quoteButtons.forEach((button) => {
    button.addEventListener("click", openQuoteModal);
  });

  if (quoteClose) {
    quoteClose.addEventListener("click", closeQuoteModal);
  }

  if (quoteBackdrop) {
    quoteBackdrop.addEventListener("click", closeQuoteModal);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQuoteModal();
    }
  });

  // Auto popup after 5 seconds on every page, once per browsing session
  setTimeout(() => {
    if (!popupShown && quoteModal) {
      openQuoteModal();
    }
  }, 5000);

  // Mock form submission success
  if (quoteForm && quoteSuccess) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      quoteForm.style.display = "none";
      quoteSuccess.style.display = "block";

      setTimeout(() => {
        closeQuoteModal();

        setTimeout(() => {
          quoteForm.reset();
          quoteForm.style.display = "grid";
          quoteSuccess.style.display = "none";
        }, 350);
      }, 2200);
    });
  }

  // Header scroll effect
  const siteHeader = document.querySelector(".site-header");

  const handleHeaderScroll = () => {
    if (!siteHeader) return;

    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();

  // Reveal animations
  const revealElements = document.querySelectorAll(
    ".service-card, .process-card, .trust-card, .split-content, .location-content, .map-card, .premium-cta"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

  // Active page helper
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // Contact page direct form behavior if present
  const contactForm = document.getElementById("contactForm");
  const contactSuccess = document.getElementById("contactSuccess");

  if (contactForm && contactSuccess) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      contactForm.style.display = "none";
      contactSuccess.style.display = "block";
    });
  }

  // Before and after slider support for future repair/paint/detail pages
  document.querySelectorAll(".comparison-slider").forEach((slider) => {
    const range = slider.querySelector('input[type="range"]');
    const afterImage = slider.querySelector(".after-image");

    if (!range || !afterImage) return;

    const updateSlider = () => {
      afterImage.style.width = `${range.value}%`;
    };

    range.addEventListener("input", updateSlider);
    updateSlider();
  });
});
