import React, { useState } from "react";
import toast from "react-hot-toast";

type ProductProps = {
  title: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  onEdit: () => void;
  onDelete: () => void;
};

const ProductCard: React.FC<ProductProps> = ({
  title,
  description,
  price,
  category,
  image,
  onEdit,
  onDelete,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await onEdit();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const shouldDelete = await new Promise((resolve) => {
      toast.custom(
        (t) => (
          <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
            <p className="font-medium mb-4 text-red-600">Delete this product?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });

    if (!shouldDelete) return;

    setIsLoading(true);
    try {
      const deletePromise = Promise.resolve(onDelete());

      await toast.promise(deletePromise, {
        loading: "Deleting product...",
        success: "Product deleted successfully!",
        error: (err: Error) => `Failed to delete: ${err.message}`,
      });
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden w-full max-w-sm mx-auto">

      <div className="relative overflow-hidden">
        {image && !imageError ? (
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-500 font-medium">No Image</p>
            </div>
          </div>
        )}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 backdrop-blur-sm bg-opacity-90">
              {category}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {truncateText(title, 50)}
        </h2>
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {truncateText(description, 120)}
          </p>
        )}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="text-sm">Loading...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Edit
              </div>
            )}
          </button>

          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center justify-center px-4 py-3 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default ProductCard;
