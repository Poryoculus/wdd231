// Membership Level script
const fileJson = "data/memberships.json";
const buttons = document.querySelectorAll(".membership-levels button");
const membershipDialog = document.querySelector("#membership-info");

// Fetch and store membership data
let membershipData = [];
const getMembershipData = async (file) => {
  try {
    const response = await fetch(file);
    membershipData = (await response.json()).modal.memberships;
  } catch (error) {
    console.error("Error fetching membership data:", error);
  }
};

// Function to display membership details in a modal
const displayMembershipData = (membershipInfo) => {
  membershipDialog.innerHTML = `
    <button class="close">X</button>
    <h2>${membershipInfo.name}</h2>
    <p>${membershipInfo.description}</p>
    <p><strong>Benefits:</strong></p>
    <ul>
      ${membershipInfo.features.map((benefit) => `<li>${benefit}</li>`).join("")}
    </ul>
  `;

  // Close button functionality
  membershipDialog.querySelector(".close").addEventListener("click", () => {
    membershipDialog.close();
  });

  // Show the modal
  membershipDialog.showModal();
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
  var x = document.querySelector(".navigation nav");
  x.style.display = x.style.display === "block" ? "none" : "block";
}

// Adjust navigation display on window resize
window.addEventListener("resize", function () {
  var x = document.querySelector(".navigation nav");
  x.style.display = window.innerWidth > 600 ? "flex" : "none";
});
