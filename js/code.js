let movieTitle = "";

document.addEventListener("DOMContentLoaded", function() {
  // Default View Buttons
  movieTitle = localStorage.getItem("search-movie-title") || "";
  fetchAndDisplayMovieList(movieTitle);

  // Filter Panel Buttons
  document.querySelector("#clearButton").addEventListener("click", function() {
    fetchAndDisplayMovieList("");
    resetAllFilterValues();
  });

  document
    .querySelector("#filterButton")
    .addEventListener("click", handleFilters);

  document
    .querySelector("#hideFilterPanel")
    .addEventListener("click", function(e) {
      // source w3schools we use an attribute to track the state of the panel
      let val = e.target.getAttribute("val");
      if (val == "0") {
        document.querySelector(".filter-panel").style.height = 0;
        e.target.setAttribute("val", "1");
        e.target.innerHTML = "Show Filter Panel";
      } else {
        document.querySelector(".filter-panel").style.height = "100%";
        e.target.setAttribute("val", "0");
        e.target.innerHTML = "Hide Filter Panel";
      }
    });
});

// Main Function to perform all the filtering
function handleFilters() {
  let currentMovieList = getCurrentMovieList();
  // First always filter on movie title
  let movieTitle = document.querySelector("#movieTitle").value;
  if (movieTitle != "") {
    currentMovieList = filterMovieList(currentMovieList, movieTitle);
  }
  for (let radioButton of document.querySelectorAll('input[name="rb1"]')) {
    if (radioButton.checked) {
      if (radioButton.id.toLowerCase().includes("year")) {
        currentMovieList = filterByYear(currentMovieList, radioButton.id);
      } else {
        currentMovieList = filterByRating(currentMovieList, radioButton.id);
      }
    }
  }
  displayMovieList(currentMovieList);
}

function filterByYear(myList, id) {
  let movieList = [];
  id = "#" + id + "Value";
  if (id.toLowerCase().includes("after")) {
    let yearAfter = document.querySelector(id).value;
    for (let movie of myList) {
      let year = movie.release_date.substring(0, 4);
      if (year > yearAfter) {
        movieList.push(movie);
      }
    }
    return movieList;
  }
  if (id.toLowerCase().includes("before")) {
    let yearBefore = document.querySelector(id).value;
    for (let movie of myList) {
      let year = movie.release_date.substring(0, 4);
      if (year < yearBefore) {
        movieList.push(movie);
      }
    }
    return movieList;
  }
  if (id.toLowerCase().includes("between")) {
    let year1 = document.querySelector(id + "1").value;
    let year2 = document.querySelector(id + "2").value;
    for (let movie of myList) {
      let year = movie.release_date.substring(0, 4);
      if (year1 <= year && year <= year2) {
        movieList.push(movie);
      }
    }
    return movieList;
  }
}

function filterByRating(myList, id) {
  let movieList = [];
  id = "#" + id + "Value";
  if (id.toLowerCase().includes("above")) {
    let ratingAbove = document.querySelector(id).value;
    for (let movie of myList) {
      let rating = movie.Ratings.vote_average;
      if (rating > ratingAbove) {
        movieList.push(movie);
      }
    }
    return movieList;
  }
  if (id.toLowerCase().includes("below")) {
    let ratingBelow = document.querySelector(id).value;
    for (let movie of myList) {
      let rating = movie.Ratings.vote_average;
      if (rating < ratingBelow) {
        movieList.push(movie);
      }
    }
    return movieList;
  }
  if (id.toLowerCase().includes("between")) {
    let rating1 = document.querySelector(id + "1").value;
    let rating2 = document.querySelector(id + "2").value;
    for (let movie of myList) {
      let rating = movie.Ratings.vote_average;
      if (rating1 < rating && rating < rating2) {
        movieList.push(movie);
      }
    }
    return movieList;
  }
}

function show(shown, hidden, isgrid) {
  document.querySelector(shown).style.display = isgrid ? "grid" : "block";
  document.querySelector(hidden).style.display = "none";
}

function outputUpdate(num, id) {
  document.querySelector("#" + id).value = num;
}

function resetAllFilterValues() {
  document.querySelector("#movieTitle").value = "";
  document.querySelector("#beforeYearValue").value = 0;
  document.querySelector("#afterYearValue").value = 0;
  document.querySelector("#betweenYearValue1").value = 0;
  document.querySelector("#betweenYearValue2").value = 0;
  document.querySelector("#belowRatingValue").value = 5;
  document.querySelector("#aboveRatingValue").value = 5;
  document.querySelector("#betweenRatingValue1").value = 5;
  document.querySelector("#betweenRatingValue2").value = 5;
  document.querySelector("#output1").innerText = 5;
  document.querySelector("#output2").innerText = 5;
  document.querySelector("#output3").innerText = 5;
  document.querySelector("#output4").innerText = 5;
  for (let radio of document.querySelectorAll('input[name="rb1"]')) {
    radio.checked = false;
  }
}

