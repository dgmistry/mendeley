//check input
function checkInput(){
  //if the search input is blank
	var SearchString = $('#search').val();
	var authSearchString = $('#authsearch').val();
	var comboSearchString = SearchString + ";" + authSearchString;  
	//console.log(comboSearchString);
  if(SearchString=='' && authSearchString==''){
	//message is blank
	toggleMessage(true);

	//submit button is hidden
	toggleSubmit(false);

	//score button is hidden
	toggleScore(false);
  }
  
  //else (if the search input is not blank)
  
  else
  {
	//make a new regex object
	
	var rE = new RegExp(SEARCH_REGEX);

	//valid or not flag
	
	if(SearchString !="" && authSearchString !=""){
		var validOrNot = rE.test(comboSearchString);
		//console.log("neither blank");
	}
	else if (SearchString == "") {
		var validOrNot = rE.test(authSearchString);
		//console.log("paper blank, author not");
	}
	else{
		var validOrNot = rE.test(SearchString);
		//console.log("author blank, paper not");
	}
	//set message
	toggleMessage(validOrNot);

	//set submit button visibility
	toggleSubmit(validOrNot);

	//score button is hidden
	toggleScore(validOrNot);
  }
}

function nextPageResults(){
	pageNumber++
	$("#currentpage").text("Page # " + (pageNumber+1));
	sendClick();
}

function priorPageResults(){
	if (pageNumber > 1){
		pageNumber--
		$("#currentpage").text("Page # " + (pageNumber+1));
		sendClick();
	}
	else if (pageNumber === 1){
		pageNumber--
		$("#currentpage").text("Page # " + (pageNumber+1));
		sendClick();
		togglePrior(false);
	}
}

//send click
function sendClickPage(){
	pageNumber = 0;
	$("#currentpage").text("Page # " + (pageNumber+1));
	sendClick();
}

function sendClick(){
	//clear previous results
	clear(false);
	
	$('#pp').children().remove();
	$('#aa').children().remove();
	$("#extracontainer").show();
	//call send with proper url and utility function
	var paperQuantity = $('#paperQuant').val();
	console.log(paperQuantity);
	
	var pageString = "&page="+pageNumber;
	console.log(pageString);
	var SearchString = $('#search').val();
	var authSearchString = $('#authsearch').val();
	var comboSearchString = authSearchString + ";" + SearchString;
	console.log(comboSearchString);
	if (SearchString != "" && authSearchString != "") {
		send(PROXY_URL+SEARCH_PATH+comboSearchString+'/',CONSUMER_KEY+paperQuantity+pageString,populate);
	console.log("It's a 1!");
	}
	else if (authSearchString === "") {
	console.log("It's a 2!");
		send(PROXY_URL+SEARCH_PATH+$('#search').val()+'/',CONSUMER_KEY+paperQuantity+pageString,populate);
	}
	else {
		send(PROXY_URL+AUTHSEARCH_PATH+$('#authsearch').val()+'/',CONSUMER_KEY+paperQuantity+pageString,populate);
		console.log("It's a 3!");
	}
	
	toggleNext(true);
	if (pageNumber > 0){
		togglePrior(true);
	}
	
	keywordSliders();
}

//clear click
function clearClick(){
  //clear previous results
  clear(true);
}

//mouse over handler
function over(){
  //set the country
//console.log(tableData);
//      tableData.setValue(0, 0, 'United States');
//      tableData.setValue(0, 1, 300);
//
//geomap.setSelection([{row:1,column:null}]);
//console.log(geomap.getSelection());
/*
var view = new google.visualization.DataView(tableData);
view.setRows(view.getFilteredRows([{column: 1, minValue: 700}]));
geomap.draw(view,{sortColumn:1});
//geomap.setSelection(view);
*/
//geomap.draw(tableData,tableConfigOpts);
//drawMap(false);
}

//mouse out handler
function out(){
  //
console.log('out');
};

