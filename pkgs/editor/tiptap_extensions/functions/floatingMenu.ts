import FloatingMenu from '@tiptap/extension-floating-menu'

// #tippyOptions
// Under the hood, the FloatingMenu uses tippy.js. You can directly pass options to it.
//
// Type: Object
//
// Default: {}
//
// #pluginKey
// The key for the underlying ProseMirror plugin. Make sure to use different keys if you add more than one instance.
//
// Type: string | PluginKey
//
// Default: 'floatingMenu'
//
// #shouldShow
// A callback to control whether the menu should be shown or not.
//
// Type: (props) => boolean

export default FloatingMenu.configure({
  // The DOM element that contains your menu.
  // Type: HTMLElement
  // Default: null
  element: document.querySelector('.floating-menu') as HTMLElement,
})
