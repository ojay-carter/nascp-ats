$('#agreeID').show();
$('#0-reg').hide();

$('#regBtn').attr('disabled', true)

$('#0-reg').click(function(e){
    var typeOf = $("input[type='radio'][name='radio']:checked").val();
        if (typeOf == 'hr'){
            $('#0-forms').hide()
            $('.hide-form').hide()
            $('.no-form').text('Enter details about your organization')
            $('#hr').show()
            $('.dyna-title').text('Organization Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if (typeOf == 'sme'){
            $('#0-forms').hide()
            $('.hide-form').hide()
            $('.no-form').text('Enter details about your business')
            $('#sme').show()
            $('.dyna-title').text('Business Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if (typeOf == 'agent'){
            $('#0-forms').hide()
            $('.hide-form').hide()
            $('.no-form').text('Enter details about your agency')
            $('#agent').show()
            $('.dyna-title').text('Agency Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        
})
    

    $('#hr, #sme, #agent, #3rd-forms, #2nd-forms').hide();

    $('#degree_obtained').change(function(){
        var typeOf = $("input[type='radio'][name='radio']:checked").val();
        if (typeOf == 'hr'){
            $('#0-forms').hide()
            $('.hide-form').hide()
            $('.no-form').text('Enter details about your organization')
            $('#hr').show()
            $('.dyna-title').text('Organization Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if (typeOf == 'sme'){
            $('#0-forms').hide()
            $('.hide-form').hide()
            $('.no-form').text('Enter details about your business')
            $('#sme').show()
            $('.dyna-title').text('Business Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if (typeOf == 'agent'){
            $('#0-forms').hide()
            $('.hide-form').hide()
            $('.no-form').text('Enter details about your agency')
            $('#agent').show()
            $('.dyna-title').text('Agency Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        
    });

    $('.all-back').click(function(){
        $('#0-reg').show();
        $('.all-them').hide()
        $('.hide-form').show()
        $('.no-form').text('Get access to the all-in-one recruitment application.')
        $('.dyna-title').text('Sign Up As a Recruiter');
        $('#0-forms').show()
        $("html, body").animate({ scrollTop: 0 }, "slow");

    })

    $('.2nd-reg-back').click(function(){
        var get = localStorage.getItem('agency')
        var agency = JSON.parse(get);
        if (agency.type == 'HR'){
            $('#2nd-forms').hide()
            $('.no-form').text('Enter details about your organization')
            $('#hr').show()
            $('.dyna-title').text('Organization Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if (agency.type == 'SME'){
            $('#2nd-forms').hide()
            $('.no-form').text('Enter details about your business')
            $('#sme').show()
            $('.dyna-title').text('Business Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
        if (agency.type == 'Agent'){
            $('#2nd-forms').hide()
            $('.no-form').text('Enter details about your agency')
            $('#agent').show()
            $('.dyna-title').text('Agency Details');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }

    })

    $('#last-reg-back').click(function(){
        $('#3rd-forms').hide()
        $('#2nd-forms').show()
        $('.no-form').text('Let us get to know you better')
        $('.dyna-title').text('Personal Information');
        $("html, body").animate({ scrollTop: 0 }, "slow");

    });

    $('#2nd-forms').submit(function(e){
       e.preventDefault();
       var personal = {
        first_name : $('#first_name').val(),
        last_name : $('#last_name').val(),
        number : $('#mobile_number').val(),
        email : $('#personal_email').val(),
       };

       var hr_agent = JSON.stringify(personal)
       localStorage.setItem('agent', hr_agent)

       $('#2nd-forms').hide()
       $('#3rd-forms').show()
       $('.no-form').text('Choose a password for your account')
       $('.dyna-title').text('Set up your login credentials');
       $("html, body").animate({ scrollTop: 0 }, "slow");

    });

    $('#hr').submit(function(e){
       e.preventDefault();
       var hr = {
         type: 'HR',  
         company_name : $('#company').val(),
         company_address : $('#address').val(),
         company_number : $('#company_number').val(),
         company_email : $('#company_email').val(),
         company_website : $('#company_site').val(),
       }
       let hr_agency = JSON.stringify(hr)
       localStorage.setItem('agency', hr_agency);
       $('.all-them').hide()
       $('#2nd-forms').show()
       $('.no-form').text('Let us get to know you better')
       $('.dyna-title').text('Personal Information');
       $("html, body").animate({ scrollTop: 0 }, "slow");

    });

    $('#sme').submit(function(e){
       e.preventDefault();
       var hr = {
         type: 'SME',  
         company_name : $('#sme_company').val(),
         company_cac : $('#cac').val(),
         company_address : $('#sme_address').val(),
         company_number : $('#sme_number').val(),
         company_email : $('#sme_email').val(),
         company_website : $('#sme_website').val(),
       }
       var hr_agency = JSON.stringify(hr)
       localStorage.setItem('agency', hr_agency);
       $('.all-them').hide()
       $('#2nd-forms').show()
       $('.no-form').text('Let us get to know you better')
       $('.dyna-title').text('Personal Information');
       $("html, body").animate({ scrollTop: 0 }, "slow");

    });

    $('#agent').submit(function(e){
       e.preventDefault();
       var hr = {
         type: 'Agent',  
         company_name : $('#agent_company').val(),
         company_address : $('#agent_address').val(),
         company_number : $('#agent_number').val(),
         company_email : $('#agent_email').val(),
         company_website : $('#agent_site').val(),
         hupacan: $("input[type='radio'][name='hucapan']:checked").val(),
         staffing: $("input[type='radio'][name='staffing']:checked").val()
       }
       var hr_agency = JSON.stringify(hr)
       localStorage.setItem('agency', hr_agency);
       $('.all-them').hide()
       $('#2nd-forms').show()
       $('.no-form').text('Let us get to know you better')
       $('.dyna-title').text('Personal Information');
       $("html, body").animate({ scrollTop: 0 }, "slow");

    });

    $("#3rd-forms").submit(function(e){
        e.preventDefault();
        if($('#privacy_policy').is(':checked')) {
            var fruits = localStorage.getItem('agency');
            var veges = localStorage.getItem('agent');
            let agency = JSON.parse(fruits)
            let agent = JSON.parse(veges)
            var agentPassword = $('#password').val()

            var employerForm = {
                company_name: agency.company_name,
                company_type: agency.type,
                company_email: agency.company_email,
                company_number: agency.company_number,
                company_address: agency.company_address,
                company_website: agency.company_website,
                company_cac: agency.company_cac,
                hupacan: agency.hupacan,
                staffing_agency: agency.staffing,
                agent_first_name: agent.first_name,
                agent_last_name: agent.last_name,
                agent_number: agent.number,
                agent_email: agent.email,
                password: agentPassword,
                status: 'Pending'
            }

            let employer = JSON.stringify(employerForm)

            $.ajax({
                url: '/employers/create-account',
                type: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                },
                datatype: 'json',
                data: employer,
                success: function(){
                    document.location.href = '/employers/signup-success'
                }
            })
        }else{
            alert('hidden agreeID')
            $('#agreeID').hide()
        }
    });

        
       
    $('#privacy_policy').change(function(){
        if($('#privacy_policy').is(':checked')){
            $('#regBtn').attr('disabled', false)
            $('#agreeID').hide()
        }else{
            
            $('#regBtn').attr('disabled', true)
        }
    });
   