function filterMovieList(myList, movieTitle) {
  matchinMovieList = [];
  for (let movie of myList) {
    if (movie.title.toLowerCase().includes(movieTitle.toLowerCase())) {
      matchinMovieList.push(movie);
    }
  }
  return matchinMovieList;
}

function showMovieList(myList, searchBoxValue) {
  matchinMovieList = [];
  for (let movie of myList) {
    if (movie.title.toLowerCase().includes(searchBoxValue.toLowerCase())) {
      matchinMovieList.push(movie);
    }
  }
  displayMovieList(matchinMovieList);
}

function displayMovieList(myList) {
  setCurrentMovieList(myList);
  const imgurl = "https://image.tmdb.org/t/p/w92";
  let movieTable = document.querySelector("#movieTable");
  movieTable.innerHTML = "";
  if (myList.length == 0) {
    movieTable.innerHTML = "No movies found";
    return;
  }
  let table = document.createElement("table");
  table.setAttribute("width", "100%");
  let th = document.createElement("th");
  let tr = document.createElement("tr");

  th.innerHTML = "Title";
  th.setAttribute("colspan", "2");
  th.id = "tableTitle";
  th.className = "pointer";
  tr.appendChild(th);
  th = document.createElement("th");
  th.className = "pointer";
  th.innerHTML = "Year";
  th.id = "tableYear";
  tr.appendChild(th);
  th = document.createElement("th");
  th.innerHTML = "Rating";
  th.className = "pointer";
  th.id = "tableRating";
  tr.appendChild(th);
  table.appendChild(tr);
  for (let movie of myList) {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let img = document.createElement("img");
    img.src = imgurl + movie.poster_path;
    img.id = movie.id;
    img.className = "pointer";
    td.appendChild(img);
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = movie.title;
    td.className = "pointer";
    td.id = movie.id;
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = movie.release_date.substr(0, 4);
    tr.appendChild(td);
    td = document.createElement("td");
    td.innerHTML = movie.Ratings.vote_average;
    tr.appendChild(td);
    table.appendChild(tr);
    td = document.createElement("td");
    td.innerHTML =
      '<button class="pointer" type ="button" id=' +
      movie.id +
      "> View</button>";
    tr.appendChild(td);
  }
  movieTable.appendChild(table);
  movieTable.addEventListener("click", function(e) {
    handleTableClickEvents(e);
  });
}

function handleTableClickEvents(e) {
  let currentMovieList = getCurrentMovieList();
  if (e.target && e.target.id == "tableTitle") {
    sortListByTitle(currentMovieList);
    displayMovieList(currentMovieList);
  }
  if (e.target && e.target.id == "tableYear") {
    sortListByRelease(currentMovieList);
    displayMovieList(currentMovieList);
  }
  if (e.target && e.target.id == "tableRating") {
    sortListByRating(currentMovieList);
    displayMovieList(currentMovieList);
  }
  // We need to allow clicking on title, img and button to go to next view
  if (
    e.target &&
    (e.target.nodeName.toLowerCase() == "button" ||
      e.target.nodeName.toLowerCase() == "img" ||
      (e.target.nodeName.toLowerCase() == "td" &&
        e.target.classList.contains("pointer")))
  ) {
    window.location.href = "single-movie.php?id=" + e.target.id;
  }
}

function fetchAndDisplayMovieList(filterTitle) {
  let allMovieList = JSON.parse(localStorage.getItem("all-movie-list")) || [];
  if (allMovieList.length == 0) {
    // start loading gif
    show(".loading", ".grid-container", false);
    const url = "api-movies-brief.php";
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        sortListByTitle(myJson);
        localStorage.setItem("all-movie-list", JSON.stringify(myJson));
        // stop loading gif
        show(".grid-container", ".loading", true);
        displayMovieList(filterMovieList(myJson, filterTitle));
      });
  } else {
    displayMovieList(filterMovieList(allMovieList, filterTitle));
  }
}

function sortListByRating(myList) {
  myList.sort(function(a, b) {
    if (a.Ratings.vote_average > b.Ratings.vote_average) {
      return -1;
    }
    if (a.Ratings.vote_average < b.Ratings.vote_average) {
      return 1;
    }
    return 0;
  });
}

function sortListByTitle(myList) {
  myList.sort(function(a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
}

function sortListByRelease(myList) {
  myList.sort(function(a, b) {
    if (a.release_date > b.release_date) {
      return -1;
    }
    if (a.release_date < b.release_date) {
      return 1;
    }
    return 0;
  });
}

function setCurrentMovieList(myList) {
  localStorage.setItem("current-movie-list", JSON.stringify(myList));
}

function getCurrentMovieList() {
  return JSON.parse(localStorage.getItem("current-movie-list")) || [];
}

function startSearch() {
  localStorage.setItem(
    "search-movie-title",
    document.querySelector("#movieName").value
  );
  window.location.href = "browse-movies.php";
}
