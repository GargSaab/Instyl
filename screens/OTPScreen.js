import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firebase from "../Firebase";

function OTPScreen(props) {
  const { verificationId, phoneNumber } = props.route.params;
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const db = firebase.firestore();
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Verify {phoneNumber}
        </Text>
      </View>
      <View
        style={{
          marginTop: 120,
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            borderBottomWidth: 1,
            padding: 8,
            fontSize: 18,
            fontWeight: "bold",
            width: "50%",
            textAlign: "center",
          }}
          value={verificationCode}
          keyboardType="number-pad"
          placeholder=""
          onChangeText={(verificationCode) => {
            if (verificationCode.length <= 6) {
              setVerificationCode(verificationCode);
            }
          }}
        />
        <Text style={{ color: "#928B8B", margin: 5 }}>Enter 6-digit code</Text>
        {confirmError && (
          <Text
            style={{
              marginTop: 15,
              fontWeight: "bold",
              color: "red",
              alignSelf: "center",
              fontSize: 18,
            }}
          >{`Wrong OTP`}</Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          padding: 15,
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          alignSelf: "center",
          borderRadius: 10,
          marginTop: 90,
        }}
        onPress={async () => {
          try {
            setConfirmError(undefined);
            setConfirmInProgress(true);
            const credential = firebase.auth.PhoneAuthProvider.credential(
              verificationId,
              verificationCode
            );
            const authResult = await firebase
              .auth()
              .signInWithCredential(credential);
            setConfirmInProgress(false);
            setVerificationCode("");
            if (authResult.additionalUserInfo.isNewUser) {
              db.collection("users")
                .doc(`${authResult.user.uid}`)
                .set({
                  uid: `${authResult.user.uid}`,
                  name: "Instyl_user",
                  number: `${authResult.user.phoneNumber}`,
                  picture:
                    "https://cdn.landesa.org/wp-content/uploads/default-user-image.png",
                });
            }
            AsyncStorage.setItem("isLoggedIn", "1");
            AsyncStorage.setItem("UID", authResult.user.uid);
            props.navigation.navigate("root");
          } catch (err) {
            setConfirmError(err);
            setConfirmInProgress(false);
          }
        }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Confirm OTP</Text>
      </TouchableOpacity>

      {confirmInProgress && <ActivityIndicator style={styles.loader} />}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  content: {
    marginTop: 50,
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: "bold",
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: "bold",
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  success: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
});

export default OTPScreen;
