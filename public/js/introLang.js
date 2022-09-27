
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
           var robin = Math.floor(value.data.compte.profile_evaluation);
           $('#skilbar').attr("data-percent", "50%");
           $('.pro-evaluation').text(robin+'%');
           var profDat = JSON.stringify(value)
           localStorage.setItem("profdat", profDat);
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

      
    $.ajax({
        url: 'https://jobatrac.com/api/languages',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            var languages = JSON.stringify(value)
            localStorage.setItem('languages', languages)
        }
    })
    
    $.ajax({
        url: 'https://jobatrac.com/api/language_levels',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            var llevel = JSON.stringify(value);
            localStorage.setItem('level', llevel)
            $.each(value.data, function(index, value){
                $('.langLevel').append('<option value='+value.id_language_level+'>'+value.en_US+'</option>')
                
            })
        }
    })
  
  
  
      $.ajax({
          url: 'https://jobatrac.com/api/language_skills',
          type: 'GET',
          headers: myHeaders,
          dataType: "json",
          success: function(newdata){ var mes=0;
              $.each(newdata.data, function(index, value){
                  mes++;
                
                  var useRId = value.id;
                  var domain =  value.language.id_language ;
                  var level =  value.level.id_language_level ;
  
                  var dynaClass = 'inputs'+useRId;


  
                  $('#langForm').append('<div class="billing-form-item" id="myLangForm'+useRId+'">' +
                  ' <div class="billing-title-wrap">' +
                       '<h3 class="widget-title pb-0" ">' + 'Language Skill' + '</h3>' +
                       '<div class="title-shape margin-top-10px">' + '</div>' +
                     '</div>' +
                   '<div class="billing-content pb-3" >' +
                       '<div class="contact-form-action">' +
                           '<form method="post" id="addCert" >' +
                               '<div class="row">' +
                                   '<div class="col-lg-6">' +
                                       '<div class="input-box">' +
                                           '<label class="label-text">' + 'Language Skill'+ '</label>' +
                                           '<div class="form-group">' +
                                               '<select id="language'+useRId+'" class="form-control langSkill qualification-tag-option-field '+dynaClass+'" value="'+domain+'" disabled required>' +
                                               '</select>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="col-lg-6">' +
                                       '<div class="input-box">' +
                                           '<label class="label-text">' + 'Proficiency'+ '</label>' +
                                           '<div class="form-group">' +
                                               '<select id="level'+useRId+'" class="form-control langLevel qualification-tag-option-field '+dynaClass+'" value="'+level+'" disabled required>' +
                                               '</select>' + 
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="col-lg-12">'+
                                   '<div style="position: relative; margin-bottom: 10px;">'+
                                   '<p id="savePersonal'+useRId+'" style="font-size:18px; margin-top: 35px; text-align:center; color: green; font-weight: 400; ">'+'</p>'+
                                   '<p id="formError'+useRId+'" style="margin-top: 35px; text-align:center; color: red; font-weight: 400; display: none;">'+'</p>'+
                                   '<div/>'+
                                   '<div style=" display: flex; justify-content: space-around;">' +                                     
                                    '<div class="btn-box mt-4 withLoader">'+
                                        '<button id="'+useRId+'" type="button" class="theme-btn border-0">'+'<i class="la la-plus">'+'</i>'+ 'Edit'+'</button>'+
                                        '<button id="'+dynaClass+'" type="button" class="theme-btn border-0 saveInp" style="display:none">' + '<i class="la la-plus">' + '</i>' + 'Save' + '</button>' +
                                        '<img id="loaderImg'+useRId+'" src="images/myloader.gif" alt="loader">'+
                                    '</div>'+
                                    '<div class="btn-box mt-4">' +
                                        '<button id="delBtn'+dynaClass+'" type="button" class="theme-btn border-0 deleteInp">' + '<i class="la la-plus">' + '</i>' + 'Delete' + '</button>' +
                                    '</div>' +
                                    '</div>'+  
                                '</div>' + 
                           '</form>' +
                       '</div>' +
                   '</div>' +
               '</div>' )

               
               $('select[id="language'+useRId+'"]').val(domain);
               $('select[id="level'+useRId+'"]').val(level);


              var languages = localStorage.getItem('languages')
              var languages2 = JSON.parse(languages);
              $.each(languages2.data, function (index, value) {  
                    $('.langSkill').append('<option value='+value.id_language+'>'+value.en_US+'</option>')
                    if(domain == value.id_language){
                        $('#language'+useRId).val(value.id_language)
                    }
              })

              var llevel = localStorage.getItem('level')
              var level2 = JSON.parse(llevel);
              $.each(level2.data, function (index, value) {    
                    $('.langLevel').append('<option value='+value.id_language_level+'>'+value.en_US+'</option>')
                    if(level == value.id_language_level){
                        $('#level'+useRId).val(value.id_language_level)
                    }
              })

              
  
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
  
              // save edited education data to server
              $('button[id='+dynaClass+']').click(function(event){
                  event.preventDefault();
  
  
      
                  var saveAddLang = {
                    language: $('#language'+useRId).val(),
                    level: $('#level'+useRId).val(),
                 }
                                              
                      $.ajax({
                          url: 'https://jobatrac.com/api/language_skills/'+useRId,
                          type: "PUT",
                          headers: myHeaders,
                          data:  JSON.stringify(saveAddLang),
                          dataType: "json",
                          success: function(value){
                            $('#savePersonal'+useRId).text('Saved Successfully!');
                          }
                      
                      }).fail(function(){
                        if (response.status == 401 ){
                            document.location.href = 'login.html'
                        }else if (response.status == 422 ){
                          $('#formError'+useRId).text('Sorry you have already entered this language skill.');
                        }else{
                            $('#formError'+useRId).text('Network error please try again later.');
                        }
                      });
  
                  });
                 
  
              // save edited education data to server end
  
              // delete education handler start
  
              $('#delBtn'+dynaClass).click(function(event){
                  event.preventDefault();
                  $.ajax({
                      url: `https://jobatrac.com/api/language_skills/${useRId}`,
                      type: 'DELETE',
                      headers: myHeaders,
                      dataType: "json",
                      success: function(response){
                          $('#myLangForm'+useRId).hide();
                      }
                  }).fail(function(){
                      errorDelete();
                  })
              })
  
              // delete education handler end
  
  
              })
               
          }
             
      }).fail(function(){
          console.log('')
      })

  
  
  