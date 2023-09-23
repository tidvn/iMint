import React, { useState } from "react";
import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";
import { MintButton } from "../../components/MintButton";
import axios from "axios";





export function MintScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MintScreen">) {
  const { imageUrl } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    tag: "",
  });
  const handleGenerateText = () => {
    navigation.push("ShareScreen",{imageUrl});
  };
  const uploadImage = async () => {
    try {
      const blob = await axios.get(imageUrl, { responseType: 'arraybuffer' })

      if (blob.status !== 200) {
        throw new Error(`Failed to fetch image with status: ${blob.status}`);
      }
      const imageBlob = new Blob([blob.data]);
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

    } catch (error) {
      console.error("Error upload image:", error);
    }
  }
  const handleFinish = async () => {
    try {
      setLoading(true);
      const { uri } = await uploadImage();
      let body = {
        "name": metadata.name,
        "symbol": "IMint",
        "description": metadata.description,
        "image": uri,
        "attributes": [],
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
      if (response.data.success) {
        navigation.push("ShareScreen", {imageUrl: ""});
      }
    } catch (error) {
      console.error("Error mint nft:", error);
    } finally {
      setLoading(false);
    }
  };

  return (<>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: imageUrl }} style={{ width: 150, height: 150 }} />
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
          <Button icon="magic-staff" mode="contained" onPress={handleGenerateText}>
            Generate
          </Button>
        {/* <MintButton/> */}
      </View>
    )}
  </>);
}