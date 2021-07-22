import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Image, View, TouchableOpacity } from "react-native";

import BottomTabNavigator from "./BottomTabNavigator";
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
import MyOrders from "../screens/MyOrders";
import Saved from "../screens/Saved";
import Activity from "../screens/Activity";

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
        name="GroupCart"
        component={GroupCartScreen}
        options={({ navigation, route }) => ({
          headerShown: true,
          headerTitle: `${route.params.groupName}'s cart`,
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.navigate("Activity", {
                  groupName: route.params.groupName,
                })
              }
            >
              <Image
                source={require("../assets/icons/activity.png")}
                style={{ height: 28, width: 28, resizeMode: "center" }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={{
          headerTitle: "Activity",
          headerTitleAlign: "center",
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
        }}
      />
      <Stack.Screen
        name="AddAdress"
        component={Addnewadress}
        options={{
          headerTitle: "Add a new address",
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactusScreen}
        options={{
          headerTitle: "Contact Us",
        }}
      />
      <Stack.Screen
        name="Myorders"
        component={MyOrders}
        options={{
          headerTitle: "Orders",
        }}
      />
      <Stack.Screen
        name="Saved"
        component={Saved}
        options={{
          headerTitle: "Saved",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator initialRouteName="Phoneauth">
      <Stack.Screen
        name="Phoneauth"
        component={PhoneauthScreen}
        options={{
          headerTitle: "Enter your phone number",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerTitle: "",
        }}
      />
    </AuthStack.Navigator>
  );
}

function SplashScreen(props) {
  const getStorageValue = async () => {
    const islog = await AsyncStorage.getItem("isLoggedIn");
    return islog;
  };
  const [uid, setUID] = useState("");
  const UID = async () => {
    const UID = await AsyncStorage.getItem("UID");
    return UID;
  };

  useEffect(() => {
    getStorageValue().then(async (res) => {
      if (res === "1") {
        await UID()
          .then((res) => setUID(res))
          .then(() => (global.UID = uid))
          .then(() => props.navigation.navigate("root"));
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
