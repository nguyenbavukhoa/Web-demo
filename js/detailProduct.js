// get datas product in products.json
var products = null;
fetch('products.json')
 .then(function(response) {
    return response.json();
  })
  .then(data => {
    products = data;
    showDetail();
  })
// find this product
function showDetail() {
    let detail = document.querySelector('.detail');
    let productID = new URLSearchParams(window.location.search).get('id');
    let thisProduct = products.filter(value => {
        return value.id == productID;
    })[0];
    // if there is no product has id = productID
    // => return to home page
    if(!thisProduct) {
        window.location.href = '/';
    }
    // and if has, add data this product in html
    detail.querySelector('.image img').src = thisProduct.img;
    detail.querySelector('.name').innerText = thisProduct.title;
    detail.querySelector('.price').innerText = thisProduct.price + " ₫";
    detail.querySelector('.description').innerText = thisProduct.desc;

    // add datas product similar

    // show some product
    
}