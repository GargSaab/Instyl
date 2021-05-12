import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Image, Text, View } from "react-native";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";

import BottomTabNavigator from "./BottomTabNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          title: "Instyl",
          headerRight: () => (
            <Image
              source={require("../icons/cart.jpeg")}
              style={{ width: 50, height: 30, right: 10 }}
            />
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={({ route, navigation }) => ({
          title: route.params.name,
          headerTitleStyle: { marginLeft: 10 },
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
                marginLeft: 6,
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
              </TouchableOpacity>
              <Image
                source={{ uri: route.params.image }}
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 30,
                }}
              />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                width: 110,
                justifyContent: "space-between",
                marginRight: 10,
              }}
            >
              <MaterialCommunityIcons
                name="bookmark-minus-outline"
                size={32}
                color="black"
              />
              <FontAwesome5 name="shopping-bag" size={27} color="black" />
              <SimpleLineIcons
                name="options-vertical"
                size={26}
                color="black"
              />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
