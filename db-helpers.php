<?php

    function getConnection(){
        $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    function getMovieSQLStatement(){
        $sql = "SELECT id, tmdb_id, imdb_id, release_date, title, runtime, revenue, tagline, poster_path, popularity, vote_average, vote_count, overview from movie where 1=1";
        return $sql;
    }

    function getSingleMovieSQLStatement() {
        $sql = "SELECT * from movie where 1=1";
        return $sql;
    }

    function getUserSQLStatement(){
       $sql = "SELECT id, firstname, lastname, city, country, email, password, salt, password_sha256 FROM users WHERE 1=1";
       return $sql;
    }

    function getUserEmailSQLStatement(){
        $sql = "SELECT email FROM users WHERE 1=1";
        return $sql;
    }
 
    function insertUser($firstname, $lastname, $city, $country, $email, $password){
        $sql = "INSERT INTO users (firstname, lastname, city, country, email, password) VALUES ('$firstname', '$lastname', '$city', '$country', '$email', '$password')";
        return $sql;
    }

    function getIdPasswordStatement() {
        $sql = "SELECT id, password FROM users WHERE email=:email";
        return $sql;
    }

    //format output to look like the the API randy gave for assignment #1
    function formatMovieRow($current) {
        $data = [
            "id" =>$current[0],
            "tmbd_id" =>$current[1],
            "imdb_id" =>$current[2],
            "release_date" =>$current[3],
            "title" =>$current[4],
            "runtime" =>$current[5],
            "revenue" =>$current[6],
            "tagline" =>$current[7],
            "poster_path" =>$current[8],
            "Ratings"=>["popularity"=>$current[9],
                        "vote_average"=>$current[10],
                        "vote_count"=>$current[11]
                       ],
            "overview" =>$current[12]
        ];
        return $data;
    }

    function formatSingleMovie($current) {
        $data = [
            "id" =>$current[0],
            "tmbd_id" =>$current[1],
            "imdb_id" =>$current[2],
            "release_date" =>$current[3],
            "title" =>$current[4],
            "Ratings"=>["popularity"=>$current[8],
                        "vote_average"=>$current[5],
                        "vote_count"=>$current[6]
                       ],
            "runtime" =>$current[7],
            "revenue" =>$current[9],
            "poster_path" =>$current[10],
            "tagline" =>$current[11],
            "overview" =>$current[12],
            "production_companies" =>$current[13],
            "production_countries" =>$current[14],
            "genres" =>$current[15],
            "keywords" =>$current[16],
            "cast" =>$current[17],
            "crew" =>$current[18]
        ];
        return $data;
    }


?>