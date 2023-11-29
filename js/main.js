// Close popup 
const body = document.querySelector("body");

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

function autoscrolldown() {

    var elementId = 'home-title';

    var elementToScrollTo = document.getElementById(elementId); // element bạn muốn cuộn đến

    if (elementToScrollTo) {
        elementToScrollTo.scrollIntoView({
            behavior: 'smooth', // tùy chọn để làm cho cuộn mượt mà với hiệu ứng
            block: 'start' // hoặc 'end' hoặc 'center', tùy thuộc vào cách bạn muốn phần tử hiển thị trong khung nhìn
        });
    }
}

// function autoscrolldown(distanceFromTop) {
//     var elementId = 'home-title';
//     var elementToScrollTo = document.getElementById(elementId);

//     if (elementToScrollTo) {
//         var elementRect = elementToScrollTo.getBoundingClientRect();
//         var offset = elementRect.top + window.scrollY - distanceFromTop;

//         window.scrollTo({
//             top: offset,
//             behavior: 'smooth'
//         });
//     }
// }


// function autoscrolldown() {
//     window.scrollTo({
//         top: 600, // 1000 là vị trí muốn cuộn đến
//         behavior: 'smooth' // tùy chọn để làm cho cuộn mượt mà với hiệu ứng
//     });
// }

window.onload = uploadProduct(JSON.parse(localStorage.getItem('products')));
// Find Product
var productAll = JSON.parse(localStorage.getItem('products'));
function searchProducts() {
    let result = productAll;
    let valueSearchInput = document.querySelector('.form-search-input').value;
    result = valueSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valueSearchInput.toString().toUpperCase());
    })
    showHomeProduct(result);
    autoscrolldown();
}

function showCategory(category) {
    console.log(category);
    let result = productAll;
    result = category == "" ? result : result.filter(item => {
        return item.category.toString().toUpperCase().includes(category.toString().toUpperCase());
    })
    console.log(result);
    showHomeProduct(result);
    autoscrolldown();
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


// Open & Close Cart
function openCart() {
    // showCart();
    document.querySelector('.modal-cart').classList.add('open');
    body.style.overflow = "hidden";
}

function closeCart() {
    document.querySelector('.modal-cart').classList.remove('open');
    body.style.overflow = "auto";
    updateAmount();
}


//Show gio hang
function showCart() {
    if (localStorage.getItem('currentuser') != null) {
        let currentuser = JSON.parse(localStorage.getItem('currentuser'));
        if (currentuser.cart.length != 0) {
            document.querySelector('.gio-hang-trong').style.display = 'none';
            document.querySelector('button.thanh-toan').classList.remove('disabled');
            let productcarthtml = '';
            currentuser.cart.forEach(item => {
                let product = getProduct(item);
                productcarthtml += `<li class="cart-item" data-id="${product.id}">
                <div class="cart-item-info">
                    <p class="cart-item-title">
                        ${product.title}
                    </p>
                    <span class="cart-item-price price" data-price="${product.price}">
                    ${vnd(parseInt(product.price))}
                    </span>
                </div>
                <p class="product-note"><i class="fa-light fa-pencil"></i><span>${product.note}</span></p>
                <div class="cart-item-control">
                    <button class="cart-item-delete" onclick="deleteCartItem(${product.id},this)">Xóa</button>
                    <div class="buttons_added">
                        <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                        <input class="input-qty" max="100" min="1" name="" type="number" value="${product.soluong}">
                        <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
                    </div>
                </div>
            </li>`
            });
            document.querySelector('.cart-list').innerHTML = productcarthtml;
            updateCartTotal();
            saveAmountCart();
        } else {
            document.querySelector('.gio-hang-trong').style.display = 'flex'
        }
    }
    let modalCart = document.querySelector('.modal-cart');
    let containerCart = document.querySelector('.cart-container');
    let themmon = document.querySelector('.them-mon');
    modalCart.onclick = function () {
        closeCart();
    }
    themmon.onclick = function () {
        closeCart();
    }
    containerCart.addEventListener('click', (e) => {
        e.stopPropagation();
    })
}


//Signup && Login Form

// Chuyen doi qua lai SignUp & Login 
let signup = document.querySelector('.signup-link');
let login = document.querySelector('.login-link');
let container = document.querySelector('.signup-login .modal-container');
login.addEventListener('click', () => {
    container.classList.add('active');
})

signup.addEventListener('click', () => {
    container.classList.remove('active');
})

let signupbtn = document.getElementById('signup');
let loginbtn = document.getElementById('login');
let formsg = document.querySelector('.modal.signup-login')
signupbtn.addEventListener('click', () => {
    formsg.classList.add('open');
    container.classList.remove('active');
    body.style.overflow = "hidden";
})

loginbtn.addEventListener('click', () => {
    document.querySelector('.form-message-check-login').innerHTML = '';
    formsg.classList.add('open');
    container.classList.add('active');
    body.style.overflow = "hidden";
})

