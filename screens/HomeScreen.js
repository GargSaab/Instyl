import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from "react-native";
import { Modal } from "react-native-paper";
import firebase from "../Firebase";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [liked, setLiked] = useState(false);
  const db = firebase.firestore();

  const fetchData = async () => {
    db.collection("myStyle")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setData(data);
      });
    db.collection("myStyle")
      .doc("abcd")
      .collection("categories")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setCategories(data);
      });
    db.collection("myStyle")
      .doc("abcd")
      .collection("categories")
      .doc("abc")
      .collection("items")
      .get()
      .then((snapshot) => {
        const data = [];
        snapshot.forEach((doc) => data.push(doc.data()));
        setItems(data);
      });
  };

  const likesystem = async (item) => {
    db.collection("myStyle")
      .doc("abcd")
      .collection("categories")
      .doc("abc")
      .collection("items")
      .doc(item.itemId)
      .update({
        itemLiked: !item.itemLiked,
      });
  };

  useEffect(() => {
    fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.headerview}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setModal(true)}
          >
            <Text style={{ fontSize: 15, marginLeft: 5, marginRight: 5 }}>
              My Style
            </Text>
            <AntDesign name="down" size={18} color="black" />
          </TouchableOpacity>
          <Text style={styles.instyltitle}>Instyl</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Myorders")}
            style={{
              position: "absolute",
              right: 10,
            }}
          >
            <Image
              source={require("../assets/icons/bag.png")}
              style={{
                height: 32,
                width: 50,
                resizeMode: "center",
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 5 }}>
          <FlatList
            horizontal
            data={categories}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    margin: 5,
                    backgroundColor: item.docId == "abc" ? "black" : "white",
                    borderRadius: 10,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: item.docId == "abc" ? "white" : "black",
                    }}
                  >
                    {item.docName}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.docId}
            style={{ marginLeft: 5, marginBottom: 1 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator
            data={items}
            renderItem={({ item }) => {
              return (
                <View style={{ marginTop: 10 }}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("ProductPage", { item: item })
                    }
                  >
                    <Image
                      source={{ uri: item.itemImage }}
                      style={{
                        width: "100%",
                        height: 350,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableWithoutFeedback>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontWeight: "bold" }}>
                        {item.itemBrand}
                      </Text>
                      <Text>{item.itemTitle}</Text>
                      <Text style={{ color: "red" }}>Price</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 1,
                        marginRight: 15,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          setLiked(!liked);
                          // likesystem(item);
                        }}
                      >
                        {liked ? (
                          <Ionicons
                            name="heart"
                            size={32}
                            color="red"
                            style={styles.likeshare}
                          />
                        ) : (
                          <Ionicons
                            name="heart-outline"
                            size={32}
                            color="black"
                            style={styles.likeshare}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.itemId}
            style={{ marginBottom: 10 }}
          />
        </View>
      </View>
      <Modal
        visible={modal}
        onDismiss={() => setModal(false)}
        style={styles.modal}
        contentContainerStyle={{
          flex: 1,
          position: "absolute",
          width: "100%",
          top: 20,
        }}
      >
        <View style={{ marginLeft: 20 }}>
          <View
            style={{ borderBottomWidth: 1, borderColor: "#D9D9D9", padding: 5 }}
          >
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>My Style</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return (
                  <View style={{ margin: 5 }}>
                    <Text style={{ fontSize: 15 }}>{item.docName}</Text>
                  </View>
                );
              }}
              keyExtractor={(item) => item.docId}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerview: {
    marginTop: StatusBar.currentHeight + 10,
    borderBottomWidth: 1,
    borderColor: "#D9D9D9",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  instyltitle: {
    fontSize: 22,
    fontWeight: "bold",
    position: "absolute",
    left: "45%",
  },
  likeshare: {
    margin: 5,
  },
  modal: {
    width: "80%",
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },
});
export default HomeScreen;
