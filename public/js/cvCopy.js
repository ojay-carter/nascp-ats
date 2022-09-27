
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
             //localStorage.setItem("vitae", value.data.compte.cv+'?token='+myToken)
             localStorage.setItem("letter", value.data.compte.cover_letter+'?token='+myToken)
             
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

      //$('#ifr').attr("href", myProf.data.compte.cv+'?token='+myToken)
      $('#ifr').hide();
      $('#cvHide').hide();
      $('#ifrii').hide();
      $('#clHide').hide();
      $('#noCL').hide();
      $('#noCV').hide();
      let prof = localStorage.getItem('profdat');
      let myProf = JSON.parse(prof);
      document.getElementById('ifr').setAttribute('src', myProf.data.compte.cv+'?token='+myToken);
      document.getElementById('ifrii').setAttribute('src', myProf.data.compte.cover_letter+'?token='+myToken);

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



      $('.cvTab').change(function(e){
          const file = e.target.files[0];

          const reader = new FileReader();
          reader.onloadend = () => {
              var base64String = reader.result
              localStorage.setItem('cvToBase', base64String);
          }; 
          reader.readAsDataURL(file);
 
      });

      $('.clTab').change(function(e){
          const file = e.target.files[0];

          const reader = new FileReader();
          reader.onloadend = () => {
              var base64String = reader.result
              localStorage.setItem('clToBase', base64String);
          }; 
          reader.readAsDataURL(file);
 
      });


      $('#cvclUp').click(function(e){
          e.preventDefault();
          $('#wLoader').show();
          if ($('.cvTab').val() !=''){
            var cvToBase = localStorage.getItem("cvToBase");
            var body = {
                cv: cvToBase
            }
            $.ajax({
                url: 'https://jobatrac.com/api/default_document',
                type: 'POST',
                headers: myHeaders,
                data: JSON.stringify(body),
                success: function(){
                    $('#sucSav').text('Updated');
                    $('#wLoader').hide();
                }
            }).fail(function(){
               // $('#wLoader').hide();
               $('#erSav').text('Network error please try again later')
            })
        }
            if ($('.clTab').val() !=''){
                var clToBase = localStorage.getItem("clToBase");
                var body = {
                    lm: clToBase
                };
                $.ajax({
                    url: 'https://jobatrac.com/api/default_document',
                    type: 'POST',
                    headers: myHeaders,
                    data: JSON.stringify(body),
                    success: function(){
                        $('#wLoader').hide();
                        $('#sucSav').text('Updated')
                    }
                }).fail(function(){
                   // $('#wLoader').hide();
                   $('#erSav').text('Network error please try again later')
                })
          }


      })

  /*      
      $('#cvclUp').click(function(e){
        e.preventDefault();
        $('#wLoader').show();
        
        var clToBase = localStorage.getItem("clToBase");
        var coToBase = localStorage.getItem("coToBase");
        var cvToBase = localStorage.getItem("cvToBase");
        let myForm = {
            picture: coToBase,
            cv: cvToBase,
            lm: clToBase,
        };
        $.ajax({
            url: 'https://jobatrac.com/api/default_document',
            type: 'POST',
            headers: myHeaders,
            data: JSON.stringify(myForm),
            success: function(){
           
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
                $('#wLoader').hide();
                $('#sucSav').text('Updated')
            }
        }).fail(function(){
            $('#wLoader').hide();
            if(response.status==401){
                document.location.href= 'login.html';
            } else{
                $('#erSav').text('Network error please try again later')
            }
        })
        
      })
*/

     $('#cvDl').click( function(e){ 
     e.preventDefault();
     $('#noCV').show(); 
     if (myProf.data.compte.cv == undefined){
        $('#noCV').text('Upload a Cv to view or download');
        $('#noCV').show();
        $('#cvDl').hide();
        $('#cvHide').show();
     }else{
        $('#ifr').fadeIn(800);
        $('#cvDl').hide();
        $('#cvHide').show();
     }
    });

     $('#cvHide').click( function(e){ 
     e.preventDefault(); 
     $('#noCV').hide();
     $('#ifr').hide();
     $('#cvDl').show();
     $('#cvHide').hide();
    });

     $('#clCl').click( function(e){ 
     e.preventDefault(); 
     if (myProf.data.compte.cover_letter == undefined){
        $('#noCL').text('Upload a Cover Letter to view or download');
        $('#noCL').show();
        $('#clCl').hide();
        $('#clHide').show();
     }else{
     $('#ifrii').fadeIn(800);
     $('#clCl').hide();
     $('#clHide').show();
     }
    });

     $('#clHide').click( function(e){ 
     e.preventDefault(); 
     $('#noCL').hide();
     $('#ifrii').hide();
     $('#clCl').show();
     $('#clHide').hide();
    });
    var clToBase = localStorage.getItem("clToBase");
  //  document.getElementById('ifr').src(cvToBase)

  $('#ifr').attr("href", myProf.data.compte.cv+'?token='+myToken)
  myProf.data.compte.cv+'?token='+myToken