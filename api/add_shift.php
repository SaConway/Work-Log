<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require 'connect.php';
$connect = connect();
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
    $request = json_decode($postdata);

    $sql = "INSERT INTO `shifts`(`start`, `end`, `date`, `hours`) VALUES
     ('$request->start','$request->end', '$request->date', '$request->hours')";

    mysqli_query($connect,$sql);
}
?>
