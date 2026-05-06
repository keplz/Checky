import { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native"

import { styles } from "../src/styles/styles"
import { listenTasks, addTask } from "../src/services/tasks"
import { useAppFonts } from "../src/styles/fonts"
import { toggleTask } from "../src/services/tasks"

export default function App() {
  const [tasks, setTasks] = useState<any[]>([])
  const [text, setText] = useState("")
  const [fontsLoaded] = useAppFonts()
  const [activeTab, setActiveTab] = useState("Todos")
  const categories = ["Todos", "Trabalho", "Pessoal", "Estudos"]

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

      {/* TABS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScroll}
        contentContainerStyle={styles.tabs}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveTab(cat)}
            style={[
              styles.tabItem,
              activeTab === cat && styles.tabItemActive
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === cat && styles.tabTextActive
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* LISTA */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.taskRow}
              onPress={() => toggleTask(item.id, item.status)}
            >
              {/* Checkbox */}
              <View style={[
                styles.checkbox,
                item.status === "concluida" && styles.checkboxChecked
              ]} />

              {/* Texto */}
              <Text
                style={[
                  styles.taskText,
                  item.status === "concluida" && styles.taskDone
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
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
