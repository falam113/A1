<?php 
	session_start();

?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>  
		<title>COMP 3512 Assign1</title>   
		<link rel="stylesheet" href="css/style.css">
		<script src="js/code.js"></script> 
		<script src="js/nav-script.js"></script> 
	</head>

	<body>
	<div class="nav" id="topNav">
		<img src="img/logo.jpg" alt="Logo" id="logo" width=50 style="margin:3px 5px">
		<a href="index.php" class="active">Home</a>
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


		<?php
			if($_SESSION["loggedin"] == true){
		
				//add in all the phph for the logged in version here/



			}else{
		
	echo"</div>";
		echo"<section class='homeView'>";
		echo"<div id='centralBox'>";
			echo"<h1>Movie Browser</h1>";
				echo"<form id='mainForm'>";
                    echo"<button type='button' id='Login' onclick='location.href='login.php''>Login</button>";
					echo"<button type ='button' id='Join' onclick='location.href='signup-form.php';'>Join</button>";
                        echo"<br><br><br><br>";	
					echo"<input onchange='startSearch()' type='text' id='movieName' name='movieName' placeholder='SEARCH BOX FOR Movies'>";
				echo"</form></div>";
			echo"<p>Hero Image from:https://unsplash.com/photos/aNrRsB2wLDk photographer: Ahmet Yalçınkaya</p>";
		echo"</section>";

			}
		?>






	</body>
	</html>
