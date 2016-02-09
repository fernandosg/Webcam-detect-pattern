var canvas=document.createElement("canvas");
canvas.width=640;
canvas.height=480;	
var video=document.createElement("video");
streamVideo(video);
var canvasContext=canvas.getContext("2d");
var glCanvas=document.createElement("canvas");
var renderer_webgl=new THREE.WebGLRenderer({canvas:glCanvas});
renderer_webgl.setSize(640,480);
renderer_webgl.autoClear=false;
document.getElementById("container").appendChild(glCanvas);
var camera=new THREE.Camera();
var scene=new THREE.Scene();
var geometry=new THREE.PlaneGeometry(2,2,0);
var texture=new THREE.Texture(canvas);
var material=new THREE.MeshBasicMaterial({
			map:texture,
			depthTest:false,
			depthWrite:false
		});
var mesh=new THREE.Mesh(geometry,material);
scene.add(mesh);

function loop(){
	if(video.readyState===video.HAVE_ENOUGH_DATA){
		canvas.changed=true;
		canvasContext.drawImage(video,0,0);
		verifyDetector();
		texture.needsUpdate=true;
		renderer_webgl.render(scene,camera);
	}
	requestAnimationFrame(loop);
}
loop();
canvas_draw=document.createElement("canvas");
		canvas_draw.width=150;
		canvas_draw.height=75;
		ctx=canvas_draw.getContext("2d");
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0,0,150,75);

function verifyDetector(){
	detector = new AR.Detector();
    imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
   	var markers = detector.detect(imageData);
   	if(markers.length>0)
		canvasContext.drawImage(canvas_draw,markers[0].corners[0].x,markers[0].corners[0].y);   		   	
}
