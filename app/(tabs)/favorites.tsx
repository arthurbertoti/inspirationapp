import { useCallback, useState } from "react"
import { Alert, FlatList, Text, View } from "react-native"
import { useFocusEffect } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"
import { AxiosError } from "axios"

import { deleteFavoriteAdvice, getAllFavorites } from "@/services"

import { Advice } from "@/models"

import { AdviceComponent, LoadingComponent } from "@/components"

export default function favoritesScreen() {
  const [favorites, setFavorites] = useState<Advice[] | null>(null)
  const [error, setError] = useState<AxiosError | null>(null)
  const [loading, setLoading] = useState(false)

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

  const handleDeleteAdvice = async (advice: Advice) => {
    Alert.alert(
      "Do you want unfavorite this advice?",
      `"${advice.slip.advice}"`,
      [
        {
          text: "OK",
          onPress: async () => {
            await deleteFavoriteAdvice(advice)
            await getSavedAdvices()
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    )
  }

  useFocusEffect(
    useCallback(() => {
      getSavedAdvices()
    }, [])
  )

  return (
    <View className="flex flex-1 items-center justify-center content-center gap-5 bg-background p-4">
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <Text className="text-textPrimary">
          An error occurred! Try again restarting the app!
        </Text>
      ) : favorites ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <AdviceComponent
              key={item.slip.id}
              advice={item}
              copyToClipboard
              deleteFromFavorites={() => handleDeleteAdvice(item)}
              shareContent
            />
          )}
          keyExtractor={(item) => item.slip.id.toString()}
        />
      ) : (
        <Text className="text-textSecondary">
          You have no favorites! Try pressing "
          <FontAwesome size={14} name="save" color="black" />"
        </Text>
      )}
    </View>
  )
}
