// ===== Footer Year & Last Modified =====
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// ===== Mobile Menu Toggle =====
const menuBtn = document.getElementById("menu");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
});

// ===== Grid/List Toggle =====
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");
const memberContainer = document.getElementById("memberContainer");

gridBtn.addEventListener("click", () => {
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  memberContainer.classList.remove("list-view");
  memberContainer.classList.add("grid-view");
});

listBtn.addEventListener("click", () => {
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  memberContainer.classList.remove("grid-view");
  memberContainer.classList.add("list-view");
});

// ===== Fetch and Display Members =====
async function loadMembers() {
  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    const data = await res.json();
    displayMembers(data.members);
  } catch (err) {
    memberContainer.innerHTML = `<p class="error">Failed to load members: ${err}</p>`;
  }
}

function displayMembers(members) {
  memberContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const img = document.createElement("img");
    img.src = member.image || "images/members/placeholder.webp";
    img.alt = `${member.name} Logo`;
    img.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = member.name;

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = `📞 ${member.phone}`;

    const link = document.createElement("a");
    link.href = member.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Visit Website";

    card.append(img, name, address, phone, link);
    memberContainer.appendChild(card);
  });
}

// ===== Initialize =====
loadMembers();
