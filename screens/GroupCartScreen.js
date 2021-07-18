import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";

function GroupCartScreen(props) {
  const item = props.route.params.item;

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
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>Friend's Bag</Text>
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
    </View>
  );
}

export default GroupCartScreen;
