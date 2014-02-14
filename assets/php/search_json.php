<?php 

require_once "connect.php";

require_once "search.php";

print (!empty($output)) ? json_encode($output) : "[]";

//$res->close();

//$stmt->close();
 
?>