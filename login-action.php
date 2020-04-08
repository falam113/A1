<?php
    require_once('config-users.inc.php');
    require_once('db-helpers.php');
    session_id("loggedIn");
    session_start();

    # for debugging
    ini_set('display_errors', 'On');

    $email = "";
    $password = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = sanitizeInput($_POST["loginEmail"]);
        $password = sanitizeInput($_POST["password"]);
        validateLogin($email, $password);
    }

    function sanitizeInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    function validateLogin($email, $password) {
        $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $sql = getIdPasswordStatement();
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(":email", $email);
        $stmt->execute();
        if ($stmt->rowCount()) {
            $queryResult = $stmt->fetchAll();
            foreach ($queryResult as $row) {
                if (password_verify($password, $row['password'])) {

                    // Store data in session variables
                    $_SESSION["loggedin"] = true;
                    $_SESSION["id"] = $row['id'];
                    $_SESSION["email"] = $email;
                    $_SESSION["favorites"] = array();
                    // Redirect user to homepage
                    header("location:index.php");
                }
            }
            loginError("Incorrect password");
        } else {
            loginError("User with email $email not found");
        }
    }

    function loginError($a){
        echo "<script>";
        echo "alert('$a'";
        echo ");";
        echo "window.location.href = 'login.php'";
        echo "</script>";
    }
?>