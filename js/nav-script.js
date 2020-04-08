document.addEventListener("DOMContentLoaded", function() {
  displayNav();
});

//Function for showing nav when at small media size
function displayNav() {
  const topNav = document.querySelector("#topNav");
  if (topNav.className === "nav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "nav";
  }
}
