/* ================================
   ZimDocs-Pro v9 | Legacy Technology
   APK-only, iPhone Glass UI, Offline Ready
   ================================ */

import jsPDF from './lib/jspdf.umd.min.js';

console.log("ZimDocs-Pro v9 APK loaded ✅");

const STORAGE_KEY = "zimdocs-pro-data";
let appData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  resume: "",
  notes: "",
  signature: "",
  photos: [],
  templates: [],
  notesTemplates: []
};

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
}

function showStatus(msg, type="info") {
  let bar = document.getElementById("status-bar");
  if(!bar) {
    bar = document.createElement("div");
    bar.id = "status-bar";
    bar.style.position = "fixed";
    bar.style.bottom = "10px";
    bar.style.left = "50%";
    bar.style.transform = "translateX(-50%)";
    bar.style.padding = "10px 16px";
    bar.style.borderRadius = "12px";
    bar.style.color = "#fff";
    bar.style.zIndex = 9999;
    bar.style.backdropFilter = "blur(10px)";
    document.body.appendChild(bar);
  }
  bar.style.background = type === "success" ? "#22c55e" : type === "warning" ? "#eab308" : "#60a5fa";
  bar.textContent = msg;
  bar.style.opacity = 1;
  setTimeout(() => bar.style.opacity = 0, 4000);
}

