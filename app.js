document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    fetch("portofolio.json")
        .then(response => response.json())
        .then(data => {
            let portfolio = data.find(item => item.slug === slug);

            if (portfolio) {
                // Set judul
                document.querySelector(".deskripsi h1").textContent = portfolio.title;

                // Masukkan deskripsi (HTML)
                document.querySelector(".detail-aplikasi").innerHTML = portfolio.description;

                // Masukkan gambar ke dalam Swiper
                let swiperWrapper = document.querySelector(".swiper-wrapper");
                swiperWrapper.innerHTML = ""; // Kosongkan sebelum mengisi
                portfolio.images.forEach(imgSrc => {
                    let slide = document.createElement("div");
                    slide.classList.add("swiper-slide");
                    slide.innerHTML = `<img src="${imgSrc}" alt="${portfolio.title}">`;
                    swiperWrapper.appendChild(slide);
                });

                // Update Swiper agar bisa menampilkan gambar yang baru ditambahkan
                setTimeout(() => {
                    new Swiper(".mySwiper", {
                        slidesPerView: 1,
                        spaceBetween: 30,
                        loop: true,
                        pagination: {
                            el: ".swiper-pagination",
                            clickable: true,
                        }
                    });
                }, 100);
            } else {
                document.querySelector(".detail-container").innerHTML = "<p>Portofolio tidak ditemukan.</p>";
            }
        })
        .catch(error => console.error("Error loading portfolio details:", error));
});
