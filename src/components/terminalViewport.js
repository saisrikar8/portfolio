export const INLINE_TERMINAL_QUERY='(max-width: 650px), (pointer: coarse)'
export function usesInlineTerminal(){return typeof window!=='undefined'&&window.matchMedia(INLINE_TERMINAL_QUERY).matches}
