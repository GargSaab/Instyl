import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import firebase from "../Firebase";

function Adress(props) {
  const [data, setData] = useState("");
  const db = firebase.firestore();

  const fetchdata = async () => {
    const uid = await firebase.auth().currentUser.uid;
    db.collection("users")
      .doc(uid)
      .collection("Address")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((item) => data.push(item.data()));
        setData(data);
      });
    console.log(data);
  };
  useEffect(() => {
    fetchdata();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      fetchdata();
    });
    return willFocusSubscription;
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  margin: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                  paddingLeft: 25,
                  borderColor: "#CFCFCF",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text>
                  {item.number}, {item.pincode}
                </Text>
                <Text>
                  {item.add3}, {item.add1}, {item.add2}
                </Text>
                <Text>
                  {item.city}, {item.state}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.add1}
        />
      </View>
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 10,
          borderWidth: 1,
          width: "50%",
          alignSelf: "center",
          borderRadius: 5,
          backgroundColor: "black",
          margin: 20,
        }}
        onPress={() => props.navigation.navigate("AddAdress")}
      >
        <Text style={{ fontSize: 16, color: "white" }}>Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Adress;
