import { OneSignal } from "react-native-onesignal"

export async function createMorningAdviceTag({ text }: { text: string }) {
  try {
    await OneSignal.User.addTags({
      morning_advice: text,
    })
  } catch (error) {
    return error
  }
}
