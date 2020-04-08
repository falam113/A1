<?php 
session_start();

?>


<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>  
		<title>COMP 3512 Assign1</title>   
		<link rel="stylesheet" href="css/style.css?v=<?php echo time(); ?>">
		<script src="js/script.js?v=<?php echo time(); ?>"></script> 
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
			session_write_close();
		}
	?> 
		<a href="#" class="hamburger" onclick="displayNav()">
		<span class="navIcon">=</span></a>
	</div>

<?php
session_id("formSession");
session_start();


?>
		<section>

	<div class="formContainer">
	<form id="signupForm" onSubmit="return ensureInput()" action="signup.php" method="post" >
	
	<h2>Sign Up</h2>
	<p>Please fill in the following details to complete your registration</p>

	<div class="signupInput">
	<label for="firstName"><b>First Name</label><br>
    <input type="text" class="signupForm" placeholder="Enter First Name" name="firstName" id="signupFName" value=<?php echo $_SESSION["firstName"] ; ?>><br>
		
	<label for="lastName">Last Name</label><br>
    <input type="text" placeholder="Enter Last Name" name="lastName" id="signupLName" value=<?php echo $_SESSION["lastName"] ; ?>><br>

	<label for="city">City</label><br>
    <input type="text" placeholder="Enter Your City" name="city" id="signupCity" value=<?php echo $_SESSION["city"] ; ?>><br>

	<label for="country">Country</label><br>
    <input type="text" placeholder="Enter Your Country" name="country" id="signupCountry" value=<?php echo $_SESSION["country"] ; ?>><br>

	<label for="email">Email</label><br>
    <input type="text" placeholder="Enter Your Email" name="email" id="signupEmail" value=<?php echo $_SESSION["email"] ; ?>><br>
	<div id="badEmail" class="badInput ">
	<?php
	 if (isset($_SESSION["error"]) && $_SESSION["error"] == "error") {
		echo "<p>Error: Email already in use </p>";
	 }
	?>
	</div>

	<label for="password">Password</label><br>
    <input type="password" placeholder="Enter Your Password" name="password" id="signupPass1" ><br>
	<div id="badPass" class="badInput hidden">
	</div>

	<label for="password2">Confirm Password</label><br>
    <input type="password" placeholder="Confirm Your Password" name="password2" id="signupPass2"><br>
	<div id="badPass2" class="badInput hidden">
	</div>

	<div id="missingInput" class="badInput hidden">
	</div>
	<div id="signupSub">
	<button class="signupButton" type="submit">Sign Up</button>
	</div>
	<br>
	</div>
	</form>
	</div>



		</section>

	</body>
	</html>