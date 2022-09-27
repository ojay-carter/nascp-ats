
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


if ($('#grand-header').length > 0){
    $.ajax({
        url: 'https://jobatrac.com/api/logout',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + myToken
        },
        success: function(){
            document.location.href = '/index'
        }
    });
}

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



searchParam = localStorage.getItem("searchParam");
searchForm = JSON.parse(searchParam);



if(searchForm !== null){
    if(searchForm.available_post == "" && searchForm.sector_id == "" && searchForm.city_assignment_id == "" && searchForm.job_type_id == "" && searchForm.function_id == "") {
        $.ajax({
            url: 'https://jobatrac.com/api/job_postings',
            type: 'GET',
            Headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            success: function(data){
                var links = JSON.stringify(data.links);
                localStorage.setItem('links', links)
                $.each(data.data, function(index,value){
                    if (value.salary_expectation == null){
                        var maxSal = ''
                        //var minSal = ''
                    }else{
                        maxSal = value.salary_expectation.en_US;
                       // minSal = value.salary_expectation.min;
                    }

                    var pubDate = moment(value.publication_date).fromNow();

                    $('#searchResults').append('<div class="job-card job-card-layout">'+
                        '<div class="job-card-details d-flex align-items-center justify-content-between">'+
                           ' <div class="card-head d-flex align-items-center">'+
                                '<div class="company-avatar mr-3">'+
                                    '<a href="" class="d-block '+value.id+'">'+
                                       
                                    '<img src="'+ value.manager.company.logo.url+'" alt="jobatracs recruitment">'+
                                    '</a>'+
                                '</div>'+
                                '<div class="company-title-box">'+
                                    '<p class="card-sub mb-1 font-weight-medium">'+ value.manager.company.name+'</p>'+
                                    '<h4 class="card-title mb-1">'+'<a href="/jobs/details?data='+ value.slug +'">'+ value.available_post  + '</a>'+'</h4>'+
                                    '<p class="card-sub">'+
                                        '<span class="mr-2">'+'<i class="la la-clock-o color-text-2">'+'</i>'+ pubDate+'</span>'+
                                        '<span class="mr-2">'+'<i class="la la-map-marker color-text-2">'+'</i>'+ value.city_of_assignment.en_US +'</span>'+
                                        '<span class="mr-2">'+'<i class="la la-hourglass-end color-text-2">'+'</i>'+ ' Full Time'+'</span>'+
                                        '<span class="mr-2">'+'<i class="fa fa-money" color-text-2">' +'</i>'+"  "+ maxSal +'</span>'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="btn-box">'+
                            '<a href="/jobs/details?data='+ value.slug +'" class="theme-btn '+value.id+'">'+'Apply'+'</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>' )
                })
            }
        });
    }else{
        $.ajax({
            url: 'https://jobatrac.com/api/job_postings/search',
            type: 'POST',
            Headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            data: searchForm,
            success: function(data){
                if(data.data == 0){
                    $('.hideItem').hide();
                    $('#noItem').text("No result for your search criteria, try another search.");
                }
                $.each(data.data, function(index, value){
                    
                    if (value.salary_expectation == null){
                        var maxSal = ''
                        //var minSal = ''
                    }else{
                        maxSal = value.salary_expectation.en_US;
                       // minSal = value.salary_expectation.min;
                    }
                    
                    var pubDate = moment(value.publication_date).fromNow();
                    $('#searchResults').append('<div class="job-card job-card-layout">'+
                        '<div class="job-card-details d-flex align-items-center justify-content-between">'+
                           ' <div class="card-head d-flex align-items-center">'+
                                '<div class="company-avatar mr-3">'+
                                    '<a href="" class="d-block '+value.id+'">'+
                                       
                                    '<img src="'+ value.manager.company.logo.url+'" alt="">'+
                                    '</a>'+
                                '</div>'+
                                '<div class="company-title-box">'+
                                    '<p class="card-sub mb-1 font-weight-medium">'+ value.manager.company.name+'</p>'+
                                    '<h4 class="card-title mb-1">'+'<a href="/jobs/details?data='+ value.slug +'">'+ value.available_post  + '</a>'+'</h4>'+
                                    '<p class="card-sub">'+
                                        '<span class="mr-2">'+'<i class="la la-clock-o color-text-2">'+'</i>'+ pubDate+'</span>'+
                                        '<span class="mr-2">'+'<i class="la la-map-marker color-text-2">'+'</i>'+ value.city_of_assignment.en_US +'</span>'+
                                        '<span class="mr-2">'+'<i class="la la-hourglass-end color-text-2">'+'</i>'+ ' Full Time'+'</span>'+
                                        '<span>'+'<i class="la la-cash color-text-2">' +'</i>'+"  "+ maxSal + '</span>'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="btn-box">'+
                            '<a href="/jobs/details?data='+ value.slug +'" class="theme-btn '+value.id+'">'+'Apply'+'</a>'+
                            '</div>'+
                        '</div>'+
                    '</div>' )
                })
            }
        });
    }
}else{

    $.ajax({
        url: `https://jobatrac.com/api/job_postings`,
        type: 'GET',
        Headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        success: function(data){
            $.each(data.data, function(index,value){
                if (value.salary_expectation == null){
                    var maxSal = ''
                    //var minSal = ''
                }else{
                    maxSal = value.salary_expectation.en_US;
                   // minSal = value.salary_expectation.min;
                }

                var pubDate = moment(value.publication_date).fromNow();

                $('#searchResults').append('<div class="job-card job-card-layout">'+
                    '<div class="job-card-details d-flex align-items-center justify-content-between">'+
                       ' <div class="card-head d-flex align-items-center">'+
                            '<div class="company-avatar mr-3">'+
                                '<a href="" class="d-block '+value.id+'">'+
                                   
                                '<img src="'+ value.manager.company.logo.url+'" alt="jobatracs recruitment">'+
                                '</a>'+
                            '</div>'+
                            '<div class="company-title-box">'+
                                '<p class="card-sub mb-1 font-weight-medium">'+ value.manager.company.name+'</p>'+
                                '<h4 class="card-title mb-1">'+'<a href="/jobs/details?data='+ value.slug +'">'+ value.available_post  + '</a>'+'</h4>'+
                                '<p class="card-sub">'+
                                    '<span class="mr-2">'+'<i class="la la-clock-o color-text-2">'+'</i>'+ pubDate+'</span>'+
                                    '<span class="mr-2">'+'<i class="la la-map-marker color-text-2">'+'</i>'+ value.city_of_assignment.en_US +'</span>'+
                                    '<span class="mr-2">'+'<i class="la la-hourglass-end color-text-2">'+'</i>'+ ' Full Time'+'</span>'+
                                    '<span class="mr-2">'+'<i class="fa fa-money" color-text-2">' +'</i>'+"  "+ maxSal +'</span>'+
                                '</p>'+
                            '</div>'+
                        '</div>'+
                        '<div class="btn-box">'+
                        '<a href="/jobs/details?data='+ value.slug +'" class="theme-btn '+value.id+'">'+'Apply'+'</a>'+
                        '</div>'+
                    '</div>'+
                '</div>' )
            })
        }
    });
}

