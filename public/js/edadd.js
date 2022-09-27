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
  
 // $(document).ready(function(){

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
             var robin = Math.floor(value.data.compte.profile_evaluation);
             

             $('.pro-evaluation').text(robin+'%');
             var evaluation = robin+'%';
             document.getElementById('apc').setAttribute('data-percent', evaluation);
             document.getElementById('apc-2').setAttribute('data-percent', evaluation);
             
             var profDat = JSON.stringify(value)
             localStorage.setItem("profdat", profDat);
          }
      
      }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = '/login-expired'
          }else{
            console.log("Failed to reach server")
          }
      });
  
      var prfdata = localStorage.getItem('profdat');
      myProfData = JSON.parse(prfdata);
                  
      var robin = Math.floor(myProfData.data.compte.profile_evaluation);
      var evaluation = robin+'%';
      document.getElementById('apc').setAttribute('data-percent', evaluation);
     document.getElementById('apc-2').setAttribute('data-percent', evaluation);



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

      var evaluationTxt = "You're almost done set 'Cover Image' field to increase your skill up to '15%'"
  
  
      // PAGE INITIALIZER END

      if ($('#specific-exp').length > 0){
        $('#add-others').hide()
        $.ajax({
            url: 'https://jobatrac.com/api/type_of_contract',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#job_type').append('<option value='+value.id_job_type+'>'+value.en_US+'</option>')
                    
                })
                
                    $('#state').change(function(){
                        var syst = $('#state').find('option:selected').text();
                        if (syst === 'Others'){
                            $('#add-others').show()
                            $('#add-others').append(
                            '<div class="input-box" id="others-check">' + 
                                '<label class="label-text">' + 'Location if others'+'</label>'+
                                '<div class="form-group">'+
                                    '<span class="la la-map-marker form-icon">'+'</span>'+
                                    '<input id="other_state_city" class="form-control" type="text" name="text" placeholder="Enter the location" required>'+
                                '</div>'+
                            ' </div>')
                        }else{
                            $('#add-others').empty()
                            $('#add-others').hide()
                            
                        }
                    });
            }
          })
          $.ajax({
            url: 'https://jobatrac.com/api/sectors',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#sector').append('<option value='+value.id_sector+'>'+value.en_US+'</option>')
                    
                })
            }
          })
          $.ajax({
            url: 'https://jobatrac.com/api/types_of_companies',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#type_of_business').append('<option value='+value.id_company_type+'>'+value.en_US+'</option>')
                    
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
                    $('#salary_range').append('<option value='+value.id_salary_expectation+'>'+value.en_US+'</option>')
                    
                })
            }
          })
          $.ajax({
            url: 'https://jobatrac.com/api/workforces',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#number_of_employees').append('<option value='+value.id_effectif+'>'+value.en_US+'</option>')
                    
                })
            }
          });

             
        $.ajax({
            url: 'https://jobatrac.com/api/cities',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#state').append('<option value='+value.id_city+'>'+value.en_US+'</option>')
                    
                })
            }
        });
      }

      if($('#specific-edu').length > 0){
        $('#add-others').hide()
        $.ajax({
          url: 'https://jobatrac.com/api/education_domains',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              $.each(value.data, function(index, value){
                  $('#areaOfStudy').append('<option value='+value.id_domain+'>'+value.en_US+'</option>')
                  
              });
                $('#areaOfStudy').change(function(){
                    var syst = $('#areaOfStudy').find('option:selected').text();
                    if (syst === 'Others'){
                        console.log('working')
                        $('#add-specific').show()
                        $('#add-specific').append(
                        '<div class="input-box" id="specific-check">' + 
                            '<label class="label-text">' + 'Specify Field of Study'+'</label>'+
                            '<div class="form-group">'+
                                '<span class="la la-book form-icon">'+'</span>'+
                                '<input id="others_course_of_study" class="form-control" type="text" placeholder="e.g. Chemical Engineering" required>'+
                            '</div>'+
                        ' </div>')
                    }else{
                        $('#add-specific').empty()
                        $('#add-specific').hide()
                        
                    }
            });
          }
        });
        $.ajax({
          url: 'https://jobatrac.com/api/education_levels',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              $.each(value.data, function(index, value){
                  $('#level').append('<option value='+value.id_education_level+'>'+value.en_US+'</option>')
                  
              })
          }
        });
        $.ajax({
          url: 'https://jobatrac.com/api/trainings',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              $.each(value.data, function(index, value){
                  $('#degree').append('<option value='+value.id_training+'>'+value.en_US+'</option>')
                  
              })
          }
        });

        
        $.ajax({
            url: 'https://jobatrac.com/api/cities',
            type: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#state_location').append('<option value='+value.id_city+'>'+value.en_US+'</option>')
                    
                })
                
                    $('#state_location').change(function(){
                        var syst = $('#state_location').find('option:selected').text();
                        if (syst === 'Others'){
                            $('#add-others').show()
                            $('#add-others').append(
                            '<div class="input-box" id="others-check">' + 
                                '<label class="label-text">' + 'Location (If obtained outside Nigeria)'+'</label>'+
                                '<div class="form-group">'+
                                    '<span class="la la-map-marker form-icon">'+'</span>'+
                                    '<input id="other_city" class="form-control" type="text" name="text" placeholder="Please specify the location" required>'+
                                '</div>'+
                            ' </div>')
                        }else{
                            $('#add-others').empty()
                            $('#add-others').hide()
                            
                        }
         });
            }
        });
            

      };

      if($('#specific-cert').length > 0){
        $('#add-others').hide()
        $.ajax({
            url: 'https://jobatrac.com/api/professional_domains',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#domain').append('<option value='+value.id_domain+'>'+value.en_US+'</option>')
                    
                })
                
                $('#domain').change(function(){
                    var syst = $('#domain').find('option:selected').text();
                    if (syst === 'Others'){
                        $('#add-others').show()
                        $('#add-others').append(
                        '<div class="input-box" id="others-check">' + 
                            '<label class="label-text">' + 'Other Professional Area'+'</label>'+
                            '<div class="form-group">'+
                                '<span class="la la-map-marker form-icon">'+'</span>'+
                                '<input id="other_area" class="form-control" type="text" name="text" placeholder="Enter the professional area.." required>'+
                            '</div>'+
                        ' </div>')
                    }else{
                        $('#add-others').empty()
                        $('#add-others').hide()
                        
                    }
                });
            }
          })
      };



      if($('#specific-skill').length > 0){
        $('#add-others').hide()
        $('#application_system').attr('disabled', 'disabled')
        $.ajax({
            url: 'https://jobatrac.com/api/computer_science_domains',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#knowledge_area').append('<option value='+value.id_computer_science_domain+'>'+value.en_US+'</option>')
                });
                
                $('#application_system').change(function(){
                    var syst = $('#application_system').find('option:selected').text();
                     if (syst === 'Others'){
                         $('#add-others').show()
                         $('#add-others').append(
                         '<div class="input-box" id="others-check">' + 
                             '<label class="label-text">' + 'Other Application'+'</label>'+
                             '<div class="form-group">'+
                                 '<span class="la la-external-link form-icon">'+'</span>'+
                                 '<input id="others" class="form-control" type="text" name="text" placeholder="Please specify application used" required>'+
                             '</div>'+
                        ' </div>')
                     }else{
                         $('#add-others').empty()
                         $('#add-others').hide()
                         
                     }
                 });
                $('#knowledge_area').change(function(){
                    $('#application_system').empty();
                    $('#add-others').empty();
                    $('#application_system').attr('disabled', 'disabled');
                    var selectedDomain = $('#knowledge_area').val()   
                        $.ajax({
                            url: `https://jobatrac.com/api/computer_science_domains/${selectedDomain}/tools`,
                            type: 'GET',
                            headers: myHeaders,
                            dataType: 'json',
                            success: function(value){
                                $('#application_system').attr('disabled', false)
                                $.each(value.data, function(index, value){
                                    $('#application_system').append('<option value='+value.id_tool+'>'+value.name+'</option>')
                                    
                                })
                            }
                        });
                        
                })
            }
          });
          

        $.ajax({
            url: 'https://jobatrac.com/api/software_levels',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                $.each(value.data, function(index, value){
                    $('#skillLevel').append('<option value='+value.id_software_level+'>'+value.en_US+'</option>')
                    
                })
            }
          });

      }
      // FORM ERROR AND SUCCESS CALL FUNCTIONS
  
    
      function errorSave(){
          $('#formError').css("display", "block");
      }
  
  
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
  
     // FORM ERROR AND SUCCESS CALL FUNCTIONS END
  
  
  
         //ADD EDUCATION PAGE FORM HANDLER END


         $("#eduForm").submit(function(event){
            event.preventDefault();
            $('#formError').text('')
    
             
        //var $degree_obtained= $('#degree_obtained')
              var beg_Date = $('#beginning_date').val()
              var end_Date = $('#ending_date').val()
              var begDate = changeDateServer(beg_Date);
              var endDate = changeDateServer(end_Date);

            
              let mish = new Date(beg_Date);
              let will = new Date(end_Date);
              if (mish >=  will) {
                $('#formError').text('Start date can not be later than end date')
              }else{
                if($('#others-check').length > 0){
                    var myEduForm = {
                        institution: $('#institution').val(),
                        beginning_date: begDate,
                        ending_date: endDate,
                        degree: $('#degree').val(),
                        level: $('#level').val(),
                        degree_obtained: $("input:radio[name=radio]:checked").val(), 
                        state_city: $('#state_location').val(),
                        other_city: $('#other_city').val(),
                        course_of_study: $('#areaOfStudy').val(),
                        others_course_of_study: $('#others_course_of_study').val(),
                    }
                }else{
                    var myEduForm = {
                        institution: $('#institution').val(),
                        beginning_date: begDate,
                        ending_date: endDate,
                        degree: $('#degree').val(),
                        level: $('#level').val(),
                        degree_obtained: $("input:radio[name=radio]:checked").val(), 
                        state_city: $('#state_location').val(),
                        course_of_study: $('#areaOfStudy').val(),
                        others_course_of_study: $('#others_course_of_study').val(),
                    }
                }

            
                $.ajax({
                    url: "https://jobatrac.com/api/educations",
                    type: "POST",
                    headers: myHeaders,
                    data:  JSON.stringify(myEduForm),
                    dataType: "json",
                    beforeSend: function(){
                        $('#loaderImg').show();
                    },
                    success: function(value){
                        $('#loaderImg').hide();
                        document.location.href = 'my-education'
                    }
                
                }).fail(function(response){
                    $('#loaderImg').hide();
                  if (response.status == 401 ){
                      document.location.href = '/login-expired'
                  }else{
                    $('#formError').text("Failed! Please try again later");
                  }
              })
              }
    
    
  
        });
    
    
         
         //ADD EXPERIENCE PAGE FORM HANDLER END
         $('#addExp').submit(function(event){
             event.preventDefault();
             $('#formError').text('')


             
            var beg_Date = $('#beginning_date').val()
            var end_Date = $('#ending_date').val()
            var begDate = changeDateServer(beg_Date);
            var endDate = changeDateServer(end_Date);

            let mish = new Date(beg_Date);
              let will = new Date(end_Date);
              if (mish >=  will) {
                $('#formError').text('Start date can not be later than end date')
              }else{
                    
                var expForm = {
                    job_type: $('#job_type').val(),
                    number_of_employees: $('#number_of_employees').val(),
                    sector: $('#sector').val(),
                    salary_range: $('#salary_range').val(),
                    other_state_city: $('#other_state_city').val(),
                    state_city: $('#state').val(),
                    job_title: $('#job_title').val(),
                    name_of_employee: $('#name_of_employee').val(),
                    type_of_business: $('#type_of_business').val(),
                    current_job: $("input:radio[name=radio]:checked").val(),
                    employee_phone_number: $('#employee_phone_number').val(),
                    employee_website_blog: $('#employee_website_blog').val(),
                    beginning_date: begDate,
                    ending_date: endDate,
                    description_of_duties_and_responsabilities: $('#description_of_duties_and_responsabilities').val(),
                    key_achievements: $('#key_achievements').val(),
                    reasons_for_leaving_the_post: 'none'
                 }

                    $.ajax({
                        url: "https://jobatrac.com/api/experience",
                        type: 'POST',
                        headers: myHeaders,
                        data: JSON.stringify(expForm),
                        dataType: "json",
                        beforeSend: function(){
                            $('#loaderImg').show();
                        },
                        success: function(value){
                           $('#loaderImg').hide();
                            document.location.href = 'my-experience'
                        }
                    
                    }).fail(function(response){
                       $('#loaderImg').hide();
                           if (response.status == 401 ){
                               document.location.href = '/login-expired'
                           }else{
                               $('#formError').text("Failed! Please try again later");
                           }
                    })
              }


         })


         $('#addCert').submit(function(event){
             event.preventDefault();
             $('#formError').text('')

             var beg_Date = $('#beginning_date').val()
             var end_Date = $('#ending_date').val()
             var begDate = changeDateServer(beg_Date);
             var endDate = changeDateServer(end_Date);
             
            let mish = new Date(beg_Date);
            let will = new Date(end_Date);
            if (mish >=  will) {
              $('#formError').text('Start date can not be later than end date')
            }else{

                var addCert = {
                    domain: $('#domain').val(),
                    others_domain: $('#other_area').val(),
                    title_of_qualification: $('#title_of_qualification').val(),
                    certification_obtained: $("input:radio[type=radio]:checked").val(),
                    beginning_date	: begDate,
                    ending_date: endDate,
                    short_description: $('#short_description').val()
                 }
    
                 $.ajax({
                     url: "https://jobatrac.com/api/certifications",
                     type: 'POST',
                     headers: myHeaders,
                     dataType: "json",
                     data: JSON.stringify(addCert),
                     beforeSend: function(){
                         $('#loaderImg').show();
                     },
                     success: function(){
                        $('#loaderImg').hide();
                         document.location.href = 'my-certification'
                     }
                 }).fail(function(response){
                    if (response.status == 401 ){
                        document.location.href = '/login-expired'
                    }else{
                        $('#formerror').css("display", "block");
                    }
                })
    
            }

         })

         $('#addLang').submit(function(event){
             event.preventDefault();
             $('#formError').hide();


             var addLang = {
                language: $('#language').val(),
                level: $('#level').val(),
             }

             $.ajax({
                 url: "https://jobatrac.com/api/language_skills",
                 type: 'POST',
                 headers: myHeaders,
                 dataType: "json",
                 data: JSON.stringify(addLang),
                 beforeSend: function(){
                     $('#loaderImg').show();
                 },
                 success: function(){
                    $('#loaderImg').hide();
                     document.location.href = 'language'
                 }
             }).fail(function(response){
                if (response.status == 401 ){
                    document.location.href = '/login-expired'
                }else if(response.status == 422){
                    $('#loaderImg').hide();
                    $('#formError').show();
                    $('#formError').text('Sorry you have already entered this language skill.');
                } else{
                    $('#loaderImg').hide();
                    $('#formError').show();
                    $('#formError').text('Failed! Please try again later');
                }
            })

         })

         $('#addSkill').submit(function(event){
             event.preventDefault();
             $('#formError').hide();
             if($('#others-check').length > 0){
                var addSkill = {
                    knowledge_area: $('#knowledge_area').val(),
                    level: $('#skillLevel').val(),
                    application_system: $('#application_system').val(),
                    other_application_system: $('#others').val(),
                    descr: $('#descr').val(),
                 }
    
             }else{
                var addSkill = {
                    knowledge_area: $('#knowledge_area').val(),
                    level: $('#skillLevel').val(),
                    application_system: $('#application_system').val(),
                    descr: $('#descr').val(),
                 }
    
             }


             

             $.ajax({
                url: "https://jobatrac.com/api/computer_skills",
                type: 'POST',
                headers: myHeaders,
                dataType: "json",
                data: JSON.stringify(addSkill),
                beforeSend: function(){
                    $('#loaderImg').show();
                },
                success: function(){
                   $('#loaderImg').hide();
                    document.location.href = 'skills'
                }
            }).fail(function(response){
               if (response.status == 401 ){
                   document.location.href = '/login-expired'
               }else if(response.status == 422){
                   $('#loaderImg').hide();
                   $('#formError').show();
                   $('#formError').text('Sorry you have already entered this skill.');
                   console.log('there is 422')
               } else{
                   $('#loaderImg').hide();
                   $('#formError').show();
                   $('#formError').text('Failed! Please try again later');
               }
           })
         })

         

//});