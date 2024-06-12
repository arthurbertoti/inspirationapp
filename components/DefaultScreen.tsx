import { ReactNode } from "react"
import { View } from "react-native"

export const DefaultScreen = ({ children }: { children: ReactNode }) => {
  return (
    <View
      className="flex h-full w-full flex-col items-center justify-center bg-gray-100
    p-4"
    >
      {children}
    </View>
  )
}
