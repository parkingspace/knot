export const META = 'Meta'
export const CTRL = 'Control'
export const MOD = 'Mod'
export const SHIFT = 'Shift'
export const ALT = 'Alt'
export const MOD_SHIFT = `${MOD}-${SHIFT}`
export const MOD_ALT = `${MOD}-${ALT}`

export const USER_OS = navigator.userAgent.includes('Macintosh')
  ? 'mac'
  : 'windows'
export const OSMOD = USER_OS === 'mac' ? META : CTRL
export const OSMOD_SHIFT = `${OSMOD}+${SHIFT}`
export const SHIFT_OSMOD = `${SHIFT}+${OSMOD}`
export const OSMOD_ALT = `${OSMOD}+${ALT}`
export const ALT_OSMOD = `${ALT}+${OSMOD}`
