// src/services/catalogueService.ts

import { airtableApi } from './api'; // Assuming you've exported airtableApi from an api.ts file

interface AirtableRecord {
  fields: {
    Name?: string;
    'Front Image'?: any;
    [key: string]: any;
  };
}

const handleApiError = (error: any, itemType: string) => {
  console.error(`Error fetching ${itemType} data:`, error);
  return [];
};

export const getUpperwearItems = async () => {
  try {
    const response = await airtableApi.get('/Upperwear');
    return response.data.filter((item: AirtableRecord) => item.fields.Name);
  } catch (error) {
    return handleApiError(error, 'Upperwear');
  }
};

export const getLowerwearItems = async () => {
  try {
    const response = await airtableApi.get('/Lowerwear');
    return response.data.filter((item: AirtableRecord) => item.fields['Front Image']);
  } catch (error) {
    return handleApiError(error, 'Lowerwear');
  }
};

export const getFootwearItems = async () => {
  try {
    const response = await airtableApi.get('/Footwear');
    return response.data.filter((item: AirtableRecord) => item.fields['Front Image']);
  } catch (error) {
    return handleApiError(error, 'Footwear');
  }
};