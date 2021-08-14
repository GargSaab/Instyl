import React, { useState, useEffect } from "react";
import { Alert, FlatList, ScrollView, TextInput } from "react-native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { ActivityIndicator, Modal } from "react-native-paper";
import firebase from "../Firebase";

function AddGroup(props) {
  const { item } = props.route.params;
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [data, setData] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(false);
  const db = firebase.firestore();

  const FetchData = async () => {
    const uid = await firebase.auth().currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .collection("Groups")
      .doc("groups")
      .collection("LIVE")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
        setLoading2(false);
      });
  };
  
  useEffect(() => {
    FetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      FetchData();
    });
    return willFocusSubscription;
  }, []);

  const sentinLiveGroup = async (myitem) => {
    setLoading3(true);
    const uid = await firebase.auth().currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .collection("Groups")
      .doc("groups")
      .collection("LIVE")
      .doc(myitem.groupName)
      .update({
        mybagitems: firebase.firestore.FieldValue.arrayUnion(item),
      });
    setLoading3(false);
    props.navigation.navigate("Groups");
  };

  const Createlivegroup = async () => {
    setLoading1(true);
    const uid = await firebase.auth().currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .collection("Groups")
      .doc("groups")
      .collection("LIVE")
      .doc(name)
      .set({
        groupName: name,
        groupImage: picture,
        mybagitems: [item],
      });
    setLoading1(false);
    props.navigation.navigate("Groups");
  };

  const handleUpload = async (image) => {
    const uploaduri = image.uri;
    let filename = uploaduri.split("/")[11];
    const response = await fetch(uploaduri);
    const blob = await response.blob();

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
      {modal ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <Modal
            visible={modal}
            onDismiss={() => setModal(false)}
            style={{
              width: "80%",
              height: "25%",
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
              padding: 10,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 20,
                borderBottomWidth: 1,
              }}
              onPress={() => Pickfromcamera()}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Pick From Camera
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 20, borderBottomWidth: 1 }}
              onPress={() => Pickfromgallery()}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Pick From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => {
                setPicture("");
                setModal(false);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Remove</Text>
            </TouchableOpacity>
          </Modal>
        </View>
      ) : null}
      {modal1 ? (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            zIndex: 1,
          }}
        >
          <Modal
            visible={modal1}
            onDismiss={() => setModal1(false)}
            style={{
              height: "40%",
              backgroundColor: "white",
              borderRadius: 20,
              top: "25%",
              margin: 20,
            }}
            contentContainerStyle={{
              position: "absolute",
              width: "100%",
              top: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                borderBottomWidth: 1,
                borderColor: "#D9D9D9",
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  padding: 10,
                }}
              >
                Invite a friend to join your group
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                marginRight: 10,
              }}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  Linking.openURL("whatsapp://send?text=invitelink")
                }
              >
                <Image
                  source={require("../assets/icons/whatsapp.png")}
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                    borderRadius: 70,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  Linking.openURL(
                    "fb-messenger://share/?link=invitinglink.com/"
                  )
                }
              >
                <Image
                  source={require("../assets/icons/facebook-messenger.png")}
                  style={{
                    width: 65,
                    height: 65,
                    margin: 10,
                    borderRadius: 70,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  Linking.openURL("twitter://post?message=InviteLink")
                }
              >
                <Image
                  source={require("../assets/icons/twitter.png")}
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                    borderRadius: 70,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => Linking.openURL("sms:?body=invitelink")}
              >
                <Image
                  source={require("../assets/icons/textmessage.png")}
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                    borderRadius: 70,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 70,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => Linking.openURL("mailto:?body=invitelink")}
              >
                <Image
                  source={require("../assets/icons/gmail.png")}
                  style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                    borderRadius: 70,
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
            <View
              style={{
                borderWidth: 1,
                padding: 10,
                margin: 15,
                borderColor: "#D9D9D9",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>Copy Link</Text>
              <Image
                source={require("../assets/icons/copylink.png")}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: "center",
                  position: "absolute",
                  right: 20,
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                justifyContent: "center",
                alignItems: "center",
                padding: 8,
                width: "50%",
                alignSelf: "center",
                borderRadius: 30,
                margin: 15,
                flexDirection: "row",
              }}
              onPress={() => Createlivegroup()}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Done
              </Text>
              {loading1 ? (
                <ActivityIndicator style={{ marginLeft: 10 }} />
              ) : null}
            </TouchableOpacity>
          </Modal>
        </View>
      ) : null}
      <View
        style={{
          marginTop: StatusBar.currentHeight + 10,
          borderBottomWidth: 1,
          borderColor: "#D9D9D9",
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Create Your Shopping Group
        </Text>
        <TouchableOpacity
          style={{ position: "absolute", right: 8 }}
          onPress={() => setModal1(true)}
        >
          <Text style={{ fontSize: 16, color: "red" }}>Create</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          padding: 10,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 60,
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
          onPress={() => setModal(true)}
        >
          <Image
            source={
              picture === ""
                ? require("../assets/icons/camera.png")
                : { uri: picture }
            }
            style={{
              height: 60,
              width: 60,
              resizeMode: "center",
            }}
          />
          {loading ? <ActivityIndicator /> : null}
        </TouchableOpacity>
        <View style={{ marginLeft: 20, flex: 1 }}>
          <TextInput
            placeholder="Group Name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              borderBottomWidth: 1,
              borderColor: "#D9D9D9",
              padding: 5,
              fontSize: 16,
            }}
          />
        </View>
      </View>
      <View
        style={{
          margin: 5,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, margin: 10, fontWeight: "900" }}>
          To Complete the order:
        </Text>
        <Text>Invite your friend to join your group</Text>
        <Text>Within 24 hrs if they also made a purchase</Text>
        <Text>You both will get the product at discounted price</Text>
        <Text>OR</Text>
        <Text>Join the existing group below</Text>
      </View>
      <View style={{ marginLeft: 10, padding: 3 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            borderBottomWidth: 1,
            borderColor: "#D9D9D9",
            padding: 5,
            marginHorizontal: 10,
          }}
        >
          Live groups:
        </Text>
        <ScrollView style={{ height: "24%" }}>
          {loading2 ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return (
                  <View style={{ flex: 1, margin: 5 }}>
                    <View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Image
                          source={{ uri: item.groupImage }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            marginRight: 15,
                            borderWidth: 1,
                            borderColor: "black",
                          }}
                        />
                        <View style={{ justifyContent: "space-around" }}>
                          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                            {item.groupName}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#FF2A2A",
                            position: "absolute",
                            right: 5,
                            width: 100,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 30,
                          }}
                          onPress={() => sentinLiveGroup(item)}
                        >
                          <Image
                            source={require("../assets/icons/settle.png")}
                            style={{
                              resizeMode: "center",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              }}
              keyExtractor={(item) => item.groupName}
            />
          )}
          {loading3 ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : null}
        </ScrollView>
      </View>
      <View style={{ marginLeft: 10, padding: 3 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            borderBottomWidth: 1,
            borderColor: "#D9D9D9",
            padding: 5,
            marginHorizontal: 10,
          }}
        >
          Activate old groups:
        </Text>
        <View></View>
      </View>
    </View>
  );
}

export default AddGroup;
