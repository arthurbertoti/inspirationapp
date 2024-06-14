import { useCallback, useState } from "react"
import { Text } from "react-native"
import { useFocusEffect } from "expo-router"
import { AxiosError } from "axios"

import { getDailyAdvice } from "@/services"

import { handleFavorite } from "@/utils"

import { Advice, ErrorMessage } from "@/models"

import { AdviceComponent, DefaultScreen, LoadingComponent } from "@/components"

export default function HomeScreen() {
  const [dailyAdvice, setDailyAdvice] = useState<Advice | null>(null)
  const [error, setError] = useState<AxiosError | ErrorMessage | null>(null)
  const [loading, setLoading] = useState(false)

  const handleGetDailyAdvice = async () => {
    try {
      setDailyAdvice(null)
      setError(null)
      setLoading(true)
      const [response, error] = await getDailyAdvice()
      if (error) {
        setError(error)
        console.log(error)
        return
      }
      setDailyAdvice(response)
    } catch (error) {
      console.log(error)
      setError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleGetDailyAdvice()
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