function customSort(response){
		
		var tps = [],
		    self = {};
		
		$('.termPriorityWeight').each(function (i, v) {
            self = $(this);
		    tps.push( { term : self.attr('data-term'), value : self.val() } );
		});
		
        console.log("Terms: " + JSON.stringify(tps));
		
		origauthorWeight = $( "#authslider" ).slider( "values", 1 ); 
		
		authorWeight = 1.1-((origauthorWeight + .1)*.1);
		
		origtitleWeight =  $( "#titleslider" ).slider( "values", 1 ); 
		titleWeight = 1.1-((origtitleWeight + .1)*.1);
		
// 		pubWeight = $( "#pubslider" ).slider( "values", 1 ); 
//		pubWeight = Math.abs(pubWeight-100)+1;
		pYear1 = $( "#slider-range" ).slider( "values", 0 );
		pYear2 = $( "#slider-range" ).slider( "values", 1 );
		
        
		
		//Search Term Priority
		// t0 = $( "#t0slider" ).slider( "values", 1 ); 
		// t0 = Math.abs(t0-100)+1;
		// t1 = $( "#t1slider" ).slider( "values", 1 ); 
		// t1 = Math.abs(t0-100)+1;
		// t2 = $( "#t2slider" ).slider( "values", 1 ); 
		// t2 = Math.abs(t0-100)+1;
		// t3 = $( "#t3slider" ).slider( "values", 1 ); 
		// t3 = Math.abs(t0-100)+1;
		// a0 = $( "#at0slider" ).slider( "values", 1 ); 
		// a0 = Math.abs(t0-100)+1;
		// a1 = $( "#at1slider" ).slider( "values", 1 ); 
		// a1 = Math.abs(t0-100)+1;
		// a2 = $( "#at2slider" ).slider( "values", 1 ); 
		// a2 = Math.abs(t0-100)+1;
		// a3 = $( "#at3slider" ).slider( "values", 1 ); 
		// a3 = Math.abs(t0-100)+1;
		
		
		console.log("Author Weight = " + authorWeight);
		console.log("Title Weight = " + titleWeight);
	//	console.log("Publication Weight = " + pubWeight); 
	
		var sortedResponse = response;
		
		var SearchTerms = ($('#search')[0].value + " " + $('#authsearch')[0].value);
		SearchTerms = $.trim(SearchTerms);
		SearchTerms = SearchTerms.split(' ');
		
        // console.log(sortedResponse.documents.pop().title);
		 
		//Filter Year	- THIS IS REMOVING AN ENTRY BY ACCIDENT!!!
		if (pYear1 != ""){
			for(var i=0, itemSize=sortedResponse.documents.length; i<itemSize; i++) {
			
				if (pYear1 <= sortedResponse.documents[i].year && pYear2 >= sortedResponse.documents[i].year){
						
				}
				else if (sortedResponse.documents[i].year != undefined) {
					//console.log("NO MATCH " + sortedResponse.documents[i].year);
					sortedResponse.documents.splice(i,1);
 					//console.log("Deleting Item" + i); 
					itemSize = itemSize-1;
					i--;
				};
				
			};
			
		};
		
		 //Sorting Algorithm
		 console.log("sortedResponse length: " + sortedResponse.documents.length);
		$.each(sortedResponse.documents, function(key, val) {
			var i=key+1;
	
			
			if (val.authors != null) {
				var lcAuthors=val.authors.toLowerCase();
				lcAuthors = lcAuthors.replace(/[^\w\s]/g, "");
			}
			else {
				var lcAuthors = "";
			}
			

			if (val.title != null) {
				var lcTitle=val.title.toLowerCase();
				lcTitle = lcTitle.replace(/[^\w\s]/g, "");
			}
			else {
				var lcTitle = "";
			}
			
			var SLength = SearchTerms.length;
			
			var PaperScore = (i);
			
			while (SLength--) {
				if( $( "#titleslider" ).slider( "values", 1 ) != 0){
					if (lcTitle.indexOf(SearchTerms[SLength]) !== -1) {
						PaperScore = (PaperScore*titleWeight);
						console.log("PAPER MATCH");
					} 
				}
				
				if( $( "#authslider" ).slider( "values", 1 ) != 0){
					if (lcAuthors.indexOf(SearchTerms[SLength])  !== -1) {
						console.log("AUTH MATCH");
						PaperScore = (PaperScore*authorWeight);
					}
				}
				val.sortOrder = PaperScore;
				
			}
			
			console.log(val.sortOrder);
			console.log(lcAuthors);
			console.log(lcTitle); 
			i++;
		});
		
		function compareDocuments(a, b){
		return a.sortOrder - b.sortOrder;
		}
		
		sortedResponse.documents.sort(compareDocuments);
		
		$.each(sortedResponse.documents, function(key, val) {
			
	//		console.log(val.sortOrder);
	//		console.log(val.year);
		});
//	});
}

