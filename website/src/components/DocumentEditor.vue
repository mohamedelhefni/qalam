<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import Refresh from "/Refresh.svg"
import MenuIcon from "/Menu.svg"


import { useDocumentsStore } from "../store/documents"
import { useUIStore } from "../store/ui"
import { onBeforeUnmount, onUpdated, ref } from "vue";
const documentStore = useDocumentsStore()
const uiStore = useUIStore()

const value = ref(documentStore.activeDoc?.content || "")
const editor = new Editor({
    extensions: [
        StarterKit,
        Highlight,
        Typography,
        Image.configure({
            inline: true, allowBase64: true,
            HTMLAttributes: {
                class: 'uploaded-image',
            },
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


</script>

<template>
    <div class="w-full prose flex flex-col gap-5 p-5 max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
                <img @click="" class="w-10 hover:bg-gray-100 rounded p-1 " :src="Refresh" />
                <h2 class="text-4xl font-bold p-2 m-0 ">
                    {{ documentStore.activeDoc?.name }}
                </h2>
            </div>
            <button class="">
                <img @click="uiStore.toggleSidebar()" class="w-10 hover:bg-gray-100 rounded p-1 block md:hidden "
                    :src="MenuIcon" />
            </button>
        </div>

        <editor-content :editor="editor" />
    </div>
</template>
<style>
.ProseMirror:focus {
    outline: none;
}

.ProseMirror {
    min-height: 100vh;
    width: 100%;
    overflow: scroll;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>