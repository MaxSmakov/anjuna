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
              'step': 0,
              'startX': 0,
              'dist': 0,
              'touchobj': null
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
            var hammer_ul = new Hammer(privates.main.wrap);
            hammer_ul.get('rotate').set({enable: true });
            hammer_ul.on('swipeleft', () => {
                this.next_slide();
              });
              hammer_ul.on('swiperight', () => {
                this.prev_slide();
              });
            if (privates.main.wrap !== null) {
              privates.main.wrap.addEventListener('click', (e) => {
                this.modal(e);
              });
            }
           /* if (privates.main.wrap !== null) {
              privates.main.wrap.addEventListener('touchstart', (e) => {
                this.touch(e);
              });
            }*/
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

function Photos() {
  	$(function() {
  			var WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  		//Фотографии:
  		var s = 0; //счетчик
  		var n = document.querySelector('.gallery').children.length; //кол-во фоток, одновременно загруженных на странице
  		var k = $('.hidden-img img').length; //общее кол-во фоток
  		function page_number (k, n, s) {
  			var page_count, current_page;//всего страниц, текущая страница
  			if (k % n) {
  			page_count = Math.floor(k / n) + 1;
  			} else {
  				page_count = k / n;
  			}
  			current_page = s / n + 1;
  			$('.page_counter').text( current_page + ' / ' + page_count);
  		}
  			for (var i = 0; i < 9; i++) { //нужно чтоб весь блок одновременно загружался, а не только фотки
  			$('.foto').eq(i).css({
  				'background-image': 'url(' + $(".hidden-img img").eq(i).attr("src") + ')'
  			});
  		}
  		page_number(k, n, s);
  		$('.gal_btn_next').on('click', function() {
  			s += n; //увеличиваем счетчик при каждом клике
  			if (s >= k) s = 0;// если счетчик больше или равен кол-ву всех фоток - обнуляем его
  			for (var i = 0; i < n; i++) {
  				if ($(".hidden-img img").eq(i + s).attr("src")) { //если картинка существует
  					$('.foto').eq(i).css({  // ставим ее фоном в соответствующий блок
  						'background-image': 'url(' + $(".hidden-img img").eq(i + s).attr("src") + ')',
  						 opacity : 0.7,
  						'cursor': 'pointer'//не забываем ставить исчезнувший курсор(если он исчез)
  					});
  					$('.foto').eq(i).animate({
  						opacity : 1
  					}, (i + 1) * 150, 'linear');
  					page_number(k, n, s);
  				} else { //если картинки нет, то и фона нет, и курсор обычный
  					$('.foto').eq(i).css({
  							'background-image': 'none',
  							'cursor': 'default'
  					});
  				}
  			}
  		});
  		$('.gal_btn_prev').on('click', function() {
  			s -= n; //уменьшаем счетчик при каждом клике
  			if (s < 0) { // если счетчик меньше нуля,
  				s = Math.floor(k / n) * n;//присваиваем ему значение последней страницы
  				if (k % n == 0) {
  				s -= n; //избегаем появления лишней пустой страницы
  				}
  			}
  			for (var i = 0; i < n; i++) {
  				if ($(".hidden-img img").eq(i + s).attr("src")) {//если картинка существует
  					$('.foto').eq(i).css({ // ставим ее фоном в соответствующий блок
  						'background-image': 'url(' + $(".hidden-img img").eq(i + s).attr("src") + ')',
  						 opacity : 0.7,
  						'cursor': 'pointer'//не забываем ставить исчезнувший курсор(если он исчез)
  					});
  					$('.foto').eq(i).animate({
  						'opacity': '1'
  					}, (i + 1) * 150, 'linear');
  					page_number(k, n, s);
  				} else {
  					$('.foto').eq(i).css({ //если картинки нет, то и фона нет, и курсор обычный
  						'background-image': 'none',
  						'cursor': 'default'
  					});
  				}
  			}
  		});
  		//Модальное окно для фотографий
  		$('.foto').on('click', function () {
  			if ($(this).css('background-image') != 'none') {
  				var $this = $(this);
  				var n = $this.index() + s; //счетчик, показывает какая по счету фотка открыта в данный момент
  				var touchobj = null;
  				var startX, dist, pos = 0;
  				// if (WIDTH < 1200) {
  				// 	// console.log($(".hidden-img img").eq(n).attr("src") + '  '+ $('.photos_carousel .fotorama imgd'));
  				// 	// $('.photos_carousel').children[0].children[0].click();

  				// 	return;
  				// }
  				$('.gallery_modal').css({
  					'display' : 'flex' //оживляем модалку
  				});
  				$('.modal-photo').css({
  					// 'width': '100%',//ставим все нужные нам стили
  					// 'height': '100%',
  					// 'background-size': 'content',
  					// 'background-position': 'center',
  					// 'background-repeat': 'no-repeat',
  					'background-image': 'url(' + $(".hidden-img img").eq(n).attr("src") + ')'  // вуаля
  				});
  				function next_modal() { //на следующую фотку
  					n++;
  					if (n >= k) n = 0; // если счетчик больше или равен кол-ву всех фоток - обнуляем его
  					$('.modal-photo').css({
  						'background-image': 'url(' + $(".hidden-img img").eq(n).attr("src") + ')'
  					});
  				}
  				function prev_modal() {//на предыдущую фотку
  					n--;
  					if (n < 0) n = k-1; // если меньше нуля, присваиваем ему значение последней фотки
  					$('.modal-photo').css({
  						'background-image': 'url(' + $(".hidden-img img").eq(n).attr("src") + ')'
  					});
  				}
  				$('.gallery_modal a.modal-next').on('click', next_modal);
  				$('.gallery_modal a.modal-prev').on('click', prev_modal);

  				var elem = document.querySelector('.modal-photo');
  				var hammertime = new Hammer(elem);
  				hammertime.on("swipeleft", next_modal);
  				hammertime.on("swiperight", prev_modal);
  			}
  		});
  		$('.gallery_modal a.modal-close').on('click', function () { //кнопочка закрытия
  			$('.gallery_modal').css({
  				'display' : 'none'  // закрываем модалку
  			});
  		});			
  	});
}
