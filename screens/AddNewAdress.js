import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import firebase from "../Firebase";

function Addnewadress(props) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [pincode, setPincode] = useState("");
  const [add1, setAdd1] = useState("");
  const [add2, setAdd2] = useState("");
  const [add3, setAdd3] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const db = firebase.firestore();

  const handlesubmit = async () => {
    const uid = await firebase.auth().currentUser.uid;
    await db.collection("users").doc(uid).collection("Address").add({
      name,
      number,
      pincode,
      add1,
      add2,
      add3,
      city,
      state,
    });
    props.navigation.goBack();
  };
  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1, padding: 5 }}>
      <KeyboardAvoidingView>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Full Name</Text>
          <TextInput
            value={name}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            Mobile number
          </Text>
          <TextInput
            value={number}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setNumber(text)}
            placeholder="10-digit mobile number without prefixes"
            keyboardType="number-pad"
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Pincode</Text>
          <TextInput
            value={pincode}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setPincode(text)}
            placeholder="6 digits [0-9] PIN code "
            keyboardType="number-pad"
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            Flat, House no.
          </Text>
          <TextInput
            value={add1}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setAdd1(text)}
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
            Area, Street, Sector
          </Text>
          <TextInput
            value={add2}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setAdd2(text)}
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Landmark</Text>
          <TextInput
            value={add3}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setAdd3(text)}
            placeholder="E.g. near xyz school"
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>Town/City</Text>
          <TextInput
            value={city}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <View style={{ margin: 10, marginTop: 0 }}>
          <Text style={{ fontWeight: "bold", marginLeft: 10 }}>State</Text>
          <TextInput
            value={state}
            style={{
              borderWidth: 1,
              fontSize: 16,
              padding: 8,
              margin: 5,
              borderRadius: 10,
              borderColor: "#CFCFCF",
            }}
            onChangeText={(text) => setState(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            backgroundColor: "black",
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => handlesubmit()}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Add Address</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default Addnewadress;
