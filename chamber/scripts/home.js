const year = document.querySelector("#currentYear");
const fileJson = "data/members.json";
const bussinessCard = document.querySelector("#cards");

const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let lastModified = document.querySelector("#lastModification");
let lastModification = new Date(document.lastModified);
lastModified.textContent = `${lastModification}`;

function myFunction() {
  var x = document.querySelector(".navigation"); // Use querySelector for classes
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation");

  if (window.innerWidth > 400) {
    x.style.display = "flex";
  } else if (!x.style.display || x.style.display === "flex") {
    x.style.display = "none";
  }
});
