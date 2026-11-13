import { useEffect } from 'react'

export function useEntranceReveal(rootRef,orderKey){
 useEffect(()=>{
  const root=rootRef.current
  if(!root||!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return
  const elements=[...root.querySelectorAll('.quest-header, .portfolio-hero > div, .quest-section-title, .research-intro, .research-feature, .experience-card, .project-showcase, .terrain-showcase, .robot-showcase, .quest-extras > *, .quest-footer')].filter(el=>!el.dataset.revealSeen)
  const cleanups=[]
  const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){if(!entry.isIntersecting)continue;const el=entry.target;el.dataset.revealSeen='true';observer.unobserve(el);if(root.classList.contains('portfolio-still'))continue;const finish=e=>{if(e.target!==el)return;el.classList.remove('portfolio-enter');el.removeEventListener('animationend',finish);el.removeEventListener('animationcancel',finish)};el.addEventListener('animationend',finish);el.addEventListener('animationcancel',finish);cleanups.push(()=>{el.removeEventListener('animationend',finish);el.removeEventListener('animationcancel',finish);el.classList.remove('portfolio-enter')});el.classList.add('portfolio-enter')}
  },{threshold:.08,rootMargin:'0px 0px -16px 0px'})
  elements.forEach((el,i)=>{el.style.setProperty('--entrance-delay',`${Math.min(i%3*50,100)}ms`);if(el.classList.contains('hero-terminal-wrap'))el.classList.add('entrance-fade-only');observer.observe(el)})
  return()=>{observer.disconnect();cleanups.forEach(cleanup=>cleanup())}
 },[rootRef,orderKey])
}
