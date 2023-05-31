<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import Refresh from "/Refresh.svg"



import { useDocumentsStore } from "../store/documents"
import { onBeforeUnmount, onUpdated, ref } from "vue";
const store = useDocumentsStore()

const value = ref(store.activeDoc?.content || "")
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
        store.activeDoc.content = editor.getHTML()
    },
})


onUpdated(() => {
    editor.commands.focus()
    value.value = store.activeDoc?.content
    editor.commands.setContent(value.value, false)
})

onBeforeUnmount(() => {
    editor.destroy()
})


</script>

<template>
    <div class="w-full prose flex flex-col gap-5 p-5 max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
            <h2 class="text-4xl font-bold p-2 m-0 ">
                {{ store.activeDoc?.name }}
            </h2>
            <button class="">
                <img @click.stop="" class="w-10 hover:bg-gray-100 rounded p-1 " :src="Refresh" />
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