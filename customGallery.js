const newGallery = (target, images, showNav, showThumbnail) => {
    
    let thumbnail = ``;
    let adjacentIndexes;
    let thumbImages = '';
    // Создаём нужный холдер картинки
    const imgblock = document.querySelector("#customGallery");
    imgblock.style.transition = "opacity 0.5s ease-in-out";
    imgblock.style.opacity = "1";
    imgblock.style.position = "fixed";
    imgblock.style.top = "0";
    imgblock.style.left = "0";
    imgblock.style.background = "rgba(20,20,20,1)";
    imgblock.style.height = "100%";
    imgblock.style.width = "100%"; 
    imgblock.style.display = "flex"; 
    imgblock.style["flex-direction"] = "column";
    imgblock.style["align-items"] = "center";
    imgblock.style["justify-content"] = "center";

    // Получаем индекс нажатой картинки
    const targetSrcWithoutDomain = target.src.replace(/^(https?:)?\/\/[^/]+/, '');
    let index = images.findIndex(image => image  === targetSrcWithoutDomain);

    // Создаём нужную картинку
    const template = `
        <div style="display:flex; align-items: center; position: relative;">
            <span id="exit" style="position: absolute; top: 0%; right: 0; margin-right: 20px; font-size: 3.125vw; font-weight: bolder; color: #fff; cursor: pointer; user-select: none;">&times;</span>
            <span id="prev" style="position: relative; margin-right: 20px; font-size: 5vw; font-weight: bolder; color: #fff; cursor: pointer; user-select: none;">&lt;</span>
            <div style="width: 60vw; height: 33.75vw; display: flex; justify-content: center; position: relative;">
                <img class="bigImg" src="${images[index]}" style="position: relative; border: 3px solid rgb(206, 205, 205); border-radius: 5px; object-fit: cover; width:auto; height: auto;"/>
            </div>
            <span id="next" style="position: relative;  margin-left: 20px; font-size: 5vw; font-weight: bolder; color: #fff; cursor: pointer; user-select: none;">&gt;</span>
        </div>
    `;

    imgblock.innerHTML = template;

    // Отключение навигации
    if (showNav === false) {
        imgblock.querySelector("span").style.display = "none";
        imgblock.querySelector("#prev").style.display = "none";
        imgblock.querySelector("#next").style.display = "none";
    }

    if (showThumbnail === true) {
        
        thumbnail = `
            <div style="margin-top: 20px; height: auto; display: flex; gap: 20px">
        `
        for (let i = 0; i < 5; i++) {
            thumbnail += `<img class="thumbImg" style="max-height: 200px; width:10vw; border: 3px solid rgb(206, 205, 205); border-radius: 5px; object-fit: cover;"/>`;
        }
        
        thumbnail += `
            </div>
        `;
        imgblock.innerHTML += thumbnail;
        thumbImages = document.querySelectorAll('.thumbImg');
        updateImage()
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            index = (index + 1) % images.length;
            updateImage();
        } else if (event.key === 'ArrowLeft') {
            index = (index - 1 + images.length) % images.length;
            updateImage();
        }
    });


    function updateImage() {
        const imageElement = imgblock.querySelector("img.bigImg");
        imageElement.src = images[index];

        try {
            // Перерисовка миниатюры
            if (window.innerWidth > 1100){
                adjacentIndexes = getAdjacentIndexes(index, images.length);
            }
            else {
                adjacentIndexes = getAdjacentIndexes(index, images.length - 2);
            }
            
            thumbImages.forEach((img, indexArr) => {
                const imageIndex = adjacentIndexes[indexArr];
                img.src = images[imageIndex];
                // Жирная рамка центральный картинки 
                if (imageIndex === index)
                {
                    img.style.border = "8px solid rgb(206, 205, 205)";
                }
            });
        }
        catch {}// Чтоб не засоряло лог ошибками, если миниатюра отключена
        
    }
    
    
}

// Индексы для прорисовки в миниатюре
function getAdjacentIndexes(selectedIndex, totalIndexes) {
    const result = [];
    
    for (let i = -2; i <= 2; i++) {
        let index = selectedIndex + i;
        
        if (index < 0) {
            index = totalIndexes + index;
        } else if (index >= totalIndexes) {
            index = index - totalIndexes;
        }
        
        result.push(index);
    }
    
    return result;
}
export { newGallery }