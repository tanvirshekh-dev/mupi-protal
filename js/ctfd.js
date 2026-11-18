export function initCtfd() {
    const host = window.location.hostname || "localhost";
    let ctfdUrl = localStorage.getItem("campus_ctfd_url") || `http://${host}:8000`;

    function updateCtfdLinks() {
        document.querySelectorAll(".ctfd-dynamic-link").forEach(link => {
            link.href = ctfdUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });

        ["main-ctfd-btn", "hero-ctfd-btn", "top-ctfd-link"].forEach(id => {
            const link = document.getElementById(id);
            if (link) {
                link.href = ctfdUrl;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
            }
        });

        const endpoint = document.getElementById("ctfdEndpointDisplay");
        const aboutEndpoint = document.getElementById("aboutCtfdUrl");
        if (endpoint) endpoint.textContent = ctfdUrl;
        if (aboutEndpoint) aboutEndpoint.textContent = ctfdUrl;
    }

    window.configureCtfdUrl = function () {
        const updated = prompt(
            "Enter your local CTFd Server URL (e.g. http://192.168.1.10:8000):",
            ctfdUrl
        );

        if (!updated || !updated.trim()) return;

        try {
            const parsed = new URL(updated.trim());
            if (!["http:", "https:"].includes(parsed.protocol)) {
                throw new Error("Use HTTP or HTTPS.");
            }
            ctfdUrl = parsed.origin;
            localStorage.setItem("campus_ctfd_url", ctfdUrl);
            updateCtfdLinks();
            alert(`CTFd endpoint updated to: ${ctfdUrl}`);
        } catch {
            alert("Invalid URL. Example: http://192.168.1.10:8000");
        }
    };

    updateCtfdLinks();
}
