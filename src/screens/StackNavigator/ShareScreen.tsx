import React from "react";
import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";
// import Share from "react-native-share"
// import * as Linking from 'expo-linking';
import  WebView  from 'react-native-inappbrowser-reborn';

export function ShareScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ShareScreen">) {
  const { imageUrl } = route.params;

  const handleShare =  () => {
    console.log(imageUrl)
    // const imgUrlTemp = 'https://reactscript.com/wp-content/uploads/2016/09/React-Native-Popup-Dialog.png'
    const urlToRedirect = 
      `http://twitter.com/share?text=I%20have%20minted%20an%20NFT%21&url=${imageUrl}&hashtags=NFT`;
    // Linking.openURL(imageUrl)
    // navigation.navigate({ url: urlToRedirect });
    try {
      // const result = await WebView.open(urlToRedirect)
      const result = window.open(urlToRedirect)

      // Handle the result if needed
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShareToSocials = () => {
    // const options = {
    //   url:imageUrl

    // }
    // Share.open(options)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     err && console.log(err);
    //   });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, alignItems: "center" }}>
      <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />

      <Text style={{ marginBottom: 15 }} variant="headlineSmall">
        Mint sucessful
      </Text>
      <Text style={{ marginBottom: 10 }} variant="titleLarge">
        Share your NFT on Twitter
      </Text>
      <div>
        <Button icon="twitter" mode="contained" onPress={handleShare}>
          Share
        </Button>
        {/* <Button icon="twitter" mode="contained" onPress={handleShareToSocials}>
          Share to socials
        </Button> */}
      </div>
    </View>
  );
}
