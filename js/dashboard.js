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
    cardContainer.style.setProperty('width','15rem')


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

    cardContainer.addEventListener('click',()=>{
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

function setFielsModal(product){
    document.getElementById('exampleInputEmail1').value = product.title
}