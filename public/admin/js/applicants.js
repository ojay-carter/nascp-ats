$('.sux').click(function(e) {
    var id = e.target.id ;
    var posi = $('.posi'+id).html();
    var payload = {
        id: id,
        position_id:posi,
        status: 'Success'
    }

    var sendForm = JSON.stringify(payload)
    
    $.ajax({
        url: `/admin/success`,
        type: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
        },
        datatype: 'json',
        data: sendForm,
        success: function(){
            document.location.href = `/applications/${posi}`
        }
    })


})
