<?php
/**
 * Created by PhpStorm.
 * User: Porfirio
 * Date: 21/08/14
 * Time: 01:07 PM
 */

$frutas = array(array("nombre" => "Banana", "valor" => 10),
                array("nombre" => "Remolacha", "valor" => 15),
                array("nombre" => "Guayaba", "valor" => 12));

if($_GET){
    $frutas["sinteticas" ] = array(array("nombre" => "Ecnovia D3", "valor" => 99),
        array("nombre" => "Gibalta B2", "valor" => 88),
        array("nombre" => "Nifulia M2", "valor" => 62));
}


echo json_encode($frutas);