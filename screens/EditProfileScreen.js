import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ActivityIndicator, Modal } from "react-native-paper";
import firebase from "../Firebase";

function EditProfileScreen(props) {
  const [name, setName] = useState(props.route.params.name);
  const [picture, setPicture] = useState(props.route.params.picture);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const UpdateProfile = async () => {
    const db = firebase.firestore();
    try {
      await db.collection("users").doc(props.route.params.uid).update({
        picture: picture,
        name: name,
      });
      props.navigation.navigate("Root");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpload = async (image) => {
    const uploaduri = image.uri;
    let filename = uploaduri.split("/")[11];

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uploaduri, true);
      xhr.send(null);
    });

    const storageRef = firebase.storage().ref(filename);
    const task = storageRef.put(blob);
    // task.on(firebase.storage.TaskEvent.STATE_CHANGED, (taskSnapshot) => {
    //   console.log(
    //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
    //   );
    // });
    setModal(false);
    setLoading(true);
    await task;
    const url = await storageRef.getDownloadURL();
    setPicture(url);
    setLoading(false);
  };

  const Pickfromgallery = async () => {
    // const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test/${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("You need to give permission to access ");
    }
  };
  const Pickfromcamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `test/${data.uri.split(".")[1]}`,
          name: `test/${data.uri.split(".")[1]}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert("You need to give permission to access ");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{ justifyContent: "center", alignItems: "center", padding: 80 }}
      >
        <TouchableOpacity onPress={() => setModal(true)}>
          <Image
            source={{
              uri: picture,
            }}
            style={{ height: 150, width: 150, borderRadius: 80 }}
          />
        </TouchableOpacity>
        {loading ? <ActivityIndicator /> : null}
      </View>
      <View style={{ margin: 5 }}>
        <Text
          style={{
            padding: 10,
            marginLeft: 30,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Profile Name
        </Text>
        <TextInput
          value={name}
          placeholder="Enter Name"
          onChangeText={(text) => setName(text)}
          style={{
            borderWidth: 2,
            padding: 10,
            width: "80%",
            borderRadius: 10,
            alignSelf: "center",
            fontSize: 16,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "black",
          width: "50%",
          alignSelf: "center",
          alignItems: "center",
          borderRadius: 20,
          margin: 40,
        }}
        onPress={() => UpdateProfile()}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Update Profile</Text>
      </TouchableOpacity>
      <Modal
        visible={modal}
        onDismiss={() => setModal(false)}
        style={{
          width: "80%",
          height: "20%",
          backgroundColor: "white",
          borderRadius: 20,
          position: "absolute",
          left: 40,
          top: "30%",
        }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ padding: 20, borderBottomWidth: 1 }}
          onPress={() => Pickfromcamera()}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Pick From Camera
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 20 }}
          onPress={() => Pickfromgallery()}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Pick From Gallery
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default EditProfileScreen;
