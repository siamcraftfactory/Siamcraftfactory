document.addEventListener('DOMContentLoaded', () => {
    const selected = document.getElementById('selectSelected');
    const items = document.getElementById('selectItems');
    const searchBox = document.getElementById('searchBox');
    const pagination = document.getElementById('pagination');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = Array.from(document.querySelectorAll('.product-card'));

    // ป้องกัน error หากไม่มี element บนหน้านี้
    if (!selected || !items || !searchBox || !pagination) {
        return;
    }

    let currentPage = 1;
    const itemsPerPage = 12;

    // Dropdown
    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        items.style.display =
            items.style.display === 'block' ? 'none' : 'block';
    });

    items.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', () => {
            selected.innerText = item.innerText;
            selected.setAttribute(
                'data-active',
                item.getAttribute('data-value')
            );

            items.style.display = 'none';
            currentPage = 1;
            updateDisplay();
        });
    });

    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            selected.setAttribute(
                'data-active',
                btn.getAttribute('data-filter')
            );

            currentPage = 1;
            updateDisplay();
        });
    });

    // ปิด dropdown เมื่อคลิกนอกพื้นที่
    document.addEventListener('click', () => {
        items.style.display = 'none';
    });

    function updateDisplay() {
        const category =
            selected.getAttribute('data-active') || 'all';

        const keyword =
            searchBox.value.toLowerCase().trim();

        const filtered = cards.filter(card => {
            const cardCat =
                card.getAttribute('data-category');

            const cardSubCat =
                card.getAttribute('data-subcategory');

            const matchCat =
                category === 'all' ||
                cardCat === category ||
                cardSubCat === category;

            const cardTitle =
                card.querySelector('h3')
                    .textContent
                    .toLowerCase();

            const cardKeys =
                (card.getAttribute('data-keywords') || '')
                    .toLowerCase();

            const matchKey =
                cardTitle.includes(keyword) ||
                cardKeys.includes(keyword);

            return matchCat && matchKey;
        });

        // ซ่อนทั้งหมด
        cards.forEach(card => {
            card.style.display = 'none';
        });

        const totalPages =
            Math.ceil(filtered.length / itemsPerPage);

        // กัน currentPage เกินจำนวนหน้า
        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }

        const startIndex =
            (currentPage - 1) * itemsPerPage;

        const endIndex =
            startIndex + itemsPerPage;

        filtered
            .slice(startIndex, endIndex)
            .forEach(card => {
                card.style.display = 'flex';
            });

        // Pagination
        pagination.innerHTML = '';

        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const btn =
                    document.createElement('button');

                btn.textContent = i;

                if (i === currentPage) {
                    btn.classList.add('active');
                }

                btn.addEventListener('click', () => {
                    currentPage = i;
                    updateDisplay();

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });

                pagination.appendChild(btn);
            }
        }
    }

    searchBox.addEventListener('input', () => {
        currentPage = 1;
        updateDisplay();
    });

    updateDisplay();
});

const imageModal =
document.getElementById("imageModal");

const zoomImg =
document.getElementById("zoomImg");

document
.querySelectorAll(".product-card img")
.forEach(img => {

    img.addEventListener("click", () => {

        zoomImg.src = img.src;

        imageModal.style.display = "flex";

    });

});

document
.querySelector(".close-image")
.addEventListener("click", () => {

    imageModal.style.display = "none";

});

imageModal.addEventListener("click",(e)=>{

    if(e.target === imageModal){

        imageModal.style.display = "none";

    }

});
