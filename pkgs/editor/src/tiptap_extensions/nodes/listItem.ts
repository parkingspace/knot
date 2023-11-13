import ListItem from "@tiptap/extension-list-item";
import { applyEditorShortcuts } from "../../features/shortcut/editorShortcuts";

export default ListItem
  .extend({
    addKeyboardShortcuts() {
      return applyEditorShortcuts(this);
    },
  });
