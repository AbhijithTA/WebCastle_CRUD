'use client'

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/services/productService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addNewProduct } from "@/store/productSlice";
import toast from "react-hot-toast";
import { error } from "console";

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleCreate = async (data: {
    title: string;
    description?: string;
    price: number;
    category?: string;
    image?: string;
  }) => {
    try {
      
      await dispatch(addNewProduct(data)).unwrap();
      toast.success('Product Created Successfully');
      router.push("/");
    } catch (err) {
      console.error("Failed to create Product:", err);
      toast.error("Failed to create Product");
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreate} submitText="Create" />
    </div>
  );
}
