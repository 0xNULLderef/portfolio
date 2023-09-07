<?php

$connection = new mysqli(
	"mariadb",
	"root",
	"ccd629993feda0cffa74288b04060dae5d8621f244cbbfd8a471530bb265e050",
	"portfolio"
);

function fetch_text($name) {
	global $connection;
	return $connection->query("SELECT * FROM `text` WHERE `name`='" . $connection->real_escape_string($name) . "';")->fetch_array(MYSQLI_ASSOC);
}

function about() {
	echo json_encode(
		fetch_text("about")
	);
}

function projects() {
	global $connection;
	echo json_encode(
		$connection->query("SELECT * FROM `projects`;")->fetch_all(MYSQLI_ASSOC)
	);
}

function contact() {
	echo json_encode(array());
}

function skills() {
	echo json_encode(array());
}

function not_found() {
	http_response_code(404);
	echo json_encode(array("error" => "Page not found!"));
}

match(array($_SERVER["REQUEST_METHOD"], array_merge($_GET, $_POST)["endpoint"] ?? null)) {
	array("GET", "about") => about(),
	array("GET", "projects") => projects(),
	array("GET", "contact") => contact(),
	array("GET", "skills") => skills(),
	default => not_found(),
};

$connection->close();

?>
