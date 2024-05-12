import React from 'react';

const ItemList = ({item, togglePurchased, removeItem}) => {
  return (
    <li className="flex justify-between items-center py-2">
      <div className={`flex items-center ${item.purchased ? 'line-through text-gray-500' : ''}`}>
        <input
          type="checkbox"
          className="mr-2"
          checked={item.purchased}
          onChange={() => togglePurchased(item.id)}
        />
        <span>{item.name}</span>
      </div>
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );
};

export default ItemList;