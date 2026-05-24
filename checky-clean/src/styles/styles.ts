import { StyleSheet } from "react-native"

export const colors = {
  background: "#F4F4F4",
  card: "#CFCFE8",
  text: "#000",
  primary: "#6C63FF",
  border: "#DDD"
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontSize: 22,
    fontFamily: "Lexend"
  },

  menu: {
    fontSize: 22
  },

  tabsScroll: {
    flexGrow: 0,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#111"
  },

  tabs: {
    paddingHorizontal: 20,
    alignItems: "center"
  },

  tabActive: {
    fontSize: 16,
    fontFamily: "Lexend"
  },

  card: {
    backgroundColor: "#cfcfe8",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10
  },

  taskText: {
    fontFamily: "Lexend",
    fontSize: 16
  },

  footer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd"
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontFamily: "Lexend"
  },

  button: {
    width: 50,
    height: 50,
    backgroundColor: "#6C63FF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  tabItem: {
    minHeight: 38,
    justifyContent: "center",
    paddingHorizontal: 10,
    marginRight: 20
  },

  tabItemActive: {
  },

  tabText: {
    fontFamily: "Lexend",
    fontSize: 18,
    color: "#555"
  },

  tabTextActive: {
    color: "#000"
  },
  taskRow: {
  flexDirection: "row",
  alignItems: "center"
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#6C63FF",
    borderRadius: 5,
    marginRight: 10
  },

  checkboxChecked: {
    backgroundColor: "#6C63FF"
  },

  taskDone: {
    textDecorationLine: "line-through",
    opacity: 0.5
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.3)",
  justifyContent: "flex-end"
},

modalContent: {
  backgroundColor: "#fff",
  padding: 25,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
  minHeight: 300
},

modalTitle: {
  fontSize: 32,
  fontFamily: "Lexend",
  marginBottom: 20
},

modalLabel: {
  fontSize: 16,
  fontFamily: "Lexend",
  color: "#555",
  marginBottom: 8
},

modalInput: {
  borderBottomWidth: 1,
  borderColor: "#E3E3E8",
  paddingVertical: 14,
  fontSize: 18,
  fontFamily: "Lexend",
  color: "#1B1B1B"
},

modalTitleInput: {
  borderColor: "transparent",
  fontSize: 22,
  fontWeight: "700",
  color: "#000",
},

modalDescriptionLine: {
  borderBottomWidth: 1,
  borderColor: "#E3E3E8",
  height: 44,
  paddingVertical: 6,
  fontSize: 16,
  fontFamily: "Lexend",
  color: "#292929",
  marginBottom: 18,
  backgroundColor: "transparent"
},

modalDescriptionInput: {
  minHeight: 100,
  textAlignVertical: "top",
  fontSize: 16,
  color: "#444"
},

modalButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 25
},

modalOptionButton: {
  flex: 1,
  backgroundColor: "#F3F3F3",
  borderRadius: 16,
  paddingVertical: 12,
  paddingHorizontal: 10,
  marginHorizontal: 4,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "#E4E4E4"
},

modalOptionText: {
  fontSize: 15,
  fontFamily: "Lexend",
  color: "#2F2F2F"
},

modalCategoryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "transparent",
  borderRadius: 16,
  paddingVertical: 12,
  paddingHorizontal: 0,
  marginBottom: 30,
  borderWidth: 0
},

modalCategoryText: {
  fontSize: 16,
  fontFamily: "Lexend",
  color: "#333"
},

modalCategoryArrow: {
  fontSize: 18,
  color: "#888"
},

modalFooterRow: {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center"
},

floatingButton: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#6C63FF",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 10
},

floatingButtonText: {
  color: "#fff",
  fontSize: 28,
  lineHeight: 32,
  fontFamily: "Lexend"
},

saveButton: {
  backgroundColor: "#6C63FF",
  padding: 15,
  borderRadius: 12,
  alignItems: "center"
},

saveButtonText: {
  color: "#fff",
  fontFamily: "Lexend",
  fontSize: 18
},
})
