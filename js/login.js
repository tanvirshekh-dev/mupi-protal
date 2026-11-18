export function initLogin() {
    const openLoginBtn = document.getElementById("openLoginBtn");
    const loginForm = document.getElementById("loginForm");
    const dashboard = document.getElementById("studentDashboard");
    const logoutBtn = document.getElementById("logoutBtn");

    function checkStudentSession() {
        let student = null;
        try {
            student = JSON.parse(localStorage.getItem("campus_student") || "null");
        } catch {
            localStorage.removeItem("campus_student");
        }

        const nameEl = document.getElementById("loggedStudentName");
        const idEl = document.getElementById("loggedStudentId");

        if (student && dashboard && openLoginBtn) {
            if (nameEl) nameEl.textContent = student.name;
            if (idEl) idEl.textContent = student.id;
            dashboard.style.display = "block";
            openLoginBtn.textContent = student.id;
        } else {
            if (dashboard) dashboard.style.display = "none";
            if (openLoginBtn) openLoginBtn.textContent = "Student Login";
        }
    }

    openLoginBtn?.addEventListener("click", () => window.openModal?.("loginModal"));

    loginForm?.addEventListener("submit", event => {
        event.preventDefault();
        const id = document.getElementById("studentId")?.value.trim();
        const name = document.getElementById("studentName")?.value.trim();

        if (!id || !name) return;

        // Demo only: this is not secure authentication.
        localStorage.setItem("campus_student", JSON.stringify({ id, name }));
        window.closeModal?.("loginModal");
        loginForm.reset();
        checkStudentSession();
    });

    logoutBtn?.addEventListener("click", () => {
        localStorage.removeItem("campus_student");
        checkStudentSession();
    });

    checkStudentSession();
}
