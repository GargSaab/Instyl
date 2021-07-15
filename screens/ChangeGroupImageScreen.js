import React, { useState } from "react";
import { Image, Modal, Text, View } from "react-native";

function ChangeGroupImageScreen(props) {
  const [modal, setModal] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Image
        source={{ uri: props.route.params.image }}
        style={{
          width: "100%",
          height: 350,
        }}
      />
    </View>
  );
}

export default ChangeGroupImageScreen;
