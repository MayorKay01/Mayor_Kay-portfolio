document.documentElement.classList.add("js");

const currentPage = document.body.dataset.page;
document.querySelectorAll("[data-page-link]").forEach(function (link) {
    if (link.dataset.pageLink === currentPage) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});

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
