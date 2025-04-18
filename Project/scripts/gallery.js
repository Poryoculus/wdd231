const fileJson = "data/structures.json";
const businessCardContainer = document.querySelector("#pictures");

// Load and display image cards
async function getBusinessData(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();
    displayCards(data);
  } catch (error) {
    console.error("Found an error:", error);
  }
}

const displayCards = (cards) => {
  Object.values(cards).forEach((business, index) => {
    const card = document.createElement("section");
    card.classList.add("card");

    // Add data-category attribute for filtering
    card.setAttribute("data-category", business.category); // assumes your JSON has a `category` field

    const portrait = document.createElement("img");
    portrait.src = business.location;
    portrait.alt = business.name;
    portrait.classList.add("portrait");

    if (index > 1) {
      portrait.loading = "lazy";
    } else {
      portrait.setAttribute("fetchpriority", "high");
    }

    card.appendChild(portrait);
    businessCardContainer.appendChild(card);
  });
};

getBusinessData(fileJson);

// Filter buttons logic
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("#filters button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.textContent.trim();
      const cards = document.querySelectorAll("#pictures .card");

      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        card.style.display =
          filter === "All" || category === filter ? "block" : "none";
      });
    });
  });
});

// Mobile navigation toggle
function myFunction() {
  const nav = document.querySelector(".navigation nav");
  nav.style.display = nav.style.display === "block" ? "none" : "block";
}

// Responsive nav reset
window.addEventListener("resize", () => {
  const nav = document.querySelector(".navigation nav");
  nav.style.display = window.innerWidth > 600 ? "flex" : "none";
});

// Footer year and last modified date
const year = document.querySelector("#currentYear");
if (year) {
  year.innerHTML = `<span class="highlight">${new Date().getFullYear()}</span>`;
}

const lastModified = document.querySelector("#lastModification");
if (lastModified) {
  lastModified.textContent = new Date(document.lastModified);
}
