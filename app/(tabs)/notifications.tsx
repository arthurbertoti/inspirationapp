import { useCallback, useRef, useState } from "react"
import { useFocusEffect } from "expo-router"
import { OneSignal } from "react-native-onesignal"

import { Button, SafeAreaView, Text, TextInput, View } from "react-native"

import {
  createEveningAdviceTag,
  removeUserTag,
  createMorningAdviceTag,
  postNotification,
  getAllStoredNotifications,
} from "@/services"

import { DefaultScreen, EditNotification, LoadingComponent } from "@/components"

type Advices = {
  morning: string | null
  evening: string | null
}

export default function notificationsScreen() {
  const [advices, setAdvices] = useState<Advices>({
    morning: null,
    evening: null,
  })

  const [notification, setNotification] = useState<{
    morning: boolean
    evening: boolean
  }>({
    morning: false,
    evening: false,
  })

  const morningAdvice = useRef<TextInput>(null)
  const eveningAdvice = useRef<TextInput>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleGetUserTags = async () => {
    setLoading(true)
    try {
      const tags = await OneSignal.User.getTags()
      const storedNotifications = await getAllStoredNotifications()
      const morningStoredNotification = storedNotifications.find(
        (notification) => notification.schedule === "morning"
      )
      const eveningStoredNotification = storedNotifications.find(
        (notification) => notification.schedule === "evening"
      )

      setNotification({
        morning: Boolean(tags.morning_advice),
        evening: Boolean(tags.evening_advice),
      })

      setAdvices({
        morning: tags.morning_advice || morningStoredNotification?.text || null,
        evening: tags.evening_advice || eveningStoredNotification?.text || null,
      })
    } catch (error) {
      console.error("Error fetching tags:", error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveUserTags = async ({
    advice,
    tag,
    notificationEnabled,
    createAdviceTagFunction,
  }: {
    advice: string | null
    tag: "morning_advice" | "evening_advice"
    notificationEnabled: boolean
    createAdviceTagFunction: ({ text }: { text: string }) => void
  }) => {
    try {
      setLoading(true)
      if (advice !== null && advice !== "" && notificationEnabled === true) {
        await createAdviceTagFunction({ text: advice })
      } else removeUserTag(tag)
    } catch (error) {
      console.error("Error creating tags:", error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }
  const handleAsyncSaveNotification = async ({
    text,
    schedule,
  }: {
    text: string
    schedule: "morning" | "evening"
  }) => {
    try {
      await postNotification({ text: text, schedule: schedule })
    } catch (error) {
      setError(true)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleGetUserTags()
    }, [])
  )
  return (
    <DefaultScreen>
      <SafeAreaView className="w-full h-full justify-end">
        <View className="h-3/4 w-full">
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <View className="flex-1 pt-10 justify-between">
              <Text className="text-red-500 text-2xl font-bold text-center">
                Error loading settings!
              </Text>
              <Button
                title="Try again"
                onPress={handleGetUserTags}
                color={"red"}
              />
            </View>
          ) : (
            <View className="flex-1 justify-between">
              <View className="flex gap-4">
                <EditNotification
                  title="Morning notification"
                  scheduleText="(Sent at 6:00 AM, GMT-3)"
                  inputRef={morningAdvice}
                  onChangeText={(text: string) => {
                    setAdvices({ ...advices, morning: text })
                    setNotification({
                      ...notification,
                      morning: false,
                    })
                    handleAsyncSaveNotification({
                      text: text,
                      schedule: "morning",
                    })
                  }}
                  textValue={advices.morning ? advices.morning : ""}
                  placeholder="Type something nice for you!"
                  editable={!loading}
                  onToggle={() =>
                    advices.morning &&
                    setNotification({
                      ...notification,
                      morning: !notification.morning,
                    })
                  }
                  toggleValue={notification.morning}
                  onToggleValueChange={(value) =>
                    handleSaveUserTags({
                      advice: advices.morning,
                      tag: "morning_advice",
                      notificationEnabled: value,
                      createAdviceTagFunction: createMorningAdviceTag,
                    })
                  }
                  toggleDisabled={loading}
                />
                <EditNotification
                  title="Evening notification"
                  scheduleText="(Sent at 9:00 PM, GMT-3)"
                  inputRef={eveningAdvice}
                  onChangeText={(text: string) => {
                    setAdvices({ ...advices, evening: text })
                    setNotification({
                      ...notification,
                      evening: false,
                    })
                    handleAsyncSaveNotification({
                      text: text,
                      schedule: "evening",
                    })
                  }}
                  textValue={advices.evening ? advices.evening : ""}
                  placeholder="Type something nice for you!"
                  editable={!loading}
                  onToggle={() =>
                    advices.evening &&
                    setNotification({
                      ...notification,
                      evening: !notification.evening,
                    })
                  }
                  toggleValue={notification.evening}
                  onToggleValueChange={(value) =>
                    handleSaveUserTags({
                      advice: advices.evening,
                      tag: "evening_advice",
                      notificationEnabled: value,
                      createAdviceTagFunction: createEveningAdviceTag,
                    })
                  }
                  toggleDisabled={loading}
                />
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </DefaultScreen>
  )
}
