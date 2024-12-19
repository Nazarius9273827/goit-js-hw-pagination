const API_KEY = '47475037-a019c47be6692940311d6755b';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_GALLERY = document.getElementById('image-gallery');
const LOAD_MORE_BTN = document.getElementById('load-more');

let currentPage = 1;

async function fetchImages(page) {
    try {
        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&editors_choice=true&image_type=photo&per_page=9&page=${page}`
        );
        const data = await response.json();
        return data.hits;
    } catch (error) {
        console.error('Помилка завантаження даних:', error);
    }
}

function displayImages(images) {
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        IMAGE_GALLERY.appendChild(imgElement);
    });
}

LOAD_MORE_BTN.addEventListener('click', async () => {
    currentPage++;
    const images = await fetchImages(currentPage);
    displayImages(images);
});

(async function init() {
    const images = await fetchImages(currentPage);
    displayImages(images);
})();
