import { RefObject } from "react"
import { Switch, Text, TextInput, View } from "react-native"

type EditNotificationProps = {
  title: string
  scheduleText: string
  inputRef: RefObject<TextInput>
  onChangeText: (text: string) => void
  textValue: string
  placeholder: string
  editable: boolean
  onToggle: () => void
  onToggleValueChange: (value: boolean) => void | Promise<void>
  toggleValue: boolean
  toggleDisabled: boolean
}
export const EditNotification = ({
  title,
  inputRef,
  scheduleText,
  onChangeText,
  textValue,
  placeholder,
  editable,
  onToggle,
  onToggleValueChange,
  toggleValue,
  toggleDisabled,
}: EditNotificationProps) => {
  return (
    <View className="flex-row w-full justify-between gap-2 px-4">
      <View className="max-w-[80%]">
        <View className="flex-row">
          <Text className="font-bold text-2xl">{title}</Text>
          <Text className="text-xs">{scheduleText}</Text>
        </View>
        <TextInput
          maxLength={100}
          style={{
            paddingBottom: 3,
            paddingStart: 1,
            borderBottomColor: "#3e3e3e",
            borderBottomWidth: 1,
            width: "100%",
            fontSize: 16,
          }}
          ref={inputRef}
          onChangeText={onChangeText}
          value={textValue}
          placeholder={placeholder}
          editable={editable}
          autoCorrect={false}
          returnKeyType="done"
        />
      </View>
      <Switch
        style={{
          width: "20%",
        }}
        value={toggleValue}
        onChange={onToggle}
        onValueChange={onToggleValueChange}
        disabled={toggleDisabled}
      />
    </View>
  )
}
