export function ProjectVisual({ kind = 'steady', large = false }) {
  return <div className={`dt-visual dt-visual-${kind} ${large ? 'dt-large' : ''}`} role="img" aria-label={`${kind === 'steady' ? 'Magnetic stylus tracking' : kind === 'terra' ? 'Terrain contour' : kind === 'punchd' ? 'Private loyalty card' : kind === 'larp' ? 'Shared-screen party game' : 'Robot trajectory'} concept illustration`}>
    <span className="dt-visual-label">{kind === 'steady' ? '01 / MOTION → MEANING' : kind === 'terra' ? '02 / LEARNING THE LANDSCAPE' : kind === 'punchd' ? '03 / PROVE. DON’T REVEAL.' : kind === 'larp' ? '04 / ORDINARY → EXTRAORDINARY' : '05 / PLAN → PLAYBACK'}</span>
    {kind === 'punchd' ? <div className="dt-loyalty"><span>PUNCHD <small>PRIVATE BY DESIGN</small></span><div>{Array.from({length:10},(_,i)=><i key={i}>{i < 7 ? '✳' : '·'}</i>)}</div><b>Your next coffee.<br/>Your business.</b></div>
      : kind === 'larp' ? <div className="dt-game"><b>Career update.</b><p>Led a critical<br/>logistics operation.</p><span>I took out the trash. ↗</span></div>
      : <svg viewBox="0 0 600 310" aria-hidden="true">
        {kind === 'terra' ? Array.from({length:16},(_,i)=><path key={i} d={`M ${-100+i*5} ${300-i*12} C 80 ${-80+i*8}, 170 ${370-i*15}, 290 ${140-i*9} S 430 ${-40+i*17}, 730 ${230-i*6}`} />) : <>
          {Array.from({length:7},(_,i)=><ellipse key={i} cx="300" cy="185" rx={70+i*28} ry={22+i*10} />)}
          <path className="dt-trajectory" d="M95 230 C150 220 170 100 240 145 S350 260 410 145 S480 90 525 115" />
          <circle cx="240" cy="145" r="8" className="dt-point" />
          {kind === 'steady' && <><path className="dt-stylus" d="M300 165 L390 28"/><circle cx="300" cy="165" r="6" className="dt-point" /></>}
        </>}
      </svg>}
    <span className="dt-visual-foot">CONCEPT STUDY <span>↗</span></span>
  </div>
}
