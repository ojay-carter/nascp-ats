
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
             $('.userDP').attr("src", value.data.compte.profile_picture);
             let profDat = JSON.stringify(value);
             localStorage.setItem("profdat", profDat);
          }
      
      }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = '/login-expired'
          }else{
            console.log("Failed to reach server")
          }
      });

     var prof = localStorage.getItem("profdat");
     var myProf = JSON.parse(prof);

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

     var tidem = myProf.data.compte.job_type;
      

         
$.ajax({
  url: 'https://jobatrac.com/api/job_levels',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#job_level').append('<option value='+value.id_statut+'>'+value.en_US+'</option>')      
          if(myProf.data.compte.job_level != []){
            $.each(myProf.data.compte.job_level, function(index,value){
                $("#job_level option[value="+value.id_statut+"]").attr('selected',true);
              })
         }
          
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/functions',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#functions').append('<option value='+value.id_function+'>'+value.en_US+'</option>')  
          if(myProf.data.compte.fonction != []){
            $.each(myProf.data.compte.fonction, function(index,value){
                $("#functions option[value="+value.id_function+"]").attr('selected',true);
              })
         }
          
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/experiences',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#experience').append('<option value='+value.id_experience+'>'+value.en_US+'</option>')
          if(myProf.data.compte.experience != null){
                $("#experience option[value="+myProf.data.compte.experience.id_experience+"]").attr('selected',true);   
         }
          
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/sectors',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#sectors').append('<option value='+value.id_sector+'>'+value.en_US+'</option>')
          if(myProf.data.compte.sector != []){
            $.each(myProf.data.compte.sector, function(index,value){
                $("#sectors option[value="+value.id_sector+"]").attr('selected',true);
              })
         };
          
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/type_of_contract',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#job_type').append('<option value='+value.id_job_type+'>'+value.en_US+'</option>')
          if(tidem != []){
            $.each(tidem, function(index,value){
                $("#job_type option[value="+value.id_job_type+"]").attr('selected',true);
              })
         }
          
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/disponibilities',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#advance_notice').append('<option value='+value.id_disponibility+'>'+value.en_US+'</option>')
          
     if(myProf.data.compte.advance_notice != null){
      $("#advance_notice option[value="+myProf.data.compte.advance_notice.id_disponibility+"]").attr('selected',true);
}
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/mobilities',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#mobilities').append('<option value='+value.id_mobility+'>'+value.en_US+'</option>')
            
      if(myProf.data.compte.mobilities != []){
        $.each(myProf.data.compte.mobilities, function(index,value){
            $("#mobilities option[value="+value.id_mobility+"]").attr('selected',true);
          })
     }
      })
  }
})
$.ajax({
  url: 'https://jobatrac.com/api/salary_expectations',
  type: 'GET',
  headers: myHeaders,
  dataType: 'json',
  success: function(value){
      $.each(value.data, function(index, value){
          $('#salary_expectation').append('<option value='+value.id_salary_expectation+'>'+value.en_US+'</option>')
          
     if(myProf.data.compte.salary_expectation != null){
      $("#salary_expectation option[value="+myProf.data.compte.salary_expectation.id_salary_expectation+"]").attr('selected',true);
}
      })
  }
})
        
        $('#jobInt').submit(function(event){
            event.preventDefault();

            var addInt = {
                job_level: $('#job_level').val(),
                functions: $('#functions').val(),
               sectors: $("#sectors").val(),
               experience: $('#experience').val(),
               job_type: $('#job_type').val(),
               advance_notice: $('#advance_notice').val(),
               mobilities: $('#mobilities').val(),
               salary_expectation: $('#salary_expectation').val()
            }

            $.ajax({
                url: "https://jobatrac.com/api/job_interest",
                type: 'PUT',
                headers: myHeaders,
                dataType: "json",
                data: JSON.stringify(addInt),
                beforeSend: function(){
                    $('#loaderImg').show();
                },
                success: function(){
                   $('#loaderImg').hide();
                   $('#succesSaved').text('Saved Succesfully!');
                }
            }).fail(function(response){
               if (response.status == 401 ){
                   document.location.href = '/login-expired'
               }else{
                $('#loaderImg').hide();
                $('#formError').text("Failed! Please try again later");
               }
           })

        })