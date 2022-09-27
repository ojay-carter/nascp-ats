let data = localStorage.getItem('userToken');
let myData = JSON.parse(data);
let myToken = myData.access_token;

const myHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + myToken
}

$(document).ready(function(){
    $.ajax({
        url:"https://ats.jdavprojects.com/api/profile",
        type: "GET",
        headers: myHeaders,
        dataType: "json",
        success: function(value){
           $('#userName4').text(value.data.compte.first_name +' '+ value.data.compte.last_name);
           $('#userName3').text(value.data.compte.first_name +' '+  value.data.compte.last_name);
           $('#userEmail4').text(value.data.email);
           $('#userEmail3').text(value.data.email);
           var getddate = value.data.compte.date_of_birth;

           var showDate = changeDate(getddate);
           
           $('#firstName').val(value.data.compte.first_name) ;
           $('#lastName').val(value.data.compte.last_name);
           $('#age').val(showDate);
           $('#phone').val(value.data.compte.mobile_number);
           $('#whatsapp').val(value.data.compte.whatsapp_number); 
           $('#gender').val(2);
           $('#nationality').val(2);
           $('#email').val(value.data.email);
           console.log(value.data.compte.network[0].account_url_or_username)
           console.log(value.data.compte.network[1].account_url_or_username)

           let profDat = JSON.stringify(value);
           localStorage.setItem("profdat", profDat)
        }
    
    }).fail(function(response){
        if (response.status == 401 ){
            document.location.href = 'login.html'
        }else{
          console.log("Failed to reach server")
        }
    });


    // PAGE INITIALIZER END

    // FORM ERROR AND SUCCESS CALL FUNCTIONS

  
    function changeDate(date){
        var bd = new Date (date);
        var bdDate = bd.getDate();
        var bdMonth = bd.getMonth();bdMonth++
        var bdYear = bd.getFullYear();
        if(bdDate < 10) {
            nbdDate = '0' + bdDate
        } else{
            nbdDate = bdDate
        }
    
        if(bdMonth < 10) {
            nbdMonth = '0' + bdMonth
        } else{
            nbdMonth =bdMonth
        }
        var newDate = bdYear + '-'+ nbdMonth + '-'+ nbdDate;
        return newDate;

    }

    function changeDateServer(date){
        var bd = new Date (date);
        var bdDate = bd.getDate();
        var bdMonth = bd.getMonth();bdMonth++
        var bdYear = bd.getFullYear();
        if(bdDate < 10) {
            nbdDate = '0' + bdDate
        } else{
            nbdDate = bdDate
        }
    
        if(bdMonth < 10) {
            nbdMonth = '0' + bdMonth
        } else{
            nbdMonth =bdMonth
        }
        var newDate = nbdDate + '/'+ nbdMonth + '/'+ bdYear;
        return newDate;

    }

    let prof = localStorage.getItem('profdat');
    let myProf = JSON.parse(prof);
    $('#genderlize').val(myProf.data.compte.gender.id_gender);
    $('#maritalStatuso').val(myProf.data.compte.civil_status.id_civility);
    $('#nationality').val(myProf.data.compte.nationality.id_country);
   // FORM ERROR AND SUCCESS CALL FUNCTIONS END
  

   //ADD EDUCATION PAGE FORM HANDLER

    $("#profileBtn").click(function(event){
        event.preventDefault();

         
          var chngDate = $('#age').val()
          var serveDate = changeDateServer(chngDate);

          var  sndProfForm = {
              first_name: $('#firstName').val(),
              last_name: $('#lastName').val(),
              age: serveDate,
              gender: $('#genderlize').val(),
              civil_status: $('#maritalStatuso').val(),
              nationality: $('#nationality').val()
          }
  


        
        $.ajax({
            url: "https://ats.jdavprojects.com/api/personal_details",
            type: "PUT",
            headers: myHeaders,
            data:  JSON.stringify(sndProfForm),
            dataType: "json",
            beforeSend: function(){
                $('#profileImg').show();
            },
            success: function(value){
              $('#profileImg').hide();
              $('#savePersonal').css("display", "block");
            }
        
        }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = 'login.html'
          }else{
            $('#form-Error').css("display", "block");
          }
      })

    });

    

    $("#contactBtn").click(function(event){
        event.preventDefault();

         

          var  sndConForm = {
              mobile_number: $('#phone').val(),
              whatsapp_number: $('#whatsapp').val(),
              email: $('#email').val(),
              website_blog: $('#website').val(),
              other_state: $('#state').val(),
              street_address: $('#address').val()
          }
  


        
        $.ajax({
            url: "https://ats.jdavprojects.com/api/contact_details",
            type: "PUT",
            headers: myHeaders,
            data:  JSON.stringify(sndConForm),
            dataType: "json",
            beforeSend: function(){
                $('#contactImg').show();
            },
            success: function(value){
                $('#contactImg').hide();
                $('#saveContact').css("display", "block");
              $.ajax({
                  url: "https://ats.jdavprojects.com/api/address_location",
                  type: "PUT",
                  headers: myHeaders,
                  data:  JSON.stringify(sndConForm),
                  dataType: "json",
                  success: function(res){
                      console.log('done')
                   //  $('#contactImg').hide();
                    //  $('#saveContact').css("display", "block");
                  }
              })
            }
        
        }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = 'login.html'
          }else{
            $('#contactForm-Error').css("display", "block");
          }
      })

    });
    

    $("#socialBtn").click(function(event){
        event.preventDefault();

         

          var  inForm = {
            social_network: 1,
            link: $('#linkedin').val(),
          }
          var  fbForm = {
            social_network: 2,
            link: $('#facebook').val(),
          }
  


        
        $.ajax({
            url: "https://ats.jdavprojects.com/api/social_network",
            type: "PUT",
            headers: myHeaders,
            data:  JSON.stringify(inForm),
            dataType: "json",
            beforeSend: function(){
                $('#socialImg').show();
            },
            success: function(value){
              $.ajax({
                  url: "https://ats.jdavprojects.com/api/social_network",
                  type: "PUT",
                  headers: myHeaders,
                  data:  JSON.stringify(fbForm),
                  dataType: "json",
                  success: function(res){
                    $('#socialImg').hide();
                      $('#saveSocial').css("display", "block");
                  }
              })
            }
        
        }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = 'login.html'
          }else{
            $('#socialForm-Error').css("display", "block");
          }
      })

    });


    $("#moreInfoBtn").click(function(event){
        event.preventDefault();

         

          var sndInfForm = {
              hobbies: $('#hobbies').val(),
              sports: $('#sports').val(),
          }
  


        
        $.ajax({
            url: "https://ats.jdavprojects.com/api/additional_information",
            type: "PUT",
            headers: myHeaders,
            data:  JSON.stringify(sndInfForm),
            dataType: "json",
            beforeSend: function(){
                $('#moreImg').show();
            },
            success: function(value){
                $('#moreImg').hide();
                $('#saveExperience').css("display", "block");
            }
        
        }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = 'login.html'
          }else{
            $('#experienceForm-Error').css("display", "block");
          }
      })

    });

  });