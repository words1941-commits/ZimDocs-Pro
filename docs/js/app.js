/* ================================
   ZimDocs-Pro v5 | Legacy Technology
   Glass UI, Dark Mode, Responsive
   ================================ */

body {
  margin: 0;
  font-family: 'Segoe UI', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg,#1e1e2f,#2c2c3f);
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

.card {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6);
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.3s ease;
}

header.card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  margin: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo h1 {
  margin: 0;
  font-size: 1.8em;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}

.logo .subtitle {
  font-size: 0.9em;
  color: #ccc;
}

.btn {
  padding: 8px 16px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: rgba(34,197,94,0.2);
  color: #fff;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(34,197,94,0.4);
  transition: all 0.3s ease;
  margin-left: 6px;
}

.btn:hover {
  background: rgba(34,197,94,0.4);
  box-shadow: 0 6px 25px rgba(34,197,94,0.6);
  transform: scale(1.03);
}

.layout {
  display: flex;
  margin: 12px;
  gap: 12px;
  flex-wrap: wrap;
}

nav.sidebar {
  flex: 0 0 180px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
}

nav.sidebar .nav-btn {
  text-align: left;
  padding: 10px 12px;
  font-size: 1em;
}

nav.sidebar .footer-note {
  margin-top: auto;
  font-size: 0.8em;
  color: #aaa;
  text-align: center;
}

section.content {
  flex: 1;
  padding: 20px;
  min-height: 400px;
  overflow-y: auto;
}

textarea, input[type="file"], canvas {
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  border: none;
  outline: none;
  background: rgba(255,255,255,0.1);
  color: #fff;
  font-size: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  resize: vertical;
  margin-top: 10px;
}

#status-bar {
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  transition: opacity 0.3s ease;
}

body.dark {
  background: linear-gradient(135deg,#0f172a,#1e293b);
  color: #fff;
}

@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }
  nav.sidebar {
    flex: 1;
    flex-direction: row;
    overflow-x: auto;
  }
  nav.sidebar .nav-btn {
    flex: 0 0 auto;
  }
}
