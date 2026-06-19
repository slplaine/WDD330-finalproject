// ===== LOAD PLANNER =====
function loadPlanner() {
  const container = document.getElementById("plannerContainer");

  if (!container) return;

  let planner = JSON.parse(localStorage.getItem("planner")) || [];

  if (planner.length === 0) {
    container.innerHTML = "<p>No recipes added yet.</p>";
    return;
  }

  container.innerHTML = planner.map(recipe => `
    <div class="card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p>${recipe.time}</p>

      <button class="remove-btn" data-id="${recipe.id}">
        Remove
      </button>
    </div>
  `).join("");

  //  EVENTO REMOVER
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id;

      planner = planner.filter(item => item.id != id);

      localStorage.setItem("planner", JSON.stringify(planner));

      loadPlanner(); // recarrega a tela
    });
  });
}

document.addEventListener("DOMContentLoaded", loadPlanner);
