"use client";

import { useState, FormEvent } from "react";

type ProductData = {
  title: string;
  description?: string;
  price: number;
  category?: string;
  image?: string;
};

type Props = {
  initialData?: ProductData | null;
  onSubmit: (data: ProductData) => void;
  submitText: string;
};

export default function ProductForm({
  initialData,
  onSubmit,
  submitText,
}: Props) {
  const [formData, setFormData] = useState<ProductData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    category: initialData?.category || "",
    image: initialData?.image || "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.price || formData.price <= 0) {
      setError("Title is required and price must be greater than 0");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">
              {submitText} Product
            </h2>
            <p className="text-blue-100 mt-2">
              Fill in the details below to {submitText.toLowerCase()} your
              product
            </p>
          </div>

          <div className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-900"
              >
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-900"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product (optional)"
                rows={4}
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500 resize-vertical"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Electronics, Clothing"
                  className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-900"
              >
                Image URL
              </label>
              <input
                id="image"
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 placeholder-gray-500"
              />
              {formData.image && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={formData.image}
                    alt="Product preview"
                    className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  submitText
                )}
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center">
              <span className="text-red-500">*</span> Required fields
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
