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
            'Authorization': 'Bearer WyIweDNkYThkMjk1MDQ4ZjM1MGJjNWIyNzJlNDQ0MGU0NmNjMWI5NTk1MDlmODA1NjVhZDE3OWRhYmJiZTk4MjQ5YTUxNDgxNDMyMDkwNzEzNDcyOTQxMTc0MWU0MGUxMDlmMWI5MDE3M2ZmMDM2ZDJiOGNhN2E1MjJhM2UyMDY2ZmQ4MWIiLCJ7XCJpYXRcIjoxNjk1NDMxMTUxLFwiZXh0XCI6MTY5NTQzODM1MSxcImlzc1wiOlwiZGlkOmV0aHI6MHgzM0ExZDBDMzdGNDFEQTM0M0FmNzMxNDVDMGMwYTBiZkJGOUEzYkUzXCIsXCJzdWJcIjpcIlhQeDBzQmN3SEQ2R3hnSVkxU05xWFFIZGxxNnNxQ2g5ajZnNGN5OWRxSG89XCIsXCJhdWRcIjpcIlpvYmw1QzJHRWVvT1dudXdpb0RURDRBSnd1NlhFTW5WSEttWjZWOFZZLUU9XCIsXCJuYmZcIjoxNjk1NDMxMTUxLFwidGlkXCI6XCI2YjljNWJkZC03YWNkLTRlZjctOGI1NC00MDQyNTBiNDJhZmFcIixcImFkZFwiOlwiMHg2MjNlZDNiMjFmNTQ2OWM0NjRhYTJiZjI5MTRkNjU0M2RkNDlmNzExNjliYjdlNDY3MDNkZGZkM2RlMzQ1NzZhMzc2OWJhNmE5NWQ2NjQxMjdiMTFhNjRjNDk0NGFiYzNhMjgyOGFhZjBkZjViNjZiYjQ2YzIzNGZmMjIwOWRmZjFiXCJ9Il0=',
            'Content-Type': 'image/*'
          }
        }
      );

      console.log(response);
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
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <Button icon="magic-staff" mode="contained" onClick={openFilePicker} style={{ cursor: 'pointer' }} >
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
