import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import firebase from "../Firebase";

function EditGroupNameScreen(props) {
  const [value, setValue] = useState(props.route.params.groupName);
  const db = firebase.firestore();
  const okbtn = () => {
    db.collection("client_Keshav")
      .doc(props.route.params.id)
      .collection("groupInfo")
      .doc(props.route.params.groupId)
      .update({
        groupName: value,
      })
      .then(() => {
        props.navigation.navigate("Root");
      });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TextInput
        value={value}
        style={{
          width: "100%",
          borderBottomWidth: 2,
          fontSize: 18,
          padding: 10,
          margin: 10,
          borderColor: "#D9D9D9",
        }}
        onChangeText={setValue}
      />
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          height: 50,
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => okbtn()}>
          <Text style={styles.text}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
  },
  text: {
    fontSize: 18,
  },
});

export default EditGroupNameScreen;
