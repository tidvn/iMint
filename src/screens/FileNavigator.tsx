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
import FormData from 'form-data';
import * as fs from 'fs';


const Stack = createStackNavigator<RootStackParamList>();
function FileScreen({navigation}: NativeStackScreenProps<RootStackParamList, "FileScreen">) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<any | null>(null);
  const handleFileInputChange = () => {
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile)
    }
  };

  const handleFileUpload = async (selectedFile: any | Blob) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await axios.post(
        'https://api.shyft.to/sol/v1/storage/upload',
        formData,
        {
          headers: {
            'accept': 'application/json',
            'x-api-key': 'L0UODCZRyl9JQ6sR',
            'Content-Type': 'multipart/form-data'
          }
        }
      );
        const uri = response.data.result.uri;
      if (uri){
        navigation.push("MintScreen",{imageUrl: uri});
      }
    } catch (error) {
      console.log('Lỗi khi tải lên tệp:', error);
    }finally{
      setLoading(false);
    }
  };


  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <Button loading={loading} icon="cloud-upload" mode="contained" onPress={openFilePicker} disabled={loading} >
        {(loading)?'Uploading...':'Select Image'}
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
