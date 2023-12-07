function getRecentTasks() {
    let url = `${base_url}tasks/get_tasks/?per_page=5`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.dash-task').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            let t = data.data;
            for(var i in t) {
                let deadline = new Date(t[i].deadline).toLocaleString();
                let temp = `<tr>
                <td>${t[i].description}</td>
                <td>${t[i].assigned_to.first_name} ${t[i].assigned_to.last_name}</td>
                <td>${deadline}</td>
                <td>${t[i].assigned_to.email}</td>
                <td><a href="#" class="task-det" data-id="${t[i].id}">Details</a></td>
              </tr>`;
              $('.dash-task').append(temp)
            }
        }
        else {
            let temp = `<tr>
            <td colspan="5">No recent tasks.</td>
            </tr>`;
            $('.dash-task').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `<tr>
            <td colspan="5">${data['message']}</td>
            </tr>`;
            $('.dash-task').append(temp)
      }
    })
    .catch(err => {console.log(err)})
  }
  function getTotalDept() {
    let url = `${base_url}departments/get_departments/`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.dept_no').html(data['total_items'])
      }
      else if(data['status'] == 'error') {
        $('.dept_no').html('0')
      }
    })
    .catch(err => {console.log(err)})
  }
  function getTotalEmp() {
    let url = `${base_url}employees/get_employees/`;
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
  function getPendQue() {
    let url = `${base_url}queries/get_queries/?addressed=false`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      if(data['status'] == 'success') {
        $('.query_no').html(data['total_items'])
      }
      else if(data['status'] == 'error') {
        $('.query_no').html('0')
      }
    })
    .catch(err => {console.log(err)})
  }


getTotalDept()
getTotalEmp()
getPendQue()
getRecentTasks()