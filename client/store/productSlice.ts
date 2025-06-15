import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../services/productService";

interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
}

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    return await getAllProducts(page, limit);
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination = {
          ...state.pagination,
          currentPage: action.payload.currentPage || 1,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
