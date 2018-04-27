<?php

$user = isset($_POST["user"]) ? $_POST["user"] : NULL;
$password = isset($_POST["password"]) ? $_POST["password"] : NULL;

$filename = 'users.txt';
$fp = fopen($filename, 'r');
if ($fp) {
   $array = explode("\n", fread($fp, filesize($filename)));
}

for($i = 0; $i < count($array); $i++) {
    $users[$i] = explode('-', $array[$i]);
    
    if($user == trim($users[0][0]) && $password == trim($users[0][1])) {
        echo 'ok';
        break;
    }
}

?>