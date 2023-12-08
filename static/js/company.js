getSite();
function saveCompanyInfo() {
    let url = `${base_url}site/create_site_info/`;
    let title = $('#comp-name').val()
    let email = $('#comp-email').val()
    let address = $('#comp-address').val()
    let type = $('#comp-type').val()
    let phone = $('#comp-number').val()
    let numb = $('#comp-emp').val()
    let about = $('#comp-about').val()
    if(title.trim() === '' || email.trim() === '' || type.trim() === '') {
        swal("OOps", "Name, Email or Type cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('title', title)
    formData.append('phone', phone)
    formData.append('address', address)
    formData.append('email', email)
    formData.append('type', type)
    formData.append('about', about)
    formData.append('no_of_employees', numb)
    $('.comp-btn').html('Saving Info...').attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'Application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getSite()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
            getSite()
        }
        $('.comp-btn').html('Save Company Info').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.comp-btn').html('Save Company Info').attr('disabled', false)
    })
}