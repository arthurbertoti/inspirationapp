import React from "react"
import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="random"
        options={{
          title: "Random",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="random" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bookmark-o" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
