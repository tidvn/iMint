import React from "react";
import { View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";
import axios from "axios";
import Share from 'react-native-share';


export function ShareScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ShareScreen">) {
  const { imageUrl, signature,network } = route.params;
  const handleShare = async () => {
    
    try {
      const response = await axios.get('https://api.shyft.to/sol/v1/transaction/parsed', {
        params: {
          'network': network,
          'txn_signature': signature
        },
        headers: {
          'accept': '*/*',
          'x-api-key': '4K7aiItHJ0EvuZqk'
        }
      });
      
      const nft_link=`https://translator.shyft.to/address/${response.data.result.actions[0].info.nft_address}?cluster=${network}&compressed=true`
      Share.open({
        title: 'Share via',
        message: 'Check this out',
        url: nft_link,
      })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
      
      // const urlToRedirect =`http://twitter.com/share?text=I%20have%20minted%20an%20NFT%21&url=${nft_link}&hashtags=NFT`;
      // window.open(urlToRedirect, "_blank")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={{ flex: 1, padding: 16, alignItems: "center" }}>
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
