import { useCallback, useState } from "react"
import { Alert, Text, View } from "react-native"
import { useFocusEffect } from "expo-router"
import * as Clipboard from "expo-clipboard"
import { AxiosError } from "axios"

import { postFavoriteAdvice, getAdviceById } from "@/services"

import { handleFavorite } from "@/utils"

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
          copyToClipboard
          favoriteAdvice={() => handleFavorite(dailyAdvice)}
        />
      ) : (
        <Text>{"An error occurred! Try again restarting the app!"}</Text>
      )}
    </DefaultScreen>
  )
}
