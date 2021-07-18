import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
  Alert,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import firebase from "../Firebase";

function ProductScreen(props) {
  const { item } = props.route.params;
  const [size, setSize] = useState(false);
  const [ProductDetails, setProductDetails] = useState(false);
  const [Shipping, setShipping] = useState(false);
  const [sizeSelected, setSizeSelected] = useState("Select a size");
  const [similardata, setSimilardata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const data = [];
  const db = firebase.firestore();

  const handleSaved = async () => {
    const uid = await firebase.auth().currentUser.uid;
    await db.collection("users").doc(uid).collection("Saved").add({
      item,
    });
  };

  useEffect(() => {
    if (item.itemSimilar.length > 0) {
      item.itemSimilar.map((id) => {
        db.collection("myStyle")
          .doc("abcd")
          .collection("categories")
          .doc("abc")
          .collection("items")
          .doc(id)
          .get()
          .then((snapshot) => {
            data.push(snapshot.data());
            setSimilardata(data);
            setLoading(true);
          });
      });
    }
  }, []);
  LogBox.ignoreAllLogs(true);
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          position: "absolute",
          bottom: 5,
          height: 80,
          alignItems: "center",
          backgroundColor: "#fafafa",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 5,
          zIndex: 5,
        }}
      >
        {saved ? (
          <FontAwesome
            name="bookmark"
            size={35}
            color="black"
            style={{ marginLeft: 25 }}
          />
        ) : (
          <FontAwesome
            name="bookmark-o"
            size={35}
            color="black"
            style={{ marginLeft: 25 }}
            onPress={() => {
              setSaved(true);
              handleSaved();
            }}
          />
        )}
        <AntDesign
          name="hearto"
          size={35}
          color="black"
          style={{ marginLeft: 20 }}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 10,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              padding: 10,
              borderRadius: 10,
              paddingHorizontal: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (sizeSelected === "Select a size") {
                Alert.alert("First select size");
              } else {
                props.navigation.navigate("ShoppingBag", { item: item });
              }
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>$ 1500</Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>Buy alone</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              borderRadius: 10,
              paddingHorizontal: 5,
              marginLeft: 2,
            }}
            onPress={() => {
              if (sizeSelected === "Select a size") {
                Alert.alert("First select size");
              } else {
                props.navigation.navigate("ShoppingBagGroup", { item: item });
              }
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>$ 1000</Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Buy with friends
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Image
            source={{ uri: item.itemImage }}
            style={{ width: "100%", height: 380 }}
          />
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ position: "absolute", top: 40, left: 15 }}
          >
            <Ionicons name="arrow-back-outline" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {item.itemBrand}
          </Text>
          <Text style={{ fontSize: 15, color: "red" }}>Price</Text>
          <Text style={{ fontSize: 15, marginTop: 5 }}>
            {item.ItemDescription}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginLeft: 15,
            borderBottomWidth: 2,
            borderColor: "#D9D9D9",
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setSize(!size)}
        >
          <Text style={{ fontSize: 18 }}>{sizeSelected}</Text>
          {size ? (
            <AntDesign
              name="up"
              size={18}
              color="black"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
          ) : (
            <AntDesign
              name="down"
              size={18}
              color="black"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ display: size ? "flex" : "none" }}>
          <FlatList
            data={item.itemSizeavailable}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{ marginLeft: 20 }}
                  onPress={() => {
                    setSizeSelected(item);
                    setSize(false);
                  }}
                >
                  <Text style={{ fontSize: 15 }}>{item}</Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item}
          />
        </View>
        <TouchableOpacity
          style={{
            marginLeft: 15,
            borderBottomWidth: 2,
            borderColor: "#D9D9D9",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 18,
          }}
          onPress={() => setProductDetails(!ProductDetails)}
        >
          <Text style={{ fontSize: 18 }}>Product Details</Text>
          {ProductDetails ? (
            <AntDesign
              name="up"
              size={18}
              color="black"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
          ) : (
            <AntDesign
              name="down"
              size={18}
              color="black"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ display: ProductDetails ? "flex" : "none", margin: 15 }}>
          <Text style={{ fontSize: 15 }}>Fabric : {item.itemFabric}</Text>
          <Text style={{ fontSize: 15 }}>Color : {item.itemColor}</Text>
          <Text style={{ fontSize: 15 }}>Washable : {item.itemWashable}</Text>
        </View>
        <TouchableOpacity
          style={{
            marginLeft: 15,
            borderBottomWidth: 2,
            borderColor: "#D9D9D9",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 18,
          }}
          onPress={() => setShipping(!Shipping)}
        >
          <Text style={{ fontSize: 18 }}>Shipping Details</Text>
          {Shipping ? (
            <AntDesign
              name="up"
              size={18}
              color="black"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
          ) : (
            <AntDesign
              name="down"
              size={18}
              color="black"
              style={{
                position: "absolute",
                right: 20,
              }}
            />
          )}
        </TouchableOpacity>
        <View style={{ display: Shipping ? "flex" : "none", margin: 15 }}>
          <Text style={{ fontSize: 15 }}>Saved Address</Text>
        </View>
        <View style={{ margin: 20 }}>
          {loading
            ? similardata.map((item) => {
                return (
                  <View key={item.itemId}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      People who bought this item also bought
                    </Text>
                    <Image
                      source={{ uri: item.itemImage }}
                      style={{ width: 200, height: 200, margin: 5 }}
                    />
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 15,
                        marginLeft: 10,
                      }}
                    >
                      {item.itemBrand}
                    </Text>
                  </View>
                );
              })
            : null}
        </View>
        <View style={{ height: 150 }}></View>
      </ScrollView>
    </View>
  );
}

export default ProductScreen;
