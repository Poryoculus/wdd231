// Membership Level script
const fileJson = "data/memberships.json";
const buttons = document.querySelectorAll(".membership-level button");
const membership = document.querySelector(".membership-info");

// Fetch and store membership data
let membershipData = [];
const getMembershipData = async (file) => {
  try {
    const response = await fetch(file);
    membershipData = (await response.json()).modal.memberships;
    console.log(membershipData);
  } catch (error) {
    console.error("Error fetching membership data:", error);
  }
};

// Function to display membership details in a modal
const displayMembershipData = (membershipinfo) => {
  membership.innerHTML = `
    <button class="close">X</button>
    <h2>${membershipinfo.name}</h2>
    <p>${membershipinfo.description}</p>
    <p><strong>Benefits:</strong></p>
    <ul>
      ${membershipinfo.features.map((benefit) => `<li>${benefit}</li>`).join("")}
    </ul>
  `;

  // Close button functionality
  membership.querySelector(".close").addEventListener("click", () => {
    membership.close();
  });

  // Show the modal
  membership.showModal();
};

// Attach event listeners to membership buttons
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (membershipData[index]) {
      displayMembershipData(membershipData[index]);
    }
  });
});

// Load membership data
getMembershipData(fileJson);
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
