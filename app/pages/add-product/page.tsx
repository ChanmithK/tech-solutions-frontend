"use client";
import Navbar from "@/app/components/Navbar";
import axios from "axios";
import React, { useState } from "react";

const AddProduct = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // Function to handle adding a new product
  const addProduct = async () => {
    try {
      await axios.post("http://localhost:3001/products", {
        name,
        description,
        price: parseFloat(price),
        category,
      });

      // Clear input fields after successful addition
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");

      console.log(
        "Product added successfully:",
        name,
        description,
        price,
        category
      );
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      {/* Including the Navbar component with 'user' type */}
      <Navbar type="user" />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Add New Product</h2>
        <form className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Product Name"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
              placeholder="Description"
              rows={3}
            ></textarea>
          </div>
          <div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Price"
            />
          </div>
          <div>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Category"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={addProduct}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
