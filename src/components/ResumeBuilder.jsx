import React, { useState } from 'react'
import { saveDocAsPdf } from '../utils/pdfUtils'
import storage from '../utils/storage'

const defaultData = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  education: '',
  experience: ''
}

export default function ResumeBuilder() {
  const [data, setData] = useState(defaultData)

  function update(field, value) {
    setData(d => ({ ...d, [field]: value }))
  }

  async function handleExportPDF() {
    await saveDocAsPdf(data)
    await storage.save('last_resume', data)
    alert('PDF saved (downloaded) and stored locally')
  }

  return (
    <div>
      <h2>Create Resume</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div>
          <label className='small'>Full name<input className='input' value={data.name} onChange={e => update('name', e.target.value)} /></label>
          <label className='small'>Email<input className='input' value={data.email} onChange={e => update('email', e.target.value)} /></label>
          <label className='small'>Phone<input className='input' value={data.phone} onChange={e => update('phone', e.target.value)} /></label>
        </div>
        <div>
          <label className='small'>Summary<textarea className='input' value={data.summary} onChange={e => update('summary', e.target.value)} /></label>
        </div>
      </div>

      <div style={{marginTop:12}}>
        <label className='small'>Education<textarea className='input' value={data.education} onChange={e => update('education', e.target.value)} /></label>
        <label className='small'>Experience<textarea className='input' value={data.experience} onChange={e => update('experience', e.target.value)} /></label>
      </div>

      <div style={{marginTop:12,display:'flex',gap:8}}>
        <button className='btn primary' onClick={handleExportPDF}>Export PDF</button>
        <button className='btn' onClick={() => {navigator.clipboard.writeText(JSON.stringify(data)); alert('Saved to clipboard')}}>Copy JSON</button>
      </div>
    </div>
  )
}
