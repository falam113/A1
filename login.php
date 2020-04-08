<?php 
session_start();
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>  
		<title>COMP 3512 Assign1</title>   
		<link rel="stylesheet" href="css/style.css">
		<script src="js/nav-script.js"></script> 
	</head>

	<body>
    <div class="nav" id="topNav">
	<img src="img/logo.jpg" alt="Logo" id="logo" width=50 style="margin:3px 5px">
		<a href="index.php">Home</a>
		<a href="about.php">About</a>
		<a href="browse-movies.php">Browse/Search</a>
		<?php
		if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
			echo '<a href="favorites.php">Favorites</a>';
			echo '<a href="logout.php">Logout</a>' ;
		}else{
			echo '<a href="login.php">Login</a>' ;
			echo '<a href="signup-form.php">Sign Up</a>' ;
		}
	?>
		<a href="#" class="hamburger" onclick="displayNav()">
		<span class="navIcon">=</span></a>
	</div>

	<div  class="loginContainer"> 
		<form id="loginForm" action="login-action.php" method="post">
			<h2>Login</h2>
			<div class="loginInput">
                <label for="loginEmail"><b>Email</b></label><br>
    			<input type="email" placeholder="Enter Email Address" name="loginEmail" id="loginEmail" required><br>

				<label for="password">Password</label><br>
    			<input type="password" placeholder="Enter Your Password" name="password" id="loginPass" required><br>
				<div id="loginSub">
					<button class="loginButton" type="submit">Login</button>
				</div>
				<br>
			</div>
		</form>
		<p>Do not have an account? <a href="signup-form.php">Sign up</a>.</p>
	</div>

	</body>
	</html>