$(document).ready(function() {
  
  $('.delete-show').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var row = $(this).parent();
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function(data) {
      console.log(data);
      if (data === 'success') {
        row.parent().fadeOut(1000, function() {
          row.parent().remove();
        });
      }
    })
  });

  $(".button-collapse").sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true
  });


  $('#differentForm').formValidation({
    framework: 'materialize',
    fields: {
        password: {
            validators: {
                identical: {
                    field: 'confirmPassword',
                    message: 'The password and its confirm are not the same'
                }
            }
        },
        confirmPassword: {
            validators: {
                identical: {
                    field: 'password',
                    message: 'The password and its confirm are not the same'
                }
            }
        }
    }
  });
});