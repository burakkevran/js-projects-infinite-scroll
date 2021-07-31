const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
//Unsplash API
const photoCount = 10;
const apiKey ='hO7L999mvdfFFx7PWfwxaRHgEmTS5JPsG65N70_unzM';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`;
let canFetchMorePhotos = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded ++;
    console.log('loaded: ' + imagesLoaded + ' images');
    if(imagesLoaded === totalImages){
        canFetchMorePhotos = true;
        imagesLoaded = 0;
        loader.hidden = true;
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Create Elements for Links and Photos and Add to DOM
function displayPhotos() {
    
    photosArray.forEach((photo) => {
        
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        const image = document.createElement('img');

        setAttributes(image, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        image.addEventListener('load', imageLoaded);
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        totalImages = photosArray.length;
        displayPhotos();
        
    } catch (error) {
        
    }
}

//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
    if(canFetchMorePhotos && (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000)){
        getPhotos();
        canFetchMorePhotos= false; 
    }
});

//On Load
getPhotos();