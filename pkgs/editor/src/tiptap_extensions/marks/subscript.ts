import Subscript from "@tiptap/extension-subscript";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Subscript.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this);
  },
});
