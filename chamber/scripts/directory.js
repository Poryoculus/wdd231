const year = document.querySelector("#currentYear");
const fileJson = "data/members.json";
const bussinessCard = document.querySelector("#cards");

async function getBussinessData(file) {
  try {
    const response = await fetch(file);
    const data = await response.json();

    displayCards(data.Cards); // Passes the actual business data

    console.log(data);
  } catch (error) {
    console.error("Found an error:", error);
  }
}

const displayCards = (Cards) => {
  Object.values(Cards).forEach((business) => {
    const card = document.createElement("section");
    const portrait = document.createElement("img");
    const companyName = document.createElement("h2");
    const address = document.createElement("p");
    const number = document.createElement("p");
    const url = document.createElement("a");

    portrait.setAttribute("src", business.image);
    portrait.setAttribute("alt", business.name); // Better accessibility
    companyName.textContent = business.additional_info.company;
    address.textContent = business.address;
    number.textContent = business.phone;

    url.setAttribute("href", business.website || "#");
    url.setAttribute("target", "_blank");
    url.textContent = "Visit Website"; // Fixing missing text

    // Append to card
    card.appendChild(portrait);
    card.appendChild(companyName);
    card.appendChild(address);
    card.appendChild(number);
    card.appendChild(url);

    // Append card to container
    bussinessCard.appendChild(card);
  });
};

// Call the function to load data
getBussinessData(fileJson);
const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let lastModified = document.querySelector("#lastModification");
let lastModification = new Date(document.lastModified);
lastModified.textContent = `${lastModification}`;

// button functions
const gridbutton = document.querySelector("#gridButton");
const listbutton = document.querySelector("#listButton");
const display = document.querySelector("#cards");

gridbutton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
  display.classList.add("list");
  display.classList.remove("grid");
}
