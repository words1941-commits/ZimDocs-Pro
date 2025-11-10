// convert uploaded image into passport-size data URL
export function mmToPx(mm,dpi=300){ const inches = mm/25.4; return Math.round(inches*dpi) }

export async function toPassportPhoto(file, opts={widthMm:35,heightMm:45,dpi:300}){
  const {widthMm,heightMm,dpi} = opts
  const img = await loadImage(file)
  const w = mmToPx(widthMm,dpi)
  const h = mmToPx(heightMm,dpi)
  const canvas = document.createElement('canvas')
  canvas.width = w; canvas.height = h
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,w,h)
  const scale = Math.max(w/img.width, h/img.height)
  const sw = img.width*scale, sh = img.height*scale
  const sx = (w-sw)/2, sy = (h-sh)/2
  ctx.drawImage(img, sx, sy, sw, sh)
  return canvas.toDataURL('image/png')
}

function loadImage(file){ return new Promise((resolve,reject)=>{ const url = URL.createObjectURL(file); const img = new Image(); img.onload = ()=>{ URL.revokeObjectURL(url); resolve(img) }; img.onerror = reject; img.src = url }) }
