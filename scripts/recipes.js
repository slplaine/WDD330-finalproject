// ===== LOAD RECIPES =====
async function loadRecipes() {
  try {
    const response = await fetch("data/data.json");

    if (!response.ok) {
      throw new Error("Failed to load recipes");
    }

    const data = await response.json();

    const container = document.getElementById("recipeContainer");

    // Segurança: evita erro se não estiver na página correta
    if (!container) return;

    // Criar cards com imagem
    container.innerHTML = data.map(recipe => `
      <div class="card" data-id="${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
      </div>
    `).join("");
