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


   //ADD EDUCATION PAGE FORM HANDLER

    $("#eduForm").submit(function(event){
        event.preventDefault();

         
    var $degree_obtained= $('#degree_obtained')

        var myEduForm = {
            institution: $('#institution').val(),
            beginning_date: $('#beginning_date').val(),
            ending_date: $('#ending_date').val(),
            degree: $('#degree').val(),
            level: $('#level').val(),
            degree_obtained: $("input:checkbox[name=radio]:checked").val(), 
            other_city: $('#other_city').val(),
            others_course_of_study: $('#others_course_of_study').val(),
        }


        
        $.ajax({
            url: "https://jobatrac.com/api/educations",
            type: "POST",
            headers: myHeaders,
            data:  JSON.stringify(myEduForm),
            dataType: "json",
            success: function(value){
                sucSave();
                console.log(value);
            }
        
        }).fail(function(){
            errorSave()
        })
    });


       //ADD EDUCATION PAGE FORM HANDLER END


       // VIEW EDUCATION PAGE HANDLERS

       $.ajax({
        url: 'https://jobatrac.com/api/education_levels',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            let eduLevel = JSON.stringify(value);
           localStorage.setItem("fetchEduL", eduLevel)
        }
      })
      $.ajax({
        url: 'https://jobatrac.com/api/education_domains',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            let eduDomain = JSON.stringify(value);
           localStorage.setItem("fetchEduD", eduDomain)
        }
      });
      $.ajax({
        url: 'https://jobatrac.com/api/trainings',
        type: 'GET',
        headers: myHeaders,
        dataType: 'json',
        success: function(value){
            let eduTraining = JSON.stringify(value);
           localStorage.setItem("fetchTraining", eduTraining)
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
        url: 'https://jobatrac.com/api/educations',
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
                var institution =  value.institution;
                var bdate =  value.beginning_date;
                var edate =  value.ending_date;
                var degree =  value.degree.id_training;
                var level =  value.level.id_education_level;
                var area =  value.course_of_study.id_domain;
                var degree_obtained =  value.degree_obtained;
                var other_city =  value.other_city;
                var state_location =  value.state_city.id_city;
                var others_course_of_study =  value.others_course_of_study;

                var dynaClass = 'inputs'+useRId;

                            
                var beginning_date = changeDate(bdate);
                var ending_date = changeDate(edate);



                $('#eduForm').append('<div id="myeduForm'+useRId+'" class="billing-form-item outputDiv">' +
                '<div class="billing-title-wrap">'+
                    '<h3 class="widget-title pb-0">'+'Education'+ '</h3>' +
                '</div>' + 
                '<div class="billing-content pb-3">' +
                    '<div class="contact-form-action">' +
                        '<form method="post"  >' +
                            '<div class="row">' +
                                '<div class="col-lg-6">' +
                                    '<div class="input-box">'  +
                                        '<label class="label-text">' + 'School' + '</label>' +
                                        '<div class="form-group">' +
                                            '<i class="la la-building-o form-icon">' + '</i>'  +
                                           ' <input id="institution'+useRId+'" class="form-control institution '+dynaClass+'" type="text" name="text" value="'+institution+'" disabled required>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' + 
                                '<div class="col-lg-6">' +
                                   ' <div class="input-box">' +
                                        '<label class="label-text">' +'Area of Study' +'</label>' +
                                        '<div class="form-group">' +
                                        '<i class="la la-book form-icon">' + '</i>' +
                                            '<select id="areaOfStudy'+useRId+'" class="form-control degree '+dynaClass+'" value="'+area+'" disabled required>' +
                                             
                                            '</select>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-6" id="specified'+useRId+'">' +
                                    '<div class="input-box">' +
                                        '<label class="label-text">' + 'Specified Field of Study' + '</label>' +
                                        '<div class="form-group">' +
                                            '<i class="la la-book form-icon">' + '</i>' +
                                            '<input id="others_course_of_study'+useRId+'"  class="form-control others_course_of_study '+dynaClass+'" type="text"  value="'+others_course_of_study+'"  disabled required>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                
                                '<div class="col-lg-6">' +
                                   ' <div class="input-box">' +
                                        '<label class="label-text">' +'Type of Degree' +'</label>' +
                                        '<div class="form-group">' +
                                        '<i class="la la-book form-icon">' + '</i>' +
                                            '<select id="degree'+useRId+'" class="form-control degree '+dynaClass+'" value="'+degree+'" disabled required>' +
                                             
                                            '</select>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-6">'  +
                                    '<div class="input-box">' +
                                        '<label class="label-text"> ' +'Honours' +'</label>' +
                                        '<div class="form-group">' +
                                        '<i class="la la-book form-icon">' + '</i>' +
                                            '<select id="level'+useRId+'" class="form-control  level '+dynaClass+'" value="'+level+'" disabled required>' +
                                           
                                            '</select>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                
                                '<div class="col-lg-6">'  +
                                   ' <div class="input-box">' +
                                       '<label class="label-text">' + 'From' + '</label>' +
                                        '<div class="form-group">' +
                                           ' <i class="la la-calendar form-icon">' + '</i>' +
                                            '<input id="beginning_date'+useRId+'" class="form-control beginning_date '+dynaClass+' " type="date" name="text" value="'+beginning_date+'" disabled required>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-6">' +
                                    '<div class="input-box">' +
                                       '<label class="label-text">' + 'To' + '</label>' +
                                        '<div class="form-group">' + 
                                           ' <i class="la la-calendar form-icon">' + '</i>' +
                                            '<input id="ending_date'+useRId+'"  class="form-control ending_date '+dynaClass+'" type="date" name="text"  value="'+ending_date+'" disabled required>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +   
                                      
                                '<div class="col-lg-6">' +
                                   ' <div class="input-box">' +
                                        '<label class="label-text">' +'State' +'</label>' +
                                        '<div class="form-group">' +
                                        '<i class="la la-book form-icon">' + '</i>' +
                                            '<select id="state_location'+useRId+'" class="form-control degree '+dynaClass+'" value="'+state_location+'" disabled required>' +
                                             
                                            '</select>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-6" id="optional'+useRId+'">' +
                                    '<div class="input-box">' +
                                       '<label class="label-text">' + 'Location (Obtained outside Nigeria)' + '</label>' +
                                       ' <div class="form-group">' +
                                           ' <i class="la la-book form-icon">' + '</i>' +
                                            '<input  id="other_city'+useRId+'" class="form-control other_city '+dynaClass+'" type="text" name="text" value="'+other_city+'" placeholder="Enter State" disabled required>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-12">' +
                                ' <div class="input-box">' +
                                    '<label class="label-text">' + 'Degree Obtained' + '</label>' +
                                     '<div class="custom-label">' +
                                         '<div id="degree_obtained'+useRId+'"  class="form-group mb-0 d-flex align-items-center degree_obtained '+dynaClass+'" required>' +
                                             '<div class="label-wrap mr-3">' +
                                                 '<label for="Yes" class="label-container">' +
                                                     '<input type="radio" name="radio" value="1" class="'+dynaClass+'" checked>' +
                                                     '<span class="label-mark">' + '</span>' +
                                                     'Yes' +
                                                ' </label>' +
                                             '</div>' +
                                             '<div class="label-wrap">' +
                                                 '<label for="No" class="label-container">' +
                                                     '<input type="radio"  name="radio" value="0" class="'+dynaClass+'" checked>' +
                                                     '<span class="label-mark">' + '</span>' +
                                                     'No' +
                                                ' </label>' +
                                             '</div>' +
                                         '</div>' +
                                     '</div>' +
                                 '</div>' +
                                    
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
                            '</div>' + 
                            '<div>' +
                            '<p id="savePersonal'+useRId+'" style="margin-top: 35px; text-align:center; color: green; font-weight: 400; display: none;">Saved Succesfully!</p>'+
                            '<p id="form-Error'+useRId+'" style="margin-top: 35px; text-align:center; color: red; font-weight: 400; display: none;"></p>' +
                        '</div>' +  
                        
                        
                   ' </form>' +
                    '</div>' +
                '</div>' +
            '</div>' );


            let eduStored = localStorage.getItem('fetchEduL');
            let fetchEduL = JSON.parse(eduStored);
            $.each(fetchEduL.data, function(indexe, valuee){
                $("#level"+useRId).append('<option value='+valuee.id_education_level+'>'+valuee.en_US+'</option>')
                    if(level == valuee.id_education_level){
                        $("#level"+useRId).val(level)
                    }
            })
            let eduStoredD = localStorage.getItem('fetchEduD');
            let fetchEduD = JSON.parse(eduStoredD);
            $.each(fetchEduD.data, function(indexd, valued){
                $("#areaOfStudy"+useRId).append('<option value='+valued.id_domain+'>'+valued.en_US+'</option>')
                if(area == valued.id_domain){
                    $("#areaOfStudy"+useRId).val(area)
                }
            });
            let fetchCityA = localStorage.getItem('fetchCity');
            let fetchCity = JSON.parse(fetchCityA);
            $.each(fetchCity.data, function(indexd, valued){
                $("#state_location"+useRId).append('<option value='+valued.id_city+'>'+valued.en_US+'</option>')
                if(state_location == valued.id_city){
                    $("#state_location"+useRId).val(state_location)
                }
            });
            let fetchTrainingA = localStorage.getItem('fetchTraining');
            let fetchTrainingB = JSON.parse(fetchTrainingA);
            $.each(fetchTrainingB.data, function(indexd, valued){
                $("#degree"+useRId).append('<option value='+valued.id_training+'>'+valued.en_US+'</option>')
                if(degree == valued.id_training){
                    $("#degree"+useRId).val(degree)
                }
            })

            if(other_city == null){
                $("#optional"+useRId).hide();
            }

            if(others_course_of_study == null){
                $("#specified"+useRId).hide();
            }

         // enable for edit mode

         
         if (degree_obtained == 1){
            ($("input:radio[value='1']."+dynaClass).prop("checked", true));
            ($("input:radio[value='0']."+dynaClass).prop("checked", false));
        }else{
            ($("input:radio[value='0']."+dynaClass).prop("checked", true));
            ($("input:radio[value='1']."+dynaClass).prop("checked", false));
        }

         
         
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
                        $('#other_city'+useRId).val('')
                    }else{
                        $('#optional'+useRId).hide()
                        
                    }
                });
                $('#areaOfStudy'+useRId).change(function(){
                    var syst = $('#areaOfStudy'+useRId).find('option:selected').text();
                    if (syst === 'Others'){
                        $('#specified'+useRId).show()
                        $('#others_course_of_study'+useRId).val('')
                    }else{
                        $('#specified'+useRId).hide()
                        $('#others_course_of_study'+useRId).val('')
                        
                    }
                });

            // save edited education data to server
            $('button[id='+dynaClass+']').click(function(event){
                event.preventDefault();
                

                serBeginDate = $('#beginning_date'+useRId).val();
                serEndDate = $('#ending_date'+useRId).val();

               newBD = changeDateServer(serBeginDate);
               newED = changeDateServer(serEndDate);

               if($("input[type='radio']."+dynaClass).is(':checked')) {
                var radioValue = $("input[type='radio']."+dynaClass+':checked').val();
            }

                    var saveEduForm = {
                        institution:  $('#institution'+useRId).val(),
                        beginning_date: newBD,
                        ending_date: newED,
                        degree: $('#degree'+useRId).val(),
                        level: $('#level'+useRId).val(), 
                        state_city: $('#state_location'+useRId).val(),
                        course_of_study: $('#areaOfStudy'+useRId).val(),  
                        other_city: $('#other_city'+useRId).val(),
                        others_course_of_study: $('#others_course_of_study'+useRId).val(),
                        degree_obtained: radioValue,                        

                    }

                    $.ajax({
                        url: 'https://jobatrac.com/api/educations/'+useRId,
                        type: "PUT",
                        headers: myHeaders,
                        data:  JSON.stringify(saveEduForm),
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
                    url: `https://jobatrac.com/api/educations/${useRId}`,
                    type: 'DELETE',
                    headers: myHeaders,
                    dataType: "json",
                    success: function(response){
                        $('#myeduForm'+useRId).hide();
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



