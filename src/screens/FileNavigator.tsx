import { createStackNavigator } from "@react-navigation/stack";
import React, { useRef, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, Button } from "react-native-paper";
import { RootStackParamList } from "../types";
import { ResultsScreen } from "./StackNavigator/ResultsScreen";
import { MintScreen } from "./StackNavigator/MintScreen";
import { ShareScreen } from "./StackNavigator/ShareScreen";
import axios from "axios";


function generateRandomString(length: number) {  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);  }
  return result;
} 

const Stack = createStackNavigator<RootStackParamList>();
function FileScreen({navigation}: NativeStackScreenProps<RootStackParamList, "FileScreen">) {
  const fileInputRef = useRef<any | null>(null);
  const handleFileInputChange = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile)
      // console.log(selectedFile);
    }
  };

  const handleFileUpload = async (selectedFile: any | Blob) => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(
        'https://api.nft.storage/upload',
        formData,
        {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMzQTFkMEMzN0Y0MURBMzQzQWY3MzE0NUMwYzBhMGJmQkY5QTNiRTMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5NTIzMTgxMTAzMCwibmFtZSI6InRpZHZuIn0.T1XYEySDt6tQLm6Uh_Y4GFZNhwEvShXeNS8GeDbuF2Q',
            'Content-Type': 'image/*'
          }
        }
      );
      const uri = `https://${response.data.value.pin.cid}.ipfs.nftstorage.link/${response.data.value.files[0].name}`
      console.log(uri);
      if (uri){
        navigation.push("MintScreen",{imageUrl: uri});
      }
    } catch (error) {
      console.log('Lỗi khi tải lên tệp:', error);
    }
  };


  const openFilePicker = () => {
    // Check if fileInputRef.current is not null before triggering click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <View style={{ flex: 1, padding: 16 }}>
      <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <Button icon="magic-staff" mode="contained" onPress={openFilePicker} >
        Select Image
      </Button>
    </View>
  );
}
export const FileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FileScreen"
        component={FileScreen}
        options={{ title: "File" }}
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
