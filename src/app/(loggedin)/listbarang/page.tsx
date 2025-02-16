import React from "react";

const EquipmentCard = ({ name, stock, price, category }) => {
  return (
    <div className="relative w-72 bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden flex flex-col h-64 hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Kategori di pojok atas */}
      <div className="absolute top-2 right-2 bg-teal-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow">
        {category}
      </div>

      {/* Placeholder gambar */}
      <div className="h-40 bg-gradient-to-r from-gray-300 to-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-lg font-medium">📷 Gambar</span>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <h2 className="text-lg font-bold text-gray-900">{name}</h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p>Stok: <span className="font-semibold">{stock}</span></p>
          <p>Harga: <span className="text-emerald-600 font-semibold">{price}</span></p>
        </div>
      </div>
    </div>
  );
};

const EquipmentList = () => {
  const equipment = [
    { name: "Bor Listrik", stock: 5, price: "Rp 750.000", category: "Peralatan Listrik" },
    { name: "Gergaji Mesin", stock: 3, price: "Rp 1.200.000", category: "Peralatan Kayu" },
  ];

  return (
    <div className="flex flex-wrap gap-6 justify-center p-8 bg-gray-100 min-h-screen">
      {equipment.map((item, index) => (
        <EquipmentCard key={index} {...item} />
      ))}
    </div>
  );
};

export default EquipmentList;
