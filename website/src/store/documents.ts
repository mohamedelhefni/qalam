import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const useDocumentsStore = defineStore("documents", () => {
  let docs = ref([
    {
      id: 1,
      name: "الرئيسية",
      isOpen: false,
      children: [],
    },
    {
      id: 3,
      name: "المدونه",
      isOpen: true,
      children: [
        {
          id: 2,
          name: "مالايسع المسلم جهله",
          children: [],
        },
        {
          id: 4,
          name: "لم العجلة يا صديقي",
          children: [],
        },
      ],
    },
    {
      id: 5,
      name: "الفهرس",
      children: [],
    },
  ]);

  const docsInLocalStore = localStorage.getItem("documents");
  if (docsInLocalStore) {
    docs.value = JSON.parse(docsInLocalStore)._value;
  }
  let activeDoc = ref();
  watch(
    () => docs,
    (state) => {
      localStorage.setItem("documents", JSON.stringify(state));
    },
    { deep: true }
  );

  function addDocument(doc: any) {
    docs.value.push(doc);
  }

  function deleteDocument(doc: any) {
    let docIdx = docs.value.indexOf(doc);
    if (docIdx) docs.value.splice(docIdx, 1);
    // console.log(docId);
    // docs.forEach((docuemnt) => {
    //   console.log(docuemnt);
    //   docuemnt?.children.forEach((child: any) => {
    //     deleteDocument(child.children, doc);
    //   });
    // });

    // docs.value.splice()
  }

  function setActiveDoc(doc: any) {
    activeDoc.value = doc;
  }

  return { docs, addDocument, deleteDocument, activeDoc, setActiveDoc };
});

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const name = ref("Eduardo");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, name, doubleCount, increment };
});
