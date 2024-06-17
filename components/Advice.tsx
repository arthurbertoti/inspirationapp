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
    <View className="border border-black">
      <Text key={advice.slip.id}>{advice.slip.advice}</Text>
      {copyToClipboard && (
        <TouchableOpacity onPress={() => handleCopy(advice.slip.advice)}>
          <MaterialIcons name="content-copy" size={18} color="black" />
        </TouchableOpacity>
      )}
      {shareContent && (
        <TouchableOpacity onPress={() => handleShare(advice.slip.advice)}>
          <FontAwesome name="share-alt" size={24} color="black" />
        </TouchableOpacity>
      )}
      {favoriteAdvice && (
        <TouchableOpacity onPress={favoriteAdvice}>
          <FontAwesome size={18} name="bookmark-o" color="black" />
        </TouchableOpacity>
      )}
      {deleteFromFavorites && (
        <TouchableOpacity onPress={deleteFromFavorites}>
          <MaterialIcons size={18} name="delete-outline" color="black" />
        </TouchableOpacity>
      )}
    </View>
  )
}