// Dark mode toggle
const toggle = document.getElementById('darkmode-toggle');
toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if(localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// Preload Resume Templates
if(appData.templates.length === 0) {
  appData.templates = [
    {id:"t1",name:"Modern Professional",content:"<h2>John Doe</h2><p>Software Engineer</p><p>XYZ Corp, 5 yrs</p>",images:[]},
    {id:"t2",name:"Creative Designer",content:"<h2>Jane Smith</h2><p>Graphic Designer</p><p>ABC Studio, 3 yrs</p>",images:[]},
    {id:"t3",name:"Tech Lead",content:"<h2>Mike Johnson</h2><p>Tech Lead</p><p>Experience: 8 yrs</p>",images:[]},
    {id:"t4",name:"Marketing Expert",content:"<h2>Sarah Lee</h2><p>Marketing Specialist</p><p>DEF Agency, 6 yrs</p>",images:[]},
    {id:"t5",name:"Product Manager",content:"<h2>David Kim</h2><p>Product Manager</p><p>GHI Corp, 7 yrs</p>",images:[]},
    {id:"t6",name:"UX/UI Designer",content:"<h2>Emily Wong</h2><p>UX/UI Designer</p><p>JKL Studio, 4 yrs</p>",images:[]},
    {id:"t7",name:"Full Stack Developer",content:"<h2>Chris Brown</h2><p>Full Stack Developer</p><p>MNO Inc, 5 yrs</p>",images:[]},
    {id:"t8",name:"Data Analyst",content:"<h2>Anna Davis</h2><p>Data Analyst</p><p>PQR Corp, 3 yrs</p>",images:[]},
    {id:"t9",name:"Sales Executive",content:"<h2>James Wilson</h2><p>Sales Executive</p><p>STU Ltd, 6 yrs</p>",images:[]},
    {id:"t10",name:"Entrepreneur",content:"<h2>Olivia Martin</h2><p>Founder & CEO</p><p>Venture XYZ</p>",images:[]}
  ];
  saveData();
}

// Preload Notes Templates
if(appData.notesTemplates.length === 0) {
  appData.notesTemplates = [
    {id:"n1",name:"Meeting Notes",content:"<h2>Meeting Notes</h2><p>Date:</p><p>Attendees:</p><p>Notes:</p>"},
    {id:"n2",name:"Project Plan",content:"<h2>Project Plan</h2><p>Title:</p><p>Tasks:</p><p>Timeline:</p>"},
    {id:"n3",name:"Ideas Log",content:"<h2>Ideas Log</h2><p>Idea:</p><p>Description:</p><p>Notes:</p>"},
    {id:"n4",name:"Daily Journal",content:"<h2>Daily Journal</h2><p>Date:</p><p>Activities:</p><p>Reflections:</p>"},
    {id:"n5",name:"Research Notes",content:"<h2>Research Notes</h2><p>Topic:</p><p>Findings:</p><p>Summary:</p>"}
  ];
  saveData();
}

const content = document.getElementById("content");
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(btn => {
  btn.addEventListener("click", () => loadSection(btn.dataset.section));
});

// Load sections
function loadSection(section) {
  switch(section){
    case "home":
      content.innerHTML = `
        <h2>🏠 Welcome to ZimDocs-Pro v9</h2>
        <p>Offline-ready, APK-only productivity suite.</p>
        <p>Select a section from the left menu to start building your Resume, Notes, edit Photos, manage Files, or Sign documents.</p>
      `;
      break;

    case "resume":
      let resumeOptions = appData.templates.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
      content.innerHTML = `
        <h2>📄 Resume Builder</h2>
        <select id="template-select">${resumeOptions}</select>
        <div id="resume-editor" contenteditable="true" style="min-height:300px;margin-top:10px;padding:12px;border-radius:12px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);"></div>
        <div style="margin-top:10px;">
          <button id="save-resume" class="btn">💾 Save</button>
          <button id="export-resume" class="btn">📄 Export PDF</button>
          <input type="file" id="add-image" accept="image/*" class="btn" style="display:inline-block;"/>
        </div>
      `;
      const editor = document.getElementById("resume-editor");
      const select = document.getElementById("template-select");
      function loadTemplate(id){
        const temp = appData.templates.find(t => t.id===id);
        editor.innerHTML = temp.content;
      }
      loadTemplate(select.value);
      select.addEventListener("change",()=>loadTemplate(select.value));

      document.getElementById("save-resume").onclick = ()=>{
        appData.resume = editor.innerHTML;
        saveData();
        showStatus("Resume saved ✅","success");
      };

      document.getElementById("export-resume").onclick = ()=>{
        const doc = new jsPDF.jsPDF();
        doc.html(editor, {callback:function(pdf){pdf.save("resume.pdf");}});
        showStatus("PDF exported ✅","success");
      };

      document.getElementById("add-image").addEventListener("change",(e)=>{
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload=(ev)=>{
          const img = `<img src="${ev.target.result}" style="max-width:200px;margin-top:10px;">`;
          editor.innerHTML += img;
        };
        reader.readAsDataURL(file);
      });
      break;

    case "notes":
      let notesOptions = appData.notesTemplates.map(n=>`<option value="${n.id}">${n.name}</option>`).join('');
      content.innerHTML = `
        <h2>📝 Notes</h2>
        <select id="notes-select">${notesOptions}</select>
        <div id="notes-editor" contenteditable="true" style="min-height:300px;margin-top:10px;padding:12px;border-radius:12px;background:rgba(255,255,255,0.1);backdrop-filter:blur(10px);"></div>
        <div style="margin-top:10px;">
          <button id="save-notes" class="btn">💾 Save</button>
          <button id="export-notes" class="btn">📄 Export PDF</button>
        </div>
      `;
      const notesEditor = document.getElementById("notes-editor");
      const notesSelect = document.getElementById("notes-select");
      function loadNoteTemplate(id){
        const temp = appData.notesTemplates.find(n=>n.id===id);
        notesEditor.innerHTML = temp.content;
      }
      loadNoteTemplate(notesSelect.value);
      notesSelect.addEventListener("change",()=>loadNoteTemplate(notesSelect.value));
      document.getElementById("save-notes").onclick = ()=>{
        appData.notes = notesEditor.innerHTML;
        saveData();
        showStatus("Notes saved ✅","success");
      };
      document.getElementById("export-notes").onclick = ()=>{
        const doc = new jsPDF.jsPDF();
        doc.html(notesEditor,{callback:pdf=>pdf.save("notes.pdf")});
        showStatus("PDF exported ✅","success");
      };
      break;

    case "photo":
      content.innerHTML = `
        <h2>📸 Photo Tools</h2>
        <input type="file" id="photo-upload" accept="image/*"/>
        <div id="photo-preview" style="margin-top:10px;"></div>
      `;
      document.getElementById("photo-upload").addEventListener("change",(e)=>{
        const file=e.target.files[0];
        if(!file) return;
        const reader=new FileReader();
        reader.onload=(ev)=>{
          const img=document.createElement("img");
          img.src=ev.target.result;
          img.style.maxWidth="200px";
          document.getElementById("photo-preview").appendChild(img);
          appData.photos.push(ev.target.result);
          saveData();
          showStatus("Photo added ✅","success");
        };
        reader.readAsDataURL(file);
      });
      break;

    case "files":
      content.innerHTML = `
        <h2>📂 File Manager</h2>
        <p>All offline files are stored locally in APK.</p>
        <ul id="file-list"></ul>
      `;
      const list = document.getElementById("file-list");
      appData.photos.forEach((p,i)=>{
        const li = document.createElement("li");
        li.innerHTML=`Photo ${i+1} <button class="btn">View</button>`;
        li.querySelector("button").onclick=()=>window.open(p,"_blank");
        list.appendChild(li);
      });
      break;

    case "sign":
      content.innerHTML = `
        <h2>✍️ Signature Pad</h2>
        <canvas id="sign-pad" width="300" height="150" style="border:1px solid #ccc;border-radius:12px;background:white;"></canvas>
        <div style="margin-top:10px;">
          <button id="save-sign" class="btn">💾 Save</button>
          <button id="clear-sign" class="btn">🧹 Clear</button>
        </div>
      `;
      initSignaturePad();
      break;

    default:
      content.innerHTML="<h2>Section not found</h2>";
  }
}

// Signature Pad
function initSignaturePad(){
  const canvas=document.getElementById("sign-pad");
  const ctx=canvas.getContext("2d");
  let drawing=false;
  const startDraw=e=>{drawing=true;ctx.beginPath();ctx.moveTo(e.clientX-canvas.getBoundingClientRect().left,e.clientY-canvas.getBoundingClientRect().top)};
  const draw=e=>{if(!drawing) return;ctx.lineTo(e.clientX-canvas.getBoundingClientRect().left,e.clientY-canvas.getBoundingClientRect().top);ctx.stroke()};
  const stopDraw=()=>drawing=false;
  canvas.addEventListener("mousedown",startDraw);
  canvas.addEventListener("mousemove",draw);
  canvas.addEventListener("mouseup",stopDraw);
  canvas.addEventListener("mouseleave",stopDraw);
  document.getElementById("save-sign").onclick=()=>{
    appData.signature=canvas.toDataURL();
    saveData();
    showStatus("Signature saved 🖋️","success");
  };
  document.getElementById("clear-sign").onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Load default section
loadSection("home");
