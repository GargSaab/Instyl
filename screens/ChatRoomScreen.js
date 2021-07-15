import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatMessage from "../components/ChatMessages";
import InputBox from "../components/InputBox";
import firebase from "../Firebase";

const ChatRoomScreen = () => {
  const route = useRoute();
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("client_Keshav")
      .doc(route.params.id)
      .collection("groupMessages")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <ChatMessage message={item} />}
        keyExtractor={(item) => item.messageId}
      />
      {/* <InputBox /> */}
    </View>
  );
};
export default ChatRoomScreen;
