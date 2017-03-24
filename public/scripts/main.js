$(document).ready(function() {
  var firstSubdir = window.location.pathname
    .split('/')[1];
  $('aside a').each(function() {
    var hrefValue = $(this).attr('href').split('/')[1];
    if (hrefValue === firstSubdir) {
      $(this).attr('href', '');
      $(this).parent('li').addClass('active');
    }
  });
  
});
