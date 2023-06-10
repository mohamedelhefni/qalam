<script setup lang="ts">

import Trash from "/Trash.svg"
import Refresh from "/Refresh.svg"
import { useDocumentsStore } from "../store/documents"
const documentStore = useDocumentsStore()

</script>
<template>
    <dialog id="deleteModal" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">قائمة المهملات</h3>
            <p class="py-4"></p>
            <div class="modal-content">
                <ul class="menu w-full rounded-box">
                    <p v-if="documentStore.deletedDocs.length == 0" class="text-center font-bold">سلة المهملات فارغه</p>
                    <li v-for="doc in documentStore.deletedDocs" :key="doc.id">
                        <div class="flex items-center justify-between">
                            <span>{{ doc.name }}</span>
                            <div class="flex gap-2">
                                <span @click="documentStore.rmDocument(doc)"><img :src="Trash" class="w-5" /></span>
                                <span @click="documentStore.restoreDeleted(doc)"><img :src="Refresh" class="w-5" /></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="modal-action">
                <button class="btn btn-primary">اغلاق</button>
            </div>
        </form>
    </dialog>
</template>