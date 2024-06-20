import AsyncStorage from "@react-native-async-storage/async-storage"
import { ADVICE_COLLECTION } from "@/storage/storageConfig"
import { Advice } from "@/models"

export async function getAllFavorites() {
  try {
    const storage = await AsyncStorage.getItem(ADVICE_COLLECTION)

    const advices: Advice[] | null = storage ? JSON.parse(storage) : null

    return advices
  } catch (error) {
    throw error
  }
}
