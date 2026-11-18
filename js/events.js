export function initEvents() {
    const buttons = document.querySelectorAll(".tab-btn");
    const cards = document.querySelectorAll(".event-card");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;
            cards.forEach(card => {
                const show = filter === "all" || card.dataset.category === filter;
                card.hidden = !show;
            });
        });
    });

    window.registerEvent = function (eventName) {
        const title = document.getElementById("infoModalTitle");
        const body = document.getElementById("infoModalBody");
        if (!title || !body) return;

        title.textContent = `Register: ${eventName}`;
        body.innerHTML = `
            <form id="eventRegistrationForm" class="event-registration-form">
                <div class="form-group">
                    <label for="teamName">Team / Participant Name</label>
                    <input id="teamName" name="teamName" required placeholder="e.g. CyberKnights">
                </div>
                <div class="form-group">
                    <label for="leadStudentId">Lead Student ID</label>
                    <input id="leadStudentId" name="leadStudentId" required placeholder="e.g. CS-2026-104">
                </div>
                <button type="submit" class="btn btn-primary btn-block">Confirm Registration</button>
            </form>
        `;

        body.querySelector("form").addEventListener("submit", event => {
            event.preventDefault();
            body.textContent = `Registration request recorded locally for ${eventName}. Connect a backend to save it permanently.`;
        });

        window.openModal?.("infoModal");
    };
}
