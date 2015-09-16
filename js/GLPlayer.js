var fullScreenCache=false,videoPlayCache=false,toggleViewCache=true,toggleGyroCache=false,toggleSizeCache=false,VRCache=false,ViewCache=0;
var controlBar,play,pimg,limg,full,fimg,hide,himg,gimg,progressBar,innerBar,playspan,waitFlower,vrimg,vimg,list,view;
var barCanvas,barContext;
var mouseDown;
// var stats;
initUI();
//生成控件
function initUI(){
//    waitBar=document.createElement( 'span' );
//    waitBar.id="waitBar";
//        waitBar.align="center";
//控制栏
    controlBar=document.createElement( 'span' );
    controlBar.id="controlBar";
//播放按钮
    play=document.createElement( 'span' );
    play.id="play";
    pimg=document.createElement( 'img' );
    pimg.id="pimg";
    pimg.src="gif/play.gif";
//码率选择
//    list=document.createElement( 'span' );
//    list.id="list";
//    limg=document.createElement( 'img' );
//    limg.id="limg";
//    limg.src="gif/choose_s.gif";
//分屏格式选择
	view=document.createElement( 'span' );
	view.id="view";
	vimg=document.createElement( 'img' );
	vimg.id="vimg";
	vimg.src="gif/view0.gif";
//vr
    vr=document.createElement( 'span' );
    vr.id="vr";
    vrimg=document.createElement( 'img' );
    vrimg.id="vrimg";
    vrimg.src="gif/vr.gif";
//全屏
    full=document.createElement( 'span' );
    full.id="full";
    fimg=document.createElement( 'img' );
    fimg.id="fimg";
    fimg.src="gif/full.gif";
//陀螺仪
	gyro=document.createElement( 'span' );
    gyro.id="gyro";
    gimg=document.createElement( 'img' );
    gimg.id="gimg";
    gimg.src="gif/gyro.gif";
//进度条
    progressBar=document.createElement( 'span' );
    progressBar.id="progressBar"; 
    innerBar=document.createElement( 'span' );
    innerBar.id="innerBar";
    playspan=document.createElement('key');
    playspan.id="keys";
    sildeBar=document.createElement( 'span' );
    sildeBar.id="sildeBar"; 
//时间
    canvasBar = document.createElement( 'canvas' );
    canvasBar.id= 'canvasBar' ;
    canvasBar.width=170;	
    canvasBar.height=30;
    contextBar = canvasBar.getContext('2d');	
    contextBar.font = "15pt Helvetica";
    contextBar.textBaseline = "top";
    
//缓冲动画
    waitFlower=document.createElement( 'img' );  
		waitFlower.id="waitFlower";  
		waitFlower.src="8.gif";
}

var mainDom;
//调整控件层级结构
function GLPlayer(videoDom){
  	mainDom=videoDom;
  	mainDom.appendChild( stats.domElement );
	//整个控件
	videoDom.appendChild(controlBar);//controlBar
	//WebGL窗口
    videoDom.appendChild( DomRender );//WebGL View
//    videoDom.appendChild(waitBar);//waitBar
    videoDom.appendChild(waitFlower);
    //陀螺仪
    mainDom.appendChild(gyro);//gyro
        gyro.appendChild(gimg);
    //播放和暂停
    controlBar.appendChild(play);//play&pause
        play.appendChild(pimg);
    //码率
//    controlBar.appendChild(list);//list
//        list.appendChild(limg);
    //分屏格式
    controlBar.appendChild(view);//view
        view.appendChild(vimg);
    //VR
    controlBar.appendChild(vr);//list
        vr.appendChild(vrimg);
    //全屏
    mainDom.appendChild(full);//fullScreen
        full.appendChild(fimg);
    //进度条
    controlBar.appendChild(progressBar); //progressbar
    //时间
    controlBar.appendChild( canvasBar ); //time 
    //滑块
    controlBar.appendChild( sildeBar ); //sildeBar    
//    progressBar.appendChild(innerBar);//innerBar
	//播放进度
    progressBar.appendChild(playspan);
//绑定事件
    play.addEventListener('click', toggleVideoPlay, true);
//    list.addEventListener('click', toggleSize, true);
    view.addEventListener('click', ViewSelect, true);
    vr.addEventListener('click', toggleVR, true);
    full.addEventListener('click', toggleFullScreen, true);
//    full.addEventListener('click', touchStart, true);

    
    gyro.addEventListener('click', toggleGyro, true);
//    sildeBar.addEventListener('click',makeTime, false);
    video.addEventListener('ended', onended, false);
    video.addEventListener('progress', onprogress, false);
    video.addEventListener('timeupdate',onplay, false);
    video.addEventListener('loadedmetadata', onprogress, false);
    video.addEventListener("waiting",waitstate,false);
    video.addEventListener("playing",playstate,false);
//    video.addEventListener( 'dblclick', toggleFullScreen, true);
//    videoDom.addEventListener('touchdown',doMouseDown,false);
//    document.body.addEventListener( 'dblclick', toggleFullScreen, true);
//document.body.addEventListener( 'dblclick', makeCentry, true);
	sildeBar.addEventListener('mousedown',doMouseDown, false);
    sildeBar.addEventListener('mousemove',sildeTime_mouse, false);
    sildeBar.addEventListener('mouseup',doMouseUp, false);
    sildeBar.addEventListener('touchmove',sildeTime, false);
    
}
//var time_start=0,time_start2=0,time_current,time_cut,_DLB=false,time_last=0;

