<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require 'connect.php';
$connect = connect();

if (isset($_GET['id'])) {

  $sql = "DELETE FROM shifts WHERE id = {$_GET['id']}";
  if($result = mysqli_query($connect,$sql))
  {
    echo "Fine";
  }

}

?>
