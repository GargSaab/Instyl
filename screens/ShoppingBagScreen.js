import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "../Firebase";

function ShoppingBagGroup(props) {
  const { item } = props.route.params;
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(false);
  const [clr1, setClr1] = useState(false);
  const [clr2, setClr2] = useState(false);

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#CFCFCF",
          padding: 10,
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <FontAwesome name="long-arrow-right" size={30} color="#47FFDE" />
        <Text style={{ fontSize: 16 }}>Bag</Text>
        <FontAwesome
          name="long-arrow-right"
          size={30}
          color={clr1 ? "#47FFDE" : "#9B9B9B"}
        />
        <Text style={{ fontSize: 16 }}>Address</Text>
        <FontAwesome
          name="long-arrow-right"
          size={30}
          color={clr2 ? "#47FFDE" : "#9B9B9B"}
        />
        <Text style={{ fontSize: 16 }}>Payment</Text>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          margin: 10,
          borderRadius: 20,
          position: "absolute",
          bottom: 10,
          width: "95%",
          zIndex: 5,
        }}
        onPress={() => {
          if (t1) {
            setT1(false);
            setT2(true);
            setClr1(true);
          } else if (t2) {
            setT2(false);
            setT3(true);
            setClr2(true);
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          PLACE ORDER
        </Text>
      </TouchableOpacity>

      <View>
        <View style={{ flexDirection: "row", padding: 20 }}>
          <Image
            source={require("../assets/icons/trustSign.png")}
            style={{ height: 60, width: 50 }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              flexWrap: "wrap",
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 14 }}>
              Instyl Trust {"&"} Safety Promise
            </Text>
            <Text style={{ fontSize: 13, color: "#8D8D8D" }}>
              Orignal Products | Safe Payments | Easy Returns
            </Text>
          </View>
        </View>
        {t1 ? (
          <View>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#CFCFCF",
                padding: 8,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#CFCFCF",
                  padding: 5,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Selected Products :
                </Text>
              </View>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <Image
                  source={{ uri: item.itemImage }}
                  style={{ width: 150, height: 150 }}
                />
                <View style={{ padding: 10 }}>
                  <Text>{item.itemTitle}</Text>
                  <Text>{item.itemBrand}</Text>
                  <Text style={{ marginTop: 10, color: "red", fontSize: 15 }}>
                    Price
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#CFCFCF",
                padding: 8,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 2,
                  borderColor: "#CFCFCF",
                  padding: 5,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Price Details :
                </Text>
              </View>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15 }}>Total MRP</Text>
                <Text style={{ fontSize: 15 }}>Discount</Text>
                <Text style={{ fontSize: 15 }}>Delivery Charge</Text>
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#CFCFCF",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Total Amount
              </Text>
            </View>
            <View style={{ height: 50 }}></View>
          </View>
        ) : null}
        {t2 ? (
          <View>
            <View
              style={{
                borderBottomWidth: 2,
                borderColor: "#CFCFCF",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Address</Text>
            </View>
            <View>
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
                <Text style={{ fontSize: 16, color: "white" }}>
                  Add New Address
                </Text>
              </TouchableOpacity>
              <ScrollView style={{ height: "64%" }}>
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
              </ScrollView>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default ShoppingBagGroup;
