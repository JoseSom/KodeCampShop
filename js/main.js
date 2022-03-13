'use strict';
document.cookie = `sessionLoginWorker=${false}`
let isValidUser = false
let pruebaVariable = 0
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

    document.getElementById('modal-body-content-user-config').style.setProperty('visibility', 'hidden');
}

function displayShoppinCart() {
    let emptyProductCart = document.createElement("h1");
    emptyProductCart.id = "message-empty-shopping-cart-body";
    emptyProductCart.innerText = "You have not added products yet"

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
        let totalBuy = 0.0

        arrayShoppingCart.forEach(product =>
            shoppingCartContent.appendChild(buildCardShoppinCart(product.title, product.description, product.imageUrl, product.price, product.category, product.productId))
        );

        arrayShoppingCart.forEach(product =>
            totalBuy += parseFloat(product.price)
        );

        document.getElementById('shopping-cart-total-number').innerText = totalBuy

    } else {
        if (!document.getElementById('message-empty-shopping-cart-body')) {
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
        let visibilityShoppingCart = window.getComputedStyle(document.getElementById('aside-shopping-cart')).getPropertyValue('visibility')
        counter++
        document.getElementById('shopping-cart-count').innerText = counter
        addProductCart(product);

        if (visibilityShoppingCart == 'visible') {
            hiddenShoppingCart();
            displayShoppinCart();
        }

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
            emptyProductShirts.innerText = "No products yet"

            let emptyProductsPants = document.createElement("h1");
            emptyProductsPants.id = "message-empty-products-pants";
            emptyProductsPants.innerText = "No products yet"

            let emptyProductsSweater = document.createElement("h1");
            emptyProductsSweater.id = "message-empty-products-sweater";
            emptyProductsSweater.innerText = "No products yet"

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

                    pantsArray.forEach(product =>
                        pantsContent.appendChild(buildCardMain(product.title, product.description, product.imageUrl, product.price, product.category, product.productId))
                    );
                } else {
                    pantsContent.appendChild(emptyProductsPants);
                }

                if (sweatersArray.length != 0) {
                    let messageEmpty = document.getElementById('message-empty-products-shirts')
                    if (messageEmpty) {
                        messageEmpty.style.setProperty('visibility', 'hidden');
                    }
                    sweatersArray.forEach(product =>
                        sweaterContent.appendChild(buildCardMain(product.title, product.description, product.imageUrl, product.price, product.category, product.productId))
                    );
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

/** CRUD USUARIOS */
let formSingupContent = document.getElementById('main-form-singup');
let formLoginContent = document.getElementById('main-form-login');
let usersArray = []

document.getElementById('form-btn-singup').addEventListener('click', () => {

    let name = document.getElementById('form-singup-fullname').value
    let email = document.getElementById('form-singup-email').value
    let password = document.getElementById('form-singup-password').value

    createUser(name, email, password);
});

document.getElementById('form-btn-login').addEventListener('click', () => {
    getAllUser();
    let isValidSessionUser = leerCookie("sessionLoginUser") === 'true'

    let email = document.getElementById('form-login-email').value
    let password = document.getElementById('form-login-password').value

    if (isValidSessionUser) {
        document.getElementById('modal-body-content').style.setProperty('visibility', 'hidden');
    }

    usersArray.forEach(user =>{
        console.log(user)
        if (user.email === email && user.password === password) {
            isValidUser = true
            document.cookie = `sessionLoginUser=${true}`

            document.getElementById('modal-body-content').style.setProperty('visibility', 'hidden');
            document.getElementById('modal-body-content-user-config').style.setProperty('visibility', 'visible');


            document.getElementById('edit-user-modal-id').value = user.id
            document.getElementById('edit-user-modal-name').value = user.name
            document.getElementById('edit-user-modal-password').value = user.password
            document.getElementById('edit-user-modal-url').value = user.photoUrl

            document.getElementById('modal-edit-user-save').addEventListener('click', () => {
            })

        } else {
            isValidUser = false
            document.cookie = `sessionLoginUser=${false}`
            document.getElementById('modal-body-content').style.setProperty('visibility', 'visible');
        }
    });

});

const createUser = (name, email, password) => {
    const url = "https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/users.json";

    const user = {
        name: name,
        email: email,
        password: password,
        typeUser: 0,
        photoUrl: ""
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.ok) {
                let alertSuccess = document.createElement("div");
                let iconSuccess = document.createElement("i");
                let spanSuccess = document.createElement("span");

                spanSuccess.innerText = `You have registered successfully`;

                alertSuccess.classList.add("alert", "alert-success");
                iconSuccess.classList.add("fas", "fa-check-circle");

                formSingupContent.appendChild(alertSuccess)
                alertSuccess.appendChild(iconSuccess);
                alertSuccess.appendChild(spanSuccess);

                setTimeout(function () {
                    location.reload();
                }, 2000);

            } else {
                let alertError = document.createElement("div");
                let iconError = document.createElement("i");
                let spanError = document.createElement("span");

                spanError.innerText = `We had problems with your registration, please try again later`;

                alertError.classList.add("alert", "alert-Error");
                iconError.classList.add("fas", "fa-exclamation-circle");

                formSingupContent.appendChild(alertError)
                alertError.appendChild(iconError);
                alertError.appendChild(spanError);

                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        })
};

const getAllUser = () => {
    const url = "https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/users.json";

    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((users) => {
            if (users != null) {
                for (const key in users) {
                    const user = users[key]
                    if (user.typeUser == 0) {
                        usersArray.push(buildUser(user.name, user.email, user.password, user.typeUser, user.photoUrl, key))
                    }
                }
            } else {
                let alertError = document.createElement("div");
                let iconError = document.createElement("i");
                let spanError = document.createElement("span");

                spanError.innerText = `User not found`;

                alertError.classList.add("alert", "alert-Error");
                iconError.classList.add("fas", "fa-exclamation-circle");

                formLoginContent.appendChild(alertError)
                alertError.appendChild(iconError);
                alertError.appendChild(spanError);

                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        })
}

const buildUser = (name, email, password, typeUser, photoUrl, userId) => {
    const objectUser = {
        name: name,
        email: email,
        password: password,
        typeUser: typeUser,
        photoUrl: photoUrl,
        id: userId
    };
    return objectUser
}


function leerCookie(nombre) {
    let micookie
    let lista = document.cookie.split(";");
    for (const i in lista) {
        let busca = lista[i].search(nombre);
        if (busca > -1) { micookie = lista[i] }
    }
    let igual = micookie.indexOf("=");
    let valor = micookie.substring(igual + 1);
    return valor;
}

const updateUser = (name, email, password, photoUrl, userId) => {
    const url = `https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/users/${userId}.json`;

    const objectUser = {
        name: name,
        email: email,
        password: password,
        typeUser: 0,
        photoUrl: photoUrl
    };

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objectUser),
    }).then((res) => {
        if (res.ok) {
            let alertSuccess = document.createElement("div");
            let iconSuccess = document.createElement("i");
            let spanSuccess = document.createElement("span");

            spanSuccess.innerText = `The product has been successfully updated`;

            alertSuccess.classList.add("alert", "alert-success");
            iconSuccess.classList.add("fas", "fa-check-circle");

            formEditUserContent.appendChild(alertSuccess)
            alertSuccess.appendChild(iconSuccess);
            alertSuccess.appendChild(spanSuccess);

            setTimeout(function () {
                location.reload();
            }, 2000);

        } else {
            let alertError = document.createElement("div");
            let iconError = document.createElement("i");
            let spanError = document.createElement("span");

            spanError.innerText = `The product could not be updated, please try again later`;

            alertError.classList.add("alert", "alert-Error");
            iconError.classList.add("fas", "fa-exclamation-circle");

            formEditUserContent.appendChild(alertError)
            alertError.appendChild(iconError);
            alertError.appendChild(spanError);

            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    });
};

const deleteProduct = (productId) => {
    const url = `https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/products/${productId}.json`;

    fetch(url, {
        method: "DELETE",
    }).then((res) => {
        if (res.ok) {
            let alertSuccess = document.createElement("div");
            let iconSuccess = document.createElement("i");
            let spanSuccess = document.createElement("span");

            spanSuccess.innerText = `The product has been removed successfully`;

            alertSuccess.classList.add("alert", "alert-success");
            iconSuccess.classList.add("fas", "fa-check-circle");

            formEditUserContent.appendChild(alertSuccess)
            alertSuccess.appendChild(iconSuccess);
            alertSuccess.appendChild(spanSuccess);

            setTimeout(function () {
                location.reload();
            }, 2000);

        } else {
            let alertError = document.createElement("div");
            let iconError = document.createElement("i");
            let spanError = document.createElement("span");

            spanError.innerText = `The product could not be removed, please try again later`;

            alertError.classList.add("alert", "alert-Error");
            iconError.classList.add("fas", "fa-exclamation-circle");

            formEditUserContent.appendChild(alertError)
            alertError.appendChild(iconError);
            alertError.appendChild(spanError);

            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    });
};