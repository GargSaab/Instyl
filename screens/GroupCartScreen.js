import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

function GroupCartScreen(props) {
  const item = props.route.params.item;
  const [t1, sett1] = useState(true);
  const [t2, sett2] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            padding: 15,
            borderWidth: 1,
            borderColor: "#D9D9D9",
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            sett1(true);
            sett2(false);
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>My Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 15,
            borderWidth: 1,
            borderColor: "#D9D9D9",
            borderLeftWidth: 0,
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            sett2(true);
            sett1(false);
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Friend's Bag</Text>
        </TouchableOpacity>
      </View>
      {t1 ? (
        <ScrollView>
          <FlatList
            data={item.mybagitems}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    margin: 10,
                    flexDirection: "row",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#D9D9D9",
                  }}
                >
                  <Image
                    source={{ uri: item.itemImage }}
                    style={{ width: 150, height: 150 }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text>{item.itemTitle}</Text>
                    <Text>{item.itemBrand}</Text>
                    <Text style={{ marginTop: 10, color: "red", fontSize: 15 }}>
                      Group Price
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.itemId}
          />
        </ScrollView>
      ) : null}

      {t2 ? (
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",

              paddingVertical: 100,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              Click on the Explore button and Join among
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              existing teams to save extra
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#FDA5A5",
                padding: 10,
                margin: 10,
                borderRadius: 10,
              }}
              onPress={() => props.navigation.navigate("Home")}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Explore</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={item.mybagitems}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    margin: 10,
                    flexDirection: "row",
                    padding: 10,
                    borderWidth: 1,
                    borderColor: "#D9D9D9",
                  }}
                >
                  <Image
                    source={{ uri: item.itemImage }}
                    style={{ width: 150, height: 150 }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text>{item.itemTitle}</Text>
                    <Text>{item.itemBrand}</Text>
                    <Text style={{ marginTop: 10, color: "red", fontSize: 15 }}>
                      Group Price
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.itemId}
          />
        </ScrollView>
      ) : null}
    </View>
  );
}

export default GroupCartScreen;
