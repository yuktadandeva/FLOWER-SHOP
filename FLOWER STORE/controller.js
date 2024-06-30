import { getFlowers } from "./api.js";

window.addEventListener('load', displayFlowers);

function displayFlowers(){
    
    document.querySelector('#message').innerText = 'Loading';

    const promise = getFlowers();

    promise.then(function(response){
        document.querySelector('#message').innerText = '';
        const p = response.json();
        p.then(function(obj){
            console.log('Data is :',  obj['flowerlist']);
            printFlowers(obj['flowerlist']);

        }).catch(function(err){
           console.log( 'INVALID JSON', err);
        })


    }).catch(function(e){
        document.querySelector('#message').innerText = 'ERROR IN SERVER NO FLOWERS FETCHED';
    })
}

function printFlowers(flowers){
  var allHtml;
  for(let flower of flowers){
    console.log(flower,flowers);
    allHtml+= createFlowerCard(flower);
  }
  document.querySelector('#flowers').innerHTML = allHtml;
}

function createFlowerCard(singleFlower){
     
    var html = `<div>
    <img src = "${singleFlower.photo}"
    <br>
    <p>${singleFlower.name}</p>
    <p>${singleFlower.instructions}</p>
    <p>${singleFlower.price}</p>
    </div>`

    return html;
}