
var nnn="d";
var DomRender;
var Obj;
var camera, scene, renderer;
var mesh ,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8;
var video;
var degRad = Math.PI/180, radDeg = 180/ Math.PI;
var Width=640,Height=360;
var stats;
var inter_w=Width,inter_h=Height;
var playButton;
var loader2;
var videoMaterial;
var _iOSDevice = !!navigator.platform.match(/iPhone|iPod|iPad/);
var _platform=getPlatform ();
var fix=1,fix2=0;//fix是设备的正反,fix2是陀螺仪的偏移
if(!_iOSDevice){fix=-1;}
//if(getPlatform ()!="win"){//设备没有陀螺仪属性
//	fix2 = 90;
//}
var time_start=0;var time_start2=0;
function getPlatform () {//window,Mac,iPhone,Android
	if (!!navigator.platform.match(/Win64|Win32/)){		return "win";	}
	if (!!navigator.platform.match(/iPhone|iPod|iPad/)){		return "ios";	}	
	if (!!navigator.platform.match(/Linux/)){		return "android";	}	
	return navigator.platform;
}
//if (window.DeviceOrientationEvent) {//检查设备，以确认是否有陀螺仪
//	console.log('This device  deviceorientation');
//    window.addEventListener('deviceorientation', function(event) {
//        var a = event.alpha,
//            b = event.beta,
//            g = event.gamma;
//        console.log('Orientation - Alpha: ' + a + ', Beta: '+ b + ', Gamma: ' + g);
//    }, false);
//} else {
//    console.log('This device does not support deviceorientation');
//}
var controls;var effect;
init();
animate();
var scaleVar=1;
function init () {
		stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.left = '250px';stats.domElement.style.top = '0px';
//		videoDom.appendChild( stats.domElement );
        scene = new THREE.Scene();
        camera_A = new THREE.PerspectiveCamera(100, scaleVar*Width / Height, 1, 500 );
        camera_A.target = new THREE.Vector3( 0, 0, 0 );
        camera_A.position.set(0,0,0);
        camera_B = new THREE.PerspectiveCamera(100, scaleVar*Width / Height, 1, 500 );
        camera_B.position.set(1000,0,0);
        controls_A = new THREE.VRControls( camera_A );
        controls_B = new THREE.VRControls( camera_B );
    
        //
  cameraRig = new THREE.Object3D();
	cameraRig.add( camera_B );
	scene.add( cameraRig );
	
        if(_iOSDevice){
//        document.getElementById("message").innerHTML="true!!!";
//        	camera_A.rotation.set(90*degRad,0*degRad,0*degRad);
//        	camera_B.rotation.set(90*degRad,0*degRad,0*degRad);
        }else{
//        document.getElementById("message").innerHTML="false!!!";
//        	camera_A.rotation.set(90*degRad,0*degRad,180*degRad);
//        	camera_B.rotation.set(90*degRad,0*degRad,180*degRad);
        }


        renderer = new THREE.WebGLRenderer({antialias:true,alpha : true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( Width, Height );
	DomRender=renderer.domElement;
	
        renderer.autoClear = false;
        video= document.createElement( 'video' );
//		video= document.getElementById( 'video' );
        video.setAttribute('webkit-playsinline', 'true');
	video.setAttribute('preload', 'auto');
	video.setAttribute('controls', 'controls');
//	video.autoplay = true;
	video.load = true;
	video.crossOrigin = "anonymous";
	var videoTexture = new THREE.VideoTexture( video );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.wrapS = videoTexture.wrapT = THREE.ClampToEdgeWrapping;
//	videoTexture.wrapS = videoTexture.wrapT = THREE.RepeatWrapping;
//	videoTexture.repeat.set( 2, 2 );
    videoMaterial = new THREE.MeshBasicMaterial( {
        	 map : videoTexture, color: 0xffffff, 
        	 side:THREE.DoubleSide 
        	 } 
       	);
   loader2 = new THREE.OBJLoader();
   updateObj();

// geometry.ve
//        loader2.load( 'ball.obj', function ( object ) {
//    		object.traverse( function ( child ) {
//    			if ( child instanceof THREE.Mesh ) {
//    				child.material = videoMaterial;
//    				}
//			} );
//			mesh=object;
//			mesh.scale.set(1,1,1);
//			scene.add( mesh );
//			document.getElementById("info").innerHTML=mesh.vertices;
//    	} );
//    	scene.remove(mesh);      
//    	removeEntity();


//    	mesh.rotation.set(180*degRad,0*degRad,0*degRad);

//            	var geometry = new THREE.SphereGeometry( 500, 32, 32 );
//                mesh = new THREE.Mesh(geometry, videoMaterial);
//                scene.add( mesh );
		//effect = new THREE.VREffect( renderer );
		//effect.setSize( window.innerWidth, window.innerHeight );
//loader2.load( 'avv2.obj', function ( object ) {
//    		object.traverse( function ( child ) {
//    			if ( child instanceof THREE.Mesh ) {
//    				child.material = videoMaterial;
//    				}
//			} );
//			mesh2=object;
////			mesh2.scale.set(-1,1,1);
//			mesh2.position.set(1000,0,0);
////			mesh2.rotation.set(90*degRad,0*degRad,90*degRad);
//			scene.add( mesh2 );
//    	} );
}
function updateObj(){
	//单屏幕
		loader2.load( 'ball.obj', function ( object ) {
	    		object.traverse( function ( child ) {
	    			if ( child instanceof THREE.Mesh ) {
	    				child.material = videoMaterial;
	    				}
				} );
				mesh=object;
				mesh.position.set(1000,0,0);
				scene.add( mesh );
	    	} );
		loader2.load( 'ball.obj', function ( object ) {
	    		object.traverse( function ( child ) {
	    			if ( child instanceof THREE.Mesh ) {
	    				child.material = videoMaterial;
	    				}
				} );
				mesh2=object;
				mesh2.position.set(-1000,0,0);
				scene.add( mesh2 );
	    	} );
    //左右屏幕Left_Right
    	loader2.load( 'avv1.obj', function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
    				child.material = videoMaterial;
    				}
			} );
			mesh3=object;
			mesh3.position.set(-1000,1000,0);
			scene.add( mesh3 );
    	} );
    	
    	loader2.load( 'avv2.obj', function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
    				child.material = videoMaterial;
    				}
			} );
			mesh4=object;
			mesh4.position.set(1000,1000,0);
			scene.add( mesh4 );
    	} );
	//上下屏幕Up_Down
    	loader2.load( 'up.obj', function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
    				child.material = videoMaterial;
    				}
			} );
			mesh5=object;
			mesh5.position.set(-1000,2000,0);
			scene.add( mesh5 );
    	} );
    	
    	loader2.load( 'down.obj', function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
    				child.material = videoMaterial;
    				}
			} );
			mesh6=object;
			mesh6.position.set(1000,2000,0);
			scene.add( mesh6 );
    	} );
	//压缩左右屏幕left-right
    	loader2.load( 'left_V.obj', function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
    				child.material = videoMaterial;
    				}
			} );
			mesh7=object;
			mesh7.position.set(-1000,3000,0);
			scene.add( mesh7 );
    	} );
    	
    	loader2.load( 'right_V.obj', function ( object ) {
    		object.traverse( function ( child ) {
    			if ( child instanceof THREE.Mesh ) {
    				child.material = videoMaterial;
    				}
			} );
			mesh8=object;
			mesh8.position.set(1000,3000,0);
			scene.add( mesh8 );
    	} );
}
//改变窗口大小时调用
function changeSize(){
	if(fullScreenCache){
		camera_A.aspect = scaleVar * window.innerWidth / window.innerHeight;
		camera_B.aspect = scaleVar * window.innerWidth / window.innerHeight;
		document.getElementById("videoWin").style.width=window.innerWidth;
		document.getElementById("videoWin").style.height=window.innerHeight;
		DomRender.style.width=window.innerWidth;
		DomRender.style.height=window.innerHeight;
	}else{
        camera_A.aspect = scaleVar * Width / Height;
        camera_B.aspect = scaleVar * Width / Height;
		document.getElementById("videoWin").style.width=Width;
		document.getElementById("videoWin").style.height=Height;
        DomRender.style.width=Width;
        DomRender.style.height=Height;
	}
	camera_A.updateProjectionMatrix();
	camera_B.updateProjectionMatrix();
}   

