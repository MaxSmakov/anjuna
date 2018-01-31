<?php 

// echo $_SERVER["REMOTE_ADDR"] . " ";
// echo $_SERVER["HTTP_USER_AGENT"];
date_default_timezone_set("Europe/Moscow");
$file = 'some_text.txt';
$homepage = file_get_contents($file);
$ip =  $_SERVER["REMOTE_ADDR"] . ' _____ ' .  date(DATE_RFC822) . "\r\n";
file_put_contents($file, $ip, FILE_APPEND | LOCK_EX);
echo file_get_contents($file);
// echo urlencode('1 + 2');