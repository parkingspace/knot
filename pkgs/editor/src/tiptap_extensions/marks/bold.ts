import Bold from "@tiptap/extension-bold";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Bold.extend({
  addKeyboardShortcuts() {
    return applyEditorShortcuts(this);
  },
});
