import { collection, addDoc, onSnapshot } from "firebase/firestore"
import { doc, updateDoc } from "firebase/firestore"
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

type TaskPayload = {
  title: string
  description?: string
  dateTime?: string
  priority?: string
  attachment?: string
  category?: string
}

export async function addTask(task: TaskPayload) {
  await addDoc(collection(db, "tasks"), {
    ...task,
    status: "pendente",
    createdAt: Date.now()
  })
}

export async function toggleTask(id: string, currentStatus: string) {
  await updateDoc(doc(db, "tasks", id), {
    status: currentStatus === "concluida" ? "pendente" : "concluida"
  })
}