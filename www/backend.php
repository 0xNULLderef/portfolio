<?php

session_start();

$connection = new mysqli(
	"mariadb",
	"root",
	"ccd629993feda0cffa74288b04060dae5d8621f244cbbfd8a471530bb265e050",
	"portfolio"
);

function fetch_single($table) {
	global $connection;
	return $connection->query("SELECT * FROM `" . $table . "`;")->fetch_array(MYSQLI_ASSOC);
}

function about() {
	echo json_encode(
		fetch_single("about")
	);
}

function projects() {
	global $connection;
	echo json_encode(
		$connection->query("SELECT * FROM `projects`;")->fetch_all(MYSQLI_ASSOC)
	);
}

function projects_add($session, $post) {
	global $connection;
	if($session["authorized"] ?? false) {
		$name = $connection->real_escape_string($post["name"]);
		$url = $connection->real_escape_string($post["url"]);
		$description = $connection->real_escape_string($post["description"]);
		$connection->query("INSERT INTO `projects` (`name`, `url`, `description`, `status`) VALUES ('$name', '$url', '$description', '0')");
		echo json_encode(array("success" => true));
	} else {
		echo json_encode(array("success" => false));
	}
}

function skills() {
	global $connection;
	echo json_encode(
		$connection->query("SELECT * FROM `skills`;")->fetch_all(MYSQLI_ASSOC)
	);
}

function skills_add($session, $post) {
	global $connection;
	if($session["authorized"] ?? false) {
		$name = $connection->real_escape_string($post["name"]);
		$percentage = intval($post["percentage"]);
		$connection->query("INSERT INTO `skills` (`name`, `percentage`) VALUES ('$name', '$percentage')");
		echo json_encode(array("success" => true));
	} else {
		echo json_encode(array("success" => false));
	}
}

function login($data) {
	global $connection;
	$credentials = $connection->query("SELECT * FROM `credentials`;")->fetch_array(MYSQLI_ASSOC);
	if(password_verify($data["password"], $credentials["hash"])) {
		$_SESSION["authorized"] = true;
		echo json_encode(array("success" => true));
	} else {
		echo json_encode(array("success" => false));
	}
	// $data["password"]
}

function status($session) {
	echo json_encode(array("authorized" => $session["authorized"] ?? false));
}

function not_found() {
	http_response_code(404);
	echo json_encode(array("error" => "Endpoint not found!"));
}

match(array($_SERVER["REQUEST_METHOD"], array_merge($_GET, $_POST)["endpoint"] ?? null)) {
	array("GET", "about") => about(),
	array("GET", "projects") => projects(),
	array("POST", "projects") => projects_add($_SESSION, $_POST),
	array("GET", "skills") => skills(),
	array("POST", "skills") => skills_add($_SESSION, $_POST),
	array("POST", "login") => login($_POST),
	array("GET", "status") => status($_SESSION),
	default => not_found(),
};

$connection->close();

?>
