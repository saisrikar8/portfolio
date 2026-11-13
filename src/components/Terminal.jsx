import { useEffect, useRef, useState } from 'react'
import { getCommandHelp, helpCompletions } from './terminalHelp'

const intro='just another ML enthusiast following the stars'
const commands=[...helpCompletions,'help','whoami','ls','go research','go projects','go experience','go contact','go top','go hermes','go selene','go terra','go robot','go steady','go punchd','go larp','scroll up','scroll down','scroll top','scroll bottom','dock left','dock right','home','move left','move right','move up','move down','size small','size medium','size large','theme light','theme night','accent lavender','accent mint','accent peach','accent blue','grid on','grid off','layout cozy','layout compact','motion on','motion off','shuffle projects','shuffle research','spotlight hermes','spotlight selene','spotlight terra','spotlight robot','spotlight steady','spotlight punchd','spotlight larp','spotlight off','party','reset','clear','history','email','minimize']
const help=`Navigation\n  go <destination> — jump to a section or project\n  Example: go selene\n  Sections: research / projects / experience / contact / top\n  Projects: hermes / selene / terra / robot / steady / punchd / larp\n  help <command> — usage and examples for any command\n  scroll up / down / top / bottom / 300\n\nMove this window\n  dock left / right   ·   home\n  move left / right / up / down [pixels]\n  move 100 150   ·   size small / medium / large\n  minimize\n\nChange the page\n  theme light / night\n  accent lavender / mint / peach / blue\n  grid on / off   ·   layout cozy / compact\n  motion on / off\n  shuffle projects / research\n  spotlight hermes / selene / terra / robot / steady / punchd / larp / off\n  party\n\nUtilities\n  whoami · ls · email · history · clear · reset\n\n↑ ↓ command history · Tab autocomplete · Escape unfocus\nPress the backtick key outside an input to bring me back.`
const sizes={small:{width:340,height:260},medium:{width:430,height:320},large:{width:560,height:430}}
export default function Terminal({onPageCommand}){
 const [typed,setTyped]=useState('')
 const [command,setCommand]=useState('')
 const [lines,setLines]=useState([])
 const [minimized,setMinimized]=useState(false)
 const [position,setPosition]=useState(null)
 const [size,setSize]=useState(null)
 const [history,setHistory]=useState([])
 const [suggestions,setSuggestions]=useState('')
 const box=useRef(null),input=useRef(null),body=useRef(null),drag=useRef(null),cursor=useRef(-1),draft=useRef(''),resizeDrag=useRef(null)
 const geometry=useRef({position,size});geometry.current={position,size}
 function clamp(x,y,width,height){return {x:Math.max(10,Math.min(innerWidth-width-10,x)),y:Math.max(10,Math.min(innerHeight-height-10,y))}}
 function floatAt(x,y,nextSize){const rect=box.current.getBoundingClientRect();const width=Math.min(nextSize?.width||rect.width,innerWidth-20);const height=Math.min(nextSize?.height||rect.height,innerHeight-20);setSize({width,height});setPosition(clamp(x,y,width,height));setMinimized(false)}
 function dock(side='right'){const width=Math.min(size?.width||430,innerWidth-20),height=Math.min(size?.height||320,innerHeight-20);floatAt(side==='left'?16:innerWidth-width-16,innerHeight-height-16,{width,height})}
 function resetTerminal(){window.scrollTo({top:0,behavior:'instant'});setPosition(null);setSize(null);setMinimized(false);if(box.current){box.current.style.width='';box.current.style.height=''}}
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion: reduce)').matches){setTyped(intro);return}let i=0;const t=setInterval(()=>{setTyped(intro.slice(0,++i));if(i>=intro.length)clearInterval(t)},35);return()=>clearInterval(t)},[])
 useEffect(()=>{function resize(){const g=geometry.current;if(!g.position)return;const width=Math.min(g.size?.width||430,innerWidth-20),height=Math.min(g.size?.height||320,innerHeight-20);setSize({width,height});setPosition(clamp(g.position.x,g.position.y,width,height))}window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)},[])
 useEffect(()=>{function shortcut(e){if(e.key!=='`'||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable=true]')||document.querySelector('dialog[open]'))return;e.preventDefault();dock();requestAnimationFrame(()=>input.current?.focus({preventScroll:true}))}window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut)},[size])
 useEffect(()=>{const el=body.current;if(!el)return;const latest=lines.at(-1);if(!suggestions&&(latest?.command.trim().toLowerCase().startsWith('help')||/\s(?:--help|help)$/.test(latest?.command.trim().toLowerCase()||''))){const entry=el.querySelector('.cartoon-terminal-entry:last-of-type');if(entry){el.scrollTop+=entry.getBoundingClientRect().top-el.getBoundingClientRect().top-10;return}}el.scrollTop=el.scrollHeight},[lines,suggestions])
 function execute(raw){
  const c=raw.trim().toLowerCase(),[name,...args]=c.split(/\s+/)
  if(name==='help')return args.length?getCommandHelp(args[0]==='--help'?'help':args.join(' ')):help
  if(args[0]==='--help'||args[0]==='help')return getCommandHelp(name)
  if(name==='whoami')return 'Sai Srikar Tummala · Data Science, UC Berkeley. A few ideas became this page.'
  if(name==='ls')return 'research · projects · experience · contact\nGo deeper: hermes · selene · terra · robot · steady · punchd · larp'
  if(name==='email')return 'tummalasaisrikar@berkeley.edu'
  if(name==='history')return [...history,c].map((v,i)=>`${i+1}. ${v}`).join('\n')
  if(name==='clear'){setLines([]);return null}
  if(name==='home'){resetTerminal();return 'Back in my original spot.'}
  if(name==='reset'){resetTerminal();return onPageCommand?.('reset',[])||'Terminal reset.'}
  if(name==='minimize'){setMinimized(true);return 'Minimized. Use + to open me again.'}
  if(name==='dock'){if(!['left','right'].includes(args[0]))return 'Use dock left or dock right.';dock(args[0]);return `Docked ${args[0]}. I’ll stay with you while you scroll.`}
  if(name==='move'){
   const rect=box.current.getBoundingClientRect();const directions={left:[-1,0],right:[1,0],up:[0,-1],down:[0,1]}
   if(directions[args[0]]){const pixels=args[1]===undefined?80:Number(args[1]);if(!Number.isFinite(pixels)||pixels<0||pixels>2000)return 'Use move right 80, with a distance from 0 to 2000.';const [dx,dy]=directions[args[0]];floatAt(rect.left+dx*pixels,rect.top+dy*pixels);return `Moved ${args[0]} ${pixels}px (kept on screen).`}
   if(args.length===2&&args.every(v=>Number.isFinite(Number(v)))){floatAt(Number(args[0]),Number(args[1]));return 'Moved to those screen coordinates, within the viewport.'}return 'Use move left/right/up/down [pixels], or move 100 150.'
  }
  if(name==='size'){if(!sizes[args[0]])return 'Use size small, medium, or large.';const next=sizes[args[0]],rect=box.current.getBoundingClientRect();floatAt(rect.left,rect.top,next);return `Terminal size → ${args[0]}.`}
  if(['go','scroll','spotlight'].includes(name)&&!(name==='spotlight'&&args[0]==='off'))dock()
  if(['research','projects','experience','contact','top'].includes(name)){dock();return onPageCommand?.('go',[name])||'Navigation unavailable here.'}
  return onPageCommand?.(name,args)||'Unknown command. Try help.'
 }
 function run(e){e.preventDefault();const raw=command.trim();if(!raw)return;const answer=execute(raw);if(answer!==null)setLines(l=>[...l,{command:raw,answer}].slice(-35));setHistory(h=>[...h,raw].slice(-50));setCommand('');setSuggestions('');cursor.current=-1;draft.current='';requestAnimationFrame(()=>input.current?.focus({preventScroll:true}))}
 function keys(e){
  if(e.key==='ArrowUp'||e.key==='ArrowDown'){if(!history.length)return;e.preventDefault();if(cursor.current===-1)draft.current=command;cursor.current=e.key==='ArrowUp'?Math.min(history.length-1,cursor.current+1):Math.max(-1,cursor.current-1);setCommand(cursor.current===-1?draft.current:history[history.length-1-cursor.current]);setSuggestions('')}
  if(e.key==='Tab'&&command.trim()){const matches=commands.filter(c=>c.startsWith(command.toLowerCase()));if(matches.length){e.preventDefault();if(matches.length===1){setCommand(matches[0]);setSuggestions('')}else{let common=matches[0];while(!matches.every(m=>m.startsWith(common)))common=common.slice(0,-1);if(common.length>command.length)setCommand(common);setSuggestions(matches.join('  ·  '))}}}
  if(e.key==='Escape'){setSuggestions('');e.currentTarget.blur()}
  if(e.ctrlKey&&e.key.toLowerCase()==='l'){e.preventDefault();setLines([]);setSuggestions('')}
 }
 const floating=position!==null
 const style={...(floating?{position:'fixed',left:position.x,top:position.y,maxWidth:'calc(100vw - 20px)',maxHeight:'calc(100dvh - 20px)',zIndex:60}:{}),...(size?{width:size.width,...(!minimized?{height:size.height}:{})}:{})}
 return <section ref={box} className={`cartoon-terminal ${minimized?'is-minimized':''} ${floating?'is-floating':''}`} style={style} aria-label="Interactive terminal"><div className="cartoon-terminal-title" onPointerDown={e=>{if(e.target.closest('button'))return;const rect=box.current.getBoundingClientRect();const keepMinimized=minimized;floatAt(rect.left,rect.top);setMinimized(keepMinimized);drag.current={x:e.clientX-rect.left,y:e.clientY-rect.top};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!drag.current)return;const rect=box.current.getBoundingClientRect();setPosition(clamp(e.clientX-drag.current.x,e.clientY-drag.current.y,rect.width,rect.height))}} onPointerUp={()=>{drag.current=null}} onPointerCancel={()=>{drag.current=null}}><div className="cartoon-terminal-dots" aria-hidden="true"><i/><i/><i/></div><span>sai@berkeley {floating&&<small>· roaming</small>}</span><div><button onClick={resetTerminal} aria-label="Reset terminal position and size">↺</button><button onClick={()=>setMinimized(m=>!m)} aria-label={minimized?'Expand terminal':'Minimize terminal'}>{minimized?'+':'−'}</button></div></div>{!minimized&&<div className="cartoon-terminal-body" ref={body}><p className="cartoon-terminal-command"><span>$</span> whoami</p><p className="cartoon-terminal-intro">{typed}<span className="cartoon-terminal-caret" aria-hidden="true"/></p><p className="cartoon-terminal-hint">Type help. ↑ history · Tab autocomplete</p>{lines.map((l,i)=><div className="cartoon-terminal-entry" key={i}><p className="cartoon-terminal-command"><span>$</span> {l.command}</p><p>{l.answer}</p></div>)}{suggestions&&<p className="cartoon-terminal-suggestions">{suggestions}</p>}<form onSubmit={run}><label htmlFor="terminal-command">$<span className="sr-only">Terminal command</span></label><input id="terminal-command" ref={input} autoComplete="off" autoCapitalize="off" spellCheck="false" value={command} onChange={e=>{setCommand(e.target.value);setSuggestions('');cursor.current=-1}} onKeyDown={keys} placeholder="help"/><button type="submit" aria-label="Run terminal command">↵</button></form></div>}{!minimized&&<button className="cartoon-terminal-resize" aria-label="Resize terminal" title="Drag to resize; arrow keys also work" onPointerDown={e=>{e.preventDefault();const r=box.current.getBoundingClientRect();resizeDrag.current={x:e.clientX,y:e.clientY,width:r.width,height:r.height,left:r.left,top:r.top};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(!resizeDrag.current)return;const r=resizeDrag.current;floatAt(r.left,r.top,{width:Math.max(280,Math.min(720,r.width+e.clientX-r.x)),height:Math.max(180,Math.min(560,r.height+e.clientY-r.y))})}} onPointerUp={()=>{resizeDrag.current=null}} onPointerCancel={()=>{resizeDrag.current=null}} onKeyDown={e=>{const d={ArrowRight:[20,0],ArrowLeft:[-20,0],ArrowDown:[0,20],ArrowUp:[0,-20]}[e.key];if(!d)return;e.preventDefault();const r=box.current.getBoundingClientRect();floatAt(r.left,r.top,{width:Math.max(280,Math.min(720,r.width+d[0])),height:Math.max(180,Math.min(560,r.height+d[1]))})}}>⌟</button>}</section>
}
