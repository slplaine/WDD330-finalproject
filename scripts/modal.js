function openModal(recipe) {
  const modal = document.getElementById("modal");

  document.getElementById("modalTitle").textContent = recipe.name;
  document.getElementById("modalImage").src = recipe.image;

  const ingredientsList = document.getElementById("modalIngredients");
  const instructions = document.getElementById("modalInstructions");

  // ingredientes fake (por enquanto)
  ingredientsList.innerHTML = recipe.ingredients
    ? recipe.ingredients.map(i => `<li>${i}</li>`).join("")
    : "<li>No ingredients yet</li>";

  instructions.textContent = recipe.instructions || "Instructions coming soon.";

  modal.style.display = "flex";
}

// fechar modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});