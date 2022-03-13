'use strict';

window.onload = function () {
    initializeComponents()
    getAllProductsByCategory()
}

function initializeComponents() {
    document.getElementById('nav-shopping-cart').addEventListener('click', () => {
        displayShoppinCart();
    });

    document.getElementById('shopping-cart-close').addEventListener('click', () => {
        hiddenShoppingCart();
    });
}

function displayShoppinCart() {
    let shoppingCart = document.getElementById('aside-shopping-cart')
    let percentReduceScrean = window.screen.height * .2
    let screen = window.screen.height - percentReduceScrean
    shoppingCart.style.setProperty('height', `${screen}px`)
    shoppingCart.style.setProperty('visibility', 'visible');
}


function hiddenShoppingCart() {
    let shoppingCart = document.getElementById('aside-shopping-cart')
    shoppingCart.style.setProperty('visibility', 'hidden');
}

const buildCardMain = (title, description, photoUrl, price, category, productId) => {

    let cardCol = document.createElement("div");
    let cardContainer = document.createElement("div");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let cardTextDescription = document.createElement("p");
    let cardTextPrice = document.createElement("p");
    let cardDivBtnFull = document.createElement("div");
    let cardBtnAdd = document.createElement("p");
    let cardBtnIcon = document.createElement("i");


    // Add classes to elements
    cardCol.classList.add("col-3");
    cardContainer.classList.add("card");
    cardImage.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTextDescription.classList.add("card-text");
    cardTextPrice.classList.add("card-text");
    cardDivBtnFull.classList.add("d-grid", "gap-2")
    cardBtnAdd.classList.add("btn", "btn-primary")
    cardBtnIcon.classList.add("fas", "fa-cart-plus")

    //Add css
    cardContainer.style.setProperty('width', '15rem')


    // Add values to the elements
    cardImage.src = photoUrl;
    cardTitle.innerText = title;
    cardTextDescription.innerText = description;
    cardTextPrice.innerText = `Price: $ ${price}`;
    cardBtnAdd.innerText = "Add Cart";

    // Build structure
    cardCol.appendChild(cardContainer);

    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardBody);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardTextDescription);
    cardBody.appendChild(cardTextPrice);
    cardBody.appendChild(cardDivBtnFull);

    cardDivBtnFull.appendChild(cardBtnAdd);

    cardBtnAdd.appendChild(cardBtnIcon);

    const product = {
        title: title,
        description: description,
        price: price,
        imageUrl: photoUrl,
        category: category,
        productId: productId
    };

    cardBtnAdd.addEventListener('click', () => {
        console.log(product);
    });

    return cardCol;
};

const buildProduct = (title, description, photoUrl, price, category, productId) => {
    const objetcProduct = {
        title: title,
        description: description,
        price: price,
        imageUrl: photoUrl,
        category: category,
        productId: productId
    };
    return objetcProduct
}

const getAllProductsByCategory = () => {
    const url = "https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/products.json";

    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((products) => {
            let emptyProductShirts = document.createElement("h1");
            emptyProductShirts.id = "message-empty-products-shirts";
            emptyProductShirts.innerText = "Aun no se cuentan con productos"

            let emptyProductsPants = document.createElement("h1");
            emptyProductsPants.id = "message-empty-products-pants";
            emptyProductsPants.innerText = "Aun no se cuentan con productos"

            let emptyProductsSweater = document.createElement("h1");
            emptyProductsSweater.id = "message-empty-products-sweater";
            emptyProductsSweater.innerText = "Aun no se cuentan con productos"

            let shirtsContent = document.getElementById("products-body-carts-shirts");
            let pantsContent = document.getElementById("products-body-carts-pants");
            let sweaterContent = document.getElementById("products-body-carts-sweater");

            let shirtsArray = []
            let pantsArray = []
            let sweatersArray = []

            if (products != null) {
                for (const key in products) {
                    const product = products[key]

                    if (product.category == 1) {
                        shirtsArray.push(buildProduct(product.title, product.description, product.imageUrl, product.price, product.category, key))
                    } else if (product.category == 2) {
                        pantsArray.push(buildProduct(product.title, product.description, product.imageUrl, product.price, product.category, key))
                    } else if (product.category == 3) {
                        sweatersArray.push(buildProduct(product.title, product.description, product.imageUrl, product.price, product.category, key))
                    }
                }

                if (shirtsArray.length != 0) {
                    let messageEmpty = document.getElementById('message-empty-products-shirts')
                    if (messageEmpty) {
                        messageEmpty.style.setProperty('visibility', 'hidden');
                    }

                    shirtsArray.forEach(product =>
                        shirtsContent.appendChild(buildCardMain(product.title, product.description, product.imageUrl, product.price, product.category, product.productId))

                    );

                } else {
                    shirtsContent.appendChild(emptyProductShirts);
                }

                if (pantsArray.length != 0) {
                    let messageEmpty = document.getElementById('message-empty-products-shirts')
                    if (messageEmpty) {
                        messageEmpty.style.setProperty('visibility', 'hidden');
                    }
                } else {
                    pantsContent.appendChild(emptyProductsPants);
                }

                if (sweatersArray.length != 0) {
                    let messageEmpty = document.getElementById('message-empty-products-shirts')
                    if (messageEmpty) {
                        messageEmpty.style.setProperty('visibility', 'hidden');
                    }
                } else {
                    sweaterContent.appendChild(emptyProductsSweater);
                }

            } else {
                shirtsContent.appendChild(emptyProductShirts);
                pantsContent.appendChild(emptyProductsPants);
                sweaterContent.appendChild(emptyProductsSweater);
            }
        })
}
