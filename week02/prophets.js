const url =
  "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData(url) {
  const response = await fetch(url);

  const data = await response.json();
  //console.table(data.prophets);

  displayProphets(data.prophets);
}

getProphetData(url);

const displayProphets = (prophets) => {
  let numberOfPresident = 1;

  prophets.forEach((prophet) => {
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");
    let ordinal = "";
    if (numberOfPresident == 1) {
      ordinal = "st";
    } else if (numberOfPresident == 2) {
      ordinal = "nd";
    } else if (numberOfPresident == 3) {
      ordinal = "rd";
    } else {
      ordinal = "th";
    }

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}  ${numberOfPresident}${ordinal} Latter day President`,
    );
    portrait.setAttribute("loading", "lazy");

    portrait.setAttribute("width", "200");
    portrait.setAttribute("height", "250");

    cards.appendChild(fullName);
    cards.appendChild(portrait);

    cards.appendChild(card);
    numberOfPresident += 1;
  });
};
