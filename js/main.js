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
function uploadProduct(showProduct) {
    // add data products to HTML
    let productHtml = '';
    let listProducts = document.querySelector('.main-menu');
    if (showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";
        productHtml = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div></div>`;
    } else {
        let products = showProduct.map(function (product) {
            return `
            <div class="product-preview">
                <a href="productDetail.html?id=${product.id}" class="item">
                    <img class="thumbnail" src="${product.img}">
                </a>    
                <div class="product-info">
                    <p class="product-title">
                        ${product.title}
                    </p>
                    <p class="product-price">${product.price} &#8363;</p>
                    <div class="center">
                        <button class="order-button">
                            <i class="bx bx-cart"></i>
                            <p>Đặt món</p>
                        </button>
                    </div>
                </div>
            </div>
            
            `;

        });
        document.getElementById("home-title").style.display = "";
        productHtml = `<section class="product-grid">${products.join('')}</section><section style`;
    }
    listProducts.innerHTML = productHtml;

}

window.onload = uploadProduct(JSON.parse(localStorage.getItem('products')));
// Find Product
var productAll = JSON.parse(localStorage.getItem('products'));
function searchProducts() {
    let result = productAll;
    let valueSearchInput = document.querySelector('.form-search-input').value;
    result = valueSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valueSearchInput.toString().toUpperCase());
    })
    console.log(result);
    showHomeProduct(result);

}

function showCategory(category) {
    console.log(category);
    let result = productAll;
    result = category == "" ? result : result.filter(item => {
        return item.category.toString().toUpperCase().includes(category.toString().toUpperCase());
    })
    console.log(result);
    showHomeProduct(result);
}

// Phan Trang
let thisPage = 1;
let perPage = 12;
let list = document.querySelectorAll('.product-grid .product-preview');

function loadItem() {
    let beginGet = perPage * (thisPage - 1);
    let endGet = perPage * thisPage - 1;
    list.forEach((item, index) => {
        if (index >= beginGet && index <= endGet) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
    listPage();
}

loadItem();

function listPage() {
    let count = Math.ceil((list.length / perPage < 1 ? 0 : list.length / perPage));
    document.querySelector('.listPage').innerHTML = '';

    if (thisPage != 1) {
        let prev = document.createElement('li');
        prev.innerText = 'Prev';
        prev.setAttribute('onclick', 'changePage(' + (thisPage - 1) + ')');
        document.querySelector('.listPage').appendChild(prev);
    }

    for (i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', 'changePage(' + i + ')');
        document.querySelector('.listPage').appendChild(newPage);
    }

    if (thisPage != count && count > 0) {
        let next = document.createElement('li');
        next.innerText = 'Next';
        next.setAttribute('onclick', 'changePage(' + (thisPage + 1) + ')');
        document.querySelector('.listPage').appendChild(next);
    }
}

function changePage(index) {
    thisPage = index;
    loadItem();
}

function showHomeProduct(products) {
    uploadProduct(products);
    list = document.querySelectorAll('.product-grid .product-preview');
    loadItem();
}