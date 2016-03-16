var tasks = [];
var newId = 0;

/**
 * Añade una nueva tarea a la lista de tareas
 * @param string task - tarea a añadir
 */
function newTask(task) {
  tasks.push({id: newId, text:task, done:false, exist:true});
  newId++;
  render();
}

/**
 * Marca una tarea como realizada o sin realizar
 * @param number  task - Identificador de la tarea
 * @param boolean done - True si se quiere marcar la tarea como realizada.
 *                       False en caso contrario
 */
function setDone(task, done) {
  var i;
  for (i=0; i<tasks.length; i++) {
    if (tasks[i].id===task) {
      tasks[i].done = done;
    }
  }
}

/**
 * Elimina una tarea
 * @param number  task - Identificador de la tarea
 */
function deleteTask(task) {
  var i;
  for (i=0; i<tasks.length; i++) {
    if (tasks[i].id===task) {
      tasks[i].exist = false;
    }
  }
}

var win = $(this);

$('.wl-newtask input').keydown(function(event){
	
	if (event.which === "13"){
		newTask(event.currentTarget.value);
	}
	
	console.log(event);
});



function render() {
  var ulNode = $('.wl-tasklist');

  // Vaciar task-list
  ulNode.html('');

  // Insertamos todos los elementos
  tasks.filter(
    item => item.exist
  ).forEach(function(item) {
    var liNode = $('<li></li>')
      .attr('task-id', item.id)
      .addClass('wl-task')
      .addClass(item.done ? 'task-complete' : 'task-active');

    var checkboxNode = $('<figure></figure>')
      .attr('task-id', item.id)
      .addClass('wl-taskdone')
	  .addClass('ui-checkbox')
      .addClass(item.done ? 'active' : '')
      .change(function(event) {
        var task = parseInt($(event.target).attr('task-id'), 10);
        var done = event.target.checked;
        setDone(task, done);
        render();
      });

    var spanNode = $('<span></span>')
      .addClass('wl-tasktext')
      .text(item.text);
    
    var buttonNode = $('<figure></figure>')
      .addClass('wl-taskdelete')
      .attr('task-id', item.id)
      .click(function(event) {
        var task = parseInt($(event.target).attr('task-id'), 10);
        deleteTask(task);
        render();
      })
      .append('<i></i>');

    liNode
      .append(checkboxNode)
      .append(spanNode)
      .append(buttonNode);

    ulNode.append(liNode);
    
      // Añade badge numerico.
	  wz.app.setBadge( tasks.length );

  });
}

function init() {
  /**
   * Evento disparado al pulsar la tecla enter en el cuadro de texto
   * "añadir nueva tarea"
   */
  $('.wl-newtask input').keyup(function(event) {
    if (event.which===13) {
      newTask(event.target.value);
      event.target.value = '';
      render();
    }
  });
  newTask('Soy una tarea completada');
  setDone(0, true);
  newTask('Y yo una sin completar');
  newTask('Y yo otra sin completar');
  
  
  var user = wz.system.user().name;

  var banner = wz.banner();
  banner.setTitle('¡Bienvenido de nuevo '+user+'!');
  banner.setTimeout( 50000 );
  banner.setText('Wundertasks se está preparando...');
  banner.setIcon( 'https://static.inevio.com/app/340/icon.png' )
  banner.setButton( 1, 'Ocultar', 'normal' )
  banner.render();
  console.log(tasks);
  render();
}

init();

$( ".ui-close" ).on( "click", function() {
  wz.app.setBadge( 0 );
});
