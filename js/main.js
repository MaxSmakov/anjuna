function Carousel(setting) {
            let privates = {};
            privates.setting = setting;
            privates.main = {
              'main': document.querySelector(privates.setting.main),
              'wrap': document.querySelector(privates.setting.wrap),
              "children": document.querySelector(privates.setting.wrap).children,
              'prev': document.querySelector(privates.setting.prev),
              'next': document.querySelector(privates.setting.next),
              'width': document.querySelector(privates.setting.wrap).children[0].clientWidth
            };
            privates.modal = {
              'main': document.querySelector(privates.setting.modal_main),
              'photo': document.querySelector(privates.setting.modal_photo),
              'close': document.querySelector(privates.setting.modal_close),
              'prev': document.querySelector(privates.setting.modal_prev),
              'next': document.querySelector(privates.setting.modal_next)
            };
            privates.opt = {
              'position': getTranslateX(privates.main.wrap), //должно совпадать с translateX в CSS-свойствах privates.main.wrap
              'step': 0
            };
                      // Control
            if (privates.main.prev !== null) {
              privates.main.prev.addEventListener('click', () => {
                this.prev_slide();
              });
            }

            if (privates.main.next !== null) {
              privates.main.next.addEventListener('click', () => {
                this.next_slide();
              });
            }
            if (privates.main.wrap !== null) {
              privates.main.wrap.addEventListener('click', (e) => {
                this.modal(e);
              })
            }
            /* Public methods */
            // Prev slide
            this.prev_slide = () => {
               privates.main.wrap.insertBefore(privates.main.wrap.lastElementChild, privates.main.wrap.firstElementChild);
              privates.opt.step -= privates.main.width;
              privates.main.wrap.style.marginLeft = privates.opt.step + 'px';
              privates.opt.position += privates.main.width;
              privates.main.wrap.style.transform = "translateX(" + privates.opt.position + "px)";
            }
            // Next slide
             this.next_slide = () => {
              privates.main.wrap.appendChild(privates.main.children[0]);
              privates.opt.step += privates.main.width;
              privates.main.wrap.style.marginLeft = privates.opt.step + 'px';
              privates.opt.position -= privates.main.width;
              privates.main.wrap.style.transform = "translateX(" + privates.opt.position + "px)";
            }
            this.modal = (e) => {
               e.preventDefault();
              if (e.target.tagName !== 'IMG') return;//если не img то уходим
              privates.modal.main.style.display = 'flex';//выходим из сумрака
              var targetSrc = e.target.getAttribute('src'); // получим src цели
              var img = document.createElement('img'); //создаем img
              privates.modal.photo.appendChild(img); //добавляем IMG в блок для фотки
              img.setAttribute('src', targetSrc);//ставим фотке нужный адрес
              privates.modal.close.onclick = () => {       //закрытие окна при нажатии на крестик         
                modalClose();                
              }
              document.addEventListener('keydown', (e) => { //закрытие окна нажатием клавиши ESC
                 if ( e.keyCode === 27 ) {     
                modalClose();
                }
              });              
              function modalClose () { //функция для закрытия модальщины
                if (img) img.remove();//удаляем img
                privates.modal.main.style.display = 'none'; // переключаем на дисплэй ноун      
              }
              var currentPhoto = e.target; //обозначим текущее фото
              privates.modal.prev.onclick = () => {//кнопка назад
                img.removeAttribute('src');//удалим атрибут у картинки
                if (currentPhoto.parentNode.previousElementSibling) {
                img.setAttribute('src', currentPhoto.parentNode.previousElementSibling.firstElementChild.getAttribute('src')); //поставим картинке атрибут с фоткой предыдущего слайда
                 currentPhoto = currentPhoto.parentNode.previousElementSibling.firstElementChild;//меняем текущее фото на предыдущее
               } else {
                currentPhoto = currentPhoto.parentNode.parentNode.lastElementChild.firstElementChild;
                // console.log(currentPhoto.parentNode.parentNode.lastElementChild.firstElementChild);
                img.setAttribute('src', currentPhoto.getAttribute('src'));
               }               
              }
              privates.modal.next.onclick = () => {//кнопка вперед
                img.removeAttribute('src');//удалим атрибут у картинки
                if (currentPhoto.parentNode.nextElementSibling) {
                img.setAttribute('src', currentPhoto.parentNode.nextElementSibling.firstElementChild.getAttribute('src')); //поставим картинке атрибут с фоткой следующего слайда
                 currentPhoto = currentPhoto.parentNode.nextElementSibling.firstElementChild;//меняем текущее фото на следующее
               } else {
                currentPhoto = currentPhoto.parentNode.parentNode.firstElementChild.firstElementChild;
                img.setAttribute('src', currentPhoto.getAttribute('src'));
               }  
              }
            }

            function getTranslateX (elem) {
              let mat = getComputedStyle(elem).transform.match(/^matrix\((.+)\)$/);//вот такая вот  
             //функция получения traslateX из css
             if (mat) {
              return parseFloat(mat[1].split(', ')[4]);//  
              } else {
                return 0;
              }        
            }
          
          }