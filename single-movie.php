<?php
	session_start();
	require_once('config.inc.php');
	require_once('db-helpers.php');

	$pdo = getConnection();

	$sql = getSingleMovieSQLStatement();
	$id = null;
	$queryResult = null;
	$result = null;
	setlocale(LC_MONETARY,"en_US");

	// send back either the entire movie DB info. or if an ?id is given, then only a single movie is returned.
	if (isset($_GET['id'])) {
		$statement = $pdo->prepare($sql);
		$statement->bindValue(":id", $_GET['id']);
		$statement->execute();
		$queryResult = $statement->fetchAll();

		foreach($queryResult as $row) {
			if ($row['id'] == $_GET['id']) {
				$result = formatSingleMovie($row);
			}
		}
	} else {
		header("location:browse-movies.php");
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8"/>  
		<title>COMP 3512 Assign1</title>   
		<link rel="stylesheet" href="css/style.css?<?php echo filemtime('css/style.css'); ?>">
		<script src="js/nav-script.js"></script> 
		<script src="js/single-movie.js?<?php echo filemtime('js/single-movie.js'); ?>"></script>
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
	<div class="fullSizeImage">
		<img id="largeImage" src="<?php echo "https://image.tmdb.org/t/p/w500/".$result["poster_path"]; ?>"></img>
	</div>
	<section class="grid-container1">
		<div class="item8">
			<h2><?php echo $result["title"];?></h2>
			<br>
			<table>
				<tr>
					<td><b>Release Date</b></td>
					<td><?php echo $result["release_date"];?></td>
				</tr>
				<tr>
					<td><b>Revenue</b></td>
					<td><?php echo "$" . number_format($result["revenue"]);?></td>
				</tr>
				<tr>
					<td><b>Runtime</b></td>
					<td><?php echo $result["runtime"]." minutes";?></td>
				</tr>
				<tr>
					<td><b>Tagline</b></td>
					<td><?php echo $result["tagline"];?></td>
				</tr>
				<tr>
					<td><b>IMDB link</b></td>
					<td id="imdblink"><a href=<?php echo "https://www.imdb.com/title/".$result['imdb_id']?>>IMDB Link</a></td>
				</tr>
				<tr>
					<td><b>TMDB Link</b></td>
					<td id="tmdblink"><a href=<?php echo "https://www.themoviedb.org/movie/".$result['tmbd_id']?>>TMDB Link</a></td>
				</tr>

				<tr>
					<td rowspan="3"><b>Rating</b></td>
					<td id="popularity"><?php echo $result["Ratings"]["popularity"];?></td>
				</tr>
				<tr>
					<td id="rating"><?php echo $result["Ratings"]["vote_average"];?></td>
				</tr>
				<tr>
					<td id="count"><?php echo $result["Ratings"]["vote_count"];?></td>
				</tr>
				<tr>
					<td colspan="3"><b>Oveview</b></td>
				</tr>
				<tr>
					<td colspan="3" id="overview"><?php echo $result["overview"];?></td>
				</tr>
			</table>
			<section id="companies">
				<?php
					$companies = json_decode($result['production_companies']);
					echo "<b>Companies:</b> <em>";
					if (count($companies) == 0) {
						echo "none</em>";
					} else {
						foreach ($companies as $company) {
							echo $company->name.", ";
						}
						echo " etc.</em>";
					}
				?>
			</section>
			<section id="countries">
					<?php
					$countries = json_decode($result['production_countries']);
					echo "<b>Countries:</b> <em>";
					if (count($countries) == 0) {
						echo "none</em>";
					} else {
						foreach ($countries as $country) {
							echo $country->name.", ";
						}
						echo " etc.</em>";
					}
					?>
			</section>
			<section id="keywords">
				<?php
				$keywords = json_decode($result['keywords']);
				echo "<b>Keywords:</b> <em>";
				if (count($keywords) == 0) {
					echo "none</em>";
				} else {
					foreach ($keywords as $keyword) {
						echo "#".$keyword->name.", ";
					}
					echo " etc.</em>";
				}
				?>

			</section>
			<section id="genres">
				<?php
				$genres = json_decode($result['genres']);
				echo "<b>Genres:</b> <em>";
				if (count($genres) == 0) {
					echo "none</em>";
				} else {
					foreach ($genres as $genre) {
						echo $genre->name.", ";
					}
					echo " etc.</em>";
				}
				?>
			</section>
			<?php
				if(isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true){
					echo "<button onclick=addToFavorites(".$result['id'].")>";
					echo "Add To Favorites";
					echo "</button>";
				}
			?>
		</div>
		<div class="item6">
			<img src=<?php echo "https://image.tmdb.org/t/p/w342/".$result["poster_path"];?>>
		</div>
		<div class="item7">
			<div class="tab">
				<button class="tablinks" onclick="openTab(event, '#crew')">Crew</button>
				<button class="tablinks" onclick="openTab(event, '#cast')">Cast</button>
			</div>

			<div id ="crew" class="tabcontent">
				<h3> Crew</h3>
				<table>
					<?php
						$crews = json_decode($result['crew']);
						usort ($crews, function($a, $b) {return strcmp($a->department, $b->department);});
						foreach ($crews as $crew) {
							echo "<tr>";
							echo "<td>".$crew->department."</td>";
							echo "<td>".$crew->name."</td>";
							echo "</tr>";
						}
					?>
				</table>
			</div>
			<div id="cast" class="tabcontent">
				<h3>Cast</h3>
				<table>
					<?php
						$cast = json_decode($result['cast']);
						usort ($cast, function($a, $b) {return $a->order < $b->order;});
						foreach ($cast as $onecast) {
							echo "<tr>";
							echo "<td>".$onecast->character."</td>";
							echo "<td>".$onecast->name."</td>";
							echo "</tr>";
						}
					?>
				</table>
				
			</div>
		</div>
	</section>
	</div> 

</body>
</html>


