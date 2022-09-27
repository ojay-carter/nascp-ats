

window.onload = function(){
    var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    function fineDate(date){
        var fDee = new Date(date);
        var day = fDee.getDate();
        //var mth = fDee.getMonth();
        var shortMonth = fDee.toLocaleString('en-us', { month: 'short' });
        var year = fDee.getFullYear();
        var showDate = shortMonth + ' ' + day + ', ' + year;
        return showDate;
    }
    //$('.loggedIn').hide();
    //$('#app2').hide();
    
    $('#uploadNew').hide();
    $('.Snk-in').hide();
    $('.Snk-out').show();
    $.ajax({
        url: "https://jobatrac.com/api/job_postings/"+ data.data,
        type: 'GET',
        Headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        success: function(data){
            var showD = fineDate(data.data.publication_date);
            var showDline = fineDate(data.data.deadline_to_apply);
            if (data.data.salary_expectation == null){
                var salRange = ""

            }else{
                salRange = data.data.salary_expectation.en_US
            }
            document.title = data.data.available_post.toLowerCase();
            $("meta[property='og\\description']").attr('content', 'job opening for'+ data.data.available_post)
            $("meta[property='og\\title']").attr('content', data.data.available_post)
            $("meta[property='og\\url']").attr('content', 'jobatrac.ng'+data.data.slug)
           $('#companyLogo').attr("src", data.data.manager.company.logo.url);
           $('#jobTitle').text(data.data.available_post);
          // $('#datePosted').text(data.data.publication_date);
           $('#datePosted').text(showD);
           $('#deadline').text(showDline+ " (Deadline)");
           //$('#deadline').text(data.data.deadline_to_apply);
           $('#companyName').text(data.data.manager.company.name);
           $('#companyLocation').text(data.data.city_of_assignment.en_US);
           $('#jobDesc').html(data.data.comment);
           $('#jobMission').html(data.data.mission);
           $('#reqProfile').html(data.data.required_profile);
           $('#cmpLoc').text(data.data.city_of_assignment.en_US);
           $('#cmpSal').text(salRange);
           $('#cmpType').text(data.data.job_type.en_US);
           $('#cmpInd').text(data.data.sector.en_US);
           $('#cmpLvl').text(data.data.function.en_US);
           $('#cmpExp').text(data.data.experience.en_US);
           $('#cmpQual').text(data.data.training.en_US);
           var idl = {
            'id': data.data.id, 
            'slug': data.data.slug
           }
           var idll = JSON.stringify(idl)
           localStorage.setItem("J.id", idll);
        }
    })



    let datal = localStorage.getItem('userToken');
    let myData = JSON.parse(datal);
    if (myData !== null){
        let myToken = myData.access_token;
        myheaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + myToken
        };
        $.ajax({
            
        url: "https://jobatrac.com/api/profile",
        type: 'GET',
        headers: myheaders,
        success: function(value){
            $('.loggedOut').hide();
            $('#modal-loggedout').hide();
            $('#modal-loggedin').show();
            $('#appNow').text('Click here to apply');
            $('#appNow1').text("Think you're a good fit for this position?");
            $('#appNow2').hide();
            $('#userName4').text(value.data.compte.first_name +' '+ value.data.compte.last_name);
            $('#userName3').text(value.data.compte.first_name +' '+  value.data.compte.last_name);
            $('#userEmail4').text(value.data.email);
            $('#userEmail3').text(value.data.email);
            $('.userDP').attr("src", value.data.compte.profile_picture);
            $('.Snk-out').hide();
            $('.Snk-in').show(); 
            console.log(value.data.compte.default_cv)
            if(value.data.compte.default_cover_letter !== undefined || value.data.compte.default_cv !== undefined){
                $('#localCV').attr('disabled', 'disabled');
                $('#uploadCV').prop('checked', true);
                $('#uploadNew').show();
                $('#applyNow').attr('disabled', 'disabled')
                var indie = 11;
            }
            $.ajax({
                url:'https://jobatrac.com/api/my_applications',
                type:'GET',
                headers: myheaders,
                success: function(value){
                    $.each(value.data, function(index, value){
                        if (value.job_posting.slug == data.data){
                            
                $('#appJob, #app2').text('Applied');
                $('#appJob, #app2').attr('disabled', 'disabled');
                $('#appNow').hide();
                $('#appNow1').hide();
                $('#addResume').hide();
                
                        }
                    })
                }
            })
            $.ajax({
                url:'https://jobatrac.com/api/favorites',
                type:'GET',
                headers: myheaders,
                success: function(value){
                    $.each(value.data, function(index, value){
                        if (value.job_offer.slug == data.data){
                            
                $('#addFav').text('Saved');
                $('#addFav').attr('disabled', 'disabled');
    
                        }
                    })
                }
            }) 

                                    
            $('#addFav').click(function(e){
                e.preventDefault();
                var id = localStorage.getItem("J.id");
                var idl = JSON.parse(id);
                $.ajax({
                    url: "https://jobatrac.com/api/favorites/"+idl.id+"/add_to_favorites",
                    type: 'POST',
                    headers: myheaders,
                    success: function(){
                        $('#addFav').text('Saved');
                    }
                })
            });

            

            $('#applyNow').click(function(e){
                e.preventDefault();
                console.log(indie)

                if(indie == 11 && $('.cvTab').val() !='' && $('.cvTab').val() !=''){
                    var cvToBase = localStorage.getItem("cvToBase");
                    var clToBase = localStorage.getItem("clToBase");
                    var bodyL = {
                        cv: cvToBase,
                        lm: clToBase
                    }
                    $.ajax({
                        url: "https://jobatrac.com/api/default_document",
                        type: "POST",
                        data: JSON.stringify(bodyL),
                        headers: myheaders,
                        beforeSend: function (){
                            $('#wLoader').show();
                        },
                        success: (response) => {
                            var id = localStorage.getItem("J.id");
                            var idl = JSON.parse(id);

                                        
                                var body = {
                                    origin_id: 1,
                                    cv: cvToBase,
                                    lm: clToBase
                                }

                            $.ajax({
                                url: "https://jobatrac.com/api/job_postings/"+idl.slug+"/apply",
                                type: 'POST',
                                headers: myheaders,
                                data: JSON.stringify(body),
                                success: function(){
                                    $('#wLoader').hide();
                                    $('#sucApp').show()
                                    $('#appJob, #app2').text('Applied');
                                    $('#appJob, #app2').attr('disabled', 'disabled');
                                }
                            }).fail(function(response){
                                $('#wLoader').hide();
                                $('#errApp').show()
                                
                                
                            })
                        }
                    })
                }

                else if (indie == undefined && $('.cvTab').val() !='' && $('.cvTab').val() !=''){
                    var cvToBase = localStorage.getItem("cvToBase");
                    var clToBase = localStorage.getItem("clToBase");
                    var body = {
                        origin_id: 2,
                        cv: cvToBase,
                        lm: clToBase
                    }
                    var id = localStorage.getItem("J.id");
                    var idl = JSON.parse(id);
                    $.ajax({
                        url: "https://jobatrac.com/api/job_postings/"+idl.slug+"/apply",
                        type: 'POST',
                        headers: myheaders,
                        data: JSON.stringify(body),
                        beforeSend: function (){
                            $('#wLoader').show();
                        },
                        success: function(){
                            $('#wLoader').hide();
                            $('#sucApp').show()
                            $('#appJob, #app2').text('Applied');
                            $('#appJob, #app2').attr('disabled', 'disabled');
                        }
                    }).fail(function(response){
                        $('#wLoader').hide();
                        $('#errApp').show()
                        
                        
                    })
                }else{
                    var body = {
                        origin_id: 3
                    }
                    var id = localStorage.getItem("J.id");
                    var idl = JSON.parse(id);
                    $.ajax({
                        url: "https://jobatrac.com/api/job_postings/"+idl.slug+"/apply",
                        type: 'POST',
                        headers: myheaders,
                        data: JSON.stringify(body),
                        beforeSend: function (){
                            $('#wLoader').show();
                        },
                        success: function(){
                            $('#wLoader').hide();
                            $('#sucApp').show()
                            $('#appJob, #app2').text('Applied');
                            $('#appJob, #app2').attr('disabled', 'disabled');
                           // $('.modal').modal('hide');
                        }
                    }).fail(function(response){
                        $('#wLoader').hide();
                        $('#errApp').show()
                        
                        
                    })
                }
            });


        }
        }).fail(function(response){
            if(response.status == 401){
                
              //  $('.loggedIn').hide();
                $('#app2').hide();
                $('.Snk-in').hide();
                $('.Snk-out').show();
                        
            $('#addFav').click((e) => {
                $('#addFav').attr('data-toggle', 'modal');
                $('#addFav').attr('data-target', '.modal-action-form')

            })

           
            }else{
                $('#addFav').click(function(e){
                    //alert('You need to sign in to save this job')
                   $('#addFav').attr('data-toggle', 'modal')
                   $('#addFav').attr('data-target', '.modal-action-form')
    
                })
            }
        
            
        })



    }else{
       
       // $('.loggedIn').hide();
        $('#app2').hide();
        $('.Snk-in').hide();
        $('.Snk-out').show();

                 
        $('#addFav').click(function(e){
            $('#addFav').attr('data-toggle', 'modal');
            $('#addFav').attr('data-target', '.modal-action-form')
        })

    }
    
} 

$('#localCV').click(function(){
    $('#uploadNew').hide(700)
    $('#applyNow').attr('disabled', false)
})
$('#uploadCV').click(function(){
    $('#uploadNew').show(700);
    $('#applyNow').attr('disabled', 'disabled')
})


$('.cvTab').change(function(e){
    $('#erSav').text(' ')
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
          var base64String = reader.result
          localStorage.setItem('cvToBase', base64String);
      }; 
      reader.readAsDataURL(file);
      
    if ($('.clTab').val() !=='' ){
        $('#applyNow').attr('disabled', false)
    }
  });

  $('.clTab').change(function(e){
    $('#erSav').text(' ')
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
          var base64String = reader.result
          localStorage.setItem('clToBase', base64String);
      }; 
      reader.readAsDataURL(file);      
      if ($('.cvTab').val() !=='' ){
          $('#applyNow').attr('disabled', false)
      }

  });






