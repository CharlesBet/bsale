/*
General description here
*/

const baseUrl = "http://127.0.0.1:8000/api/"

// add docstring
function filterCategories(id=null) {
    if (id) {
        getProducts({category: id});
    }
}   

// function for filter products for name contains with paginate
function filterProductsByName(query=null) {
    if (query) {
        getProducts({name: query});
    }
}

// ->>>>>>>>>>>>>>>>>>/ generic funcion for get data
async function queryAPI(endpoint, params=null) {
    console.log(params);
    let url = `${baseUrl}${endpoint}`;
    url = params ? `${url}?${new URLSearchParams(params)}` : url;
    try {
        let response = await fetch(url, { method: 'GET', headers: { 'Accept': "*/*", "Content-Type": "application/json" } });
        return await response.json();
    } catch (error) { console.log(error); }
}

// ->>>>>>>>>>>>>. render category data in a id select
async function getCategories() {
    let categories = await queryAPI('categories/');
    let children = "";
    categories.map(category => {
        children += `<a class="dropdown-item" onclick=filterCategories(${category.id});>${category.name}</a>`
    });
    document.getElementById("categories").innerHTML += children;
}


// render products
async function getProducts(data=null) {
    let products = await queryAPI('products/', data);
    let productInfo = '';
    products.map(product => {
        product.withDiscount = product.price - (product.price * (product.discount / 100));
        let segment = `
        <div class="row product-list dev">
            <div class="col-7 col-sm-4 col-md-3 col-lg-3 col-xl-2 col-xxl-2 offset-xxl-0 product-item animation-element slide-rotate-counterclockwise-180">
                <div class="product-container">
                    <div class="row">
                        <div class="col-md-12">
                            <img style="height: 130px;width: 100px;position: relative;text-align: center;margin-left: 23px;padding: 1px;" src=${product.url_image}></div>
                    </div>
                    <div class="row">
                        <div class="col-8 col-md-12">
                            <h4 style="font-family: Inter, sans-serif;margin-left: 27px;">${product.name}</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <div class="col-6">
                                    <p class="product-price">${product.price}</p>
                                </div>
                                <div class="col-8">
                                    <p class="product-price">${product.withDiscount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        `;
        productInfo += segment;
    });
    document.getElementById('products').innerHTML = productInfo;
}

function registerEvents(){
    getCategories();
    getProducts();
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", event => {
        if (event.code == "Enter") {
            filterProductsByName(searchBar.value);
        }
    })
}

registerEvents();


