// Auto hide header on scroll
const headerNav = document.querySelector(".header-bottom");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
        headerNav.classList.add("hide")
    } else {
        headerNav.classList.remove("hide")
    }
    lastScrollY = window.scrollY;
})

// Auto switch main-wrapper

var counter = 1;
setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 3000);

// get datas from products.json 

var listProducts = document.querySelector('.product-grid');

function uploadProduct(products) {
    // var products = null;
    // fetch('products.json')
    //     .then(response => response.json())
    //     .then(data => {
    //         products = data;
    //         console.log(products);
    //         addDataToHTML();
    //     })

    let productAll = products.filter(item => item.status == 1)
    console.log(productAll);
    // add data products to HTML
    function addDataToHTML() {
        products.forEach(product => {
            console.log(product);
            // create new element item
            let newProduct = document.createElement('a');
            newProduct.href = 'productDetail.html?id=' + product.id;
            newProduct.classList.add('item');
            console.log(product.title);
            newProduct.innerHTML = `
            <div class="product-preview">
                <img class="thumbnail" src="${product.img}">
                <div class="product-info">
                    <p class="product-title">
                        ${product.title}
                    </p>
                    <p class="product-price">${product.price} &#8363;</p>
                    <div class="center">
                        <button class="order-button">
                            <i class='bx bx-cart'></i>
                            <p>Đặt món</p>
                        </button>
                    </div>
                </div>
            </div>
            `;
            // add this element in product-grid class
            listProducts.appendChild(newProduct);
        });

    }
    addDataToHTML();
}

window.onload = uploadProduct(JSON.parse(localStorage.getItem('products')))