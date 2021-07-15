import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import firebase from "../Firebase";

function SignupScreen(props) {
  const [showPass, setshowPass] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const DoCreateUser = async (e, p) => {
    try {
      let response = await firebase.auth().createUserWithEmailAndPassword(e, p);
      if (response) {
        console.log(response);
        props.navigation.navigate("Signin");
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Register</Text>
      </View>
      <View style={{ margin: 10, marginHorizontal: 25 }}>
        <TextInput
          placeholder="First Name"
          value={name}
          style={{
            borderBottomWidth: 1,
            borderColor: "black",
            padding: 10,
            fontSize: 16,
            margin: 5,
          }}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          placeholder="Your Email"
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
        <View style={{ justifyContent: "center" }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={showPass}
            value={password}
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
          <TouchableOpacity
            onPress={() => setshowPass(!showPass)}
            style={{ position: "absolute", right: 15, top: 25 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Show
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 5,
            borderBottomWidth: 1,
            borderColor: "#EBEBEB",
            padding: 25,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "black",
              padding: 12,
              paddingHorizontal: 80,
              borderRadius: 30,
            }}
            onPress={() => DoCreateUser(email, password)}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ margin: 20, marginVertical: 20 }}>
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
        <Text>Have an account?</Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.navigation.navigate("Signin")}
        >
          <Text style={{ color: "#1A76CB" }}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupScreen;
