var Application = {};

(function(Application, $){

	$("p").append("<em>Привет! </em>"); 
		
	$("#editField").on("change", function(){
		var indexID = Application.lastID();
		var _currentItem = $("#editField").val();
		var currentID  = 'itemID' + indexID;
		var labelID    = 'lablID'+ indexID;
		console.log( "adding " + _currentItem  + "id=" + currentID);
		$("#result").append("<input type='checkbox' class = 'itemList' id="+currentID+" /><label id="+labelID+" >"+_currentItem+"</label> <br />");
		$("#"+currentID).click(function() { 
			var isCheck = $(this).prop('checked');
			console.log(" checkbox press... " + isCheck );
			if (isCheck){
				$(this).next().css("text-decoration", "line-through");
				$(this).next().fadeTo("slow",0.33); 
			}else{
				$(this).next().css("text-decoration", "none");
				$(this).next().fadeTo("slow",1); 				
			}
		});
		$("#"+currentID).next().dblclick(function() { 
			console.log("dblclck .. edit: " +$(this).text() + " id= " + $(this).attr('id'));
			var currentItem = $(this).text();
			var labelID = $(this).attr('id');
/*
			$(this).replaceWith( "<input type='text' id='"+labelID+ "' value='"+currentItem+"' >");
			$("#"+labelID).change(function(){
				console.log(" change press... "  );
				// $(this).replaceWith( "<label id="+labelID+" >"+currentItem+"</label>");			
			});	*/
		});
		$("#"+currentID).next().mouseenter(function() { 
			console.log("mouseenter - TODO change to hover...: " +$(this).text());
		});
	});
	
	$("#addButton").click(function() { 
		$(this).change(); 
	}); 
	
	$("#deleteButton").click(function() { 
		var currentID = 'itemID'+($(".itemList").length-1);
		console.log("deleting..." + currentID );
		$("#"+currentID).next().remove(); 
		$("#"+currentID).next().remove(); 
		$("#"+currentID).remove(); 
	}); 

	$("#deleteSelectedButton").click(function() { 
		var indexID = Application.lastID(); 
		var isCheck, currentID ;
		

		console.log(" deleting all selected from "+ indexID );
		while( indexID-- > 0){
			currentID = 'itemID'+indexID;
			isCheck = $("#"+currentID).prop('checked');
			console.log(" itemID "+ currentID + " isCheck " + isCheck );
			if (isCheck){
				console.log(" deleting " + $("#"+currentID).next().val() );
				$("#"+currentID).next().remove(); 
				$("#"+currentID).next().remove(); 
				$("#"+currentID).remove(); 
			}
		}
	}); 
	
	$("#selectAllCheckbox").click(function() { 
		var indexID = Application.lastID(); 
		var currentID ;
		var isCheck = $(this).prop('checked');
		
		console.log(" checkbox for selecting all... " + isCheck );		
		while( isCheck && (indexID-- > 0) ){
			currentID = 'itemID'+indexID;
			$("#"+currentID).attr('checked',true)
			$("#"+currentID).next().css("text-decoration", "line-through");
			$("#"+currentID).next().fadeTo("slow",0.33); 
		}
	});
	
	Application.lastID = function(){
		console.log(" lastID... " );
		if ( ($(".itemList").last().attr('id')) == undefined){
			return 0;
		}
		return ( 1 + parseInt(($(".itemList").last().attr('id')).substring('itemID'.length), 10) ) ;
	};
	
}) (Application, jQuery);