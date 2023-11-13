import Superscript from "@tiptap/extension-superscript";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Superscript.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this);
  },
});
