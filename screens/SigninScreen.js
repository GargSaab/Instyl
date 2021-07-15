import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import firebase from "../Firebase";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const DoSingIn = async (e, p) => {
    try {
      let response = await firebase.auth().signInWithEmailAndPassword(e, p);
      if (response && response.user) {
        props.navigation.navigate("Root");
        console.log(response);
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          padding: 15,
          paddingTop: 60,
          borderBottomWidth: 1,
          borderColor: "#EBEBEB",
          marginLeft: 15,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Sign In</Text>
      </View>
      <View style={{ margin: 10, marginHorizontal: 25 }}>
        <TextInput
          placeholder="Email or Username"
          value={email}
          style={{
            borderBottomWidth: 1,
            borderColor: "black",
            padding: 10,
            fontSize: 16,
            margin: 5,
          }}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          style={{
            borderBottomWidth: 1,
            borderColor: "black",
            padding: 10,
            fontSize: 16,
            margin: 5,
            marginTop: 15,
          }}
          onChangeText={(text) => setPassword(text)}
        />
        <View
          style={{
            marginTop: 25,
            borderBottomWidth: 1,
            borderColor: "#EBEBEB",
            flexDirection: "row",
            padding: 25,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 25,
              backgroundColor: "black",
              padding: 12,
              paddingHorizontal: 20,
              borderRadius: 20,
            }}
            onPress={() => DoSingIn(email, password)}
          >
            <Text style={{ color: "white", fontSize: 15 }}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: 20, marginVertical: 40 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#1A76CB",
            marginHorizontal: 25,
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/icons/google.png")}
            style={{ height: 30, width: 30, position: "absolute", left: 10 }}
          />
          <Text style={{ color: "white", fontSize: 18 }}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#1365B1",
            marginHorizontal: 25,
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
            borderRadius: 10,
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/icons/facebook.png")}
            style={{ height: 30, width: 30, position: "absolute", left: 10 }}
          />
          <Text style={{ color: "white", fontSize: 18 }}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text>Don't have an account?</Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Signup")}
        >
          <Text style={{ color: "#1A76CB" }}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SigninScreen;
