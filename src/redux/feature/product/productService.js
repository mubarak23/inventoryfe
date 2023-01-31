import axios from 'axios';
import { toast } from 'react-toastify';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5001';

const API_URL = `${BACKEND_URL}/api/products`;

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    if (response.status === 201) {
      toast.success('Product Created Successfully');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    toast.success('User Products Fetch Successfully');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(API_URL + id);
    toast.success(' Product Details Fetch Successfully');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateProduct = async (updateProductData, id) => {
  try {
    const response = await axios.patch(API_URL + id, updateProductData);
    if (response.status === 200) {
      toast.success('Product Updated Successfully');
      return response.data;
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(API_URL + id);
    toast.success(' Product Details Deleted Successfully');
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
