let data = localStorage.getItem('userToken');
let myData = JSON.parse(data);
let myToken = myData.access_token;


fetch('https://jobatrac.com/api/profile', {
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
    
    let userDetails = localStorage.getItem('userDetails');
    let data2 = JSON.parse(userDetails);


