function bindings(){
  //bind 'key up' -> search input
  $('#search').keyup(checkInput);
  $('#search').keypress(function(e){
      if(e.which == 13){
       sendClickPage();
       }
  });

  //bind 'key up' -> author search input
  $('#authsearch').keyup(checkInput);
  $('#authsearch').keypress(function(e){
      if(e.which == 13){
       sendClickPage();
       }
  });
  
  //bind 'click' -> submit button
  $('#submit').click(sendClickPage);

  //bind 'click' -> clear button
  $('#clear').click(clearClick);
  
  //bind 'click' -> Resort
  $('#score').click(reSort);

  //bind 'click' -> Next Page of Results
  $('#next').click(nextPageResults);

  //bind 'click' -> Next Page of Results
  $('#previous').click(priorPageResults);
  
  //bind resort to sliders
  $( "#authslider" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
    /* $( "#pubslider" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  }); */
  
    $( "#titleslider" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
    $( "#slider-range" ).bind( "slidestop", function(event, ui) {
	
	console.log("timer started");
	setTimer();
	timerSort();
	
  });
  
  // for (var i = 0; i < numKeyWords; i++) {
		// tSlider="t"+i+"ppslider";
		// tPriority="t"+i+"ppPriority";
		// $( "#"+ tSlider).bind( "slidestop", function(event, ui) {
	 	// $( "#" + tSlider ).slider({
			// slide: function(event, ui) { 
				// $( "#" + tPriority).val( ui.value );
			// }
		// }); 
			// $( "#" + tPriority).val( $("#" + tSlider).slider( "value" ) );
		// });
	// }
  
  //bind 'key up' -> return key
//$.bind('keyup',checkInput);
}