import { useCallback, useState } from "react"
import { Alert, Text, View } from "react-native"
import { useFocusEffect } from "expo-router"
import * as Clipboard from "expo-clipboard"
import { AxiosError } from "axios"

import { favoriteAdvice, getAdviceById } from "@/services"

import { Advice, ErrorMessage } from "@/models"

import { AdviceComponent, DefaultScreen, LoadingComponent } from "@/components"

export default function HomeScreen() {
  const [dailyAdvice, setDailyAdvice] = useState<Advice | null>(null)
  const [error, setError] = useState<AxiosError | ErrorMessage | null>(null)
  const [errorOnFavorite, setErrorOnFavorite] = useState<ErrorMessage | null>(
    null
  )
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

  const handleFavorite = async (advice: Advice) => {
    try {
      const [response, errorMessage, error] = await favoriteAdvice(advice)
      if (errorMessage) {
        setErrorOnFavorite(errorMessage)
        Alert.alert(errorMessage.message.text, `"${advice.slip.advice}"`)
        return
      }
      Alert.alert("Message added to favorites!", `"${advice.slip.advice}"`)
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
    <DefaultScreen>
      {loading ? (
        <LoadingComponent />
      ) : dailyAdvice?.slip && !error ? (
        <AdviceComponent
          advice={dailyAdvice}
          copyToClipboard={() => handleCopy(dailyAdvice.slip.advice)}
          favoriteAdvice={() => handleFavorite(dailyAdvice)}
        />
      ) : (
        <Text>{"An error occurred! Try again restarting the app!"}</Text>
      )}
    </DefaultScreen>
  )
}
