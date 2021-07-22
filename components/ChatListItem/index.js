import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatListItem = (props) => {
  const item = props.data;
  const navigation = useNavigation();

  const OnClick = () => {
    navigation.navigate("GroupCart", {
      groupName: item.groupName,
      item: item,
    });
  };

  return (
    <TouchableOpacity onPress={OnClick}>
      <View style={styles.container}>
        <View style={styles.lefContainer}>
          <Image source={{ uri: item.groupImage }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{item.groupName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ChatListItem;