function doMouseDown(event){
//	document.getElementById("message2").innerHTML="aaa";
	mouseDown=true;
//	time_cut=new Date().getTime()-time_start;
//	if (time_cut<100){
//		document.getElementById("message2").innerHTML="doubli";
//		}
//		else{
//			document.getElementById("message2").innerHTML="~~~~~~&*&*";
//		}
//	document.getElementById("message2").innerHTML=time_cut;
}
function doMouseUp(event){
	mouseDown=false;
//	 setTimeout("makeCentry()", 1000 );
//	time_start=new Date().getTime();
//		if ((time_start-time_start2)<199){
//		_DLB=!_DLB;
//		toggleFullScreen(document.getElementById( 'videoWin' ));
//	}
//	document.getElementById("message2").innerHTML=time_start;
}
function makeCentry(){
	document.getElementById("message1").innerHTML=time_start;
	document.getElementById("message2").innerHTML=time_start-time_start2;
//	document.getElementById("message3").innerHTML=time_current;
//	CamerOffset=mesh.rotation.y;
//		document.getElementById("message3").innerHTML="fuck";
//			time_start=new Date().getTime();
		if ((time_start-time_start2)<199){
//		_DLB=!_DLB;
		toggleFullScreen(document.getElementById( 'videoWin' ));
	}
	
}
var d2 = document.getElementById('d4');


var clickTimer = null;

function touchStart() {
    if (clickTimer == null) {
        clickTimer = setTimeout(function () {
            clickTimer = null;
//            alert("single");
 			toggleHideBar();
        }, 500)
    } else {
        clearTimeout(clickTimer);
        clickTimer = null;
        toggleFullScreen();
//        alert("double");

    }
}
//function _dblclick(){
////	document.getElementById("message2").innerHTML=time_cut;
//
//
//}
//download&timeUpdate  
//拖动滑块时间(鼠标测试)
function sildeTime_mouse(event){
        event.preventDefault();
        document.getElementById("message").innerHTML=mouseDown;
        
        if (mouseDown==true){
	        var clickpos = event.pageX-progressBar.getBoundingClientRect().left;
	        if (clickpos<0){
	            clickpos=0;
	            }
	        if (clickpos>progressBar.clientWidth){
	            clickpos=progressBar.clientWidth
	            }
	        var fPos=progressBar.clientWidth;
	    		var dss=clickpos/fPos*video.duration;
	       
	        playspan.style.width=Math.round( clickpos/ progressBar.clientWidth * 100 )+ '%';
	        video.currentTime=dss;
	      }
    }
//拖动滑块事件
    function sildeTime(event){
        event.preventDefault();
        var clickpos = event.touches[0].pageX-progressBar.getBoundingClientRect().left;
        if (clickpos<0){
            clickpos=0;
            }
        if (clickpos>progressBar.clientWidth){
            clickpos=progressBar.clientWidth
            }
        var fPos=progressBar.clientWidth;
    	var dss=clickpos/fPos*video.duration;
       
        playspan.style.width=Math.round( clickpos/ progressBar.clientWidth * 100 )+ '%';
        video.currentTime=dss;
        }
