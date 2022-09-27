  // PAGE INITIALIZER 

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
          url:"https://jobatrac.com/api/profile",
          type: "GET",
          headers: myHeaders,
          dataType: "json",
          success: function(value){
              console.log('value')
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
          //document.location.href ='login.html'
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
  
  
  
      // PAGE INITIALIZER END
  
      // FORM ERROR AND SUCCESS CALL FUNCTIONS
  
      function sucSave(){
          $('#success'+useRId).css("display", "block");
      }
      function errorSave(){
          $('#error'+useRId).css("display", "block");
      }
  
  
      function errorDelete(){
          $('.errorDelete').css("display","block");
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
  
  
  
         // VIEW EXPERIENCE PAGE HANDLERS
  
         $.ajax({
          url: 'https://jobatrac.com/api/type_of_contract',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              let wkCon = JSON.stringify(value);
             localStorage.setItem("fetchWkCon", wkCon)
          }
        })
        $.ajax({
          url: 'https://jobatrac.com/api/sectors',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              let wkSec = JSON.stringify(value);
             localStorage.setItem("fetchWkSec", wkSec)
          }
        })
        $.ajax({
          url: 'https://jobatrac.com/api/salary_expectations',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              let wkExp = JSON.stringify(value);
             localStorage.setItem("fetchWkExp", wkExp)
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
            let eduCities = JSON.stringify(value);
           localStorage.setItem("fetchCity", eduCities)
          }
      });
  
        
        $.ajax({
          url: 'https://jobatrac.com/api/types_of_companies',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              let wkCom = JSON.stringify(value);
             localStorage.setItem("fetchWkCom", wkCom)
          }
        })
        $.ajax({
          url: 'https://jobatrac.com/api/workforces',
          type: 'GET',
          headers: myHeaders,
          dataType: 'json',
          success: function(value){
              let wkWf = JSON.stringify(value);
             localStorage.setItem("fetchWkWf", wkWf)
          }
        })
  
      $.ajax({
          url: 'https://jobatrac.com/api/experience',
          type: 'GET',
          headers: myHeaders,
          dataType: "json",
          success: function(newdata){ var mes=0;
              $.each(newdata.data, function(index, value){
                  mes++;
                  
              if (mes > 2){
                  $('#last_appendForm').css("display", "block");
              }
  
              
                 
                  var useRId = value.id;
                  var job_type =  value.job_type.id_job_type;
                  var bdate =  value.beginning_date;
                  var edate =  value.ending_date;
                  var number_of_employees =  value.number_of_employees;
                  var sector =  value.sector.id_sector;
                  var salary_range =  value.salary_range.id_salary_expectation;
                  var other_state_city =  value.other_state_city;
                  var state_city =  value.State_city.id_city;
                  var name_of_employee =  value.name_of_employee;
                  var type_of_business =  value.type_of_business.id_type;
                  var current_job =  value.current_job;
                  var job_title =  value.job_title;
                //  var workForce =  value.job_title;
                  var employee_phone_number =  value.employee_phone_number;
                  if (value.employee_website_blog !== null) {
                      var employee_website_blog =  value.employee_website_blog;
                  }else{
                      var employee_website_blog =  '';
                  }
                  var description_of_duties_and_responsabilities =  value.description_of_duties_and_responsabilities;
                  var key_achievements =  value.key_achievements;
  
                  var dynaClass = 'inputs'+useRId;
                  
                  var beginning_date = changeDate(bdate);
                  var ending_date = changeDate(edate);
  
  
  
  
                  $('#expForm').append('<div class="billing-form-item" id="myexpForm'+useRId+'">' +
                  '<div class="billing-title-wrap">'+
                      '<h3 class="widget-title pb-0">'+ 'Work Experience' + '</h3>' +
                      '<div class="title-shape margin-top-10px">' + '</div>' +
                  '</div>' + 
                  '<div class="billing-content">' +
                      '<div class="contact-form-action">' +
                          '<form method="post" id="addExp">' +
                              '<div class="row">'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">'  +
                                          '<label class="label-text">' +  'Company Name' + '</label>' +
                                          '<div class="form-group">' +
                                              '<i class="la la-building-o form-icon">' + '</i>' +
                                              '<input disabled id="name_of_employee'+useRId+'" class="form-control company '+dynaClass+'" type="text" name="text" value="'+name_of_employee+'" required>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Job title' + '</label>' +
                                          '<div class="form-group">' +
                                              '<i class="la la-graduation-cap form-icon">' + '</i>' +
                                              '<input disabled id="job_title'+useRId+'" class="form-control jobTitle '+dynaClass+'" type="text" name="text" value="'+job_title+'" required >' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Date Form' + '</label>' +
                                          '<div class="form-group">' +
                                              '<i class="la la-calendar form-icon">' + '</i>' +
                                              '<input disabled id="beginning_date'+useRId+'" class="form-control '+dynaClass+'" type="date" name="text" value="'+beginning_date+'" required>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Date To' + '</label>'+
                                          '<div class="form-group">' +
                                              '<i class="la la-calendar form-icon">' + '</i>' +
                                              '<input disabled id="ending_date'+useRId+'" class="form-control '+dynaClass+'" type="date" name="text" value="'+ending_date+'" required>' +
                                          '</div>'+
                                      '</div>'+
                                  '</div>' +
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Job Type' + '</label>' +
                                          '<div class="form-group">' +
                                              '<select disabled id="job_type'+useRId+'" class="category-option-field form-control '+dynaClass+'" value="'+job_type+'" required>' +
                                              '</select>' +
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Business Type' + '</label>' +
                                          '<div class="form-group">' +
                                              '<select disabled id="type_of_business'+useRId+'" class="category-option-field form-control '+dynaClass+'" value="'+type_of_business+'" required>' +
                                                  
                                              '</select>' +
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Sector' +'</label>'+
                                          '<div class="form-group">' +
                                              '<select disabled id="sector'+useRId+'" class="category-option-field form-control '+dynaClass+'" value="'+sector+'" required>' +
                                           '</select>' +
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Salary Range'+'</label>'+
                                          '<div class="form-group">' +
                                              '<select disabled id="salary_range'+useRId+'" class="form-control '+dynaClass+'" value="'+salary_range+'">'+
                                             '</select>' +
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                     ' <div class="input-box">' +
                                          '<label class="label-text">' +'State' +'</label>' +
                                          '<div class="form-group">' +
                                          '<i class="la la-book form-icon">' + '</i>' +
                                              '<select id="state_location'+useRId+'" class="form-control degree '+dynaClass+'" value="'+state_city+'" disabled required>' +
                                               
                                              '</select>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' +
                                  '<div class="col-lg-6" id="optional'+useRId+'">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Location'+'</label>'+
                                          '<div class="form-group">' +
                                              '<i class="la la-map-marker form-icon">'+'</i>'+
                                              '<input disabled id="other_state_city'+useRId+'" class="form-control '+dynaClass+'" type="text" name="text" value="'+other_state_city+'" required>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Number of Employees'+'</label>'+
                                          '<div class="form-group">' +
                                              '<select disabled id="number_of_employees'+useRId+'" class="category-option-field form-control '+dynaClass+'" value="'+number_of_employees+'" >'+
                                                  
                                              '</select>' +
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Employers Phone Number'+'</label>'+
                                          '<div class="form-group">' +
                                              '<i class="la la-phone form-icon">'+'</i>'+
                                              '<input disabled id="employee_phone_number'+useRId+'" class="form-control '+dynaClass+'" type="text" name="text" value="'+employee_phone_number+'">'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-6">' +
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Employer Website'+'</label>'+
                                          '<div class="form-group">' +
                                              '<i class="la la-globe form-icon">'+'</i>'+
                                              '<input disabled id="employee_website_blog'+useRId+'" class="form-control '+dynaClass+'" type="text" name="text" value="'+employee_website_blog+'">'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-12">'+
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Description'+'</label>'+
                                          '<div class="form-group mb-0">'+
                                              '<span class="la la-pencil form-icon">'+'</span>'+
                                              '<textarea disabled id="description_of_duties_and_responsabilities'+useRId+'" class="message-control form-control '+dynaClass+'" name="responsibility'+dynaClass+'" placeholder="Brief description about relevant duties and responsibilities" value="'+description_of_duties_and_responsabilities+'"></textarea>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  '<div class="col-lg-12">'+
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Acheivements'+'</label>'+
                                          '<div class="form-group mb-0">'+
                                              '<span class="la la-pencil form-icon">'+'</span>'+
                                              '<textarea disabled id="key_achievements'+useRId+'" class="message-control form-control '+dynaClass+'" name="achievement'+dynaClass+'" placeholder="Summarize your key achievements in this role" value="'+key_achievements+'"></textarea>'+
                                          '</div>'+
                                      '</div>'+
                                  '</div>'+
                                  
                                  '<div class="col-lg-12">'+
                                      '<div class="input-box">' +
                                          '<label class="label-text">' + 'Current Job'+'</label>'+
                                          '<div class="custom-label">'+
                                              '<div id="current_job'+useRId+'" class="form-group mb-0 d-flex align-items-center '+dynaClass+'" value="'+current_job+'" required>'+
                                                  '<div class="label-wrap mr-3">'+
                                                      '<label class="label-container">'+
                                                          '<input  type="radio" name="radio" value="1" class="'+dynaClass+'" checked>'+
                                                          '<span class="label-mark">'+'</span>'+
                                                          'Yes'+
                                                      '</label>'+
                                                  '</div>'+
                                                  '<div class="label-wrap">'+
                                                      '<label class="label-container">'+
                                                          '<input  type="radio" name="radio" value="0" class="'+dynaClass+'" checked>'+
                                                          '<span class="label-mark">'+'</span>'+
                                                          'No'+
                                                      '</label>'+
                                                  '</div>'+
                                              '</div>'+
                                          '</div>'+
                                      '</div>'+
                                      
                                  '<div style="display: flex; justify-content: space-around;">' +
                                                                          
                                  '<div class="btn-box mt-4">' +
                                      '<button id="'+useRId+'" type= "button" class="theme-btn border-0 editInp" style="display:block">' +'<i class="la la-plus">' + '</i>' + 'Edit' + '</button>' +
                                      '<button id="'+dynaClass+'" type="button" class="theme-btn border-0 saveInp" style="display:none">' + '<i class="la la-plus">' + '</i>' + 'Save' + '</button>' +
                                  '</div>' +
                                  '<div class="btn-box mt-4">' +
                                      '<button id="delBtn'+dynaClass+'" type="button" class="theme-btn border-0 deleteInp">' + '<i class="la la-plus">' + '</i>' + 'Delete' + '</button>' +
                                  '</div>' +
                                  '</div>' +
                              '</div>' + 
                                  '</div>'+     
                                  '<div class="col-lg-12">'+
                                      '<p id="savePersonal'+useRId+'" style="margin-top: 35px; text-align:center; color: green; font-weight: 400; display: none;">Saved Succesfully!</p>'+
                                  '<div class="col-lg-12">'+
                                      '<p id="form-Error'+useRId+'" style="margin-top: 35px; text-align:center; color: red; font-weight: 400; display: none;"></p>'+
                                  '</div>'+
                                   
  
                              '</div>'+
                          '</form>'+
                      '</div>'+
                  '</div>'+
              '</div>')
  
              
              if(other_state_city == null){
                  $("#optional"+useRId).hide();
              }
  
              let wkCon = localStorage.getItem('fetchWkCon');
              let fetchWkCon = JSON.parse(wkCon);
              $.each(fetchWkCon.data, function(indexe, valuee){
                  $("#job_type"+useRId).append('<option value='+valuee.id_job_type+'>'+valuee.en_US+'</option>')
                  
                  if (valuee.id_job_type == job_type){
                      $("#job_type"+useRId).val(job_type).change();
                  }
  
              });
              let fetchCityA = localStorage.getItem('fetchCity');
              let fetchCity = JSON.parse(fetchCityA);
              $.each(fetchCity.data, function(indexd, valued){
                  $("#state_location"+useRId).append('<option value='+valued.id_city+'>'+valued.en_US+'</option>')
                  if(state_city == valued.id_city){
                      $("#state_location"+useRId).val(state_city)
                  }
              });
  
              let wkSec = localStorage.getItem('fetchWkSec');
              let fetchWkSec = JSON.parse(wkSec);
              $.each(fetchWkSec.data, function(indexe, valuee){
                  $("#sector"+useRId).append('<option value='+valuee.id_sector+'>'+valuee.en_US+'</option>')
                  if (valuee.id_sector == sector){
                      $("#sector"+useRId).val(sector).change();
                  }
              });
  
              let wkExp = localStorage.getItem('fetchWkExp');
              let fetchWkExp = JSON.parse(wkExp);
              $.each(fetchWkExp.data, function(indexe, valuee){
                  $("#salary_range"+useRId).append('<option value='+valuee.id_salary_expectation+'>'+valuee.en_US+'</option>')
  
                  if (valuee.id_salary_expectation == salary_range){
                      $("#salary_range"+useRId).val(salary_range).change();
                  }
              })
  
              let wkCom = localStorage.getItem('fetchWkCom');
              let fetchWkCom = JSON.parse(wkCom);
              $.each(fetchWkCom.data, function(indexe, valuee){
                  $("#type_of_business"+useRId).append('<option value='+valuee.id_company_type+'>'+valuee.en_US+'</option>')
                  if (valuee.id_company_type == type_of_business){
                      $("#type_of_business"+useRId).val(type_of_business).change();
                  }
              })
  
              let wkWf = localStorage.getItem('fetchWkWf');
              let fetchWkWf = JSON.parse(wkWf);
              $.each(fetchWkWf.data, function(indexe, valuee){
                  $("#number_of_employees"+useRId).append('<option value='+valuee.id_effectif+'>'+valuee.en_US+'</option>')
               
              })
  
           // enable for edit mode
           
           document.getElementsByName('achievement'+dynaClass)[0].value =key_achievements
           document.getElementsByName('responsibility'+dynaClass)[0].value =description_of_duties_and_responsabilities
           
           if (current_job == 1){
              ($("input:radio[value='1']."+dynaClass).prop("checked", true));
              ($("input:radio[value='0']."+dynaClass).prop("checked", false));
          }else{
              ($("input:radio[value='0']."+dynaClass).prop("checked", true));
              ($("input:radio[value='1']."+dynaClass).prop("checked", false));
          };
  
              $('button[id='+useRId+']').click(function(event){
                  event.preventDefault();
                  $('button[id='+useRId+']').css("display", "none");
                  $('button[id='+dynaClass+']').css("display", "block");
                  $('select[id='+useRId+']').removeAttr("disabled");
                  $('.'+dynaClass).removeAttr("disabled");
              });
  
              // enable for edit mode end
              
              $('#state_location'+useRId).change(function(){
                  var syst = $('#state_location'+useRId).find('option:selected').text();
                  if (syst === 'Others'){
                      $('#optional'+useRId).show()
                      $('#other_state_city'+useRId).val('')
                  }else{
                      $('#optional'+useRId).hide()
                      $('#other_state_city'+useRId).val('')
                      
                  }
              });
  
              // save edited education data to server
              $('button[id='+dynaClass+']').click(function(event){
                  event.preventDefault();
  
  
                  serBeginDate = $('#beginning_date'+useRId).val();
                  serEndDate = $('#ending_date'+useRId).val();
  
                 newBD = changeDateServer(serBeginDate);
                 newED = changeDateServer(serEndDate);
      
                      var saveexpForm = {
                           job_type:  $('#job_type'+useRId).val(),
                           beginning_date: newBD,
                           ending_date: newED,
                           number_of_employees:  $('#number_of_employees'+useRId).val(),
                           sector:  $('#sector'+useRId).val(),
                           salary_range: $('#salary_range'+useRId).val(),
                           other_state_city:  $('#other_state_city'+useRId).val(),
                           state_city: $('#state_location'+useRId).val(),
                           name_of_employee:  $('#name_of_employee'+useRId).val(),
                           type_of_business:  $('#type_of_business'+useRId).val(),
                           current_job:  $('#current_job'+useRId).val(),
                           job_title:  $('#job_title'+useRId).val(),
                           employee_phone_number:  $('#employee_phone_number'+useRId).val(),
                           employee_website_blog:  $('#employee_website_blog'+useRId).val(),
                           description_of_duties_and_responsabilities:  $('#description_of_duties_and_responsabilities'+useRId).val(),
                           key_achievements:  $('#key_achievements'+useRId).val(),
                           current_job: $("input:radio[name=radio]:checked").val(), 
                           reasons_for_leaving_the_post: 'none'
  
                      }
                                              
                      $.ajax({
                          url: 'https://jobatrac.com/api/experience/'+useRId,
                          type: "PUT",
                          headers: myHeaders,
                          data:  JSON.stringify(saveexpForm),
                          dataType: "json",
                          success: function(value){
                              $('#savePersonal'+useRId).css("display", "block");
                          }
                      
                      }).fail(function(){
                          if (response.status == 401 ){
                              document.location.href = 'login.html'
                          }else{
                            $('#form-Error'+useRId).css("display", "block");
                          }
                      });
  
                  });
                 
  
              // save edited education data to server end
  
              // delete education handler start
  
              $('#delBtn'+dynaClass).click(function(event){
                  event.preventDefault();
                  $.ajax({
                      url: `https://jobatrac.com/api/experience/${useRId}`,
                      type: 'DELETE',
                      headers: myHeaders,
                      dataType: "json",
                      success: function(response){
                          $('#myexpForm'+useRId).hide();
                      }
                  }).fail(function(){
                      errorDelete();
                  })
              })
  
              // delete education handler end
  
  
              })
               
          }
             
      }).fail(function(){
          console.log('why did you fail?')
      })
  
  
  
      // VIEW EDUCATION PAGE HANDLERS END
  });
  
  
  
  