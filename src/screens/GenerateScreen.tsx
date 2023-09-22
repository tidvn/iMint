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
  MintScreen: { imageUrl : string };
  ShareScreen: {};
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
    navigation.push("MintScreen", {imageUrl: imageUrl});
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
            <Button icon="reload" mode="outlined" onPress={handleNext}>
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
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    tag: "",
  });

  const { imageUrl } = route.params;
  
  
  const [loading, setLoading] = useState<boolean>(false);

  const uploadImage = async () => {
    try {
      const blob  = await axios.get(imageUrl, { responseType: 'arraybuffer' })
        
      if (blob.status !== 200) {
        throw new Error(`Failed to fetch image with status: ${blob.status}`);
      }

      // Create a Blob from the response data
      const imageBlob = new Blob([blob.data]);

      // Create a File object from the Blob
      const imageFile = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });
        

      var formdata = new FormData();
      formdata.append("file", imageFile, "mintImage.jpeg");

      const response = await axios.post(
        "https://api.shyft.to/sol/v1/storage/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": "SdeplwOAeAzCOhEu"
          }
        }
      )
      return response.data.result;
      
    } catch(error) {
      console.error("Error upload image:", error);
    } 
  }

  const handleFinish = async () => {
    try {
      setLoading(true);
      const { uri } = await uploadImage();
      
      let body = {
        "name": metadata.name,
        "symbol": "SHY",
        "description": metadata.description,
        "image": uri,
        "attributes": [
          {
            "trait_type": "fast",
            "value": "80"
          },
          {
            "trait_type": "efficient",
            "value": 100
          }
        ],
        "royalty": 5,
        "creator": "BvzKvn6nUUAYtKu2pH3h5SbUkUNcRPQawg4bURBiojJx",
        "share": 100,
        "external_url": "https://www.example.com",
        "files": [
          {
            "uri": "https://nftstorage.link/ipfs/bafybeia4ml3aaj3tqln5z6qxqvi2ygfouw4ppt7t3qp3wrsoiccslexomm",
            "type": "image/png"
          },
          {
            "uri": "https://nftstorage.link/ipfs/bafybeigvojjdy5ofaeu7semfvdjugnbutda37r35xjpsvmm5vzblill6k4",
            "type": "image/png"
          }
        ]
      }
      
      const response = await axios.post(
        "https://api.shyft.to/sol/v1/metadata/create",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "SdeplwOAeAzCOhEu"
          }
        }
      );
      console.log(response);
    } catch(error) {
      console.error("Error mint nft:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text variant="titleMedium">Provide information to complete</Text>
          <TextInput
            style={{ marginBottom: 5 }}
            mode="outlined"
            label="Name"
            value={metadata.name}
            onChangeText={(e) => setMetadata({ ...metadata, name: e })}
          />
          <TextInput
            style={{ marginBottom: 5 }}
            mode="outlined"
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
            Generate
          </Button>
        </>
      )}
      
    </View>
  );
}

function ShareScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ShareScreen">) {

  const handleShare = () => {

  }

  return (
    <View>
      {/* <image></image> */}
      <Text variant="headlineSmall">Mint sucessful</Text>
      <Text variant="titleLarge">Share your NFT on Twitter</Text>
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
