import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async (page=1, limit=10) => {
  const response = await axios.get(`${BASE_URL}/products`,{
    params:{
      page,
      limit
    }
  });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await axios.post(`${BASE_URL}/products`, product);
  return response.data;
};

export const updateProduct = async (id: string, product: any) => {
  const response = await axios.put(`${BASE_URL}/products/${id}`, product);
  return response.data;
};


export const deleteProduct = (id: string) => async (dispatch: Dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/products/${id}`);
    dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_PRODUCT_ERROR", payload: error });
  }
};
