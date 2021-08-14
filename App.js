import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from 'react-native';

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Navigation />
        <StatusBar />
      </SafeAreaView>
    );
  }
}
