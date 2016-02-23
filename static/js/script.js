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
        row.fadeOut(1000, function() {
          row.remove();
        });
      }
    })
  });
});