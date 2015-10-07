var flow = new Flow({
  target:'index.php'
});
flow.assignBrowse(document.getElementById('browseButton'));
flow.on('fileSuccess', function(file,message){
    console.log(file,message);
    alert("File was uploaded: " + message);
});
flow.on('filesSubmitted', function(file) {
   flow.upload();// instant upload
});
