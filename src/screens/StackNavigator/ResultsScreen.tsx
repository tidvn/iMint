import React, { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";
import axios from "axios";
import { generateImage } from "../../function";

export function ResultsScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ResultsScreen">) {
  const handleNext = () => {
    navigation.push("MintScreen", { imageUrl: imageUrl });
  };

  const { prompt, style } = route.params;
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await generateImage(prompt, style + "-generator")
      const generatedImageUrl = response.data.imageUrl;
      setImageUrl(generatedImageUrl);
      setResult(true);
    } catch (error) {
      console.error("Error fetching image:", error);
      setResult(false);
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
      {loading ? (<>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Generate Image ...</Text>
      </>

      ) : (
        <>{result ? (
          <Image
            source={{ uri: imageUrl }}
            style={{ width: 200, height: 200 }}
          />
        ) : (<>
          <Image
            source={require('../../../assets/error.png')}
            style={{ width: 200, height: 200 }}
          />
          <Text>Error , Try again ? </Text>
        </>)
        }

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
            <Button disabled={!result} icon="arrow-right" mode="contained" onPress={handleNext}>
              Continue
            </Button>
          </View>
        </>
      )}
    </View>
  );
}