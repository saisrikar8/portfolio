import UiIcon from './UiIcon'
import { useRef, useState } from 'react'
export default function MediaGallery({items, title, video}){
  const [index,setIndex]=useState(0)
  const [watch,setWatch]=useState(false)
  const dialog=useRef(null)
  const item=items[index]
  return <div className="media-gallery"><div className="media-display">{watch&&video?<iframe src={`https://www.youtube-nocookie.com/embed/${video}`} title={`${title} project demo`} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>:<button onClick={()=>dialog.current.showModal()} aria-label={`Enlarge ${item.caption}`}><img src={item.src} alt={item.caption} loading="lazy" decoding="async"/><span className="media-zoom" aria-hidden="true"><UiIcon name="expand"/></span></button>}</div><div className="media-caption"><span>{watch?'Project demo':item.caption}</span>{video&&<button onClick={()=>setWatch(w=>!w)}>{watch?'Screenshots':<>Watch demo <UiIcon name="play"/></>}</button>}</div><div className="media-thumbnails" aria-label={`${title} gallery`}>{items.map((m,i)=><button key={m.src} onClick={()=>{setIndex(i);setWatch(false)}} aria-label={`Show ${m.caption}`} aria-pressed={i===index&&!watch}><img src={m.src} alt="" loading="lazy" decoding="async"/></button>)}</div><dialog className="media-lightbox" ref={dialog} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}}><div><button className="media-close" onClick={()=>dialog.current.close()} aria-label="Close enlarged image"><UiIcon name="close"/></button><img src={item.src} alt={item.caption}/><p>{item.caption}</p>{item.href&&<a href={item.href}>Original source <UiIcon name="arrow-up-right"/></a>}</div></dialog></div>
}
