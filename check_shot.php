<?php
date_default_timezone_set("Europe/Moscow");
if ($_SERVER['REQUEST_METHOD'] !== 'GET')
{
    exit;
}

$r = $_GET['r'];
$x = $_GET['x'];
$y = $_GET['y'];

if (!checkDataValid($x, $y, $r)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid data format."]);
    exit;
}

$result = checkHit($x, $y, $r) ? "In" : "Out";
$execution_time = (microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"]) * 1000;
$response = [
    "x" => $x,
    "y" => $y,
    "r" => $r,
    "timestamp" => date("H:i:s", $_SERVER["REQUEST_TIME"]),
    "execution_time" => round($execution_time, 3) . "ms",
    "result" => $result,
];
echo json_encode($response);

function checkDataValid($x, $y, $r)
{
    $x_valid = isset($x) && is_numeric($x) && in_array($x, array(-5, -4, -3, -2, -1, 0, 1, 2, 3));
    $y_valid = isset($y) && is_numeric($y) && -3 <= $y && $y <= 3;
    $r_valid = isset($r) && is_numeric($r) && in_array($r, array(1, 1.5, 2, 2.5, 3));
    return $x_valid && $y_valid && $r_valid;
}

function checkHit($x, $y, $r)
{
    return (($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0) ||
            (2 * $y + $x >= (-1) * $r && $x <= 0 && $y <= 0) ||
            ($x >= 0 && $y >= 0 && $x <= $r && $y <= $r / 2);
}
