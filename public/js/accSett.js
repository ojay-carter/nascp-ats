
  let data = localStorage.getItem('userToken');
  let myData = JSON.parse(data);
  let myToken = myData.access_token;
  
  const myHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + myToken
  }
  
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
            $('.userDP').attr("src", value.data.compte.profile_picture);
            var profDat = JSON.stringify(value)
            localStorage.setItem("profdat", profDat);
          }
      
      }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = '/login-expired'
          }
      });


      var prfdata = localStorage.getItem('profdat');
      myProfData = JSON.parse(prfdata);

      
  $('#curEmail').val(myProfData.data.email)
                  
      var robin = Math.floor(myProfData.data.compte.profile_evaluation);
      var evaluation = robin+'%';
      $('.pro-evaluation').text(evaluation); 
      document.getElementById('apc').setAttribute('data-percent', evaluation);
     document.getElementById('apc-2').setAttribute('data-percent', evaluation);

     
     $.ajax({
        url: "https://jobatrac.com/api/certifications",
        headers: myHeaders,
        type: 'GET',
        dataType: 'json',
        success: function(newvalue){
            let certCount = 0;
            if (newvalue.data != []){
              $.each(newvalue.data, function(index, value){
                   certCount ++;
                  $('.cert-badge').text(certCount);
          })
          }
        }
    })



      let eduCount = 0;
      if(myProfData.data.compte.education != []){
          $.each(myProfData.data.compte.education, function(index,value){
              eduCount ++;
              $('.edu-badge').text(eduCount);
          })
      }

      let workCount = 0;
      if(myProfData.data.compte.experiences != []){
          $.each(myProfData.data.compte.experiences, function(index,value){
              workCount ++;
              $('.work-badge').text(workCount);
          })
      }

      let langCount = 0;
      if(myProfData.data.compte.language_skill != []){
          $.each(myProfData.data.compte.language_skill, function(index,value){
            langCount ++;
              $('.lang-badge').text(langCount);
          })
      }

      let skillCount = 0;
      if(myProfData.data.compte.computer_skill != []){
          $.each(myProfData.data.compte.computer_skill, function(index,value){
            skillCount ++;
              $('.comp-badge').text(skillCount);
          })
      }

$('#rityForm').submit(function(e){
    e.preventDefault();
    $('.notifs').text("")
    $('#pwImg').show();
    var v1= $('#newCurW').val();
    let vee2 = $('#repNewCurWord').val();
    if(v1 !== vee2) {
        $('#noMatchs').text("Passwords do not match");
        $('#pwImg').hide();
    }else{
        let myForm = {
            current_email: myData.account.email_address,
            current_password: $('#curWord').val(),
            new_password: $('#newCurW').val(),
            password_confirmation: $('#repNewCurWord').val()
        }

        $.ajax({
            url: 'https://jobatrac.com/api/security_setting',
            type: 'PUT',
            headers: myHeaders,
            typeof: "json",
            data: JSON.stringify(myForm),
            success: function(){
                $('#pwImg').hide();
                $('#saveWCur').text('Saved successfully');
            }
        }).fail(function(response){
            $('#pwImg').hide();
            if(response.status==401){
                document.location.href= '/login-expired'
            } else{
                $('#curWForm-Error').text('Your current password is incorrect');
            }
        })
    }
})

$('#ritiForm').submit(function(e){
    e.preventDefault();
    $('.notifs').text("")
    $('#emailImg').show();
        let myForme = {
            current_email: myData.account.email_address,
            current_password: $('#curWord2').val(),
            new_email: $('#newEmail').val(),
            email_confirmation: $('#newEmail').val(),
            password_confirmation: $('#curWord2').val()
        }

        $.ajax({
            url: 'https://jobatrac.com/api/security_setting',
            type: 'PUT',
            headers: myHeaders,
            typeof: "json",
            data: JSON.stringify(myForme),
            success: function(){
                $('#emailImg').hide();
                $('#saveEmail').text('Saved successfully');
            }
        }).fail(function(response){
            $('#emailImg').hide();
            if(response.status==401){
                document.location.href= '/login-expired'
            } else{
                $('#curEmail-Error').text('The password you entered is incorrect');
            }
        })
    
})
