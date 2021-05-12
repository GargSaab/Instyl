import React from "react";
import { Text, View, ImageBackground } from "react-native";
import styles from "./style";

const ChatMessage = (ChatMessageProps) => {
  const { messsage } = ChatMessageProps;
  const isMymessage = () => {
    return messsage.user.id === "u1";
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.messageBox,
          {
            marginLeft: isMymessage() ? 50 : 0,
            marginRight: isMymessage() ? 0 : 50,
          },
        ]}
      >
        <Text
          style={{
            color: isMymessage() ? "blue" : "green",
            fontWeight: "bold",
            alignSelf: isMymessage() ? "flex-end" : "flex-start",
          }}
        >
          {messsage.user.name}
        </Text>
        <Text
          style={{
            alignSelf: isMymessage() ? "flex-end" : "flex-start",
          }}
        >
          {messsage.content}
        </Text>
      </View>
    </View>
  );
};
export default ChatMessage;
