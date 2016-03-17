// -- DOM -- //
//Info tab
var welcomePage                = $('.welcome-page');
var welcomePageLogin           = $('.welcome-page .ui-btn.big');

var setInitialTexts = function() {
	welcomePage.find('.welcome-first').text(lang.welcomeTitle);
	welcomePage.find('.welcome-second').text(lang.welcomeSubtitle);
	welcomePageLogin.find('.ellipsis').text(lang.welcomeLogin);
}

// funcion main
var init = function(){
	setInitialTexts();
	wql.getTasks(function(error, message) {
		if (message.length===0) {
			welcomePage.show();
		}
	})
}




welcomePageLogin.on('click', function() {
	welcomePage.slideUp("fast");
});

// main de la app
init();