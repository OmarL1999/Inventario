<?php

$host = 'containers-us-west-150.railway.app';
$user = 'root';
$password = 'Imz8JAP9te0MZBodWv95';
$db = 'railway';

$conection= @mysqli_connect($host,$user,$password,$db);

if(!$conection){
    echo "Error en la conexión";
}
?>
