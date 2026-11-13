import { useEffect, useRef, useState } from 'react'
import { work } from './content'
import './sample.css'

const projects=[work[0],work[2],work[3],work[1]]
const symbols=['✳','✿','↯','◈']
export default function PortfolioSample({onBack}){
  const [selected,setSelected]=useState(null)
  const detail=useRef(null)
  const [visited,setVisited]=useState([])
  const [score,setScore]=useState(0)
  const [seconds,setSeconds]=useState(0)
  const [target,setTarget]=useState({x:50,y:50})
  const [sound,setSound]=useState(false)
  const [confetti,setConfetti]=useState(false)
  useEffect(()=>{if(seconds<=0)return;const t=setTimeout(()=>setSeconds(s=>s-1),1000);return()=>clearTimeout(t)},[seconds])
  useEffect(()=>{
    if(!selected)return
    const previous=document.activeElement
    const oldOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    detail.current?.querySelector('button')?.focus()
    const close=e=>{
      if(e.key==='Escape')setSelected(null)
      if(e.key==='Tab'){
        const controls=[...detail.current.querySelectorAll('button,a')]
        if(e.shiftKey&&document.activeElement===controls[0]){e.preventDefault();controls.at(-1).focus()}
        if(!e.shiftKey&&document.activeElement===controls.at(-1)){e.preventDefault();controls[0].focus()}
      }
    }
    document.addEventListener('keydown',close)
    return()=>{document.removeEventListener('keydown',close);document.body.style.overflow=oldOverflow;previous?.focus()}
  },[selected])
  function open(p){setSelected(p);setVisited(v=>v.includes(p.id)?v:[...v,p.id])}
  function hit(){setScore(s=>s+1);setTarget({x:15+Math.random()*70,y:22+Math.random()*50})}
  return <div className="quest-site"><a className="quest-skip" href="#quest-main">Skip to projects</a><header className="quest-header"><button className="quest-brand" onClick={()=>{setConfetti(true);setTimeout(()=>setConfetti(false),900)}} aria-label="Celebrate"><span>ST</span><i>✳</i></button><div className="quest-nav"><span className="quest-status"><i/> PLAYER ONE</span><button onClick={()=>setSound(s=>!s)} aria-label={sound?'Stop animation':'Animate mascot'}>{sound?'✳ Stop':'✳ Wiggle'}</button><button onClick={onBack}>Toolkit ↗</button><a href="mailto:tummalasaisrikar@berkeley.edu">Say hello ↗</a></div></header>
  <main id="quest-main"><section className="quest-hero"><div><div className="quest-bubble">Hey, I’m Sai.</div><h1>I make things.<br/><span>Come play.</span><svg className="quest-scribble" viewBox="0 0 480 30" aria-hidden="true"><path d="M5 18 Q160 -2 475 12 M40 27 Q250 10 440 24"/></svg></h1><p>Some code. Some curiosity. A few side quests.</p><a className="quest-primary" href="#quest-projects">Pick a project <span>↓</span></a></div><button className={`quest-mascot ${sound?'is-wiggling':''}`} onClick={()=>{setSound(s=>!s);setConfetti(true);setTimeout(()=>setConfetti(false),900)}} aria-label="Make the mascot dance"><span className="quest-mascot-shape" aria-hidden="true"/><span className="quest-face"><i/><i/><b>⌣</b></span><span className="quest-mascot-note">psst. click me.</span></button><span className="quest-doodle quest-doodle-one" aria-hidden="true">✦</span><span className="quest-doodle quest-doodle-two" aria-hidden="true">↯</span>{confetti&&<div className="quest-confetti" aria-hidden="true">✦ ✳ ✿ ✦ ✳ ✿</div>}</section>
  <section className="quest-playfield" id="quest-projects"><div className="quest-section-title"><h2>Pick your side quest.</h2><span className="quest-progress">{visited.length} / 4 explored <span>{projects.map(p=><i key={p.id} className={visited.includes(p.id)?'is-visited':''}/>)}</span></span></div><div className="quest-grid">{projects.map((p,i)=><button className={`quest-card quest-card-${i}`} key={p.id} onClick={()=>open(p)}><div className="quest-card-top"><span>{['HARDWARE','PRIVACY','MULTIPLAYER','MACHINE LEARNING'][i]}</span><span>{visited.includes(p.id)?'✓':'↗'}</span></div><div className="quest-card-symbol" aria-hidden="true">{symbols[i]}</div><h3>{p.name}</h3><p>{['A pen with a second life.','Rewards. Without the receipts.','Corporate nonsense. Actual fun.','Teaching models about terrain.'][i]}</p><span className="quest-card-cta">Open project <b>↗</b></span></button>)}</div></section>
  <section className="quest-extras"><div className="quest-arcade"><div className="quest-windowbar"><span><i/><i/><i/></span><b>TINY DISTRACTION</b><span>✦</span></div><div className="quest-game"><div className="quest-score"><span>{seconds>0?`${seconds}s`:'Star catcher'}</span><span>✦ {score}</span></div>{seconds>0?<button className="quest-target" style={{left:`${target.x}%`,top:`${target.y}%`}} onClick={hit} aria-label="Catch the star">✦</button>:<div className="quest-game-start"><span aria-hidden="true">✦</span><p>{score?`${score} stars. Nicely done.`:'Got 15 seconds?'}</p><button onClick={()=>{setScore(0);setSeconds(15);setTarget({x:50,y:50})}}>{score?'Play again ↺':'Let’s play →'}</button></div>}<div className="quest-game-floor" aria-hidden="true">✧ · ✧ · ✧ · ✧ · ✧</div></div></div><div className="quest-note"><span className="quest-tape" aria-hidden="true"/><h2>Good problems.<br/>Weird ideas.<br/><em>I’m listening.</em></h2><a href="mailto:tummalasaisrikar@berkeley.edu">Say hello <span>↗</span></a><span className="quest-note-smile" aria-hidden="true">☺</span></div></section>
  <footer className="quest-footer"><span>Made with curiosity & a little chaos.</span><a href="https://github.com/saisrikar8">GitHub ↗</a><button onClick={onBack}>← Back to toolkit</button></footer></main>
  {selected&&<div className="quest-overlay" onClick={()=>setSelected(null)}><section className="quest-project-detail" ref={detail} role="dialog" aria-modal="true" aria-labelledby="quest-detail-title" onClick={e=>e.stopPropagation()}><header className="quest-windowbar"><b>PROJECT UNLOCKED</b><button autoFocus onClick={()=>setSelected(null)} aria-label="Close project">×</button></header><div className="quest-detail-body"><span className="quest-detail-badge">{selected.category}</span><h2 id="quest-detail-title">{selected.name}</h2><p>{selected.summary}</p><div className="quest-tags">{selected.stack.map(s=><span key={s}>{s}</span>)}</div><div className="quest-detail-links"><a className="quest-primary" href={selected.href}>Explore project ↗</a>{selected.demo&&<a href={selected.demo}>Play demo ↗</a>}{selected.repo&&<a href={selected.repo}>Source ↗</a>}</div></div></section></div>}
  </div>
}
