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
      content: `# مرحبا بك في قلم 👋
قلم هو موقع لتسجيل الملاحظات بشكل منظم بواجهة مستخدم بسيطه مخصص للغة العربية

---
 
## طريقة الاستخدام
* يمكنك انشاء ملف جديد عن طريق الضغط علي ايقونة ![ملف جديد](https://khatat.vercel.app/Fileadd.svg) 
* يمكنك انشاء مجلد جديد بالضغط علي ايقونة ![](https://khatat.vercel.app/Folderadd.svg)
* اضغط علي المجلد او الملف مرتين لتغير اسمه
* لتحريك الملف داخل المجلد يجب عليك فتحه اولا ليكون بالشكل ![مجلد مفتوح](https://khatat.vercel.app/FolderOpen.svg)  ثم قم بتحريك الملف بداخله

---

**تنبيه** هذه نسخه تجريبيه بها الوظائف الاساسيه  تم انشائها في يوم واحد قد تحتوي علي بعض الاخطاء ولايوجد بها جميع الوظائف الخاصه بالموقع  
للمشاركه او تقديم شكوي [Github](https://github.com/mohamedelhefni/qalam), [Email](mailto:mohamed.elhefni@outlook.com)

---
تمت البرمجه بكل ❤️ بواسطة [محمد الحفني](https://hefni101.netlify.app/)
`,
    },
    {
      id: 2,
      name: "مجلد",
      isFolder: true,
      isOpen: true,
      children: [
        {
          id: 3,
          name: "ملف",
          children: [],
          content: "",
        },
      ],
    },
  ]);
  let docsSearchResult = ref([])
  let searchName = ref("")
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
  } else {
    activeDoc.value = docs.value[0];
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


  return { docs, searchDocs: docsSearchResult, searchName, searchByName, addDocument, deleteDocument, activeDoc, setActiveDoc };
});
