import { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager
} from "react-native"

import { styles } from "../src/styles/styles"
import { listenTasks, addTask } from "../src/services/tasks"
import { useAppFonts } from "../src/styles/fonts"
import { toggleTask } from "../src/services/tasks"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}


export default function App() {
  const [tasks, setTasks] = useState<any[]>([])
  const [searchText, setSearchText] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [priority, setPriority] = useState("Baixa")
  const [attachment, setAttachment] = useState("")
  const [category, setCategory] = useState("Trabalho")
  const [fontsLoaded] = useAppFonts()
  const [activeTab, setActiveTab] = useState("Todos")
  const [modalVisible, setModalVisible] = useState(false)

  const categories = ["Todos", "Trabalho", "Pessoal", "Estudos"]

  useEffect(() => {
    const unsubscribe = listenTasks(setTasks)
    return () => unsubscribe()
  }, [])

  if (!fontsLoaded) return null

  async function handleAddTask() {
    if (!title.trim()) return

    await addTask({
      title,
      description,
      dateTime,
      priority,
      attachment,
      category
    })

    setTitle("")
    setDescription("")
    setDateTime("")
    setPriority("Baixa")
    setAttachment("")
    setCategory("Trabalho")
  }

  async function handleToggleTask(id: string, status: string) {

  LayoutAnimation.configureNext(
    LayoutAnimation.Presets.easeInEaseOut
  )

  await toggleTask(id, status)
}

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>CheckyApp</Text>
        {/* <Text style={styles.menu}>☰</Text> */}
      </View>

      {/* TABS */}
{/*       <ScrollView
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
      </ScrollView> */}

      {/* LISTA */}
      <FlatList
        data={tasks.filter(task => task.status !== "concluida")}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.taskRow}
              onPress={() => handleToggleTask(item.id, item.status)}
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>+</Text>
        </TouchableOpacity>
      </View>
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
        >
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}
            />

              <TouchableOpacity 
                style={styles.modalContent}
                activeOpacity={1}
              >

                <TextInput
                  placeholder="Novo Lembrete"
                  placeholderTextColor="#000"
                  value={title}
                  onChangeText={setTitle}
                  style={[styles.modalInput, styles.modalTitleInput]}
                />

                <TextInput
                  placeholder="Descrição"
                  placeholderTextColor="#B3B3B3"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.modalDescriptionLine}
                  multiline={false}
                />

{/*                 <View style={styles.modalButtonRow}>
                  <TouchableOpacity style={styles.modalOptionButton}>
                    <Text style={styles.modalOptionText}>Data e Hora</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalOptionButton}>
                    <Text style={styles.modalOptionText}>Prioridade</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalOptionButton}>
                    <Text style={styles.modalOptionText}>Anexo</Text>
                  </TouchableOpacity>
                </View>
 */}
{/*                 <TouchableOpacity
                  style={styles.modalCategoryRow}
                  onPress={() => setCategory(category === "Trabalho" ? "Pessoal" : "Trabalho")}
                >
                  <Text style={styles.modalCategoryText}>{category}</Text>
                  <Text style={styles.modalCategoryArrow}>⌄</Text>
                </TouchableOpacity>
 */}
                <View style={styles.modalFooterRow}>
                  <View />
                  <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={async () => {
                      await handleAddTask()
                      setModalVisible(false)
                    }}
                  >
                    <Text style={styles.floatingButtonText}>✓</Text>
                  </TouchableOpacity>
                </View>

              </TouchableOpacity>
            </KeyboardAvoidingView>  

          </Modal>
        </View>
  )
}
