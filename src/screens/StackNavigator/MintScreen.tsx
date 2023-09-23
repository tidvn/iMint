import React, { useState } from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
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
    trait_type: string;
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
      trait_type: "",
      value: "",
    }
    setFields([...fields, newField]);
  }
  const uploadImage = async (iurl:string) => {
    try {
      console.log(iurl)

      const blob = await axios.get(iurl, { responseType: 'arraybuffer' })
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
            'accept': 'application/json',
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

  const handleFinish = async () => {
    try {
      setLoading(true);
      const { uri } = await uploadImage(imageUrl);
      let body = {
        "name": metadata.name,
        "symbol": metadata.symbol,
        "description": metadata.description,
        "image": uri,
        "attributes": fields,
        "share": 100,
        "creator": "9XNHHJDXixJzvwvT4ooFLfq1B1fW1815A1HuhksnGBtN",
      }
      console.log(body)
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
      // if (response.data.success) {
      //   navigation.push("ShareScreen", {imageUrl: ""});
      // }
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
      <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // optional: hides the vertical scroll indicator
      >       <View style={{ alignItems: "center" }}>
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
                  label="Trait type"
                  value={field.trait_type}
                  onChangeText={(e) => handleFieldChange(index, 'trait_type', e)}
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
        <Button onPress={handleFinish}>
          Check
        </Button>
        {/* <MintButton/> */}
        </ScrollView>
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
  },
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1, 
  },
});