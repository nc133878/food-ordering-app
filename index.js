import { menuArray } from './data.js'
const menuEl = document.getElementById("menu-el")
const checkoutEl = document.getElementById("checkout-el")
const modalEl = document.getElementById("modal-el")
const name = document.getElementById("name-el")
const cart = []

document.addEventListener('click', function(e){
    if(e.target.id === 'add-btn'){
         handleClickAddToCart(e.target.dataset.id, menuArray)
    }
    
    if(e.target.id === 'remove-btn'){
        handleClickRemove(e.target.dataset.id, cart)
    }
    
    if(e.target.id === 'checkout-btn'){
        handleClickCheckout()
    }
    
    if(e.target.id === 'pay-btn'){
        handleClickPay()
    }
   
})

function handleClickAddToCart(id, foodArray){
    cart.push(foodArray[id])
    render()
}

function handleClickRemove(indexToRemove, cartArray){
    cart.splice(indexToRemove, 1)
    render()
}

function handleClickCheckout(){
    modalEl.style.display = 'inline'
}

function handleClickPay(){
    const name = document.getElementById("name-el").value
    
    modalEl.style.display = 'none'
    checkoutEl.innerHTML = `        
            <div class="thanks-div">
                <h4 class="txt-cntr thanks-text">Thanks, ${name}! Your order is on its way!</h4>
            </div>`
}

function getCartHTML(cartArray){
    let cartHTML=``
    let total=0
    let removeCount=0
    
    if (cartArray.length) {
        cartHTML = `<h3 class="txt-cntr" id="order-section-margin">Your order</h3>`
        cartArray.forEach( (item) => {
            total += item.price
            cartHTML += `<div class="cart-item page-margin">
                    <div class="cart-desc"> 
                        <h3>${item.name}</h3>
                        <p class="remove-btn" id="remove-btn" data-id=${removeCount}>remove</p>
                        <h3 class="cost">$${item.price}</h3>
                    </div>
                </div> `
            removeCount+=1
        }  
       )
       
        cartHTML += `<hr>
                <div class="cart-desc"> 
                    <h3>Total price:</h3>
                    <h3 class="cost">$${total}</h3>
                </div>
                <button class="checkout-btn txt-cntr" id="checkout-btn">Complete order</button>`
    }
    
    return cartHTML
    
}



function getFoodHTML(foodArray){
    let foodHTML = ``

    foodArray.forEach( (item) => {
        foodHTML += `        
            <div class="food-item page-margin" id="food-el">
                <h1 class="food-pic">${item.emoji}</h1> 
                <div class="food-desc">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients}</p>
                    <h3>$${item.price}</h3>
                </div>
                <button class="plus-btn" id="add-btn" data-id="${item.id}">+</button>
            </div>`
        }
    )
    
    return foodHTML
}


function render(){
    menuEl.innerHTML = getFoodHTML(menuArray)
    checkoutEl.innerHTML = getCartHTML(cart)
}

render()
