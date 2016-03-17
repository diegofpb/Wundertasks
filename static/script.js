var win = $(this);
var actual = 1;

//Al arrancar, obtiene todas las tareas de la lista principal.
getTasksDB();
getListsDB();

// Lanzador de evento al escribir.
$('.wl-newtask input').keyup(function(event) {
    if (event.which===13) {
	  if (event.target.value !==""){
		  addTaskDB(event.target.value,false,actual);
		  event.target.value = '';
	  }  
    }
});

// Función que será para notificar mediante notificacion de Inevio.
function avisarNotificar() {
	var user = wz.system.user().name;
	var banner = wz.banner();
	banner.setTitle('¡Bienvenido de nuevo '+user+'!');
	banner.setTimeout( 50000 );
	banner.setText('Wundertasks se está preparando...');
	banner.setIcon( 'https://static.inevio.com/app/340/icon.png' )
	banner.setButton( 1, 'Ocultar', 'normal' )
	banner.render();
}

// Funcion que al pulsar sobre un checkbox, marca si esta done o no done.
$( ".ui-checkbox" ).click(function() {
	if($(this).hasClass('active')){
		udpdateTaskDB(false,idtarea);
	}else{
		udpdateTaskDB(true,idtarea);
	}
});


// Boton Crear Lista
$( ".addlist" ).click(function(){
	var titulo = prompt("Introduce el titulo de la lista","",function(text){
		addListDB(text,"description1");
	});
	
	
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Boton Cargar Listas
$( ".wl-tordo" ).click(function(){
// 	alert("Podrás añadir listas próximamente...");
	getListsDB();
});

// Boton Borrar Lista
$( ".wl-cacota" ).click(function(){
// 	alert("Podrás añadir listas próximamente...");
	var person = prompt("Introduce el ID");
	deleteListDB(person);
	
});




// Boton Borrar Tarea
$( ".i" ).click(function() {
	var idtarea = $(this).attr('task-id');
	deleteTaskDB(idtarea);
});


// AÑADE LA TAREA CON EL TITULO Y EL DONE EN LISTA PRINCIPAL.
function addTaskDB(title,done,list){	
	wql.addTaskToList([title , done, list], function( error , message ){
		if(error){
			alert(error);
		}else{
			getTasksOfListDB(list);
		}
	});
}

// ELIMINA LA TAREA CON EL ID SELECCIONADO DE LA LISTA PRINCIPAL.
function deleteTaskDB(taskid){
	wql.removeTask([taskid], function( error , message ){
		if(error){
			alert("Ocurrió un problema al borrar la tarea. Reinicia la App.")
		}else{
			getTasksDB();
		}
	});
}

// MODIFICA EL DONE DE LA TAREA CON EL ID SELECCIONADO DE LA LISTA PRINCIPAL.
function udpdateTaskDB(done,taskid){
	wql.updateTask([done,taskid], function( error , message ){
		if(error){
			alert("Ocurrió un problema al borrar la tarea. Reinicia la App.")
		}else{
			getTasksDB();
		}
	});
}

// CUENTA EL NUMERO DE TAREAS DE UN USUARIO.
function getExistTask(){
	wql.getTasks(function( error , message ){
		if(error){
			alert("Ocurrió un problema. Reinicia la App.")
		}else{
			return message.length;
		}
	});
}




function getTasksDB(){
	wql.getTasks(function( error , message ){
	
		if(error){
			alert("Ocurrió un problema. Reinicia la App.")
		}else{
			
			var ulNode = $('.wl-tasklist');
			var contador = message.length;

			ulNode.html('');
			
			message.forEach(function(item) {

				var liNode = $('<li></li>')
			      .attr('task-id', item.id)
			      .addClass('wl-task')
			      .addClass(item.done ? 'task-complete' : 'task-active');
			
			    var checkboxNode = $('<figure></figure>')
			      .attr('task-id', item.id)
			      .addClass('wl-taskdone')
				  .addClass('ui-checkbox')
			      .addClass(item.done ? 'active' : '')
			      .click(function(event) {
			        var task = parseInt($(event.target).attr('task-id'), 10);
			        if($(this).hasClass('active')){
						udpdateTaskDB(false,item.id);
					}else{
						udpdateTaskDB(true,item.id);
					}
			      })
				  .append('<i></i>');
			
			    var spanNode = $('<span></span>')
			      .addClass('wl-tasktext')
			      .text(item.title)
			      .addClass(item.done ? 'taskcomplete' : '');
			    
			    var buttonNode = $('<figure></figure>')
			      .addClass('wl-taskdelete')
			      .attr('task-id', item.id)
			      .click(function(event) {
			        var task = parseInt($(event.target).attr('task-id'), 10);
			        deleteTaskDB(task);
			      })
			      .append('<i task-id="'+item.id+'"></i>');
			
			    liNode
			      .append(checkboxNode)
			      .append(spanNode)
			      .append(buttonNode);
			
			    ulNode.append(liNode);
			});
		wz.app.setBadge(contador);
		};
	});
}

// AÑADE UNA LISTA
function addListDB(title,description){	
	wql.addList( [title , description], function( error , message ){
		if(error){
			alert(error);
		}else{
			getListsDB();
		}
	});
}

// ELIMINA UNA LISTA Y SUS TAREAS
function deleteListDB(listid){
	wql.removeAllTasksFromList([listid], function( error , message ){
		if(error){
			alert("Ocurrió un problema al borrar la lista. Reinicia la App.")
		}else{
			getListsDB();
		}
	});
}

function getTasksOfListDB(id){
	wql.getTasksFromLists([id],function( error , message ){
	
		if(error){
			alert("Ocurrió un problema. Reinicia la App.")
		}else{
			
			var ulNode = $('.wl-tasklist');
			var contador = message.length;

			ulNode.html('');
			
			message.forEach(function(item) {

				var liNode = $('<li></li>')
			      .attr('task-id', item.id)
			      .addClass('wl-task')
			      .addClass(item.done ? 'task-complete' : 'task-active');
			
			    var checkboxNode = $('<figure></figure>')
			      .attr('task-id', item.id)
			      .addClass('wl-taskdone')
				  .addClass('ui-checkbox')
			      .addClass(item.done ? 'active' : '')
			      .click(function(event) {
			        var task = parseInt($(event.target).attr('task-id'), 10);
			        if($(this).hasClass('active')){
						udpdateTaskDB(false,item.id);
					}else{
						udpdateTaskDB(true,item.id);
					}
			      })
				  .append('<i></i>');
			
			    var spanNode = $('<span></span>')
			      .addClass('wl-tasktext')
			      .text(item.title)
			      .addClass(item.done ? 'taskcomplete' : '');
			    
			    var buttonNode = $('<figure></figure>')
			      .addClass('wl-taskdelete')
			      .attr('task-id', item.id)
			      .click(function(event) {
			        var task = parseInt($(event.target).attr('task-id'), 10);
			        deleteTaskDB(task);
			      })
			      .append('<i task-id="'+item.id+'"></i>');
			
			    liNode
			      .append(checkboxNode)
			      .append(spanNode)
			      .append(buttonNode);
			
			    ulNode.append(liNode);
			});
		wz.app.setBadge(contador);
		};
	});
}


// RECOGE LAS LISTAS DE UN USUARIO
function getListsDB(){
	wql.getLists(function( error , message ){
	
		if(error){
			alert("Ocurrió un problema. Reinicia la App.")
		}else{
			
			
			var ulNode2 = $('.wl-listoflists');
			var contador = message.length;

			ulNode2.html('');
			
			message.forEach(function(item) {

				var liNode2 = $('<li></li>')
				.click(function(event) {
			    	getTasksFromLists(item.id);
			    });
				
			      
			    var figure1 = $('<figure></figure>')
			      .addClass('ui-navgroup-element-icon')
			      .addClass('task-icon')
			      .attr('list-id', item.id)
			      .append('<i></i>');
			      
			    
			    var span1 = $('<span></span>')
			      .addClass('ui-navgroup-element-txt')
			      .text(item.title)
			      .attr('list-id', item.id);

			    var cajita = $('<article></article>')
			      .attr('list-id', item.id)
			      .addClass('ui-navgroup-element')
				  .addClass('ui-checkbox')
			      .addClass(item.id===1 ? 'active' : '')
			      .append(figure1)
			      .append(span1);
			
				  
			    liNode2.append(cajita);
			
			    ulNode2.append(liNode2);
			});
		};
	});
}


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
	welcomePage.show();
}




welcomePageLogin.on('click', function() {
	welcomePage.slideUp("slow");
});

// main de la app
init();