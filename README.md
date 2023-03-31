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

## Formatting

`pnpm lint` will format all files recursively. you can find the format rules at `dprint.json`

### Neovim format on save setup

#### If you use null-ls to format

``` lua
return function()
	local null_ls = require("null-ls")
	null_ls.setup({
		sources = {
			null_ls.builtins.formatting.stylua,
			null_ls.builtins.formatting.dprint,
		},
		on_attach = function(client, bufnr)
			if client.supports_method("textDocument/formatting") then
				local format_augroup = vim.api.nvim_create_augroup("format_augroup", { clear = true })
				vim.api.nvim_create_autocmd("BufWritePre", {
					group = format_augroup,
					buffer = bufnr,
					callback = function()
						vim.lsp.buf.format({
							filter = function(_client)
								return _client.name == "null-ls"
							end,
						})
					end,
				})
			end
		end,
	})
end
```

#### else

```lua
local supported_types = { 'js', 'jsx', 'ts', 'tsx', 'json', 'yaml' }
local filetype = vim.bo.filetype
if not vim.tbl_contains(supported_types, filetype) then
  return
end

local has_dprint = vim.fn.executable('dprint')

if has_dprint then
  vim.cmd("augroup dprint_autogroup")
  vim.cmd("autocmd!")
  vim.cmd("autocmd BufWritePre * silent! !dprint fmt %")
  vim.cmd("augroup END")
end
```


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
