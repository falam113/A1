<?php
    session_start();
    # for debugging
    ini_set('display_errors', 'On');
    $result = array();
    if (isset($_GET['id'])) {
        if(!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] != true) {
            array_push($result, ["output" => "User not logged in"]);
        } else {
            $id = $_GET['id'];
            if (in_array($id, $_SESSION["favorites"])) {
                array_push($result, ["output" => "Movie already in favorites list"]);
            } else {
                array_push($_SESSION["favorites"],$id);
                array_push($result, ["output" => "Movie added successfully"]);
            }
        }
    } else {
        array_push($result, ["output" => "Id required"]);
    }
    echo json_encode($result);


?>