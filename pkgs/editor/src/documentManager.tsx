import { Node } from "@tiptap/pm/model";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import type { EditorView } from "@tiptap/pm/view";
import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import searchIndex from "./search";
import type { HeadingFocusState } from "./types/headingStates";

export function isHeading(node: Element) {
  return node.nodeName.includes("H");
}

export function isEmptyHeading(node: Element) {
  return isHeading(node) && node.textContent === "";
}

export function isLineAdded(transaction: Transaction) {
  return transaction.doc.childCount > transaction.before.childCount;
}

export function isLineRemoved(transaction: Transaction) {
  return transaction.doc.childCount < transaction.before.childCount;
}

export function isLineChanged(transaction: Transaction) {
  return (
    (transaction.docChanged && isLineAdded(transaction))
    || isLineRemoved(transaction)
  );
}

export function findCurrentLineDomNode(view: EditorView) {
  const currentPos = view.posAtDOM(
    view.domAtPos(view.state.selection.head).node,
    0,
  );
  return view.domAtPos(currentPos).node;
}

export function fillEmptyHeading(dom: Element, content: string) {
  if (isEmptyHeading(dom)) {
    dom.textContent = content;
  }
}

function documentManager() {
  const [headingStates, setHeadingStates] = createStore<HeadingFocusState[]>([]);
  let searchableDocs: { "title": string; "content": string[] }[] = [];

  function getAllHeadings(editorState: EditorState) {
    let lastHeading: Node | undefined;
    let headingNodes: Array<Node> = [];
    let contents: Array<string> = [];

    let currentHeading: Node | undefined;
    let headingIndex = -1;
    editorState.doc.nodesBetween(
      0,
      editorState.doc.content.size,
      (node, pos) => {
        if (node.type.name === "heading") {
          headingNodes.push(node);
          currentHeading = node;
          headingIndex += 1;
          searchableDocs[headingIndex] = {
            title: headingNodes[headingIndex].textContent,
            content: [],
          };
          if (pos > editorState.selection.from) {
            return false;
          }
          lastHeading = node;
        }
        if (node.type.name === "paragraph") {
          contents.push(node.textContent);
          searchableDocs[headingIndex].content = [
            ...searchableDocs[headingIndex].content,
            node.textContent,
          ];
        }
      },
    );

    setHeadingStates(
      headingNodes.map((node) => {
        return {
          node: node,
          hasFocus: false,
        };
      }),
    );

    return {
      toggleLastHeadingFocus: () => toggleHeadingFocus(lastHeading),
      headings: headingNodes,
      searchableDocs,
    };
  }

  function toggleHeadingFocus(targetHeading: Node | undefined) {
    if (!targetHeading) {
      return chains;
    }
    setHeadingStates((headings) =>
      headings.map((heading) => {
        if (heading.node === targetHeading) {
          return {
            ...heading,
            hasFocus: true,
          };
        }
        return {
          ...heading,
          hasFocus: false,
        };
      })
    );
    return chains;
  }

  function setSearchIndex() {
    searchableDocs.forEach((doc, index) => {
      searchIndex.add(index, {
        title: doc.title,
        content: doc.content.join(" "),
      });
    });
  }

  const chains = {
    headingStates,
    searchableDocs,
    getAllHeadings,
    setSearchIndex,
  };

  return chains;
}

type DocumentManager = ReturnType<typeof documentManager>;
const DocumentManagerContext = createContext<DocumentManager>();

export const DocumentManagerProvider = (props: { children: any }) => {
  return (
    <DocumentManagerContext.Provider value={documentManager()}>
      {props.children}
    </DocumentManagerContext.Provider>
  );
};

export const useDocumentManager = () => {
  const context = useContext(DocumentManagerContext);
  if (!context) {
    throw new Error(
      "useDocumentManager must be used within a DocumentManagerProvider",
    );
  }
  return context;
};
