import React, { useState } from 'react'
import Dashboard from './components/Dashboard'
import ResumeBuilder from './components/ResumeBuilder'
import PhotoTool from './components/PhotoTool'
import FileManager from './components/FileManager'
import SignTool from './components/SignTool'
import LanguageToggle from './components/LanguageToggle'

export default function App() {
  const [view, setView] = useState('dashboard')

  return (
    <div className='app'>
      <header className='header'>
        <div className='brand'>
          <div className='logo'>ZD</div>
          <div>
            <div style={{fontSize:18,fontWeight:700}}>ZimDocs Pro</div>
            <div className='small'>Offline Resume & Document Studio</div>
          </div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <LanguageToggle />
        </div>
      </header>

      <nav className='nav card'>
        <button className='btn' onClick={() => setView('dashboard')}>Home</button>
        <button className='btn' onClick={() => setView('resume')}>Resume</button>
        <button className='btn' onClick={() => setView('photo')}>Photo</button>
        <button className='btn' onClick={() => setView('files')}>Files</button>
        <button className='btn' onClick={() => setView('sign')}>Sign</button>
        <button className='btn primary' onClick={() => setView('resume')}>Create Resume</button>
      </nav>

      <div className='grid'>
        <main className='card'>
          {view === 'dashboard' && <Dashboard />}
          {view === 'resume' && <ResumeBuilder />}
          {view === 'photo' && <PhotoTool />}
          {view === 'files' && <FileManager />}
          {view === 'sign' && <SignTool />}
        </main>
        <aside className='sidebar card'>
          <h4>Quick Actions</h4>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:8}}>
            <button className='btn'>New Resume</button>
            <button className='btn'>Passport Photo</button>
            <button className='btn'>Sign Document</button>
          </div>
          <div style={{marginTop:16}} className='small'>Storage is local to this device. No internet required.</div>
        </aside>
      </div>

      <footer className='footer'>ZimDocs Pro • Offline-first • English + Shona</footer>
    </div>
  )
}
