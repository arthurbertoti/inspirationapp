import { useCallback, useState } from "react"
import { Text, Button, TouchableOpacity } from "react-native"
import { useFocusEffect } from "expo-router"
import { AxiosError } from "axios"

import { AdviceComponent, DefaultScreen, LoadingComponent } from "@/components"
import { Advice, ErrorMessage } from "@/models"
import { getRandomAdvice } from "@/services"
import { handleFavorite } from "@/utils"

export default function RandomScreen() {
  const [randomAdvice, setRandomAdvice] = useState<Advice | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRandomAdvice = async () => {
    try {
      setLoading(true)
      const [data, errorMessage] = await getRandomAdvice()
      if (errorMessage) {
        setErrorMessage(errorMessage)
        return
      }
      setRandomAdvice(data)
    } catch (error) {
      setError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleRandomAdvice()
    }, [])
  )

  return (
    <DefaultScreen>
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg mb-4"
        disabled={loading}
        onPress={() => handleRandomAdvice()}
      >
        <Text className="text-white text-lg">
          Press to take another random advice!
        </Text>
      </TouchableOpacity>
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <Text className="text-red-500">
          An error occurred! Try again restarting the app!
        </Text>
      ) : randomAdvice ? (
        <AdviceComponent
          advice={randomAdvice}
          copyToClipboard
          favoriteAdvice={() => handleFavorite(randomAdvice)}
          shareContent
        />
      ) : (
        errorMessage && (
          <Text className="text-red-500">{errorMessage.message.text}</Text>
        )
      )}
    </DefaultScreen>
  )
}
