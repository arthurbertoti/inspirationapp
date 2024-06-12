import { View, Text } from "react-native"
import { Link } from "expo-router"

import { DefaultScreen } from "@/components"

export default function RandomScreen() {
  return (
    <DefaultScreen>
      <Text>Settings</Text>
      <Link href="/qualquier">aperte aqui</Link>
    </DefaultScreen>
  )
}
