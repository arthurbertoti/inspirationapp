import { useCallback, useRef, useState } from "react"
import { useFocusEffect } from "expo-router"
import { OneSignal } from "react-native-onesignal"
import clsx from "clsx"

import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import {
  createEveningAdviceTag,
  removeUserTag,
  createMorningAdviceTag,
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
  const [editing, setEditing] = useState(false)

  const morningAdvice = useRef<TextInput>(null)
  const eveningAdvice = useRef<TextInput>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleGetUserTags = async () => {
    setLoading(true)
    try {
      const tags = await OneSignal.User.getTags()
      setNotification({
        morning: Boolean(tags.morning_advice),
        evening: Boolean(tags.evening_advice),
      })
      setAdvices({
        morning: tags.morning_advice ? tags.morning_advice : null,
        evening: tags.evening_advice ? tags.evening_advice : null,
      })
    } catch (error) {
      console.error("Error fetching tags:", error)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelEdit = async () => {
    setEditing(!editing)
  }

  const handleEdit = () => {
    setEditing(!editing)
  }

  const handleSaveUserTags = async () => {
    try {
      setEditing(false)
      setLoading(true)

      if (
        advices.evening !== null &&
        advices.evening !== "" &&
        notification.evening === true
      ) {
        await createEveningAdviceTag({ text: advices.evening })
      } else removeUserTag("evening_advice")

      if (
        advices.morning !== null &&
        advices.morning !== "" &&
        notification.morning === true
      ) {
        await createMorningAdviceTag({ text: advices.morning })
      } else removeUserTag("morning_advice")
    } catch (error) {
      console.error("Error creating tags:", error)
      setError(true)
    } finally {
      setLoading(false)
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
        <View className="h-3/4 w-full p-3">
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
            <View className="flex-1 justify-between ">
              <View className="flex gap-4">
                <EditNotification
                  title="Morning notification"
                  inputRef={morningAdvice}
                  onChangeText={(text: string) =>
                    setAdvices({ ...advices, morning: text })
                  }
                  textValue={advices.morning ? advices.morning : ""}
                  placeholder="Type something nice for you!"
                  editable={editing}
                  onToggle={() =>
                    setNotification({
                      ...notification,
                      morning: !notification.morning,
                    })
                  }
                  toggleValue={notification.morning}
                  toggleDisabled={!editing}
                />
                <EditNotification
                  title="Evening notification"
                  inputRef={eveningAdvice}
                  onChangeText={(text: string) =>
                    setAdvices({ ...advices, evening: text })
                  }
                  textValue={advices.evening ? advices.evening : ""}
                  placeholder="Type something nice for you!"
                  editable={editing}
                  onToggle={() =>
                    setNotification({
                      ...notification,
                      evening: !notification.evening,
                    })
                  }
                  toggleValue={notification.evening}
                  toggleDisabled={!editing}
                />
              </View>
              <View className="flex-row w-full justify-around items-center gap-2">
                <TouchableOpacity
                  className={clsx(
                    "bg-primary justify-self-end p-4 rounded-lg mb-1",
                    editing ? "w-2/5" : "w-4/5"
                  )}
                  onPress={() => (editing ? handleCancelEdit() : handleEdit())}
                >
                  <Text className="text-white text-2xl font-bold text-center">
                    {editing ? "Cancel" : "Edit"}
                  </Text>
                </TouchableOpacity>
                {editing && (
                  <TouchableOpacity
                    className={clsx(
                      "bg-primary justify-self-end p-4 rounded-lg mb-1",
                      editing ? "w-2/5" : "w-4/5"
                    )}
                    onPress={handleSaveUserTags}
                  >
                    <Text className="text-white text-2xl font-bold text-center">
                      Save
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </DefaultScreen>
  )
}
