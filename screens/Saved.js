import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import firebase from "../Firebase";

function Saved(props) {
  const [data, setData] = useState("");
  const db = firebase.firestore();

  const fetchData = async () => {
    const uid = await firebase.auth().currentUser.uid;
    await db
      .collection("users")
      .doc(uid)
      .collection("Saved")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push(doc.data().item);
        });
        setData(data);
      });
    console.log(data);
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        data={data}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",

          margin: 5,
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={{ padding: 5 }}>
                <Image
                  source={{ uri: item.itemImage }}
                  style={{ height: 200, width: 180, resizeMode: "cover" }}
                />
                <View style={{ marginTop: 5, padding: 5 }}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    {item.itemBrand}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{item.itemTitle}</Text>
                  <Text style={{ fontSize: 12, color: "red" }}>Price</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default Saved;
