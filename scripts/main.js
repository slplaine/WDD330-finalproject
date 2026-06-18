// ===== MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.page-links');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// ===== FOOTER =====
const yearSpan = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}
// ===== SEARCH WITH API =====

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

if (searchBtn && searchInput && results) {

  searchBtn.addEventListener("click", async () => {

    const query = searchInput.value.trim();

    // ✅ validação
    if (!query) {
      results.innerHTML = "<p>Please type something.</p>";
      return;
    }

    // ✅ feedback visual
    results.innerHTML = "<p>Loading recipes...</p>";

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      const data = await response.json();

      // ✅ nenhum resultado
      if (!data.meals) {
        results.innerHTML = "<p>No recipes found.</p>";
        return;
      }

      // ✅ criar cards
      results.innerHTML = data.meals.map(meal => `
        <div class="card" data-url="${meal.strSource || meal.strYoutube}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
        </div>
      `).join("");

      // ✅ evento de clique nos cards (melhor prática)
      document.querySelectorAll("#results .card").forEach(card => {
        card.addEventListener("click", () => {
          const url = card.getAttribute("data-url");

          if (url) {
            window.open(url, "_blank");
          } else {
            alert("Recipe link not available.");
          }
        });
      });

    } catch (error) {
      console.error("API error:", error);
      results.innerHTML = "<p>Error loading recipes.</p>";
    }

  });
}