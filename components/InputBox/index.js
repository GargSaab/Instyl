import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";
// import { Client, Message } from "react-native-paho-mqtt";

const InputBox = () => {
  const [mes, setMes] = useState("");

  // const myStorage = {
  //   setItem: (key, item) => {
  //     myStorage[key] = item;
  //   },
  //   getItem: (key) => myStorage[key],
  //   removeItem: (key) => {
  //     delete myStorage[key];
  //   },
  // };

  // useEffect(() => {
  //   // Create a client instance
  //   const client = new Client({
  //     uri: "ws://localhost:1883/",
  //     clientId: "15234",
  //     storage: myStorage,
  //   });
  //   // set event handlers
  //   client.on("connectionLost", (responseObject) => {
  //     if (responseObject.errorCode !== 0) {
  //       console.log(responseObject.errorMessage);
  //     }
  //   });
  //   client.on("messageReceived", (message) => {
  //     console.log(message.payloadString);
  //   });
  //   // connect the client
  //   client
  //     .connect()
  //     .then(() => {
  //       // Once a connection has been made, make a subscription and send a message.
  //       console.log("onConnect");
  //       return client.subscribe("World");
  //     })
  //     .then(() => {
  //       const message = new Message("Hello");
  //       message.destinationName = "World";
  //       client.send(message);
  //     })
  //     .catch((responseObject) => {
  //       if (responseObject.errorCode !== 0) {
  //         console.log("onConnectionLost:" + responseObject.errorMessage);
  //       }
  //     });
  // });

  return (
    <View
      style={{
        bottom: 15,
      }}
    >
      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>
          <TouchableOpacity onPress={() => console.warn("Emoji")}>
            <FontAwesome5 name="laugh" size={30} color="black" />
          </TouchableOpacity>
          <TextInput
            placeholder="Type a message"
            multiline
            style={styles.textInput}
            value={mes}
            onChangeText={setMes}
          />
          {mes != "" ? (
            <TouchableOpacity onPress={() => console.warn("Send")}>
              <Ionicons name="send" size={30} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => console.warn("Microphone")}>
              <FontAwesome name="microphone" size={30} color="black" />
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default InputBox;
