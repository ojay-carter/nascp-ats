console.log('we see')


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

$('#jobForm').submit(function(e){
    e.preventDefault()
    var jobID = $('#id').val();
    var clToBase = localStorage.getItem("cvToBase");
    var form = {
        
        first_name: $('#first').val(),
        last_name: $('#last').val(),
        email: $('#email').val(),
        tel: $('#tel').val(),
        status: 'Unread',
        position: $('#position').val(),
        position_id: jobID,
        cv: clToBase
    }
    let sendForm = JSON.stringify(form)

    $.ajax({
        url: `/jobs/${jobID}`,
        type: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        },
        datatype: 'json',
        data: sendForm,
        success: function(){
            document.location.href = '/jobs/submit-success'
        }
    })
})