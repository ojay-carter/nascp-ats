
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
          }
      
      }).fail(function(response){
          if (response.status == 401 ){
              document.location.href = 'login'
          }else{
            console.log("Failed to reach server")
          }
      });



      $('.coTab').change(function(e){
          const file = e.target.files[0];

          const reader = new FileReader();
          reader.onloadend = () => {
              var base64String = reader.result
              localStorage.setItem('coToBase', base64String);
          }; 
          reader.readAsDataURL(file);
 
      });

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

      
      $('#docsForms').click(function(e){
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
               $('#wLoader').hide();
               document.location.href = 'my-dashboard';
            }
        }).fail(function(){
            $('#wLoader').hide();if(response.status==401){
                document.location.href= 'login-expired';
            } else{
                loader.style.display = "none";
                $('#form-Error').text('Network error please try again later');
            }
        })
        
      })


     /* $('#docsForms').click(function(e){
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
                    $('#sucSav').text('Updated');$('#wLoader').hide();
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
            if ($('.coTab').val() !=''){
                var coToBase = localStorage.getItem("coToBase");
                var body = {
                    picture: coToBase
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

*/
      