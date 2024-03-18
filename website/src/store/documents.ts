import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useDocumentsStore = defineStore("documents", () => {
  let docs = ref([]);
  let docsSearchResult = ref([])
  let searchName = ref("")
  let activeDoc = ref();
  let deletedDocs = ref<any[]>([])
  let itemResult = ref({});
  let opendedFolders = ref([]);


  async function Init() {
    let resp = await fetch(import.meta.env.VITE_API_URL + "/files");
    let result = await resp.json();
    let files = result.files.map((file: any) => {
      file.isDeleted = deletedDocs.value.some(deletedDoc => deletedDoc.name === file.name)
      file.isOpened = opendedFolders.value.some(folder => folder === file.path)
      file.published_id = ""
      return file
    })
    files.sort((a: any, b: any) => Number(b.isFolder) - Number(a.isFolder));
    docs.value = files
    const activeDocInLocalStorage = localStorage.getItem("activeDoc");
    if (activeDocInLocalStorage) {
      let item = JSON.parse(activeDocInLocalStorage)
      setActiveDoc(getItem(item))
    } else {
      activeDoc.value = docs.value.filter((file: any) => !file.isFolder)[0];
    }

  }

  function toggleActiveDocDirection() {
    if (!activeDoc.value.direction) {
      activeDoc.value.direction = 'rtl'
    }
    if (activeDoc.value.direction == 'rtl') {
      activeDoc.value.direction = 'ltr'
    } else {
      activeDoc.value.direction = 'rtl'
    }
  }

  function getItem(document: any, documents: any = docs) {
    let documentsArray = documents.value || documents;
    for (let doc of documentsArray) {
      if (doc.path == document.path) {
        itemResult.value = doc;
        return doc;
      }
      if (doc?.children &&  doc?.children.length > 0 && doc?.isFolder) {
        getItem(document, doc.children);
      }
    }
    return itemResult.value;
  }

  function getDeletedDocs(documents: any = docs, deletedDocs: any = []) {
    let documentsArray = documents.value || documents;
    for (let doc of documentsArray) {
      if (!doc) {
        continue
      }
      if (doc.isDeleted) {
        deletedDocs.push(doc)
      }
      if (doc?.children.length > 0 && doc?.isFolder) {
        getDeletedDocs(doc.children, deletedDocs);
      }
    }
    return deletedDocs
  }

  function restoreDeleted(doc: any) {
    doc.isDeleted = false
    deletedDocs.value = getDeletedDocs(docs)
  }

  function rmDocument(doc: any, documents: any = docs) {
    let documentsArray = documents.value || documents;
    documentsArray.forEach((child: any, index: any) => {
      if (child.id == doc.id) documentsArray.splice(index, 1)
      if (child?.children) {
        rmDocument(doc, child?.children)
      }
    })

    deletedDocs.value = getDeletedDocs(docs)
  }

  // const docsInLocalStore = localStorage.getItem("documents");
  // if (docsInLocalStore) {
  //   docs.value = JSON.parse(docsInLocalStore)._value;
  // }
  deletedDocs.value = getDeletedDocs(docs)

  watch(
    () => activeDoc,
    (state) => {
      // let { content, ...rest } = state.value;
      localStorage.setItem("activeDoc", JSON.stringify(state.value));

    },
    { deep: true }
  );

  function addDocument(doc: any) {
    if (!doc)
      return
    //@ts-ignore
    docs.value.push(doc);
  }

  function deleteDocument(doc: any) {
    doc.isDeleted = true;
    deletedDocs.value.push(doc)
  }

  function setActiveDoc(doc: any) {
    fetch(import.meta.env.VITE_API_URL + "/files?path=" + doc.path).then(res => res.json()).then(data => {
      let file = data.file
      file.published_id = ""
      activeDoc.value = file;
    })

  }

  function searchByName(name: string) {
    searchName.value = name
    if (name) {
      docsSearchResult.value = search(docs.value, name)
    }
  }

  function search(docs: any, name: string, result: any = []) {
    docs.forEach((doc: any) => {

      if (doc.name.includes(name) && !doc?.isDeleted) {
        result.push(doc)
      }

      if (doc?.children && doc.children.length > 0) {
        search(doc.children, name, result)
      }
    })

    return result
  }


  return { Init, docs, searchDocs: docsSearchResult, opendedFolders, searchName, searchByName, addDocument, deleteDocument, activeDoc, setActiveDoc, deletedDocs, restoreDeleted, rmDocument, toggleActiveDocDirection };
});
