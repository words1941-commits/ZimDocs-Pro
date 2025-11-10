import React, { useEffect, useState } from 'react'
import localforage from 'localforage'

export default function FileManager(){
  const [keys, setKeys] = useState([])

  async function load(){
    const k = []
    await localforage.iterate((v,key)=>{ k.push(key) })
    setKeys(k)
  }

  useEffect(()=>{ load() }, [])

  async function clearAll(){ await localforage.clear(); load() }

  return (
    <div>
      <h2>Files & Storage</h2>
      <div className='small'>Saved items: {keys.length}</div>
      <ul>
        {keys.map(k=><li key={k}>{k}</li>)}
      </ul>
      <div style={{marginTop:8}}><button className='btn' onClick={clearAll}>Clear All</button></div>
    </div>
  )
}
