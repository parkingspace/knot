# Todo

## 23.11.12(sun)

view structure

root page shows multiple project cards.
when click project, get into that project.

project page shows multiple note cards.

- app
  - file
    - note
    - note
  - project
  - project

top-info-bar (only for show info)

1. how many projects are created.
2. who am i
3. where am i
4. scroll location

bottom-control-bar

1. search
2. setting
3. navigation

! search should be default behavior on every note block.

- [] search or create
  - [] select correct note
    - [] if searching note is not exists, create one.

## 23.11.13(mon)

Caret cursor should not be contained by editor.

- [x] make caret free - and one and only.
      by create provider that contains all editors state. And use it.
- [] make add-folder-button-box.

### problem

When type many letters(when Editor contains lot of data),
app starts glitching. I thought it happened because of the
moving animation on caret element but it wasn't.
I think i should look into DocumentManager.
Hope i know how to debug these kind of problem.
Have to find bottleneck before my code goes complete chaos.

## 23.11.14(tue)

- [] make add-folder-button-box.

cabinet -> createFolderCard Component
prevent enter key event go down to editor component.
think i should change name KnotEditorProvider to just Paper

Box -> File -> Paper

Board or Clip -> Papers

## 23.11.15(wed)

- [x] make add-folder-button-box.
- [] hide caret when editor destroy

## 23.11.16(thu)

- [x] hide caret when editor destroid

todo tomorrow

- [] put dot after selected doc to make sub doc.
- [] tidy up codes. so...dirty.
