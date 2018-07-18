// 构造函数
function Snake(pic_obj) {
	console.log(pic_obj)
	// 里面存放的蛇的每一个身体的坐标
	this.arr = [
		{row: 5, col: 5},
		{row: 5, col: 6},
		{row: 5, col: 7},
		{row: 5, col: 8},
		{row: 5, col: 9}
		
	];
	// 定义头部图片
	this.head_pic = pic_obj.head_pic;
	// 定义身体图片
	this.body_pic = pic_obj.body_pic;
	// 定义尾部图片
	this.tail_pic = pic_obj.tail_pic;
	// 默认头部索引值
	this.head_idx = 2;
	// 默认尾部索引值
	this.tail_idx = 0;
	// 方向
	this.direction = 39;
	// 定义锁
	this.lock = true;
}
// 移动
Snake.prototype.move = function() {
	// 蛇移动也就是改变其头部和尾巴
	// 获取蛇的头部,也就是数组中最后一项
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
	// 判断新头的方向
	if(this.direction === 37) {
		// 往左走 行不变 列--
		newHead.col--;
	} else if(this.direction === 38) {
		// 往上走 行-- 列不变
		newHead.row--;
	} else if(this.direction === 39) {
		// 往右走 行不变 列++
		newHead.col++;
	} else if(this.direction === 40) {
		// 往下走 行++ 列不变
		newHead.row++;
	}
	// 决定新头的位置
	this.arr.push(newHead);
	// 去除尾巴
	this.arr.shift();
	// 移动过后，将锁打开
	this.lock = true;
	// 移动过后，改变尾巴 屁股的位置决定尾巴的方法
	// 获取尾巴
	var tail = this.arr[0];
	// 获取屁股
	var pg = this.arr[1];
	// 判断
	if(tail.col === pg.col) {
		// 表示同一列
		// 通过三元运算符进行判断
		this.tail_idx = tail.row > pg.row ? 3 : 1;
	} else {
		// 表示同一行
		this.tail_idx = tail.col > pg.col ? 2 : 0;
	}

}
// 转向
Snake.prototype.change = function(direction) {
	if(!this.lock) {
		return;
	}
	this.lock = false;
	// 判断方向
	var dir = Math.abs(direction - this.direction);
	if(dir === 0 || dir === 2) {
		return;
	} else {
		this.direction = direction;
	}
	// 改变方向时头部
	// 判断用户点击的按键
	if(direction === 37) {
		this.head_idx = 0;
	} else if(direction === 38) {
		this.head_idx = 1;
	} else if(direction === 39) {
		this.head_idx = 2;
	} else if(direction === 40) {
		this.head_idx = 3;
	}

}
// 长长
Snake.prototype.growUp = function() {
	// 蛇长长就是增加数组的长度
	// 获取数组中的第一项  也就是蛇的尾巴
	var tail = this.arr.slice(0, 1);
	console.log(tail)
	// 添加到数组的第一项
	this.arr.unshift(tail[0])
}