$(document).ready(function(){
    $('#bank_name').on('change',function(){
      find_state();
    })
    $('#bank_state').on('change',function(){
      find_city();
    })
    $('#bank_city').on('change',function(){
      find_branch();
    })
     $('#bank_branch').on('change',function(){
      find_ifsc();
    })
    
    function find_state(){
      var bank_name = $("#bank_name :selected").text();
      $("#bank_state").find('option').remove();
      $.ajax({
        url:"/get_state",
        type:"POST",
        data:{bank_name: bank_name},
        success: function(data){    
            $('#bank_state').append(`<option>Select State</option>`)
            data.forEach((state) => {
              $('#bank_state').append(`<option value="${state.id}">${state.adr4}</option>`);
            });
          console.log(data)
        }
      })
    }
    //find city
    function find_city(){
      var bank_name = $("#bank_name :selected").text();
      var bank_state = $("#bank_state :selected").text();
      $("#bank_city").find('option').remove();
      $.ajax({
        url:"/get_city",
        type:"POST",
        data:{bank_name: bank_name,bank_state: bank_state},
        success: function(data){    
            $('#bank_city').append(`<option>Select City</option>`)
            data.forEach((city) => {
              $('#bank_city').append(`<option value="${city.id}">${city.adr3}</option>`);
            });
          console.log(data)
        }
      })
    }
    function find_branch(){
      var bank_name = $("#bank_name :selected").text();
      var bank_state = $("#bank_state :selected").text();
      var bank_city = $("#bank_city :selected").text();
      $("#bank_branch").find('option').remove();
      $.ajax({
        url:"/get_branch",
        type:"POST",
        data:{bank_name: bank_name,bank_state: bank_state,bank_city:bank_city},
        success: function(data){    
            $('#bank_branch').append(`<option>Select Branch</option>`)
            data.forEach((branch) => {
              $('#bank_branch').append(`<option value="${branch.id}">${branch.adr1}</option>`);
            });
  
          console.log(data)
        }
      })
    }
    function find_ifsc(){
      var bank_name = $("#bank_name :selected").text();
      var bank_state = $("#bank_state :selected").text();
      var bank_city = $("#bank_city :selected").text();
      var bank_branch = $("#bank_branch :selected").text();
      $("#bank_ifsc").val(null);
      $(".bank_details").val(null);
      $("#all_detail").css('visibility','hidden');
      $.ajax({
        url:"/get_ifsc",
        type:"POST",
        data:{bank_name: bank_name,bank_state: bank_state,bank_city:bank_city,bank_branch:bank_branch},
        success: function(data){    
          $("#all_detail").css('visibility','visible');
              $('#bank_ifsc').html(`${data[0].ifsc}`);
              $('#bank_name2').html(`${data[0].name}`);
              $('#bank_micr').html(`${data[0].micr}`);
              $('#bank_address').html(`${data[0].adr5}`);
              $('#bank_contact').html(`${data[0].contact}`);
          console.log(data)
        }
      })
    }
  })
   
