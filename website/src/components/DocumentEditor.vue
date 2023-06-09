<script setup lang="ts">
import TurndownService from "turndown"
import { Editor, EditorContent } from '@tiptap/vue-3'
import BulletList from '@tiptap/extension-bullet-list'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import EditorMenu from "./EditorMenu.vue"
import { beautifyDate } from "../utils/date"


import { useDocumentsStore } from "../store/documents"
import { onBeforeUnmount, onUpdated, ref } from "vue";
import { PhCopy, PhList } from '@phosphor-icons/vue'
const documentStore = useDocumentsStore()

const turndownService = new TurndownService()
const value = ref(documentStore.activeDoc?.content || "")

const editor = new Editor({
    extensions: [

        StarterKit,
        Highlight,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Typography,
        Image.configure({
            inline: true, allowBase64: true,
            HTMLAttributes: {
                class: 'uploaded-image',
            },
        }),
        BulletList,
        OrderedList,
        ListItem,
        TaskList,
        TaskItem.configure({
            nested: true,
        }),
    ],
    content: value.value || "",
    onUpdate: ({ editor }) => {

        documentStore.activeDoc.content = editor.getHTML()
    },
})


onUpdated(() => {
    editor.commands.focus()
    value.value = documentStore.activeDoc?.content
    editor.commands.setContent(value.value, false)
})

onBeforeUnmount(() => {
    editor.destroy()
})

function copyContent() {
    var markdown = turndownService.turndown(editor.getHTML())
    navigator.clipboard.writeText(markdown)
}


</script>

<template>
    <div class="w-full prose no-scrollbar flex flex-col gap-5 p-5 max-w-6xl mx-auto ">
        <div class="flex items-start justify-between ">
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-bold pl-2 m-0">
                    {{ documentStore.activeDoc?.name }}
                </h2>
                <p class="text-sm text-muted">{{ beautifyDate(documentStore.activeDoc?.createdAt) }}</p>
            </div>

            <label for="sidebar-drawer">
                <PhList :size="28" class="w-10 hover:bg-base-100 rounded p-1 block md:hidden " />
            </label>
            <button @click="copyContent">
                <PhCopy :size="30" class=" hover:bg-base-200 rounded p-1 " />
            </button>
        </div>
        <div class="no-scrollbar flex flex-col justify-between">
            <EditorMenu :editor="editor" />
            <editor-content :editor="editor" />
        </div>
    </div>
</template>

<style lang="scss">
ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    p {
        margin: 0;
    }

    li {
        display: flex;

        >label {
            flex: 0 0 auto;
            margin-right: 0.5rem;
            user-select: none;
        }

        >div {
            flex: 1 1 auto;

            p {
                margin-right: 8px;
            }
        }
    }
}

code {
    @apply bg-base-200
}

.ProseMirror:focus {
    outline: none;
}

.ProseMirror {
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
}

.ProseMirror ul,
.ProseMirror ol {
    margin-right: 30px
}

/* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
    display: none !important;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
    -ms-overflow-style: none !important;
    /* IE and Edge */
    scrollbar-width: none !important;
    /* Firefox */
}
</style>