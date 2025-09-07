
// copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// last modified
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// menu toggle
const menuBtn = document.getElementById("menu");
const navMenu = document.getElementById("navMenu");
menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

// courses filter & Credits
const filterButtons = document.querySelectorAll(".filter-btn");
const courses = document.querySelectorAll("#courseList li");
const totalCreditsEl = document.getElementById("totalCredits");

// total credits
function calculateCredits() {
  let total = 0;
  courses.forEach(course => {
    if (!course.classList.contains("hidden")) {
      total += parseInt(course.dataset.credits);
    }
  });
  totalCreditsEl.textContent = `Total Credits: ${total}`;
}

// filter 
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active class from all
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    courses.forEach(course => {
      if (filter === "all" || course.dataset.category === filter) {
        course.classList.remove("hidden");
      } else {
        course.classList.add("hidden");
      }
    });

    calculateCredits();
  });
});

// initialize credits on page load
calculateCredits();
