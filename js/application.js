window.onload=function(){
	$("#createNew").on("click",create);
	$(".qtyInput").change(priceChange);
}

function priceChange(event){
	var rowId = event.target.closest(".itemRow").id;
	var unitPrice = removeDollar($("#" + rowId).find(".unitPrice").html());
	$("#" + rowId).find(".price").html("$" + floatDP(unitPrice * event.target.value));
	var allPrice = $(".price");
	var sum = 0;
	for (var i=1;i<allPrice.length-1;i++){
		sum += removeDollar(allPrice[i].innerHTML);
	}
	$("#overallPrice").html("Total: $" + floatDP(sum));
}

function verify(name,price){
	if (name == ""){
		alert("Empty item name!");
		return false;
	}else if(!$.isNumeric(price)){
		alert("Not a valid price");
		return false;
	}
	return true;
}

function create(event){
	var newName = $("#newName").val();
	var newUnitPrice = $("#newUnitPrice").val();
	//Warn if value not appropriate: 1>newName=empty and 2> not number
	if(!verify(newName,newUnitPrice)){return;};
	var newRow = $(".itemRow").first().clone()
	newRow.children(".name").html(newName);
	newRow.children(".quantity").html('QTY<input type="text" class="qtyInput"/>');
	newRow.children(".cancelItem").html('<button class="delete">DELETE</button>');
	newRow.children(".unitPrice").html("$" + floatDP(newUnitPrice));
	newRow.find("button.delete").on("click",deleteRow);
	newRow.attr("id",newName.toLowerCase().replace(" ",""));
	newRow.appendTo($("section").first());
	$("#create").find("input").val("");
	$(".qtyInput").change(priceChange);
}

function deleteRow(event){
	event.target.closest(".itemRow").remove();
	priceChange(event);
}

function floatDP(number){
	return parseFloat(number).toFixed(2);
}

function removeDollar(string){
	string = string || "";
	return parseFloat(string.replace("$",""));
}