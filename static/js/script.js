$(document).ready(function() {
  $('.delete-show').click(function(e) {
    e.preventDefault();
    var url = $(this).attr('href');
    var well = $(this).parent();
    $.ajax({
      url: url,
      method: 'DELETE'
    }).done(function(data) {
      console.log(data);
      if (data === 'success') {
        well.fadeOut(1000, function() {
          well.remove();
        });
      }
    })
  });
});