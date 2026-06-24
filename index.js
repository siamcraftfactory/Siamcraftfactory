    const langBtn = document.querySelector('.language-btn');
    const langMenu = document.querySelector('.language-menu');

    langBtn.addEventListener('click', function (e) {
        e.stopPropagation();

        const isOpen =
            langMenu.style.display === 'block';

        langMenu.style.display =
            isOpen ? 'none' : 'block';
    });

    document.addEventListener('click', function () {
        langMenu.style.display = 'none';
    });

    const productBtn =
    document.querySelector('.product-btn');

    const productMenu =
    document.querySelector('.product-menu');

    productBtn.addEventListener('click', function (e) {

        e.stopPropagation();

        const isOpen =
            productMenu.style.display === 'block';

        productMenu.style.display =
            isOpen ? 'none' : 'block';

    });

    document.addEventListener('click', function () {

        langMenu.style.display = 'none';

        if(productMenu){
            productMenu.style.display = 'none';
        }

    });

    const minusBtn = document.querySelector(".minus");
    const plusBtn = document.querySelector(".plus");

    const qtyText = document.querySelector(".qty");
    const totalText = document.querySelector(".total span");

    let price = 10;
    let qty = 1;

    plusBtn.addEventListener("click", () => {

        qty++;

        qtyText.textContent = qty;
        totalText.textContent = "$" + (qty * price);

    });

    minusBtn.addEventListener("click", () => {

        if(qty > 1){

            qty--;

            qtyText.textContent = qty;
            totalText.textContent = "$" + (qty * price);

        }

    });

    const searchBox = document.getElementById("searchBox");

    const products = document.querySelectorAll(".product-card");

    searchBox.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        products.forEach(product => {

            const name = product.querySelector("h3").textContent.toLowerCase();

            if (name.includes(keyword)) {
                product.style.display = "";
            } else {
                product.style.display = "none";
            }

        });

    });