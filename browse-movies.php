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
		<a href="index.php">Home</a>
		<a href="about.php">About</a>
		<a href="browse-movies.php" class="active">Browse/Search</a>
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
	<div id="Page2">
        <div class="loading" style="display:none">
            <img src="img/tenor.gif">
        </div>
        <section class="grid-container">
            <div class="item3">
                <button id="hideFilterPanel" val="0">Hide Filter Panel</button>
                <h2 style="font-size: 0.5em">Movie Filters</h2>
                <div class="filter-panel">
                    <p id="title"><strong>Title</strong> <br><input value="" type="text" id="movieTitle" size="40"></p>
                    <strong>Year</strong><br>
                    <table>
                        <tr>
                            <td><input type="radio" name="rb1" id="beforeYear"><label class="container">Before</label></td>
                            <td><input type="text" id="beforeYearValue" size="15"></td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="rb1" id="afterYear"><label class="container">After</label></td>
                            <td><input type="text" id="afterYearValue" size="15"></td>
                        </tr>
                        <tr>
                            <td rowspan="2"><input type="radio" name="rb1" id="betweenYear"><label class="container">Between</label></td>
                            <td><input type="text" size="15" id="betweenYearValue1"></td>
                        </tr>
                        <tr>
                            <td><input type="text" size="15" id="betweenYearValue2"></td>
                        </tr>
                    </table>
                    <br><br>
                    <strong>Rating</strong><br>
                    <table>
                        <tr>
                            <td><input type="radio" name="rb1" id="belowRating"><label class="container">Below</label></td>
                            <td><input type="range" id="belowRatingValue" size="12" min="0" max="10" step="0.5" oninput="outputUpdate(value, 'output1')"><output for=value id="output1"></output></td>
                        </tr>
                        <tr>
                            <td><input type="radio" name="rb1" id="aboveRating"><label class="container">Above</label></td>
                            <td><input type="range" id="aboveRatingValue" size="12" min="0" max="10" step="0.5" oninput="outputUpdate(value, 'output2')"><output for=value id="output2"></output></td>
                        </tr>
                        <tr>
                            <td rowspan="2"><input type="radio" id="betweenRating" name="rb1"><label class="container">Between</label></td>
                            <td><input type="range" id="betweenRatingValue1" size="12" min="0" max="10" step="0.5" oninput="outputUpdate(value, 'output3')"><output for=value id="output3"></output></td>
                        </tr>
                        <tr>
                            <td><input type="range" id="betweenRatingValue2" size="12" min="0" max="10" step="0.5" oninput="outputUpdate(value, 'output4')"><output for=value id="output4"></output></td>
                        </tr>
                    </table>

                    <section id="buttons">
                        <button id="filterButton">Filter</button>&nbsp;
                        <button id="clearButton">Clear</button>
                    </section>
                </div>
            </div>
            <div class="item4">
                <div>
                    <h2 style="font-size: 0.5em">List / Matches</h2>
                </div>
                <div id="movieTable">
                </div>
            </div>

        </section>
    </div>

	</body>
	</html>