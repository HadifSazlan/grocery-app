import {useEffect, useState} from 'react';
import ItemList from './components/ItemList.js';
import AddItem from './components/AddItem.js';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('itemList'));
    if (savedList) {
      setList(savedList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('itemList', JSON.stringify(list));
  }, [list]);

  const addItem = (item) => {
    const newItem = {
      id: Date.now(),
      name: item,
      purchased: false,
    };
    setList([...list, newItem]);
  };

  const togglePurchased = (itemId) => {
    const updatedList = list.map((item) =>
      item.id === itemId ? {...item, purchased: !item.purchased} : item
    );
    setList(updatedList);
  };

  const removeItem = (itemId) => {
    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  };

  const clearAll = () => {
    setList([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Grocery App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="col-span-2">
          <h2 className="text-xl font-semibold mb-2">Grocery List</h2>
          {list.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {list.map((item) => (
                <ItemList
                  key={item.id}
                  item={item}
                  togglePurchased={togglePurchased}
                  removeItem={removeItem}
                />
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your grocery list is empty.</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Add Item</h2>
          <AddItem addItem={addItem} />
        </div>
      </div>

      <button onClick={clearAll} className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
        Clear All
      </button>
    </div>
  );
}

export default App;
