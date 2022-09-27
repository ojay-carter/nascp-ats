  // PAGE INITIALIZER 

  let data = localStorage.getItem('userToken');
  let myData = JSON.parse(data);
  let myToken = myData.access_token;
  
  const myHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + myToken
  }
  
  
 //document.getElementsByClassName('userDP').src = 'images/man.jpg';
  
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
          }
      
      }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = '/login-expired'
          }else{
            console.log("Failed to reach server")
          }
      });
      let prof = localStorage.getItem('profdat');
      let myProf = JSON.parse(prof);
      var robin = Math.floor(myProf.data.compte.profile_evaluation);
      var evaluation = robin+'%';
      
      $('.pro-evaluation').text(evaluation);   
      document.getElementById('apc').setAttribute('data-percent', evaluation);
      document.getElementById('apc-2').setAttribute('data-percent', evaluation);



      let eduCount = 0;
      if(myProf.data.compte.education != []){
          $.each(myProf.data.compte.education, function(index,value){
              eduCount ++;
              $('.edu-badge').text(eduCount);
          })
      }

      let workCount = 0;
      if(myProf.data.compte.experiences != []){
          $.each(myProf.data.compte.experiences, function(index,value){
              workCount ++;
              $('.work-badge').text(workCount);
          })
      }

      let langCount = 0;
      if(myProf.data.compte.language_skill != []){
          $.each(myProf.data.compte.language_skill, function(index,value){
            langCount ++;
              $('.lang-badge').text(langCount);
          })
      }

      let skillCount = 0;
      if(myProf.data.compte.computer_skill != []){
          $.each(myProf.data.compte.computer_skill, function(index,value){
            skillCount ++;
              $('.comp-badge').text(skillCount);
          })
      }

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


            
    function fineDate(date){
        var fDee = new Date(date);
        var day = fDee.getDate();
        //var mth = fDee.getMonth();
        var shortMonth = fDee.toLocaleString('en-us', { month: 'short' });
        var year = fDee.getFullYear();
        var showDate = shortMonth + ' ' + day + ', ' + year;
        return showDate;
    }

      $.ajax({
        url:"https://jobatrac.com/api/my_applications",
        type: "GET",
        headers: myHeaders,
        dataType: "json",
        success: function(value){
            if(value.data  == 0){
                $('.hideItem').hide();
                $('#noItem').text("You haven't applied for any jobs yet.");
            }
           $.each(value.data, function(index,value){
            var showD = fineDate(value.date);
               
               $('#favies').append('<tr id="dynaG'+value.id+'"">'+
               '<td>'+
                   '<div class="manage-candidate-wrap">'+
                       '<h2 class="widget-title pb-1">'+'<a href="/jobs/details?data='+ value.job_posting.slug +'"" class="color-text-2">'+value.job_posting.available_post+'</a>'+'</h2>'+
                       '<p class="mb-2">'+
                           '<span>'+'<i class="la la-map-marker font-size-16">'+'</i>'+value.job_posting.city_of_assignment.en_US+'</span>'+
                       '</p>'+
                   '</div>'+
               '</td>'+
               '<td>'+showD+'</td>'+
               '<td class="text-center">'+
                   '<div class="manage-candidate-wrap">'+
                       '<div class="bread-action pt-0">'+
                           '<ul class="info-list">'+
                               '<li class="d-inline-block">'+'<a href="/jobs/details?data='+ value.job_posting.slug +'"" >'+'<i class="la la-eye" data-toggle="tooltip" data-placement="top" title="View">'+'</i>'+'</a>'+'</li>'+
                               '<li id="dyna'+value.id+'"" class="d-inline-block">'+'<a href="#">'+'<i class="la la-trash" data-toggle="tooltip" data-placement="top" title="Remove">'+'</i>'+'</a>'+'</li>'+
                           '</ul>'+
                       '</div>'+
                   '</div>'+
               '</td>'+
           '</tr>')
           $('#dyna'+value.id).click(function(){
               $.ajax({
                url: `https://jobatrac.com/api/my_applications/${value.id}/destroy`,
                type: 'DELETE',
                headers: myHeaders,
                dataType: "json",
                success: function(){
                    $(`#dynaG${value.id}`).hide();
                }
               })
           })
           })
        }
    
    }).fail(function(response){
        if (response.status == 401 ){
            document.location.href = '/login-expired'
        }else{
          console.log("Failed to reach server")
        }
    });
