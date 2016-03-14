
var win = $(this);
var state = 1; // 1 == listScreen; 2 == playing

var interval = setInterval(function(){

  if( typeof gapi !== 'undefined' && typeof gapi.client !== 'undefined' ){
    clearInterval( interval );
    initYoutube();
  }

}, 50);


var initYoutube = function() {

  gapi.client.setApiKey("AIzaSyBg8hzUoBgchLLjesP7C_owBB6ggbka8WA");

}

var loadList = function( searchQuery ){

}

var backToList = function (){

}

var playVideo = function ( videoId ){

}

win
.key( 'enter', function(){

})

.on( 'click', '.video-item .title, .video-item .thumbnail' , function(){

})

.on( 'click', '.ui-header .arrow' , function(){

});
