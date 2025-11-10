import React from 'react'
import i18n from 'i18next'

export default function LanguageToggle(){
  return (
    <div style={{display:'flex',gap:6}}>
      <button className='btn' onClick={()=>i18n.changeLanguage('en')}>EN</button>
      <button className='btn' onClick={()=>i18n.changeLanguage('sn')}>SN</button>
    </div>
  )
}
