let data = localStorage.getItem('userToken');
let myData = JSON.parse(data);
let myToken = myData.access_token;

const myHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + myToken
}

$.ajax({
    url: "https://jobatrac.com/api/profile",
    type: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + myToken
    },
    datatype: 'json',
    success: function(){
        $('.Snk-out').hide();
        $('.Snk-in').show();
        $('#userName4').text(value.data.compte.first_name +' '+ value.data.compte.last_name);
        $('#userName3').text(value.data.compte.first_name +' '+  value.data.compte.last_name);
        $('#userEmail4').text(value.data.email);
        $('#userEmail3').text(value.data.email);
        $('.userDP').attr("src", value.data.compte.profile_picture);

    }
}).fail(function(){
    if (status.response == 401) {
        $('.Snk-in').hide();
        $('.Snk-out').show();

    }
})






$('#search-btn').click(function(e){
    e.preventDefault();
    var searchForm = {
        available_post: $('#job-type').val(),
        sector_id: $('#specialization').val(),
        city_assignment_id: $('#location').val()
    };
    searchPara = JSON.stringify(searchForm);
    localStorage.setItem("searchParam", searchPara);
    document.location.href = '/jobs/job-search.html';

});


