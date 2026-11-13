const drawings={
 'arrow-up-right':<><path d="M6 18 18 6M6 6h12v12"/></>,
 'arrow-down':<path d="M12 4v16M5 13l7 7 7-7"/>,
 'arrow-up':<path d="M12 20V4M5 11l7-7 7 7"/>,
 'reset':<><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/></>,
 'enter':<path d="M20 5v9H4m5-5-5 5 5 5"/>,
 'expand':<path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5M4 4l6 6m10-6-6 6M4 20l6-6m10 6-6-6"/>,
 'resize':<><path d="m9 20 11-11m-5 11 5-5"/></>,
 'close':<path d="m6 6 12 12M6 18 18 6"/>,
 'plus':<path d="M5 12h14M12 5v14"/>,
 'minus':<path d="M5 12h14"/>,
 'play':<path d="m8 4 12 8-12 8Z"/>,
 'asterisk':<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5"/>,
 'sparkle':<path d="M12 2 15 9l7 3-7 3-3 7-3-7-7-3 7-3Z"/>,
 'star':<path d="m12 2 3 6.4 7 .9-5.1 5 1.3 7L12 18l-6.2 3.3 1.3-7L2 9.3l7-.9Z"/>,
 'flower':<><path d="M12 7C7-2 1 4 7 10c-10-1-9 8 0 7-6 7 2 12 5 4 3 8 11 3 5-4 9 1 10-8 0-7 6-6 0-12-5-3Z"/><circle cx="12" cy="13" r="3"/></>,
 'circle':<circle cx="12" cy="12" r="8"/>,
 'smile':<><circle cx="12" cy="12" r="10"/><path d="M7 14s1.5 4 5 4 5-4 5-4"/><circle cx="8" cy="9" r=".8" fill="currentColor"/><circle cx="16" cy="9" r=".8" fill="currentColor"/></>,
}
export default function UiIcon({name,className='',...props}){
 return <svg className={`ui-icon ${className}`} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>{drawings[name]||drawings['arrow-up-right']}</svg>
}
