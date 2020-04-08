<?php
    session_start();
    // Store data in session variables
    $_SESSION["loggedin"] = false;
    $_SESSION["id"] = "";
    $_SESSION["email"] = "";
    header("location:index.php");
?>
