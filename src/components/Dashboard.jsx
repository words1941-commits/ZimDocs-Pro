import React from 'react'

export default function Dashboard(){ 
  return (
    <div>
      <h2>Welcome to ZimDocs Pro</h2>
      <p className='small'>Create professional resumes, convert photos to passport sizes, sign documents and manage files — all offline.</p>

      <section style={{marginTop:14}}>
        <h3>Templates</h3>
        <div style={{display:'flex',gap:12,marginTop:8,flexWrap:'wrap'}}>
          <div style={{width:160}} className='card'>
            <div style={{fontWeight:700}}>Modern</div>
            <div className='small'>Clean layout, great for tech jobs.</div>
          </div>
          <div style={{width:160}} className='card'>
            <div style={{fontWeight:700}}>Classic</div>
            <div className='small'>Traditional CV format.</div>
          </div>
        </div>
      </section>
    </div>
  )
}
