import { Advice } from "@/models"
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

interface Props {
  advice: Advice
  copyToClipboard?: () => void
  favoriteAdvice?: () => void
  deleteFromFavorites?: () => void
}

export const AdviceComponent = ({
  advice,
  copyToClipboard,
  favoriteAdvice,
  deleteFromFavorites,
}: Props) => {
  return (
    <View className="border border-black">
      <Text key={advice.slip.id}>{advice.slip.advice}</Text>
      {copyToClipboard && (
        <TouchableOpacity onPress={copyToClipboard}>
          <MaterialIcons name="content-copy" size={18} color="black" />
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
