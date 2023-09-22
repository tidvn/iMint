import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, Button } from "react-native-paper";
import { RootStackParamList } from "../types";
import { ResultsScreen } from "./StackNavigator/ResultsScreen";
import { MintScreen } from "./StackNavigator/MintScreen";
import { ShareScreen } from "./StackNavigator/ShareScreen";


const Stack = createStackNavigator<RootStackParamList>();
function FileScreen({navigation}: NativeStackScreenProps<RootStackParamList, "FileScreen">) {
  const [file, setFile] = useState();

  const handleGenerateText = () => {
    navigation.push("MintScreen", { imageUrl: "" });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Button icon="magic-staff" mode="contained" onPress={handleGenerateText}>
        Generate
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
