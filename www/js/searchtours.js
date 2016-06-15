// I've changed to pagebeforecreate as was multiplying results with pagebeforeshow. check if it refreshes list when reopen app
/* this bit empties the current searchlist so it's not duplicated, then makes an ajax call to search.php for the list of available tours. The href takes people through to detailsPage which is in tourdetails.html, finding the relevant details from the .html?index= . */
$(document).on('pagebeforeshow', '#searchpage', function(){
    $('#listsearch').empty();
    var output = $('#listsearch');
    $.ajax({
        url: 'http://revolutioninteractivevideo.com/wp-content/uploads/panos/augmentedrealityheritage/www/searchy.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 20000,
        success: function(data, status){
            $.each(data, function(i,item){
                var place = '<li> <a href="www/tourdetails.html?id=' +item.id+  '" ><img src="' +item.picture+ '">' +item.name+ '<br>' +item.address+ '</a></li>';
                
                output.append(place);
            });
            $('#listsearch').listview('refresh');
        },
        error: function(){
            output.text('There was an error loading the tour list. Please check your connection and try again');
        }
    });
});   







/* the code for detailsPage in tourdetails.html. Takes the id of the tour clicked in the search list which the code above passed into the detailspage html (getUrlVars), then id is passed to display.php to show the details of the correct tour. Problems included using 'index', which is a reserved term - changed to 'id'. Also had problems with correct syntax for get in display.php, and then forgot to re-add ?id= to end of php call. */
$(document).on('pagebeforeshow', '#detailsPage', function(event) {
	
    	var id = getUrlVars()["id"];
        
    $('#tourdetails').empty();
    var output = $('#tourdetails');
    $.ajax({
        url: 'http://revolutioninteractivevideo.com/wp-content/uploads/panos/augmentedrealityheritage/www/display.php?id='+id,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        timeout: 10000,
        success: function(data, status){
            $.each(data, function(i,item){
                var place = '<div class="searchimage"><img  src="' +item.picture+ '" alt="image" ><br><div class="picandtext"><h2 align="center">' +item.name+ '</h2><h4 align="center">' +item.address+ '</h4><p>' +item.descrip+ '</p></div><progress max="100" value="0" id="ft-prog" ></progress></div><div id="status" class="blink"></div><input class="buttonClass" id="download" type="button" value="Download ' +item.filesize+ '"  onclick1="' +item.ziploc+ '" onclick2="' +item.id+ '" onclick3="' +item.name+ '" onclick4="' +item.address+ '"   >';
                
                output.append(place);
               
            });
           
  $('#tourdetails').trigger('create');

           
        },
        error: function(){
            output.text('There was an error loading the tour. Please check your connection and try again');
        }
    });
    
    
    
	
});
/* I think this bit cleans difficult symbols from the url before passing the index value to detailsPage */
function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}



      
