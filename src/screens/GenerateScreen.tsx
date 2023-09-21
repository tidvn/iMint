import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import FormData from 'form-data';
import { MintButton } from '../components/MintButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
type RootStackParamList = {
    GenerateScreen: {};
    ResultsScreen: { prompt: string };
};
const Stack = createStackNavigator<RootStackParamList>();

function GenerateScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "GenerateScreen">) {
    const [inputText, setInputText] = useState("");

    const handleGenerateText = () => {
        navigation.push("ResultsScreen", { prompt: inputText });
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <TextInput
                style={{
                    height: 150,
                    borderColor: "gray",
                    borderWidth: 1,
                    marginBottom: 16,
                    padding: 8,
                }}
                multiline
                placeholder="Enter something interesting"
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />
            <Button title="Generate" onPress={handleGenerateText} />
        </View>
    );
}

function ResultsScreen({ route, navigation }: NativeStackScreenProps<RootStackParamList, "ResultsScreen">) {
    const { prompt } = route.params;
    const [imageUrl, setImageUrl] = useState<string>(''); // Lưu trữ đường dẫn hình ảnh
    const [loading, setLoading] = useState<boolean>(false);
    console.log(prompt)
    const fetchData = async () => {
        try {
            setLoading(true);
            const form = new FormData();
            form.append('text', prompt);
            form.append('grid_size', '1');
            const response = await axios.post(
                'https://api.deepai.org/api/text2img',
                form,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'api-key': 'quickstart-QUdJIGlzIGNvbWluZy4uLi4K'
                    }
                }
            );
            const generatedImageUrl = response.data.output_url;
            setImageUrl(generatedImageUrl);
        } catch (error) {
            console.error('Error fetching image:', error);
            setImageUrl("https://static.thenounproject.com/png/504708-200.png")
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

    const handleChoose = () => {

    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {loading ? (
                <Text>Loading...</Text>
            ) : (<>
                <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop:30 }}>
                <TouchableOpacity
                    onPress={handleReGenerate}
                    style={{width: 50, // Định kích thước chiều rộng
                    height: 50,  // Định kích thước chiều cao
                    backgroundColor: 'blue', // Màu nền
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius:3
                }}
                >
                    <View style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
                        <MaterialCommunityIcons name="sync-alert" color='white'  />

                    </View>
                </TouchableOpacity>
                <MintButton />

            </View>
            </>
            )}

           
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
        </Stack.Navigator>
    );
};

