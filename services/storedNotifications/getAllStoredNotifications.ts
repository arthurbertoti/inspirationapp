import AsyncStorage from "@react-native-async-storage/async-storage"
import { NOTIFICATION_COLLECTION } from "@/storage/storageConfig"
import { StoredNotification } from "@/models"

export async function getAllStoredNotifications() {
  try {
    const storage = await AsyncStorage.getItem(NOTIFICATION_COLLECTION)

    const notifications: StoredNotification[] | [] = storage
      ? JSON.parse(storage)
      : []

    return notifications
  } catch (error) {
    throw error
  }
}
