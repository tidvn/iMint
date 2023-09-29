import axios from "axios";
import {shift_key,endpoint}  from '../../config.json';


export async function generateImage(prompt: string, style: string) {
  return await axios.post(`${endpoint}/api/image`, { prompt, style });
}
export async function uploadImageFromUrl(url: string) {

  const blob = await axios.get(url, { responseType: 'arraybuffer' })
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
        "x-api-key": shift_key,
      }
    }
  )
  return response.data.result.uri;
}
export async function uploadImageFromFile(file: any | Blob) {

  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    'https://api.shyft.to/sol/v1/storage/upload',
    formData,
    {
      headers: {
        'accept': 'application/json',
        'x-api-key': shift_key,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.data.result.uri;

}
export async function createMetadata(metadata: any) {
  const response = await axios.post(
    "https://api.shyft.to/sol/v1/metadata/create",
    metadata,
    {
      headers: {
        'accept': 'application/json',
        "Content-Type": "application/json",
        "x-api-key": shift_key,
      }
    }
  );
  return response.data.result.uri
}
export async function createTransaction(network: any, metadata_uri: any, receiver: any) {
  const response = await axios.post(`${endpoint}/api/transaction`, { network, metadata_uri, receiver });
  return response.data.encoded_transaction
}