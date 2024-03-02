const newGallery = (target, showNav, showThumbnail, showDesc) => {
    
    let thumbnail = ``;
    let thumbImages = '';
    let imgHolder = ``;

    const targets = Array.from(document.querySelectorAll(`[data-action="${target.dataset.action}"]`));
    const images = targets.map(target => ({
        path: target.dataset.href,
        desc: target.dataset.desc
    }));

    let index = images.findIndex(image => image.path  === target.dataset.href); 
    // Создаём нужную картинку
    const template = `
        <div id="customGallery" style="opacity: 0; position: fixed; top: 0; left: 0; background-color: black; height: 100%; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.5s ease-in-out;">
            <div id="main-holder" style="display:flex; align-items: center; width: 100%; justify-content: space-between;">
                <span id="exit" style="position: absolute; top: 0; right: 0; margin-right: 30px; font-size: 3.5vw; color: #696969; cursor: pointer; user-select: none;">&times;</span>
                <span id="prev" style="position: relative; margin-left: 30px; font-size: 5vw; color: #696969; cursor: pointer; user-select: none;">&lt;</span>
                <div id="image-holder" style="display: flex; justify-content: center; position: relative;">
                    <img class="bigImg" src="${images[index].path}" style="position: relative; object-fit: cover; width: 73.75vw; height: auto;"/>
                </div>
                <span id="next" style="position: relative;  margin-right: 30px; font-size: 5vw; color: #696969; cursor: pointer; user-select: none;">&gt;</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', template);

    const imgblock = document.querySelector('#customGallery');

    setTimeout(() => {
        imgblock.style.opacity = "1";
    }, 1); //микрозадержка, без неё нет нанимации при закрытии

    // Отключение навигации
    if (showNav === false) {
        imgblock.querySelector("#main-holder").style["justify-content"] = "center";
        imgblock.querySelector("#exit").style.display = "none";
        imgblock.querySelector("#prev").style.display = "none";
        imgblock.querySelector("#next").style.display = "none";
    }

    // Добавление миниатюры
    if (showThumbnail === true) {
        
        thumbnail = `
            <div id="thumbHolder" style="margin-top: 32px; display: flex; width: 73.75vw; overflow: hidden">
        `
            for (let i = 0; i < images.length; i++) {
                thumbnail += `<img class="thumbImg" src="${images[i].path}" style="aspect-ratio: 1/1; width:10%; object-fit: cover; padding: 0 3.5px; cursor: pointer;"/>`;
            }
        
        
        thumbnail += `
            </div>
        `;
        imgblock.innerHTML += thumbnail;
        if (images.length <= 9)
            imgblock.querySelector("#thumbHolder").style["justify-content"] = "center";

        updateImage(); // Для затемнения изображения при первой загрузке
        thumbImages = document.querySelectorAll('.thumbImg');
        thumbImages.forEach(image => {
            image.addEventListener('click', (event) => {
                index = Array.from(thumbImages).indexOf(event.currentTarget);
                updateImage()
  
            });
        });

    }
    
    // Добавление описания
    if (showDesc === true) {
        imgHolder = document.querySelector("#image-holder") 
        imgHolder.innerHTML += `
            <h1 id="img-desc" style="position: absolute; 
            bottom: 0; 
            width: 100%; 
            z-index: 1; 
            background-color: #000000b0; 
            color: white; 
            padding-top: 10px; 
            padding-bottom: 10px;
            padding-left: 40px; 
            font-family: 'Inter'; font-size: 21px; font-weight: 200;">${images[index].desc}</h1>
        `
    }

    // Закрытие на крестик + закрытие на Esc
    imgblock.querySelector("span").onclick = () => {
        imgblock.style.opacity = "0";
        setTimeout(() => {
            imgblock.remove(); 
        }, 500);
        
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            imgblock.style.opacity = "0";
            setTimeout(() => {
                imgblock.remove();
            }, 500);
            
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

        imageElement.src = images[index].path;
        // Чтоб не ломался, если показывать описание = false
        try{
            const imageDesc = document.querySelector("#img-desc");
            imageDesc.textContent = images[index].desc;
        }
        catch{}
        

        const thumbElement = imgblock.querySelectorAll("img.thumbImg");

        thumbElement.forEach((element, indexElement) => {
            if (indexElement == index) {
                element.style.filter = 'brightness(0.5)';
                
                const thumbHolder = document.querySelector("#thumbHolder");
                const offsetLeft = element.offsetLeft;
                thumbHolder.scrollTo({top: 0, left: offsetLeft - thumbHolder.offsetLeft})
            }
            else {
                element.style.filter = 'none';
            }
            
        });
        
    }
}
export { newGallery }
