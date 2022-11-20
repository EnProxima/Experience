const moveselector=document.querySelectorAll('.moveselector')
const btnMute=document.getElementById('btnMute');
let evnt;
var player;

var section = {
    start: 37,
    end: 41
  };


let video= {
    startTimeslot:37,
    endTimeslot:41,
    videoFile: "FGOtTP5s46Y",
    v_iframe:document.querySelector('iframe'),
    soundMute:true
};

btnMute.onclick=()=>{
   
    if (video.soundMute){ 
        video.soundMute=!(video.soundMute!= false);
        btnMute.classList.remove('btn-primary');
        btnMute.classList.add('btn-secondary');
        player.mute();
        
    }
        
        else{
            video.soundMute=!(video.soundMute!= false);
            btnMute.classList.remove('btn-secondary');
            btnMute.classList.add('btn-primary');
            player.unMute();
        }
        };




 for (let item of moveselector){
    if (item.checked&&video.startTimeslot==undefined){
        startTimeslot=item.value;
        continue};
    if (item.checked){video.endTimeslot=item.value};  
 };


 console.log(video.startTimeslot,'---stop---',video.endTimeslot);




// 2. This code loads the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player1', {
    
    videoId:video.videoFile ,
    playerVars :{   
        controls: 0     
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });


}



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    evnt=event;
   const videoframe=document.querySelector('iframe');
   videoframe.classList.add("auto-resizable-iframe");
  player.seekTo(section.start);

  
} ;

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
    console.log(event);
    if (event.data == YT.PlayerState.PLAYING) {
        var duration = section.end - section.start;
        setTimeout(restartVideoSection, duration * 1000);
      }

  }
  
  function restartVideoSection() {
    player.seekTo(section.start);
  }

  