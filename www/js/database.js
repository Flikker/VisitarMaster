var hopeitwork;





/* this code below takes the new locations of the downloaded, unzipped tour and inserts it into a database, then displays it on page one */
    
    
function persistData(formdata1, formdata2, formdata3, formdata4, formdata5) {
// get form entries
 
// check form entries on console
 
// key, value pair into localStorage
 localStorage.setItem('formdata1Set', formdata1); 
 localStorage.setItem('formdata2Set', formdata2); 
 localStorage.setItem('formdata3Set', formdata3);
 localStorage.setItem('formdata4Set', formdata4);
 localStorage.setItem('formdata5Set', formdata5);
// set the current time as the id to make it unique id
 var d = new Date();
 var new_id = d.getTime();
 localStorage.setItem('new_idSet', new_id);
// proceed to next function
 startDB(); 
}

function startDB() {
 var db = window.openDatabase("Database", "1.0", "DEMO", 2000000);
 db.transaction(populateDB, errorCB, successCB);
}

// Form the query

function populateDB(tx) {
 var formdata1Get = localStorage.getItem('formdata1Set'); // get data from localStorage
 var formdata2Get = localStorage.getItem('formdata2Set');
 var formdata3Get = localStorage.getItem('formdata3Set');
 var formdata4Get = localStorage.getItem('formdata4Set');
 var formdata5Get = localStorage.getItem('formdata5Set');
 var new_idGet = localStorage.getItem('new_idSet');
// if no data has been entered, show note and stop the process
 if (formdata1Get.length < 1 && formdata2Get.length < 1 && formdata3Get.length < 1 && formdata4Get.length < 1 && formdata5Get.length < 1) { 
  }
 tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id TEXT NOT NULL, data1 TEXT NULL, data2 TEXT NULL, data3 TEXT NULL, data4 TEXT NULL, data5 TEXT NULL)'); 
 tx.executeSql('INSERT INTO DEMO (id, data1, data2, data3, data4, data5) VALUES (\"' + new_idGet + '\"' + ', \"' + formdata1Get + '\", \"' + formdata2Get + '\", \"' + formdata3Get + '\", \"' + formdata4Get + '\", \"' + formdata5Get + '\")');
 queryDB(tx); 
}

// Execute the query, grabbing all the data

function queryDB(tx) {
 tx.executeSql("SELECT * FROM DEMO", [], querySuccess, errorCB);
}

function itWorked() {
 
}



function itDidnt() {
 
}


function getPathy() {
    var wholepathy = 'cdvfile://localhost/persistent/';
window.resolveLocalFileSystemURL(wholepathy, function(entry) {
    hopeitwork = entry.toURL();
    
     showDB(); 
});
}


function querySuccess(tx, results) {
    
    
    

    
     var len = results.rows.length;
 
// set output, output2 to blank so values are not appended to previous values
 document.getElementById("downloadlist2").innerHTML = "";
// loop through rows as many times as there are row results
 for (var i = 0; i < len; i++) { 
 var rowid = results.rows.item(i).id;
 
// Display the query results as a table within <div id="output2"></div> rowid needs to be in double quotes "" -  had a lot of trouble with it not
// deleting database rows and putting in double quotes seemed to solve it (I thought strings were in quotes and numbers not)
// getRid deletes the 'a' unzipped pano folder, then fires delRecord to delete the database entry(which didn't work until put rowid into quotes)
// onclick of the main <a tag first fires insomnia plugin on, then launches the pano. devicready handles switching off insomnia when pano closes. 
// Nothing needs to be altered in the pano files themselves regarding insomnia plugin.
// The pano ran very slowly when opened due to limitations of the webview(Android webview until 4.4.4 was fractured as it was different among different manufacturers - newest will use Chromium standard). Also VR didn't work as webgl not supported in webview. Solved using Crosswalk plugin which offers enhanced webview performance for Android down to version ??(check crosswalk docs and set as the minimum requirement for download), as well as webgl. If still running slowly, try changing hardware acceleration in manifest(some say to use true, some say false), or check target version of android in manifest (some found it was too low). There was also something else to add in that I didn't understand - google it
 document.getElementById("downloadlist2").innerHTML +='<li id="' +rowid+ '"> <a window.location=\'' + hopeitwork +results.rows.item(i).data1+ '\'><img src="' + hopeitwork +results.rows.item(i).data2+ '">' +results.rows.item(i).data3+ '<br>' +results.rows.item(i).data4+ '</a><a 1="' +results.rows.item(i).data5+  '" 2="'  +results.rows.item(i).data3+  '"  3="' +rowid+  '"    data-rel="popup" data-icon="delete" >Delete</a> </li>' ;  
     
$('#downloadlist2').listview('refresh');
 }
    
 


 $('#downloadlist2').listview('refresh');

}





    function itsOff() {
 
}


