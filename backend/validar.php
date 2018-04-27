<?php

$user = isset($_POST["user"]) ? $_POST["user"] : NULL;
$password = isset($_POST["password"]) ? $_POST["password"] : NULL;

if($user == 'Agustin' && $password == '123456' || $user == 'Pancho' && $password == '123456' || $user == 'Tototo' && $password == '123456') {
    echo 'ok';
} else {
    echo 'failed';
}

?>