//改变窗口大小时调用
function onWindowResize() {
//        camera_A.aspect = scaleVar * Width / Height;
//		camera_B.aspect = scaleVar * Width / Height;
        renderer.setSize( Width , Height );
        changeSize();
        
}
//更新
function animate() {
//	if (mesh!=null)
//		document.getElementById("info").innerHTML="xyz:"+mesh.rotation.x.toFixed(1)+" "+mesh.rotation.y.toFixed(1)+" "+mesh.rotation.z.toFixed(1);  
    requestAnimationFrame( animate );
//    controls_A.update();
//    controls_B.update();
    stats.update();
    renderer.clear();
    renderer.setViewport( 0, 0, Width*scaleVar, Height );
    renderer.render( scene, camera_A );
    renderer.setViewport( Width*scaleVar, 0, Width*(1-scaleVar), Height );
    renderer.render( scene, camera_B );
//        document.getElementById("message").innerHTML=deviceOrientation;
//        deviceOrientation
//    if(_platform=="win"){//假设win为PC设备，没有陀螺仪属性，其实surface是他妈有的
            if (mesh!=null){
            	
                    updateOrientation ();
            }
//    } 
//如果点击后0.3秒内无其点击,隐藏控制栏
	
//	document.getElementById("message1").innerHTML=new Date().getTime()-time_start;
//
//	if(((new Date().getTime()-time_start)>200)&&( (new Date().getTime()-time_start)<300) ){//0.3秒后查看
////		document.getElementById("message3").innerHTML="dd";
////		document.getElementById("message2").innerHTML=time_start-time_start2;
//		if ((time_start-time_start2)>199){
//			if(lon==onPointerDownLon){
//        		toggleHideBar();
//			}
//			document.getElementById("message3").innerHTML="hide";
//			_DLB=false;
//    	}else{
//    		
//			document.getElementById("message3").innerHTML="full";
////			toggleFullScreen(document.getElementById( 'videoWin' ));
//		}
//		time_start=0;
//	}

}
//当设备没有陀螺仪时，修正旋转和更新旋转
function updateOrientation () {
		mesh.rotation.x=mesh2.rotation.x=mesh3.rotation.x=mesh4.rotation.x=
		mesh5.rotation.x=mesh6.rotation.x=mesh7.rotation.x=mesh8.rotation.x= -lat* degRad;
		mesh.rotation.y=mesh2.rotation.y=mesh3.rotation.y=mesh4.rotation.y=
		mesh5.rotation.y= mesh6.rotation.y=mesh7.rotation.y= mesh8.rotation.y= lon* degRad;

//document.getElementById("info").innerHTML="xyz:"+mesh.rotation.x.toFixed(1)+" "+mesh.rotation.y.toFixed(1)+" "+mesh.rotation.z.toFixed(1); 
} 
//移除整个场景
function removeEntity() {
        var scene = document.querySelectorAll("scene");                               //clear the objects from the scene
        for (var i = 0; i < scene.length; i++) {                                    //loop through to get all object in the scene
                var scene =document.getElementById("scene");                                  
                scene.removeChild(scene.childNodes[0]);                                        //remove all specified objects
        }   
}


window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener("deviceorientation", orientationHandler, false);

DomRender.addEventListener( 'touchstart', onDocumentTouchDown, false );
DomRender.addEventListener( 'touchmove', onDocumentTouchMove, false );
DomRender.addEventListener( 'touchend', onDocumentTouchUp, false );

DomRender.addEventListener( 'mousedown', onDocumentMouseDown, false );
DomRender.addEventListener( 'mousemove', onDocumentMouseMove, false );
DomRender.addEventListener( 'mouseup', onDocumentMouseUp, false );

DomRender.addEventListener( 'mousewheel', mousewheel, false );
DomRender.addEventListener( 'DOMMouseScroll', mousewheel, false );