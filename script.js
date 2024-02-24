import { imagepath } from "./content.js"
import { newGallery } from "./customGallery.js"


// Заполнение картинок
const imgElements = document.querySelectorAll('img');
imgElements.forEach((img, index) => {
    img.src = imagepath[index].path;
});

// Мудренный слушатель кликов по a, которые находятся в контейнере с id gallery
class Gallery {
    constructor(elem) {
        // Показывать ли навигацию
        this.showNav = true;
        // Показывать ли миниматюру
        this.showThumbnail = true;
        // Показывать ли описание
        this.showDesc = true;

        this.imagepath = imagepath;
        elem.onclick = this.onClick.bind(this);
    }
    
    // Реагирует только на элементы с data-action="gallery" 
    gallery(imgElement) {
        newGallery(imgElement, this.imagepath, this.showNav, this.showThumbnail, this.showDesc);
    }
    
    onClick(event) {
    
        let imgElement = event.target.closest('a').querySelector('img');
        this.gallery(imgElement);
    }
}
new Gallery(gallery, imagepath);

