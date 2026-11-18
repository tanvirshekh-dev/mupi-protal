export function initModals() {
    window.openModal = function (id) {
        document.getElementById(id)?.classList.add("open");
    };

    window.closeModal = function (id) {
        document.getElementById(id)?.classList.remove("open");
    };

    window.addEventListener("click", event => {
        if (event.target.classList.contains("modal")) {
            event.target.classList.remove("open");
        }
    });

    window.openResourceModal = function (title) {
        const titleEl = document.getElementById("infoModalTitle");
        const body = document.getElementById("infoModalBody");
        if (!titleEl || !body) return;

        titleEl.textContent = title;
        body.innerHTML = `
            <p class="resource-intro">
                Connected to Campus 1.8 TB Storage Pool
                (<code>\\\\CAMPUS-SRV\\SharedResources</code>).
            </p>
            <div class="resource-directory">
                <strong>Available Directories:</strong>
                <ul>
                    <li>Semester_1_to_8_Lecture_Notes/</li>
                    <li>Linux_OS_ISOs_And_Lab_VMs/</li>
                    <li>Previous_Year_Question_Bank/</li>
                </ul>
            </div>
            <p class="resource-tip">
                Tip: Map your storage folder as an IIS virtual directory named
                <code>/files</code> to serve browser downloads.
            </p>
        `;
        window.openModal("infoModal");
    };

    window.openLightbox = function (title, description) {
        const titleEl = document.getElementById("infoModalTitle");
        const body = document.getElementById("infoModalBody");
        if (!titleEl || !body) return;

        titleEl.textContent = title;
        const paragraph = document.createElement("p");
        paragraph.textContent = description;
        body.replaceChildren(paragraph);
        window.openModal("infoModal");
    };
}
