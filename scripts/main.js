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

    if (!query) {
      results.innerHTML = "<p>Please type something.</p>";
      return;
    }

    results.innerHTML = "<p>Loading recipes...</p>";

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );

      const data = await response.json();

      if (!data.meals) {
        results.innerHTML = "<p>No recipes found.</p>";
        return;
      }

      results.innerHTML = data.meals.map(meal => `
        <div class="card" data-url="${meal.strSource || meal.strYoutube}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
        </div>
      `).join("");

      // ✅ clicar no card
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

// ===== FORM HANDLING =====
const form = document.getElementById("nameForm");

if (form) {
  form.addEventListener("submit", (e) => {

    const name = document.getElementById("visitorName").value.trim();
    const email = document.getElementById("visitorEmail").value.trim();
    const message = document.getElementById("message").value.trim();
    const welcomeMessage = document.getElementById("welcomeMessage");

    // ✅ validação extra
    if (name.length < 2) {
      alert("Please enter a valid name.");
      e.preventDefault();
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      e.preventDefault();
      return;
    }

    // ✅ salvar dados
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userMessage", message);

    // ✅ feedback
    if (welcomeMessage) {
      welcomeMessage.textContent = `Thank you, ${name}! Redirecting...`;
    }
  });
}

// ===== LOAD USER NAME (BONUS) =====
document.addEventListener("DOMContentLoaded", () => {

  const savedName = localStorage.getItem("userName");
  const welcomeMessage = document.getElementById("welcomeMessage");

  if (savedName && welcomeMessage) {
    welcomeMessage.textContent = `Welcome back, ${savedName}!`;
  }

});
// ===== SECOND API: RANDOM QUOTE =====
async function loadQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();

    const hero = document.querySelector(".hero");

    if (hero) {
      const quote = document.createElement("p");
      quote.textContent = `"${data.content}"`;
      quote.style.fontStyle = "italic";
      quote.style.marginTop = "10px";

      hero.appendChild(quote);
    }

  } catch (error) {
    console.error("Quote API error:", error);
  }
}

loadQuote();