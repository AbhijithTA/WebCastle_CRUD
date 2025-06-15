import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

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
  currentProduct: Product | null;
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
  currentProduct: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  },
};

// fetching product
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const data = await getAllProducts(page, limit);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

// fetching a single product
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getProductById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }
);

// adding a new product
export const addNewProduct = createAsyncThunk(
  "products/create",
  async (product: Omit<Product, "_id">, { rejectWithValue }) => {
    try {
      const data = await createProduct(product);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }
);

// updating product
export const updateExistingProduct = createAsyncThunk(
  "products/update",
  async (
    { id, product }: { id: string; product: Partial<Product> },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateProduct(id, product);
      return { id, product: data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }
);

// deleting product
export const removeProduct = createAsyncThunk(
  "products/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
    setProductError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
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
          currentPage: action.payload.currentPage || 1,
          itemsPerPage: action.payload.itemsPerPage || 10,
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch product";
      })
      .addCase(addNewProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.pagination.totalItems += 1;
        state.pagination.totalPages = Math.ceil(
          state.pagination.totalItems / state.pagination.itemsPerPage
        );
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create product";
      })
      .addCase(updateExistingProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.product,
          };
        }
        if (state.currentProduct?._id === action.payload.id) {
          state.currentProduct = {
            ...state.currentProduct,
            ...action.payload.product,
          };
        }
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update product";
      })
      .addCase(removeProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (product) => product._id !== action.payload
        );
        state.pagination.totalItems -= 1;
        state.pagination.totalPages = Math.ceil(
          state.pagination.totalItems / state.pagination.itemsPerPage
        );
        if (state.currentProduct?._id === action.payload) {
          state.currentProduct = null;
        }
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to delete product";
      });
  },
});

export const { clearCurrentProduct, setProductError } = productSlice.actions;
export default productSlice.reducer;
