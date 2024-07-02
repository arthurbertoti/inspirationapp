import { AxiosError } from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllStoredNotifications } from "./getAllStoredNotifications"

import { NOTIFICATION_COLLECTION } from "@/storage/storageConfig"

import { StoredNotification, RequestResponse } from "@/models"

export async function postNotification(
  newNotification: StoredNotification
): Promise<RequestResponse<StoredNotification>> {
  try {
    const storedNotifications = await getAllStoredNotifications()
    let notificationFound = false
    const updatedNotifications = storedNotifications.map((notification) => {
      if (notification.schedule === newNotification.schedule) {
        notificationFound = true
        return {
          ...notification,
          text: newNotification.text,
        } as StoredNotification
      }
      return notification as StoredNotification
    })

    if (!notificationFound) {
      updatedNotifications.push(newNotification)
    }
    await AsyncStorage.setItem(
      NOTIFICATION_COLLECTION,
      JSON.stringify(updatedNotifications)
    )
    return [newNotification, null, null]
  } catch (error) {
    throw [null, null, error as AxiosError]
  }
}
