$(document).ready(function() {
  var $root = $('html, body');
  $('.smooth-scroll').click(function() {
    $root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
  });
});