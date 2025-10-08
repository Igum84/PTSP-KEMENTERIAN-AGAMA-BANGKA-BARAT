document.addEventListener('DOMContentLoaded', function() {
    // === Logic Hamburger Menu ===
    const menuButton = document.querySelector('.hamburger-menu');
    const navList = document.getElementById('nav-list');

    menuButton.addEventListener('click', function() {
        // Toggle class 'active' pada ul (daftar navigasi)
        navList.classList.toggle('active');
        // Toggle class 'open' pada tombol hamburger (untuk animasi X)
        menuButton.classList.toggle('open');
    });

    // Tutup menu saat link navigasi diklik
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navList.classList.remove('active');
            menuButton.classList.remove('open');
        });
    });

    // === Logic Carousel/Slider Baru ===
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const dots = Array.from(document.querySelectorAll('.carousel-nav .dot'));
    const slideCount = slides.length;
    let currentIndex = 0;
    const intervalTime = 5000; // 5 detik (5000 milidetik)

    // Fungsi untuk memindahkan slide
    const moveToSlide = (targetIndex) => {
        // Hitung perpindahan horizontal: 0% untuk slide 0, 100% untuk slide 1, dst.
        const offset = targetIndex * 100;
        track.style.transform = `translateX(-${offset}%)`;

        // Update indikator dot
        dots.forEach(dot => dot.classList.remove('active'));
        // Pastikan targetIndex valid sebelum menambahkan class
        if (dots[targetIndex]) {
            dots[targetIndex].classList.add('active');
        }

        currentIndex = targetIndex;
    };

    // Fungsi untuk maju ke slide berikutnya
    const nextSlide = () => {
        // Hitung indeks berikutnya, menggunakan modulus (%) untuk kembali ke 0
        let nextIndex = (currentIndex + 1) % slideCount;
        moveToSlide(nextIndex);
    };

    // Gulir otomatis setiap 5 detik
    setInterval(nextSlide, intervalTime);

    // Navigasi menggunakan dots (manual click)
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });
});