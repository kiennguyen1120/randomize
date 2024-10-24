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
    // const randomString = generateRandomString(10);
    setItems([...items, ""]);
    setShowAlert(false);
  };

  const deleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    setItems(newItems);
    if (value.trim() !== "") {
      setShowAlert(false);
    }
  };

  const selectRandom = () => {
    const nonEmptyItems = items.filter((item) => item.trim() !== "");
    const hasEmptyItem = items.some((item) => item.trim() === "");
    if (nonEmptyItems.length === 0 || hasEmptyItem) {
      setShowAlert(true);
      setSelectedItem("");
    } else {
      setShowAlert(false);
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = nonEmptyItems[randomIndex];
      setSelectedItem(randomItem);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        RANDOM STRING TOOL
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="mb-4 flex justify-center md:justify-start">
            <h2 className="text-xl font-semibold mr-5">ADD STRING</h2>
            <Button
              onClick={addItem}
              className="mb-4 bg-green-500 text-white hover:bg-green-600"
              aria-label="Add string"
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="overflow-y-auto h-64">
            <ul className="space-y-2 mb-4">
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
        </div>
        <div className="w-full md:w-1/2">
          <Button
            onClick={selectRandom}
            className="mb-4 bg-blue-500 text-white hover:bg-blue-600"
            aria-label="Select random item"
          >
            {" "}
            RESULT
          </Button>

          {selectedItem && (
            <div className="bg-gray-200 p-20">
              <p className="text-center">{selectedItem}</p>
            </div>
          )}

          {showAlert && (
            <Alert variant="destructive">
              <AlertDescription>Invalid!</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

// function generateRandomString(length) {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";

//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     result += characters[randomIndex];
//   }

//   return result;
// }

export default App;
