

    let data = localStorage.getItem("userToken");
    let myData = JSON.parse(data)
    let myToken = myData.access_token

    var myHeader = {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        'Authorization': 'Bearer ' + myToken
    };

    
$.ajax({
    url: 'https://jobatrac.com/api/marital_status',
    type: 'GET',
    headers: myHeader,
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#civil_status').append('<option value='+value.id_situation+'>'+value.en_US+'</option>')
            
        })
    }
})
    
$.ajax({
    url: 'https://jobatrac.com/api/genders',
    type: 'GET',
    headers: myHeader,
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#gender').append('<option value='+value.id_gender+'>'+value.en_US+'</option>')
            
        })
    }
})

$.ajax({
    url: 'https://jobatrac.com/api/countries',
    type: 'GET',
    headers: myHeader,
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#nationality').append('<option value='+value.id_country+'>'+value.en_US+'</option>')
            
        })
    }
})

$(document).ready(function(){

    
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

    };

    $('#nextForm').submit(function(e){
        e.preventDefault();

        var newDate = $('#date_of_birth').val();
        var serverSend = changeDateServer(newDate)

        var step2 = {
            first_name: myData.account.comptable.first_name,
            last_name: myData.account.comptable.last_name,
            title: 1,
            gender: $('#gender').val(),
            date_of_birth: serverSend,
            civil_status: $('#civil_status').val(),
            nationality: $('#nationality').val()
        };

        
        var step2i = {
            mobile_number: $('#mobile_number').val(),
            whatsapp_number: $('#mobile_number').val(),
            email: myData.account.email_address
        }

        $.ajax({
            url: 'https://jobatrac.com/api/personal_details',
            type: "PUT",
            headers: myHeader,
            typeof: "json",
            data: JSON.stringify(step2),
            beforeSend: function(){
                $('#loaderImg').show();
            },
            success: function(){
                $.ajax({
                    url: 'https://jobatrac.com/api/contact_details',
                    type: "PUT",
                    headers: myHeader,
                    typeof: "json",
                    data: JSON.stringify(step2i),
                    success: function(){
                        $('#loaderImg').hide();
                        document.location.href = 'final-step'
                    }
                }).fail(function(response){
                     if(response.status==401){
                            document.location.href= 'login'
                    }
                     else{
                         $('#signUp-error').text('Network error please try again');
                    }
                })
            }
        }).fail(function(response){
            if(response.status==401){
                   document.location.href= 'login'
           }
            else{
                $('#form-Error').text('Network error please try again');
           }
        
        })

    })

})





 
    

