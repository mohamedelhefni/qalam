<script setup lang="ts">
import { Editor, BubbleMenu } from "@tiptap/vue-3"
import { PhBroom, PhCodeBlock, PhHighlighterCircle, PhListBullets, PhListNumbers, PhParagraph, PhQuotes, PhTextAlignCenter, PhTextAlignJustify, PhTextAlignLeft, PhTextAlignRight, PhTextB, PhTextHOne, PhTextHTwo, PhTextItalic, PhTextStrikethrough } from "@phosphor-icons/vue"
import MenuButton from "./MenuButton.vue"


const props = defineProps({ editor: Editor })
const editor = props.editor

</script>


<template>
    <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor"
        class="bg-base-200 p-2 rounded rounded shadow flex items-center justify-center gap-2 border  min-w-[600px] w-full ">
        <MenuButton @click="editor.chain().focus().toggleBold().run()" :is-active="editor.isActive('bold')">
            <PhTextB :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleItalic().run()" :is-active="editor.isActive('italic')">
            <PhTextItalic :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleStrike().run()" :is-active="editor.isActive('strike')">
            <PhTextStrikethrough :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleHighlight().run()" :is-active="editor.isActive('highlight')">
            <PhHighlighterCircle :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleCode().run()" :is-active="editor.isActive('code')">
            <PhCodeBlock :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().setParagraph().run()" :is-active="editor.isActive('paragraph')">
            <PhParagraph :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :is-active="editor.isActive('heading', { level: 1 })">
            <PhTextHOne :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :is-active="editor.isActive('heading', { level: 2 })">
            <PhTextHTwo :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleBulletList().run()" :is-active="editor.isActive('bulletList')">
            <PhListBullets :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleOrderedList().run()" :is-active="editor.isActive('orderedList')">
            <PhListNumbers :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().toggleBlockquote().run()" :is-active="editor.isActive('blockquote')">
            <PhQuotes :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().unsetAllMarks().run()">
            <PhBroom :size="24" />
        </MenuButton>

        <div class="w-[1px] bg-base-content h-[20px]"></div>

        <MenuButton @click="editor.chain().focus().setTextAlign('right').run()"
            :is-active="editor.isActive({ textAlign: 'right' })">
            <PhTextAlignRight :size="24" />
        </MenuButton>

        <MenuButton @click="editor.chain().focus().setTextAlign('center').run()"
            :is-active="editor.isActive({ textAlign: 'center' })">
            <PhTextAlignCenter :size="24" />
        </MenuButton>


    </bubble-menu>
</template>