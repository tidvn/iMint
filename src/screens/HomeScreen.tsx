import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { Text } from "react-native-paper";
import { shadow } from "react-native-paper";

export function HomeScreen() {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.background}
    >
      <View style={{ flex: 1, marginTop: 150, alignItems: "center" }}>
        <Image
          source={require("../../assets/logoo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text} variant="headlineMedium">Create your NFT with AI</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 280,
    height: 280,
  },
  text: {
    color: "white",
    fontSize: 27,
    fontWeight: "600"
  }
});
