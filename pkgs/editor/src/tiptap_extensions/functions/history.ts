import History from '@tiptap/extension-history'

export default History.configure({
  // The amount of history events that are collected
  // before the oldest events are discarded.
  // Default: 100
  depth: 100,

  // The delay between changes after which
  // a new group should be started (in milliseconds).
  // When changes aren’t adjacent, a new group is always started.
  // Default: 500
  newGroupDelay: 500,
})
