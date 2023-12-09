function getEmployees() {
    let page = $('#emp_page').val();
    let per_page = 20
    let search = $('#emp_search').val()

    let url = `${base_url}employees/get_employees/?api_token=${localStorage.api_key}&page=${page}&per_page=${per_page}&search=${search}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      console.log(data);
      $('.emp-list').empty()
      if(data['status'] == 'success') {
        $('.emp-no').html(data['total_items'])
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].title} ${e[i].first_name} ${e[i].last_name}</div>
                <span class="w-text-grey">${e[i].email}<span>
                </td>
                <td>${e[i].id_no}</td>
                <td>${e[i].department.title}</td>
                <td>${e[i].position.title}</td>
                <td>${e[i].phone_number}</td>
                <td><a href="#" class="log-del" data-id="${e[i].id_no}">Details</a></td>
              </tr>`;
              $('.emp-list').append(temp)
            }
        }
        else {
            let temp = `<tr>
            <td colspan="6">No employees found.</td>
            </tr>`;
            $('.emp-list').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        $('.emp-no').html('0');
        let temp = `<tr>
            <td colspan="6">${data['message']}</td>
            </tr>`;
            $('.emp-list').append(temp)
      }
    })
    .catch(err => {console.log(err)})
}
getEmployees()