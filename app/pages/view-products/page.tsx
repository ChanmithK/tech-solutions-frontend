"use client";
import Navbar from "@/app/components/Navbar";
import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

const GetProducts = () => {
  // State hooks for managing products and edit mode
  const [products, setProducts] = useState<Product[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editProductName, setEditProductName] = useState<string>("");
  const [editProductDescription, setEditProductDescription] =
    useState<string>("");
  const [editProductPrice, setEditProductPrice] = useState<number>(0);
  const [editProductCategory, setEditProductCategory] = useState<string>("");

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await response.json();
      setProducts(data); // Update state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle edit button click
  const handleEdit = (productId: number) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditProductId(productToEdit.id);
      setEditProductName(productToEdit.name);
      setEditProductDescription(productToEdit.description);
      setEditProductPrice(productToEdit.price);
      setEditProductCategory(productToEdit.category);
    }
  };

  // Function to handle save changes after editing
  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        id: editProductId!,
        name: editProductName,
        description: editProductDescription,
        price: editProductPrice,
        category: editProductCategory,
      };

      const response = await fetch(
        `http://localhost:3001/products/${editProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      // Update local products state after successful update
      const updatedProducts = products.map((product) =>
        product.id === editProductId ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setEditProductId(null); // Clear edit mode
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Function to handle delete button click
  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Update local products state after successful deletion
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Render loading spinner if products are being fetched
  if (products.length === 0) {
    return (
      <div>
        <Navbar type="user" />
        <div className="flex items-center justify-center h-screen">
          <svg
            aria-hidden="true"
            className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // Render product list once products are fetched
  return (
    <div>
      <Navbar type="user" />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">All Products</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr className="text-gray-600 dark:text-gray-400 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Description</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Category</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 dark:text-gray-800 text-sm font-light">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {product.id}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.id === editProductId ? (
                      <input
                        type="text"
                        value={editProductName}
                        onChange={(e) => setEditProductName(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.id === editProductId ? (
                      <input
                        type="text"
                        value={editProductDescription}
                        onChange={(e) =>
                          setEditProductDescription(e.target.value)
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                      />
                    ) : (
                      product.description
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.id === editProductId ? (
                      <input
                        type="number"
                        value={editProductPrice}
                        onChange={(e) =>
                          setEditProductPrice(Number(e.target.value))
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.id === editProductId ? (
                      <input
                        type="text"
                        value={editProductCategory}
                        onChange={(e) => setEditProductCategory(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
                      />
                    ) : (
                      product.category
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {product.id === editProductId ? (
                      <div className="flex items-center gap-4">
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
                          onClick={handleSaveChanges}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded-md"
                          onClick={() => setEditProductId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetProducts;
