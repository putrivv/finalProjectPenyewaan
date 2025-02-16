"use client"; 

import React, { useState } from 'react';
import ItemCard from '../../../../components/ItemCard';

interface Item {
  id: string;
  name: string;
  imageUrl: string;
}

const EditDeletePage: React.FC = () => {
  // Data dummy untuk menampilkan card
  const [items, setItems] = useState<Item[]>([
    { id: '1', name: 'Laptop', imageUrl: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Proyektor', imageUrl: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Kamera', imageUrl: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Speaker', imageUrl: 'https://via.placeholder.com/150' },
  ]);

  const handleEdit = (id: string) => {
    // Logic untuk edit item
    console.log(`Edit item with id: ${id}`);
  };

  const handleDelete = (id: string) => {
    // Logic untuk delete item
    console.log(`Delete item with id: ${id}`);
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4 bg-[#DFF2EB]">
      <h1 className="text-3xl font-bold mx-24 my-7">Edit/Delete Barang</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-14 mx-7">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default EditDeletePage;