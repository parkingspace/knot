import CharacterCount from '@tiptap/extension-character-count'

export default CharacterCount.configure({
  // The maximum number of characters that should be allowed.
  //
  // Default: null
  // possible values: null, number
  limit: null,

  // The mode by which the size is calculated.
  //
  // Default: 'textSize'
  // Possible values: 'nodeSize', 'textSize'
  mode: 'textSize',
})
