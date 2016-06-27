var Application = {};

(function(Application, $){

	$("p").append("<em>Привет! </em>"); 
		
	$("#editField").on("change", function(){
		var indexID = Application.lastID();
		var _currentItem = $("#editField").val();
		var currentID  = 'itemID' + indexID;
		var labelID    = 'lablID'+ indexID;
		console.log( "adding " + _currentItem  + "id=" + currentID);
		$("#result").append("<div class = 'inputWrapper'> <input type='checkbox' class = 'itemList' id="+currentID+" /> <br /> </div>");
		$("#"+currentID).after("<input type='text' class = 'itemText' id="+labelID+" value='"+_currentItem+"' readonly='true' />");
		$("#"+labelID).dblclick(function() { 
			console.log("dblclck .. edit: " +$(this).val() + " id= " + $(this).attr('id'));
			var currentItem = $(this).val();
			var labelID = $(this).attr('id');
			$(this).replaceWith("<input type='text' class = 'itemText' id="+labelID+" value='"+currentItem+"' />");
			$(this).focus();
			$(this).replaceWith("<input type='text' class = 'itemText' id="+labelID+" value='"+currentItem+"' readonly='true' />");
		});	
	
		$("#"+labelID).after($('<input type="image" class="xButton" src="images/x.gif" />')
			.css({ 'display': 'none', 'cursor': 'pointer', 'marginLeft': '-20px' }));
		/* in this place mouseup and click does not work always. And click does not work .*/
		($("#"+labelID).next()).on("mouseup", function() { //вешаем обработчик на клик
						console.log(" must be xButton to Delete click...: ");
						$(this).parent().remove();
                });
				
        $("#"+labelID).mouseenter(function() {  
			// console.log("mouseenter - TODO change to hover...: " +$(this).text());
			$(this).next().show();
        });
		$("#"+labelID).mouseleave(function() { 
			// console.log("mouseleave - TODO change to hover...: " +$(this).text());
			$(this).next().hide();
        });
		
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


	});
	
	$("#addButton").click(function() { 
		$(this).change(); 
	}); 
	
	$("#deleteButton").click(function() { 
		console.log("deleting LAST..."  );
		$(".inputWrapper").last().remove();
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
				$("#"+currentID).parent().remove();
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