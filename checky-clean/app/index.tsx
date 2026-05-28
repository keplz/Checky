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

import {
  listenTasks,
  addTask,
  toggleTask
} from "../src/services/tasks"

import { useAppFonts } from "../src/styles/fonts"

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function App() {

  /* STATES */

  const [tasks, setTasks] = useState<any[]>([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [category, setCategory] =
    useState("Trabalho")

  const [newCategory, setNewCategory] =
    useState("")

  const [activeTab, setActiveTab] =
    useState("Todos")

  const [modalVisible, setModalVisible] =
    useState(false)

  const [
    categoryModalVisible,
    setCategoryModalVisible
  ] = useState(false)

  const [categoryExpanded, setCategoryExpanded] =
    useState(false)

  const [fabOpen, setFabOpen] =
    useState(false)

  const [categories, setCategories] = useState([
    "Todos",
    "Trabalho",
    "Pessoal",
    "Estudos"
  ])

  const [fontsLoaded] = useAppFonts()

  const slideAnim = useState(
    new Animated.Value(0)
  )[0]

  /* EFFECTS */

  useEffect(() => {

    const unsubscribe =
      listenTasks(setTasks)

    return () => unsubscribe()

  }, [])

  /* LOADING */

  if (!fontsLoaded) return null

  /* TASKS */

  async function handleAddTask() {

    if (!title.trim()) return

    await addTask({
      title,
      description,
      category
    })

    resetTaskForm()
  }

  async function handleToggleTask(
    id: string,
    status: string
  ) {

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    )

    await toggleTask(id, status)
  }

  function resetTaskForm() {

    setTitle("")
    setDescription("")
    setCategory("Trabalho")

    setCategoryExpanded(false)
    setModalVisible(false)
  }

  /* CATEGORY */

  function handleAddCategory() {

    const trimmed =
      newCategory.trim()

    if (!trimmed) return

    if (categories.includes(trimmed)) return

    setCategories([
      ...categories,
      trimmed
    ])

    setNewCategory("")
  }

  function handleRemoveCategory(
    categoryToRemove: string
  ) {

    if (categoryToRemove === "Todos")
      return

    setCategories(prev =>
      prev.filter(
        cat => cat !== categoryToRemove
      )
    )

    if (activeTab === categoryToRemove) {
      setActiveTab("Todos")
    }

    if (category === categoryToRemove) {
      setCategory("Trabalho")
    }
  }

  function handleChangeCategory(
    selectedCategory: string
  ) {

    slideAnim.setValue(40)

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true
    }).start()

    setActiveTab(selectedCategory)
  }

  /* FILTER */

  const filteredTasks =
    activeTab === "Todos"
      ? tasks.filter(
          task =>
            task.status !== "concluida"
        )
      : tasks.filter(
          task =>
            task.category === activeTab &&
            task.status !== "concluida"
        )

  /* RENDER */

  return (

    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          CheckyApp
        </Text>

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
            onPress={() =>
              handleChangeCategory(cat)
            }
            style={[
              styles.tabItem,
              activeTab === cat &&
              styles.tabItemActive
            ]}
          >

            <Text
              style={[
                styles.tabText,
                activeTab === cat &&
                styles.tabTextActive
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
          transform: [
            {
              translateX: slideAnim
            }
          ]
        }}
      >

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={
            styles.listContent
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (

            <View style={styles.card}>

              <TouchableOpacity
                style={styles.taskRow}
                activeOpacity={0.8}
                onPress={() =>
                  handleToggleTask(
                    item.id,
                    item.status
                  )
                }
              >

                {/* CHECKBOX */}
                <View
                  style={[
                    styles.checkbox,

                    item.status ===
                    "concluida" &&
                    styles.checkboxChecked
                  ]}
                />

                {/* CONTENT */}
                <View
                  style={styles.taskContent}
                >

                  <Text
                    style={[
                      styles.taskTitle,

                      item.status ===
                      "concluida" &&
                      styles.taskDone
                    ]}
                  >
                    {item.title}
                  </Text>

                  {!!item.description && (

                    <Text
                      style={
                        styles.taskDescription
                      }
                    >
                      {item.description}
                    </Text>

                  )}

                </View>

              </TouchableOpacity>

            </View>

          )}
        />

      </Animated.View>

      {/* FAB */}
      <View style={styles.footer}>

        {fabOpen && (

          <View style={styles.fabMenu}>

            <TouchableOpacity
              style={styles.fabOption}
              onPress={() => {

                setFabOpen(false)
                setModalVisible(true)

              }}
            >

              <Text
                style={
                  styles.fabOptionText
                }
              >
                Novo lembrete
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.fabOption}
              onPress={() => {

                setFabOpen(false)

                setCategoryModalVisible(
                  true
                )

              }}
            >

              <Text
                style={
                  styles.fabOptionText
                }
              >
                Nova categoria
              </Text>

            </TouchableOpacity>

          </View>

        )}

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() =>
            setFabOpen(!fabOpen)
          }
        >

          <Text style={styles.fabText}>
            {fabOpen ? "×" : "+"}
          </Text>

        </TouchableOpacity>

      </View>

      {/* MODAL TASK */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "position"} 
        >

          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => {

              setModalVisible(false)
              setCategoryExpanded(false)

            }}
          >
            <View />
          </TouchableOpacity>

          <View style={styles.modalContent}>

            <TextInput
              placeholder="Novo lembrete"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
              style={[
                styles.modalInput,
                styles.modalTitleInput
              ]}
            />

            <TextInput
              placeholder="Descrição"
              placeholderTextColor="#AAA"
              value={description}
              onChangeText={
                setDescription
              }
              style={
                styles.modalDescriptionLine
              }
            />

            {/* CATEGORY */}
            <TouchableOpacity
              style={styles.selectCategory}
              onPress={() =>
                setCategoryExpanded(
                  !categoryExpanded
                )
              }
            >

              <Text
                style={
                  styles.selectCategoryText
                }
              >
                {category}
              </Text>

              <Text
                style={
                  styles.selectCategoryArrow
                }
              >
                {categoryExpanded
                  ? "⌃"
                  : "⌄"}
              </Text>

            </TouchableOpacity>

            {/* DROPDOWN */}
            {categoryExpanded && (

              <View
                style={
                  styles.categoryDropdown
                }
              >

                {categories
                  .filter(
                    cat => cat !== "Todos"
                  )
                  .map((cat) => (

                  <TouchableOpacity
                    key={cat}
                    style={
                      styles.categoryOption
                    }
                    onPress={() => {

                      setCategory(cat)

                      setCategoryExpanded(
                        false
                      )

                    }}
                  >

                    <Text
                      style={
                        styles.categoryOptionText
                      }
                    >
                      {cat}
                    </Text>

                  </TouchableOpacity>

                ))}

              </View>

            )}

            {/* SAVE */}
            <View
              style={styles.modalFooterRow}
            >

              <TouchableOpacity
                style={
                  styles.floatingButton
                }
                onPress={handleAddTask}
              >

                <Text
                  style={
                    styles.floatingButtonText
                  }
                >
                  ✓
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        </KeyboardAvoidingView>

      </Modal>

      {/* MODAL CATEGORY */}
      <Modal
        visible={categoryModalVisible}
        transparent
        animationType="slide"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "position"}
        >


          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() =>
              setCategoryModalVisible(
                false
              )
            }
          >

            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContent}
            >

              <Text style={styles.modalTitle}>
                Categorias
              </Text>

              {/* LIST */}
              {categories
                .filter(
                  cat => cat !== "Todos"
                )
                .map((cat) => (

                <View
                  key={cat}
                  style={
                    styles.categoryManageItem
                  }
                >

                  <Text
                    style={
                      styles.categoryManageText
                    }
                  >
                    {cat}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      handleRemoveCategory(
                        cat
                      )
                    }
                  >

                    <Text
                      style={
                        styles.categoryDelete
                      }
                    >
                      ✕
                    </Text>

                  </TouchableOpacity>

                </View>

              ))}

              {/* ADD */}
              <View
                style={styles.addCategoryRow}
              >

                <TextInput
                  placeholder="Nova categoria"
                  placeholderTextColor="#999"
                  value={newCategory}
                  onChangeText={
                    setNewCategory
                  }
                  style={
                    styles.addCategoryInput
                  }
                />

                <TouchableOpacity
                  style={
                    styles.addCategoryButton
                  }
                  onPress={
                    handleAddCategory
                  }
                >

                  <Text
                    style={
                      styles.addCategoryButtonText
                    }
                  >
                    +
                  </Text>

                </TouchableOpacity>

              </View>

            </TouchableOpacity>

          </TouchableOpacity>

        </KeyboardAvoidingView>  

      </Modal>

    </View>

  )
}