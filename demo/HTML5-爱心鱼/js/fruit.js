var fruitObj=function(){
 	this.alive=[];// bool
 	this.x=[];
 	this.y=[];
 	this.aneNo=[]
 	this.l=[];
 	this.spd=[];
 	this.fruitType=[];
 	this.orange=new Image();
 	this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.l[i]=0;// 果实长度初始化
		this.spd[i]=Math.random()*0.017+0.003;//[0.005,0.015)
		this.fruitType[i]="";
		this.aneNo[i]=0;
		this.born(i);//找到果实出生位置
		
	}
	this.orange.src="src/fruit.png";
	this.blue.src="src/blue.png"
}
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		// draw
		// find an ane , grow fly up
		// ctx2.drawImage(this.orange,this.x[i]-this.orange.width*0.5,this.y[i]-this.orange.height/2);
		// context.drawImage(img,x,y,width,height);//在画布上定位图像，并规定图像的宽度和高度：
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			if(this.l[i]<=12){ // grow
				var NO=this.aneNo[i];
				this.x[i]=ane.headx[NO];
				this.y[i]=ane.heady[NO];
				this.l[i]+=this.spd[i]*deltaTime;
			}else{
				this.y[i]-=this.spd[i]*7*deltaTime;
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);			
			if(this.y[i]<10){ // grow
				
				this.alive[i]=false;
			}
		}
		
	}
}
fruitObj.prototype.born=function(i){
	this.aneNo[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.2){
		this.fruitType[i]="blue";
	}else{
		this.fruitType[i]="orange";
	}
}
fruitObj.prototype.dead=function(i){
	this.alive[i]=false;
}
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]){
			num++;
		}
	}
	if(num<15){
		sendFruit();
	}
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);	
			return;
		}
	}
}
