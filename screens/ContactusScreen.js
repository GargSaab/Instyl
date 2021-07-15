import React from "react";
import { View, Image, Linking, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function ContactusScreen(props) {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <TouchableOpacity onPress={() => Linking.openURL("tel:+919466526279")}>
          <Image
            source={require("../assets/icons/Phone.png")}
            style={{ height: 50, width: 50, resizeMode: "center" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:instyl100@gmail.com")}
        >
          <Image
            source={require("../assets/icons/message.png")}
            style={{ height: 50, width: 50, resizeMode: "center" }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Linking.openURL("whatsapp://send?phone=+919466526279")}
        >
          <FontAwesome name="whatsapp" size={55} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ContactusScreen;
