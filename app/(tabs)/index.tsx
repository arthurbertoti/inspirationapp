import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { getAdvice } from "@/services"
import { Advice } from "@/models"
import { AxiosError } from "axios"

export default function HomeScreen() {
  const [data, setData] = useState<Advice>()
  const [error, setError] = useState<AxiosError>()

  const get = async () => {
    const [response, error] = await getAdvice(1)
    if (error) {
      setError(error)
      return
    }
    setData(response)
  }

  useEffect(() => {
    get()
  }, [])

  return (
    <View className="flex flex-1 items-center justify-center content-center">
      <Text className="border border-black">Hello World!</Text>
      <Text className="border border-black">
        {data ? data.slip.advice : "nada3"}
      </Text>
    </View>
  )
}
