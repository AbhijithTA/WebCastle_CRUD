"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import ProductForm from "@/components/ProductForm";
import { fetchProductById, updateExistingProduct } from "@/store/productSlice";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const dispatch = useDispatch<AppDispatch>();

  const { currentProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const handleUpdate = async (data: {
    title: string;
    description?: string;
    price: number;
    category?: string;
    image?: string;
  }) => {
    try {
      await dispatch(updateExistingProduct({ id, product: data })).unwrap();
      toast.success('Product updated successfully!');
      router.push("/");
    } catch (error: any) {
      console.error("Update Error", error);
      toast.error(error.message || 'Failed to update product');
    }
  };

  if (loading) return (
    <div className="text-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
      <p>Loading product details...</p>
    </div>
  );

  if (error) return (
    <div className="text-center p-4">
      <p className="text-red-500 mb-4">{error}</p>
      <button 
        onClick={() => router.push("/")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Products
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        initialData={currentProduct}
        onSubmit={handleUpdate}
        submitText="Update Product"
      />
    </div>
  );
}