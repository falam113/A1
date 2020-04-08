<?php
require_once('config-users.inc.php');
require_once('db-helpers.php');
session_id("formSession");
session_start();


?>

<div  class="loginContainer hidden"> 
		<form id="loginForm" action="login-action.php" method="post" class="hidden" >
    			<input type="email" placeholder="Enter Email Address" name="loginEmail" id="loginEmail" value=<?php echo $_POST["email"] ; ?> class="hidden"><br>
    			<input type="password" placeholder="Enter Your Password" name="password" id="loginPass"  value=<?php echo $_POST["password"] ; ?> class="hidden"><br>
		</form>

	</div>

    <?php

//move connection to helper file to clean up code
 $pdo = getConnection();

 $sql = getUserEmailSQLStatement();

 if (isset($_POST['email'])) {
    $statement = $pdo->prepare($sql);
    $statement->bindValue(":email", $_POST['email']);
    $statement->execute();
    $queryResult = $statement->fetchAll();

    $emailFound = false;
    foreach($queryResult as $row) {
        if ($row['email'] == $_POST['email']) {
            $emailFound = true;
        }
    }
    if($emailFound){
        $_SESSION["firstName"] = $_POST['firstName'];
        $_SESSION["lastName"] = $_POST['lastName'];
        $_SESSION["city"] = $_POST['city'];
        $_SESSION["country"] = $_POST['country'];
        $_SESSION["email"] = $_POST['email'];
        $_SESSION["error"] = "error";
     header("Location: signup-form.php");

    }else{
        registerUser();
    }
    }

   
 //adds user to the users database 
 function registerUser(){
    $pdo = getConnection();
     $password = $_POST['password'];
     $digest = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
     $sql = insertUser($_POST['firstName'], $_POST['lastName'], $_POST['city'], $_POST['country'], $_POST['email'], $digest);
    $statement = $pdo->prepare($sql);
     $statement->execute();
    loginNewUser();
 }

 
function loginNewUser(){
    echo "<script type='text/javascript'>
                document.forms['loginForm'].submit();
            </script>";
}


 $pdo = null;
 
?>

