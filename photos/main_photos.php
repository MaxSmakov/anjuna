<div class="photos" id="scroll_target">	
	<h1>Фотогалерея</h1>
	<div class="hidden-img" style="display: none"> <!-- сюда загружать фото -->				
				<img src="/img/gallery/1.png" alt="">
				<img src="/img/gallery/2.png" alt="">
				<img src="/img/gallery/3.png" alt="">
				<img src="/img/gallery/4.png" alt="">
				<img src="/img/gallery/5.png" alt="">
				<img src="/img/gallery/6.png" alt="">
				<img src="/img/gallery/7.png" alt="">
				<img src="/img/gallery/8.png" alt="">
				<img src="/img/gallery/9.png" alt="">
				<img src="/img/gallery/10.png" alt="">
				<img src="/img/gallery/11.png" alt="">
				<img src="/img/gallery/12.png" alt="">
				<img src="/img/gallery/13.png" alt="">
				<img src="/img/gallery/14.png" alt="">
				<img src="/img/gallery/15.png" alt="">
				<img src="/img/gallery/16.png" alt="">
				<img src="/img/gallery/17.png" alt="">
				<img src="/img/gallery/18.png" alt="">
				<img src="/img/gallery/19.png" alt="">
				<img src="/img/gallery/20.png" alt="">
				<img src="/img/gallery/21.png" alt="">
				<img src="/img/gallery/22.png" alt="">
				<img src="/img/gallery/23.png" alt="">
				<img src="/img/gallery/24.png" alt="">
				<img src="/img/gallery/25.png" alt="">
				<img src="/img/gallery/26.png" alt="">
				<img src="/img/gallery/27.png" alt="">
				<img src="/img/gallery/28.png" alt="">				 
	</div>
	<div class="gallery">				
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
				<div class="foto"></div>
	</div>
	<button class="gal_btn_prev"><i class="fa fa-3x fa-caret-left"></i></button>
	<button class="gal_btn_next"><i class="fa fa-3x fa-caret-right"></i></button>
	<div class="page_counter"></div>
	<!-- модальное окно -->
	<div class="gallery_modal"> 
		<a class="modal-close">&#215;</a>
		<a class="modal-arrow modal-prev"> < </a>
		<div class="modal-photo modal-photo_css"></div>
		<a class="modal-arrow modal-next"> > </a>
	</div>
</div>

<script type="text/javascript">	
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
</script>