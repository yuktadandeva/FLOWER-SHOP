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
//   var allHtml;
  for(let flower of flowers){
    console.log(flower,flowers);
    // allHtml+= createFlowerCard(flower);
    createFlowerCard(flower);
  }
//   document.querySelector('#flowers').innerHTML = allHtml;
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
    divTag.style.width = '18rem';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = 'card-title';

    const imgTag = document.createElement('img');
    imgTag.src = singleFlower.photo;
    imgTag.className = 'card-body-top';
    
    const p = document.createElement('p');
    p.className = 'card-text';
    p.innerText = singleFlower.name;

    const p2 = document.createElement('p');
    p2.className = 'card-text';
    p2.innerText = singleFlower.instructions ;

    const p3 = document.createElement('p');
    p3.className = 'card-text';
    p3.innerText = singleFlower.price;

    cardBody.appendChild(h5);
    cardBody.appendChild(imgTag);
    cardBody.appendChild(p);
    cardBody.appendChild(p2);
    cardBody.appendChild(p3);

    mainDiv.appendChild(divTag);
    divTag.appendChild(cardBody);
}
