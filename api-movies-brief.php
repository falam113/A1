<?php
    require_once('config.inc.php');
    require_once('db-helpers.php');

    //move connection to helper file to clean up code
    $pdo = new PDO(DBCONNSTRING, DBUSER, DBPASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = getMovieSQLStatement();
    $id = null;
    $queryResult = null;
    $result = array();

    // send back either the entire movie DB info. or if an ?id is given, then only a single movie is returned.
    if (isset($_GET['id'])) {
        $statement = $pdo->prepare($sql);
        $statement->bindValue(":id", $_GET['id']);
        $statement->execute();
        $queryResult = $statement->fetchAll();

        foreach($queryResult as $row) {
            if ($row['id'] == $_GET['id']) {
                array_push($result, formatMovieRow($row));
            }
        }
    }
    else {
        $queryResult = $pdo->query($sql);
        while($row = $queryResult->fetch()) {
            array_push($result, formatMovieRow($row));
        }
    }

    $pdo = null;
    echo json_encode($result);
?>