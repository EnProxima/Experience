

const moveselector=document.querySelectorAll('.moveselector')
const btnMute=document.getElementById('btnMute');
const btnPlay=document.getElementById('btnPlay');
const btnStop=document.getElementById('btnStop');
const frmMovementList=document.querySelector('.form-check');
const btnSelectAll=document.getElementById('btnSelectAll');
const btnClearAll=document.getElementById('btnClearAll');
const btnFullScr=document.getElementById('btnFullScr');

let blockUpdate=false;
let videoframe;

let timeout;
var player;

var section = {
    start: 37,
    end: 41
  };



let video= {
    startTimeslot:undefined,
    endTimeslot:undefined,
   videoFile: "FGOtTP5s46Y",
    v_iframe:document.querySelector('iframe'),
    soundMute:false
};



btnFullScr.onclick=()=>{
    const requestFullScreen =  videoframe.requestFullScreen || videoframe.mozRequestFullScreen || videoframe.webkitRequestFullScreen;
  if (requestFullScreen) {
    requestFullScreen.bind(videoframe)();
  }
}








btnSelectAll.onclick=()=>{
   
    video.startTimeslot=1;
    video.endTimeslot=frmMovementList.length;
   
  
}

btnClearAll.onclick=()=>{
 moveselector.forEach((item)=>{item.checked=false});
 video.startTimeslot=undefined;
 video.endTimeslot=undefined;
}

btnSelectAll.onclick=()=>{
    moveselector.forEach((item)=>{item.checked=true});
    video.startTimeslot="m1";
    video.endTimeslot=`m${moveselector.length}`;
   }



btnPlay.onclick=()=>{
  player.mute();
  player.seekTo(section.start);

}




frmMovementList.addEventListener('change',processCheckbox);

function processCheckbox (){
   
     video.startTimeslot=undefined;
        
   
     for (let item of moveselector){
      
        if (item.checked&&video.startTimeslot==undefined){
            video.startTimeslot=item.id;
            video.endTimeslot=item.id;
            };
        if (item.checked){video.endTimeslot=item.id};  
     };
      
        for (let i=parseInt(video.startTimeslot.slice(1));i<=parseInt(video.endTimeslot.slice(1));i++){
            console.log(i);
            const chkListItem=document.getElementById(`m${i}`); 
            chkListItem.checked=true;

        };
    
        for (i=1;i<video.startTimeslot;i++) {
            const chkListItem=document.getElementById(`m${i}`); 
            console.log(chkListItem);
            chkListItem.checked=false;
        }
    
        for (i=video.endTimeslot;i<=moveselector.length;i++) {
            const chkListItem=document.getElementById(`m${i}`); 
          
            chkListItem.checked=false;
        }
    
    }





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
 
   videoframe=document.querySelector('iframe');
   videoframe.classList.add("auto-resizable-iframe");

   btnMute.onclick=()=>{
    
    if (video.soundMute){ 
      
        btnMute.classList.remove('btn-secondary');
        btnMute.classList.add('btn-primary');
        player.unMute();
        setCookie('soundMute', false, 10);
        
    }
    
    else{
        
        player.mute();
        btnMute.classList.remove('btn-primary');
        btnMute.classList.add('btn-secondary');
        setCookie('soundMute', true, 10);
        
    }
    video.soundMute=!(video.soundMute!= false);
};

btnPlay.onclick= ()=>{
    let start=document.getElementById(video.startTimeslot).value;
    let end=document.getElementById(video.endTimeslot).value;
    section.start=parseInt(start.split("-")[0]);
    section.end=parseInt(end.split("-")[1]);
   
    video.soundMute=getCookie('soundMute');
    console.log (video.soundMute,getCookie('soundMute') );
    if (video.soundMute){
        player.mute();
    };
    player.seekTo(section.start);

}

btnStop.onclick=()=>{


    if (player.getPlayerState()==1){
        clearTimeout(timeout);
        player.pauseVideo()
    }
    else if (player.getPlayerState()==2) {
        player.playVideo()
        player.seekTo(section.start);
    
   };


   }
 } ;

// 5. The API calls this function when the player's state changes.

function onPlayerStateChange(event) {

    if (event.data == YT.PlayerState.PLAYING) {
        var duration = section.end - section.start;
        timeout=setTimeout(restartVideoSection, duration * 1000);
      }

  }
  
  function restartVideoSection() {
    if (player.getPlayerState()==1){
        player.seekTo(section.start)
       
        ;}
    
  }



  //Cookie functions
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  


  