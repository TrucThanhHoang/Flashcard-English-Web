// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.navbar nav');
const navLinks = document.querySelectorAll('.navbar nav a');
const menuOverlay = document.querySelector('.menu-overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
  menuOverlay.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    menuOverlay.classList.remove('active');
  });
});

// Close menu when clicking on overlay
menuOverlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  nav.classList.remove('active');
  menuOverlay.classList.remove('active');
});
