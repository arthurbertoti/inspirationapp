import { useCallback, useState } from "react"
import { Text, View } from "react-native"
import { useFocusEffect } from "expo-router"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { AxiosError } from "axios"

import { getAllFavorites } from "@/services"

import { Advice, ErrorMessage } from "@/models"

import { LoadingComponent } from "@/components"

export default function favoritesScreen() {
  const [favorites, setFavorites] = useState<Advice[] | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState(false)

  const [randomData, setRandomData] = useState<Advice | null>(null)

  const getSavedAdvices = async () => {
    try {
      setLoading(true)
      const savedAdvices = await getAllFavorites()
      setFavorites(savedAdvices)
    } catch (error) {
      setError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getSavedAdvices()
    }, [])
  )

  return (
    <View className="flex flex-1 items-center justify-center content-center gap-5">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <Text>An error occurred! Try again restarting the app!</Text>
      ) : favorites ? (
        favorites.map((advice) => (
          <View key={advice.slip.id}>
            <Text>{advice.slip.advice}</Text>
            <MaterialIcons size={14} name="delete-outline" color="black" />
          </View>
        ))
      ) : (
        <Text>
          You have no favorites! Try pressing "
          <FontAwesome size={14} name="save" color="black" />"
        </Text>
      )}
    </View>
  )
}