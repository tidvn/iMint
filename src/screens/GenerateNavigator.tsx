import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { GenerateScreen } from "./StackNavigator/GenerateScreen";
import { ResultsScreen } from "./StackNavigator/ResultsScreen";
import { MintScreen } from "./StackNavigator/MintScreen";
import { ShareScreen } from "./StackNavigator/ShareScreen";


const Stack = createStackNavigator<RootStackParamList>();

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
