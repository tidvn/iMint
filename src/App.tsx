import { registerRootComponent } from "expo";
import { RecoilRoot } from "recoil";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts, Inter_900Black } from "@expo-google-fonts/dev";

import { GenerateNavigator } from './screens/GenerateScreen';
import { HomeScreen } from "./screens/HomeScreen";

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    
    <Tab.Navigator
      initialRouteName="Generate"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Generate"
        component={GenerateNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Generate",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tree" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
 
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    
    <RecoilRoot>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </RecoilRoot>
   
  );
}

export default registerRootComponent(App);
