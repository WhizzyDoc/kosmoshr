//import { kosmos_get, kosmos_post } from './kosmosRequest.js';

function register() {
    let f_name = $('#f-name').val()
    let l_name = $('#l-name').val()
    let email = $('#email').val()
    let phone = $('#phone').val()
    let username = $('#reg-username').val()
    let name = $('#company_name').val()
    let pass = $('#reg-pass').val()
    let cpass = $('#cpass').val()
    if(cpass !== pass) {
        $('#cpass_err').html(`<i class="fa fa-lock"></i> Passwords do not match!`);
        return;
    }
    $('.register-btn').html('Creating Account').attr('disabled', true)
    let url = `${base_url}admins/create_admin_account/`
    const formData = new FormData();
    formData.append('first_name', f_name);
    formData.append('last_name', l_name);
    formData.append('email', email);
    formData.append('phone_number', phone);
    formData.append('company_name', name);
    formData.append('username', username);
    formData.append('password', pass);

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", `Account created successfully. Email has been sent to ${data.data.email}`, 'success')
            location.href = '#';
        }
        else if(data['status'] == 'error') {
            swal("Error", data['message'], 'error')
        }
        $('.register-btn').html('Create Account').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.register-btn').html('Create Account').attr('disabled', false)
    })
}

function authenticate() {
    $('.login-btn').html('Authenticating...').attr('disabled', true)
    let url = `${base_url}admins/authentication/`
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
        //console.log(data);
        if(data['status'] == 'success') {
            localStorage.setItem('api_key', data.data.api_token)
            if(data.data.image) {
                localStorage.setItem('dp', data.data.image)
            }
            localStorage.setItem('account', 'admin')
            localStorage.setItem('names', `${data.data.first_name} ${data.data.last_name}`);
            location.href = './admin.html'
        }
        else if(data['status'] == 'error') {
            $('#admin_err').html(`<i class="fa fa-warning"></i> ${data['message']}`)
            swal('Error', data['message'], "error")
        }
        $('.login-btn').html('Log In').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.login-btn').html('Log In').attr('disabled', false);
    })
}

function staffLogin() {
    $('.staff-login-btn').html('Authenticating...').attr('disabled', true)
    let url = `${base_url_2}login`
    const formData = JSON.stringify({
        user_id: $('#staff-username').val(),
        password: $('#staff-password').val()
    });

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        if(data['status'] == 'success') {
            localStorage.setItem('api_key', data.data.api_token)
            localStorage.setItem('account', 'staff')
            if(data.data.image) {
                localStorage.setItem('dp', data.data.image)
            }
            localStorage.setItem('position', data.data.position)
            localStorage.setItem('names', `${data.data.first_name} ${data.data.last_name}`);
            location.href = './employee.html'
            //console.log(localStorage.dp + ':' + typeof(localStorage.dp))
        }
        else {
            $('#staff_err').html(`<i class="fa fa-warning"></i> ${data['detail']}`)
        }
        $('.staff-login-btn').html('Log In').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.staff-login-btn').html('Log In').attr('disabled', false);
    })
}

function admin_logout() {
    let url = `${base_url}admins/admin_logout/`
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);

    fetch(url, {
        method:'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            localStorage.removeItem('api_key')
            localStorage.removeItem('account')
            localStorage.removeItem('names');
            localStorage.removeItem('dp');
            location.href = './index.html'
        }
        else if(data['status'] == 'error') {
            console.log(data)
            swal('Error', "Error occured", "error")
        }
    })
    .catch(err => {
        console.log(err);
        swal('Error', "Error occured", "error")
    })
}
function staff_logout() {
    localStorage.removeItem('api_key')
    localStorage.removeItem('account')
    localStorage.removeItem('names');
    localStorage.removeItem('dp');
    localStorage.removeItem('position')
    location.href = './index.html';
}
