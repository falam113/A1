<?php
session_start();

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>COMP 3512 Assign1</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/nav-script.js"></script> 
</head>

<body>
    <div class="nav" id="topNav">
    <img src="img/logo.jpg" alt="Logo" id="logo" width=50 style="margin:3px 5px">
        <a href="index.php">Home</a>
        <a href="about.php" class="active">About</a>
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

    <div class="aboutContent">
        <h4>COMP 3512 Web II</h4>
        <p>
            Mount Royal University<br>
            Winter Semester 2020<br>
            Assignment 2<br>
            Professor: Randy Connolly<br>
        </p>

        <h4>Technologies Used</h4>
        <p>
            <li>XAMPP</li>
            <li>Brackets</li>
            <li>Microsoft Visual Studio</li>
        </p>

        <h4>Group Members</h4>
        <p>
            <li>Casey Ryane</li>
            <li>Allen Pan</li>
            <li>Fahim Alam</li>
            <li>Tyler Bedier</li>
        </p>

        <h4>Github Repos</h4>
        <p>
            <li><a href="https://github.com/CaseyRyane/ASG02">Main Assignment Github Repo</a></li>
            <li><a href="https://github.com/CaseyRyane?tab=repositories">Casey's Github Repo</a></li>
            <li><a href="https://github.com/allenp26?tab=repositories">Allen's Github Repo</a></li>
            <li><a href="https://github.com/falam113?tab=repositories">Fahim's Github Repo</a></li>
            <li><a href="https://github.com/tylerbedier?tab=repositories">Tyler's Github Repo</a></li>
        </p>

        <h4>Image Credits</h4>
        <p>
            <li><a href="https://unsplash.com/photos/aNrRsB2wLDk">Hero Image</a></li>
            <li><a href="https://www.vectorstock.com/royalty-free-vector/black-film-roll-logo-or-icon-vector-4096446">Logo Image</a></li>
        </p>
        <h4>Code Credits </h4>
        <li><a href="https://www.w3schools.com/howto/howto_js_topnav_responsive.asp">Nav design / Idea </a> </li>
    </div>



</body>

</html>
