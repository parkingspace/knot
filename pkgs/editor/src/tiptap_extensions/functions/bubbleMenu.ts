import BubbleMenu from "@tiptap/extension-bubble-menu";

export default BubbleMenu.configure({
  // The DOM element that contains your menu.
  // Default: null
  element: document.querySelector(".bubble-menu") as HTMLElement,

  // The BubbleMenu debounces the update method to allow the bubble menu
  // to not be updated on every selection update.
  // This can be controlled in milliseconds.
  // The BubbleMenuPlugin will come with a default delay of 250ms.
  // This can be deactivated, by setting the delay to 0
  // which deactivates the debounce.
  // Default: undefined
  updateDelay: undefined,

  // Under the hood, the BubbleMenu uses tippy.js. You can directly pass options to it.
  // Default: {}
  tippyOptions: {},

  // The key for the underlying ProseMirror plugin.
  // Make sure to use different keys if you add more than one instance.
  // Default: 'bubbleMenu'
  pluginKey: "bubbleMenu",
});
