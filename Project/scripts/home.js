// Footer script to display current year
const year = document.querySelector("#currentYear");
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

// Display last modification date
const lastModified = document.querySelector("#lastModification");
lastModified.textContent = `${new Date(document.lastModified)}`;

// Hamburger menu script for responsive navigation
function myFunction() {
  var x = document.querySelector(".navigation nav");
  x.style.display = x.style.display === "block" ? "none" : "block";
}

// Adjust navigation display on window resize
window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation nav");
  x.style.display = window.innerWidth > 600 ? "flex" : "none";
});

// Welcome message

const welcomeMessage = document.querySelector("#message");
const now = Date.now();
const lastVisit = localStorage.getItem("lastvisit");

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

localStorage.setItem("lastvisit", now);

welcomeMessage.textContent = message;
