import React, { useState } from "react";

import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert";

const App = () => {
  const [items, setItems] = useState([]);

  const [showAlert, setShowAlert] = useState(false);

  const [selectedItem, setSelectedItem] = useState("");

  const addItem = () => {
    const randomString = generateRandomString(10);
    setItems([...items, randomString]);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
  };

  const selectRandom = () => {
    if (items.length === 0) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];
      setSelectedItem(randomItem);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Random String Tool
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="flex items-center justify-between alginitem mb-4">
            <h2 className="text-xl font-semibold">Add String</h2>
            <Button
              onClick={addItem}
              className="mb-4 bg-green-500 text-white hover:bg-green-600"
              aria-label="Add string"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>

          <ul className="space-y-2 mb-4" aria-label="Item list">
            {items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Input
                  value={item}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
                <Button
                  onClick={() => deleteItem(index)}
                  variant="destructive"
                  size="icon"
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2">
          <Button
            onClick={selectRandom}
            className="mb-4 bg-blue-500 text-white hover:bg-blue-600"
            aria-label="Select random item"
          >
            {" "}
            Result
          </Button>

          {items.length !== 0 && <p> {selectedItem}</p>}

          {showAlert && items.length === 0 && (
            <Alert variant="destructive">
              <AlertDescription>Invalid!</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export default App;
