import { useEffect, useState } from "react"
import { View, Text, TextInput, Button, FlatList } from "react-native"

import { getTasks, addTask } from "../../src/services/tasks"

export default function App() {
  const [tasks, setTasks] = useState<any[]>([])
  const [text, setText] = useState("")

  async function loadTasks() {
    const data = await getTasks()
    setTasks(data)
  }

  async function handleAddTask() {
    if (!text.trim()) return

    await addTask(text)
    setText("")
    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <View style={{ padding: 20, marginTop: 40 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Checky ✅
      </Text>

      <TextInput
        placeholder="Digite uma tarefa..."
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          padding: 10,
          marginTop: 10,
          borderRadius: 8
        }}
      />

      <Button title="Adicionar" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ marginTop: 10 }}>
            • {item.title}
          </Text>
        )}
      />
    </View>
  )
}