// ====== Hamburger Menu ======
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.page-links');

// Toggle navigation menu on small screens
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// ====== Footer Dates ======
const yearSpan = document.getElementById("currentyear");
const lastModified = document.getElementById("lastModified");

// Display current year
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Display last modified date
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}

// ====== Dynamic Benefits ======
const benefits = [
  "Helps reduce stress",
  "Improves focus and patience",
  "Creates unique handmade gifts"
];

function renderBenefits() {
  const list = document.getElementById("benefitsList");
  if (list) {
    list.innerHTML = benefits.map(item => `<li>${item}</li>`).join("");
  }
}

renderBenefits();

// ====== Form Interaction ======
const nameForm = document.getElementById("nameForm");
const welcomeMessage = document.getElementById("welcomeMessage");

// Retrieve saved visitor name from localStorage
if (localStorage.getItem("visitorName") && welcomeMessage) {
  welcomeMessage.textContent = `Welcome back, ${localStorage.getItem("visitorName")}!`;
}

// Handle form submission
if (nameForm) {
  nameForm.addEventListener("submit", function () {
    // ⚠️ REMOVIDO e.preventDefault() para permitir envio normal

    const nameInput = document.getElementById("visitorName")?.value;
    const emailInput = document.getElementById("visitorEmail")?.value;
    const messageInput = document.getElementById("message")?.value;

    const visitor = {
      name: nameInput,
      email: emailInput,
      message: messageInput
    };

    if (visitor.name) {
      localStorage.setItem("visitorName", visitor.name);
    }

    console.log("Visitor object:", visitor);
  });
}

// ===== FETCH + DYNAMIC CONTENT =====
async function loadProjects() {
  try {
    const response = await fetch("data/data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const container = document.createElement("section");
    container.innerHTML = "<h2>Crochet Projects</h2>";

    const cards = document.createElement("div");
    cards.classList.add("cards");

    cards.innerHTML = data.map(item => `
      <div class="card" data-image="${item.image}">
        <h3>${item.name}</h3>
        <p><strong>Difficulty:</strong> ${item.difficulty}</p>
        <p><strong>Time:</strong> ${item.time}</p>
        <p><strong>Material:</strong> ${item.material}</p>
      </div>
    `).join("");

    container.appendChild(cards);

    const main = document.querySelector("main");
    if (main) {
      main.appendChild(container);
    }

  } catch (error) {
    console.error("Error loading data:", error);
  }
}

if (document.body.classList.contains("home")) {
  loadProjects();
}

// ===== MODAL =====
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

// Garantir que inicia fechada
if (modal) {
  modal.style.display = "none";
}

// Open modal when clicking on a card
if (modal && modalTitle && modalImage) {
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    if (card) {
      const title = card.querySelector("h3")?.textContent;
      const image = card.getAttribute("data-image");

      modalTitle.textContent = title || "Project";

      if (image) {
        modalImage.src = image;
      }

      modalImage.alt = title;

      modal.style.display = "flex";
    }
  });
}

// Close modal using close button
if (closeModal && modal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalImage.src = "";
  });
}

// Close modal when clicking outside content
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalImage.src = "";
    }
  });
}

// Close modal with ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal) {
    modal.style.display = "none";
    modalImage.src = "";
  }
});