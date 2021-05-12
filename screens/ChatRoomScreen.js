import React from "react";
import { FlatList, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ChatsData from "../data/Chats";
import ChatMessage from "../components/ChatMessages";
import InputBox from "../components/InputBox";

const ChatRoomScreen = () => {
  const route = useRoute();
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={ChatsData[route.params.id - 1].messages}
        renderItem={({ item }) => <ChatMessage messsage={item} />}
      />
      <InputBox />
    </View>
  );
};
export default ChatRoomScreen;
