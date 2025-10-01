// Add year and last modified
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Capture timestamp on form
document.querySelector("#timestamp").value = new Date().toISOString();

// Membership modal functionality
const levelCards = document.querySelectorAll(".level-card");
const closeButtons = document.querySelectorAll(".close-modal");

levelCards.forEach(card => {
  card.addEventListener("click", () => {
    const modalId = card.getAttribute("data-modal");
    document.getElementById(modalId).showModal();
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.target.closest("dialog").close();
  });
});

