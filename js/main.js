'use strict';

window.onload = function (){
    initializeComponents()
}

function initializeComponents(){
    document.getElementById('nav-shopping-cart').addEventListener('click',()=>{
        displayShoppinCart();
    });

    document.getElementById('shopping-cart-close').addEventListener('click',() =>{
        hiddenShoppingCart();
    });
}

function displayShoppinCart(){
    let shoppingCart = document.getElementById('aside-shopping-cart')
    let percentReduceScrean = window.screen.height * .2
    let screen = window.screen.height - percentReduceScrean
    shoppingCart.style.setProperty('height',  `${screen}px`)
    shoppingCart.style.setProperty('visibility','visible');
}


function hiddenShoppingCart(){
    let shoppingCart = document.getElementById('aside-shopping-cart')
    shoppingCart.style.setProperty('visibility','hidden');
}