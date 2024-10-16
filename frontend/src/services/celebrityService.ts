// src/services/celebrityService.ts

import { airtableApi } from './api'; // Assuming you've exported airtableApi from an api.ts file

interface Celebrity {
  // Define the structure of a celebrity object here
  // For example:
  id: string;
  fields: {
    Name?: string;
    Image?: string;
    // Add other fields as needed
  };
}

export const getCelebrities = async (): Promise<Celebrity[]> => {
  try {
    const response = await airtableApi.get<Celebrity[]>('/celebrities');
    return response.data;
  } catch (error) {
    console.error('Error fetching celebrity data:', error);
    return [];
  }
};