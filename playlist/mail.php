<?php require 'header.php'; ?>

	<div class="main">
		<div class="mail">
			<?php
			   $back = "<p><a href=\"javascript: history.back()\">Вернуться назад</a></p>";
			 
			   if(!empty($_POST['name']) and !empty($_POST['phone']) and !empty($_POST['mail']) 
			   and !empty($_POST['message'])){
			      $name = trim(strip_tags($_POST['name']));
			      $phone = trim(strip_tags($_POST['phone']));
			      $mail = trim(strip_tags($_POST['mail']));
			      $message = trim(strip_tags($_POST['message']));
			 
			      mail('maxsmakov@gmail.com', 'Письмо с адрес_вашего_сайта', 
			      'Вам написал: '.$name.'<br />Его номер: '.$phone.'<br />Его почта: '.$mail.'<br />
			      Его сообщение: '.$message,"Content-type:text/html;charset=windows-1251");
			 
			      echo $name . ', ваше сообщение успешно отправлено!<Br> Вы получите ответ в 
			      ближайшее время<Br>' . $back;
			 	echo $_SERVER["HTTP_USER_AGENT"]; //- имя браузера
			       echo $_SERVER["REMOTE_ADDR"];
			      exit;
			   } 
			   else {
			      echo "Для отправки сообщения заполните все поля! $back";
			      exit;
			   }
			?>
				
		</div>
	</div>

<?php require 'footer.php'; ?>	