# MUPI Portal — Structured Frontend

## Run
1. Open this folder in VS Code.
2. Install/use the Live Server extension.
3. Right-click `index.html` → Open with Live Server.
4. Do not open `index.html` with file:// because components load through fetch().

## How the app connects
- `index.html` contains mount points such as `#navbar-mount` and `#events-mount`.
- `js/main.js` fetches each fragment from `pages/` and inserts it into its mount point.
- After all fragments load, `main.js` initializes navigation, modal, login demo, event filtering and CTFd URL handling.
- `css/style.css` imports the smaller CSS files in order.

## Important
- Login is a browser-only demo using localStorage. It is NOT secure authentication.
- Event registration is a browser-only confirmation. Connect a backend/database to store real registrations.
- CTFd must be reachable from the student's device. `localhost` means the student's own computer; configure the campus server IP if CTFd runs on another machine.
- Copy your existing logo and gallery image files into `assets/gallery/`.
