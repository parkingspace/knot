// TODO: add proper declaration file for document
// @ts-ignore
import Doc from 'flexsearch/dist/module/document'

const document = new Doc({
  preset: 'performance',
  tokenize: 'full',
  cache: 100,
  document: {
    index: ['title', 'content'],
  },
})

export default document
