import { initNavigation } from "./navigation.js";
import { initModals } from "./modal.js";
import { initLogin } from "./login.js";
import { initEvents } from "./events.js";
import { initCtfd } from "./ctfd.js";

const components = [
    ["navbar-mount", "pages/components/navbar.html"],
    ["home-mount", "pages/home.html"],
    ["notice-board-mount", "pages/components/notice-board.html"],
    ["students-portal-mount", "pages/students-portal.html"],
    ["events-mount", "pages/events.html"],
    ["gallery-mount", "pages/gallery.html"],
    ["about-mount", "pages/about.html"],
    ["footer-mount", "pages/components/footer.html"],
    ["login-modal-mount", "pages/components/login-modal.html"],
    ["resource-modal-mount", "pages/components/resource-modal.html"]
];

async function loadComponent(targetId, filePath) {
    const target = document.getElementById(targetId);
    if (!target) throw new Error(`Missing mount element: #${targetId}`);

    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Could not load ${filePath} (${response.status})`);

    target.innerHTML = await response.text();
}

async function startApp() {
    try {
        // Load sequentially so the page is assembled before JS features initialize.
        for (const [targetId, filePath] of components) {
            await loadComponent(targetId, filePath);
        }

        initModals();
        initNavigation();
        initLogin();
        initEvents();
        initCtfd();

        document.body.classList.add("app-ready");
    } catch (error) {
        console.error("MUPI Portal failed to initialize:", error);
        document.body.insertAdjacentHTML(
            "afterbegin",
            '<p class="app-error">Portal content could not load. Run this project using VS Code Live Server or a web server.</p>'
        );
    }
}

document.addEventListener("DOMContentLoaded", startApp);
