import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import {  Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";

export function ResultsScreen({
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
      const form = {
        prompt: prompt,
        style: "text2img"
        }
        // throw new Error("test")
      const response = await axios.post('https://imint.tdung.com/api/image', form,);
      const generatedImageUrl = response.data.imageUrl;
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