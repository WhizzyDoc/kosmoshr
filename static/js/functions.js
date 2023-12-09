const base_url = `http://127.0.0.1:8000/api/v1/`

$(document).ready(function() {
    
})

/* Navigation bar */
/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
//localStorage.removeItem('api_key')
function openNav() {
    $(".sidenav").toggleClass('active');
    $("main").toggleClass('active');
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
        $('#comp-name').val(data.data.title)
        $('#comp-email').val(data.data.email)
        $('#comp-address').val(data.data.address)
        $('#comp-type').val(data.data.type)
        $('#comp-number').val(data.data.phone_number)
        $('#comp-emp').val(data.data.no_of_employees)
        $('#comp-about').val(data.data.about)
        $('.alert-note').css('display', 'none')
      }
      else {
        $('.site-title').html('Kosmos')
        $('title').html('Kosmos')
        $('.alert-note').css('display', 'block')
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