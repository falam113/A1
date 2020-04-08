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

		<section>
        <p>
    Favorites page - page is only displayed if the user is logged in 
    TODO: (only displayed in nav if user is logged in)
    </p>
		</section>

	</body>
	</html>