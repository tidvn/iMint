import React from "react";
import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {  Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";

export function ShareScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ShareScreen">) {
  const { imageUrl } = route.params;

  const handleShare = () => {};

  return (
    <View style={{ flex: 1, padding: 16, alignItems: "center" }}>
      <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />

      <Text style={{ marginBottom: 15 }} variant="headlineSmall">
        Mint sucessful
      </Text>
      <Text style={{ marginBottom: 10 }} variant="titleLarge">
        Share your NFT on Twitter
      </Text>
      <div>
        <Button icon="twitter" mode="contained" onPress={handleShare}>
          Share
        </Button>
      </div>
    </View>
  );
}
