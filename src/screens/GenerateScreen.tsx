import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import FormData from "form-data";
import { MintButton } from "../components/MintButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TextInput, Text, Button } from "react-native-paper";
import { generate } from "fast-glob/out/managers/tasks";

type RootStackParamList = {
  GenerateScreen: {};
  ResultsScreen: { prompt: string };
};
const Stack = createStackNavigator<RootStackParamList>();

function GenerateScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "GenerateScreen">) {
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
        placeholder="Type something interesting"
        label="generate promp"
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

function ResultsScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ResultsScreen">) {
  const { prompt } = route.params;
  const [imageUrl, setImageUrl] = useState<string>(""); // Lưu trữ đường dẫn hình ảnh
  const [loading, setLoading] = useState<boolean>(false);
  console.log(prompt);
  const fetchData = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("text", prompt);
      form.append("grid_size", "1");
      const response = await axios.post(
        "https://api.deepai.org/api/text2img",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": "quickstart-QUdJIGlzIGNvbWluZy4uLi4K",
          },
        }
      );
      const generatedImageUrl = response.data.output_url;
      setImageUrl(generatedImageUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
      setImageUrl("https://static.thenounproject.com/png/504708-200.png");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReGenerate = () => {
    fetchData();
  };

  const handleChoose = () => {};

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              gap: 10
            }}
          >
            <Button icon="reload" mode="outlined" onPress={handleReGenerate}>
              Re-Generate
            </Button>
            <MintButton />
          </View>
        </>
      )}
    </View>
  );
}

export const GenerateNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GenerateScreen"
        component={GenerateScreen}
        options={{ title: "Generate" }}
      />
      <Stack.Screen
        name="ResultsScreen"
        component={ResultsScreen}
        options={{ title: "Result" }}
      />
    </Stack.Navigator>
  );
};
