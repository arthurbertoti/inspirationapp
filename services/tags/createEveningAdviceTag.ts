import { OneSignal } from "react-native-onesignal"

export async function createEveningAdviceTag({ text }: { text: string }) {
  try {
    await OneSignal.User.addTags({
      evening_advice: text,
    })
  } catch (error) {
    return error
  }
}
