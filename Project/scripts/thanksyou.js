const forminfo = new URLSearchParams(window.location.search);
const form = document.querySelector(".form-information");

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

const timestamp = forminfo.get("timestamp") || today.getTime();
form.innerHTML = `
<h2>Thank you for your trust in us</h2>
<p><strong>${forminfo.get("first_name")}!</strong> your form was submitted correctly</p>
<h3>Here is your submission:</h3>

<section>
  <p><strong>Name:</strong> ${forminfo.get("first_name")} ${forminfo.get("last_name")}</p>
  <p><strong>Email:</strong> ${forminfo.get("email")}</p>
  <p><strong>Mobile number:</strong> ${forminfo.get("phone")}</p>
  <p><strong>Class:</strong> ${forminfo.get("class")}</p>
  <p><strong>Membership level:</strong> ${forminfo.get("membership_level")}</p>
  <p><strong>Timestamp:</strong> ${new Date(parseInt(timestamp)).toLocaleString()}</p>
</section>
`;
