import './style.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import API from "./axiosImages.js";
//import axios from "axios";


const form = document.querySelector('.search-form')
const galleryRef = document.querySelector('.gallery')
const lordMoreButton = document.querySelector('.load-more')



let gallerySimple = new SimpleLightbox('gallery a')
let queryPage = 1;
let inputForm = "";
hideLordMoreBtn()

form.addEventListener('submit', onFormSubmit)
lordMoreButton.addEventListener('click', onLordMore)

function onFormSubmit(event){
    event.preventDefault();
    inputForm = event.target.searchQuery.value.trim();
    if(!inputForm){
        return
    };
    clear();

API.axiosImages(inputForm, queryPage).then((hits) => {
    console.log(hits.hits.length);
    
    if(hits.hits.length === 0){
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    hideLordMoreBtn()
    }  

    else if(hits.hits.length > 40) {
        hideLordMoreBtn()
        createMarkup(hits)
      
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")   
    }

  else  if (hits){
        createMarkup(hits)
        Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`)
        showLordMoreBtn()
        gallerySimple.refresh();
    } 
  
})   
};

function onLordMore(event){
    event.preventDefault();
    queryPage += 1 

    API.axiosImages(inputForm, queryPage).then((hits) => {
        console.log(hits.hits.length);

        if(hits.hits.length === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        hideLordMoreBtn()
        }
        if(hits.hits) {
            createMarkup(hits) 
            showLordMoreBtn()
            gallerySimple.refresh();
        } 
        else if (hits.hits.length < 40) {
            createMarkup(hits)
            hideLordMoreBtn()
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
            }
    })
};


function hideLordMoreBtn(){
    lordMoreButton.style.display = 'none';
};
function showLordMoreBtn(){
    lordMoreButton.style.display = 'block';
};


//  
// function hideTotalHits(hits){
//     if (hits.hits.length >= Math.ceil(hits.totalHits/40)) {
//             createMarkup(hits)
//             hideLordMoreBtn()
//             Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
//         }
// }



function createMarkup({hits}){
    const markup = hits.map(hit => {
return `<div class="photo-card">
<a href="${hit.largeImageURL}"><img src="${hit.webformatURL}" alt="${hit.tags}" width="300" loading="lazy" /></a>
<div class="info">
    <p class="info-item">
    <b>Likes: ${hit.likes}</b>
    </p>
    <p class="info-item">
    <b>Views: ${hit.views}</b>
    </p>
    <p class="info-item">
    <b>Comments: ${hit.comments}</b>
    </p>
    <p class="info-item">
    <b>Downloads: ${hit.downloads}</b>
    </p>
</div>
</div>`
    }).join('')
    galleryRef.insertAdjacentHTML('beforeend', markup) ;
};

function clear(){
    galleryRef.innerHTML = "";
    queryPage = 1;
    hideLordMoreBtn()
   
};











// function onFormSubmit(event){
//     event.preventDefault();
//    // lordMoreButton.style.display = 'none';
//     inputForm = event.target.searchQuery.value.trim();
//     if(!inputForm){
//         return
//     };

//     clear();

// API.axiosImages(inputForm, queryPage).then(hits => {
//   //  console.log();

//     if(hits.totalHits === 0){
//         console.log(hits.totalHits);
        
//     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//     hideLordMoreBtn()
//     }
//     else if (hits.totalHits <= 40) {
//         // lordMoreButton = disabled
//      //   lordMoreButton.style.display = 'none';
//         Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
//         hideLordMoreBtn()
//     }

//     else {
//         Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`)
//         }
//         createMarkup(hits)
//         showLordMoreBtn()
//       //  lordMoreButton.style.display = 'block';
//         gallerySimple.refresh();

    
// })   
// };

// lordMoreButton.addEventListener('click', onLordMore)

// function onLordMore(event){

//     event.preventDefault();
//     queryPage += 1 

//     API.axiosImages(inputForm, queryPage).then(hits => {
//     console.log(hits);
//         if(hits.totalHits === 0){
//         Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
//         hideLordMoreBtn()
//         }
//         else if (hits.totalHits<=40) {
//             Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
//             hideLordMoreBtn()

//         }
//         else  {
//             Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`)
//             createMarkup(hits)
//             gallerySimple.refresh();
//             showLordMoreBtn()
//            // lordMoreButton.style.display = 'block';
//         }
//     })
// };
