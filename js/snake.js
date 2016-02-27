$(function(){
	//场景搭建
	var point = '';
	for(var i = 0;i < 20;i++){
		for(var j = 0;j < 20;j++){
			var id = j+'_'+i;
			point += '<div class="point" id="'+id+'"></div>';
		}
	}
	$('#scene').html(point);

	//snake初始位置
	var snake = [{x:0,y:0},{x:1,y:0},{x:2,y:0}];
	var data = {'0_0':true,'1_0':true,'2_0':true};
	var direction = 39;
	$(document).keydown(function(event) {
		if(event.keyCode >= 37 && event.keyCode <= 40 && Math.abs(event.keyCode - direction) !=2){
			if(event.keyCode === 37){
				direction = 37;
			}
			if(event.keyCode === 38){
				direction = 38;
			}
			if(event.keyCode === 39){
				direction = 39;
			}
			if(event.keyCode === 40){
				direction = 40;
			}
		}else{
			return;
		}
	});

	//绘制snake位置
	var drawSnake = function(){
		$(snake).each(function(index, el) {
			$('#'+el.x+'_'+el.y).css('background','#333');
		});
	}
	drawSnake();

	//随机绘制food
	var x = Math.floor(Math.random()*20);
	var y = Math.floor(Math.random()*20);
	var food = {x:x,y:y};
	var foodDraw = function(){
		while(data[x+'_'+y]){
			x = Math.floor(Math.random()*20);
			y = Math.floor(Math.random()*20);
		}
		food = {x:x,y:y};
		$('#'+food.x+'_'+food.y).css('background','#666');
	}
	foodDraw();

	//snake移动函数
	var move = function(){
		if(snake[snake.length-1].x != food.x || snake[snake.length-1].y != food.y){
			$('#'+snake[0].x+'_'+snake[0].y).css('background','#fff');
			delete(data[snake[0].x+'_'+snake[0].y]);
			snake.shift();
		}else{
			foodDraw();
		}
		var newHead = snake[snake.length-1];
		if(direction === 39){
			newHead = {x:newHead.x+1,y:newHead.y};
		}
		if(direction === 37){
			newHead = {x:snake[snake.length-1].x-1,y:newHead.y};
		}
		if(direction === 38){
			newHead = {x:newHead.x,y:snake[snake.length-1].y-1};
		}
		if(direction === 40){
			newHead = {x:newHead.x,y:snake[snake.length-1].y+1};
		}
		if(data[newHead.x+'_'+newHead.y]){
			$('.lose').css('display','block');
			clearInterval(time);
		}
		var num = newHead.x+'_'+newHead.y;
		data[num] = true;
		snake.push(newHead);
		if(snake.length > 399){
			$('.win').css('display','block');
			clearInterval(time);
		}
		$('#'+num).css('background','#333');
		if(newHead.x < 0 || newHead.x > 19 || newHead.y < 0 || newHead.y > 19){
			$('.lose').css('display','block');
			clearInterval(time);
		}
	}

	//启用时间函数
	var time = setInterval(move,100);
})