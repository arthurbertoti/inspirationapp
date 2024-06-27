import { RefObject } from "react"
import { Switch, Text, TextInput, View } from "react-native"

type EditNotificationProps = {
  title: string
  inputRef: RefObject<TextInput>
  onChangeText: (text: string) => void
  textValue: string
  placeholder: string
  editable: boolean
  onToggle: () => void
  toggleValue: boolean
  toggleDisabled: boolean
}
export const EditNotification = ({
  title,
  inputRef,
  onChangeText,
  textValue,
  placeholder,
  editable,
  onToggle,
  toggleValue,
  toggleDisabled,
}: EditNotificationProps) => {
  return (
    <View className="flex-row w-full justify-between gap-2 px-4">
      <View>
        <Text>{title}</Text>
        <TextInput
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
        value={toggleValue}
        onChange={onToggle}
        disabled={toggleDisabled}
      />
    </View>
  )
}
