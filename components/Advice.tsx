import { Alert, Share, Text, TouchableOpacity, View } from "react-native"
import * as Clipboard from "expo-clipboard"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"

import { Advice } from "@/models"

interface Props {
  advice: Advice
  copyToClipboard: boolean
  shareContent?: boolean
  favoriteAdvice?: () => void
  deleteFromFavorites?: () => void
}

export const AdviceComponent = ({
  advice,
  copyToClipboard,
  shareContent = false,
  favoriteAdvice,
  deleteFromFavorites,
}: Props) => {
  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text)
      Alert.alert("Message copied!", `"${text}"`)
    } catch (error) {
      Alert.alert("Error!", "The message could not be copied!")
    }
  }
  const handleShare = async (text: string) => {
    try {
      await Share.share({
        message: text,
      })
    } catch (error) {
      Alert.alert("Error!", "The message could not be shared!")
    }
  }
  return (
    <View className="border border-border p-4 mb-4 bg-white rounded-lg shadow-md">
      <Text className="text-textPrimary mb-2" key={advice.slip.id}>
        {advice.slip.advice}
      </Text>
      <View className="flex flex-row gap-x-3">
        {copyToClipboard && (
          <TouchableOpacity onPress={() => handleCopy(advice.slip.advice)}>
            <MaterialIcons name="content-copy" size={18} color="#6C63FF" />
          </TouchableOpacity>
        )}
        {shareContent && (
          <TouchableOpacity onPress={() => handleShare(advice.slip.advice)}>
            <FontAwesome name="share-alt" size={22} color="#6C63FF" />
          </TouchableOpacity>
        )}
        {favoriteAdvice && (
          <TouchableOpacity onPress={favoriteAdvice}>
            <FontAwesome size={22} name="bookmark-o" color="#6C63FF" />
          </TouchableOpacity>
        )}
        {deleteFromFavorites && (
          <TouchableOpacity onPress={deleteFromFavorites}>
            <MaterialIcons size={22} name="delete-outline" color="#FF6347" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
