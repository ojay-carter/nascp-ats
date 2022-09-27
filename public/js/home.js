
        $('.Snk-in').hide();
        $('.Snk-out').show();
let data = localStorage.getItem('userToken');
let myData = JSON.parse(data);
if (myData !== null){
    let myToken = myData.access_token;

const myHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + myToken
};




$.ajax({
    url: "https://jobatrac.com/api/profile",
    type: 'GET',
    headers: myHeaders,
    datatype: 'json',
    success: function(value){
        $('.Snk-out').hide();
        $('.Snk-in').show();
        $('#userName4').text(value.data.compte.first_name +' '+ value.data.compte.last_name);
        $('#userName3').text(value.data.compte.first_name +' '+  value.data.compte.last_name);
        $('#userEmail4').text(value.data.email);
        $('#userEmail3').text(value.data.email);
        $('.userDP').attr("src", value.data.compte.profile_picture);

    }
}).fail(function(){
        $('.Snk-in').hide();
        $('.Snk-out').show();

    
})
}else{
    
    $('.Snk-in').hide();
    $('.Snk-out').show();
}


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
            $('#location').append('<option value='+value.id_city+'>'+value.en_US+'</option>')
            
        })
    }
});
   
$.ajax({
    url: 'https://jobatrac.com/api/job_levels',
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    },
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#jobLevel').append('<option value='+value.id_statut+'>'+value.en_US+'</option>')
            
        })
    }
});
   
$.ajax({
    url: 'https://jobatrac.com/api/type_of_contract',
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    },
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#jobType').append('<option value='+value.id_job_type+'>'+value.en_US+'</option>')
            
        })
    }
});
   
$.ajax({
    url: 'https://jobatrac.com/api/sectors',
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
    },
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#specialization').append('<option value='+value.id_sector+'>'+value.en_US+'</option>')
            
        })
    }
});






