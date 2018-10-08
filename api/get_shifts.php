<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');

require 'connect.php';
$connect = connect();

if (isset($_GET['user_id']) and isset($_GET['month']) and isset($_GET['year'])) {

  // Get the data
  $shifts = array();
  $sql = "SELECT * FROM shifts WHERE user_id = {$_GET['user_id']} AND MONTH(date) = {$_GET['month']} AND YEAR(date) = {$_GET['year']}";

  if($result = mysqli_query($connect,$sql))
  {
    $count = mysqli_num_rows($result);

    $cr = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        $timestamp = strtotime($row['date']);
        $date = date('d-m-Y', $timestamp);

        $shifts[$cr]['id'] = $row['id'];
        $shifts[$cr]['start'] = $row['start'];
        $shifts[$cr]['end']  = $row['end'];
        $shifts[$cr]['date'] = $date;
        $shifts[$cr]['hours'] = $row['hours'];

        $cr++;
    }
  }

  $json = json_encode($shifts);
  echo $json;

}
?>
