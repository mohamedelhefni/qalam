import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useDocumentsStore = defineStore("documents", () => {
  let docs = ref([
    {
      id: 1,
      name: "الرئيسية",
      isFolder: false,
      isOpen: false,
      children: [],
      content: "اختبار لمحتوي الصفحه الرئيسيه",
    },
    {
      id: 2,
      name: "المدونه",
      isFolder: true,
      isOpen: true,
      children: [
        {
          id: 3,
          name: "مالايسع المسلم جهله",
          children: [],
          content: "",
        },
        {
          id: 4,
          name: "لم العجلة يا صديقي",
          children: [],
          content: "",
        },
      ],
    },
  ]);

  let activeDoc = ref();

  let itemResult = ref({});
  function getItem(document: any, documents: any = docs) {
    let documentsArray = documents.value || documents;
    for (let doc of documentsArray) {
      if (doc.id == document.id) {
        itemResult.value = doc;
        return doc;
      }
      if (doc?.children.length > 0 && doc?.isFolder) {
        getItem(document, doc.children);
      }
    }
    return itemResult.value;
  }

  const docsInLocalStore = localStorage.getItem("documents");
  if (docsInLocalStore) {
    docs.value = JSON.parse(docsInLocalStore)._value;
  }
  const activeDocInLocalStorage = localStorage.getItem("activeDoc");
  if (activeDocInLocalStorage) {
    let item = JSON.parse(activeDocInLocalStorage)._value;
    activeDoc.value = getItem(item);
  }

  watch(
    () => docs,
    (state) => {
      localStorage.setItem("documents", JSON.stringify(state));
    },
    { deep: true }
  );

  watch(
    () => activeDoc,
    (state) => {
      localStorage.setItem("activeDoc", JSON.stringify(state));
    },
    { deep: true }
  );

  function addDocument(doc: any) {
    docs.value.push(doc);
  }

  function deleteDocument(doc: any) {
    doc.isDeleted = true;
  }

  function setActiveDoc(doc: any) {
    activeDoc.value = doc;
  }

  return { docs, addDocument, deleteDocument, activeDoc, setActiveDoc };
});
