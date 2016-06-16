var pleaseletit = "12345";

function logThis(thetexty) {
    
    if (thetexty === 'succeeded') {
    itisd = 'Monitoring worked';
} else  { 
    itisd = 'Monitoring failed';
}
   document.getElementById("beaconalert").innerHTML = itisd;
};



function logbluetooth(thetexta) {
    
    if (thetexta === 'succeeded') {
    itisi = 'Bluetooth is enabled';
} else  { 
    itisi = 'Bluetooth is not enabled';
}
   document.getElementById("bluetoothalert").innerHTML = itisi;
};

  
function logstarted(thetexto) {
    
    if (thetexto === 'succeeded') {
    itism = 'Scanning started';
} else  { 
    itism = 'Scanning failed';
}
   document.getElementById("startedalert").innerHTML = itism;
   
};


function logThisrang(thetextyr) {
    
    
 
};
    



function startScanning () {

var delegate = new cordova.plugins.locationManager.Delegate();


delegate.didStartMonitoringForRegion = function (pluginResult) {
    console.log('didStartMonitoringForRegion:', pluginResult); 
    logstarted('succeeded');
    logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
}; 

delegate.didRangeBeaconsInRegion = function (pluginResult) {
    logThisrang(JSON.stringify(pluginResult));
    for (var i in pluginResult.beacons) {
       
         var beacon = pluginResult.beacons[i];     
    itisr = 'Ranging worked' + beacon.major;    
        
        
         
        pluginResult.beacons.sort(function(beacon1, beacon2) { 
        return beacon1.accuracy > beacon2.accuracy })

    // Display distance for the closest beacon.
    var beaconclose = pluginResult.beacons[0];
    document.getElementById("beaconalertrange").innerHTML = 'Closest beacon is ' + beaconclose.accuracy + 'm away and its major value is ' + beaconclose.major;
       
  pleaseletit = beaconclose.major;
        
        return pleaseletit;  
        
        
      

        
    }     
    
     
};

    var regions =
	[
		// Estimote Beacon factory UUID.
		{uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D', identifier:'Mint Cocktail', major:'47506', minor:'22780'},
        {uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D', identifier:'Icy Marshmallow', major:'14924', minor:'52136'},
        {uuid:'B9407F30-F5F8-466E-AFF9-25556B57FE6D', identifier:'Blueberry Pie', major:'44203', minor:'46278'},
]

cordova.plugins.locationManager.setDelegate(delegate);

// required in iOS 8+
cordova.plugins.locationManager.requestWhenInUseAuthorization(); 
// or cordova.plugins.locationManager.requestAlwaysAuthorization()


    
     cordova.plugins.locationManager.isBluetoothEnabled()
    .then(function(isEnabled){        
        if (isEnabled) {
            logbluetooth('succeeded');                   
        } else {
            logbluetooth('failed');
        }
    })
    .fail(function(e) { console.error(e); })
    .done();
        
 for (var i in regions)
		{
			var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(
				i + 1,
				regions[i].uuid);
            
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();
    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(function(e) { logThis('failed'); })
    .done();
        }
}


