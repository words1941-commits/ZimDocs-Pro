/* ================================
   ZimDocs-Pro | Legacy Technology
   Offline-Ready App Engine v4.0
   ================================ */

console.log("ZimDocs-Pro loaded ✅");

// 🌐 Detect online/offline state
window.addEventListener("online", () => showStatus("Back online ✅", "success"));
window.addEventListener("offline", () => showStatus("You're offline. Changes saved locally.", "warning"));

// 📦 Local Storage Manager
const STORAGE_KEY = "zimdocs-pro-data";
let appData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  resume: "",
  signature: "",
  notes: "",
};

// 🔔 Status message utility
function showStatus(msg, type = "info") {
  let bar = document.getElementById("status-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "status-bar";
    bar.style.position = "fixed";
    bar.style.bottom = "10px";
    bar.style.left = "50%";
    bar.style.transform = "translateX(-50%)";
    bar.style.padding = "10px 16px";
    bar.style.borderRadius = "8px";
    bar.style.color = "#fff";
    bar.style.zIndex = 9999;
    document.body.appendChild(bar);
  }
  bar.style.background =
    type === "success"
      ? "#22c55e"
      : type === "warning"
      ? "#eab308"
      : "#60a5fa";
  bar.textContent = msg;
  bar.style.opacity = 1;
  setTimeout(() => (bar.style.opacity = 0), 4000);
}

// 🧰 UI Sections
const content = document.getElementById("content");
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    loadSection(section);
  });
});

// 🧱 Default view
loadSection("home");

// 🚀 Section Loader
function loadSection(section) {
  switch (section) {
    case "home":
      content.innerHTML = `
        <h2>🏠 Welcome to ZimDocs-Pro</h2>
        <p>Offline-ready productivity suite by <b>Legacy Technology</b>.</p>
        <p>Use the left menu to start building your Resume, edit photos, or sign documents.</p>
        <button id="backup-btn" class="btn">📤 Backup Data</button>
        <button id="restore-btn" class="btn">📥 Restore Data</button>
      `;
      document.getElementById("backup-btn").onclick = backupData;
      document.getElementById("restore-btn").onclick = restoreData;
      break;

    case "resume":
      content.innerHTML = `
        <h2>📄 Resume Builder</h2>
        <textarea id="resume-text" placeholder="Write your resume here..." rows="14">${appData.resume || ""}</textarea>
        <button class="btn" id="save-resume">💾 Save</button>
      `;
      document.getElementById("save-resume").onclick = () => {
        appData.resume = document.getElementById("resume-text").value;
        saveData();
        showStatus("Resume saved ✅", "success");
      };
      break;

    case "photo":
      content.innerHTML = `
        <h2>📸 Photo Tools</h2>
        <div class="preview-photo">Upload photo feature coming soon...</div>
      `;
      break;

    case "files":
      content.innerHTML = `
        <h2>📂 File Manager</h2>
        <p>Coming soon — offline document viewer.</p>
      `;
      break;

    case "sign":
      content.innerHTML = `
        <h2>✍️ Signature Pad</h2>
        <canvas id="sign-pad" width="300" height="150" style="border:1px solid #ccc;border-radius:8px;background:white;"></canvas>
        <div style="margin-top:10px;">
          <button id="save-sign" class="btn">💾 Save</button>
          <button id="clear-sign" class="btn">🧹 Clear</button>
        </div>
      `;
      initSignaturePad();
      break;

    default:
      content.innerHTML = `<h2>Section not found.</h2>`;
  }
}

// 💾 Save all local data
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

// 📤 Backup data (download JSON)
function backupData() {
  const blob = new Blob([JSON.stringify(appData, null, 2)], {
    type: "application/json",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "zimdocs-backup.json";
  link.click();
  showStatus("Backup downloaded 💾", "success");
}

// 📥 Restore data (upload JSON)
function restoreData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        appData = data;
        saveData();
        showStatus("Backup restored ✅", "success");
        loadSection("home");
      } catch {
        showStatus("Invalid backup file ❌", "warning");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// 🖊 Signature pad system
function initSignaturePad() {
  const canvas = document.getElementById("sign-pad");
  const ctx = canvas.getContext("2d");
  let drawing = false;

  const startDraw = (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - canvas.getBoundingClientRect().left,
      e.clientY - canvas.getBoundingClientRect().top
    );
  };
  const draw = (e) => {
    if (!drawing) return;
    ctx.lineTo(
      e.clientX - canvas.getBoundingClientRect().left,
      e.clientY - canvas.getBoundingClientRect().top
    );
    ctx.stroke();
  };
  const stopDraw = () => (drawing = false);

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  document.getElementById("save-sign").onclick = () => {
    appData.signature = canvas.toDataURL();
    saveData();
    showStatus("Signature saved 🖋️", "success");
  };

  document.getElementById("clear-sign").onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}

// 🌙 Apply dark mode theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
