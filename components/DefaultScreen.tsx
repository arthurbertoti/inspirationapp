import { ReactNode } from "react"
import { View } from "react-native"

export const DefaultScreen = ({ children }: { children: ReactNode }) => {
  return (
    <View className="flex flex-1 flex-col items-center justify-center content-center bg-background p-4">
      {children}
    </View>
  )
}
