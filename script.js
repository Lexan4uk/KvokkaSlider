import { imagepath } from "./content.js"
import { newGallery } from "./customGallery.js"


// Находим элемент img по его id
document.getElementById('first-img').src = imagepath[0];
document.getElementById('second-img').src = imagepath[1];
document.getElementById('third-img').src = imagepath[2];
document.getElementById('fourth-img').src = imagepath[3];
document.getElementById('fifth-img').src = imagepath[4];
document.getElementById('sixth-img').src = imagepath[5];

// Мудренный слушатель кликов по a, которые находятся в контейнере с id gallery
class Gallery {
    constructor(elem) {
        // Показывать ли навигацию
        this.showNav = true;

        this.imagepath = imagepath;
        elem.onclick = this.onClick.bind(this); // (*)
    }
    
    // Реагирует только на элементы с data-action="gallery" 
    gallery(imgElement) {
        newGallery(imgElement, this.imagepath, this.showNav);
    }
    
    onClick(event) {
        let imgElement = event.target.closest('a').querySelector('img');
        this.gallery(imgElement);
    }
}
new Gallery(gallery, imagepath);

