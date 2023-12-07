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
        $('.login-btn').html('Log In').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.login-btn').html('Log In').attr('disabled', false);
    })
}