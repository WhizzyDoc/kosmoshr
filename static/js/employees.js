function getDepartments() {
    let url = `${base_url}departments/get_departments/?api_token=${localStorage.api_key}&per_page=1000`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.depts').empty()
      $('.dept-filter').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `<option value="${d[i].id}">${d[i].title}</option>`;
                $('.depts').append(temp)
                $('.dept-filter').append(temp)
                $('.depts2').append(temp)
            }
            $('.dept-filter').prepend(`<option value="" selected>All Department</option>`)
        }
        else {
            $('.depts').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.depts').append(data.message)
      }
      $('.depts').prepend(`<option selected>Select Department</option>`)
    })
    .catch(err => {console.log(err)})
  }
  getDepartments();

  function getPositions() {
    let url = `${base_url}positions/get_positions/?api_token=${localStorage.api_key}&per_page=1000`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.positions').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            d = data.data
            for(var i in d) {
                var temp = `<option value="${d[i].id}">${d[i].title}</option>`;
                $('.positions').append(temp)
                $('.positions2').append(temp)
            }
        }
        else {
            $('.positions').append(data.message)
        }
      }
      else if(data['status'] == 'error') {
        $('.positions').append(data.message)
      }
      $('.positions').prepend(`<option selected>Select Position</option>`)
    })
    .catch(err => {console.log(err)})
  }

  function getTotalEmp() {
    let url = `${base_url}employees/get_employees/?api_token=${localStorage.api_key}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.emp_no').html(data['total_items'])
      }
      else if(data['status'] == 'error') {
        $('.emp_no').html('0')
      }
    })
    .catch(err => {console.log(err)})
  }

function getEmployees() {
    let page = $('#emp_page').val();
    let per_page = $('#emp_per_page').val();
    if(per_page < 5) {
        swal("Oops!", "List per page cannot be less than 5", "warning")
        per_page = 5
    }
    let search = $('#emp_search').val();
    let sort_by = $('.sort-filter').val();
    let dept_id = ""
    let dept = $('.dept-filter').val();
    if(dept.trim() !== "") {
        dept_id = `&department_id=${dept}`
    }
    let url = `${base_url}employees/get_employees/?api_token=${localStorage.api_key}&page=${page}&per_page=${per_page}&sort_by=${sort_by}&search=${search}${dept_id}`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.emp-list').empty()
      if(data['status'] == 'success') {
        let pages = data.total_pages
        $('.emp-no').html(data['total_items'])
        $('.page_nos').empty();
        for(var i=0; i<pages; i++) {
            let classN = "";
            if((i+1) == data.page_number) {
                classN = "active"
            }
            if((i+1) > (data.page_number + 1) || (i+1) < (data.page_number - 1)) {
                continue
            }
            var temp = `<a href="#" class="page_no ${classN}" data-id="${i+1}">${i+1}</a>`;
            $('.page_nos').append(temp);
        }
        let current_p = $('.page_no.active').data('id')
        //console.log(current_p + ":" + typeof(current_p))
        if((current_p - 1) > 0) {
            let prev = `<a href="#" class="page_no" data-id="${current_p - 1}"><i class="fa fa-angle-left"></i></a>`
            $('.page_nos').prepend(prev);
        }
        if((current_p + 1) <= data.total_pages) {
            let next = `<a href="#" class="page_no" data-id="${current_p + 1}"><i class="fa fa-angle-right"></i></a>`
            $('.page_nos').append(next);
        }
        $('.page_no').click(function(e) {
            e.preventDefault();
            let page = $(this).data('id');
            $('#emp_page').val(page);
            getEmployees();
        })
        if(data.data) {
            let e = data.data;
            for(var i in e) {
                let temp = `<tr>
                <td>
                <div class="w-bold-xx w-text-indigo">${e[i].first_name} ${e[i].last_name}</div>
                <span class="w-text-grey">${e[i].email}<span>
                </td>
                <td>${e[i].id_no}</td>
                <td>${e[i].department.title}</td>
                <td>${e[i].position.title}</td>
                <td>${e[i].phone_number}</td>
                <td>
                <a href="#" class="emp-det-link" data-id="${e[i].id_no}"><i class="fa fa-edit"></i> Profile</a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" class="emp-rep-link" data-id="${e[i].id_no}"><i class="fa fa-file-o"></i> Report</a>
                </td>
              </tr>`;
              $('.emp-list').append(temp)
            }
            $('.emp-det-link').click(function(e) {
                e.preventDefault();
                let id_no = $(this).data('id');
                $('.emp_det_con').addClass('active')
                getPositions();
                getDepartments();
                getEmployeeDetails(id_no);
            })
            $('.emp-rep-link').click(function(e) {
                e.preventDefault();
                let id_no = $(this).data('id');
                $('.emp_rep_con').addClass('active')
                getEmployeeReport(id_no);
            })
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

function addEmployee() {
    let url = `${base_url}admins/create_employee_account/`;
    let fname = $('#emp-fname').val()
    let lname = $('#emp-lname').val()
    let email = $('#emp-email').val()
    let phone = $('#emp-number').val()
    let position = $('#emp-position').val()
    let dept = $('#emp-dept').val()
    let salary = $('#emp-salary').val()
    let appoint = $('#emp-appoint').val()

    if(fname.trim() === '' || email.trim() === '' || lname.trim() === '') {
        swal("OOps", "First Name, Last Name or Email cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('first_name', fname)
    formData.append('last_name', lname)
    formData.append('phone_number',phone)
    formData.append('email', email)
    formData.append('salary', salary)
    formData.append('position', position)
    formData.append('department', dept)
    formData.append('appointment_date', appoint)

    $('.emp-add-btn').html('Adding Employee...').attr('disabled', true)
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
            getEmployees();
            $('#add-emp-form')[0].reset()
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-add-btn').html('Add Employee').attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.emp-add-btn').html('Add Employee').attr('disabled', false)
    })
}

function getEmployeeDetails(id) {
    let url = `${base_url}employees/get_employee/?employee_id=${id}`
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data)
        if(data['status'] == 'success') {
            e = data.data;
            $('#emp-fname2').val(e.first_name)
            $('#emp-lname2').val(e.last_name)
            $('#emp-mname2').val(e.middle_name)
            $('#emp-id2').val(e.id_no)
            $('#emp-email2').val(e.email)
            $('#emp-number2').val(e.phone_number)
            $('#emp-salary2').val(e.salary)
            $('#emp-address2').val(e.address)
            $('#emp-city2').val(e.city)
            $('#emp-state2').val(e.state)
            $('#emp-nation').val(e.nationality)
            $('#emp-appoint2').val((e.appointment_date))
            $('#emp-dob2').val((e.date_of_birth))
            if(e.image) {
                $('.emp_image').attr('src', `${base_image_url}${e.image}`)
            }
            else {
                $('.emp_image').attr('src', `./static/image/avatar.png`)
            }
            $('#emp-position2').val(e.position.id)
            $('#emp-dept2').val(e.department.id)
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function getEmployeeReport(id) {
    let url = `${base_url}employees/get_employee_report/?employee_id=${id}`
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        console.log(data)
        if(data['status'] == 'success') {
            p = data.profile,
            t = data.data,
            $('.emp_names').html(`${p.first_name} ${p.last_name}`)
            $('.emp_pos').html(`${p.position.title}`)
            $('.emp_dep').html(`${p.department.title}`)
            let dp = `./static/image/avatar.png`
            if(p.image) {
                dp = `${base_image_url}${p.image}`;
            }
            $('.emp_rep_dp').attr('src', dp)
        }
        else if(data['status'] == 'error') {
            swal('Error', data['message'], 'error')
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function editEmployee() {
    let url = `${base_url}employees/edit_employee/`;
    let staff_id = $('#emp-id2').val()
    //console.log(staff_id)
    let fname = $('#emp-fname2').val()
    let lname = $('#emp-lname2').val()
    let mname = $('#emp-mname2').val()
    let email = $('#emp-email2').val()
    let phone = $('#emp-number2').val()
    let position = $('#emp-position2').val()
    let dept = $('#emp-dept2').val()
    let address = $('#emp-address2').val()
    let city = $('#emp-city2').val()
    let state = $('#emp-state2').val()
    let nation = $('#emp-nation').val()
    let salary = $('#emp-salary2').val()
    let appoint = $('#emp-appoint2').val()
    let dob = $('#emp-dob2').val()


    if(fname.trim() === '' || email.trim() === '' || lname.trim() === '') {
        swal("OOps", "First Name, Last Name or Email cannot be empty", "warning");
        return;
    }
    const formData = new FormData();
    formData.append('api_token', localStorage.api_key);
    formData.append('employee_id', staff_id)
    formData.append('first_name', fname)
    formData.append('last_name', lname)
    formData.append('middle_name', mname)
    formData.append('phone_number',phone)
    formData.append('email', email)
    formData.append('salary', salary)
    formData.append('position', position)
    formData.append('department', dept)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('nation', nation)
    formData.append('appointment_date', appoint)
    formData.append('date_of_birth', dob)

    $('.emp-edit-btn').html('Saving...').attr('disabled', true)
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(res => {return res.json()})
    .then(data => {
        //console.log(data);
        if(data['status'] == 'success') {
            swal("Success", data.message, 'success')
            getEmployeeDetails(staff_id)
            getEmployees();
        }
        else if(data['status'] == 'error') {
            swal("Error", data.message, 'error')
        }
        $('.emp-edit-btn').html(`<i class="fa fa-check-circle"></i> Save Profile`).attr('disabled', false)
    })
    .catch(err => {
        console.log(err);
        $('.emp-add-btn').html(`<i class="fa fa-check-circle"></i> Save Profile`).attr('disabled', false)
    })
}
