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

  $('.button-collapse').sideNav({
    menuWidth: 300,
    edge: 'left',
    closeOnClick: true
  });

});
