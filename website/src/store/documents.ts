import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useDocumentsStore = defineStore("documents", () => {
  let docs = ref([
    {
      id: 1,
      name: "الرئيسية",
      isFolder: false,
      isOpen: false,
      direction: 'rtl',
      children: [],
      content: `<h1 id="-">مرحبا بك في قلم 👋</h1>
<p>قلم هو موقع لتسجيل الملاحظات بشكل منظم بواجهة مستخدم بسيطه مخصص للغة العربية</p>
<hr>
<h2 id="-">طريقة الاستخدام</h2>
<ul>
<li>يمكنك انشاء ملف جديد عن طريق الضغط علي ايقونة <img src="https://khatat.vercel.app/Fileadd.svg" alt="ملف جديد"> </li>
<li>يمكنك انشاء مجلد جديد بالضغط علي ايقونة <img src="https://khatat.vercel.app/Folderadd.svg" alt=""></li>
<li>اضغط علي المجلد او الملف مرتين لتغير اسمه</li>
<li>لتحريك الملف داخل المجلد يجب عليك فتحه اولا ليكون بالشكل <img src="https://khatat.vercel.app/FolderOpen.svg" alt="مجلد مفتوح">  ثم قم بتحريك الملف بداخله</li>
</ul>
<hr>
<p><strong>تنبيه</strong> هذه نسخه تجريبيه بها الوظائف الاساسيه  تم انشائها في يوم واحد قد تحتوي علي بعض الاخطاء ولايوجد بها جميع الوظائف الخاصه بالموقع<br>للمشاركه او تقديم شكوي <a href="https://github.com/mohamedelhefni/qalam">Github</a>, <a href="mailto:mohamed.elhefni@outlook.com">Email</a></p>
<hr>
<p>تمت البرمجه بكل ❤️ بواسطة <a href="https://hefni101.netlify.app/">محمد الحفني</a></p>
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
          direction: 'rtl',
          children: [],
          content: "",
        },
      ],
    },
  ]);
  let docsSearchResult = ref([])
  let searchName = ref("")
  let activeDoc = ref();
  let deletedDocs = ref<any[]>([])
  let itemResult = ref({});

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

  const docsInLocalStore = localStorage.getItem("documents");
  if (docsInLocalStore) {
    const parsed = JSON.parse(docsInLocalStore);
    docs.value = Array.isArray(parsed) ? parsed : (parsed._value ?? []);
  }
  const activeDocInLocalStorage = localStorage.getItem("activeDoc");
  if (activeDocInLocalStorage) {
    const parsed = JSON.parse(activeDocInLocalStorage);
    let item = parsed?._value !== undefined ? parsed._value : parsed;
    activeDoc.value = getItem(item);
  } else {
    activeDoc.value = docs.value[0];
  }

  deletedDocs.value = getDeletedDocs(docs)

  watch(
    () => docs,
    (state) => {
      localStorage.setItem("documents", JSON.stringify(state.value));
    },
    { deep: true }
  );

  watch(
    () => activeDoc,
    (state) => {
      localStorage.setItem("activeDoc", JSON.stringify(state.value));
    },
    { deep: true }
  );

  function addDocument(doc: any) {
    if (!doc)
      return
    docs.value.push(doc);
  }

  function deleteDocument(doc: any) {
    doc.isDeleted = true;
    deletedDocs.value.push(doc)
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


  return { docs, searchDocs: docsSearchResult, searchName, searchByName, addDocument, deleteDocument, activeDoc, setActiveDoc, deletedDocs, restoreDeleted, rmDocument, toggleActiveDocDirection };
});
