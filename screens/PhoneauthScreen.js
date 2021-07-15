import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  BackHandler,
} from "react-native";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAGqbgVKa0QwCrjtt64tUs8VqRRNdK1A2g",
  authDomain: "instyl.firebaseapp.com",
  projectId: "instyl",
  storageBucket: "instyl.appspot.com",
  messagingSenderId: "882298578741",
  appId: "1:882298578741:web:54bd45c30c4d8442084e7c",
  measurementId: "G-1CJJLDZHX6",
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  // ignore app already initialized error on snack
}

function PhoneauthScreen(props) {
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState("+91 ");
  const [verifyError, setVerifyError] = React.useState();
  const [verificationId, setVerificationId] = React.useState("");

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        BackHandler.exitApp();
      }
    );
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={FIREBASE_CONFIG}
        />
        <Text style={styles.text}>Enter phone number</Text>
        <TextInput
          style={styles.textInput}
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          placeholder="+1 999 999 9999"
          value={phoneNumber}
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <Button
          title="Send OTP"
          disabled={!phoneNumber}
          onPress={async () => {
            const phoneProvider = new firebase.auth.PhoneAuthProvider();
            try {
              setVerificationId("");
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              props.navigation.navigate("OTP", {
                verificationId: verificationId,
              });
            } catch (err) {
              setVerifyError(err);
            }
          }}
        />
        {verifyError && (
          <Text style={styles.error}>{`Error: ${verifyError.message}`}</Text>
        )}
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
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
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

export default PhoneauthScreen;
