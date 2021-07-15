import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import firebase from "../Firebase";

function EditGroupInfoScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const db = firebase.firestore();

  useEffect(() => {
    db.collection("client_Keshav")
      .doc(route.params.id)
      .collection("groupUsers")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setData(data);
      });
  }, []);
  const ExitGroup = () => {
    console.log("yeah");
    // db.collection("client_Keshav")
    //   .doc(route.params.id)
    //   .delete()
    //   .then(() => {
    //     Alert.alert("Deleted Successfully");
    //     navigation.navigate("Root");
    //   });
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("ChangeGroupIcon", {
              image: route.params.image,
            })
          }
        >
          <Image
            source={{ uri: route.params.image }}
            style={{
              width: "100%",
              height: 280,
            }}
          />
        </TouchableWithoutFeedback>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 40, left: 15 }}
        >
          <Ionicons name="arrow-back-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: "absolute", top: 230, right: 15 }}
          onPress={() =>
            navigation.navigate("EditGroupName", {
              groupName: route.params.name,
              groupId: route.params.groupId,
              id: route.params.id,
            })
          }
        >
          <Feather name="edit-2" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.textinimage}>{route.params.name}</Text>
      </View>
      <Card style={{ marginTop: 10, marginBottom: 10 }}>
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          Shared Products
        </Text>
        <View>
          <Image
            source={{ uri: route.params.image }}
            style={{ height: 55, width: 60, marginLeft: 10, marginBottom: 8 }}
          />
        </View>
      </Card>
      <Card>
        <Text style={{ marginLeft: 10, fontSize: 16, marginBottom: 10 }}>
          {data.length} Members
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.iconstyle}>
            <Ionicons name="ios-person-add-sharp" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.textstyle}>Add members</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <View style={styles.iconstyle}>
            <AntDesign name="link" size={28} color="#FFFFFF" />
          </View>
          <Text style={styles.textstyle}>Invite via link</Text>
        </View>
      </Card>
      <Card style={{ marginTop: 5 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",

                  marginBottom: 5,
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
              </View>
            );
          }}
          keyExtractor={(item) => item.userId}
        />
      </Card>
      <Card style={{ marginTop: 15 }} onPress={() => ExitGroup()}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="exit-outline"
            size={28}
            color="black"
            style={{ marginLeft: 10 }}
          />
          <Text style={{ fontSize: 16, marginLeft: 15 }}>Exit group</Text>
        </View>
      </Card>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textinimage: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15,
    position: "absolute",
    top: 230,
    color: "#FFFFFF",
  },
  iconstyle: {
    backgroundColor: "#FF6363",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textstyle: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default EditGroupInfoScreen;
