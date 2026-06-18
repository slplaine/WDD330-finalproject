// ===== ADD RECIPE TO PLANNER =====
function addToPlanner(recipe) {
  // pega o que já existe
  let planner = JSON.parse(localStorage.getItem("planner")) || [];

  // evita duplicar (opcional mas bom)
  const exists = planner.find(item => item.id === recipe.id);

  if (!exists) {
    planner.push(recipe);
  }

  // salva atualizado
  localStorage.setItem("planner", JSON.stringify(planner));
}