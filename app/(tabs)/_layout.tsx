import React from "react"
import { Tabs } from "expo-router"
import { FontAwesome, Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "#666666",
        tabBarStyle: {
          backgroundColor: "#F4F4F9",
          borderTopColor: "#CCCCCC",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Daily Advice",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bulb-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="random"
        options={{
          title: "Random",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="random" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="bookmark-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell-o" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
