const forminfo = new URLSearchParams(window.location.search);
const form = document.querySelector(".form-information");
const today = new Date();

const timestamp = forminfo.get("timestamp") || today.getTime();
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
  <p><strong>Timestamp:</strong> ${new Date(parseInt(timestamp)).toLocaleString()}</p>
</section>
`;
