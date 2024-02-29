import { newGallery } from "./customGallery.js"



class Gallery {
    constructor(elem) {
        // Показывать ли навигацию
        this.showNav = true;
        // Показывать ли миниматюру
        this.showThumbnail = true;  
        // Показывать ли описание
        this.showDesc = true;

        elem.onclick = this.onClick.bind(this);
    }
    
    
    gallery(divElement) {
        newGallery(divElement, this.showNav, this.showThumbnail, this.showDesc);
    }
    
    onClick(event) {
        const divElement = event.target.closest('[data-action="gallery"]');// Реагирует только на элементы с data-action="gallery".
        this.gallery(divElement);
    }
}
new Gallery(gallery);


