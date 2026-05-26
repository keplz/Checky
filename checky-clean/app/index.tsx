import { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
  Animated
} from "react-native"

import { styles } from "../src/styles/styles"
import { listenTasks, addTask, toggleTask } from "../src/services/tasks"
import { useAppFonts } from "../src/styles/fonts"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {

  const [tasks, setTasks] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [priority, setPriority] = useState("Baixa")
  const [attachment, setAttachment] = useState("")
  const [category, setCategory] = useState("Trabalho")

  const [fontsLoaded] = useAppFonts()

  const [activeTab, setActiveTab] = useState("Todos")
  const [modalVisible, setModalVisible] = useState(false)
  const [categoryModalVisible, setCategoryModalVisible] = useState(false)

  const [categories, setCategories] = useState([
    "Todos",
    "Trabalho",
    "Pessoal",
    "Estudos"
  ])

  const [newCategory, setNewCategory] = useState("")

  const slideAnim = useState(new Animated.Value(0))[0]

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

    setModalVisible(false)
  }

  function handleAddCategory() {

    if (!newCategory.trim()) return

    if (categories.includes(newCategory)) return

    setCategories([...categories, newCategory])

    setNewCategory("")
  }

  function handleRemoveCategory(categoryToRemove: string) {

    if (categoryToRemove === "Todos") return

    setCategories(
      categories.filter(cat => cat !== categoryToRemove)
    )

    if (activeTab === categoryToRemove) {
      setActiveTab("Todos")
    }
  }

  function handleChangeCategory(category: string) {

    Animated.sequence([

      Animated.timing(slideAnim, {
        toValue: -40,
        duration: 120,
        useNativeDriver: true
      }),

      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true
      })

    ]).start()

    setActiveTab(category)
  }

  async function handleToggleTask(id: string, status: string) {

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    )

    await toggleTask(id, status)
  }

  const filteredTasks =
    activeTab === "Todos"
      ? tasks.filter(task => task.status !== "concluida")
      : tasks.filter(
          task =>
            task.category === activeTab &&
            task.status !== "concluida"
        )

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>CheckyApp</Text>
        <TouchableOpacity
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={styles.menu}>☰</Text>
        </TouchableOpacity>
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
            onPress={() => handleChangeCategory(cat)}
            onLongPress={() => handleRemoveCategory(cat)}
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
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: slideAnim }]
        }}
      >

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (

            <View style={styles.card}>

              <TouchableOpacity
                style={styles.taskRow}
                onPress={() =>
                  handleToggleTask(item.id, item.status)
                }
              >

                {/* CHECKBOX */}
                <View
                  style={[
                    styles.checkbox,
                    item.status === "concluida" &&
                    styles.checkboxChecked
                  ]}
                />

                {/* CONTEÚDO */}
                <View style={styles.taskContent}>

                  <Text
                    style={[
                      styles.taskTitle,
                      item.status === "concluida" &&
                      styles.taskDone
                    ]}
                  >
                    {item.title}
                  </Text>

                  {item.description ? (
                    <Text style={styles.taskDescription}>
                      {item.description}
                    </Text>
                  ) : null}

                </View>

              </TouchableOpacity>

            </View>

          )}
        />

      </Animated.View>

      {/* BOTÃO */}
      <View style={styles.footer}>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            +
          </Text>
        </TouchableOpacity>

      </View>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={
            Platform.OS === "ios"
              ? "padding"
              : undefined
          }
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
              style={[
                styles.modalInput,
                styles.modalTitleInput
              ]}
            />

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#B3B3B3"
              value={description}
              onChangeText={setDescription}
              style={styles.modalDescriptionLine}
            />

            {/* CATEGORIAS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 20 }}
            >

              {categories
                .filter(cat => cat !== "Todos")
                .map((cat) => (

                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategory(cat)}
                  style={[
                    styles.modalCategoryButton,
                    category === cat &&
                    styles.modalCategoryButtonActive
                  ]}
                >

                  <Text
                    style={[
                      styles.modalCategoryButtonText,
                      category === cat &&
                      styles.modalCategoryButtonTextActive
                    ]}
                  >
                    {cat}
                  </Text>

                </TouchableOpacity>

              ))}

            </ScrollView>

            {/* FOOTER */}
            <View style={styles.modalFooterRow}>

              <View />

              <TouchableOpacity
                style={styles.floatingButton}
                onPress={handleAddTask}
              >
                <Text style={styles.floatingButtonText}>
                  ✓
                </Text>
              </TouchableOpacity>

            </View>

          </TouchableOpacity>

        </KeyboardAvoidingView>

      </Modal>

      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
      >

        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCategoryModalVisible(false)}
        >

          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalContent}
          >

            <Text style={styles.modalTitle}>
              Categorias
            </Text>

            {/* LISTA */}
            {categories
              .filter(cat => cat !== "Todos")
              .map((cat) => (

              <View
                key={cat}
                style={styles.categoryManageItem}
              >

                <Text style={styles.categoryManageText}>
                  {cat}
                </Text>

                <TouchableOpacity
                  onPress={() => handleRemoveCategory(cat)}
                >
                  <Text style={styles.categoryDelete}>
                    ✕
                  </Text>
                </TouchableOpacity>

              </View>

            ))}

            {/* ADICIONAR */}
            <View style={styles.addCategoryRow}>

              <TextInput
                placeholder="Nova categoria"
                value={newCategory}
                onChangeText={setNewCategory}
                style={styles.addCategoryInput}
              />

              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={handleAddCategory}
              >
                <Text style={styles.addCategoryButtonText}>
                  +
                </Text>
              </TouchableOpacity>

            </View>

          </TouchableOpacity>

        </TouchableOpacity>

      </Modal>

    </View>
  )
}