//根据拖动更新时间
    function makeTime(event){
    	var clickpos = event.clientX-progressBar.getBoundingClientRect().left;
    	var cPos=document.getElementById("keys").clientWidth;
    	var fPos=progressBar.clientWidth;
    	var dss=clickpos/fPos*video.duration;
        video.currentTime=dss;
    //	document.getElementById("message").innerHTML=dss;
    }
//根据播放进度更新时间 
    function onplay(){
            playspan.style.width=Math.round( video.currentTime/ video.duration * 100 )+ '%';
            drawTime();
    }
//时间
    function drawTime(){
        contextBar.clearRect(0, 0,180, 100);
        contextBar.fillStyle = "rgba(255,255,255,0.9)";;
        var cur=asTime(video.currentTime);
        var dur=asTime(video.duration);
        contextBar.fillText (cur+" / "+dur,30 ,0); 
    }
//下载
    function onprogress(){
    	var ranges = [];
//    	document.getElementById("info").innerHTML = "a";
    	for(var i = 0; i < video.buffered.length; i ++){
    		ranges.push([video.buffered.start(i),video.buffered.end(i)]);
    	}
    	var spans = progressBar.getElementsByTagName('span');
    	while(spans.length < video.buffered.length){    
    //	    var loaders=document.createElement('span');
    //	    loaders.id="loaders";
//    document.getElementById("info").innerHTML = "b";
    	    progressBar.appendChild(document.createElement('span'));   
    	    }
    	while(spans.length > video.buffered.length){	
    	    progressBar.removeChild(progressBar.lastChild);   
    	    }
    	for(var i = 0; i < video.buffered.length; i ++){
    	    spans[i].style.width = Math.round((100 / video.duration) * (ranges[i][1] - ranges[i][0])) + '%';
    	}
        drawTime();
    }
//等待缓冲
    function playstate(){
        waitFlower.style.width=0;
        waitFlower.style.height=0;
        
        //document.getElementById("info").innerHTML = "true";
    }
    function waitstate(){
        waitFlower.style.width=50;
        waitFlower.style.height=50;
        //document.getElementById("info").innerHTML = "false";
    }
 
//play&pause&GyroContral&fullScreen
//播放
    function VideoPlay (videoName){
    	video.src	= videoName;
    	var b=video.src.split('/');
		var viewTag=b[b.length-1].split("_")[0];
		camera_A.position.set(-1000,0,0);
		camera_B.position.set(1000,0,0);
		if (viewTag=="VRUD"){//up_down双屏
			camera_A.position.set(-1000,2000,0);
			camera_B.position.set(1000,2000,0);
			document.getElementById("info").innerHTML=viewTag;
		}
		if (viewTag=="VRLR"){//left_right双屏
			camera_A.position.set(-1000,1000,0);
			camera_B.position.set(1000,1000,0);
		}
		if (viewTag=="VRLRCinema"){//left_right双屏
			camera_A.position.set(-1000,3000,0);
			camera_B.position.set(1000,3000,0);
			camera_A.fov=30;
			camera_B.fov=30;
		}
		document.getElementById("message3").innerHTML=viewTag;
        document.getElementById("pimg").setAttribute("src","gif/pause.gif");
        video.play(); 
        videoPlayCache=true;
        changeSize();
     }
//播放切换
    function toggleVideoPlay () {
        if(!videoPlayCache){
            document.getElementById("pimg").setAttribute("src","gif/pause.gif");
            video.play();  
        }else{
            document.getElementById("pimg").setAttribute("src","gif/play.gif");
            video.pause();  
        }
        videoPlayCache=!videoPlayCache;
        changeSize();
    }
//隐藏控制栏
    function toggleHideBar () {
         if(toggleViewCache){
            document.getElementById("controlBar").style.height=0;
            canvasBar.style.height=0;
        }else{
            document.getElementById("controlBar").style.height=100;
            canvasBar.style.height=30;
        }
        toggleViewCache=!toggleViewCache;
    }
//陀螺仪
    function toggleGyro () {
        if(!toggleGyroCache){
            document.getElementById("gimg").setAttribute("src","gif/gyro_h.gif");
            fix2 = 90*fix;
        }else{
            document.getElementById("gimg").setAttribute("src","gif/gyro.gif");
            fix2 = 0;
        }
        toggleGyroCache=!toggleGyroCache;
    }
