'use strict'

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const cartItems = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const buyNowBtn = document.getElementById('buy-now');

window.addEventListener('load', () => {
    updateCartDisplay();
});

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const productName = btn.getAttribute('data-name');
        const productPrice = parseFloat(btn.getAttribute('data-price'));

        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity += 1;
        }
        else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            })
        }

        totalPrice += productPrice;

        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice.toFixed(2));

        updateCartDisplay();
    })
});

const updateCartDisplay = () => {
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);

    const removeBtns = document.querySelectorAll('.remove-item');
    removeBtns.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            const index = removeBtn.getAttribute('data-index');
            removeCartItem(index);
        })
    })
};

const removeCartItem = (index) => {
    const item = cart[index];
    totalPrice -= item.price * item.quantity;

    cart.splice(index, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    updateCartDisplay();
};

buyNowBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Thank you for your purchase!');

        cart = [];
        totalPrice = 0;

        localStorage.removeItem('cart');
        localStorage.removeItem('totalPrice');

        updateCartDisplay();
    }
    else {
        alert('Your cart is empty!');
    }
});