"use client";

import ProductForm from "@/components/ProductForm";
import { getProductById, updateProduct } from "@/services/productService";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((res) => {
          setProduct(res);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setError("Product not found");
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      await updateProduct(id, data);
      router.push("/");
    } catch (err) {
      console.error("Update Error", err);
      setError("Failed to update product");
    }
  };

  if (loading) return <p className="text-center p-4">Loading ..</p>;
  if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

  return (
    <div>
      <ProductForm
        initialData={product}
        onSubmit={handleUpdate}
        submitText="Update"
      />
    </div>
  );
}
