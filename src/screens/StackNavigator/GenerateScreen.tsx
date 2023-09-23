import React, { useState } from "react";
import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../types";

export function GenerateScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "GenerateScreen">) {
  const [inputText, setInputText] = useState("");

  const handleGenerateText = () => {
    navigation.push("ResultsScreen", { prompt: inputText, style: style });
  };

  const [style, setStyle] = useState("");

  let styles = [
    "anime-portrait",
    "fantasy-character",
    "pixel-art",
    "mysticism-art",
    "retro-game",
    "robot-battle",
    "post-impressionist-painting",
    "origami-3d",
  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{
          marginBottom: 16,
        }}
        multiline
        mode="outlined"
        label="Type something interesting"
        numberOfLines={4}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />

      <Text style={{ marginBottom: 10 }} variant="titleMedium">
        Choose a style: {style.split("-").join(" ")}
      </Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {styles.map((style, index) => (
          <View style={{ width: "25%" }}>
            <Button key={index} mode="text" onPress={() => setStyle(style)}>
              <Image
                source={require(`../../../assets/chooseStyle/` +style +`.jpg`)}
                style={{ width: 80, height: 80, borderRadius: 15 }}
              />
            </Button>
          </View>
        ))}
      </View>

      <Button icon="magic-staff" mode="contained" onPress={handleGenerateText}>
        Generate
      </Button>
    </View>
  );
}
