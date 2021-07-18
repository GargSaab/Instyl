import React from "react";
import { Text, View } from "react-native";

function Activity(props) {
  const { groupName } = props.route.params;
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ margin: 10, padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>New</Text>
        <Text
          style={{ fontSize: 15, marginLeft: 5, padding: 5, color: "green" }}
        >
          You joined {groupName} group
        </Text>
      </View>
    </View>
  );
}

export default Activity;
