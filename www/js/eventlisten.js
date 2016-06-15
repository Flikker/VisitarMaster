function openPanos(dothis) {
    window.plugins.insomnia.keepAwake();
    
      var myWindow = window.open(dothis);
}



function getAncestor(node, tagName) {
    tagName = tagName.toUpperCase();
    while (node) {
        if (node.nodeType == 1 && node.nodeName == tagName) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}




document.addEventListener('click', function(event) {
     var target = getAncestor(event.target, "a");
    
    if (target !== null) {
        var dothis = target.getAttribute('window.location'); 
        var clickthis1 = target.getAttribute('1');
        var clickthis2 = target.getAttribute('2');
        var clickthis3 = target.getAttribute('3'); 
        
       if (dothis !== null) {
           openPanos(dothis);
       }
        else if (clickthis2 !== null) {
            getRid(clickthis1, clickthis2, clickthis3);
        }
    }
}, false);




document.addEventListener('click', function(event) {
         var butt = getAncestor(event.target, "input");
       if (butt !== null) {
        var butclick = butt.getAttribute('id');
        if (butclick == "download") {
                var d1 = butt.getAttribute('onclick1'); 
                var d2 = butt.getAttribute('onclick2'); 
                var d3 = butt.getAttribute('onclick3'); 
                var d4 = butt.getAttribute('onclick4');

            downloadFile(d1,d2,d3,d4); document.getElementById("download").style.display = "none";
        }
        else if (butclick == "viewonline") {
                var v1 = butt.getAttribute('onclick'); 
                window.location=(v1);
                
        }
    }
}, false);
   

