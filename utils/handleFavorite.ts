import { Alert } from "react-native"
import { Advice } from "@/models"
import { postFavoriteAdvice } from "@/services"

export const handleFavorite = async (advice: Advice) => {
  try {
    const [, errorMessage] = await postFavoriteAdvice(advice)
    if (errorMessage) {
      Alert.alert(errorMessage.message.text, `"${advice.slip.advice}"`)
      return
    }
    Alert.alert("Message added to favorites!", `"${advice.slip.advice}"`)
  } catch (error) {
    Alert.alert("Error!", "The message could not be copied!")
  }
}