$('#search-btn').click(function(e){
    e.preventDefault();
    var searchForm = {
        available_post: $('#job-type').val(),
        sector_id: $('#specialization').val(),
        city_assignment_id: $('#location').val(),
        job_type_id: "",
        function_id: ""
    };
    searchPara = JSON.stringify(searchForm);
    localStorage.setItem("searchParam", searchPara);
    document.location.href = `/jobs/job-search?position=${searchForm.available_post}`;

});


$('#search-btn2').click(function(e){
    e.preventDefault();

    var searchForm = {
        available_post: $('#job-type').val(),
        sector_id: $('#specialization').val(),
        city_assignment_id: $('#location').val(),
        job_type_id: $('#jobType').val(),
        function_id: $('#jobLevel').val()
    };

    searchPara = JSON.stringify(searchForm);
    localStorage.setItem("searchParam", searchPara);
    document.location.href = `/jobs/job-search?position=${searchForm.available_post}&location=${searchForm.city_assignment_id}`;
});

$('#IV-next').click(function(e){
    e.preventDefault();
    lo
})


const dateString = document.getElementsByClassName('911')



$.each(dateString, function(index, value){
    var datte = value.innerHTML;
    var cleanedDate = moment(datte).fromNow();
    value.innerHTML= cleanedDate;

})



