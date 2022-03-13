window.onload = function (){
    getAllProducts()
}

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
    cardContainer.href = `/details.html?productId=${productId}`;

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
        setFielsModal(product);
    });

    return cardCol;
};

let mainContent = document.getElementById("dashboard-products-body-carts");

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
            return res.json();
        }).then((data) => {
            console.log("Datos de respuesta", data);
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

            spanSuccess.innerText = `The product has been successfully updated`;

            alertSuccess.classList.add("alert", "alert-success");
            iconSuccess.classList.add("fas", "fa-check-circle");

            mainContent.appendChild(alertSuccess)
            alertSuccess.appendChild(iconSuccess);
            alertSuccess.appendChild(spanSuccess);

        } else {
            let alertError = document.createElement("div");
            let iconError = document.createElement("i");
            let spanError = document.createElement("span");

            spanError.innerText = `The product could not be updated, please try again later`;

            alertError.classList.add("alert", "alert-Error");
            iconError.classList.add("fas", "fa-exclamation-circle");

            mainContent.appendChild(alertError)
            alertError.appendChild(iconError);
            alertError.appendChild(spanError);
        }
    });
};

function setFielsModal(product) {
    console.log(product)
    document.getElementById('exampleInputEmailEdit').value = product.title
}