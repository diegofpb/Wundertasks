$('.wl-connect').click(function() {
  console.log('wunderlist connect pressed');
  $.get('https://a.wunderlist.com/api/v1/tasks', function(data) {
    console.log(data);
  })
});