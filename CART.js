// =========================
// LANGUAGE DROPDOWN
// =========================

const langBtn = document.querySelector('.language-btn');
const langMenu = document.querySelector('.language-menu');

if (langBtn && langMenu) {

    langBtn.addEventListener('click', (e) => {

        e.stopPropagation();

        langMenu.style.display =
            langMenu.style.display === 'block'
                ? 'none'
                : 'block';

    });

}

// =========================
// PRODUCT DROPDOWN
// =========================

const productBtn = document.querySelector('.product-btn');
const productMenu = document.querySelector('.product-menu');

if (productBtn && productMenu) {

    productBtn.addEventListener('click', (e) => {

        e.stopPropagation();

        productMenu.style.display =
            productMenu.style.display === 'block'
                ? 'none'
                : 'block';

    });

}

// =========================
// CLOSE MENU WHEN CLICK OUTSIDE
// =========================

document.addEventListener('click', () => {

    if (langMenu) {
        langMenu.style.display = 'none';
    }

    if (productMenu) {
        productMenu.style.display = 'none';
    }

});

// =========================
// UPDATE TOTAL
// =========================

function updateCart() {

    let grandTotal = 0;

    document.querySelectorAll('.cart-item').forEach(item => {

        const qtyInput =
            item.querySelector('.qty');

        const qty =
            parseInt(qtyInput.value) || 0;

        const price =
            parseFloat(item.dataset.price);

        const total =
            qty * price;

        item.querySelector('.total-price').textContent =
            total.toFixed(2);

        grandTotal += total;

    });

    const grandTotalEl =
        document.getElementById('grandTotal');

    if (grandTotalEl) {

        grandTotalEl.textContent =
            grandTotal.toFixed(2);

    }

}

// =========================
// CART EVENTS
// =========================

document.querySelectorAll('.cart-item').forEach(item => {

    const plus =
        item.querySelector('.plus');

    const minus =
        item.querySelector('.minus');

    const qty =
        item.querySelector('.qty');

    const removeBtn =
        item.querySelector('.remove-btn');

    // เพิ่มจำนวน

    plus.addEventListener('click', () => {

        qty.value =
            parseInt(qty.value || 0) + 1;

        updateCart();

    });

    // ลดจำนวน

    minus.addEventListener('click', () => {

        let current =
            parseInt(qty.value || 0);

        current--;

        if (current <= 0) {

            item.remove();

        } else {

            qty.value = current;

        }

        updateCart();

    });

    // พิมพ์จำนวนเอง

    qty.addEventListener('input', () => {

        let current =
            parseInt(qty.value);

        if (isNaN(current)) return;

        if (current <= 0) {

            item.remove();

        }

        updateCart();

    });

    // ปุ่มลบ

    if (removeBtn) {

        removeBtn.addEventListener('click', () => {

            item.remove();

            updateCart();

        });

    }

});

// =========================
// INITIAL LOAD
// =========================

updateCart();