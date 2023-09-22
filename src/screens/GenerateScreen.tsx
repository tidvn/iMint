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
  MintScreen: { imageUrl: string };
  ShareScreen: { imageUrl: string };
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

function ResultsScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ResultsScreen">) {
  const handleNext = () => {
    navigation.push("MintScreen", { imageUrl: imageUrl });
  };

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
              gap: 10,
            }}
          >
            <Button icon="reload" mode="outlined" onPress={handleReGenerate}>
              Re-Generate
            </Button>
            <Button icon="arrow-right" mode="contained" onPress={handleNext}>
              Continue
            </Button>
            {/* <MintButton /> */}
          </View>
        </>
      )}
    </View>
  );
}

function MintScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MintScreen">) {
  const { imageUrl } = route.params;
  
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    tag: "",
  });

  const handleFinish = () => {
    navigation.push("ShareScreen", { imageUrl: imageUrl });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16}}>
      <View style={{alignItems: "center"}}>
      <Image source={{ uri: imageUrl }} style={{ width: 180, height: 180 }} />
      <Text variant="titleMedium">Provide information to complete</Text>
      </View>
      <TextInput
        style={{ marginBottom: 10, marginTop: 5 }}
        mode="outlined"
        label="Name"
        value={metadata.name}
        onChangeText={(e) => setMetadata({ ...metadata, name: e })}
      />
      <TextInput
        style={{ marginBottom: 10 }}
        mode="outlined"
        multiline
        numberOfLines={3}
        label="Description"
        value={metadata.description}
        onChangeText={(e) => setMetadata({ ...metadata, description: e })}
      />
      <TextInput
        style={{ marginBottom: 15 }}
        mode="outlined"
        label="Tag"
        value={metadata.tag}
        onChangeText={(e) => setMetadata({ ...metadata, tag: e })}
      />
      <Button icon="check" mode="contained" onPress={handleFinish}>
        Mint
      </Button>
    </View>
  );
}

function ShareScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ShareScreen">) {
  const { imageUrl } = route.params;

  const handleShare = () => {};

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, alignItems: "center" }}>
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
      <Stack.Screen
        name="MintScreen"
        component={MintScreen}
        options={{ title: "Mint" }}
      />
      <Stack.Screen
        name="ShareScreen"
        component={ShareScreen}
        options={{ title: "Share" }}
      />
    </Stack.Navigator>
  );
};
