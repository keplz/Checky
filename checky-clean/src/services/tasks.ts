import { collection, addDoc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function listenTasks(setTasks: any) {
  return onSnapshot(collection(db, "tasks"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    setTasks(data)
  })
}

export async function addTask(title: string) {
  await addDoc(collection(db, "tasks"), {
    title,
    status: "pendente",
    createdAt: Date.now()
  })
}