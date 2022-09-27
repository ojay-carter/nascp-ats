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
  
  
         // VIEW CERTIFICATION PAGE HANDLERS
         $.ajax({
            url: 'https://jobatrac.com/api/professional_domains',
            type: 'GET',
            headers: myHeaders,
            dataType: 'json',
            success: function(value){
                let certDomain = JSON.stringify(value);
               localStorage.setItem("fetchCert", certDomain)
            }
          })
  
      $.ajax({
          url: 'https://jobatrac.com/api/certifications',
          type: 'GET',
          headers: myHeaders,
          dataType: "json",
          success: function(newdata){ var mes=0;
              $.each(newdata.data, function(index, value){
                  mes++;
                  
              if (mes > 1){
                  $('#last_appendForm').css("display", "block");
              }
  
              
                 
                  var useRId = value.id;
                  var title_of_qualification =  value.title_of_qualification;
                  var bdate =  value.beginning_date;
                  var edate =  value.ending_date;
                  var domain =  value.professional_domain.id_domain ;
                  var others_domain =  value.others_domain;
                  var short_description =  value.short_description;
                  var certification_obtained =  value.certification_obtained;
  
                  var dynaClass = 'inputs'+useRId;
  
                  
                  var beginning_date = changeDate(bdate);
                  var ending_date = changeDate(edate);
  
  
  
  
                  $('#certiForm').append('<div class="billing-form-item" id="mycertForm'+useRId+'">' +
                         ' <div class="billing-title-wrap">' +
                              '<h3 class="widget-title pb-0" ">' + 'Certification &amp; Training' + '</h3>' +
                              '<div class="title-shape margin-top-10px">' + '</div>' +
                            '</div>' +
                          '<div class="billing-content pb-3" >' +
                              '<div class="contact-form-action">' +
                                  '<form method="post" id="addCert" >' +
                                      '<div class="row">' +
                                          '<div class="col-lg-6">' +
                                              '<div class="input-box">' +
                                                  '<label class="label-text">' + 'Title Of Certification' +'</label>' +
                                                  '<div class="form-group">' +
                                                      '<i class="la la-building-o form-icon">' + '</i>' +
                                                     ' <input id="title_of_qualification'+useRId+'" class="form-control '+dynaClass+'" type="text" name="text" value="'+title_of_qualification+'" disabled required>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                          '<div class="col-lg-6">' +
                                              '<div class="input-box">' +
                                                  '<label class="label-text">' + 'Professional Area'+ '</label>' +
                                                  '<div class="form-group">' +
                                                  '<i class="la la-building-o form-icon">' + '</i>' +
                                                      '<select id="domain'+useRId+'" class="form-control qualification-tag-option-field '+dynaClass+'" value="'+domain+'" disabled required>' +

                                                      '</select>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                          '<div class="col-lg-6" id="optional'+useRId+'">' +
                                              '<div class="input-box">' +
                                                  '<label class="label-text">' + 'Other Professional Area'+'</label>'+
                                                  '<div class="form-group">' +
                                                      '<i class="la la-map-marker form-icon">'+'</i>'+
                                                      '<input disabled id="other_area'+useRId+'" class="form-control '+dynaClass+'" type="text" name="text" value="'+others_domain+'" required>'+
                                                  '</div>'+
                                              '</div>'+
                                          '</div>'+
                                          '<div class="col-lg-6">' +
                                              '<div class="input-box">' +
                                                  '<label class="label-text">' + 'From' + '</label>' +
                                                  '<div class="form-group">' +
                                                      '<i class="la la-calendar form-icon">' + '</i>' +
                                                      '<input id="beginning_date'+useRId+'" class="form-control '+dynaClass+'" type="date" name="date" value="'+beginning_date+'" disabled required>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                          '<div class="col-lg-6">' +
                                              '<div class="input-box">' +
                                                  '<label class="label-text">' + 'To' + '</label>' +
                                                  '<div class="form-group">' +
                                                      '<i class="la la-calendar form-icon">'+'</i>' +
                                                      '<input id="ending_date'+useRId+'" class="form-control '+dynaClass+'" type="date" name="date" value="'+ending_date+'" disabled required>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' + 
                                       
                                          '<div class="col-lg-12">' +
                                              '<div class="input-box">' +
                                                  '<label class="label-text">' + 'Short Description' + '</label>' +
                                                  '<div class="form-group mb-0">' +
                                                      '<span class="la la-pencil form-icon">' + '</span>' +
                                                      '<textarea id="short_description'+useRId+'" class="message-control form-control '+dynaClass+'" name="messageDesc'+dynaClass+'" value="'+short_description+'" disabled>'+'</textarea>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +   
                                      '<div class="col-lg-12">' +
                                          '<div class="input-box">' +
                                              '<label class="label-text">' + 'Obtained' + '</label>' +
                                              '<div class="custom-label">' +
                                                  '<div id="certification_obtained'+useRId+'" class="form-group mb-0 d-flex align-items-center '+dynaClass+'" value="'+certification_obtained+'" required>' +
                                                      '<div  class="label-wrap mr-3">' +
                                                          '<label class="label-container">' +
                                                              '<input type="radio" name="radio" value="1" class="'+dynaClass+'" checked>' +
                                                              '<span class="label-mark">' + '</span>' +
                                                              'Yes' 
                                                          + '</label>' +
                                                      '</div>' +
                                                      '<div class="label-wrap">' +
                                                          '<label class="label-container">' +
                                                              '<input type="radio"  name="radio" value="0" class="'+dynaClass+'" checked>' +
                                                              '<span class="label-mark">' + '</span>' +
                                                              'No'
                                                          + '</label>' +
                                                      '</div>' +
                                                  '</div>' +
                                              '</div>' +
                                          '</div>' +
                                      '<div style=" display: flex; justify-content: space-around;">' +
                                                                              
                                          '<div class="btn-box mt-4">' +
                                              '<button id="'+useRId+'" type= "button" class="theme-btn border-0 editInp" style="display:block">' +'<i class="la la-plus">' + '</i>' + 'Edit' + '</button>' +
                                              '<button id="'+dynaClass+'" type="button" class="theme-btn border-0 saveInp" style="display:none">' + '<i class="la la-plus">' + '</i>' + 'Save' + '</button>' +
                                          '</div>' +
                                          '<div class="btn-box mt-4">' +
                                              '<button id="delBtn'+dynaClass+'" type="button" class="theme-btn border-0 deleteInp">' + '<i class="la la-plus">' + '</i>' + 'Delete' + '</button>' +
                                          '</div>' +
                                          '</div>' +
                                      '</div>' +
                                  '</div>' + 
                                  '<div>' +
                                      '<p id="savePersonal'+useRId+'" style="margin-top: 35px; text-align:center; color: green; font-weight: 400; display: none;">Saved Succesfully!</p>'+
                                      '<p id="form-Error'+useRId+'" style="margin-top: 35px; text-align:center; color: red; font-weight: 400; display: none;"></p>' +
                                  '</div>' + 
                                  '</form>' +
                              '</div>' +
                          '</div>' +
                      '</div>' )

                      if(others_domain == null){
                        $("#optional"+useRId).hide();
                    }
                      
            let certStored = localStorage.getItem('fetchCert');
            let fetchCert = JSON.parse(certStored);
            $.each(fetchCert.data, function(indexd, valued){
                $("#domain"+useRId).append('<option value='+valued.id_domain+'>'+valued.en_US+'</option>')
                if(valued.id_domain == domain){
                    $('#domain'+useRId).val(domain)
                }

            })

                      
                    document.getElementsByName('messageDesc'+dynaClass)[0].value =short_description
  
                      if (certification_obtained == 1){
                        ($("input:radio[value='1']."+dynaClass).prop("checked", true));
                        ($("input:radio[value='0']."+dynaClass).prop("checked", false));
                    }else{
                        ($("input:radio[value='0']."+dynaClass).prop("checked", true));
                        ($("input:radio[value='1']."+dynaClass).prop("checked", false));
                    }
  
           // enable for edit mode  
           
              $('button[id='+useRId+']').click(function(event){
                  event.preventDefault();
                  $('button[id='+useRId+']').css("display", "none");
                  $('button[id='+dynaClass+']').css("display", "block");
                  $('select[id='+useRId+']').removeAttr("disabled");
                  $('.'+dynaClass).removeAttr("disabled");
                  $('b[class='+dynaClass+']').css("display", "block");
              });
  
              // enable for edit mode end

              
              $('#domain'+useRId).change(function(){
                var syst = $('#domain'+useRId).find('option:selected').text();
                if (syst === 'Others'){
                    $('#optional'+useRId).show()
                    $('#other_area'+useRId).val('')
                }else{
                    $('#optional'+useRId).hide()
                    $('#other_area'+useRId).val('')
                    
                }
            });
  
              // save edited education data to server
              $('button[id='+dynaClass+']').click(function(event){
                  event.preventDefault();
  
  
                  serBeginDate = $('#beginning_date'+useRId).val();
                  serEndDate = $('#ending_date'+useRId).val();
  
                 newBD = changeDateServer(serBeginDate);
                 newED = changeDateServer(serEndDate);
      
                      var saveCertForm = {
                          title_of_qualification:  $('#title_of_qualification'+useRId).val(),
                          beginning_date: newBD,
                          ending_date: newED,
                          domain: $('#domain'+useRId).val(),
                          others_domain: $('#other_area'+useRId).val(),
                          short_description: $('#short_description'+useRId).val(),
                          certification_obtained: $("input:radio[name=radio]:checked").val(), 
  
                      }
                                              
                      $.ajax({
                          url: 'https://jobatrac.com/api/certifications/'+useRId,
                          type: "PUT",
                          headers: myHeaders,
                          data:  JSON.stringify(saveCertForm),
                          dataType: "json",
                          success: function(value){
                            $('#savePersonal'+useRId).css("display", "block");
                          }
                      
                      }).fail(function(){
                        if (response.status == 401 ){
                            document.location.href = '/login-expired'
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
                      url: `https://jobatrac.com/api/certifications/${useRId}`,
                      type: 'DELETE',
                      headers: myHeaders,
                      dataType: "json",
                      success: function(response){
                          $('#mycertForm'+useRId).hide();
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
  
  
  
  