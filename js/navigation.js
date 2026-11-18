export function initNavigation() {
    const toggle = document.getElementById("menuToggle");
    const links = document.getElementById("navLinks");

    if (toggle && links) {
        toggle.addEventListener("click", () => {
            const isOpen = links.classList.toggle("show");
            toggle.setAttribute("aria-expanded", String(isOpen));
        });

        links.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener("click", () => links.classList.remove("show"));
        });
    }
}
