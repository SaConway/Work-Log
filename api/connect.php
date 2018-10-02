<?php
// db credentials
define('DB_HOST', '127.0.0.1');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','work_log');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect))
  {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");
  return $connect;
}
?>
