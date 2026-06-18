// ===== LOAD RECIPES =====
async function loadRecipes() {
  try {
    const response = await fetch("data/data.json");

    if (!response.ok) {
      throw new Error("Failed to load recipes");
    }

    const data = await response.json();

    const container = document.getElementById("recipeContainer");

    if (!container) return;

    container.innerHTML = data.map(recipe => `
      <div class="card" data-id="${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
      </div>
    `).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest(".card");

      if (!card) return;

      const selected = data.find(r => r.id == card.dataset.id);

      if (selected) {
        openModal(selected);
      }
    });

  } catch (error) {
    console.error("Error loading recipes:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadRecipes);

