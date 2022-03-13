'use strict';
let arrayShoppingCart

window.onload = function () {
    initializeComponents()
    getAllProductsByCategory()
}

function initializeComponents() {
    arrayShoppingCart = []

    document.getElementById('shopping-cart-count').innerText = 0

    document.getElementById('nav-shopping-cart').addEventListener('click', () => {
        displayShoppinCart();
    });

    document.getElementById('shopping-cart-close').addEventListener('click', () => {
        hiddenShoppingCart();
    });
}

function displayShoppinCart() {
    let emptyProductCart = document.createElement("h1");
    emptyProductCart.id = "message-empty-shopping-cart-body";
    emptyProductCart.innerText = "Aun no has añadido productos"

    let shoppingCart = document.getElementById('aside-shopping-cart')
    let shoppingCartContent = document.getElementById('shopping-cart-body')

    let percentReduceScrean = window.screen.height * .2
    let screen = window.screen.height - percentReduceScrean

    shoppingCart.style.setProperty('height', `${screen}px`)
    shoppingCart.style.setProperty('visibility', 'visible');


    if (arrayShoppingCart.length != 0) {
        let messageEmpty = document.getElementById('message-empty-shopping-cart-body')
        if (messageEmpty) {
            messageEmpty.style.setProperty('visibility', 'hidden');
        }

        document.getElementById('shopping-cart-body').innerHTML = ""

        arrayShoppingCart.forEach(product =>
            shoppingCartContent.appendChild(buildCardShoppinCart(product.title, product.description, product.imageUrl, product.price, product.category, product.productId))
        );

    } else {
        if(!document.getElementById('message-empty-shopping-cart-body')){
        shoppingCartContent.appendChild(emptyProductCart);
        }
    }
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
        let counter = parseInt(document.getElementById('shopping-cart-count').textContent)
        counter++
        document.getElementById('shopping-cart-count').innerText = counter
        addProductCart(product);
    });

    return cardCol;
};

const buildCardShoppinCart = (title, description, photoUrl, price, category, productId) => {

    let cardCartItemContainer = document.createElement("div");
    let cardCartItem = document.createElement("div");

    let cardCartItemImg = document.createElement("div");
    let cartItemImg = document.createElement("img");

    let cardCartItemBody = document.createElement("div");
    let cartItemBodyRow = document.createElement("div");

    let cartItemBodyRowName = document.createElement("div");
    let cartItemBodyName = document.createElement("p");

    let cartItemBodyRowDescription = document.createElement("div");
    let cartItemBodyDescription = document.createElement("p");

    let cartItemBodyRowPrice = document.createElement("div");
    let cartItemBodyPrice = document.createElement("p");

    let cartItemBodyRowPriceNumber = document.createElement("div");
    let cartItemBodyPriceNumber = document.createElement("p");



    // Add classes to elements
    cardCartItemContainer.classList.add("shopping-cart-item", "col-12", "mx-3");
    cardCartItem.classList.add("row", "cart-item");
    cardCartItemImg.classList.add("col-4", "p-2")
    cardCartItemBody.classList.add("col-7", "p-2")
    cartItemBodyRow.classList.add("row")
    cartItemBodyRowName.classList.add("col-12")
    cartItemBodyRowDescription.classList.add("col-12")
    cartItemBodyRowPrice.classList.add("col-8")
    cartItemBodyRowPriceNumber.classList.add("col-4")


    //Add css
    //cardContainer.style.setProperty('width', '15rem')


    // Add values to the elements
    cartItemImg.src = photoUrl;
    cartItemBodyName.innerText = title;
    cartItemBodyDescription.innerText = description;
    cartItemBodyPrice.innerText = `Price:`;
    cartItemBodyPriceNumber.innerText = `$ ${price}`

    // Build structure
    cardCartItemContainer.appendChild(cardCartItem);

    cardCartItem.appendChild(cardCartItemImg);
    cardCartItemImg.appendChild(cartItemImg);

    cardCartItem.appendChild(cardCartItemBody);
    cardCartItemBody.appendChild(cartItemBodyRow);

    cartItemBodyRow.appendChild(cartItemBodyRowName);
    cartItemBodyRowName.appendChild(cartItemBodyName);

    cartItemBodyRow.appendChild(cartItemBodyRowDescription);
    cartItemBodyRowDescription.appendChild(cartItemBodyDescription);

    cartItemBodyRow.appendChild(cartItemBodyRowPrice);
    cartItemBodyRowPrice.appendChild(cartItemBodyPrice);

    cartItemBodyRow.appendChild(cartItemBodyRowPriceNumber);
    cartItemBodyRowPriceNumber.appendChild(cartItemBodyPriceNumber);


    return cardCartItemContainer;
};

function addProductCart(product) {
    arrayShoppingCart.push(product)
}

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
