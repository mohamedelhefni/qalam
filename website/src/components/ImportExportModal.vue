<script setup lang="ts">
import { ref } from "vue"
import { useDocumentsStore } from "../store/documents"
import { guidGenerator } from "../utils/rand"
import { PhExport } from "@phosphor-icons/vue"
import { marked } from "marked"
import JSZip from "jszip"
import TurndownService from "turndown"
import { saveAs } from "file-saver"

const documentStore = useDocumentsStore()
const closeButton = ref()
const turndownService = new TurndownService()

function getNodeName(node: string) {
    let name: any = node
    if (name.endsWith(".md")) {
        let nodeArr = node?.split("/")
        name = nodeArr.pop()?.slice(0, -3)
    }
    return name
}

async function bulidTreeAdj(files: any[]) {
    let treeAdj: Map<any, any> = new Map()
    files.forEach(async (file: any) => {
        if (file.type != "text/markdown") {
            return
        }
        let fullName = file.webkitRelativePath
        let arr = fullName.split("/")
        arr[arr.length - 1] = fullName
        let current = arr.shift()
        while (arr.length > 0) {
            if (!treeAdj.has(current)) {
                treeAdj.set(current, new Set())
            }
            let prev = current
            current = arr.shift()
            treeAdj.get(prev).add(current)
        }
    })
    return treeAdj
}

function dfs(node: any, adj: Map<any, any>, content: any) {
    let file = {
        id: guidGenerator(), name: getNodeName(node), isFolder: !node.endsWith(".md"), isOpen: false, children: [], createdAt: Date.now(),
        content: content.get(node) || "",
    }
    if (adj.has(node)) {
        adj.get(node).forEach((child: any) => {
            //@ts-ignore
            file.children.push(dfs(child, adj, content))
        })
    }
    return file
}
function buildTree(adj: Map<any, any>, content: Map<any, any>) {
    let ans: any = []
    adj.forEach((_value: any, key: any) => {
        ans.push(dfs(key, adj, content))
    })
    return ans[0]
}

async function getContent(filesArray: any[]) {
    let content = new Map()
    for (let file of filesArray) {
        if (file.type != "text/markdown") {
            continue
        }
        let fullName = file.webkitRelativePath
        let text = await file.text()
        content.set(fullName, marked.parse(text))
    }
    return content
}


async function importFiles(e: any) {
    let filesArray = Array.from(e.target.files)
    let content = await getContent(filesArray)
    let treeAdj = await bulidTreeAdj(filesArray)
    let treeParentNode = buildTree(treeAdj, content)
    documentStore.addDocument(treeParentNode)
    closeButton.value.click()
}

async function exportFiles() {
    exportZip()
    closeButton.value.click()
}


function processData(data: any[], zip: any) {
    data.forEach(item => {
        if (item.isFolder) {
            const folder = zip.folder(item.name);
            if (item.children.length > 0) {
                processData(item.children, folder);
            }
        } else {
            zip.file(`${item.name}.md`, turndownService.turndown(item.content || ""));
        }
    });
}

function exportZip() {
    const zip = new JSZip();
    let data = documentStore.docs
    // Process the data
    processData(data, zip);

    // Generate the zip file
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "الملفات.zip");
        });

}


</script>

<template>
    <dialog id="importExportModal" class="modal">
        <form method="dialog" class="modal-box">

            <h3 class="font-bold text-lg">استخراج / استيراد</h3>
            <p class="py-4"></p>
            <div class="modal-content">
                <div class="flex flex-col w-full border-opacity-50">
                    <div class="flex flex-col gap-3">
                        <h3 class="text-xl font-bold"> استخراج </h3>
                        <button @click="exportFiles" class="btn btn-primary flex items-center">
                            <PhExport :size="26" class="text-base-content" /><span class="mt-1"> استخراج جميع الملفات</span>
                        </button>
                    </div>
                    <div class="divider"></div>
                    <div class="flex flex-col gap-3">
                        <h3 class="text-xl font-bold">استيراد</h3>
                        <input @change="importFiles" class="file-input w-full max-w-xs" type="file" id="picker"
                            name="fileList" webkitdirectory multiple />
                    </div>
                </div>

            </div>
            <div class="modal-action">
                <button ref="closeButton" class="btn btn-primary">اغلاق</button>
            </div>
        </form>
    </dialog>
</template>