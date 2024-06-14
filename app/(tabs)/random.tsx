import { useCallback, useState } from "react"
import { Text, Button } from "react-native"
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
      <Button
        title="Press to take another random advice!"
        onPress={() => handleRandomAdvice()}
      />
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <Text>An error occurred! Try again restarting the app!</Text>
      ) : randomAdvice ? (
        <AdviceComponent
          advice={randomAdvice}
          copyToClipboard
          favoriteAdvice={() => handleFavorite(randomAdvice)}
        />
      ) : (
        errorMessage && <Text>{errorMessage.message.text}</Text>
      )}
    </DefaultScreen>
  )
}
