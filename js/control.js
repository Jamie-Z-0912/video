var isUserInteracting = false,	lon = 0, lat = 0;

var onPointerDownPointerX=0,onPointerDownPointerY,onPointerDownLon,onPointerDownLat,mc=0;
var zoom=50, dis=0, tt=50;

var pos_x=0,pos_y=0;
//touch////////////////////////////////////////////////////////////
function onDocumentTouchDown( event ) {
//		document.getElementById("info").innerHTML="Platform:"+_platform;  
	event.preventDefault();
	isUserInteracting = true;
	onPointerDownPointerX = event.touches[0].pageX;
	onPointerDownPointerY = event.touches[0].pageY;
	onPointerDownLon = lon;
	onPointerDownLat = lat;
	if(event.touches.length==2){
	    dis=Math.abs(event.touches[1].pageX-event.touches[0].pageX);
	}
}

function onDocumentTouchMove( event ) {
	if ( isUserInteracting === true ) {
	    if(event.touches.length==1){
	        mc=event.touches[0].pageX;
    		lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.2  + onPointerDownLon;
    		lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.2  + onPointerDownLat;
    	}
    	if(event.touches.length==2){//scale
            var cutdis=Math.abs(event.touches[1].pageX-event.touches[0].pageX)-dis;
            tt=zoom-cutdis*0.1; 
            if (tt>160){tt=160;}
            if (tt<35){tt=35;}
            camera.fov=(tt);
//            document.getElementById("message").innerHTML=tt;
            camera.updateProjectionMatrix();
            renderer.render(scene, camera);
        }
	}
}

function onDocumentTouchUp( event ) {
    zoom=tt;
	isUserInteracting = false;
    if(lon==onPointerDownLon){
	   // toggleHideBar();
	}
}

//mouse////////////////////////////////////////////////////////////
function onDocumentMouseDown( event ) {
	event.preventDefault();
	isUserInteracting = true;
	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;
	onPointerDownLon = lon;
	onPointerDownLat = lat;
}

function onDocumentMouseUp( event ) {
	isUserInteracting = false;
//	if(!_DLB){
//    	if(lon==onPointerDownLon){
//        	toggleHideBar();
//    	}
//	}
  
}

function onDocumentMouseMove( event ) {
	if ( isUserInteracting === true ) {
//	document.getElementById("message").innerHTML="MouseMove:"+lon;
		lon = ( onPointerDownPointerX - event.clientX ) * 0.2 + onPointerDownLon;
		lat = ( event.clientY - onPointerDownPointerY ) * 0.2 + onPointerDownLat;
	}
}
function mousewheel( event ) {
	event.preventDefault();
	event.stopPropagation();
	var delta = 0;
	if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9
		delta = event.wheelDelta / 40;
	} else if ( event.detail ) { // Firefox
		delta = - event.detail / 3;
	}
	zoom += delta ;
	camera.position.set(-0,zoom,0);
//    document.getElementById("message").innerHTML = zoom;
}
