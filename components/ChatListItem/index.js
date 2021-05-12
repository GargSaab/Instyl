import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../data/ChatRoom";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";

export const ChatListItemProps = {
  chatRoom: ChatRoom,
};

const ChatListItem = (ChatListItemProps) => {
  const { chatRoom } = ChatListItemProps;
  const user = chatRoom.users[1];

  const navigation = useNavigation();
  const OnClick = () => {
    navigation.navigate("ChatRoomScreen", {
      id: chatRoom.id,
      name: user.name,
      image: user.imageUri,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={OnClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.lastMessage}>
              {chatRoom.lastMessage.content}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ChatListItem;
