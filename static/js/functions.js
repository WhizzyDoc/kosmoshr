$(document).ready(function() {
    
})

/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    $(".sidenav").toggleClass('active');
    $("main").toggleClass('active');
  }
  var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}