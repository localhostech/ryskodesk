export var rysko = {
  api: function(method, params, callback) {
    fetch("/api/"+method,
    {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, credentials: "same-origin"
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      callback(data.result);
    });
  }
}
