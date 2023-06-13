export const META = 'Meta' as const
export const CTRL = 'Control' as const
export const MOD = 'Mod' as const
export const SHIFT = 'Shift' as const
export const ALT = 'Alt' as const
export const MOD_SHIFT = `${MOD}-${SHIFT}` as const
export const MOD_ALT = `${MOD}-${ALT}` as const
export const USER_OS = navigator.userAgent.includes('Macintosh')
  ? 'mac'
  : 'windows'
export const OSMOD_NAME = USER_OS === 'mac' ? '⌘' : 'Ctrl'
export const OSMOD = USER_OS === 'mac' ? META : CTRL
export const OSMOD_SHIFT = `${OSMOD}+${SHIFT}` as const
export const SHIFT_OSMOD = `${SHIFT}+${OSMOD}` as const
export const OSMOD_ALT = `${OSMOD}+${ALT}` as const
export const ALT_OSMOD = `${ALT}+${OSMOD}` as const
