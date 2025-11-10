import React, { useRef, useState } from 'react'
import { toPassportPhoto } from '../utils/photoUtils'

export default function PhotoTool(){
  const fileRef = useRef()
  const [preview, setPreview] = useState(null)
  const [format, setFormat] = useState('zim') // zim, uk, us, eu

  const sizes = {
    zim:{w:35,h:45},
    uk:{w:35,h:45},
    us:{w:50,h:70},
    eu:{w:35,h:45}
  }

  async function handleFile(e){
    const f = e.target.files[0]
    if(!f) return
    const s = sizes[format]
    const dataUrl = await toPassportPhoto(f, { widthMm: s.w, heightMm: s.h, dpi:300 })
    setPreview(dataUrl)
  }

  return (
    <div>
      <h2>Passport Photo Tool</h2>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <select value={format} onChange={e=>setFormat(e.target.value)} className='input' style={{width:160}}>
          <option value='zim'>Zimbabwe (35x45 mm)</option>
          <option value='uk'>UK (35x45 mm)</option>
          <option value='us'>USA (50x70 mm)</option>
          <option value='eu'>EU (35x45 mm)</option>
        </select>
        <input type='file' accept='image/*' ref={fileRef} onChange={handleFile} />
      </div>

      <div style={{marginTop:12}}>
        {preview && <div><img src={preview} alt='passport' style={{maxWidth:240,border:'1px solid #ddd'}} /><a href={preview} download='passport.png' className='btn'>Download</a></div>}
      </div>
    </div>
  )
}
