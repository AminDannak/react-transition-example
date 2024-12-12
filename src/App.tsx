import React, { useState, useTransition } from "react";
import './App.css'

export default function App() {
  const [items, setItems] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    const worker = new Worker(new URL("./workers/worker.js", import.meta.url), {
      type: "module",
    });

    worker.onmessage = (e) => {
      // Use a transition to prioritize interactivity
      startTransition(() => {
        setItems(e.data); // Update state with data from the worker
      });
    };

    worker.postMessage("start");
  };


  return (
    <div>
      <button onClick={handleClick}>Generate Items</button>
      {isPending && <p>Loading...</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
