import { style } from '@vanilla-extract/css'

export const container = style({
  boxSizing: 'border-box',
  height: 'fit-content',
  minHeight: '100%',
  padding: '2rem',
  margin: 0,
  background: 'rgba(0, 0, 0, 1)',
})

export const flexContainer = style({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  margin: 0,
  background: 'rgba(10, 0, 20, 1)',
})
