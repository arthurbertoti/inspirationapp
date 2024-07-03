import { useCallback, useState } from "react"
import { Text } from "react-native"
import { useFocusEffect } from "expo-router"
import { AxiosError } from "axios"

import { getDailyAdvice } from "@/services"

import { handleFavorite } from "@/utils"

import { DailyAdvice, ErrorMessage } from "@/models"

import { AdviceComponent, DefaultScreen, LoadingComponent } from "@/components"

export default function DailyAdviceScreen() {
  const [dailyAdvice, setDailyAdvice] = useState<DailyAdvice | null>(null)
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
          shareContent
        />
      ) : (
        <Text>{"An error occurred! Try again restarting the app!"}</Text>
      )}
    </DefaultScreen>
  )
}
