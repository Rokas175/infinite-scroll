"use strict";
//const fetch = require("node-fetch");



const MY_API_KEY = 'f1821935193ec718c8a65eaac9b16cfb';



//--------------------------------------------------------------------------------------------------------


let page = 1;
let pageNr = 1;
function callFlickr() {
for (let i = pageNr; i <= page; i++) {
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
            const MyDiv = document.getElementById('MyDiv');

            const img_div_shadow = document.createElement('div');
            img_div_shadow.className = 'img_div shadow';
        
            const div1_image__overlay = document.createElement('div');
            div1_image__overlay.className = 'image__overlay flex-opt';
        
        
            const img_element = document.createElement('img');
            img_element.className = 'image__img';
            img_element.src = `https://live.staticflickr.com/${server}/${id}_${secret}.jpg`;
        
            const div2_title = document.createElement('div');
            div2_title.className = 'image__title';
            const div3_author = document.createElement('div');
            div3_author.className = 'image__author';
        
            const buttonElement = document.createElement('button');
            buttonElement.className = 'image__favorite fav_button';

            div2_title.textContent = `${title}`;
            div3_author.textContent = `${ownername}`;
            buttonElement.textContent = `Favorite`;
        
            MyDiv.append(img_div_shadow);
            img_div_shadow.appendChild(img_element);
        
            img_div_shadow.append(div1_image__overlay);
            div1_image__overlay.appendChild(div2_title);
            div1_image__overlay.appendChild(div3_author);
            div1_image__overlay.appendChild(buttonElement)
        }
    
    }
    page++;
    pageNr++
}

callFlickr();


window.addEventListener('scroll',() => {
    if ((window.scrollY+2000) + (window.innerHeight) >= document.documentElement.scrollHeight) {
        setTimeout(() => {
            callFlickr();
            console.log('page number = ', page);
        }, 1000);
    }
});


//console.log('page number = ', page);



