// For Admin
function getRecentLogs() {
    let url = `${base_url}logs/get_logs/?api_token=${localStorage.api_key}&per_page=10`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.dash-task').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            let t = data.data;
            for(var i in t) {
                let date = new Date(t[i].date).toLocaleString();
                let temp = `<tr>
                <td><b>${t[i].user.first_name} ${t[i].user.last_name}</b> ${t[i].action}</td>
                <td>${date}</td>
                <td><a href="#" class="log-del" data-id="${t[i].id}">Delete</a></td>
              </tr>`;
              $('.dash-task').append(temp)
            }
        }
        else {
            let temp = `<tr>
            <td colspan="3">No recent activities.</td>
            </tr>`;
            $('.dash-task').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `<tr>
            <td colspan="3">${data['message']}</td>
            </tr>`;
            $('.dash-task').append(temp)
      }
    })
    .catch(err => {console.log(err)})
  }
  function getTotalDept() {
    let url = `${base_url}departments/get_departments/?api_token=${localStorage.api_key}`;
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
  function getPendQue() {
    let url = `${base_url}queries/get_queries/?api_token=${localStorage.api_key}&addressed=false`;
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
  getRecentLogs()

  // For Staff
  function getRecentTasks() {
    let url = `${base_url_2}logs/get_logs/?api_token=${localStorage.api_key}&per_page=10`;
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
      //console.log(data);
      $('.dash-task').empty()
      if(data['status'] == 'success') {
        if(data.data) {
            let t = data.data;
            for(var i in t) {
                let date = new Date(t[i].date).toLocaleString();
                let temp = `<tr>
                <td><b>${t[i].user.first_name} ${t[i].user.last_name}</b> ${t[i].action}</td>
                <td>${date}</td>
                <td><a href="#" class="log-del" data-id="${t[i].id}">Delete</a></td>
              </tr>`;
              $('.dash-task').append(temp)
            }
        }
        else {
            let temp = `<tr>
            <td colspan="3">No recent activities.</td>
            </tr>`;
            $('.dash-task').append(temp)
        }
      }
      else if(data['status'] == 'error') {
        let temp = `<tr>
            <td colspan="3">${data['message']}</td>
            </tr>`;
            $('.dash-task').append(temp)
      }
    })
    .catch(err => {console.log(err)})
  }
//getRecentTasks()

function getEmpPendingQ() {
  let url = `${base_url_2}query/${localStorage.api_key}`;
  fetch(url)
  .then(res => {return res.json()})
  .then(data => {
    console.log(data);
    $('.emp-dash-query').empty();
    if(data.length > 0) {
      let t = data
      for(var i in t) {
        if(t[i].addressed === false) {
          let date = new Date(t[i].date).toLocaleString();
          let temp = `<tr>
              <td><b>${t[i].title}</b></td>
              <td>${date}</td>
              <td><a href="#" class="que_det" data-id="${t[i].id}">Details</a></td>
            </tr>`;
            $('.emp-dash-query').append(temp)
        }  
      }
    }
    else {
      let temp = `<tr>
      <td colspan="3">No pending queries.</td>
      </tr>`;
      $('.emp-dash-query').append(temp)
    }
  })
  .catch(err => {console.log(err)})
}
getEmpPendingQ()