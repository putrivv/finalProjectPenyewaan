"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";

interface kategori {
  id: number;
  name: string;
  icon?: string; // You can add an icon property if you have icons for each kategori
}

const Kategori = () => {
  const [categories, setCategories] = useState<kategori[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api-penyewaan.aran8276.site/kategori");

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const data = await response.json();
        console.log("API Response:", data); // Debugging

        // Check if the data is an array
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error("Invalid data format: Expected an array");
        }
      } catch (err: any) {
        console.error("Error fetching categories:", err); // Debugging
        setError(err.message || "Gagal mengambil data kategori");
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Head>
        <title>Kategori</title>
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Kategori</h1>
        {error && (
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((kategori) => (
            <div
              key={kategori.id}
              className="card bg-base-200 shadow-xl p-4 flex flex-col items-center text-center"
            >
              <div className="card-icon mb-2">
                <span className={`text-3xl ${kategori.icon}`}></span>{" "}
                {/* Assuming you have icon classes */}
              </div>
              <h2 className="text-lg font-semibold">{kategori.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Kategori;