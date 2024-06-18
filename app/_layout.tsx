import { Stack } from "expo-router"

import "../global.css"

import { LogLevel, OneSignal } from "react-native-onesignal"
import Constants from "expo-constants"

OneSignal.Debug.setLogLevel(LogLevel.Verbose)
OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId)

OneSignal.Notifications.requestPermission(true)

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}
