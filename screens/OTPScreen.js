import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import firebase from "../Firebase";

function OTPScreen(props) {
  const { verificationId } = props.route.params;
  const [verificationCode, setVerificationCode] = React.useState("");
  const [confirmError, setConfirmError] = React.useState();
  const [confirmInProgress, setConfirmInProgress] = React.useState(false);
  const db = firebase.firestore();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Enter OTP</Text>
        <TextInput
          style={styles.textInput}
          placeholder="123456"
          onChangeText={(verificationCode) =>
            setVerificationCode(verificationCode)
          }
        />
        <Button
          title="Confirm OTP"
          disabled={!verificationCode}
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
        />
        {confirmError && (
          <Text style={styles.error}>{`Error: ${confirmError.message}`}</Text>
        )}
        {confirmInProgress && <ActivityIndicator style={styles.loader} />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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