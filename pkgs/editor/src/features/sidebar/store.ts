import { createStore } from "solid-js/store";

const [sidebarState, setSidebarState] = createStore({
  isOpen: true,
  toggle: () => setSidebarState((state) => ({ isOpen: !state.isOpen })),
});

export const useSidebarStore = () => sidebarState;
