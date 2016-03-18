// -- DOM -- //
// Info tab
var welcomePage                = $('.welcome-page');
var welcomePageLogin           = $('.welcome-page .ui-btn.big');


var slideBar                   = $('.wl-sidebar');
var inbox                      = $('#inbox');
var windowContent              = $('.wl-window');




var setWelcomeTexts = function() {
	welcomePage.find('.welcome-first').text(lang.welcomeTitle);
	welcomePage.find('.welcome-second').text(lang.welcomeSubtitle);
	welcomePageLogin.find('.ellipsis').text(lang.welcomeLogin);
}

var setAppText = function() {
	slideBar.find('.ui-navgroup-title-txt').text(lang.listTitle);
	inbox.find('.ui-navgroup-element-txt').text(lang.inbox);
	slideBar.find('.btn-new-list').text(lang.newList);
	windowContent.find('.wl-newtask-placeholder')[0].placeholder=lang.newTask;
}

// funcion main
var init = function(){
	setWelcomeTexts();
	wql.getTasks(function(error, message) {
		if (message.length===0) {
			welcomePage.show();
		}
	})
	setAppText();
}




welcomePageLogin.on('click', function() {
	welcomePage.slideUp("fast");
});

// main de la app
init();