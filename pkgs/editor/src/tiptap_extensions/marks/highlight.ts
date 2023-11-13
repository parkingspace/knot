import Highlight from "@tiptap/extension-highlight";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Highlight.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this);
  },
});
