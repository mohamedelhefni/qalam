import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'

import MentionList from "./MentionList.vue"
import { EMOJIS } from '../data/emojis'

export default {
  char: ':',
  items: ({ query }: any) => {
    return EMOJIS.filter((emoji) => {
      if (Array.isArray(emoji.alias)) {
        return emoji.alias.join(", ").includes(query.toLowerCase())
      }
      return emoji.alias.toLowerCase().includes(query.toLowerCase())
    }).slice(0, 10)
  },



  render: () => {
    let component: any
    let popup: any

    return {
      onStart: (props: any) => {
        component = new VueRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: any) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }



        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
