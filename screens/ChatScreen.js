import * as React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../components/Themed";
import ChatListItem from "../components/ChatListItem";
import { AntDesign } from "@expo/vector-icons";

import chatRooms from "../data/ChatRoom";

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chatRooms}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addicon}>
        <TouchableOpacity onPress={() => console.warn("Backend Not Used")}>
          <AntDesign name="addusergroup" size={50} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addicon: {
    position: "absolute",
    right: 40,
    bottom: 40,
    backgroundColor: "#fcfcfc",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});
