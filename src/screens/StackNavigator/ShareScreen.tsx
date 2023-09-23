import React, { useState } from "react";
import { View, Image, Share } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, Button } from "react-native-paper";
import { RootStackParamList } from "../../types";
import axios from "axios";


export function ShareScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "ShareScreen">) {
  const { imageUrl, signature, network } = route.params;
  const [copied, setCopied] = useState(false);
  const getLink = async () => {
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

      const nft_link = `https://translator.shyft.to/address/${response.data.result.actions[0].info.nft_address}?cluster=${network}&compressed=true`
      return nft_link

    } catch (error) {
      console.error(error);
    }
  };
  const handleShareTwitter = async () => {
    const nft_link = await getLink();
    const url_TW = `https://twitter.com/intent/tweet?text=I%20have%20minted%20an%20NFT%21&url=${nft_link}&hashtags=NFT,Solana,Imint`
    window.open(url_TW)
  }
  const handleCopyLink = async () => {
    const nft_link = await getLink();
    await navigator.clipboard.writeText(nft_link || "")
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />

      <Text style={{ marginBottom: 15 }} variant="headlineSmall">
        Mint sucessful
      </Text>
      <Text style={{ marginBottom: 10 }} variant="titleLarge">
        Share your NFT
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 30,
          gap: 10,
        }}
      >
        <Button icon="content-copy" mode="contained" onPress={async () => {
          await handleCopyLink();
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}>
          {copied ? 'Copied' : 'Copy Link'}
        </Button>
        <Button icon="twitter" mode="contained" onPress={() => handleShareTwitter()}>
        Twitter
        </Button>
      </View>
    </View>
  );
}
