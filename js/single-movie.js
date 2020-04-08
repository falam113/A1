document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.item6 img').addEventListener('click', function () {
        document.querySelector(".fullSizeImage").style.display ="block";
        document.querySelector(".grid-container1").style.display = "none";
    });

    document.querySelector('.fullSizeImage img').addEventListener('click', function () {
        document.querySelector(".fullSizeImage").style.display ="none";
        document.querySelector(".grid-container1").style.display = "grid";
    });
  });

// from w3schools 
function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.querySelectorAll(".tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.querySelector(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function addToFavorites(id) {
  const url = "addToFavorites.php?id=" + id;
  fetch(url)
    .then(response => {
      return response.json();
    })
    .then(myJson => {
        alert(myJson[0]['output']);

    });
}
