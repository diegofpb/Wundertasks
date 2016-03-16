var win = $(this);

getTasksDB();

// Lanzador de evento al escribir.
$('.wl-newtask input').keyup(function(event) {
    if (event.which===13) {
	  if (event.target.value !==""){
		  addTaskDB(event.target.value,false);
		  event.target.value = '';
	  }  
    }
});

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

// Boton Borrar Tarea
$( ".i" ).click(function() {
	var idtarea = $(this).attr('task-id');
	deleteTaskDB(idtarea);
});


// AÑADE LA TAREA CON EL TITULO Y EL DONE EN LISTA PRINCIPAL.
function addTaskDB(title,done){	
	wql.addTask( [title , done], function( error , message ){
		if(error){
			alert(error);
		}else{
			getTasksDB();
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
