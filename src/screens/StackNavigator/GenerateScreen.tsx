import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";

export function GenerateScreen({navigation}: NativeStackScreenProps<RootStackParamList, "GenerateScreen">) {
    const [inputText, setInputText] = useState("");
  
    const handleGenerateText = () => {
      navigation.push("ResultsScreen", { prompt: inputText });
    };
  
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
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
        <Button icon="magic-staff" mode="contained" onPress={handleGenerateText}>
          Generate
        </Button>
      </View>
    );
  }