import { useEffect, useState } from 'react'
const defaults={theme:'light',accent:'lavender',grid:true,compact:false,still:false,highlight:''}
const sections={top:'top',research:'research',projects:'projects',experience:'experience',contact:'contact',hermes:'research-hermes',selene:'research-selene',terra:'project-terra',robot:'project-robot',robotics:'project-robot',steady:'project-steady',punchd:'project-punchd',larp:'project-larp'}
const accents={lavender:'#7255b3',mint:'#3d7654',peach:'#ae5339',blue:'#3e6caf'}
function shuffled(values){const next=[...values];for(let i=next.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[next[i],next[j]]=[next[j],next[i]]}if(next.every((v,i)=>v===values[i]))next.push(next.shift());return next}
export function usePageControls(){
 const [settings,setSettings]=useState(defaults)
 const [projectOrder,setProjectOrder]=useState([0,2,3])
 const [researchOrder,setResearchOrder]=useState([0,1])
 const [party,setParty]=useState(0)
 useEffect(()=>{if(!party)return;const t=setTimeout(()=>setParty(0),1600);return()=>clearTimeout(t)},[party])
 function navigate(name){const id=sections[name];const el=id&&document.getElementById(id);if(!el)return false;el.scrollIntoView({behavior:settings.still||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});return true}
 function onCommand(name,args){
  if(name==='go'){if(!args[0]||!navigate(args[0]))return 'Try go research, projects, experience, contact, top, hermes, selene, terra, robot, steady, punchd, or larp.';return `Heading to ${args[0]}.`}
  if(name==='scroll'){
   const value=args[0]||'down';const behavior=settings.still||matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'
   if(value==='top'||value==='bottom'){window.scrollTo({top:value==='top'?0:document.documentElement.scrollHeight,behavior});return `Scrolled to the ${value}.`}
   const amount=/^-?\d+$/.test(value)?Number(value):value==='down'?Math.round(innerHeight*.7):value==='up'?-Math.round(innerHeight*.7):null
   if(amount===null||Math.abs(amount)>10000)return 'Use scroll up, down, top, bottom, or a number from -10000 to 10000.'
   window.scrollBy({top:amount,behavior});return `Scrolled ${amount}px.`
  }
  if(name==='theme'){if(!['light','night'].includes(args[0]))return 'Use theme light or theme night.';setSettings(s=>({...s,theme:args[0]}));return `Theme → ${args[0]}.`}
  if(name==='accent'){if(!accents[args[0]])return 'Pick lavender, mint, peach, or blue.';setSettings(s=>({...s,accent:args[0]}));return `Accent → ${args[0]}.`}
  if(name==='grid'){if(!['on','off'].includes(args[0]))return 'Use grid on or grid off.';setSettings(s=>({...s,grid:args[0]==='on'}));return `Background dots ${args[0]}.`}
  if(name==='layout'){if(!['cozy','compact'].includes(args[0]))return 'Use layout cozy or layout compact.';setSettings(s=>({...s,compact:args[0]==='compact'}));return `Layout → ${args[0]}.`}
  if(name==='motion'){if(!['on','off'].includes(args[0]))return 'Use motion on or motion off.';setSettings(s=>({...s,still:args[0]==='off'}));return `Motion ${args[0]}. Your device’s reduced-motion setting still wins.`}
  if(name==='shuffle'){if(args[0]==='projects'){setProjectOrder(shuffled);return 'Project cards reshuffled.'}if(args[0]==='research'){setResearchOrder(shuffled);return 'Research order swapped.'}return 'Use shuffle projects or shuffle research.'}
  if(name==='spotlight'){if(args[0]==='off'){setSettings(s=>({...s,highlight:''}));return 'Spotlight off.'}if(!['hermes','selene','terra','robot','steady','punchd','larp'].includes(args[0]))return 'Pick hermes, selene, terra, robot, steady, punchd, larp, or off.';setSettings(s=>({...s,highlight:args[0]}));navigate(args[0]);return `${args[0]} gets the spotlight.`}
  if(name==='party'){setParty(Date.now());return 'A tiny celebration. You earned it.'}
  if(name==='reset'){setSettings(defaults);setProjectOrder([0,2,3]);setResearchOrder([0,1]);setParty(0);return 'Page and terminal restored. Nothing here is permanent.'}
  return 'Unknown command. Type help to see what you can do.'
 }
 return {onCommand,projectOrder,researchOrder,party,highlight:settings.highlight,className:`${settings.theme==='night'?'portfolio-night':''} ${!settings.grid?'portfolio-no-grid':''} ${settings.compact?'portfolio-compact':''} ${settings.still?'portfolio-still':''}`,style:{'--portfolio-accent':accents[settings.accent]}}
}
