<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$dbname = 'students';
$username = 'root';
$password = '';


try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Bağlantı başarısız: " . $e->getMessage());
}


function responseJson($data) {
    header('Content-Type: application/json');
    echo json_encode($data);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/add_user') {
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "INSERT INTO students_informations (tc, ad, soyad, okul_adi, okul_no) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([$data['tc'], $data['name'], $data['surname'], $data['schoolName'], $data['schoolNo']]);
        responseJson(["message" => "SUCCESS student data has been added"]);
    } catch (PDOException $e) {
        responseJson(["message" => "An error occurred: " . $e->getMessage()]);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/students') {
    $sql = "SELECT * FROM students_informations";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    responseJson($students);
}


if ($_SERVER['REQUEST_METHOD'] === 'GET' && preg_match('/\/get_students\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $id = $matches[1];
    $sql = "SELECT * FROM students_informations WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    $student = $stmt->fetch(PDO::FETCH_ASSOC);
    responseJson($student);
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && preg_match('/\/edit_user\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $id = $matches[1];
    $data = json_decode(file_get_contents("php://input"), true);
    $sql = "UPDATE students_informations SET tc = ?, ad = ?, soyad = ?, okul_adi = ?, okul_no = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([$data['tc'], $data['name'], $data['surname'], $data['schoolName'], $data['schoolNo'], $id]);
        responseJson(["message" => "SUCCESS student data has been updated"]);
    } catch (PDOException $e) {
        responseJson(["message" => "An error occurred: " . $e->getMessage()]);
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && preg_match('/\/delete\/(\d+)/', $_SERVER['REQUEST_URI'], $matches)) {
    $id = $matches[1];
    $sql = "DELETE FROM students_informations WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    
    try {
        $stmt->execute([$id]);
        responseJson(["message" => "SUCCESS student data has been deleted"]);
    } catch (PDOException $e) {
        responseJson(["message" => "An error occurred: " . $e->getMessage()]);
    }
}
?>
