import axios from 'axios';

const baseURL = process.env.BASE_URL || 'http://localhost:5000/api/data';

const axiosInstance = axios.create({
  baseURL,
});

// Function to add new data
export const addData = async (formData) => {
  try {
    const response = await axiosInstance.post('/add', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update existing data
export const updateData = async (id, formData) => {
  try {
    const response = await axiosInstance.put(`/update/${id}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all data
export const getAllData = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get counts
export const getCounts = async () => {
  try {
    const response = await axiosInstance.get('/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching counts:', error);
    throw error;
  }
};
