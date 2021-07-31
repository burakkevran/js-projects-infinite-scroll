const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
//Unsplash API
const photoCount = 10;
const apiKey ='hO7L999mvdfFFx7PWfwxaRHgEmTS5JPsG65N70_unzM';
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${photoCount}`;

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

        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        
    }
}

//On Load
getPhotos();