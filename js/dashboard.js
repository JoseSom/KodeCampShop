window.onload = function () {
    let isSessionStart = leerCookie("sessionLoginWorker") === 'true'
    if (!isSessionStart) {
        window.location.href = `/login.html`
    } else {
        getAllProducts()
    }
}

function leerCookie(nombre) {
    let lista = document.cookie.split(";");
    for (i in lista) {
        let busca = lista[i].search(nombre);
        if (busca > -1) { micookie = lista[i] }
    }
    let igual = micookie.indexOf("=");
    let valor = micookie.substring(igual + 1);
    return valor;
}

/** CRUD PRODUCTOS */
const buildCard = (title, description, photoUrl, price, category, productId) => {

    let cardCol = document.createElement("div");
    let cardContainer = document.createElement("div");
    let cardImage = document.createElement("img");
    let cardBody = document.createElement("div");
    let cardTitle = document.createElement("h5");
    let cardTextDescription = document.createElement("p");
    let cardTextPrice = document.createElement("p");


    // Add classes to elements
    cardCol.classList.add("col-3");
    cardContainer.classList.add("dashboard-card");
    cardImage.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTextDescription.classList.add("card-text");
    cardTextPrice.classList.add("card-text");

    //Add css
    cardContainer.style.setProperty('width', '15rem')


    // Add values to the elements
    cardImage.src = photoUrl;
    cardTitle.innerText = title;
    cardTextDescription.innerText = description;
    cardTextPrice.innerText = `Price: $ ${price}`;
    //cardContainer.href = `/details.html?productId=${productId}`;

    // Build structure
    cardCol.appendChild(cardContainer);

    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardBody);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardTextDescription);
    cardBody.appendChild(cardTextPrice);

    const product = {
        title: title,
        description: description,
        price: price,
        imageUrl: photoUrl,
        category: category
    };

    cardContainer.addEventListener('click', () => {
        let myModal = new bootstrap.Modal(document.getElementById('dashboard-modal-edit-product'))
        myModal.show()
        setFielsModal(product, productId);
    });

    return cardCol;
};

let mainContent = document.getElementById("dashboard-products-body-carts");
let formEditContent = document.getElementById('edit-product-form');
let formAddContent = document.getElementById('add-product-form');
let formEditUserContent = document.getElementById('modal-body-content-user-config');

document.getElementById('modal-add-product-save').addEventListener('click', () => {

    let title = document.getElementById('add-product-modal-title').value
    let description = document.getElementById('add-product-modal-description').value
    let price = document.getElementById('add-product-modal-price').value
    let photoUrl = document.getElementById('add-product-modal-url').value
    let category = document.getElementById('add-product-modal-category').value

    createProduct(title, description, price, photoUrl, category);

})


document.getElementById('modal-edit-product-save').addEventListener('click', () => {

    let productId = document.getElementById('edit-product-modal-id').value
    let title = document.getElementById('edit-product-modal-title').value
    let description = document.getElementById('edit-product-modal-title-description').value
    let price = document.getElementById('edit-product-modal-price').value
    let photoUrl = document.getElementById('edit-product-modal-url').value
    let category = document.getElementById('edit-product-modal-category').value


    updateProduct(title, description, photoUrl, price, category, productId)

})

document.getElementById('modal-edit-product-delete').addEventListener('click', () => {

    let productId = document.getElementById('edit-product-modal-id').value

    deleteProduct(productId)

})

const createProduct = (title, description, price, imageUrl, category) => {
    const url = "https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/products.json";

    const product = {
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        category: category
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => {
            if (res.ok) {
                let alertSuccess = document.createElement("div");
                let iconSuccess = document.createElement("i");
                let spanSuccess = document.createElement("span");

                spanSuccess.innerText = `The product has been added successfully`;

                alertSuccess.classList.add("alert", "alert-success");
                iconSuccess.classList.add("fas", "fa-check-circle");

                formAddContent.appendChild(alertSuccess)
                alertSuccess.appendChild(iconSuccess);
                alertSuccess.appendChild(spanSuccess);

                setTimeout(function () {
                    location.reload();
                }, 2000);

            } else {
                let alertError = document.createElement("div");
                let iconError = document.createElement("i");
                let spanError = document.createElement("span");

                spanError.innerText = `The product could not be added, please try again later`;

                alertError.classList.add("alert", "alert-Error");
                iconError.classList.add("fas", "fa-exclamation-circle");

                formAddContent.appendChild(alertError)
                alertError.appendChild(iconError);
                alertError.appendChild(spanError);

                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
        })
};

const getProduct = (id) => {
    const url = `https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/products/${id}.json`;

    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((product) => {
            const card = buildCard(product.title, product.description, product.imageUrl, product.price, product.category, product.id);
            mainContent.appendChild(card);
        })
}

const getAllProducts = () => {
    const url = "https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/products.json";

    fetch(url)
        .then((res) => {
            return res.json()
        })
        .then((products) => {

            if (products != null) {
                let messageEmpty = document.getElementById('message-empty-products')
                if (messageEmpty) {
                    messageEmpty.style.setProperty('visibility', 'hidden');
                }
                for (const key in products) {
                    const product = products[key]
                    const card = buildCard(product.title, product.description, product.imageUrl, product.price, product.category, key)
                    mainContent.appendChild(card)
                }
            } else {
                let emptyProducts = document.createElement("h1");
                emptyProducts.id = "message-empty-products";
                emptyProducts.innerText = "Aun no se cuentan con productos"
                mainContent.appendChild(emptyProducts);
            }
        })
}

const updateProduct = (title, description, photoUrl, price, category, productId) => {
    const url = `https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/products/${productId}.json`;

    const product = {
        title: title,
        description: description,
        price: price,
        imageUrl: photoUrl,
        category: category
    };

    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    }).then((res) => {
        if (res.ok) {
            let alertSuccess = document.createElement("div");
            let iconSuccess = document.createElement("i");
            let spanSuccess = document.createElement("span");

            spanSuccess.innerText = `The user has been successfully updated`;

            alertSuccess.classList.add("alert", "alert-success");
            iconSuccess.classList.add("fas", "fa-check-circle");

            formEditContent.appendChild(alertSuccess)
            alertSuccess.appendChild(iconSuccess);
            alertSuccess.appendChild(spanSuccess);

            setTimeout(function () {
                location.reload();
            }, 2000);

        } else {
            let alertError = document.createElement("div");
            let iconError = document.createElement("i");
            let spanError = document.createElement("span");

            spanError.innerText = `The user could not be updated, please try again later`;

            alertError.classList.add("alert", "alert-Error");
            iconError.classList.add("fas", "fa-exclamation-circle");

            formEditContent.appendChild(alertError)
            alertError.appendChild(iconError);
            alertError.appendChild(spanError);

            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    });
};

const deleteProduct = (productId) => {
    const url = `https://kodecamp2022-ed27f-default-rtdb.firebaseio.com/user/${productId}.json`;

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

            formEditContent.appendChild(alertSuccess)
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

            formEditContent.appendChild(alertError)
            alertError.appendChild(iconError);
            alertError.appendChild(spanError);

            setTimeout(function () {
                location.reload();
            }, 2000);
        }
    });
};

function setFielsModal(product, key) {
    document.getElementById('edit-product-modal-id').value = key
    document.getElementById('edit-product-modal-title').value = product.title
    document.getElementById('edit-product-modal-title-description').value = product.description
    document.getElementById('edit-product-modal-price').value = product.price
    document.getElementById('edit-product-modal-url').value = product.imageUrl
    document.getElementById('edit-product-modal-category').value = product.category
}