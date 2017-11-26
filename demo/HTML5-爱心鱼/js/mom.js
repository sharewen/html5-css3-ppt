var momObj=function(){
	this.x;
	this.y;
	this.amgle;
	this.bigEye=new Image();
	this.bigBody=new Image();
	this.bigTail=new Image();

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momInterval=1000;

	this.momBodyCount=0;

}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	this.bigEye.src="src/bigEye0.png";
	this.bigBody.src="src/bigSwim0.png";
	this.bigTail.src="src/bigTail0.png";
}
momObj.prototype.draw=function(){
	// 大鱼跟随鼠标移动
	// lerp x,y
	this.x=lerpDistance(mx,this.x,0.98)
	this.y=lerpDistance(my,this.y,0.98)
	
	// 极坐标 上为-PI 下为PI
	var deltaY=my-this.y;
	var deltaX=mx-this.x; // 坐标差
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);

	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}

	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momInterval;
		if(this.momEyeCount==0){
			this.momInterval=Math.random()*1500+2000;
		}else{
			this.momInterval=200;
		}
	}


	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);

	var momTailCount=this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].width*0.5);
	
	var momBodyCount=this.momBodyCount;
	if(data.double==1){// orange
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].width*0.5);	
	}else{// blue
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].width*0.5);	
	}
	
	
	var momEyeCount=this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();

}