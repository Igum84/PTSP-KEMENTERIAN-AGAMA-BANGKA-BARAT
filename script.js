// Jalankan setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const navList = document.querySelector("header nav ul");
  const navLinks = document.querySelectorAll("header nav ul li a");

  // Klik hamburger => buka/tutup menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navList.classList.toggle("active");
  });

  // Tutup menu saat salah satu link diklik
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navList.classList.remove("active");
    });
  });

  // Tutup menu jika klik di luar area menu
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = navList.contains(event.target);
    const isClickHamburger = hamburger.contains(event.target);
    if (!isClickInsideMenu && !isClickHamburger) {
      hamburger.classList.remove("open");
      navList.classList.remove("active");
    }
  });

  // Optional: efek smooth scroll untuk navigasi internal
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth"
          });
        }
      }
    });
  });
});
