const goTopButton = document.getElementById("goTop");
const goDownButton  =document.getElementById("gotocart")
const cartContainer = document.getElementsByClassName("addedItems");
const totalN = document.getElementById("sumN");
const displayN = document.getElementsByClassName("itemN");
const addedItemPart = document.getElementsByClassName('addeditemsConatainer')[0];

function goTop() {
  document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}

function goDown() {
document.body.scrollTop = 1750;
document.documentElement.scrollTop = 1750;
}

if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  const removeButton = document.getElementsByClassName("remove");
  for (let i  = 0; i < removeButton.length; i++) {
    const button  = removeButton[i];
    button.addEventListener("click",removeCartItem);
    }
  const inputs = document.getElementsByClassName("itemQuantity");
  for(let i  =0; i < inputs.length; i++) {
    const input = inputs[i];
    input.addEventListener("change",quantityChanged)
    } 
  const addtocartButton  = document.getElementsByClassName("to-cart");
  for (let i = 0; i < addtocartButton.length; i++) {
    const addtocart = addtocartButton[i];
    addtocart.addEventListener("click", addtoCartClicked);
  }
  const successPurchaseButton = document.getElementById("SuccessPurchase");
  successPurchaseButton.addEventListener("click", purchase);

  const clearButton = document.getElementById("removeAll");
  clearButton.addEventListener("click",clear);
}

function removeCartItem(event) {
  const removePart = event.target;
  removePart.parentElement.remove();
  updateTotal();
  //change item number display
  //change the innerText to string first
  const displayString1 = displayN[0].innerText.toString();
  const displayString2 = displayN[1].innerText.toString();
  // find number inside the string
  let d1 = displayString1.replace(/[^0-9]/g,""); // return number inside string
  let d2 = displayString2.replace(/[^0-9]/g,"");
  d1 -= 1;
  d2 -= 1;
  console.log(d1);
  displayN[0].innerText = "Added Items: " + d1;
  displayN[1].innerText = "Added Items: " + d2;
}

function quantityChanged(event) {
  const inputV = event.target;
  if (isNaN(inputV.value) || inputV.value < 1) {
    inputV.value = 1;
  }
  updateTotal();
}

function addtoCartClicked(event) {
  const clickedAddButton = event.target;
  const shopItemInfo = clickedAddButton.parentElement;
  const title = shopItemInfo.getElementsByClassName("item-title")[0].innerText;
  const price = shopItemInfo.getElementsByClassName("item-price")[0].innerText;
  const imgSrc = shopItemInfo.getElementsByClassName("item-img")[0].src;  
  addItemtoCart(title, price, imgSrc);
  updateTotal();
}

function addItemtoCart(title, price, imgSrc) {
  const addedItemField = document.getElementsByClassName("addeditemsConatainer")[0];
  const addedItemContainer = document.createElement("div");
  addedItemContainer.className = "addedItems";
  //change added items number text
  const cartitemName = document.getElementsByClassName("itemName");
    for (var i = 0; i < cartitemName.length; i++) {
    if (cartitemName[i].innerText === title) {
        alert('This item is already added to the cart')
        return
    }
  }
    displayN[0].innerText = "Added Items: " + (cartitemName.length + 1);
    displayN[1].innerText = "Added Items: " + (cartitemName.length + 1);

  const content = `
  <img src = '${imgSrc}' class = "cart-img"></img>
  <div class = "itemName">${title}</div>
  <div class = "itemPrice">${price}</div>
  <input type ="number" class = "itemQuantity" value = "1" min = "1"></input>
  <button class = "remove">Remove</button>
  `
  addedItemContainer.innerHTML = content;
  addedItemField.append(addedItemContainer);
  addedItemContainer.getElementsByClassName("remove")[0].addEventListener("click",removeCartItem);
  addedItemContainer.getElementsByClassName("itemQuantity")[0].addEventListener("change",quantityChanged);
}

function updateTotal() {
  var total = 0;
  for (let i = 0; i < cartContainer.length; i++) {
    const choose = cartContainer[i];
    const priceElement = choose.getElementsByClassName('itemPrice')[0];
    const quantityElement = choose.getElementsByClassName('itemQuantity')[0];
    const price = parseFloat(priceElement.innerText.replace("$",""));
    const quantity = quantityElement.value;
    total += (price * quantity);
  }
  total = Math.round(total * 100) / 100;
  totalN.innerText = "Total $" + total;
}

function purchase() {
  // looping through the whole ocntainer and keep deleting things inside
  if (addedItemPart.hasChildNodes()) {
    while(addedItemPart.hasChildNodes()) {
      addedItemPart.removeChild(addedItemPart.firstChild);
    }
  } else {
    alert("Sorry, it seems like you haven't added anything!")
    return;
  }
  //display random texts
  const thanksWordsArray = ["Thanks for your purchase!", "Thanks, waiting for your next coming!",
  "Thanks, anything lefts?"]
  function generateNumber(array) {
    return array[Math.floor(Math.random() * 3)];
  }
  alert(generateNumber(thanksWordsArray));

  displayN[0].innerText = "Added Items: 0";
  displayN[1].innerText = "Added Items: 0";
  updateTotal();
  
}

function clear() {
  if (addedItemPart.hasChildNodes()) {
    while(addedItemPart.hasChildNodes()) {
      addedItemPart.removeChild(addedItemPart.firstChild);
    }
  } else {
    alert("The cart is already empty!")
    return
  }
}



