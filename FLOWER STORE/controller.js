import { getFlowers } from "./api.js";
import cartOperations from "./cart-service.js";

window.addEventListener('DOMContentLoaded', displayFlowers);

async function displayFlowers(){
    
    document.querySelector('#message').innerText = 'Loading';
    
    try{
    const response = await getFlowers();
    const obj = await response.json();

    document.querySelector('#message').innerText = '';

    console.log('Data is :',  obj['flowerlist']);
    printFlowers(obj['flowerlist']);
   
    }catch(err){
        throw err;
    }


    // promise.then(function(response){
    //     document.querySelector('#message').innerText = '';
    //     const p = response.json();
    //     p.then(function(obj){
    //         console.log('Data is :',  obj['flowerlist']);
    //         printFlowers(obj['flowerlist']);

    //     }).catch(function(err){
    //        console.log( 'INVALID JSON', err);
    //     })


    // }).catch(function(e){
    //     document.querySelector('#message').innerText = 'ERROR IN SERVER NO FLOWERS FETCHED';
    // })
}

function printFlowers(flowers){

  cartOperations.flowers = flowers;
//   var allHtml;
  for(let flower of flowers){
    console.log(flower,flowers);
    // allHtml+= createFlowerCard(flower);
    createFlowerCard(flower);
  }
//   document.querySelector('#flowers').innerHTML = allHtml;
}

function addToCart(){

    const flowerId = this.getAttribute('flower-id');
    cartOperations.addToCart(flowerId);
    console.log('ADD TO CART', flowerId);

    printCart();
}

function printCart(){
   const flowersInCart = cartOperations.viewAll();

   if(flowersInCart==0){
    const btn = document.querySelector(".pay");
    btn.disabled = true;
   }

   document.querySelector(".cart").innerHTML ='';
   flowersInCart.forEach(flower => printCartItem(flower));
   
   totalBill(flowersInCart);

}

function printCartItem(flower){
 

  const cartItem = document.createElement('div');
  cartItem.setAttribute('flower-id',flower.productId);

  const p = document.createElement('p');
  p.innerText = flower.name +" $"+ flower.price;

  const add = document.createElement('button');
  add.className = 'btn btn-secondary';
  add.innerText = '+';
  add.style.margin = '10px';
  add.setAttribute('flower-id',flower.productId);


  const sub = document.createElement('button');
  sub.className = 'btn btn-secondary';
  sub.innerText = '-';
  sub.style.margin = '10px';
  sub.setAttribute('flower-id',flower.productId);


  const remove = document.createElement('button');
  remove.className = 'btn btn-primary';
  remove.innerText = 'remove';
  remove.setAttribute('flower-id', flower.productId);
  remove.addEventListener('click', removeCartItem);


  const cart = document.querySelector('.cart');

  cart.appendChild(cartItem);

  cartItem.appendChild(p);
  cartItem.appendChild(add);
  cartItem.appendChild(sub);
  cartItem.appendChild(remove);

  
}

function removeCartItem(){
  const id = this.getAttribute('flower-id');
  cartOperations.removeFromCart(id);

  printCart();
  console.log('remove');
}


function totalBill(flowers){
  const total = flowers.reduce((acc,flower)=> acc+ parseFloat(flower.price),0).toFixed(2);

  document.querySelector(".total").innerHTML = '';

  const p = document.createElement('p');
  p.innerText = "TOTAL BILL: " + total;
  
  document.querySelector(".total").appendChild(p);
}

function createFlowerCard(singleFlower){
     
    // const html = `<div>
    // <img src = "${singleFlower.photo}"
    // <br>
    // <p>${singleFlower.name}</p>
    // <p>${singleFlower.instructions}</p>
    // <p>${singleFlower.price}</p>
    // </div>`
    // return html;

    const mainDiv = document.getElementById('flowers');

    const divTag = document.createElement('div');
    divTag.className = 'card';
    divTag.style.width = '16rem';
    divTag.style.margin = '20px';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = singleFlower.name;

    const imgTag = document.createElement('img');
    imgTag.src = singleFlower.photo;
    imgTag.className = 'card-body-top';
    
    // const p = document.createElement('p');
    // p.className = 'card-text';
    // p.innerText = singleFlower.name;

    const p2 = document.createElement('p');
    p2.className = 'card-text';
    p2.innerText = singleFlower.instructions ;

    const p3 = document.createElement('p');
    p3.className = 'card-text';
    p3.innerText =  singleFlower.price;

    const btn = document.createElement('button');
    btn.className = 'btn-btn-primary';
    btn.innerText = 'ADD TO CART';
    btn.setAttribute('flower-id', singleFlower.productId)
    console.log(singleFlower.productId);
    btn.addEventListener('click', addToCart);

    cardBody.appendChild(h5);
    cardBody.appendChild(imgTag);
    // cardBody.appendChild(p);
    cardBody.appendChild(p2);
    cardBody.appendChild(p3);
    cardBody.appendChild(btn);

    mainDiv.appendChild(divTag);
    divTag.appendChild(cardBody);
}
