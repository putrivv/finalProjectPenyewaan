"use client";
import React from "react";

interface ItemCardProps {
  id: string;
  name: string;
  imageUrl: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ id, name, imageUrl, onEdit, onDelete }) => {
  return (
    <div className="card w-full max-w-sm bg-[#B9E5E8] shadow-lg rounded-lg overflow-hidden mt-11 ml-9 ">
      <figure>
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold text-gray-800 pl-6">{name}</h2>
        <div className="card-actions flex justify-end mt-3 space-x-2">
          <button
            className="btn bg-[#7AB2D3] hover:bg-[#5D99C3] text-[#050315] px-4 py-2 rounded-md transition"
            onClick={() => onEdit(id)}
          >
            Edit
          </button>
          <button
            className="btn bg-[#4A628A] hover:bg-[#3B4E73] text-white px-4 py-2 rounded-md transition"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
