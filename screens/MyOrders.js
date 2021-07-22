import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import firebase from "../Firebase";

function MyOrders(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = firebase.firestore();

  const FetchData = async () => {
    const uid = global.UID;
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
          doc.data().mybagitems.forEach((item) => {
            data.push(item);
          });
        });
        setData(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    FetchData();
    const willFocusSubscription = props.navigation.addListener("focus", () => {
      FetchData();
    });
    return willFocusSubscription;
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View style={{ margin: 10 }}>
                <View
                  style={{
                    borderWidth: 1,
                    padding: 8,
                    flexDirection: "row",
                    borderColor: "#E5E5E5",
                    borderRadius: 20,
                  }}
                >
                  <Image
                    source={{ uri: item.itemImage }}
                    style={{
                      height: 150,
                      width: 140,
                      resizeMode: "cover",
                      borderRadius: 10,
                    }}
                  />
                  <View
                    style={{
                      flex: 1,
                      padding: 10,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                      {item.itemBrand}
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                      {item.itemTitle}
                    </Text>
                    <Text style={{ fontSize: 14, marginTop: 20, color: "red" }}>
                      Status : Delivered
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        // justifyContent: "space-between",
                        margin: 2,
                        marginTop: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: "#FDA5A5",
                          borderRadius: 10,
                          paddingHorizontal: 15,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          Return
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          padding: 10,
                          backgroundColor: "#FDA5A5",
                          borderRadius: 10,
                          paddingHorizontal: 15,
                          marginLeft: 12,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "white",
                          }}
                        >
                          Review
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.itemId}
        />
      )}
    </ScrollView>
  );
}

export default MyOrders;
