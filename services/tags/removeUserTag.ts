import { OneSignal } from "react-native-onesignal"

export async function removeUserTag(tag: "morning_advice" | "evening_advice") {
  try {
    await OneSignal.User.removeTag(tag)
  } catch (error) {
    return error
  }
}
