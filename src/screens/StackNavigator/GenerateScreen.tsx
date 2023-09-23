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
    console.log(style)
    if(!inputText && !style){
      return
    }
    navigation.push("ResultsScreen", { prompt: inputText, style: style });
  };

  const [style, setStyle] = useState("text2img");

  let styles = [
    "text2img",
    "pop-art",
    "anime-portrait",
    "fantasy-character",
    "pixel-art",
    "mysticism-art",
    "retro-game",
    "robot-battle",
    "post-impressionist-painting",
    "street-art",
    "playing-card",
    "abstract-painting"

  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        style={{
          marginBottom: 5,
        }}
        multiline
        mode="outlined"
        label="Type something interesting"
        numberOfLines={3}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
      />

      <Text style={{ marginBottom: 0 }} variant="titleMedium">
        Choose a style: {style.split("-").join(" ")}
      </Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
        {styles.map((style) => (
          <View key={style}  style={{ width: "25%" }}>
            <Button mode="text" onPress={() => setStyle(style)}>
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
