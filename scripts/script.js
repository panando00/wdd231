//copyright year
document.getElementById("year").textContent = new Date().getFullYear();

//last modified date
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

//menu
const menuBtn = document.getElementById("menu");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
});