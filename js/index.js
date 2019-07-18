
// This script is to close the video up modal close.    
$(document).ready(function(){
$("#myModal").on('hidden.bs.modal', function(){      
      var video = document.getElementById('vid');        
      video.pause();
      video.currentTime = 0;
      video.playbackRate = 1;
    });
});
