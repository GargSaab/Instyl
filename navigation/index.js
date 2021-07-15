import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Alert, Image, Modal, Text, View } from "react-native";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  SimpleLineIcons,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

import BottomTabNavigator from "./BottomTabNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";
import EditGroupInfoScreen from "../screens/EditGroupInfoScreen";
import CreateGroupsScreen from "../screens/CreateGroupsScreen";
import ChangeGroupImageScreen from "../screens/ChangeGroupImageScreen";
import EditGroupNameScreen from "../screens/EditGroupNameScreen";
import ProductScreen from "../screens/ProductScreen";
import ShoppingBagScreen from "../screens/ShoppingBagScreen";
import PhoneauthScreen from "../screens/PhoneauthScreen";
import OTPScreen from "../screens/OTPScreen";
import { ActivityIndicator } from "react-native-paper";
import EditProfileScreen from "../screens/EditProfileScreen";
import ContactusScreen from "../screens/ContactusScreen";
import GroupCartScreen from "../screens/GroupCartScreen";
import ShoppingBagGroup from "../screens/ShoppingBagGroup";
import AddGroup from "../screens/AddGroup";
import Adress from "../screens/Adress";
import Addnewadress from "../screens/AddNewAdress";
import firebase from "../Firebase";

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Splash">
        <Drawer.Screen name="Splash" component={SplashScreen} />
        <Drawer.Screen name="Auth" component={AuthNavigator} />
        <Drawer.Screen name="root" component={RootNavigator} />
      </Drawer.Navigator>
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
          headerShown: false,
          // title: "Instyl",
          // headerRight: () => (
          //   <Image
          //     source={require("../icons/cart.jpeg")}
          //     style={{ width: 50, height: 30, right: 10 }}
          //   />
          // ),
          // headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ChatRoomScreen"
        component={ChatRoomScreen}
        options={({ route, navigation }) => ({
          headerTitleStyle: { display: "none" },

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
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() =>
                  navigation.navigate("EditGroupInfo", {
                    name: route.params.name,
                    image: route.params.image,
                    id: route.params.id,
                    groupId: route.params.docid,
                  })
                }
              >
                <Image
                  source={{ uri: route.params.image }}
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: 30,
                  }}
                />
                <Text
                  style={{ marginLeft: 8, fontSize: 18, fontWeight: "bold" }}
                >
                  {route.params.name}
                </Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("GroupCart", {
                    groupName: route.params.name,
                  })
                }
              >
                <FontAwesome5 name="shopping-bag" size={27} color="black" />
              </TouchableOpacity>
              <SimpleLineIcons
                name="options-vertical"
                size={26}
                color="black"
              />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="EditGroupInfo"
        component={EditGroupInfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangeGroupIcon"
        component={ChangeGroupImageScreen}
        options={{
          headerTitle: "Group Icon",
          headerStyle: {
            backgroundColor: "black",
          },
          headerTintColor: "white",
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <MaterialIcons name="edit" size={28} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditGroupName"
        component={EditGroupNameScreen}
        options={{
          headerTitle: "Enter new name",
        }}
      />
      <Stack.Screen
        name="CreateGroups"
        component={CreateGroupsScreen}
        options={{
          headerTitle: "Create a group",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ProductPage"
        component={ProductScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupCart"
        component={GroupCartScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: `${route.params.groupName}'s cart`,
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="ShoppingBag"
        component={ShoppingBagScreen}
        options={{
          headerTitle: "Shopping Bag",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ShoppingBagGroup"
        component={ShoppingBagGroup}
        options={{
          headerTitle: "Shopping Bag",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AddGroup"
        component={AddGroup}
        options={{
          headerTitle: "Create Your Group",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: "Update Profile",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Adress"
        component={Adress}
        options={{
          headerTitle: "Address",
          // headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AddAdress"
        component={Addnewadress}
        options={{
          headerTitle: "Add a new address",
          // headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactusScreen}
        options={{
          headerTitle: "Contact Us",
          // headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Phoneauth">
      <Stack.Screen
        name="Phoneauth"
        component={PhoneauthScreen}
        options={{
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
function SplashScreen(props) {
  const getStorageValue = async () => {
    const islog = await AsyncStorage.getItem("isLoggedIn");
    return islog;
  };
  useEffect(() => {
    getStorageValue().then((res) => {
      if (res === "1") {
        props.navigation.navigate("root");
      } else {
        props.navigation.navigate("Auth");
      }
    });
  });

  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
