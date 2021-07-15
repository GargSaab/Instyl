import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import firebase from "../Firebase";

function ProfileScreen(props) {
  const signout = async () => {
    AsyncStorage.setItem("isLoggedIn", "0");
    AsyncStorage.setItem("UID", "");
    await props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        key: "null",
        routes: [{ name: "Auth" }],
      })
    );
    // await props.navigation.navigate("Auth", { screen: "Phoneauth" });
    firebase.auth().signOut();
  };

  const [userdata, setUserdata] = useState("");
  const fetchData = () => {
    const db = firebase.firestore();
    const uid = firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(uid)
      .get()
      .then((snapshot) => {
        setUserdata(snapshot.data());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          padding: 15,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#E5E5E5",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile</Text>
      </View>
      <View
        style={{
          marginTop: 10,
          paddingVertical: 30,
          paddingHorizontal: 20,
          backgroundColor: "white",
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#E5E5E5",
        }}
      >
        <TouchableOpacity>
          <Image
            source={{
              uri: userdata.picture,
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 60,
              resizeMode: "center",
            }}
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 30, flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {userdata.name}
          </Text>
          <Text style={{ fontSize: 12, color: "grey" }}>{userdata.uid}</Text>
          <Text style={{ fontSize: 12, color: "grey" }}>{userdata.number}</Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 5 }}
            onPress={() =>
              props.navigation.navigate("EditProfile", {
                uid: userdata.uid,
                name: userdata.name,
                picture: userdata.picture,
              })
            }
          >
            <Feather name="edit" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: "40%",
          backgroundColor: "white",
          alignSelf: "center",
          marginTop: 10,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#E5E5E5",
        }}
      >
        <Image
          source={require("../assets/icons/saved.png")}
          style={{ height: 30, width: 30, resizeMode: "center" }}
        />
        <Text style={{ fontSize: 18, marginLeft: 10 }}>Saved</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 15,
          marginTop: 15,
          borderBottomWidth: 1,
          borderColor: "#E5E5E5",
          justifyContent: "center",
        }}
        onPress={() => props.navigation.navigate("Adress")}
      >
        <Text style={{ fontSize: 16 }}>Address</Text>
        <Image
          source={require("../assets/icons/stroke.png")}
          style={{
            height: 20,
            width: 20,
            resizeMode: "center",
            position: "absolute",
            right: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 15,
          borderBottomWidth: 1,
          borderColor: "#E5E5E5",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>My Orders</Text>
        <Image
          source={require("../assets/icons/stroke.png")}
          style={{
            height: 20,
            width: 20,
            resizeMode: "center",
            position: "absolute",
            right: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 15,
          justifyContent: "center",
        }}
        onPress={() => props.navigation.navigate("ContactUs")}
      >
        <Text style={{ fontSize: 16 }}>Contact Us</Text>
        <Image
          source={require("../assets/icons/stroke.png")}
          style={{
            height: 20,
            width: 20,
            resizeMode: "center",
            position: "absolute",
            right: 20,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          padding: 15,
          justifyContent: "center",
        }}
        onPress={() => signout()}
      >
        <Text style={{ fontSize: 16 }}>Sign Out</Text>
        <Image
          source={require("../assets/icons/stroke.png")}
          style={{
            height: 20,
            width: 20,
            resizeMode: "center",
            position: "absolute",
            right: 20,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          position: "absolute",
          backgroundColor: "white",
          bottom: 0,
          paddingVertical: 80,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30 }}>Instyl</Text>
        <Text style={{ color: "grey" }}>Version 1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
