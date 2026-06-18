async function loadRecipes() {
  try {
    const response = await fetch("data/data.json");
    const data = await response.json();

    const container = document.getElementById("recipeContainer");

    container.innerHTML = data.map(recipe => `
      <div class="card" data-id="${recipe.name}">
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
      </div>
    `).join("");

    // Evento de clique nos cards
    container.addEventListener("click", (e) => {
      const card = e.target.closest(".card");

      if (card) {
        const selected = data.find(r => r.name === card.dataset.id);
        openModal(selected);
      }
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

loadRecipes();
``