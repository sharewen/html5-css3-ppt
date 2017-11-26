// 判断大鱼和果实距离 吃果实
function momFruitCollision(){

	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){

		if(fruit.alive[i]){

			// calulate length
			var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			
			if(l<900){ // 30*30
				// fruit eaten
				fruit.dead(i);
				data.fruitNum++;
				mom.momBodyCount++;// 7 
				if(mom.momBodyCount>7){
					mom.momBodyCount=7;
				}

				if(fruit.fruitType[i]=="blue"){
					data.double=2;	
				}

				// 圆圈
				wave.born(fruit.x[i],fruit.y[i]);
			}
		}
	}
	}

	

}

// mom baby Collision
function momBabyCollision(){

	if(data.fruitNum >0 && !data.gameOver){
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			// baby recover
			baby.babyBodyCount=0;

			mom.momBodyCount=0;
			//score update
			data.addScore();
			halo.born(baby.x,baby.y);
		}
	}

	
}