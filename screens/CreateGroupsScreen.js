import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, FontAwesome5, Entypo } from "@expo/vector-icons";
import firebase from "../Firebase";

function CreateGroupsScreen(props) {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("deviceUsers")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <View style={styles.searchbox1}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            placeholder="Find your shopping buddy"
            style={styles.searchtext}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center", margin: 30 }}
        onPress={() => setModal(true)}
      >
        <FontAwesome5 name="user-plus" size={40} color="black" />
        <Text style={{ color: "#DB0000", fontSize: 19 }}>Invite Friends</Text>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 2, borderColor: "#D9D9D9" }}>
        <Text
          style={{
            fontWeight: "bold",
            marginLeft: 15,
            fontSize: 15,
            marginBottom: 2,
          }}
        >
          Quick add
        </Text>
      </View>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 10,
                }}
              >
                <Image
                  source={{ uri: item.userImage }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginLeft: 10,
                  }}
                />
                <Text style={{ fontSize: 16, marginLeft: 10 }}>
                  {item.userName}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    right: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    padding: 5,
                    borderRadius: 15,
                    borderColor: "#D9D9D9",
                  }}
                >
                  <FontAwesome5 name="user-plus" size={18} color="black" />
                  <Text style={{ marginLeft: 10 }}>Add</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.userId}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModal(false)}>
          <View style={{ opacity: 0, flex: 1 }} />
        </TouchableWithoutFeedback>
        <View style={styles.modalview}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ marginLeft: 30, fontSize: 18 }}>Invite using</Text>
            <Entypo
              name="cross"
              size={30}
              color="black"
              style={{ position: "absolute", right: 15 }}
              onPress={() => setModal(false)}
            />
          </View>
          <ScrollView style={{ flexDirection: "row" }} horizontal={true}>
            <TouchableOpacity
              onPress={() => Linking.openURL("whatsapp://send?text=invitelink")}
            >
              <Image
                source={require("../assets/icons/whatsapp.png")}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("fb-messenger://share/?link=invitinglink.com/")
              }
            >
              <Image
                source={require("../assets/icons/facebook-messenger.png")}
                style={{ width: 65, height: 65, margin: 10, borderRadius: 70 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("twitter://post?message=InviteLink")
              }
            >
              <Image
                source={require("../assets/icons/twitter.png")}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("sms:?body=invitelink")}
            >
              <Image
                source={require("../assets/icons/textmessage.png")}
                style={styles.icons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("mailto:?body=invitelink")}
            >
              <Image
                source={require("../assets/icons/gmail.png")}
                style={styles.icons}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  searchbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  searchbox1: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    borderRadius: 20,
    alignItems: "center",
    paddingLeft: 15,
    width: 303,
    height: 38,
  },
  searchtext: {
    marginLeft: 10,
    width: 230,
  },
  modalview: {
    position: "absolute",
    bottom: 2,
    width: "100%",
    borderTopWidth: 2,
    borderColor: "#D9D9D9",
  },
  icons: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 70,
  },
});

export default CreateGroupsScreen;
