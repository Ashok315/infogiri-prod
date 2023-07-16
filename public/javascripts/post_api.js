

function getPostal(pincodeId, cityId, stateId) {
    var pincode = $(pincodeId).val();
    if (pincode == '') {
        $(cityId).val('');
        $(stateId).val('');
    } else {
        $("#all_detail").css('visibility','hidden');
        $.ajax({
            url: `https://api.postalpincode.in/pincode/${pincode}`,
            type: 'GET',
            success: function(response) { 
                try {
                    var city = response['0'].PostOffice['0'].Block;
                    var state = response['0'].PostOffice['0'].State;
                    $("#all_detail").css('visibility','visible');
                    $(cityId).html(city);
                    $(stateId).html(state);
                } catch (error) {
                    alert("Data not found!! Please enter correct pincode!");
                    $(cityId).val('');
                    $(stateId).val('');
                }
                   
            },
              
        
        });
    }
}