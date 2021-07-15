import React from "react";
import { Text, View } from "react-native";
import styles from "./style";

const ChatMessage = (props) => {
  const item = props.message;

  const isMymessage = () => {
    return item.messageSentby === "Keshav";
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
          {item.messageSentby}
        </Text>
        <Text
          style={{
            alignSelf: isMymessage() ? "flex-end" : "flex-start",
          }}
        >
          {item.message}
        </Text>
      </View>
    </View>
  );
};
export default ChatMessage;
