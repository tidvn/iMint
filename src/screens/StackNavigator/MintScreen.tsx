import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TextInput, Text, Button, IconButton } from "react-native-paper";
import { RootStackParamList } from "../../types";
import { MintButton } from "../../components/MintButton";
import axios from "axios";





export function MintScreen({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, "MintScreen">) {
  const { imageUrl } = route.params;
  interface Field {
    key: string;
    value: string;
  }
  const [loading, setLoading] = useState<boolean>(false);
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    symbol: "",
  });
  const [fields, setFields] = useState<Field[]>([]);
  const moreField = () => {
    let newField: Field = {
      key: "",
      value: "",
    }
    setFields([...fields, newField]);
  }
  const handleFieldChange = (index: number, fieldName: string, fieldValue: string) => {
    const updatedFields = [...fields];
    updatedFields[index] = {
      ...updatedFields[index],
      [fieldName]: fieldValue,
    };
    setFields(updatedFields);
  };
  const deleteField = (index: number) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1)
    setFields(updatedFields);
  }
  const uploadImage = async () => {
    try {
      const blob = await axios.get(imageUrl, { responseType: 'arraybuffer' })

      if (blob.status !== 200) {
        throw new Error(`Failed to fetch image with status: ${blob.status}`);
      }
      const imageBlob = new Blob([blob.data]);
      const imageFile = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });
      var formdata = new FormData();
      formdata.append("file", imageFile, "mintImage.jpeg");

      const response = await axios.post(
        "https://api.shyft.to/sol/v1/storage/upload",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": "SdeplwOAeAzCOhEu"
          }
        }
      )
      return response.data.result;

    } catch (error) {
      console.error("Error upload image:", error);
    }
  }
  const handleFinish = async () => {
    try {
      setLoading(true);
      const { uri } = await uploadImage();
      let attributes = JSON.stringify(fields)
      let body = {
        "name": metadata.name,
        "symbol": metadata.symbol,
        "description": metadata.description,
        "image": uri,
        "attributes": attributes,
        "royalty": 5,
        "creator": "BvzKvn6nUUAYtKu2pH3h5SbUkUNcRPQawg4bURBiojJx",
        "share": 100,
        "external_url": "https://www.example.com",
        "files": [
          {
            "uri": "https://nftstorage.link/ipfs/bafybeia4ml3aaj3tqln5z6qxqvi2ygfouw4ppt7t3qp3wrsoiccslexomm",
            "type": "image/png"
          },
          {
            "uri": "https://nftstorage.link/ipfs/bafybeigvojjdy5ofaeu7semfvdjugnbutda37r35xjpsvmm5vzblill6k4",
            "type": "image/png"
          }
        ]
      }

      const response = await axios.post(
        "https://api.shyft.to/sol/v1/metadata/create",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "SdeplwOAeAzCOhEu"
          }
        }
      );
      console.log(response);
      if (response.data.success) {
        navigation.push("ShareScreen", {imageUrl: ""});
      }
    } catch (error) {
      console.error("Error mint nft:", error);
    } finally {
      setLoading(false);
    }
  };

  return (<>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <View style={{ alignItems: "center" }}>
          <Image source={{ uri: imageUrl }} style={{ width: 150, height: 150 }} />
          <Text variant="titleMedium">Provide information to complete</Text>
        </View>
        <TextInput
          style={{ marginBottom: 10, marginTop: 5 }}
          mode="outlined"
          label="Name"
          value={metadata.name}
          onChangeText={(e) => setMetadata({ ...metadata, name: e })}
        />
        <TextInput
          style={{ marginBottom: 10 }}
          mode="outlined"
          multiline
          numberOfLines={3}
          label="Description"
          value={metadata.description}
          onChangeText={(e) => setMetadata({ ...metadata, description: e })}
        />
        <TextInput
          style={{ marginBottom: 15 }}
          mode="outlined"
          label="Symbol"
          value={metadata.symbol}
          onChangeText={(e) => setMetadata({ ...metadata, symbol: e })}
        />
        <View>
          {fields.map((field, index) => (
            <View key={index} style={styles.fieldWrap}>
              <View style={styles.fieldKey}>
                <TextInput
                  mode="outlined"
                  label="Key"
                  value={field.key}
                  onChangeText={(e) => handleFieldChange(index, 'key', e)}
                />
              </View>
              <View style={styles.fieldValue}>
                <TextInput
                  mode="outlined"
                  label="Value"
                  value={field.value}
                  onChangeText={(e) => handleFieldChange(index, 'value', e)}
                />
              </View>
              <View style={styles.deleteField} >
                <IconButton 
                iconColor="red"
                onPress={() => deleteField(index)} 
                icon="delete-outline" 
                mode="outlined" />
              </View>
            </View>
          ))}
        </View>
        <Button style={{ marginBottom: 10}} icon="plus" mode="outlined" onPress={moreField}>
          Add more
        </Button>
        <MintButton/>
      </View>
    )}
  </>);
}
const styles = StyleSheet.create({
  fieldWrap: {
    display: "flex",
    marginBottom: 15,
    marginStart: -6,
    marginEnd: -6,
    flexDirection: "row"
  },
  fieldKey: {
    paddingStart: 6,
    paddingEnd: 6,
    // width: "40%"
    flex: 1
  },
  fieldValue: {
    paddingStart: 6,
    paddingEnd: 6,
    // width: "40%"
    flex: 1
  },
  deleteField: {
    paddingStart: 6,
    paddingEnd: 6,
    alignItems: 'center',
    marginTop: 4
  }
});