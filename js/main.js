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
    if(showProduct.length == 0) {
        document.getElementById("home-title").style.display = "none";
        productHtml = `<div class="no-result"><div class="no-result-h">Tìm kiếm không có kết quả</div><div class="no-result-p">Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</div><div class="no-result-i"><i class="fa-light fa-face-sad-cry"></i></div></div>`;
    } else {
        productHtml = showProduct.map(function(product) 
        {
            return `
            <a href="productDetail.html?id=${product.id}" class="item">
            <div class="product-preview">
                <img class="thumbnail" src="${product.img}">
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
            </a>
            `;
        });
        
    }
    console.log(productHtml);
    let listProducts = document.querySelector('.product-grid');
    listProducts.innerHTML = productHtml.join('');
    
    
}

window.onload = uploadProduct(JSON.parse(localStorage.getItem('products')));
// Find Product
var productAll = JSON.parse(localStorage.getItem('products'));
function searchProducts() {
    let result = productAll;
    let valeSearchInput = document.querySelector('.form-search-input').value;
    result = valeSearchInput == "" ? result : result.filter(item => {
        return item.title.toString().toUpperCase().includes(valeSearchInput.toString().toUpperCase());
    })
    uploadProduct(result);
}