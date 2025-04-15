const fileJson = "data/tokyo_attractions.json";
const bussinessCard = document.querySelector("#cards");

async function getBussinessData(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();

    displayCards(data); // Passes the actual business data
  } catch (error) {
    console.error("Found an error:", error);
  }
}

const displayCards = (Cards) => {
  Object.values(Cards).forEach((business) => {
    const card = document.createElement("section");
    card.classList.add("card");

    const companyName = document.createElement("h2");
    companyName.textContent = business.name;
    companyName.classList.add("companyName");

    const portrait = document.createElement("img");
    portrait.setAttribute("src", business.location);
    portrait.setAttribute("alt", business.name);
    if (Object.values(Cards).indexOf(business) > 1) {
      portrait.setAttribute("loading", "lazy");
    } else {
      portrait.setAttribute("fetchpriority", "high");
      portrait.setAttribute("rel", "preload");
    }
    portrait.classList.add("portrait");

    const description = document.createElement("p");
    description.textContent = business.description;
    description.classList.add("description");

    const address = document.createElement("p");
    address.textContent = business.address;
    address.classList.add("address");

    const button = document.createElement("button");
    button.textContent = "Learn More";
    button.classList.add("learnMore");

    // Append elements to card
    card.appendChild(companyName);
    card.appendChild(portrait);
    card.appendChild(description);
    card.appendChild(address);
    card.appendChild(button);

    // Append card to main container
    bussinessCard.appendChild(card);
  });
};
getBussinessData(fileJson);

//welcome message

const welcomeMessage = document.querySelector("#message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

let message = "";

if (lastVisit) {
  const lastTime = Number(lastVisit);
  const diffTime = now - lastTime;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert to days

  if (diffDays < 1) {
    message = "Back so soon! Awesome!";
  } else if (diffDays === 1) {
    message = "You last visited 1 day ago.";
  } else {
    message = `Your last visit was ${diffDays} days ago.`;
  }

  console.log(diffDays);
} else {
  message = "Welcome! Let us know if you have any questions.";
}

localStorage.setItem("lastVisit", now);

welcomeMessage.textContent = message;
// Footer script to display current year
const year = document.querySelector("#currentYear");
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

// Display last modification date
const lastModified = document.querySelector("#lastModification");
lastModified.textContent = `${new Date(document.lastModified)}`;

// Hamburger menu script for responsive navigation
function myFunction() {
  var x = document.querySelector(".navigation");
  x.style.display = x.style.display === "block" ? "none" : "block";
}

// Adjust navigation display on window resize
window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation");
  x.style.display = window.innerWidth > 600 ? "flex" : "none";
});
