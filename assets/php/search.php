<?php 

require_once "connect.php";

$params = (array_key_exists("type", $_REQUEST) || array_key_exists("query", $_REQUEST)) ? $_REQUEST : array("mode" => "HTML");

$allow = str_split("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'`");

function isClean($in, $check) {
	return (!strlen(str_replace($check, "", $in)) > 0);
}

// My PDO
$output;
try {  
	$DBH = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
	$DBH->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$DBH->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

	if (array_key_exists("type", $params) && array_key_exists("query", $params) && ($params["type"] == "english" || $params["type"] == "mandoa")) {
		if (isClean($params["query"], $allow)) {
			$STH;
			if ($params["type"] == "english") {
				$STH = $DBH->prepare("SELECT * FROM `translation` WHERE `english` LIKE CONCAT('%', ?, '%')");
			} else if ($params["type"] == "mandoa") {
				$STH = $DBH->prepare("SELECT * FROM `translation` WHERE `mandoa` LIKE CONCAT('%', ?, '%')");
			} else {
				$STH = $DBH->prepare("SELECT * FROM `translation`");
			}
			$input = array($params["query"]);
			$STH->execute($input);
			$STH->setFetchMode(PDO::FETCH_ASSOC);
			while($row = $STH->fetch()) {
				$output[] = $row;
			}
		} else {
			$output = array();
		}
	} else {
		$STH = $DBH->prepare("SELECT * FROM `translation`");
		$STH->execute();
		$STH->setFetchMode(PDO::FETCH_ASSOC);
		while($row = $STH->fetch()) {
			$output[] = $row;
		}
	}

} catch(PDOException $e) {
	file_put_contents('PDOErrors.txt', $e->getMessage(), FILE_APPEND);
}


 ?>