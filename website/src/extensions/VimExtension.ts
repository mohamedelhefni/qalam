import { Extension } from '@tiptap/core'
import { Plugin, PluginKey, TextSelection } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'
import { useUIStore } from '../store/ui'

type VimMode = 'normal' | 'insert'

type VimStorage = {
  mode: VimMode
  pendingKey: string
  yankBuffer: string
}

// Unicode word characters: Latin + Arabic (all blocks) + Hebrew
const W = '[\\w\\u0600-\\u06FF\\u0750-\\u077F\\uFB50-\\uFDFF\\uFE70-\\uFEFF\\u0590-\\u05FF]'

/** Offset from cursor to the start of the next word in `text`. */
function nextWordStart(text: string): number {
  const word = new RegExp(W)
  let i = 0
  // skip current word
  while (i < text.length && word.test(text[i])) i++
  // skip non-word separator
  while (i < text.length && !word.test(text[i])) i++
  return i || text.length
}

/** Distance (backwards) from cursor to the start of the previous word in `textBefore`. */
function prevWordStart(textBefore: string): number {
  const word = new RegExp(W)
  let i = textBefore.length - 1
  // skip trailing non-word
  while (i >= 0 && !word.test(textBefore[i])) i--
  // skip word chars
  while (i >= 0 && word.test(textBefore[i])) i--
  return textBefore.length - (i + 1)
}

/**
 * Map a physical key (event.code + shiftKey) to a vim key name so that
 * bindings work regardless of the OS input language (Arabic, Hebrew, etc.).
 * Returns null for keys that have no vim binding.
 */
function codeToVimKey(code: string, shift: boolean): string | null {
  const map: Record<string, string> = {
    KeyA: 'a', KeyB: 'b', KeyC: 'c', KeyD: 'd', KeyG: 'g',
    KeyH: 'h', KeyI: 'i', KeyJ: 'j', KeyK: 'k', KeyL: 'l',
    KeyO: 'o', KeyP: 'p', KeyR: 'r', KeyU: 'u', KeyW: 'w',
    KeyX: 'x', KeyY: 'y',
    Digit0: '0', Digit4: '4',
    Escape: 'Escape',
  }
  const base = map[code]
  if (base === undefined) return null
  if (code === 'Escape') return 'Escape'
  if (code === 'Digit4') return shift ? '$' : null   // only $ (shift+4) is a vim key
  if (code === 'Digit0') return shift ? null : '0'
  return shift ? base.toUpperCase() : base
}

