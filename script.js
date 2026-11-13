document.documentElement.classList.add("js");

const menuButton = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function setMenuOpen(isOpen) {
    if (!menuButton || !navLinks) return;

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    navLinks.classList.toggle("active", isOpen);
}

if (menuButton && navLinks) {
    menuButton.addEventListener("click", function () {
        setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setMenuOpen(false);
    });

    document.addEventListener("click", function (event) {
        if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 760) setMenuOpen(false);
    });
}

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitLabel = submitButton && submitButton.querySelector(".submit-label");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        formMessage.textContent = "";
        formMessage.classList.remove("error");

        if (!contactForm.reportValidity()) return;

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.setAttribute("aria-busy", "true");
        }
        if (submitLabel) submitLabel.textContent = "Sending…";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error("The contact service returned an unsuccessful response.");
            }

            formMessage.textContent = "Thanks for reaching out. Your message has been sent.";
            contactForm.reset();
        } catch (error) {
            formMessage.textContent = "Your message couldn't be sent. Please try again or email me directly.";
            formMessage.classList.add("error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute("aria-busy");
            }
            if (submitLabel) submitLabel.textContent = "Send message";
        }
    });
}

const revealElements = document.querySelectorAll(".section-heading, .about-copy, .skills-panel, .service-card, .contact-info, .contact-form");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });
} else {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}

const sectionLinks = document.querySelectorAll(".nav-links a");
const navigationSections = document.querySelectorAll("#home, #about, #services, #contact");

function setActiveSection(sectionId) {
    sectionLinks.forEach(function (link) {
        if (link.getAttribute("href") === "#" + sectionId) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
    }, { rootMargin: "-30% 0px -60% 0px" });

    navigationSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
} else if (navigationSections.length) {
    setActiveSection("home");
}
