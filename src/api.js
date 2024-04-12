import axios from 'axios';

// Define base URL for API endpoints
const baseURL = process.env.BASE_URL || 'https://resize-backend-latest.vercel.app';

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL,
});

// Generic function to make API requests
const apiRequest = async (method, url, data = null) => {
  try {
    const startTime = new Date(); // Record the start time
    const response = await axiosInstance[method](url, data);
    const endTime = new Date(); // Record the end time
    const executionTime = endTime - startTime; // Calculate the execution time in milliseconds
    console.log(`API ${method.toUpperCase()} ${url} took ${executionTime} ms to execute`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add new data
export const addData = async (formData) => {
  return apiRequest('post', 'api/add', formData); // Add data API
};

// Function to update existing data
export const updateData = async (id, formData) => {
  return apiRequest('put', `api/update/${id}`, formData); // Update data API
};

// Function to get all data
export const getAllData = async () => {
  return apiRequest('get', 'api/getData'); // Get all data API
};

// Function to get counts
export const getCounts = async () => {
  return apiRequest('get', 'api/count'); // Get counts API
};
