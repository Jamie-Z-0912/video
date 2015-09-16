    var deviceOrientation=360;
var CamerOffset=0;
   	function orientationHandler(event) {


                var alpha=event.alpha;
                var beta=event.beta;
                var gamma=event.gamma;
                if(!_iOSDevice){
                        alpha=fixAngle3(event.alpha);
                        beta=fixAngle2(event.beta);
                        gamma=fixAngle(event.gamma);
                }
	        var orientation = rotateEuler({yaw: alpha * degRad, pitch: beta * degRad, roll: gamma * degRad	});
	        var pitch = orientation.pitch* radDeg;	
	        var roll = orientation.roll* radDeg ;
	        var yaw = orientation.yaw* radDeg ;
	         
	        if((gamma>-30)&&(gamma<30)&&(beta>45)){ deviceOrientation=0;      }
	        if((gamma>-30)&&(gamma<30)&&(beta<-45)){ deviceOrientation=180;    }
	        if((gamma<-45)&&(  ((beta>-30)&&(beta<30)) || (beta<-150) || (beta>150) )){ deviceOrientation=90;}
	        if((gamma>45)&&(  ((beta>-30)&&(beta<30)) || (beta<-150) || (beta>150) )){deviceOrientation=-90; }
	         
			switch(deviceOrientation){
				case 0:
					break;
				case 90:
					roll -= 90;
					break;
				case -90:
					roll += 90;
					break;
				case 180:
					roll += 180;
					break;
			}
			if(!toggleGyroCache){//ÍÓÂÝÒÇÎ´´ò¿ª
//				 pitch=0;
//				 roll=180;
//				 yaw=180;
				pitch=0;
				roll=0;
				if(_iOSDevice){
					//roll=180;
				}
				yaw=0;
			}
//			if(_iOSDevice){
//		        mesh.rotation.x = (pitch+lat/2)* degRad;	
//		        mesh.rotation.y = roll* degRad ;
//		        mesh.rotation.z = (yaw +lon/2) * degRad ;
//		        mesh2.rotation.x = (pitch+lat/2)* degRad;	
//		        mesh2.rotation.y = roll* degRad ;
//		        mesh2.rotation.z = (yaw +lon/2) * degRad ;
//		    }
//	        document.getElementById("info").innerHTML="xyz:"+mesh.rotation.x.toFixed(1)+" "+mesh.rotation.y.toFixed(1)+" "+mesh.rotation.z.toFixed(1);  
//	        if(!_iOSDevice){
	        	
//	        if (pitch<0){
//	        	roll=roll+180;
//	        	}


//camera_A.rotation.x = (-pitch-fix*lat/2)* degRad;	
//camera_A.rotation.y = (yaw+fix*lon/2-fix2)* degRad ;
//camera_A.rotation.z = (roll ) * degRad ;

//			   camera_A.position.set(0,0,0);
//        camera_B

//		        mesh.rotation.x = (-pitch+fix*lat/2)* degRad;	
//		        mesh.rotation.y = (roll-fix*lon/2)* degRad ;
//		        mesh.rotation.z = (yaw ) * degRad ;
//		        mesh2.rotation.x = (-pitch+fix*lat/2)* degRad;	
//		        mesh2.rotation.y = (roll-fix*lon/2)* degRad ;
//		        mesh2.rotation.z = (yaw ) * degRad ;
		        
//		    }



//mesh.rotation.x=mesh2.rotation.x=mesh3.rotation.x=mesh4.rotation.x=
//mesh5.rotation.x=mesh6.rotation.x=mesh7.rotation.x=mesh8.rotation.x= (-pitch+lat/2)* degRad;	
//mesh.rotation.y=mesh2.rotation.y=mesh3.rotation.y=mesh4.rotation.y=
//mesh5.rotation.y= mesh6.rotation.y=mesh7.rotation.y= mesh8.rotation.y= (roll-lon/2)* degRad ;
//mesh.rotation.z=mesh2.rotation.z=mesh3.rotation.z=mesh4.rotation.z=
//mesh5.rotation.z= mesh6.rotation.z=mesh7.rotation.z= mesh8.rotation.z= (yaw ) * degRad ;	
		
   		document.getElementById("info").innerHTML="xyz:"
   		+mesh.rotation.x.toFixed(1)+" "+mesh.rotation.y.toFixed(1)+" "+mesh.rotation.z.toFixed(1)
   		+" ||| "+camera_A.rotation.y;  
    }

   function rotateEuler( euler ){
    	var heading, bank, attitude,
    		ch = Math.cos(euler.yaw),
    		sh = Math.sin(euler.yaw),
    		ca = Math.cos(euler.pitch),
    		sa = Math.sin(euler.pitch),
    		cb = Math.cos(euler.roll),
    		sb = Math.sin(euler.roll),
    		matrix = [
    			sh*sb - ch*sa*cb,   -ch*ca,    ch*sa*sb + sh*cb,
    			ca*cb,              -sa,      -ca*sb,
    			sh*sa*cb + ch*sb,    sh*ca,   -sh*sa*sb + ch*cb
    		]; // Note: Includes 90 degree rotation around z axis
    	/* [m00 m01 m02] 0 1 2
    	 * [m10 m11 m12] 3 4 5
    	 * [m20 m21 m22] 6 7 8 */
    
    	if (matrix[3] > 0.9999)	{
    		heading = Math.atan2(matrix[2],matrix[8]);
    		attitude = Math.PI/2;
    		bank = 0;
    	}else if (matrix[3] < -0.9999){
    		heading = Math.atan2(matrix[2],matrix[8]);
    		attitude = -Math.PI/2;
    		bank = 0;
    	}else{
    		heading = Math.atan2(-matrix[6],matrix[0]);
    		attitude = Math.asin(matrix[3]);
    		bank = Math.atan2(-matrix[5],matrix[4]);
    	}
        heading = Math.atan2(-matrix[6],matrix[0]);
        attitude = Math.asin(matrix[3]);
        bank = Math.atan2(-matrix[5],matrix[4]);
        if (matrix[3] > 0.9999)	{
            heading = Math.atan2(matrix[2],matrix[8]);
            bank = 0;
        } else if (matrix[3] < -0.9999){
            heading = Math.atan2(matrix[2],matrix[8]);
            bank = 0;
        } 
    	return { yaw:heading, pitch:attitude, roll:bank };
    }
function wrapAngle(value) {
    value = value % 360;
    return (value <= 180) ? value :value - 360;
} 
function fixAngle(value) {
    value = value % 360;
    if (value<0)value=180+value;
    return value;
//    return (value <= 180) ? value :value - 360;
}
function fixAngle2(value) {
    var grm=event.gamma%360;
    value = value % 360;
    if (grm<0)
        value=-180-value;
    return value;
//    return (value <= 180) ? value :value - 360;
}  
function fixAngle3(value) {
    var grm=event.gamma%360;
    value = value % 360;
    if (grm<0)
        value=180+value;
    return value;
//    return (value <= 180) ? value :value - 360;
}  