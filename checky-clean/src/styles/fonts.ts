import { useFonts } from "expo-font"

export function useAppFonts() {
  return useFonts({
    Lexend: require("../assets/fonts/Lexend-Regular.ttf")
  })
}