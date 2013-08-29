var rsplit = function (str, matchThis) {
  var length = str.length, whereToSplit = undefined;
  for (var i = length; i > 0; i--) {
      if (str[i] === matchThis) {
          whereToSplit = i;
          break;
      }
  }
  return [
      str.slice(0,whereToSplit + 1),
      str.slice(whereToSplit + 1, length)
  ];
};
var tipperate = function(){
  // Tooltip hover stuff
  var $tree = $('.treemap'),
      $cap = $('<figcaption/>').appendTo($tree);

  $tree.find('.node').on('mouseenter',function(){
    var $this = $(this),
        bg = $this.css('background-color'),
        tooltipText = $this.data('tooltip'),
        serviceDetails = rsplit(tooltipText, ':');
    
    $cap.html('<span class="service-name">' + serviceDetails[0] + '</span><span class="service-details">' + serviceDetails[1] + '</span>');
    $('<span class="keyBlock"/>').css('background-color',bg).prependTo($cap);
  });
  $tree.on('mouseleave', function () {
    $cap.empty();
  });
}