import './style.css';
import SimpleLightbox from "simplelightbox";
import Notiflix from "notiflix";
import axios from "axios";
import API from "./axiosImages.js";

import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.search-form')
const inputRef = document.querySelector('.search-form-input')
const buttonForm = document.querySelector('button[type="submit"]')
const galleryRef = document.querySelector('.gallery')
const lordMoreButton = document.querySelector('.load-more')


let gallerySimple = new SimpleLightbox('gallery a')
let queryPage = 1;
let inputForm = "";

lordMoreButton.style.display = 'none';
form.addEventListener('submit', onFormSubmit)



function onFormSubmit(event){
    event.preventDefault();
    
    inputForm = event.target.searchQuery.value.trim();
    if(!inputForm){
        return
    };

    clear();

API.axiosImages(inputForm, queryPage).then(hits => {
    console.log(hits);
   
    if(hits.length === 0 ){
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    else if (!hits.totalHits) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        lordMoreButton.style.display = 'none';
    }

    else {
        Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`)
        createMarkup(hits)
        lordMoreButton.style.display = 'block';
        gallerySimple.refresh();
    }
})   
};



lordMoreButton.addEventListener('click', onLordMore)

function onLordMore(event){
  
    event.preventDefault();
    queryPage += 1 
 
    API.axiosImages(inputForm, queryPage).then(hits => {
    console.log(hits);
        if(hits.length === 0){
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
        else if (!hits.totalHits) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
            lordMoreButton.style.display = 'none';
        }
        else  {
            Notiflix.Notify.info(`Hooray! We found ${hits.totalHits} images.`)
            createMarkup(hits)
            gallerySimple.refresh();
            lordMoreButton.style.display = 'block';
        }
    })
};

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
    lordMoreButton.style.display = 'none';
};





//1. створити ф-ю щоб неподвоювалася і визивати її у lordMoreButton,