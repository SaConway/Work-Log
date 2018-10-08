<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require 'connect.php';
$connect = connect();

if (isset($_GET['hourlyWage']) and isset($_GET['id'])) {

  $sql = "UPDATE users SET hourly_wage = '{$_GET['hourlyWage']}' WHERE id = '{$_GET['id']}'";

  if ($result = $connect->query($sql)){
    echo "Updated Successfully";
  }
  else{
    echo "Update Failed";
  }

}
 ?>
