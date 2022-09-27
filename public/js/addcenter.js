if ($('#specific-signup').length > 0){
   
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
        }
    })
     
}

$(document).ready(function(){
    $('#agreeID').hide();
    $('#registerForm').submit(function(event){
        event.preventDefault();
        $('#usedEmail').text('')
        $('#signUp-error').text('');
        if($('#privacy_policy').is(':checked')){   
            var myForm = {
                first_name: $('#first_name').val(),
                last_name: $('#last_name').val(),
                email: $('#email').val(),
                email_confirmation: $('#email').val(),
                password: $('#password').val(),
                password_confirmation: $('#password').val(),
                state_location: $('#state_location').val(),
                mobile_number: '+2348010101010',
                whatsapp_number: '+2348010101010',
                privacy_policy: $('#privacy_policy').val()
            };
       
            $.ajax({
                url: 'https://jobatrac.com/api/check_email',
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                dataType: "json",
                data: JSON.stringify(myForm),
                beforeSend: function(){
                    $('#loaderImg').show();
                },
                success: function(){
                    $.ajax({
                        url: 'https://jobatrac.com/api/register',
                        type: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Accept": "application/json"
                        },
                        dataType: "json",
                        data: JSON.stringify(myForm),
                        success: function(){
                            $('#loaderImg').hide();
                            document.location.href= 'candidate/account-creation-successful';
                        }
                    }).fail(function(){
                        $('#loaderImg').hide();
                        $('#signUp-error').text('Error signing up please try again');
                    })
                }
            }).fail(function(response){
                $('#loaderImg').hide();
                if (response.status == 422){
                    $('#usedEmail').text('This email is already in use');
                }else{
                    $('#usedEmail').text('Network failed please try again');
                }
            })
        }else{
           $('#agreeID').show();
           // $('#agreeID').show().delay(4000).hide("slow");
            //$("label[for='agreeID']").text('Agree to our privacy policy to proceed')
        }
        

   
    });

    $('#privacy_policy').change(function(){
        $('#agreeID').hide();
    })
   
        $('#firstLogin').submit(function(event){
            event.preventDefault();
            $('#invalid-Login').text(' ');
               
            var body = {
                email: $('#email').val(),
                password: $('#password').val()
                }
   
                $.ajax({
                    url: 'https://jobatrac.com/api/login',
                    type: 'POST',
                    headers: { 'Content-Type': 'application/json',
                            "Accept": "application/json"
                    },
                    typeof: "json",
                    data: JSON.stringify(body),
                    beforeSend: function(){
                        $('#loaderImg').show();
                    },
                    success: function(response){
                            myData = JSON.stringify(response);
                            localStorage.setItem("userToken", myData);
                            $('#loaderImg').hide();
                            document.location.href = 'next-step'
                    }
   
                }).fail(function(response){
                        $('#loaderImg').hide();
                        if (response.status == 422){
                            $('#invalid-Login').text('The username or password you entered is incorrect');
                        }else{
                            $('#invalid-Login').text('Network failed please try again');
                        }
                })
        
   
        });



        
        $('#loginForm').submit(function(event){
            event.preventDefault();
            $('#invalid-Login').text(' ');
            
            var body = {
                email: $('#email').val(),
                password: $('#password').val()
                }
   
                $.ajax({
                    url: 'https://jobatrac.com/api/login',
                    type: 'POST',
                    headers: { 'Content-Type': 'application/json',
                            "Accept": "application/json"
                    },
                    typeof: "json",
                    data: JSON.stringify(body),
                    beforeSend: function(){
                        $('#loaderImg').show();
                    },
                    success: function(response){
                            myData = JSON.stringify(response);
                            localStorage.setItem("userToken", myData);
                            $('#loaderImg').hide();
                            document.location.href = 'candidate/my-dashboard'
                    }
   
                }).fail(function(response){
                        $('#loaderImg').hide();
                        if(response.status == 422){
                            $('#invalid-Login').text('The username or password you entered is incorrect');
                        }else{
                            $('#invalid-Login').text('Network error, please try again');
               
                        }
                 })
        
   
        });
        
        function back(){
           document.location.href= window.history.back();
        }

        function goBack() {
            window.history.back();
          }

        $('#loginExp').submit(function(event){
            event.preventDefault();
            $('#invalid-Login').text(' ');
            
            var body = {
                email: $('#email').val(),
                password: $('#password').val()
                }
   
                $.ajax({
                    url: 'https://jobatrac.com/api/login',
                    type: 'POST',
                    headers: { 'Content-Type': 'application/json',
                            "Accept": "application/json"
                    },
                    typeof: "json",
                    data: JSON.stringify(body),
                    beforeSend: function(){
                        $('#loaderImg').show();
                    },
                    success: function(response){
                            myData = JSON.stringify(response);
                            localStorage.setItem("userToken", myData);
                            $('#loaderImg').hide();
                            goBack();
                    }
   
                }).fail(function(response){
                        $('#loaderImg').hide();
                        if(response.status == 422){
                            $('#invalid-Login').text('The username or password you entered is incorrect');
                        }else{
                            $('#invalid-Login').text('Network error, please try again');
               
                        }
                 })
        
   
        });
   
   
   });
   