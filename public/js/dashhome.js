let data = localStorage.getItem('userToken');
let myData = JSON.parse(data);
let myToken = myData.access_token;

const myHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + myToken
}

//$(document).ready(function(){
    $.ajax({
        url:"https://jobatrac.com/api/profile",
        type: "GET",
        headers: myHeaders,
        dataType: "json",
        success: function(value){
          
          var profDat = JSON.stringify(value)
          localStorage.setItem("profdat", profDat);
           $('#userName4').text(value.data.compte.first_name +' '+ value.data.compte.last_name);
           $('#userName3').text(value.data.compte.first_name +' '+  value.data.compte.last_name);
           $('#userEmail4').text(value.data.email);
           $('#userEmail3').text(value.data.email);  
           if(myProf.data.compte.profile_picture != null ){
            $('.userDP').attr("src", myProf.data.compte.profile_picture+'?'+performance.now());
          }
           var getddate = value.data.compte.date_of_birth;

           var showDate = changeDate(getddate);
           
           $('#firstName').val(value.data.compte.first_name) ;
           $('#lastName').val(value.data.compte.last_name);
           $('#age').val(showDate);
           $('#phone').val(value.data.compte.mobile_number);
           $('#whatsapp').val(value.data.compte.whatsapp_number); 
           $('#email').val(value.data.email);
           $('#website').val(value.data.compte.website_blog);
           if (value.data.compte.address !== null){
           $('#address').val(value.data.compte.address.street_address);
            }
 
        }
    
    }).fail(function(response){
        if (response.status == 401 ){
            document.location.href = '/login-expired';
        }
    });

    
    let prof = localStorage.getItem('profdat');
    let myProf = JSON.parse(prof);

    $.ajax({
      url: 'https://jobatrac.com/api/genders',
      type: 'GET',
      headers: myHeaders,
      dataType: 'json',
      success: function(value){
          $.each(value.data, function(index, value){
              $('#genderlize').append('<option value='+value.id_gender+'>'+value.en_US+'</option>')
                 if (value.id_gender == myProf.data.compte.gender.id_gender){
                  $('#genderlize').val(myProf.data.compte.gender.id_gender)
              }
          })
      }
    })
            
    $.ajax({
      url: 'https://jobatrac.com/api/marital_status',
      type: 'GET',
      headers: myHeaders,
      dataType: 'json',
      success: function(value){
          $.each(value.data, function(index, value){
              $('#maritalStatuso').append('<option value='+value.id_situation+'>'+value.en_US+'</option>')
                if (value.id_situation == myProf.data.compte.civil_status.id_civility){
                  $('#maritalStatuso').val(myProf.data.compte.civil_status.id_civility);
            }
                  
          })
      }
    })  
    $.ajax({
      url: 'https://jobatrac.com/api/countries',
      type: 'GET',
      headers: myHeaders,
      dataType: 'json',
      success: function(value){
          $.each(value.data, function(index, value){
              $('#nationality').append('<option value='+value.id_country+'>'+value.en_US+'</option>')
              if (value.id_country == myProf.data.compte.nationality.id_country){
                $('#nationality').val(myProf.data.compte.nationality.id_country);
              }
              
          })
      }
    })

    $.ajax({
      url: 'https://jobatrac.com/api/networks',
      type: 'GET',
      headers: myHeaders,
      dataType: 'json',
      success: function(value){
          $.each(value.data, function(index, value){
              $('#socialN').append('<option value='+value.id_network+'>'+value.name+'</option>')             
          })
      }
    })
    


    $.ajax({
      url: 'https://jobatrac.com/api/hobbies',
      type: 'GET',
      headers: myHeaders,
      dataType: 'json',
      success: function(value){
          $.each(value.data, function(index, value){
              $('#hobbies').append('<option value='+value.id_hobby+'>'+value.en_US+'</option>')
                var meshach = myProf.data.compte.hobby
                $.each(meshach, function(mindex,mvalue){
                  if (value.id_hobby == mvalue.id_hobby){
                    $("#hobbies option[value="+value.id_hobby+"]").attr('selected',true);
                  }
                })
              
          })
      }
    })

    $.ajax({
      url: 'https://jobatrac.com/api/sports',
      type: 'GET',
      headers: myHeaders,
      dataType: 'json',
      success: function(value){
          $.each(value.data, function(index, value){
              $('#sports').append('<option value='+value.id_sport+'>'+value.en_US+'</option>')
                var meshach = myProf.data.compte.sport
                $.each(meshach, function(mindex,mvalue){
                  if (value.id_sport == mvalue.id_sport){
                    $("#sports option[value="+value.id_sport+"]").attr('selected',true);
                  }
                })
              
          })
      }
    })

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
              $('#state').append('<option value='+value.id_city+'>'+value.en_US+'</option>');
              if (myProf.data.compte.address !== null && value.id_city == myProf.data.compte.address.address_city.id_city){
              $('#state').val(myProf.data.compte.address.address_city.id_city);
          }
          })
      }
  });

      if (myProf.data.compte.network != []){
        var mes=0;
        $.each(myProf.data.compte.network, function(index, value){
          mes++;
          var useRId = value.id;
          var dynaClass = 'inputs'+useRId;

          $('#savedProfile').append('<div class="row">' +
          '<div class="col-lg-6">' +
              '<div class="input-box">' +
                  '<label class="label-text">' + 'Social Network'+ '</label>' +
                  '<div class="form-group">' +
                      '<select id="socialN'+useRId+'" class="form-control qualification-tag-option-field '+dynaClass+'" value="" disabled required>' +
                          '<option value="2">' + 'Facebook' + '</option>' +
                          '<option value="1">' + 'Twitter' + '</option>' +
                      '</select>' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '<div class="col-lg-6">' +
              '<div class="input-box">' +
                  '<label class="label-text">' + 'Link'+ '</label>' +
                  '<div class="form-group">' +
                      '<span class="la la-external-link form-icon">' +'</span>'+
                      '<input id="profLink'+useRId+'" class="form-control" type="text" name="Link" value="'+value.account_url_or_username+'" required>' +
                  '</div>' +
              '</div>' +
          '</div>' +
          '</div>' + 
          '<div class="col-lg-12" >'+
          '<div style="position: relative; margin-bottom: 10px;">'+
          '<p id="savePersonal'+useRId+'" style="font-size:18px; margin-top: 35px; text-align:center; color: green; font-weight: 400; ">'+'</p>'+
          '<p id="formError'+useRId+'" style="margin-top: 35px; text-align:center; color: red; font-weight: 400; display: none;">'+'</p>'+
          '<div/>'+
          '<div class="btn-box withLoader" >'+
          '<button id="save'+dynaClass+'" type="submit" class="theme-btn border-0 saveInp"   disabled>' + '<i class="la la-plus">' + '</i>' + 'Save' + '</button>' +
    
          '</div>'+
          '</div>'+
         // '<br>'+
          //'<br>'+
          '<br>'
          )

          $('select[id="socialN'+useRId+'"]').val(value.social_network.id_network);
          $('select[id="profLink'+useRId+'"]').val(value.account_url_or_username);
  
          $('#profLink'+useRId+'').on("input",function(){
            $('#save'+dynaClass+'').attr("disabled", "disabled")
          var kiss = $('#profLink'+useRId+'').val();
            if(kiss !== value.account_url_or_username ){
              $('#save'+dynaClass+'').attr("disabled", false)
            }
          })

          $('button[id=save'+dynaClass+']').submit(function(event){
            event.preventDefault();

            var saveSocial = {
              link: $('#profLink'+useRId).val(),
              social_network: $('#socialN'+useRId).val(),
           }
                                        
                $.ajax({
                    url: 'https://jobatrac.com/api/social_network',
                    type: "PUT",
                    headers: myHeaders,
                    data:  JSON.stringify(saveSocial),
                    dataType: "json",
                    beforeSend: function(){
                      $('#loaderImg'+useRId+'').show();
                    },
                    success: function(value){
                      $('#loaderImg'+useRId+'').hide();
                      $('#save'+dynaClass+'').attr("disabled", "disabled")
                      $('#savePersonal'+useRId).text('Saved Successfully!');

                    }
                
                }).fail(function(){
                  $('#loaderImg'+useRId+'').hide();
                  $('#save'+dynaClass+'').attr("disabled", "disabled")
                  if (response.status == 401 ){
                      document.location.href = '/login-expired'
                  }else if (response.status == 422 ){
                    $('#formError'+useRId).text('Sorry you have already entered this Social Network.');
                  }else{
                      $('#formError'+useRId).text('Network error please try again later.');
                  }
                });

            });

        })
      }

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
  

   //ADD EDUCATION PAGE FORM HANDLER

   $('.coTab').change(function(e){
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
        var base64String = reader.result
        localStorage.setItem('coToBase', base64String);
    }; 
    reader.readAsDataURL(file);

});

   $('#savePic').click(function(e){
    e.stopImmediatePropagation()
     e.preventDefault();
     if ($('.coTab').val() != ''){
      var coToBase = localStorage.getItem("coToBase");        
      let myForm = {
       picture: coToBase,
      };
      $.ajax({
       url: 'https://jobatrac.com/api/default_document',
       type: 'POST',
       headers: myHeaders,
       data: JSON.stringify(myForm),
       beforeSend: function(){
           $('#wLoader').show();
       },
       success: function(){
         $('#wLoader').hide();
         var coToBase = localStorage.getItem("coToBase"); 
         $('#canImg').attr("src", coToBase);
         $('.userDP').attr("src", coToBase);
         $.ajax({
          url:"https://jobatrac.com/api/profile",
          type: "GET",
          headers: myHeaders,
          dataType: "json",
          success: function(value){
             let profDat = JSON.stringify(value);
             localStorage.setItem("profdat", profDat);
          }
      
      })
       }
   }).fail(function(){
       console.log('Failed, please try again')
 
     })

     }
   })

    $("#profileForm").submit(function(e){
        e.preventDefault();
        $('#savePersonal').css("display", "none");
        $('#form-Error').css("display", "none");

         
          var chngDate = $('#age').val()
          var serveDate = changeDateServer(chngDate);

          var  sndProfForm = {
              first_name: $('#firstName').val(),
              last_name: $('#lastName').val(),
              date_of_birth: serveDate,
              gender: $('#genderlize').val(),
              civil_status: $('#maritalStatuso').val(),
              nationality: $('#nationality').val()
          }
  


        
        $.ajax({
            url: "https://jobatrac.com/api/personal_details",
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
              document.location.href = '/login-expired'
          }else{
            $('#profileImg').hide();
            $('#form-Error').css("display", "block");
          }
      })
      

    });

    

    $('#contactForm').submit(function(e){
        e.preventDefault();
        console.log('happy');
        $('#saveContact').css("display", "none");
        $('#contactForm-Error').css("display", "none");

         

          var  sndConForm = {
              mobile_number: $('#phone').val(),
              whatsapp_number: $('#whatsapp').val(),
              email: $('#email').val(),
              website_blog: $('#website').val(),
              other_state: $('#state').val(),
              street_address: $('#address').val()
          }
          var  sndLocForm = {
              state: $('#state').val(),
              street_address: $('#address').val()
          }
  


        
        $.ajax({
            url: "https://jobatrac.com/api/contact_details",
            type: "PUT",
            headers: myHeaders,
            data:  JSON.stringify(sndConForm),
            dataType: "json",
            beforeSend: function(){
                $('#contactImg').show();
            },
            success: function(){
              $.ajax({
                  url: "https://jobatrac.com/api/address_location",
                  type: "PUT",
                  headers: myHeaders,
                  data:  JSON.stringify(sndLocForm),
                  dataType: "json",
                  success: function(){
                      console.log('done')
                      $('#contactImg').hide();
                      $('#saveContact').css("display", "block");
                  }
              }).fail(function(response){
                $('#contactImg').hide();
                if (response.status == 401 ){
                  document.location.href = '/login-expired'
              }else{
                $('#contactForm-Error').text("Network error please try again");
              }
              })
            }
        
        }).fail(function(response){
          $('#contactImg').hide();
          if (response.status == 401 ){
              document.location.href = '/login-expired'
          }else{
            $('#contactForm-Error').text("Network error please try again");
          }
      })

    });
    


    $("#fbForm").submit(function(event){
        event.preventDefault();
        $('#socialImg').show();

          
          var obj = {
            social_network: $('#socialN').val(),
              link: $('#profLink').val(),
            
          };

          
    if (myProf.data.compte.network.length !== 0){
      $.each(myProf.data.compte.network, function(index, value){
        var accnow = $('#socialN').val();
        if(value.social_network.id_network == accnow){
          console.log('leggo')
         $('#socialImg').hide();
         $('#socialForm-Error').text("You have already added this social network");
         $('#socialForm-Error').css("display", "block");
          console.log('You have already added this social')
        }else{
            console.log('legoshey baddest')
             $.ajax({
               url: "https://jobatrac.com/api/social_network",
               type: "PUT",
               headers: myHeaders,
               data:  JSON.stringify(obj),
               dataType: "json",
               success: function(){
                 $('#socialImg').hide();
                   $('#saveSocial').text("Saved Succesfully!");
               }
           }).fail(function(response){
             if (response.status == 401 ){
                 document.location.href = '/login-expired'
             }else{
               
               $('#socialImg').hide();
               $('#socialForm-Error').css("display", "block");
             }
         })
        
           }
        
      });
   }else{
     $.ajax({
       url: "https://jobatrac.com/api/social_network",
       type: "PUT",
       headers: myHeaders,
       data:  JSON.stringify(obj),
       dataType: "json",
       success: function(){
         $('#socialImg').hide();
           $('#saveSocial').text("Saved Succesfully!");
       }
   }).fail(function(response){
     if (response.status == 401 ){
         document.location.href = '/login-expired'
     }else{
       
       $('#socialImg').hide();
       $('#socialForm-Error').css("display", "block");
     }
 })

   }

    });


    $("#moreInfoBtn").click(function(event){
        event.preventDefault();
        $('#saveExperience').css("display", "none");

         

          var sndInfForm = {
              hobbies: $('#hobbies').val(),
              sports: $('#sports').val(),
          }
  


        
        $.ajax({
            url: "https://jobatrac.com/api/additional_information",
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
              document.location.href = '/login-expired'
          }else{
            $('#experienceForm-Error').css("display", "block");
          }
      })

    });

//  });
