<?php

// $name = trim($_POST['who']);
// $phone = trim(strip_tags($_POST['phone']));
// $mail = trim(strip_tags($_POST['mail']));
// $message = trim(strip_tags($_POST['message']));
// if ($mail == '' || $message == '' || $phone == '' || $name == '') {
	// echo 'Заполните все поля';
// } else if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
	// echo 'Введите корректный email';
// } else {

// }
date_default_timezone_set("Europe/Moscow");
$file = 'some_text.txt';
// $text = date(DATE_RFC822) . PHP_EOL . implode(' ', $_POST);
$text = array_keys($_POST)[0];
$ip =  $_SERVER["REMOTE_ADDR"];
file_put_contents($file, "$ip : $text \n", FILE_APPEND | LOCK_EX);
echo file_get_contents($file);
// echo '1';
// print_r($_POST['fuck']);