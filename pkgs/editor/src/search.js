import Doc from 'flexsearch/dist/module/document'

const index = new Doc({
  preset: 'performance',
  tokenize: 'full',
  cache: 100,
  document: {
    index: ['title', 'content'],
  },
})

export default index
