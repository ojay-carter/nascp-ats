
  let data = localStorage.getItem('userToken');
  let myData = JSON.parse(data);
  let myToken = myData.access_token;
  
  const myHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + myToken
  }

    $('#profileUser').text(myData.account.comptable.first_name);
      $.ajax({
          url:"https://jobatrac.com/api/profile",
          type: "GET",
          headers: myHeaders,
          dataType: "json",
          success: function(value){
             $('#userName4').text(value.data.compte.first_name +' '+ value.data.compte.last_name);
             $('#userName3').text(value.data.compte.first_name +' '+  value.data.compte.last_name);
             $('#userEmail4').text(value.data.email);
             $('#userEmail3').text(value.data.email);
             $('#appJobs').text(value.data.compte.number_of_applications);
             $('#savedJobs').text(value.data.compte.number_of_favorites);
             $('.userDP').attr("src", value.data.compte.profile_picture);
          }
      
      }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = 'login.html'
          }else{
            console.log("Failed to reach server")
          }
      });