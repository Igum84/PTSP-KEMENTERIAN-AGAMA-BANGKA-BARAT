// Jalankan setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    
    // ===================================
    // 1. LOGIKA HAMBURGER MENU (Kode Anda Sebelumnya)
    // ===================================
    const hamburger = document.querySelector(".hamburger-menu");
    const navList = document.querySelector("header nav ul");
    const navLinks = document.querySelectorAll("header nav ul li a");

    // Klik hamburger => buka/tutup menu
    if (hamburger && navList) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navList.classList.toggle("active");
        });
    }

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
                // top: targetElement.offsetTop - 70; (Menyesuaikan dengan tinggi header)
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ===================================
    // 2. LOGIKA CAROUSEL OTOMATIS (Tambahan Baru)
    // ===================================
    const slider = document.querySelector('.carousel-slider');
    // Mencari semua item termasuk duplikat di HTML
    const items = document.querySelectorAll('.carousel-item'); 
    
    if (slider && items.length > 1) {
        const totalSlides = items.length; // 4 (3 asli + 1 duplikat)
        let currentIndex = 0;
        const intervalTime = 5000; // 5000ms = 5 detik

        function updateSliderPosition() {
            // Persentase pergeseran dihitung berdasarkan total item (4 item = 25% per item)
            const percentage = currentIndex * (100 / totalSlides);
            slider.style.transform = `translateX(-${percentage}%)`;
        }

        function nextSlide() {
            currentIndex++;
            updateSliderPosition();

            // Cek jika sudah mencapai slide duplikat (index 3)
            if (currentIndex === totalSlides - 1) {
                
                // Setelah transisi (0.5s di CSS) selesai, reset posisi ke slide 0 tanpa animasi.
                setTimeout(() => {
                    slider.style.transition = 'none'; // Matikan transisi
                    currentIndex = 0;
                    updateSliderPosition();
                    
                    // Nyalakan transisi kembali setelah reset
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease-in-out';
                    }, 50); 
                }, 500); // Harus sama dengan waktu transisi di CSS
            }
        }

        // Mulai gulir otomatis setiap 5 detik
        setInterval(nextSlide, intervalTime);

        // Tetapkan posisi awal
        updateSliderPosition();
    }
});
