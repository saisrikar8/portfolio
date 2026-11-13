import UiIcon from './UiIcon'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'

export default function EmailContact({open,onClose}){
 const dialog=useRef(null),address=useRef(null)
 const [status,setStatus]=useState('')
 useEffect(()=>{const el=dialog.current;if(open&&!el.open){setStatus('');el.showModal()}else if(!open&&el.open)el.close()},[open])
 async function copy(){try{await navigator.clipboard.writeText(profile.email);setStatus('Email address copied.')}catch{address.current?.focus();address.current?.select();setStatus('Address selected. Press Ctrl+C or ⌘C to copy.')}}
 return <dialog className="email-contact" ref={dialog} onClose={onClose} onClick={e=>{if(e.target===dialog.current)dialog.current.close()}} aria-labelledby="email-contact-title"><div className="email-contact-inner"><button className="email-contact-close" onClick={()=>dialog.current.close()} aria-label="Close contact options"><UiIcon name="close"/></button><h2 id="email-contact-title">Say hello.</h2><p>Choose how you’d like to email me.</p><label className="sr-only" htmlFor="contact-email-address">Email address</label><input id="contact-email-address" ref={address} value={profile.email} readOnly onFocus={e=>e.currentTarget.select()}/><div className="email-contact-actions"><a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}`} target="_blank" rel="noopener noreferrer">Open Gmail <UiIcon name="arrow-up-right"/></a><a href={`mailto:${profile.email}`}>Use mail app <UiIcon name="arrow-up-right"/></a><button onClick={copy}>Copy email</button></div><p className="email-contact-status" role="status">{status||'No mail app set up? Open Gmail or copy the address.'}</p></div></dialog>
}
