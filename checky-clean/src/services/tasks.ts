import { collection, addDoc, getDocs } from "firebase/firestore"
import { db } from "../firebase/config"

export async function getTasks() {
  const snapshot = await getDocs(collection(db, "tasks"))

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

export async function addTask(title: string) {
  await addDoc(collection(db, "tasks"), {
    title,
    status: "pendente",
    createdAt: Date.now()
  })
}