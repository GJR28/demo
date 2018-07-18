// 构造函数
function Game(map, snake, food, block) {
	this.map = map;
	this.snake = snake;
	this.food = food;
	this.block = block;
	// 定时器
	this.timer = null;
	// 定义游戏开关flag
	this.flag = false;
	this.init();
}
// 初始化
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.start();
	this.bindEvent();
	
}

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill()
}
// 渲染食物
Game.prototype.renderFood = function() {
	// 定义变量
	var row = this.food.row;
	var col = this.food.col;
	// 在地图上显示
	// this.map.arr[row][col].style.backgroundColor = "red";
	this.map.arr[row][col].style.backgroundImage = "url(" + this.food.img +")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}
// 渲染蛇
Game.prototype.renderSnake = function() {
	// 与食物类似
	// 渲染头部
	// 获取头部
	var head = this.snake.arr[this.snake.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url(" + this.snake.head_pic[this.snake.head_idx] + ")";
	// 循环渲染身体 去除头部和尾部 
	for(var i = 1; i < this.snake.arr.length - 1; i++) {
		var row = this.snake.arr[i].row;
		var col = this.snake.arr[i].col;
		// this.map.arr[row][col].style.backgroundColor  = "green";
		this.map.arr[row][col].style.backgroundImage  = "url(" + this.snake.body_pic[0] + ")";
	}
	// 渲染尾部
	// 获取尾部
	var tail = this.snake.arr[0];
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url(" + this.snake.tail_pic[this.snake.tail_idx] + ")";
}
// 开始游戏
Game.prototype.start = function() {
	// 游戏开始，将开关flag变成true
	this.flag = true;
	// 作用域原因。备份this
	var me = this;
	this.timer = setInterval(function() {
		// 移动
		me.snake.move();
		// 检测蛇是撞墙
		me.checkMap();
		// 检测蛇是否吃到食物
		me.checkFood();
		// 检测蛇是否吃到自己
		me.checkSnake();
		// 检测蛇是否撞到了障碍
		me.checkBlock();
		// 如果游戏开关为true，执行以下代码
		if(me.flag) {
			// 清屏
			me.map.clear();
			// 渲染障碍物
			me.renderBlock();
			// 渲染食物
			me.renderFood();
			// 渲染蛇
			me.renderSnake();	
		}
	}, 200)
}
// 用户点击事件onkeydown
Game.prototype.bindEvent = function() {
	// 备份this
	var me = this;
	document.onkeydown = function(e) {
		// 获取用户点击的按键
		var code = e.keyCode;
		// console.log(code)
		// 判断
		if(code === 37 || code === 38 || code === 39 || code === 40 ) {
			// 转向
			me.snake.change(code);
		} else {
			console.log("别瞎按");
		}
	}
}
// 游戏结束
Game.prototype.gameOver = function() {
	clearInterval(this.timer);
	// 游戏结束
	this.flag = false;
	// var r = confirm("游戏结束，是否重新开始")
	// if(r === true) {
	// 	// 重新开始游戏
	// 	this.start();
	// }

}
// 检测蛇是否撞墙
Game.prototype.checkMap = function() {
	// 判定蛇是否撞墙 也就是判断的是蛇的蛇头是否撞墙
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 边界判断
	// if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
	if(head.row < 0 || head.row > this.map.row - 1 || head.col < 0 || head.col > this.map.col - 1) {
		console.log("撞墙了")
		// 游戏结束
		this.gameOver();
	}
}
// 检测蛇与食物的关系
Game.prototype.checkFood = function() {
	// 也就是判断蛇头与食物的坐标
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 获取食物的位置
	var food = this.food;
	// 判断
	if(head.col === food.col && head.row === food.row) {
		console.log("蛇吃到食物了")
		// 让蛇长长
		this.snake.growUp();
		// 食物重置
		this.resetFood();
		
	}
}
// 重置食物
Game.prototype.resetFood = function() {
	// 随机出现食物。改变就是row  col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	// 食物不可以出现在蛇的身体上
	for(var i = 0; i < this.snake.arr.length; i++) {
		var one = this.snake.arr[i];
		if(one.col === col && one.row === row) {
			
		}
	}
	// 食物不可以出现在障碍物上
	for(var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if(one.col === col && one.row === row) {
			
		}
	}
	this.food.reset(row, col);
}
// 检测蛇与自己的关系
Game.prototype.checkSnake = function() {
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环判断蛇头与蛇身
	for(var i = 0; i < this.snake.arr.length - 1; i++){			
		// 获取蛇身
		var one = this.snake.arr[i];
		// 循环判断
		if(head.row === one.row && head.col === one.col) {
			console.log("吃到自己了"); 
			this.gameOver();
		}
	}
}
// 渲染障碍物
Game.prototype.renderBlock = function() {
	// 循环渲染障碍物
	for(var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage  = "url(" + this.block.img + ")";
		this.map.arr[row][col].style.backgroundSize  = "cover";
	}
}
// 检测蛇与障碍物的关系
Game.prototype.checkBlock = function() {
	// 获取蛇头
	var head = this.snake.arr[this.snake.arr.length - 1];
	// 循环
	for(var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		// 判断
		if(head.row === row && head.col === col) {
			console.log("蛇撞到障碍物了")
			// 游戏结束
			this.gameOver();
		}
	}
}
