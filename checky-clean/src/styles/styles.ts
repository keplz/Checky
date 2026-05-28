import { StyleSheet } from "react-native"

export const colors = {
  background: "#F4F4F4",
  surface: "#FFFFFF",
  card: "#CFCFE8",
  primary: "#6C63FF",
  text: "#000000",
  textSecondary: "#555",
  border: "#E5E5E5",
  danger: "#FF4D4D"
}

export const styles = StyleSheet.create({

  /* CONTAINER */

  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  /* HEADER */

  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  title: {
    fontSize: 24,
    fontFamily: "Lexend",
    color: colors.text
  },

  menu: {
    fontSize: 24,
    color: colors.text
  },

  /* TABS */

  tabsScroll: {
    flexGrow: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },

  tabs: {
    paddingHorizontal: 20,
    alignItems: "center"
  },

  tabItem: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginRight: 18,
    borderBottomWidth: 2,
    borderBottomColor: "transparent"
  },

  tabItemActive: {
    borderBottomColor: colors.primary
  },

  tabText: {
    fontFamily: "Lexend",
    fontSize: 17,
    color: colors.textSecondary
  },

  tabTextActive: {
    color: colors.text
  },

  /* LISTA */

  listContent: {
    padding: 20,
    paddingBottom: 120
  },

  /* CARD */

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16
  },

  taskRow: {
    flexDirection: "row",
    alignItems: "center"
  },

  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  checkboxChecked: {
    backgroundColor: colors.primary
  },

  taskContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center"
  },

  taskTitle: {
    fontSize: 20,
    fontFamily: "Lexend",
    color: colors.text
  },

  taskDescription: {
    marginTop: 4,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Lexend",
    color: colors.textSecondary
  },

  taskDone: {
    opacity: 0.5,
    textDecorationLine: "line-through"
  },

  /* FOOTER */

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "flex-end"
  },

  /* FAB */

  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8
  },

  fabText: {
    color: colors.surface,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "300"
  },

  fabMenu: {
    position: "absolute",
    bottom: 95,
    right: 20,
    alignItems: "flex-end"
  },

  fabOption: {
    backgroundColor: colors.background,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 18,
    marginBottom: 12,

    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  },

  fabOptionText: {
    fontFamily: "Lexend",
    fontSize: 15,
    color: colors.text
  },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end"
  },

  modalContent: {
    backgroundColor: colors.background,
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    minHeight: 320
  },

  modalTitle: {
    fontSize: 30,
    fontFamily: "Lexend",
    color: colors.text,
    marginBottom: 24
  },

  /* INPUTS */

  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.textSecondary,
    paddingVertical: 14,
    fontSize: 17,
    fontFamily: "Lexend",
    color: colors.text
  },

  modalTitleInput: {
    fontSize: 24,
    borderBottomColor: "transparent"
  },

  modalDescriptionLine: {
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    paddingVertical: 14,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Lexend",
    color: colors.textSecondary
  },

  /* SELECT CATEGORY */

  selectCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: colors.textSecondary,
    borderRadius: 18,

    paddingHorizontal: 18,
    paddingVertical: 16,

    marginBottom: 14
  },

  selectCategoryText: {
    fontFamily: "Lexend",
    fontSize: 16,
    color: colors.text
  },

  selectCategoryArrow: {
    fontSize: 18,
    color: colors.textSecondary
  },

  categoryDropdown: {
    backgroundColor: colors.background,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24
  },

  categoryOption: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.background
  },

  categoryOptionText: {
    fontFamily: "Lexend",
    fontSize: 16,
    color: colors.textSecondary
  },

  /* CATEGORY MANAGER */

  categoryManageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.background
  },

  categoryManageText: {
    fontFamily: "Lexend",
    fontSize: 18,
    color: colors.text
  },

  categoryDelete: {
    fontSize: 22,
    color: colors.danger
  },

  /* ADD CATEGORY */

  addCategoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24
  },

  addCategoryInput: {
    flex: 1,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,

    paddingHorizontal: 16,
    paddingVertical: 14,

    marginRight: 12,

    fontFamily: "Lexend"
  },

  addCategoryButton: {
    width: 54,
    height: 54,
    borderRadius: 16,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center"
  },

  addCategoryButtonText: {
    color: colors.surface,
    fontSize: 28,
    lineHeight: 30,
    fontFamily: "Lexend"
  },

  /* MODAL FOOTER */

  modalFooterRow: {
    marginTop: 10,
    alignItems: "flex-end"
  },

  floatingButton: {
    width: 62,
    height: 62,
    borderRadius: 31,

    backgroundColor: colors.primary,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8
  },

  floatingButtonText: {
    color: colors.surface,
    fontSize: 28,
    lineHeight: 30,
    fontFamily: "Lexend"
  }

})