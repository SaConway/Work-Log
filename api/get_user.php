<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require 'connect.php';
$connect = connect();

if (isset($_GET['id'])) {

  $sql = "SELECT * FROM users WHERE id = {$_GET['id']}";

  $result = $connect->query($sql);

  if ($result->num_rows > 0) {
    $row = mysqli_fetch_assoc($result);
    $user = array();
    $user['hourly_wage'] = $row['hourly_wage'];
    $json = json_encode($user);
    echo $json;
  }

}
?>
