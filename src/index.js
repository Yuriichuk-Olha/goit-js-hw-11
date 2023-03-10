import './style.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import API from "./axiosImages.js";
//import axios from "axios";


const form = document.querySelector('.search-form')
const galleryRef = document.querySelector('.gallery')
const lordMoreButton = document.querySelector('.load-more')



let gallerySimple = new SimpleLightbox('.gallery a')
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
    console.log(hits.totalHits);
    
    if(hits.hits.length === 0){
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    hideLordMoreBtn();
    return;
    } 

     if(hits.hits.length < 40) {
        hideLordMoreBtn();
        createMarkup(hits);
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")   
       return
    
    }

     if (hits.hits.length){
        createMarkup(hits);
        Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`);
        showLordMoreBtn();
        gallerySimple.refresh();
        
    }; 
  
});   
};

function onLordMore(event){
    event.preventDefault();
    queryPage += 1;

    API.axiosImages(inputForm, queryPage).then((hits) => {
        console.log(hits.hits.length);

        if(hits.hits.length === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        hideLordMoreBtn();
        return
        }

          else if (hits.hits.length < 40) {
            createMarkup(hits);
            hideLordMoreBtn();
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")

        }

        else if(hits.hits.length) {
            createMarkup(hits);
            showLordMoreBtn();
            gallerySimple.refresh();
        
        };
      
    
    });
};


function hideLordMoreBtn(){
    lordMoreButton.style.display = 'none';
};
function showLordMoreBtn(){
    lordMoreButton.style.display = 'block';
};

//     if (queryPage >= Math.ceil(hits.totalHits/40)) {


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
    hideLordMoreBtn();

};


