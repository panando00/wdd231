const params = new URLSearchParams(window.location.search);
document.getElementById("fname").textContent = params.get("fname");
document.getElementById("lname").textContent = params.get("lname");
document.getElementById("orgtitle").textContent = params.get("orgtitle");
document.getElementById("email").textContent = params.get("email");
document.getElementById("phone").textContent = params.get("phone");
document.getElementById("bname").textContent = params.get("bname");
document.getElementById("membership").textContent = params.get("membership");
document.getElementById("desc").textContent = params.get("desc");
document.getElementById("timestamp").textContent = params.get("timestamp");

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

