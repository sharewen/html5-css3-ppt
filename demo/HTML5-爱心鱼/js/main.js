var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;// 上一帧时间
var deltaTime;//两帧之间时间间隔

var canWidth;
var canHeight;
var bgPic=new Image();
var ane;
var fruit; 
var mom;// big fish

var mx,my;// mouseX

var baby;

var babyTail=[];
var babyEye=[];
var babyBody=[];

var momTail=[];
var momEye=[];

var data;

var momBodyOra=[];
var momBodyBlue=[];

var wave;
var halo;

var dust;
var dustImg=[];

document.body.onload=game;
function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}
function init(){
	// 获取canvas
	can1=document.getElementById("canvas1");
	can2=document.getElementById("canvas2");
	ctx1=can1.getContext("2d");// zIndex=1 fishes dust UI circle
	ctx2=can2.getContext("2d");// zIndex=0 draw background ane fruit
	
	can1.addEventListener("mousemove", onMouseMove,false);

	canWidth=can1.width;
	canHeight=can1.height;

	bgPic.src="src/background.jpg";
	ane=new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();
	mom=new momObj();
	mom.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	baby=new babyObj();
	baby.init();

	// babyTail 帧动画
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="src/babyTail"+i+".png";
	}
	// baby eye
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="src/babyEye"+i+".png";
	}

	// baby body
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="src/babyFade"+i+".png";
	}

	// mom tail
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="src/bigTail"+i+".png";
	}

	// mom eye
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="src/bigEye"+i+".png";
	}

	data=new dataObj();
	
	// mom body color
	for(var i=0;i<8;i++){
		momBodyBlue[i]=new Image();
		momBodyOra[i]=new Image();
		momBodyOra[i].src="src/bigSwim"+i+".png";
		momBodyBlue[i].src="src/bigSwimBlue"+i+".png";
	}

	ctx1.fillStyle="white";
	ctx1.font="20px Verdana";
	ctx1.textAlign="center;"

	wave=new waveObj();
	wave.init();

	halo=new haloObj();
	halo.init();

	dust=new dustObj();
	dust.init();
	for(var i=0;i<7;i++){
		dustImg[i]=new Image();
		dustImg[i].src="src/dust"+i+".png";
	}

}
function gameloop(){
	window.requestAnimationFrame(gameloop);//
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>40) deltaTime=40;// 放置果实太大
	drawBackground();
	ane.draw();

	fruit.draw();
	fruitMonitor();
	

	ctx1.clearRect(0,0,canWidth,canHeight)
	mom.draw();
	baby.draw();
	momFruitCollision();
	momBabyCollision()
	
	data.draw();

	wave.draw();
	halo.draw();

	dust.draw();
}

function onMouseMove(e){
	if(!data.gameOver){
		if(e.offseX || e.layerX){
			mx=e.offsetX==undefined ? e.layerX :e.offsetX;
			my=e.offsetY==undefined ? e.layerY :e.offsetY;
		}
	}
	

}