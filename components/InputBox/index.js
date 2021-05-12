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

const InputBox = () => {
  const [message, setMessage] = useState("");
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
            value={message}
            onChangeText={setMessage}
          />
          {message != "" ? (
            <TouchableOpacity onPress={() => console.warn("Backend not used")}>
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
