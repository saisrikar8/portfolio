import { useEffect, useRef, useState } from 'react'
import './playground.css'
import PortfolioSample from './PortfolioSample'

const initial = [
  { x: 21, y: 28, title: 'MAKE', type: 'word' },
  { x: 71, y: 22, title: '✳', type: 'star' },
  { x: 46, y: 59, title: 'SOMETHING', type: 'word' },
  { x: 80, y: 69, title: 'MOVE ↗', type: 'pill' },
  { x: 16, y: 76, title: '↗', type: 'arrow' },
]
export default function Playground({ onEditorial }) {
  const [tab, setTab] = useState('Sample website')
  const [theme, setTheme] = useState('acid')
  const [nodes, setNodes] = useState(initial)
  const [text, setText] = useState('Less expected.')
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [time, setTime] = useState(0)
  useEffect(() => { document.title = 'Playful Systems — Portfolio Toolkit' }, [])
  const stage = useRef(null)
  const drag = useRef(null)
  useEffect(() => {
    if (!playing) return
    let frame, previous = 0
    const run = now => { if(now - previous > 35) {setTime(t=>t+.025); previous=now} frame=requestAnimationFrame(run) }
    frame=requestAnimationFrame(run)
    return ()=>cancelAnimationFrame(frame)
  },[playing])
  function move(e) {
    if(drag.current===null) return
    const r=stage.current.getBoundingClientRect()
    const x=Math.max(10,Math.min(90,(e.clientX-r.left)/r.width*100))
    const y=Math.max(15,Math.min(85,(e.clientY-r.top)/r.height*100))
    setNodes(n=>n.map((v,i)=>i===drag.current?{...v,x,y}:v))
  }
  if (tab === 'Sample website') return <PortfolioSample onBack={()=>setTab('Playground')}/>
  return <div className={`pg pg-${theme}`}>
    <a className="pg-skip" href="#pg-main">Skip to playground</a>
    <header className="pg-top"><a href="#" className="pg-logo" onClick={e=>{e.preventDefault();setTab('Playground')}}>s<span>✳</span>t / lab</a><button onClick={()=>setTab('Sample website')}>Preview website ↗</button></header>
    <div className="pg-layout"><aside className="pg-sidebar"><div><h1>Built<br/>to be<br/><em>played.</em></h1></div><nav aria-label="Interactive toolkit views">{['Playground','Components','Page layouts','Sample website'].map((t,i)=><button key={t} onClick={()=>setTab(t)} aria-current={tab===t?'page':undefined}>{t}<b>↗</b></button>)}</nav><div className="pg-theme"><p className="pg-label">Palette</p><div>{['acid','cobalt','coral'].map(t=><button key={t} className={`pg-swatch pg-swatch-${t}`} onClick={()=>setTheme(t)} aria-label={`${t} color palette`} aria-pressed={theme===t}>{theme===t?'✓':''}</button>)}</div></div></aside>
    <main id="pg-main">
      {tab==='Playground' ? <><div className="pg-section-top"><div><button onClick={()=>setPlaying(v=>!v)}>{playing?'Pause Ⅱ':'Play ▷'}</button><button onClick={()=>setNodes(initial)}>Reset ↺</button></div></div><section className="pg-stage" ref={stage} onPointerMove={move} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}} aria-label="Draggable typography canvas"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{nodes.map((n,i)=><line key={i} x1={n.x} y1={n.y} x2={nodes[(i+1)%nodes.length].x} y2={nodes[(i+1)%nodes.length].y}/>)}</svg><div className="pg-cross pg-cross-one">+</div><div className="pg-cross pg-cross-two">+</div>{nodes.map((n,i)=><button key={i} className={`pg-node pg-node-${n.type}`} style={{left:`${n.x}%`,top:`${n.y}%`,transform:`translate(-50%,-50%) rotate(${n.type==='star'?time*20:Math.sin(time+i)*3}deg)`}} onPointerDown={e=>{drag.current=i;e.currentTarget.setPointerCapture(e.pointerId)}} onKeyDown={e=>{const delta={ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]}[e.key];if(delta){e.preventDefault();setNodes(v=>v.map((p,j)=>i===j?{...p,x:Math.max(10,Math.min(90,p.x+delta[0])),y:Math.max(15,Math.min(85,p.y+delta[1]))}:p))}}} aria-label={`${n.title}, drag or use arrow keys to move`}>{n.title}</button>)}<span className="pg-stage-note">DRAG TO PLAY</span></section><div className="pg-ticker"><span>PLAY. MAKE. REPEAT. ✳</span></div><section className="pg-bottom"><h2>Your move.</h2><button className="pg-round" onClick={()=>setTab('Components')} aria-label="Explore interactive components">↗</button></section></>
      : tab==='Components' ? <><h1 className="pg-page-title"><em>Try things.</em></h1><div className="pg-component-grid"><section className="pg-type-spec"><label htmlFor="pg-type">Your words</label><input id="pg-type" value={text} maxLength={36} onChange={e=>setText(e.target.value)}/><p className="pg-type-output">{text||'Your words here.'}</p></section><section className="pg-orbit-spec"><button className="pg-orbit" onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Pause orbit':'Start orbit'}><span style={{transform:`rotate(${time*30}deg)`}}>✳</span><b>{playing?'STOP':'PLAY'}</b></button></section><section className="pg-card-spec">{['The artifact','The engineering','The outcome'].map((s,i)=><div className="pg-accordion" key={s}><button onClick={()=>setActive(active===i?-1:i)} aria-expanded={active===i}>{s}<span>{active===i?'−':'+'}</span></button>{active===i&&<p>{['Show what you built.','One decision. One tradeoff. The code.','The result, with context.'][i]}</p>}</div>)}</section><section className="pg-button-spec"><button onClick={()=>setTab('Page layouts')}>Explore <span>↗</span></button></section></div></>
      : <><h1 className="pg-page-title"><em>The layouts.</em></h1><div className="pg-layout-cards">{['The project wall','Inside the experiment','The personal index'].map((s,i)=><button key={s} className={`pg-layout-card ${active===i?'is-active':''}`} onClick={()=>setActive(i)} aria-pressed={active===i}><span>{['HOME','CASE STUDY','ABOUT'][i]}</span><div className={`pg-mini pg-mini-${i}`} aria-hidden="true">{i===0?<><b>HELLO,<br/>WORLD.</b><i>✳</i><div/><div/></>:i===1?<><b>PROJECT<br/>TITLE ↗</b><div/><p>THE WHY → THE HOW → THE RESULT</p></>:<><b>A FEW<br/>THINGS<br/>ABOUT ME.</b><i>☺</i></>}</div><h2>{s} ↗</h2></button>)}</div><div className="pg-layout-description" aria-live="polite"><h2>{['Project wall.','Inside the project.','Personal index.'][Math.max(0,active)]}</h2><p>{['An open canvas. Projects worth opening.','Artifact → decisions → results.','A few details. A way to connect.'][Math.max(0,active)]}</p></div></>}
    </main></div><footer className="pg-footer"><span>PLAYFUL SYSTEMS</span><button onClick={()=>setTab('Sample website')}>Preview website ↗</button></footer>
  </div>
}
