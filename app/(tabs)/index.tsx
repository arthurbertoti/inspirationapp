import { useCallback, useState } from "react"
import { Alert, Text, View } from "react-native"
import { useFocusEffect } from "expo-router"
import * as Clipboard from "expo-clipboard"
import { AxiosError } from "axios"

import { getAdviceById } from "@/services"

import { Advice, ErrorMessage } from "@/models"

import { AdviceComponent, LoadingComponent } from "@/components"

export default function HomeScreen() {
  const [dailyAdvice, setDailyAdvice] = useState<Advice | null>(null)
  const [error, setError] = useState<AxiosError | ErrorMessage | null>(null)
  const [loading, setLoading] = useState(false)

  const getDailyAdvice = async () => {
    try {
      setDailyAdvice(null)
      setError(null)
      setLoading(true)
      const [response, error, callError] = await getAdviceById(4)
      if (error) {
        setError(error)
        return
      }
      setDailyAdvice(response)
    } catch (error) {
      setError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text)
      Alert.alert("Message copied!", `"${text}"`)
    } catch (error) {
      Alert.alert("Error!", "The message could not be copied!")
    }
  }

  useFocusEffect(
    useCallback(() => {
      getDailyAdvice()
    }, [])
  )

  return (
    <View className="flex flex-1 items-center justify-center content-center gap-5">
      {loading ? (
        <LoadingComponent />
      ) : dailyAdvice?.slip && !error ? (
        <AdviceComponent
          advice={dailyAdvice}
          copyToClipboard={() => handleCopy(dailyAdvice.slip.advice)}
        />
      ) : (
        <Text>{"An error occurred! Try again restarting the app!"}</Text>
      )}
    </View>
  )
}
