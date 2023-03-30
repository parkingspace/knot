import 'prosemirror-view/style/prosemirror.css';

import { Accessor, Component, onMount } from 'solid-js';
import { createSignal } from 'solid-js';

import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { schema } from 'prosemirror-markdown';
import { Fragment, Node, Schema } from 'prosemirror-model';
import { EditorState, Selection, Transaction } from 'prosemirror-state';
import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

function setupPlugins(): Plugin[] {
  const plugins = [keymap(baseKeymap)];
  return plugins;
}

declare global {
  var v: EditorView | undefined;
}
globalThis.v = undefined;

const ContentCounter = (props: { contentSize: Accessor<number> }) => {
  return (
    <div class='absolute top-5 right-5 bg-black/50 text-white px-2 py-1 text-xs rounded'>
      {props.contentSize()}
    </div>
  );
};

interface IEditorProps {
  docName?: string | undefined;
}

const View: Component<IEditorProps> = (props) => {
  const [contentSize, setContentSize] = createSignal(0);
  const untitled = 'Untitled';

  function setCursorAtEnd() {
    if (!v) return;
    v.dispatch(v.state.tr.setSelection(Selection.atEnd(v.state.doc)));
    v.focus();
  }

  function setContentCharSize(tr: Transaction) {
    const titleSize = tr.doc.firstChild?.textContent.length ?? 0;
    const totalContentSize = tr.doc.textContent.length;
    setContentSize(totalContentSize - titleSize);
  }

  function createTitleNode(schema: Schema) {
    const title = props.docName ?? untitled;
    const titleJSON = [{ type: 'text', text: title }];
    return schema.nodes.heading.create(
      { level: 1 },
      Fragment.fromJSON(schema, titleJSON),
    );
  }

  function setFileView(doc: Node) {
    v?.destroy();
    v = new EditorView(document.getElementById('editor'), {
      state: EditorState.create({
        doc: doc,
        plugins: setupPlugins(),
      }),
      dispatchTransaction: (tr) => {
        if (!v) return;
        setContentCharSize(tr);
        v.updateState(v.state.apply(tr));
      },
    });
    v.dispatch(v.state.tr.insert(0, createTitleNode(v.state.schema)));
    setContentCharSize(v.state.tr);
  }

  function setTabbarTitle(title?: string | undefined) {
    document.title = title ?? untitled;
  }

  onMount(() => {
    setFileView(schema.nodeFromJSON({ type: 'doc', content: [] }));
  });

  return (
    <div>
      <ContentCounter contentSize={contentSize} />
      <div id='editor' />
      <div
        onClick={() => {
          if (v) setCursorAtEnd();
        }}
      />
    </div>
  );
};

export default View;
