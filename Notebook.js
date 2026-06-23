document.addEventListener('DOMContentLoaded', () => {
    // 1. ดึง Elements ต่างๆ มาใช้งาน
    const selected = document.getElementById('selectSelected');
    const items = document.getElementById('selectItems');
    const searchBox = document.getElementById('searchBox');
    const pagination = document.getElementById('pagination');
    const cards = Array.from(document.querySelectorAll('.product-card'));
    
    let currentPage = 1;
    const itemsPerPage = 16; 

    // 2. ระบบ Dropdown (การเปิด-ปิด และเลือกค่า)
    selected.addEventListener('click', (e) => {
        e.stopPropagation(); 
        items.style.display = (items.style.display === 'block') ? 'none' : 'block';
    });

    items.querySelectorAll('div').forEach(item => {
        item.addEventListener('click', () => {
            selected.innerText = item.innerText;
            // อัปเดต data-active เพื่อใช้ในการกรองข้อมูล
            selected.setAttribute('data-active', item.getAttribute('data-value'));
            items.style.display = 'none';
            
            currentPage = 1; // เริ่มที่หน้า 1 ใหม่ทุกครั้งที่เปลี่ยนหมวดหมู่
            updateDisplay();
        });
    });

    // ปิด Dropdown เมื่อคลิกที่อื่นบนหน้าจอ
    document.addEventListener('click', () => {
        items.style.display = 'none';
    });

    // 3. ระบบ Filter และ Pagination
    function updateDisplay() {
        const category = selected.getAttribute('data-active') || 'all';
        const keyword = searchBox.value.toLowerCase().trim();

        // กรองรายการสินค้า
        const filtered = cards.filter(card => {
            const matchCat = (category === 'all' || card.getAttribute('data-category') === category);
            const matchKey = (card.querySelector('h3').textContent.toLowerCase().includes(keyword) || 
                             (card.getAttribute('data-keywords') || "").toLowerCase().includes(keyword));
            return matchCat && matchKey;
        });

        // ซ่อนการ์ดทั้งหมดก่อน
        cards.forEach(card => card.style.display = 'none');

        // คำนวณหน้าที่จะแสดง
        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // แสดงเฉพาะการ์ดในหน้านั้นๆ
        filtered.slice(startIndex, endIndex).forEach(card => card.style.display = 'block');

        // สร้างปุ่มเลขหน้า
        pagination.innerHTML = '';
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

    // 4. ฟัง Event ของช่องค้นหา
    searchBox.addEventListener('keyup', () => { 
        currentPage = 1; 
        updateDisplay(); 
    });

    // เริ่มต้นแสดงผลหน้าแรก
    updateDisplay();
});