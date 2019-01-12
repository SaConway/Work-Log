<?php
header('Access-Control-Allow-Origin: *');
// Accepts all origins (domain, plus a scheme and port number)
header('Access-Control-Allow-Methods: *');
// Accepts all methods - get, post, etc.
header('Access-Control-Allow-Headers: *');
// Accept all headers

require 'connect.php';
$connect = connect();

if (isset($_GET['id'])) { // id is set

  $sql = "SELECT * FROM users WHERE id = {$_GET['id']}";

  $result = $connect->query($sql);

  if ($result->num_rows > 0) {
    $row = mysqli_fetch_assoc($result); // fetches a result row as an associative array
    $user = array();
    $user['hourly_wage'] = $row['hourly_wage'];
    $json = json_encode($user);
    echo $json;
  }

}
?>
