'use client'

import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/services/productService";

export default function CreateProductPage() {
  const router = useRouter();

  const handleCreate = async (data: {
    title: string;
    description?: string;
    price: number;
    category?: string;
    image?: string;
  }) => {
    try {
      await createProduct(data);
      router.push("/");
    } catch (err) {
      console.error("Failed to create Product:", err);
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreate} submitText="Create" />
    </div>
  );
}
