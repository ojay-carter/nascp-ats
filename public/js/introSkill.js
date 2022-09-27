
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
        //document.location.href ='/login-expired.html'
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
        url: 'https://jobatrac.com/api/computer_science_domains',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            let skDom = JSON.stringify(value);
           localStorage.setItem("fetchSkDom", skDom)
           var selectedDomain = value.knowledge_domain.id_computer_science_domain
                $.ajax({
                    url: `https://jobatrac.com/api/computer_science_domains/${selectedDomain}/tools`,
                    type: 'GET',
                    headers: myHeaders,
                    dataType: 'json',
                    success: function(value){
                        let skT = JSON.stringify(value);
                        localStorage.setItem("fetchSkT", skT)
                    }
                })
        }
      })
    $.ajax({
        url: 'https://jobatrac.com/api/software_levels',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            let skL = JSON.stringify(value);
           localStorage.setItem("fetchSkL", skL)
        }
      })
  
      $.ajax({
          url: 'https://jobatrac.com/api/computer_skills',
          type: 'GET',
          headers: myHeaders,
          dataType: "json",
          success: function(newdata){ var mes=0;
              $.each(newdata.data, function(index, value){
                  mes++;
                    console.log(newdata.data)
                  var useRId = value.id;
                  var knowledge_domain =  value.knowledge_domain.id_computer_science_domain ;
                  var level =  value.level.id_software_level ;
                  var description_of_relevant_expertise =  value.description_of_relevant_expertise ;
                 // var system_and_tools =  value.application/system_and_tools.id_tool ;
                  
  
                  var dynaClass = 'inputs'+useRId;

  
  
                  $('#skillForm').append('<div class="billing-form-item" id="mySkillForm'+useRId+'">' +
                  ' <div class="billing-title-wrap">' +
                       '<h3 class="widget-title pb-0" ">' + 'My Skill' + '</h3>' +
                       '<div class="title-shape margin-top-10px">' + '</div>' +
                     '</div>' +
                   '<div class="billing-content pb-3" >' +
                       '<div class="contact-form-action">' +
                           '<form method="post" id="addSkill" >' +
                               '<div class="row">' +
                                   '<div class="col-lg-6">' +
                                       '<div class="input-box">' +
                                           '<label class="label-text">' + 'Skill'+ '</label>' +
                                           '<div class="form-group">' +
                                               '<select id="skill'+useRId+'" class="form-control qualification-tag-option-field '+dynaClass+'" value="" disabled required>' +
                                              '</select>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="col-lg-6">' +
                                       '<div class="input-box">' +
                                           '<label class="label-text">' + 'Application'+ '</label>' +
                                           '<div class="form-group">' +
                                               '<select id="application'+useRId+'" class="form-control qualification-tag-option-field '+dynaClass+'" value="" disabled required>' +
                                               '</select>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="col-lg-6">' +
                                       '<div class="input-box">' +
                                           '<label class="label-text">' + 'Level'+ '</label>' +
                                           '<div class="form-group">' +
                                               '<select id="level'+useRId+'" class="form-control qualification-tag-option-field '+dynaClass+'" value="" disabled required>' +
                                              '</select>' +
                                           '</div>' +
                                       '</div>' +
                                   '</div>' +
                                   '<div class="col-lg-12">' +
                                       '<div class="input-box">' +
                                           '<label class="label-text">' + 'Short Description' + '</label>' +
                                           '<div class="form-group mb-0">' +
                                               '<span class="la la-pencil form-icon">' + '</span>' +
                                               '<textarea id="short_description'+useRId+'" class="message-control form-control '+dynaClass+'" name="short_description'+useRId+'" value="'+description_of_relevant_expertise+'" disabled>'+'</textarea>' +
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
               
            let skDom = localStorage.getItem('fetchSkDom');
            let fetchSkDom = JSON.parse(skDom);
            $.each(fetchSkDom.data, function(indexe, valuee){
                $("#skill"+useRId).append('<option value='+valuee.id_computer_science_domain+'>'+valuee.en_US+'</option>')

            })
            let skL = localStorage.getItem('fetchSkL');
            let fetchSkL = JSON.parse(skL);
            $.each(fetchSkL.data, function(indexe, valuee){
                $("#level"+useRId).append('<option value='+valuee.id_software_level+'>'+valuee.en_US+'</option>')

            })
            let skT = localStorage.getItem('fetchSkT');
            let fetchSkT = JSON.parse(skT);
            $.each(fetchSkT.data, function(indexe, valuee){
                $("#application"+useRId).append('<option value='+valuee.id_tool+'>'+valuee.name+'</option>')

            })

               document.getElementsByName('short_description'+useRId)[0].value = description_of_relevant_expertise;
               $('select[id="skill'+useRId+'"]').val(knowledge_domain);
               $('select[id="application'+useRId+'"]').val(value["application/system_and_tools"].id_tool);
               $('select[id="level'+useRId+'"]').val(level);
           
  
           // enable for edit mode  
           
              $('button[id='+useRId+']').click(function(event){
                  event.preventDefault();
                  $('button[id='+useRId+']').css("display", "none");
                  $('button[id='+dynaClass+']').css("display", "block");
                  $('select[id='+useRId+']').removeAttr("disabled");
                  $('.'+dynaClass).removeAttr("disabled");
                  $('b[class='+dynaClass+']').css("display", "block");
              });

// START CHANGE THE TOOLS OPTIONS IF THE DOMAIN IS CHANGED

              $('"#skill'+useRId+'"').change(function(){
                var selectedDomain = $('"#skill'+useRId+'"').val()   
                    $.ajax({
                        url: `https://jobatrac.com/api/computer_science_domains/${selectedDomain}/tools`,
                        type: 'GET',
                        headers: myHeaders,
                        dataType: 'json',
                        success: function(value){
                            $.each(value.data, function(index, value){
                                $('"#application'+useRId+'"').empty();
                                $('"#application'+useRId+'"').append('<option value='+value.id_tool+'>'+value.name+'</option>')
                                
                            })
                        }
                    })
            })
            
// END CHANGE THE TOOLS OPTIONS IF THE DOMAIN IS CHANGED

              // enable for edit mode end
  
              // save edited education data to server
              $('button[id='+dynaClass+']').click(function(event){
                  event.preventDefault();
  
  
      
                 var addSkill = {
                    knowledge_area: $('#skill'+useRId).val(),
                    level: $('#level'+useRId).val(),
                    application_system: $('#application'+useRId).val(),
                    descr: $('#short_description'+useRId).val()
                 }
                                              
                      $.ajax({
                          url: 'https://jobatrac.com/api/computer_skills/'+useRId,
                          type: "PUT",
                          headers: myHeaders,
                          data:  JSON.stringify(addSkill),
                          dataType: "json",
                          success: function(value){
                            $('#savePersonal'+useRId).text('Saved Successfully!');
                          }
                      
                      }).fail(function(){
                        if (response.status == 401 ){
                            document.location.href = '/login-expired'
                        }else if (response.status == 422 ){
                          $('#formError'+useRId).text('Sorry you have already entered this skill.');
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
                      url: `https://jobatrac.com/api/computer_skills/${useRId}`,
                      type: 'DELETE',
                      headers: myHeaders,
                      dataType: "json",
                      success: function(response){
                          $('#mySkillForm'+useRId).hide();
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
  
  
  
  
  
  