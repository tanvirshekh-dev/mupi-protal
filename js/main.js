// Auto-detect current host IP/domain so CTFd links work across the campus LAN
const defaultHost = window.location.hostname || 'localhost';
let ctfdUrl = localStorage.getItem('campus_ctfd_url') || `http://${defaultHost}:8000`;

function updateCtfdLinks() {
    const links = [
        document.getElementById('top-ctfd-link'),
        document.getElementById('hero-ctfd-btn'),
        document.getElementById('main-ctfd-btn'),
        ...document.querySelectorAll('.ctfd-dynamic-link')
    ];
    links.forEach(el => {
        if (el) el.href = ctfdUrl;
    });

    const endpointDisplay = document.getElementById('ctfdEndpointDisplay');
    const aboutDisplay = document.getElementById('aboutCtfdUrl');
    if (endpointDisplay) endpointDisplay.textContent = ctfdUrl;
    if (aboutDisplay) aboutDisplay.textContent = ctfdUrl;
}

function configureCtfdUrl() {
    const updated = prompt('Enter your local CTFd Server URL (e.g., http://192.168.1.10:8000):', ctfdUrl);
    if (updated && updated.trim()) {
        ctfdUrl = updated.trim();
        localStorage.setItem('campus_ctfd_url', ctfdUrl);
        updateCtfdLinks();
        alert('CTFd endpoint updated to: ' + ctfdUrl);
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Event Category Filtering
const tabBtns = document.querySelectorAll('.tab-btn');
const eventCards = document.querySelectorAll('.event-card');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        eventCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Modal Controls
function openModal(id) {
    document.getElementById(id).classList.add('open');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('open');
}

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('open');
    }
});

// Student Login Simulation (Client-side session ready for backend API hook)
const openLoginBtn = document.getElementById('openLoginBtn');
const loginForm = document.getElementById('loginForm');
const studentDashboard = document.getElementById('studentDashboard');
const logoutBtn = document.getElementById('logoutBtn');

if (openLoginBtn) {
    openLoginBtn.addEventListener('click', () => openModal('loginModal'));
}

function checkStudentSession() {
    const savedStudent = JSON.parse(localStorage.getItem('campus_student') || 'null');
    if (savedStudent) {
        document.getElementById('loggedStudentName').textContent = savedStudent.name;
        document.getElementById('loggedStudentId').textContent = savedStudent.id;
        studentDashboard.style.display = 'block';
        openLoginBtn.textContent = savedStudent.id;
    } else {
        studentDashboard.style.display = 'none';
        openLoginBtn.textContent = 'Student Login';
    }
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('studentId').value.trim();
        const name = document.getElementById('studentName').value.trim();
        localStorage.setItem('campus_student', JSON.stringify({ id, name }));
        closeModal('loginModal');
        checkStudentSession();
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('campus_student');
        checkStudentSession();
    });
}

// Resource Modal Handler
function openResourceModal(title) {
    document.getElementById('infoModalTitle').textContent = title;
    const body = document.getElementById('infoModalBody');
    body.innerHTML = `
        <p style="margin: 12px 0; color: #475569;">
            Connected to Campus 1.8 TB Storage Pool (<code>\\CAMPUS-SRV\SharedResources</code>).
        </p>
        <div style="background:#f1f5f9; padding:14px; border-radius:8px; font-size:0.9rem; margin-bottom:16px;">
            <strong>Available Directories:</strong>
            <ul style="margin-left:18px; margin-top:6px;">
                <li>Semester_1_to_8_Lecture_Notes/</li>
                <li>Linux_OS_ISOs_And_Lab_VMs/</li>
                <li>Previous_Year_Question_Bank/</li>
            </ul>
        </div>
        <p style="font-size:0.85rem; color:#64748b;">
            Tip: Map your 1.8 TB drive folder as a virtual directory <code>/files</code> in IIS Manager to serve direct browser downloads.
        </p>
    `;
    openModal('infoModal');
}

function registerEvent(eventName) {
    document.getElementById('infoModalTitle').textContent = 'Register: ' + eventName;
    document.getElementById('infoModalBody').innerHTML = `
        <form onsubmit="submitEventReg(event, '${eventName}')" style="margin-top:12px;">
            <div class="form-group">
                <label>Team / Participant Name</label>
                <input type="text" required placeholder="e.g., CyberKnights">
            </div>
            <div class="form-group">
                <label>Lead Student ID</label>
                <input type="text" required placeholder="e.g., CS-2026-104">
            </div>
            <button type="submit" class="btn btn-primary btn-block">Confirm Registration</button>
        </form>
    `;
    openModal('infoModal');
}

function submitEventReg(e, eventName) {
    e.preventDefault();
    document.getElementById('infoModalBody').innerHTML = `
        <p style="margin-top:14px; color:#059669; font-weight:600;">
            Registration confirmed for ${eventName}! Check the notice board for room/server details.
        </p>
    `;
}

function openLightbox(title, desc) {
    document.getElementById('infoModalTitle').textContent = title;
    document.getElementById('infoModalBody').innerHTML = `
        <p style="margin-top:10px; color:#475569;">${desc}</p>
        <p style="margin-top:12px; font-size:0.85rem; color:#64748b;">Replace SVG placeholders in <code>assets/gallery/</code> with your campus event photos.</p>
    `;
    openModal('infoModal');
}

// Initialize on load
updateCtfdLinks();
checkStudentSession();
