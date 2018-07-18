// 构造函数
function Food(row, col, img) {
	this.row = row;
	this.col = col;
	this.img = img;
}

// 重置
Food.prototype.reset = function(row, col) {
	this.row = row;
	this.col = col;
}