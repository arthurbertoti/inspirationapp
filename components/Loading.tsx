import { ActivityIndicator, View } from "react-native"

export const LoadingComponent = ({
  size = "large",
}: {
  size?: "large" | "small"
}) => {
  return (
    <View className="pt-10">
      <ActivityIndicator size={size} color="blue" />
    </View>
  )
}
