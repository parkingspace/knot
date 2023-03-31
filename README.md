# Fabres

    Text editor for minimalists.
 
## folder structure ( TODO )
```
root
|-- apps/
|   |-- web/
|   |-- desktop/
|   |-- mobile/
|   |-- server/
|   |-- landing/
|-- libs/
|   |-- editor/
|   |-- ui/
|   |-- config/
|   |-- features/
|   |   |-- ai/
|   |   |-- auth/
|   |   |-- sync/
|   |   |-- publish/
|   |   |-- share/
|-- utils/
```


## External libraries

 1. css styling
    [kobalte](https://kobalte.dev/docs/core/overview/introduction)
    [vanilla extract](https://vanilla-extract.style/)
 2. editor library
    [tiptap](https://tiptap.dev/)
 3. monorepo management tool
    [turborepo](https://turbo.build/repo)
 4. frontend dev tool
    [vite](https://vitejs.dev/)
 5. frontend framwork
    [solid-js](https://www.solidjs.com/)
 5. desktop app builder
    [tauri](https://tauri.app/)
 6. code formater
    [dprint](https://dprint.dev/)

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
