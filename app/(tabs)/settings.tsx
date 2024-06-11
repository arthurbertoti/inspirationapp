import Ionicons from "@expo/vector-icons/Ionicons"
import { Link } from "expo-router"
import { View, Text } from "react-native"

export default function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
      <Link href="/qualquier">aperte aqui</Link>
    </View>
  )
}
