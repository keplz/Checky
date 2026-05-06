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
})
