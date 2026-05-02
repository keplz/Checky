import { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native"

import { styles } from "../src/styles/styles"
import { listenTasks, addTask } from "../src/services/tasks"
import { useAppFonts } from "../src/styles/fonts"

export default function App() {
  const [tasks, setTasks] = useState<any[]>([])
  const [text, setText] = useState("")
  const [fontsLoaded] = useAppFonts()

  useEffect(() => {
    const unsubscribe = listenTasks(setTasks)
    return () => unsubscribe()
  }, [])

  if (!fontsLoaded) return null

  async function handleAddTask() {
    if (!text.trim()) return

    await addTask(text)
    setText("")
  }

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>CheckyApp</Text>
        <Text style={styles.menu}>☰</Text>
      </View>

      {/* TABS (fake por enquanto) */}
      <View style={styles.tabs}>
        <Text style={styles.tabActive}>Todos</Text>
      </View>

      {/* LISTA */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.taskText}>{item.title}</Text>
          </View>
        )}
      />

      {/* INPUT + BOTÃO */}
      <View style={styles.footer}>
        <TextInput
          placeholder="Nova tarefa..."
          value={text}
          onChangeText={setText}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddTask}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}