function notOff() {
 
}


// called from index.js when device ready - called each time the pao webview closes. Don't know what'll happen if have to use
// webview in a different way, eg if I'm using it wrongly and it's outside, and it needs to be within the app (so devicready wouldn't fire
// when the pano closes presumably)
function inSom() {
 window.plugins.insomnia.allowSleepAgain();   
}
// Show DB onload (next two functions)

function showDB(tx) {
    
   var db = window.openDatabase("Database", "1.0", "DEMO", 2000000);
 db.transaction(createDB, errorCB, successCB);
}
function createDB(tx) {
 tx.executeSql("SELECT * FROM DEMO", [], querySuccess, errorCB); 
}




// Delete a row in the DB from button

function delRecord(rowid) {
    
 var db = window.openDatabase("Database", "1.0", "DEMO", 2000000);
 db.transaction(
 function (tx) {
      tx.executeSql("DELETE FROM demo WHERE id = ?", [rowid]);
     $('#downloadlist2').listview('refresh');
 }
 ); 
 $('#downloadlist2').listview('refresh');
}


// Transaction success callback

function successCB() {
 
}

// Transaction error callback

function errorCB(err) {
 
}


// "drop (delete) database" sequence, next two functions

function dropDb() {
// erase localStorage
 window.localStorage.clear();
// erase form fields
 document.getElementById("downloadlist2").innerHTML = "";
// start the "drop database" sequence
 var db = window.openDatabase("Database", "1.0", "DEMO", 2000000);
 db.transaction(dropDatabase, errorCB, successCB);
}
function dropDatabase(tx) {
 tx.executeSql('DROP TABLE IF EXISTS DEMO');
}



// Show the DB contents on page load
getPathy(); 







// need to use window.resolveLocalFileSystemURL (not URI, which is in the cordova doumentation but has been deprecated) in order to find the 
// file and pass it into the variable fileEntry to use methods such as .removerecursively on it. Tried just adding folderEntry.removerecursively
// but obviously it's just a url, not an object, so kept returning can't pass it on a null object
function delFolder(folderEntry, namey, listEntry) {
    
    
    function successy(parent) {
   
     document.getElementById(listEntry).style.display = "none";
    delRecord(listEntry);
}

function faily(error) {
    alert("Failed to remove " + namey + " or its contents: " + error.code);
    
}
    
    
    function onSuccess(fileEntry) {
         
       fileEntry.removeRecursively(successy, faily);
    }
    
    function onError(fileEntry) {
       
        document.getElementById(listEntry).style.display = "none";
        
    }
    
    var pathFull = hopeitwork + folderEntry;

window.resolveLocalFileSystemURL(pathFull, onSuccess, onError);
    
    
}
 





// called when click on the second <a> link in the pageone list dynamically created from the database in database.js. takes the three variables
// of newLoccy(the location on the UNZIPPED folder), the name, and the id of that particular listview element (dynamically gave each
// listview element a different id by passing the database unique identifier into the <li id=
function getRid(x, y, z) {
    function deleteThis(buttonIndex) {
        if (buttonIndex === 1) {
             delFolder(x, y, z);
        }
        else {
        }
    }
    navigator.notification.confirm("Are you sure you want to delete " + y + "?", deleteThis, "Delete tour", "Delete it, Keep it");
    
   
    
    }

