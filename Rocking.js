document.addEventListener('DOMContentLoaded', () => {
    const selected = document.getElementById('selectSelected');
    const items = document.getElementById('selectItems');
    const searchBox = document.getElementById('searchBox');
    const pagination = document.getElementById('pagination');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    
    let currentPage = 1;
    const itemsPerPage = 8; // ปรับลดลงเพื่อให้เห็นการแบ่งหน้าชัดเจนขึ้น

    // --- 1. ระบบ Dropdown ---
    selected.addEventListener('click', (e) => {
        e.stopPropagation();
        items.style.display = (items.style.display === 'block') ? 'none' : 'block';
    });

    items.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            selected.innerText = item.innerText;
            selected.setAttribute('data-active', item.getAttribute('data-value'));
            items.style.display = 'none';
            currentPage = 1;
            updateDisplay();
        });
    });

    // --- 2. ระบบ Filter Buttons ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selected.setAttribute('data-active', btn.getAttribute('data-filter'));
            currentPage = 1;
            updateDisplay();
        });
    });

    document.addEventListener('click', () => { items.style.display = 'none'; });

    // --- 3. ฟังก์ชันอัปเดตการแสดงผลสินค้า ---
    function updateDisplay() {
        const category = selected.getAttribute('data-active') || 'all';
        const keyword = searchBox.value.toLowerCase().trim();

        const filtered = cards.filter(card => {
            const cardCat = card.getAttribute('data-category');
            
            // เช็ค Category (ถ้าเลือก All หรือค่าตรงกับ data-category)
            const matchCat = (category === 'all' || category === 'AllProducts' || cardCat === category);
            
            // เช็ค Keyword จากชื่อสินค้า และ data-keywords
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardKeys = (card.getAttribute('data-keywords') || "").toLowerCase();
            const matchKey = (cardTitle.includes(keyword) || cardKeys.includes(keyword));
            
            return matchCat && matchKey;
        });

        // ซ่อนทุกอันก่อน
        cards.forEach(card => card.style.display = 'none');

        // คำนวณหน้า
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // แสดงเฉพาะรายการของหน้านั้นๆ
        filtered.slice(startIndex, endIndex).forEach(card => card.style.display = 'flex');

        // สร้างเลขหน้า (แสดงถ้ามีมากกว่า 0 หน้า)
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

    // --- 4. Event Listener อื่นๆ ---
    searchBox.addEventListener('keyup', () => { 
        currentPage = 1; 
        updateDisplay(); 
    });

    // เริ่มต้นทำงาน
    updateDisplay();
});