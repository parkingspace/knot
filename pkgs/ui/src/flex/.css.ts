import { style } from '@vanilla-extract/css'

const flex = style({
  boxSizing: 'border-box',
  display: 'flex',
  width: '100%',
  minHeight: '100%',
  padding: '2rem',
  margin: 0,
  background: 'rgba(0, 0, 0, 1)',
})

export default flex
