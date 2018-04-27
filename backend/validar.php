<?php

$user = isset($_POST["user"]) ? $_POST["user"] : NULL;
$password = isset($_POST["password"]) ? $_POST["password"] : NULL;

$filename = 'users.txt';
$fp = @fopen($filename, 'r'); 
if ($fp) {
   $array = explode("\n", fread($fp, filesize($filename)));
}

echo var_dump($array);

foreach ($array as $value) {
    $user[0] = explode('-', $value);
}

echo var_dump($user[0]);

if($user == 'Agustin' && $password == '123456' || $user == 'Pancho' && $password == '123456' || $user == 'Tototo' && $password == '123456') {
    echo 'ok';
} else {
    echo 'failed';
}

?>