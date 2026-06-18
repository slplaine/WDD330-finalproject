function openModal(recipe) {
  const modal = document.getElementById("modal");

  document.getElementById("modalTitle").textContent = recipe.name;
  document.getElementById("modalImage").src = recipe.image;

  const ingredientsList = document.getElementById("modalIngredients");
  const instructions = document.getElementById("modalInstructions");

  // ingredientes
  ingredientsList.innerHTML = recipe.ingredients
    ? recipe.ingredients.map(i => `<li>${i}</li>`).join("")
    : "<li>No ingredients yet</li>";

  // instruções
  instructions.textContent = recipe.instructions || "Instructions coming soon.";


  const addBtn = document.getElementById("addToPlannerBtn");

  if (addBtn) {
    addBtn.onclick = () => {
      addToPlanner(recipe); // chama o storage.js
      alert(`${recipe.name} added to planner!`);
    };
  }

  modal.style.display = "flex";
}

// fechar modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});