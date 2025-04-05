const forminfo = new URLSearchParams(window.location.search);
const form = document.querySelector(".form-information");
const today = new Date();
const options = {
  day: "2-digit",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false, // Use 24-hour format
};

form.innerHTML = `
<h2>Thank you for your trust in us</h2>
<p><strong>${forminfo.get("first_name")}!</strong> your form was submitted correctly</p>
<h3>Here is your submission:</h3>

<section>
  <p><strong>Name:</strong> ${forminfo.get("first_name")} ${forminfo.get("last_name")}</p>
  <p><strong>Email:</strong> ${forminfo.get("email")}</p>
  <p><strong>Mobile number:</strong> ${forminfo.get("phone")}</p>
  <p><strong>Business position:</strong> ${forminfo.get("organization_title")}</p>

  <p><strong>Business name:</strong> ${forminfo.get("organization")}</p>
  <p><strong>Business/Organization Description:</strong> ${forminfo.get("description")}</p>
  <p><strong>Time:</strong> ${today.toLocaleString("en-US", options)}</p>
</section>
`;
