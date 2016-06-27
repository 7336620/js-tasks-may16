var Application = {};

(function(Application, $){
	var
		_document,
		_$container,
		id = 0;
		
		Application.init = function(document){
			_document = document;
			_$container = $('#todo-container');
			
			this.addTaskContainer(_$container);
			_$container.click($.proxy( this.containerOnClick, this));
		};
		
		Application.containerOnClick = function(evt){
			if ( evt.target.hasAttribute('data-action')) {
				switch (evt.target.getAttribute('data-action')) {
					case 'addTask' : this.onAddTask(evt); break;
					case 'clearTasks' : this.onClearTasks(evt); break;
					case 'removeTask' : this.anTaskDelete(evt); break;						
				}
			}
		};
		
		Application.addTaskContainer = function(baseNode, subTasks){
			var id = this.nextId();
			
			$baseNode.append($('<ul id="' + id + '"></ul>'));
			
			$baseNode.append(
				$('<button data-action="addTask" data-task-container-id = "' + id + '">' + (subTasks))
			);	

			$baseNode.append(
				$('<button data-action="clearTasks" data-task-container-id = "' + id + '">' + (subTasks))
			);							
		};
		
		Application.nextId = function(){
			return 'id' + id++;
		};
			
		Application.onClearTasks = function(evt){
			$('#' + $(evt.target).attr('data-task-container-id')).empty();
		};		
		
		Application.onAddTask = function(evt){
			var $taskContainer = $('#' + $(evt.target).attr('data-task-container-id')),
				newTaskId = this.nextId(),
				$newTask = $('<li id="' + newTaskId +'"></li>');
				
			$newTask.append('<input name="task' + newTaskId+ '" ,>');
			$newTask.append('<button data-action="removeTask" data-task-id="'+newTaskId + '" >);
		};		
		
		Application.onTaskDelete = function(evt) {
			$('#'+ $(evt.target).attr('data-task-id')).remove();
		}
}) (Application, jQuery);