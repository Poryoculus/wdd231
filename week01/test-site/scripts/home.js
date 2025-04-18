const year = document.querySelector("#currentyear");

const today = new Date();

year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let lastModified = document.querySelector("#lastModified");
let lastmodification = new Date(document.lastModified);
lastModified.textContent = `${lastmodification}`;

const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

function myFunction() {
  var x = document.getElementById("navegator");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
window.addEventListener("resize", function () {
  var x = document.getElementById("navegator");

  if (window.innerWidth > 768) {
    x.style.display = "flex";
  } else if (!x.style.display || x.style.display === "flex") {
    x.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-header button");
  const courseButtons = document.querySelectorAll(".card-button button");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.textContent.trim();

      courseButtons.forEach((courseButton) => {
        const courseText = courseButton.textContent.replace("✔️ ", "").trim();
        const coursePrefix = courseText.split(" ")[0];

        if (filter === "All" || coursePrefix === filter) {
          courseButton.style.display = "block";
        } else {
          courseButton.style.display = "none";
        }
      });
    });
  });

  insertCheck();
});

function insertCheck() {
  let buttons = document.querySelectorAll(".card-button button");

  buttons.forEach((button, index) => {
    if (courses[index] && courses[index].completed) {
      if (!button.textContent.startsWith("✔️ ")) {
        button.textContent = "✔️ " + button.textContent;
        button.style.backgroundColor = "#d4edda";
      } else {
        button.style.backgroundColor = "yellow";
      }
    }
  });
}

//modal script
const courseDetails = document.querySelector(".course-details");
const buttons = document.querySelectorAll(".card-button button");

// Function to display course details inside the modal
function displayCourseDetails(course) {
  if (!courseDetails) return;

  courseDetails.innerHTML = `
    <button class="close">X</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p><strong>Description:</strong> ${course.description}</p>
    <p><strong>Technology:</strong> ${course.technology.join(", ")}</p>
  `;

  // Add event listener to close button
  courseDetails.querySelector(".close").addEventListener("click", () => {
    courseDetails.close();
  });

  // Show the modal
  courseDetails.showModal();
}

// Add event listeners to each course button
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (courses[index]) {
      displayCourseDetails(courses[index]);
    }
  });
});