function reSort(){
	$('#spinner2').fadeIn(200,function(){
		storeResponse = jQuery.extend(true, {}, originalResponse);
		//if(storeResponse.documents != null && storeResponse.documents != "undefined") {
		
			customSort(storeResponse);
			$('#results').children().remove();
			populate(storeResponse);
	//	}
		$('#spinner2').fadeOut(1000);
	});
}

function setTimer(){
	
	clearTimeout(currentTimeout);
	currentTimeout = setTimeout(reSort,2250);
	
}

function timerSort(){
	if (currentTimeout) {
		clearTimeout(currentTimeout);
		reSort();
	}
}

function displaySliders(){
	
	$(function() {
		$( "#slider-range" ).slider({
			range: true,
			min: 1900,
			max: 2011,
			values: [ 1950, 2011 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
			}
		
		});

		$( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) +	" - " + $( "#slider-range" ).slider( "values", 1 ) );
	});
	
}

function displayPaperQuantSlider(){

	$(function() {
		$( "#pqslider" ).slider({
			range: "min",
			min: 10,
			max: 1000,
			step: 50,
			value: 10,
			slide: function( event, ui ) {
				$( "#paperQuant" ).val( ui.value );
			}
		});
		$( "#paperQuant" ).val( $( "#pqslider" ).slider( "value" ) );
	}); 

}

function displayAuthorSlider(){

	$(function() {
		$( "#authslider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 10,
			value: 0,
			slide: function( event, ui ) {
				$( "#authorPriority" ).val( ui.value );
			}
		});
		$( "#authorPriority" ).val( $( "#authslider" ).slider( "value" ) );
	}); 
	

}

function displayTitleSlider(){

	$(function() {
		$( "#titleslider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 10,

			value: 0,
			slide: function( event, ui ) {
				$( "#titlePriority" ).val( ui.value );
			}
		});
		$( "#titlePriority" ).val( $( "#titleslider" ).slider( "value" ) );
	}); 
	
}

function displayPublicationSlider(){

	$(function() {
		$( "#pubslider" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 10,
			value: 0,
			slide: function( event, ui ) {
				$( "#pubPriority" ).val( ui.value );
			}
		});
		$( "#pubPriority" ).val( $( "#pubslider" ).slider( "value" ) );
	}); 
	

}

