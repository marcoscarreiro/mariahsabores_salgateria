document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navToggle.checked = false; // Fecha o menu
    });
  });
});