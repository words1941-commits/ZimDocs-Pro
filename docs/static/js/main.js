// Simple notes app to mimic ZimDocs-Pro functionality (works without build tools)
const notesKey = 'zimdocs_notes_v1';

function loadNotes(){
  try{
    const raw = localStorage.getItem(notesKey);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function saveNotes(notes){
  localStorage.setItem(notesKey, JSON.stringify(notes));
}

function renderNotes(){
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  const notes = loadNotes();
  if(notes.length===0){
    list.innerHTML = '<div style="color:var(--muted)">No notes yet — click New Note to create one.</div>';
    return;
  }
  notes.slice().reverse().forEach((n, idx)=>{
    const el = document.createElement('div');
    el.className = 'note';
    el.innerHTML = `<div class="title">${n.title||'Untitled'}</div><div class="body">${n.body||''}</div>`;
    el.onclick = ()=>{ editNote(notes.length - 1 - idx); };
    list.appendChild(el);
  });
}

function editNote(index){
  const notes = loadNotes();
  const n = notes[index];
  const title = prompt('Edit title', n.title||'');
  if(title===null) return;
  const body = prompt('Edit body', n.body||'');
  if(body===null) return;
  notes[index] = {title, body, updated: Date.now()};
  saveNotes(notes);
  renderNotes();
}

document.getElementById('newNote').addEventListener('click', ()=>{
  const title = prompt('Note title')||'Untitled';
  const body = prompt('Note body')||'';
  const notes = loadNotes();
  notes.push({title, body, created: Date.now()});
  saveNotes(notes);
  renderNotes();
});

document.getElementById('search').addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase();
  const notes = loadNotes();
  const filtered = notes.filter(n => (n.title||'').toLowerCase().includes(q) || (n.body||'').toLowerCase().includes(q));
  const list = document.getElementById('notesList');
  list.innerHTML = '';
  if(filtered.length===0){ list.innerHTML = '<div style="color:var(--muted)">No results</div>'; return; }
  filtered.slice().reverse().forEach(n=>{
    const el = document.createElement('div');
    el.className = 'note';
    el.innerHTML = `<div class="title">${n.title||'Untitled'}</div><div class="body">${n.body||''}</div>`;
    list.appendChild(el);
  });
});

// initial render
renderNotes();