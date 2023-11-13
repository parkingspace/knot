import Heading from "@tiptap/extension-heading";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default Heading
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this);
    },
  })
  .configure({
    levels: [1, 2, 3],
  });
