const moveselector=document.querySelectorAll('.moveselector')
const btnMute=document.getElementById('btnMute');
const btnPlay=document.getElementById('btnPlay');
const btnStop=document.getElementById('btnStop');
const frmMovementList=document.querySelector('.form-check');
const btnSelectAll=document.getElementById('btnSelectAll');
const btnClearAll=document.getElementById('btnClearAll');
const btnFullScr=document.getElementById('btnFullScr');


let blockUpdate=false;
let  videoframe;
let evnt;
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
    soundMute:true
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
 blockUpdate=true;
 let i=1;
//  console.log(i++)
 moveselector.forEach((item)=>{console.log("1->",item);item.checked="unchecked"; console.log("2->",item)});
 video.startTimeslot=undefined;
 video.endTimeslot=undefined;
 blockUpdate=true;
}

btnPlay.onclick=()=>{
  player.mute();
  player.seekTo(section.start);

}




frmMovementList.addEventListener('change',processCheckbox);

function processCheckbox (){
    console.log('234234234')

    if (blockUpdate==false){
     video.startTimeslot=undefined;
        
     console.log('ewerwerwerwerwerwrw')
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
            chkListItem.checked="checked";

        };
    
        for (i=1;i<video.startTimeslot;i++) {
            const chkListItem=document.getElementById(`m${i}`); 
            console.log(chkListItem);
            chkListItem.checked="unchecked";
        }
    
        for (i=video.endTimeslot;i<=moveselector.length;i++) {
            const chkListItem=document.getElementById(`m${i}`); 
            console.log(chkListItem);
            chkListItem.checked="unchecked";
        }
    
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
        controls: 0  ,
        loop:1   
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
    }
  });


}



// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
   console.log('event target--->',event);
   videoframe=document.querySelector('iframe');
   videoframe.classList.add("auto-resizable-iframe");

   btnMute.onclick=()=>{
    console.log('1--->',video.soundMute)
    video.soundMute=!(video.soundMute!= false);
    console.log('2--->',video.soundMute)
    if (video.soundMute){ 
       
        btnMute.classList.remove('btn-primary');
        btnMute.classList.add('btn-secondary');
        player.unMute();
        
    }
        
        else{
            player.mute();
            btnMute.classList.remove('btn-secondary');
            btnMute.classList.add('btn-primary');
            
        }
        };

btnPlay.onclick= ()=>{
    let start=document.getElementById(video.startTimeslot).value;
    let end=document.getElementById(video.endTimeslot).value;
    section.start=parseInt(start.split("-")[0]);
    section.end=parseInt(end.split("-")[1]);
   console.log(  section.start,"----", section.end);
    player.seekTo(section.start);

}

btnStop.onclick=()=>{
    
    if (player.getPlayerState()==1){player.pauseVideo()}
    else if (player.getPlayerState()==2) {player.playVideo()};


   }


                             } ;

// 5. The API calls this function when the player's state changes.

function onPlayerStateChange(event) {
    console.log("onPlayerState change events--- ",event.data);
    if (event.data == YT.PlayerState.PLAYING) {
        var duration = section.end - section.start;
        setTimeout(restartVideoSection, duration * 1000);
      }

  }
  
  function restartVideoSection() {
    if (player.getPlayerState()==1){player.seekTo(section.start);}
    
  }

  