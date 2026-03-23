"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  createdAt: string;
};

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e: any) => {
    e.preventDefault();

    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        stock: Number(stock),
      }),
    });

    setName("");
    setPrice("");
    setStock("");
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>B.V.R Perera - Inventory Management</h1>

      <form onSubmit={addProduct}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Products</h2>

      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price} - Stock:{" "}
          <span style={{ color: p.stock < 5 ? "red" : "black" }}>
            {p.stock}
          </span>
          <button onClick={() => deleteProduct(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}