import { useCallback, useState } from "react"
import { SafeAreaView, Switch, TextInput, View } from "react-native"

import { DefaultScreen } from "@/components"
import { OneSignal } from "react-native-onesignal"
import { useFocusEffect } from "expo-router"

export default function notificationsScreen() {
  const [morningAdvice, setMorningAdvice] = useState("")
  const [eveningAdvice, setEveningAdvice] = useState("")
  const [morningNotification, setMorningNotification] = useState(false)
  const [eveningNotification, setEveningNotification] = useState(false)

  const getUserTags = async () => {
    try {
      const tags = await OneSignal.User.getTags()
      setMorningAdvice(tags.morning_advice)
      setEveningAdvice(tags.evening_advice)
    } catch (error) {
      console.error("Error fetching tags:", error)
    }
  }
  useFocusEffect(
    useCallback(() => {
      getUserTags()
    }, [])
  )
  return (
    <DefaultScreen>
      <SafeAreaView>
        <View>
          <Switch
            value={morningNotification}
            onValueChange={setMorningNotification}
          />
          {morningNotification && (
            <TextInput
              onChangeText={setMorningAdvice}
              value={morningAdvice}
              placeholder="morning notification"
            />
          )}
        </View>
        <View>
          <Switch
            value={eveningNotification}
            onValueChange={setEveningNotification}
          />
          {eveningNotification && (
            <TextInput
              onChangeText={setEveningAdvice}
              value={eveningAdvice}
              placeholder="evening notification"
            />
          )}
        </View>
      </SafeAreaView>
    </DefaultScreen>
  )
}
