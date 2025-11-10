import React, { useRef, useEffect } from 'react'
import SignaturePad from 'signature_pad'

export default function SignTool(){
  const canvasRef = useRef()
  const padRef = useRef()

  useEffect(()=>{
    const canvas = canvasRef.current
    padRef.current = new SignaturePad(canvas)
    function resize(){
      const ratio = Math.max(window.devicePixelRatio || 1, 1)
      canvas.width = canvas.offsetWidth * ratio
      canvas.height = 160 * ratio
      canvas.getContext('2d').scale(ratio, ratio)
      padRef.current.clear()
    }
    resize()
    window.addEventListener('resize', resize)
    return ()=> window.removeEventListener('resize', resize)
  },[])

  function save(){
    const data = padRef.current.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = data
    a.download = 'signature.png'
    a.click()
  }

  return (
    <div>
      <h2>Signature Tool</h2>
      <div style={{border:'1px solid #ddd',borderRadius:8,overflow:'hidden'}}>
        <canvas ref={canvasRef} style={{width:'100%',height:160}}></canvas>
      </div>
      <div style={{marginTop:8,display:'flex',gap:8}}>
        <button className='btn primary' onClick={save}>Save Signature</button>
        <button className='btn' onClick={()=>padRef.current.clear()}>Clear</button>
      </div>
    </div>
  )
}
