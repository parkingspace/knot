import Underline from "@tiptap/extension-underline";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Underline.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this);
  },
});
