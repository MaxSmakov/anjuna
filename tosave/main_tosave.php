<div class="tosave">
	
	<form method="post" action="../mail.php"> 	
   
     <div class="formwrapper">
     	<h1>Свяжитесь со мной</h1>
     	<!-- <label for="name">Имя:</label> -->
     	<input maxlength="30" type="text" name="name" placeholder="Имя" />
     	 
     	<!-- <label for="phone">Телефон:</label> -->
     	<input maxlength="30" type="text" name="phone" placeholder="Телефон" />
     	 
     	<!-- <label for="mail">E-mail:</label> -->
     	<input maxlength="30" type="text" name="mail" placeholder="E-mail" />
     	
     	<!-- <label for="message">Сообщение:</label> -->
     	<textarea rows="7" cols="50" name="message" placeholder="Сообщение"></textarea>
     	 
     	<input type="submit" value="Отправить" class="send" />
     	
     	<div class="show_ip"></div>
     </div> 
	</form>
<input type="submit" value="AJAX-запрос" class="ajax" id="ajax">

<input type="text" name="who" placeholder="Писать сюда" id="who" class="who">
<input type="button" id="send_ajax" value="SendAjax">
<input type="button" id="clean" value="CleanFile">
<style>
	#send_ajax {
		background-color: green;
		cursor: pointer;
	}
	#clean {
		background-color: red;
		cursor: pointer;
	}
</style>

</div>

<script>
	window.onload = function () {
		document.querySelector('#ajax').onclick = function () { //кнопка AJAX
			ajaxGet('ip.php', function (data) {
				document.querySelector('.show_ip').innerHTML = data;
			});
		};
		/*ajaxGet('ip.php', function (data) {
				document.querySelector('.show_ip').innerHTML = data;
			});*/

		var inp_imya = document.querySelector('#who');
		document.querySelector('#send_ajax').onclick = function () { //Кнопка SendAjax
			var params = inp_imya.value;
			ajaxPost('mail_ajax.php', params);
			// console.log(params);
		};
		document.querySelector('#clean').onclick = function () { //Кнопка Clean
			ajaxGet('clean.php', function () {
				document.querySelector('.show_ip').innerHTML = '';
			})
		};
	};
	function ajaxGet (url, callback) {
		var f = callback || function(data) {};
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {				
				callback(request.responseText);
			}
		};
		request.open('GET', url);
		request.send();
	}
	function ajaxPost (url, params) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {				
				// document.querySelector('.show_ip').innerHTML = request.responseText;
				if (request.responseText == '1') {
					document.querySelector('.show_ip').innerHTML = 'Ура, все хорошо!';
				} else {
					document.querySelector('.show_ip').innerHTML = request.responseText;
				}
			}
		};
		request.open('POST', url);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send(params);
	}
</script>