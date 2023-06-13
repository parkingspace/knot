import create from 'solid-zustand'

interface SidebarState {
  isOpen: boolean
  toggle: () => void
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: true,
  toggle: () =>
    set(state => ({
      isOpen: !state.isOpen,
    })),
}))
