
  let dataFetch = localStorage.getItem('userToken');
  let myDataFetch = JSON.parse(dataFetch);
  let myTokenFetch = myDataFetch.access_token;

$.ajax({
    url: 'https://jobatrac.com/api/languages',
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + myTokenFetch
    },
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#language').append('<option value='+value.id_language+'>'+value.en_US+'</option>')
            
        })
    }
})

$.ajax({
    url: 'https://jobatrac.com/api/language_levels',
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + myTokenFetch
    },
    dataType: 'json',
    success: function(value){
        $.each(value.data, function(index, value){
            $('#level').append('<option value='+value.id_language_level+'>'+value.en_US+'</option>')
            
        })
    }
})