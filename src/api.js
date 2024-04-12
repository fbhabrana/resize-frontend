import axios from 'axios';

const baseURL = process.env.BASE_URL || 'https://resize-backend-latest.vercel.app';

const axiosInstance = axios.create({
  baseURL,
});

// Function to add new data
export const addData = async (formData) => {
  try {
    const response = await axiosInstance.post('api/add', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update existing data
export const updateData = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`api/update/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all data
export const getAllData = async () => {
  try {
    const response = await axiosInstance.get('api/getData');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get counts
export const getCounts = async () => {
  try {
    const response = await axiosInstance.get('api/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching counts:', error);
    throw error;
  }
};
