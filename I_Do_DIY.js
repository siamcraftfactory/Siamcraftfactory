document.addEventListener('DOMContentLoaded', () => {
    // 1. ระบบ Dropdown
    const dropdown = document.getElementById('dropdown');
    const selectSelected = document.getElementById('selectSelected');
    const selectItems = document.getElementById('selectItems');

    selectSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        const isVisible = selectItems.style.display === 'block';
        selectItems.style.display = isVisible ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
        selectItems.style.display = 'none';
    });

    // 2. ระบบ Filter & Pagination
    const searchBox = document.getElementById('searchBox');
    const pagination = document.getElementById('pagination');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productGrid = document.getElementById('productGrid');
    
    let currentPage = 1;
    const itemsPerPage = 12; 
    let currentCategory = 'all'; 

    // ฟังชั่นก์อัปเดตการแสดงผล
    function updateDisplay() {
        const keyword = searchBox.value.toLowerCase().trim();

        // กรองข้อมูล
        const filtered = cards.filter(card => {
            const cardCat = card.getAttribute('data-category');
            const catMatch = (currentCategory === 'all' || cardCat === currentCategory);
            
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardKeys = (card.getAttribute('data-keywords') || "").toLowerCase();
            const keyMatch = (cardTitle.includes(keyword) || cardKeys.includes(keyword));
            
            return catMatch && keyMatch;
        });

        // ซ่อนทั้งหมดก่อน
        cards.forEach(card => card.style.display = 'none');

        // คำนวณหน้า
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // แสดงเฉพาะรายการที่อยู่ในหน้านั้นๆ
        filtered.slice(start, end).forEach(card => card.style.display = 'flex');

        // สร้างปุ่มเลขหน้า
        pagination.innerHTML = '';
        if (totalPages > 1) {
            for (let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.innerText = i;
                if (i === currentPage) btn.classList.add('active');
                btn.onclick = () => {
                    currentPage = i;
                    updateDisplay();
                    window.scrollTo({ top: productGrid.offsetTop - 100, behavior: 'smooth' });
                };
                pagination.appendChild(btn);
            }
        }
    }

    // Event Listeners สำหรับปุ่ม Filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            currentPage = 1;
            updateDisplay();
        });
    });

    // Event Listener สำหรับช่องค้นหา
    searchBox.addEventListener('keyup', () => { 
        currentPage = 1; 
        updateDisplay(); 
    });

    // เริ่มทำงานครั้งแรก
    updateDisplay();
});