export const commandHelp={
 help:'help [command]\nShow the full guide, or help for one command.\nExamples: help go · help move · help theme\nYou can also use: theme --help',
 go:'go <destination>\nJump to a section or project; the terminal stays on screen.\n\nSections: research, projects, experience, contact, top\nProjects: hermes, selene, terra, robot, steady, punchd, larp\n\nExamples: go research · go selene · go contact',
 scroll:'scroll <up | down | top | bottom | pixels>\nScroll the page. A positive number goes down; negative goes up.\nNumeric range: -10000 to 10000. Default: down.\nExamples: scroll down · scroll -300 · scroll bottom',
 dock:'dock <left | right>\nPin the terminal near a bottom corner. It stays visible while scrolling.\nExamples: dock left · dock right\nUse home to return it to the hero.',
 home:'home\nReturn the terminal to its original position and size, and return to the top of the page. Page colors and card order stay as they are.\nUse reset to restore everything.',
 move:'move <left | right | up | down> [pixels]\nMove the terminal. Default distance: 80px. Distance range: 0–2000.\n\nmove <x> <y>\nPlace it at screen coordinates. Positions are kept inside the viewport.\n\nExamples: move left · move right 100 · move 40 120',
 size:'size <small | medium | large>\nResize the terminal, limited to the available screen space.\nSmall: 340×260 · medium: 430×320 · large: 560×430.\nExample: size large\nYou can also drag the bottom corner or use arrow keys on its resize handle.',
 minimize:'minimize\nCollapse the terminal to its title bar. Click + to expand it.\nThe backtick key outside an input also brings it back.',
 theme:'theme <light | night>\nSwitch the page background and text colors.\nExamples: theme night · theme light',
 accent:'accent <lavender | mint | peach | blue>\nChange the hero text and spotlight color.\nExamples: accent mint · accent lavender',
 grid:'grid <on | off>\nShow or hide the background dots.\nExamples: grid off · grid on',
 layout:'layout <cozy | compact>\nChange the spacing between sections and inside cards.\nExamples: layout compact · layout cozy',
 motion:'motion <on | off>\nEnable or disable page animations and transitions. Your device’s reduced-motion preference always takes priority.\nExamples: motion off · motion on',
 shuffle:'shuffle <projects | research>\nReorder project cards, or swap HERMES and SELENE. Content and links stay with their cards.\nExamples: shuffle projects · shuffle research\nUse reset to restore the original order.',
 spotlight:'spotlight <project | off>\nHighlight a project and navigate to it.\nProjects: hermes, selene, terra, robot, steady, punchd, larp.\nExamples: spotlight hermes · spotlight off',
 party:'party\nShow a brief confetti effect. It respects motion off and your device’s reduced-motion preference.',
 whoami:'whoami\nShow a short introduction to Sai Srikar Tummala.',
 ls:'ls\nList the sections and projects you can visit with go.',
 email:'email\nShow the contact email address. This does not open an email app or send anything.',
 history:'history\nShow the last 50 commands in this session.\nUse ↑ and ↓ to recall commands while typing.',
 clear:'clear\nClear terminal output. Command history and page settings stay unchanged.\nCtrl+L in the input also clears output.',
 reset:'reset\nRestore the original theme, accent, dots, spacing, motion, project order, and spotlight. Return the terminal and viewport to the hero.\nCommand history is kept.',
}
const navigationAliases=['research','projects','experience','contact','top']
export function getCommandHelp(topic){
 const key=topic.trim().toLowerCase().split(/\s+/)[0]
 if(navigationAliases.includes(key))return `${key}\nShortcut for go ${key}.\n\n${commandHelp.go}`
 return Object.hasOwn(commandHelp,key)?commandHelp[key]:`No help for “${key}”. Type help to list commands.`
}
export const helpCompletions=[...Object.keys(commandHelp),...navigationAliases].map(name=>`help ${name}`)
