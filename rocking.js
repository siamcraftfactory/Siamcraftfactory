document.addEventListener('DOMContentLoaded', () => {
    const selected = document.getElementById('selectSelected');
    const items = document.getElementById('selectItems');
    const searchBox = document.getElementById('searchBox');
    const pagination = document.getElementById('pagination');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    
    let currentPage = 1;
    const itemsPerPage = 8;

    // --- 1. ระบบ Dropdown ---
    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        items.style.display = (items.style.display === 'block') ? 'none' : 'block';
    });

    // ปิดเมนูเมื่อคลิกข้างนอก
    document.addEventListener('click', () => { items.style.display = 'none'; });

    // --- 2. ระบบ Filter Buttons (สำหรับหน้าปัจจุบัน) ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // ใช้ data-filter ของปุ่ม
            selected.setAttribute('data-active', btn.getAttribute('data-filter'));
            currentPage = 1;
            updateDisplay();
        });
    });

    // --- 3. ฟังก์ชันอัปเดตการแสดงผลสินค้า ---
    function updateDisplay() {
        // ใช้ค่าจาก data-active หรือค่าเริ่มต้น
        const category = selected.getAttribute('data-active') || 'all';
        const keyword = searchBox.value.toLowerCase().trim();

        const filtered = cards.filter(card => {
            const cardCat = card.getAttribute('data-category');
            const matchCat = (category === 'all' || category === 'AllProducts' || cardCat === category);
            
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardKeys = (card.getAttribute('data-keywords') || "").toLowerCase();
            const matchKey = (cardTitle.includes(keyword) || cardKeys.includes(keyword));
            
            return matchCat && matchKey;
        });

        cards.forEach(card => card.style.display = 'none');

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        filtered.slice(startIndex, endIndex).forEach(card => card.style.display = 'flex');

        pagination.innerHTML = '';
        if (filtered.length > itemsPerPage) {
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                if (i === currentPage) btn.classList.add('active');
                btn.onclick = () => {
                    currentPage = i;
                    updateDisplay();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                };
                pagination.appendChild(btn);
            }
        }
    }

    searchBox.addEventListener('keyup', () => { 
        currentPage = 1; 
        updateDisplay(); 
    });

    updateDisplay();
});