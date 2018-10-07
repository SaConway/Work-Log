<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require 'connect.php';
$connect = connect();

$fullname = $_GET['fullName'];
$id = $_GET['id'];
// $hourlywage = $_GET['hourlyWage'];

if ($fullname != null and $id != null) {

  // Check if user exist

  $sql = "SELECT * FROM `users` WHERE `full_name` = '$fullname' AND `id` = '$id'";

  $result = $connect->query($sql);

  if ($result->num_rows > 0){
    echo "User exist";
    return;
  }

  // Check if id exist

  $sql = "SELECT * FROM `users` WHERE `id` = '$id'";

  $result = $connect->query($sql);

  if ($result->num_rows > 0){
    echo "Wrong name";
    return;
  }

  // Insert new user

  $sql = "INSERT INTO `users`(`full_name`, `id`) VALUES
    ('$fullname','$id')";

  if ($result = $connect->query($sql)){
    echo "New user";
  }
}
 ?>
