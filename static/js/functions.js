const base_url = `https://kosmoshr.pythonanywhere.com/api/v1/`

$(document).ready(function() {
    
})

/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//localStorage.removeItem('api_key')
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

function getSite() {
  let url = `${base_url}site/get_site_info/?api_token=${localStorage.api_key}`;
  fetch(url)
  .then(res => {return res.json()})
  .then(data => {
    //console.log(data);
    if(data['status'] == 'success') {
      if(data.data) {
        $('.site-title').html(data.data.title)
        $('title').html(data.data.title)
      }
      else {
        $('.site-title').html('Kosmos')
        $('title').html('Kosmos')
      }
    }
    else if(data['status'] == 'error') {
      $('.site-title').html('Kosmos')
      $('title').html('Kosmos')
    }
  })
  .catch(err => {console.log(err)})
}
getSite()