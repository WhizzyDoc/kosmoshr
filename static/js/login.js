function authenticate() {
    $('.login-btn').html('Authenticating...').attr('disabled', true)
    let url = `${base_url}profile/authentication/`
    const formData = new FormData();
    formData.append('username', $('#admin-username').val());
    formData.append('password', $('#admin-password').val());

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            localStorage.setItem('api_key', data.data.api_token)
            localStorage.setItem('account', 'admin')
            localStorage.setItem('names', `${data.data.first_name} ${data.data.last_name}`);
            location.href = './admin.html'
        }
        else if(data['status'] == 'error') {
            $('#admin_err').html(`<i class="fa fa-warning"></i> ${data['message']}`)
        }
        $('.login-btn').html('Log In').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.login-btn').html('Log In').attr('disabled', false);
    })
}

function staffLogin() {
    $('.login-btn').html('Authenticating...').attr('disabled', true)
    let url = `${base_url}`
    const formData = new FormData();
    formData.append('username', $('#staff-username').val());
    formData.append('password', $('#staff-password').val());

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            localStorage.setItem('api_key', data.data.api_token)
            localStorage.setItem('account', 'staff')
            localStorage.setItem('names', `${data.data.first_name} ${data.data.last_name}`);
            location.href = './staff.html'
        }
        else if(data['status'] == 'error') {
            $('#staff_err').html(`<i class="fa fa-warning"></i> ${data['message']}`)
        }
        $('.login-btn').html('Log In').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.login-btn').html('Log In').attr('disabled', false);
    })
}