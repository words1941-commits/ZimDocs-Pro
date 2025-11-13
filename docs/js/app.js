console.log("ZimDocs-Pro APK loaded ✅");

// Local data manager
const STORAGE_KEY = "zimdocs-pro-data";
let appData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  resume: "",
  notes: "",
  signature: "",
  files: [],
};

// Sections
const content = document.getElementById("content");
const navButtons = document.querySelectorAll(".nav-btn");
navButtons.forEach(btn => {
  btn.addEventListener("click", () => loadSection(btn.dataset.section));
});

// Default view
loadSection("home");

function loadSection(section) {
  switch (section) {
    case "home":
      content.innerHTML = `
        <h2>🏠 Welcome to ZimDocs-Pro</h2>
        <p>Offline-ready productivity suite by <b>Legacy Technology</b>.</p>
        <button id="backup" class="btn">📤 Backup</button>
        <button id="restore" class="btn">📥 Restore</button>
      `;
      document.getElementById("backup").onclick = backupData;
      document.getElementById("restore").onclick = restoreData;
      break;

    case "resume":
      content.innerHTML = `
        <h2>📄 Resume Builder</h2>
        <textarea id="resume" rows="14" placeholder="Write or paste your resume...">${appData.resume}</textarea>
        <button id="save" class="btn">💾 Save</button>
        <button id="export" class="btn">📑 Export PDF</button>
      `;
      document.getElementById("save").onclick = () => {
        appData.resume = document.getElementById("resume").value;
        saveData();
      };
      document.getElementById("export").onclick = exportPDF;
      break;

    case "photo":
      content.innerHTML = `
        <h2>📸 Photo Editor</h2>
        <input type="file" id="photoUpload" accept="image/*">
        <canvas id="photoCanvas" width="300" height="300"></canvas>
      `;
      const input = document.getElementById("photoUpload");
      const canvas = document.getElementById("photoCanvas");
      const ctx = canvas.getContext("2d");
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.src = URL.createObjectURL(file);
      });
      break;

    case "files":
      content.innerHTML = `
        <h2>📂 File Manager</h2>
        <input type="file" id="fileUpload" multiple>
        <ul id="fileList"></ul>
      `;
      const upload = document.getElementById("fileUpload");
      const list = document.getElementById("fileList");
      upload.addEventListener("change", (e) => {
        for (let file of e.target.files) {
          appData.files.push(file.name);
          const li = document.createElement("li");
          li.textContent = file.name;
          list.appendChild(li);
        }
        saveData();
      });
      appData.files.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        list.appendChild(li);
      });
      break;

    case "sign":
      content.innerHTML = `
        <h2>✍️ Signature Pad</h2>
        <canvas id="signPad" width="300" height="150" style="background:white;border-radius:10px"></canvas>
        <div>
          <button id="saveSign" class="btn">💾 Save</button>
          <button id="clear" class="btn">🧹 Clear</button>
        </div>
      `;
      initSign();
      break;
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  alert("✅ Data saved offline!");
}

function backupData() {
  const blob = new Blob([JSON.stringify(appData)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "zimdocs-backup.json";
  link.click();
}

function restoreData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      appData = JSON.parse(ev.target.result);
      saveData();
      loadSection("home");
    };
    reader.readAsText(file);
  };
  input.click();
}

function initSign() {
  const canvas = document.getElementById("signPad");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  canvas.addEventListener("mousedown", e => { drawing = true; ctx.beginPath(); ctx.moveTo(e.offsetX, e.offsetY); });
  canvas.addEventListener("mousemove", e => { if (drawing) { ctx.lineTo(e.offsetX, e.offsetY); ctx.stroke(); }});
  canvas.addEventListener("mouseup", () => drawing = false);
  document.getElementById("saveSign").onclick = () => {
    appData.signature = canvas.toDataURL();
    saveData();
  };
  document.getElementById("clear").onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function exportPDF() {
  import("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js").then(({ jsPDF }) => {
    const doc = new jsPDF();
    doc.text(appData.resume || "No resume content", 10, 10);
    if (appData.signature) {
      doc.addImage(appData.signature, "PNG", 10, 20, 60, 30);
    }
    doc.save("Resume.pdf");
  });
}
