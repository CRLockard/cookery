import "./App.css";
import { useEffect, useState } from "react";

type Recipe = {
  id: number;
  name: string;
  description: string | null;
  cuisine: string | null;
  servings: number | null;
  prep_time: number | null;
  cook_time: number | null;
  instructions: string | null;
  created_at: string;
};

function App() {
  const [apiMessage, setApiMessage] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/health")
      .then((response) => response.json())
      .then((data) => setApiMessage(data.message))
      .catch((error) => console.error("API Error", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Failed to fetch recipes:", error));
  }, []);

  return (
    <main>
      <h1>Cookery</h1>
      <p>Your Recipes, Your Kitchen</p>
      <p>Backend status: {apiMessage}</p>
      <h2>My Recipe</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <p>Servings: {recipe.servings}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
