let data = localStorage.getItem('userToken');
let myData = JSON.parse(data);
let myToken = myData.access_token;


fetch('https://ats.jdavprojects.com/api/profile', {
    method: 'get',
    headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + myToken
    }

    }).then(
        response => {
            response.json().then(data => {
                if(response.ok){
                    dataDetails = JSON.stringify(data)
                    localStorage.setItem("userDetails", dataDetails)
                }
                else if (response.status==401){
                    document.location.href = 'login.html'
                }else{
                    console.log('Welcome!')
                }
            })
        }
    )
    
    
    .then(function(response){
            if(response.status==401){
                document.location.href= 'login.html'
            }else if (response.ok){
                console.log('Welcome home!')
              
           }else{
               console.log('welcome!')
           }

        }).then((response)=> response.json()).then((userData) => {
            localStorage.setItem("userdetai", userData);
        }).catch(function(){
            console.log('error');

});

