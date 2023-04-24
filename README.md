[![Maintainability](https://api.codeclimate.com/v1/badges/b79c6512a46520a32430/maintainability)](https://codeclimate.com/github/krapjost/knit/maintainability)
![Lines of Code](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/krapjost/ff4c2b4dc91f66a4b5fb2b62059a3c7e/raw/knot-badges.json)
![CI](https://github.com/parkingspace/knot/actions/workflows/ci.yaml/badge.svg)

# Knot

> **"Knot is the thread that ties your ideas together, transforming them into a tapestry of words."**
>
> ─ chatGPT 🧶

## Structure

```haskell
├─ apps
│  ├─ server     --Web server for both app
│  ├─ reader     --Reading stuff
│  │  ├─ web
│  │  └─ desktop
│  └─ writer     --Writing stuff
│     ├─ web
│     └─ desktop
├─ pkgs
│  ├─ editor     --Text editor core
│  ├─ config     --Common config files
│  ├─ ui         --User interface
│  ├─ ai         --AI api
│  ├─ db         --DB configs and models
│  ├─ auth       --Auth configs
│  └─ sync       --File Synchronization
├─ docs          --Documents for contributors
└─ dist          --Build output
```

## External libraries

- css styling

  [kobalte](https://kobalte.dev/docs/core/overview/introduction)\
  [tailwindCSS](https://tailwindcss.com/)

- editor library

  [tiptap](https://tiptap.dev/)

- monorepo management tool

  [turborepo](https://turbo.build/repo)

- frontend dev tool

  [vite](https://vitejs.dev/)

- frontend framwork

  [solid-js](https://www.solidjs.com/)

- desktop app builder

  [tauri](https://tauri.app/)

- code formater

  [dprint](https://dprint.dev/)

## Formatting

`pnpm lint` will format all files recursively. you can find the format rules at `dprint.json`

### Format on save

#### Neovim

[wiki](https://github.com/krapjost/knit/wiki)

## Todo

#### editor

- [x] Markdown editing
- [ ] Synchronized editing with sidebar
- [ ] Keybinding
  - [x] Common keybinding
  - [ ] Knot keybinding
  - [ ] which-key
- [ ] Collaborative editing
  - [ ] Share link
- [ ] Persistence
- [ ] File sync
  - [ ] Local
  - [ ] Cloud
- [ ] Togglable feature
- [ ] Preview window
- [ ] Typewriter-like auto scroll
- [ ] Full-text search
  - [ ] Search and move
  - [ ] Search and paste
- [ ] Backlink
  - [ ] Graph view

#### UI

- [ ] Theme
- [ ] Sidebar
- [ ] Modal
- [ ] Which-key