const VimExtension = Extension.create<{}, VimStorage>({
  name: 'vimExtension',

  addStorage(): VimStorage {
    return {
      mode: 'normal',
      pendingKey: '',
      yankBuffer: '',
    }
  },

  addProseMirrorPlugins() {
    const storage = this.storage
    const editor = this.editor
    const uiStore = useUIStore()

    return [
      new Plugin({
        key: new PluginKey('vim'),

        // Toggle class on the editor DOM so CSS can hide the native caret.
        view(editorView) {
          const sync = () =>
            editorView.dom.classList.toggle(
              'vim-normal-mode',
              uiStore.vimEnabled && storage.mode === 'normal',
            )
          sync()
          return { update: sync, destroy: () => editorView.dom.classList.remove('vim-normal-mode') }
        },

        props: {
          // Block cursor: highlight the character at the cursor position in normal mode.
          decorations(state) {
            if (!uiStore.vimEnabled || storage.mode !== 'normal') return DecorationSet.empty
            const { from } = state.selection
            const $pos = state.doc.resolve(from)

            if (from < $pos.end()) {
              // Highlight character under cursor
              return DecorationSet.create(state.doc, [
                Decoration.inline(from, from + 1, { class: 'vim-block-cursor' }),
              ])
            }
            // Cursor at end of block – show a narrow block after the last char
            const el = document.createElement('span')
            el.className = 'vim-eol-cursor'
            return DecorationSet.create(state.doc, [
              Decoration.widget(from, el, { side: 1, key: 'vim-eol' }),
            ])
          },

          handleKeyDown(view, event) {
            const { state } = view
            const { doc, selection } = state
            const { $from } = selection

            // Dispatch an empty (no-op) transaction so decorations refresh on mode change.
            const refreshDecorations = () =>
              view.dispatch(view.state.tr.setMeta('addToHistory', false))

            if (!uiStore.vimEnabled) return false

            // ── INSERT MODE ──────────────────────────────────────────────
            if (storage.mode === 'insert') {
              if (event.code === 'Escape') {
                storage.mode = 'normal'
                refreshDecorations()
                event.preventDefault()
                return true
              }
              return false
            }

            // ── NORMAL MODE ──────────────────────────────────────────────

            // Always pass Ctrl/Cmd shortcuts through (copy, paste, save…)
            if (event.ctrlKey || event.metaKey) {
              if (event.code === 'KeyR') {
                editor.commands.redo()
                event.preventDefault()
                return true
              }
              return false
            }

            // Use physical key code so vim works in any OS input language.
            const key = codeToVimKey(event.code, event.shiftKey)
            if (key === null) {
              // Unknown physical key – block printable input in normal mode.
              if (event.key.length === 1) { event.preventDefault(); return true }
              return false
            }

            if (key === 'Escape') {
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }

            // ── Enter Insert modes ────────────────────────────────────────
            if (key === 'i') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              refreshDecorations()
              event.preventDefault()
              return true
            }
            if (key === 'a') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              const pos = Math.min($from.pos + 1, $from.end())
              view.dispatch(state.tr.setSelection(TextSelection.create(doc, pos)))
              event.preventDefault()
              return true
            }
            if (key === 'A') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              view.dispatch(state.tr.setSelection(TextSelection.create(doc, $from.end())))
              event.preventDefault()
              return true
            }
            if (key === 'I') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              view.dispatch(state.tr.setSelection(TextSelection.create(doc, $from.start())))
              event.preventDefault()
              return true
            }
            if (key === 'o') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              const insertPos = $from.after()
              const newNode = $from.parent.type.create()
              const newTr = state.tr.insert(insertPos, newNode)
              view.dispatch(newTr.setSelection(TextSelection.create(newTr.doc, insertPos + 1)))
              event.preventDefault()
              return true
            }
            if (key === 'O') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              const insertPos = $from.before()
              const newNode = $from.parent.type.create()
              const newTr = state.tr.insert(insertPos, newNode)
              view.dispatch(newTr.setSelection(TextSelection.create(newTr.doc, insertPos + 1)))
              event.preventDefault()
              return true
            }

            // ── c / C (change) ────────────────────────────────────────────
            // C – change to end of line
            if (key === 'C') {
              storage.mode = 'insert'
              storage.pendingKey = ''
              const from = $from.pos
              const to = $from.end()
              view.dispatch(from < to ? state.tr.delete(from, to) : state.tr.setMeta('addToHistory', false))
              event.preventDefault()
              return true
            }
            if (key === 'c') {
              if (storage.pendingKey === 'c') {
                // cc – clear current block, enter insert mode
                storage.mode = 'insert'
                storage.pendingKey = ''
                const from = $from.start()
                const to = $from.end()
                view.dispatch(from < to ? state.tr.delete(from, to) : state.tr.setMeta('addToHistory', false))
              } else {
                storage.pendingKey = 'c'
              }
              event.preventDefault()
              return true
            }

            // ── Movement (also handle c-prefix motions) ───────────────────
            if (key === 'h') {
              const pos = Math.max($from.pos - 1, $from.start())
              view.dispatch(state.tr.setSelection(TextSelection.create(doc, pos)))
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }
            if (key === 'l') {
              const pos = Math.min($from.pos + 1, $from.end())
              view.dispatch(state.tr.setSelection(TextSelection.create(doc, pos)))
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }
            if (key === '0') {
              if (storage.pendingKey === 'c') {
                // c0 – change to start of line
                storage.mode = 'insert'
                storage.pendingKey = ''
                const to = $from.pos
                const from = $from.start()
                view.dispatch(from < to ? state.tr.delete(from, to) : state.tr.setMeta('addToHistory', false))
              } else {
                view.dispatch(state.tr.setSelection(TextSelection.create(doc, $from.start())))
                storage.pendingKey = ''
              }
              event.preventDefault()
              return true
            }
            if (key === '$') {
              if (storage.pendingKey === 'c') {
                // c$ – change to end of line
                storage.mode = 'insert'
                storage.pendingKey = ''
                const from = $from.pos
                const to = $from.end()
                view.dispatch(from < to ? state.tr.delete(from, to) : state.tr.setMeta('addToHistory', false))
              } else {
                view.dispatch(state.tr.setSelection(TextSelection.create(doc, $from.end())))
                storage.pendingKey = ''
              }
              event.preventDefault()
              return true
            }
            if (key === 'j') {
              storage.pendingKey = ''
              const afterPos = $from.after()
              if (afterPos < doc.content.size) {
                const $next = doc.resolve(afterPos + 1)
                const col = $from.pos - $from.start()
                view.dispatch(state.tr.setSelection(
                  TextSelection.create(doc, Math.min($next.start() + col, $next.end())),
                ))
              }
              event.preventDefault()
              return true
            }
            if (key === 'k') {
              storage.pendingKey = ''
              const beforePos = $from.before()
              if (beforePos > 0) {
                const $prev = doc.resolve(beforePos - 1)
                const col = $from.pos - $from.start()
                view.dispatch(state.tr.setSelection(
                  TextSelection.create(doc, Math.min($prev.start() + col, $prev.end())),
                ))
              }
              event.preventDefault()
              return true
            }
            // w – next word start (Arabic + Latin aware)
            if (key === 'w') {
              const textAfter = doc.textBetween($from.pos, $from.end())
              const targetPos = Math.min($from.pos + nextWordStart(textAfter), $from.end())
              if (storage.pendingKey === 'c') {
                // cw – change to next word start
                storage.mode = 'insert'
                storage.pendingKey = ''
                view.dispatch($from.pos < targetPos
                  ? state.tr.delete($from.pos, targetPos)
                  : state.tr.setMeta('addToHistory', false))
              } else {
                view.dispatch(state.tr.setSelection(TextSelection.create(doc, targetPos)))
                storage.pendingKey = ''
              }
              event.preventDefault()
              return true
            }
            // b – previous word start (Arabic + Latin aware)
            if (key === 'b') {
              const textBefore = doc.textBetween($from.start(), $from.pos)
              const targetPos = Math.max($from.pos - prevWordStart(textBefore), $from.start())
              if (storage.pendingKey === 'c') {
                // cb – change to previous word start
                storage.mode = 'insert'
                storage.pendingKey = ''
                view.dispatch(targetPos < $from.pos
                  ? state.tr.delete(targetPos, $from.pos)
                  : state.tr.setMeta('addToHistory', false))
              } else {
                view.dispatch(state.tr.setSelection(TextSelection.create(doc, targetPos)))
                storage.pendingKey = ''
              }
              event.preventDefault()
              return true
            }
            if (key === 'G') {
              view.dispatch(state.tr.setSelection(TextSelection.create(doc, doc.content.size - 1)))
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }

            // ── Compound keys: gg / dd / yy ───────────────────────────────
            if (key === 'g' || key === 'd' || key === 'y') {
              if (storage.pendingKey === key) {
                storage.pendingKey = ''
                if (key === 'g') {
                  view.dispatch(state.tr.setSelection(TextSelection.create(doc, 1)))
                } else if (key === 'd') {
                  storage.yankBuffer = doc.textBetween($from.start(), $from.end())
                  const from = $from.before()
                  const to = Math.min($from.after(), doc.content.size)
                  view.dispatch(state.tr.delete(from, to))
                } else {
                  // yy – yank line (no document change)
                  storage.yankBuffer = doc.textBetween($from.start(), $from.end())
                  refreshDecorations()
                }
              } else {
                storage.pendingKey = key
              }
              event.preventDefault()
              return true
            }

            // ── Single-key actions ────────────────────────────────────────
            if (key === 'x') {
              const to = Math.min($from.pos + 1, $from.end())
              if ($from.pos < to) view.dispatch(state.tr.delete($from.pos, to))
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }
            if (key === 'u') {
              editor.commands.undo()
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }
            if (key === 'p') {
              if (storage.yankBuffer) {
                const insertPos = $from.after()
                const newNode = $from.parent.type.create({}, doc.type.schema.text(storage.yankBuffer))
                const newTr = state.tr.insert(insertPos, newNode)
                view.dispatch(newTr.setSelection(TextSelection.create(newTr.doc, insertPos + 1)))
              }
              storage.pendingKey = ''
              event.preventDefault()
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})

export default VimExtension