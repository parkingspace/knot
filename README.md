[![Maintainability](https://api.codeclimate.com/v1/badges/b79c6512a46520a32430/maintainability)](https://codeclimate.com/github/krapjost/knit/maintainability)
# Knot

> **"Let Knot be the guiding hand that weaves your words into a work of art."**
> 
> ─ chatGPT 🖋️
 
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
├─ pkgs          --Internal common libraries
│  ├─ core       --Text editor core
│  ├─ ui         --User interface
│  ├─ ai         --AI api
│  ├─ db         --DB configs and models
│  ├─ auth       --Auth configs
│  └─ sync       --File Synchronization
├─ docs          --Documents for user and contributor
├─ logs          --Auto generated log files
└─ dist          --Build output
```

## External libraries

 * css styling
 
    [kobalte](https://kobalte.dev/docs/core/overview/introduction)   
    [vanilla extract](https://vanilla-extract.style/)
    
 * editor library
 
    [tiptap](https://tiptap.dev/)
    
 * monorepo management tool
 
    [turborepo](https://turbo.build/repo)
    
 * frontend dev tool
 
    [vite](https://vitejs.dev/)
    
 * frontend framwork
 
    [solid-js](https://www.solidjs.com/)
    
 * desktop app builder
 
    [tauri](https://tauri.app/)
    
 * code formater
 
    [dprint](https://dprint.dev/)

## Formatting

`pnpm lint` will format all files recursively. you can find the format rules at `dprint.json`

### Neovim format on save setup

  [wiki](https://github.com/krapjost/knit/wiki)

## Todo

- Editor
    - Core
        - Keybinding
        - Input-rules
        - history (undo, redo)
    - User Interface
        - Theme
            - Dark
            - Light
            - Sepia
            - etc …
        - Dumb Components
            - Breadcrumbs
            - Tooltip
            - Button
                - TextButton
                    - ModalButton
                - IconButton
                - ListButton
                    - SidebarButton
            - Modal
                - CommandModal
                - SearchModal
                - SettingModal
            - etc …
    - Commands
        - Ask AI
        - Toggle Mobile preview
        - Toggle Desktop preview
        - etc …
    - Search
        - File search
        - Keybinding search
        - Command search
    - Setting
        - Local only setting
        - Synchronized setting ( for logged in user )
        - Theme
        - Locale
        - Font
    - Synchronization
        - Local File-Sync
            - Browser
                - Browser Origin Private File System API
            - PWA
                - Browser File System Access API
            - Tauri or Electron
                - Native File System API
        - Cloud File-Sync
            - Google
            - Apple
            - Dropbox
            - Hyle
    - AI
        - Fix Spelling & Grammar
        - Summarize
        - Create Outline
        - Brainstorm
        - Feedback
        - Snowflake framework
    - Share
        - Manage privileges by the given URI.
        - View-only
        - Real-time Co-edit
        - Comment
    - Publish
        - Preview
            - Mobile-view
            - Desktop-view
            - Paper-view
        - Typesetting
            - Predefined Template
            - User-defined template.
                - Share public - server
                - Private ( default ) - local
- Authentication
    - OAuth2 (Ory)
