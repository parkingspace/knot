import Focus from "@tiptap/extension-focus";
// The Focus extension adds a CSS class to focused nodes. By default it adds .has-focus, but you can change that.
//
// Note that it’s only a class, the styling is totally up to you. The usage example below has some CSS for that class.

export default Focus.configure({
  //   The class that is applied to the focused element.
  //
  // Default: 'has-focus'
  className: "has-focus",

  // Apply the class to 'all', the 'shallowest' or the 'deepest' node.
  //
  // Default: 'all'
  mode: "all",
});
