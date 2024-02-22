const newGallery = (target, images, showNav) => {
    
    
    // Создаём нужный холдер картинки
    const imgblock = document.querySelector("#customGallery");
    imgblock.style.transition = "opacity 0.5s ease-in-out";
    imgblock.style.opacity = "1";
    imgblock.style.position = "fixed";
    imgblock.style.top = "0";
    imgblock.style.left = "0";
    imgblock.style.background = "rgba(0,0,0,.9)";
    imgblock.style.height = "100%";
    imgblock.style.width = "100%"; 
    imgblock.style.display = "flex"; 
    imgblock.style['justify-content'] = "center";
    imgblock.style['align-items'] = "center";

    // Получаем индекс нажатой картинки
    const targetSrcWithoutDomain = target.src.replace(/^(https?:)?\/\/[^/]+/, '');
    let index = images.findIndex(image => image  === targetSrcWithoutDomain);

    // Создаём нужную картинку
    const template = `
        <span id="exit" style="position: absolute; top: 0%; right: 0; margin-right: 30px; font-size: 60px; font-weight: bolder; color: #fff; cursor: pointer; user-select: none;">&times;</span>
        <span id="prev" style="position: relative; margin-right: 20px; font-size: 100px; font-weight: bolder; color: #fff; cursor: pointer; user-select: none;">&lt;</span>
        <img src="${images[index]}" style="position: relative; border: 3px solid rgb(206, 205, 205); border-radius: 5px; width: 80vh; object-fit: cover;"/>
        <span id="next" style="position: relative;  margin-left: 20px;font-size: 100px; font-weight: bolder; color: #fff; cursor: pointer; user-select: none;">&gt;</span>
    `;

    imgblock.innerHTML = template;

    // Отключение навигации
    if (showNav === false) {
        imgblock.querySelector("span").style.display = "none";
        imgblock.querySelector("#prev").style.display = "none";
        imgblock.querySelector("#next").style.display = "none";
    }
     
    // Закрытие на крестик + закрытие на Esc
    imgblock.querySelector("span").onclick = () => {
        imgblock.style = "opacity: 0";
        imgblock.innerHTML = ``;
        
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            imgblock.style = "opacity: 0";
            imgblock.innerHTML = ``;
        }
    });

    // Обработчики переключения
    imgblock.querySelector("#next").onclick = () => {
        index = (index + 1) % images.length;
        updateImage();
    }

    imgblock.querySelector("#prev").onclick = () => {
        index = (index - 1 + images.length) % images.length;
        updateImage();
    }

    function updateImage() {
        const imageElement = imgblock.querySelector("img");
        imageElement.src = images[index];
    }
    
    
}
export { newGallery }