import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  StatusBar,
} from "react-native";
import ChatListItem from "../components/ChatListItem";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import firebase from "../Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();

  const FetchData = async () => {
    const uid = firebase.auth().currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .collection("Groups")
      .doc("groups")
      .collection("LIVE")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    FetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      FetchData();
    });
    return willFocusSubscription;
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: StatusBar.currentHeight + 10,
          borderBottomWidth: 1,
          borderColor: "#D9D9D9",
          padding: 5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ alignSelf: "center", fontSize: 22, fontWeight: "bold" }}>
          Instyl
        </Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Myorders")}
          style={{
            position: "absolute",
            right: 10,
          }}
        >
          <Image
            source={require("../assets/icons/bag.png")}
            style={{
              height: 32,
              width: 50,
              resizeMode: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchbox}>
        <View style={styles.searchbox1}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            placeholder="Find your shopping buddy"
            style={styles.searchtext}
          />
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: "60%" }}
        />
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={data}
          renderItem={({ item }) => <ChatListItem data={item} />}
          keyExtractor={(item) => item.groupName}
        />
      )}
      {/* <View style={styles.addicon}>
        <TouchableOpacity onPress={() => navigation.navigate("CreateGroups")}>
          <Image
            source={require("../assets/icons/addgrp.png")}
            style={{ width: 55, height: 55, resizeMode: "center" }}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  addicon: {
    position: "absolute",
    right: 40,
    bottom: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  searchbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  searchbox1: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    alignItems: "center",
    paddingLeft: 15,
    width: 303,
    height: 38,
  },
  searchtext: {
    marginLeft: 10,
    width: 230,
  },
});
