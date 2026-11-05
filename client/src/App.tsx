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
  const [recipeName, setRecipeName] = useState<string>("");

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

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch("http://localhost:3001/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: recipeName }),
    })
      .then((response) => response.json())
      .then((data: Recipe) => {
        setRecipes((previousRecipes) => [...previousRecipes, data]);
        setRecipeName("");
      })
      .catch((error) => console.error("Failed to submit recipe:", error));
  }

  return (
    <main>
      <h1>Cookery</h1>
      <p>Your Recipes, Your Kitchen</p>
      <p>Backend status: {apiMessage}</p>
      <h2>Add a Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={recipeName}
          onChange={(event) => setRecipeName(event.target.value)}
        />
        <button type="submit">Add Recipe</button>
      </form>

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