//全屏
    function toggleFullScreen(videoDom){
        fullScreenCache=!fullScreenCache;
        var cutx=0,cuty=0;
        if(fullScreenCache){
            if (DomRender.requestFullscreen) { mainDom.requestFullscreen(); }//W3C  
            else if (DomRender.mozRequestFullScreen) { mainDom.mozRequestFullScreen();}//FireFox   
            else if (DomRender.webkitRequestFullScreen) { mainDom.webkitRequestFullScreen();} //Chrome�� 
            else if (DomRender.msRequestFullscreen) {    mainDom.msRequestFullscreen();}
        }else{ 
             if (document.exitFullscreen) { document.exitFullscreen(); } 
            else if (document.mozCancelFullScreen) {document.mozCancelFullScreen();}    
            else if (document.webkitCancelFullScreen) { document.webkitCancelFullScreen();}  
            else if (document.msCancelFullscreen) {document.msCancelFullscreen();}
        }
        changeSize();
    }
//VR
    function toggleVR () {
        if(!VRCache){
            document.getElementById("vrimg").setAttribute("src","gif/vr_l.gif");
            scaleVar=0.5;
        }else{
            document.getElementById("vrimg").setAttribute("src","gif/vr.gif");
            scaleVar=1;
        }
        VRCache=!VRCache;
        onWindowResize();
    }
//码率
     function toggleSize () {
        var currentTime=video.currentTime;
        if(!toggleSizeCache){
            document.getElementById("limg").setAttribute("src","gif/choose_s.gif");
//            video.src=replaceString(video.src,".mp4","_l.mp4"); 
//            video.play();
//            video.currentTime=currentTime;
        }else{
            document.getElementById("limg").setAttribute("src","gif/choose_l.gif");
//            video.src=replaceString(video.src,"_l.mp4",".mp4");
//            video.play();
//            video.currentTime=currentTime;
            
        }
        toggleSizeCache=!toggleSizeCache;
//        document.getElementById("message").innerHTML =gb_contentStr;
    }
 //分屏格式选择
//     function ViewSelect() {
//        if(ViewCache==0){
//        	ViewCache=1;
//            document.getElementById("vimg").setAttribute("src","gif/view1.gif");
//        }else if(ViewCache==1){
//        	ViewCache=2;
//            document.getElementById("vimg").setAttribute("src","gif/view2.gif");
//        }else if(ViewCache==2){
//        	ViewCache=0;
//            document.getElementById("vimg").setAttribute("src","gif/view0.gif");  
//        }
//    }  
    
    
	function ViewSelect() {
		var b=video.src.split('/');
		var viewTag=b[b.length-1].split("_")[0];
		if (viewTag=="v1"){//横屏双屏
			
			}
		if (viewTag=="v2"){//竖屏双屏
		
		
		}
		document.getElementById("message3").innerHTML=viewTag;
		
		if(ViewCache==0){
			ViewCache=1;
		    document.getElementById("vimg").setAttribute("src","gif/view1.gif");
		}else if(ViewCache==1){
			ViewCache=2;
		    document.getElementById("vimg").setAttribute("src","gif/view2.gif");
		}else if(ViewCache==2){
			ViewCache=0;
		    document.getElementById("vimg").setAttribute("src","gif/view0.gif");  
		}
	}  

    
//播放完成
    function onended(){
        videoPlayCache=true;
        document.getElementById("pimg").setAttribute("src","gif/play.gif");
        video.pause();  
    }
 
////////////////////////////////////////////////////////////////////////////////////////////     
function asTime(t) {
    t = Math.round(t);
    var s = t % 60;
    var m =Math.floor(t / 60);
    return two(m) + ':' + two(s);
}
function two(s) {
    s += "";
    if (s.length < 2) s = "0" + s;
    return s;
}

function getFront(mainStr,searchStr){  
    foundOffset=mainStr.indexOf(searchStr);  
    if(foundOffset==-1){  
       return null;  
    }  
    return mainStr.substring(0,foundOffset);  
}    
function getEnd(mainStr,searchStr){  
    foundOffset=mainStr.indexOf(searchStr);  
    if(foundOffset==-1){  
       return null;  
    }  
    return mainStr.substring(foundOffset+searchStr.length,mainStr.length);  
}   
function replaceString(mainStr,searchStr,replaceStr){  
    var front=getFront(mainStr,searchStr);  
    var end=getEnd(mainStr,searchStr);  
    if(front!=null && end!=null){  
       return front+replaceStr+end;  
    }  
    return null;  
}  