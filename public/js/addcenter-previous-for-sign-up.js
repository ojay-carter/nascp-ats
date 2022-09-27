
$(document).ready(function(){
 $('#registerForm').submit(function(event){
     event.preventDefault();

     var myForm = {
         first_name: $('#first_name').val(),
         last_name: $('#last_name').val(),
         email: $('#email').val(),
         email_confirmation: $('#email').val(),
         password: $('#password').val(),
         password_confirmation: $('#password').val(),
         state_location: $('#state_location').val(),
         mobile_number: $('#mobile_number').val(),
         whatsapp_number: $('#mobile_number').val(),
         privacy_policy: $('#privacy_policy').val()
     };

     $.ajax({
         url: 'https://ats.jdavprojects.com/api/register',
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
           $('#loaderImg').hide();
             document.location.href= 'account-creation-successful.html';
         }
     }).fail(function(){
         $('#signUp-error').text('Error signing up please try again');
     })

 });

     $('#firstLogin').submit(function(event){
         event.preventDefault();
         
         var body = {
             email: $('#email').val(),
             password: $('#password').val()
             }

             $.ajax({
                 url: 'https://ats.jdavprojects.com/api/login',
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
                         document.location.href = 'next-step.html'
                 }

             }).fail(function(){
                     $('#invalid-Login').text('The username or password you entered is incorrect');
             })
     

     });


});