function keywordSliders(){

	var SearchTerms = $('#search')[0].value;
	SearchTerms = $.trim(SearchTerms);
	SearchTerms = SearchTerms.split(' ');
	
	var authSearchTerms = $('#authsearch')[0].value;
	authSearchTerms = $.trim(authSearchTerms);
	authSearchTerms = authSearchTerms.split(' ');

	if (SearchTerms[0] != "undefined" && SearchTerms[0] != ""){
		for (var i = 0; i < SearchTerms.length; i++) {
			sliderArray[i]=SearchTerms[i];
			sliderArray[i] = sliderArray[i].replace(/["]{1}/gi,"");
		}
		superSliders("pp");
		
	}
	
	sliderArray = [];
	
	if (authSearchTerms[0] != "undefined" && authSearchTerms[0] != ""){
		for (var i = 0; i < authSearchTerms.length; i++) {
			sliderArray[i]=authSearchTerms[i];
			sliderArray[i] = sliderArray[i].replace(/["]{1}/gi,"");		
		}
		superSliders("aa");
	}
	
	sliderArray = [];
	
} 

function createSlider(num, q) {
	tSlider="t"+num+q+"slider";
	tPriority="t"+num+q+"Priority";
	tLabel="t"+num+q+"label";

	//console.log("tlabel: "+tLabel);

	$('<div>',{'id':q+sliderArray[num]}).appendTo('#'+q).fadeIn(1000);
	$('<p>',{'id':'p'+num+q}).appendTo('#'+q+sliderArray[num]).fadeIn(1000);
	$('<div>',{'id':tLabel,'class':'tlabel'}).appendTo('#p'+num+q).fadeIn(1000);
	$('<div>',{'id':'d'+num+q,'style':'float:left'}).appendTo('#p'+num+q).fadeIn(1000);
	$('<input>',{'id':tPriority, 'data-term' : sliderArray[num], 'class':'ui-state-default round-me dynSliderVal termPriorityWeight'}).appendTo('#d'+num+q).fadeIn(1000);
	$('<br>').appendTo('#'+q+sliderArray[num]).fadeIn(1000);
	$('<div>',{'id':tSlider,'class':'dynSlider', 'data-update' : tPriority}).appendTo('#'+q+sliderArray[num]).fadeIn(1000);
	$('<br>').appendTo('#'+q+sliderArray[num]).fadeIn(1000);



	$( "#" + tSlider).slider({
		range: "min",
		min: 0,
		max: 10,
		value: 0,
		slide: function( event, ui ) {
		    var id = $(this).attr('data-update');
			$( "#" + id).val( ui.value );
			console.log("JOSH: " + tPriority);
		}
	});
	
	$( "#" + tPriority).val( $("#" + tSlider).slider( "value" ) );
	$("#" + tLabel).text(sliderArray[num]+"  ");

}
function superSliders(q) {
    var i = 0, len = sliderArray.length;
    numKeyWords = sliderArray.length;
    
    for (; i < len; i++) {
        createSlider(i, q);
    }
}
	
function superSlidersOld(q){
	
	numKeyWords = (sliderArray.length);
	
	for (var i = 0; i < sliderArray.length; i++) {
	//jQuery.each(sliderArray, function(){
		//i=0;
		//console.log("arr len: " + sliderArray.length);
		(function(num){
			tSlider="t"+num+q+"slider";
			tPriority="t"+num+q+"Priority";
			tLabel="t"+num+q+"label";
		
			//console.log("tlabel: "+tLabel);
		
			$('<div>',{'id':q+sliderArray[num]}).appendTo('#'+q).fadeIn(1000);
			$('<p>',{'id':'p'+num+q}).appendTo('#'+q+sliderArray[num]).fadeIn(1000);
			$('<div>',{'id':tLabel,'class':'tlabel'}).appendTo('#p'+num+q).fadeIn(1000);
			$('<div>',{'id':'d'+num+q,'style':'float:left'}).appendTo('#p'+num+q).fadeIn(1000);
			$('<input>',{'id':tPriority,'class':'ui-state-default round-me dynSliderVal'}).appendTo('#d'+num+q).fadeIn(1000);
			$('<br>').appendTo('#'+q+sliderArray[num]).fadeIn(1000);
			$('<div>',{'id':tSlider,'class':'dynSlider'}).appendTo('#'+q+sliderArray[num]).fadeIn(1000);
			$('<br>').appendTo('#'+q+sliderArray[num]).fadeIn(1000);
		
		
			$(function() {
				$( "#" + tSlider).slider({
					range: "min",
					min: 0,
					max: 10,
					value: 0,
					slide: function( event, ui ) {
						$( "#" + tPriority).val( ui.value );
						console.log("JOSH: " + tPriority);
					}
				});
				
				$( "#" + tPriority).val( $("#" + tSlider).slider( "value" ) );
				$("#" + tLabel).text(sliderArray[num]+"  ");
			});
		
		}(i));
		//i++;
	}
	/* for (var i = 0; i < sliderArray.length; i++) {
		tSlider="t"+i+q+"slider";
		tPriority="t"+i+q+"Priority";
		$( "#" + tSlider ).slider({
			slide: function(event, ui) { 
				$( "#" + tPriority).val( ui.value );
			}
		});
	} */
}
