"use strict";
//const fetch = require("node-fetch");
console.log("JS Sablonas");


const MY_API_KEY = 'f1821935193ec718c8a65eaac9b16cfb';



//--------------------------------------------------------------------------------------------------------
function myFunction3(server, id, secret, title, owner) {
    var h = document.getElementById("empty");
      h.insertAdjacentHTML("afterend", 
      `			
      
            <div class="img_div shadow">
                <img class="image__img" src="https://live.staticflickr.com/${server}/${id}_${secret}.jpg" alt="">
                
                <div class="image__overlay flex-opt">
                    <div class="image__title">${title}</div>
                    <div class="image__author">${owner}</div>
                    <button class="image__favorite fav_button">Favorite</button>
                </div>
            </div>
        `);
  }

let page = 1;

function callFlickr() {
for (let i = 1; i <= page; i++) {
    //Getting the list info page by page         //how many items to take from list, max is 100 from one page
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=f1821935193ec718c8a65eaac9b16cfb&extras=owner_name&per_page=100&page=${i}&format=json&nojsoncallback=1`)
        .then((response) => {
            //console.log('Resolved', response);
            return response.json();
            }).then((data) => {

                for (let j = 0; j < 100; j++) {
       
                  const { id, ownername, title, secret, server} = data.photos.photo[j];
                  listMembers(id, ownername, title, secret, server);
                }
        
            }).catch((err) => {
                console.log('Rejected', err);
            });
    
        function listMembers(id, ownername, title, secret, server) {
            var h = document.getElementById("empty");
            h.insertAdjacentHTML("afterend", 
            `	
                  <div class="img_div shadow">
                      <img class="image__img" src="https://live.staticflickr.com/${server}/${id}_${secret}.jpg" alt="">
                      
                      <div class="image__overlay flex-opt">
                          <div class="image__title">${title}</div>
                          <div class="image__author">${ownername}</div>
                          <button class="image__favorite fav_button">Favorite</button>
                      </div>
                  </div>
              `);
        }
    
    }
    page++;
}

callFlickr();


window.addEventListener('scroll',() => {
    if ((window.scrollY+20) + (window.innerHeight) >= document.documentElement.scrollHeight) {
        setTimeout(() => {
            callFlickr();
        }, 2000);
    }
});


console.log('page number = ', page);



