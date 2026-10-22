import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [apiMessage, setApiMessage] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3001/api/health")
      .then((response) => response.json())
      .then((data) => setApiMessage(data.message))
      .catch((error) => console.error("API Error", error));
  }, []);

  return (
    <main>
      <h1>Cookery</h1>
      <p>Your Recipes, Your Kitchen</p>
      <p>Backend status: {apiMessage}</p>
    </main>
  );
}

export default App;
