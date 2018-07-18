function Map(width, height, row, col) {
	this.width = width;
	this.height = height;
	this.row = row;
	this.col = col;
	this.dom = document.createElement("div");
	// 定义一维数组
	this.arr = [];
}
// 填充
Map.prototype.fill = function() {
	// 需要先得到一小个单元格，才可以填充一整行。再一行一行的填充，然后在填充整个地图
	/*第一个循环是填充多行   第二个循环是填充一行*/
	for(var j = 0; j < this.row; j++) {
		// 定义一个行数组
		var row_arr = [];
		// 创建行容器
		var row_dom = document.createElement("div");
		row_dom.className = "row";
		// 循环将一个行容器填满
		for(var i = 0; i < this.col; i++) {
			// 创建一个小单元格
			var col_dom = document.createElement("p");
			col_dom.className = "grid";
			// 填充行
			row_dom.appendChild(col_dom);
			// 将每一个小格子元素添加到数组中
			row_arr.push(col_dom);
		}
		// 每创建一行，就添加到数组中
		this.arr.push(row_arr);
		// 每创建一行，将放在this.dom中
		this.dom.appendChild(row_dom);
	}
	
	this.dom.className = "box";
	// 多行填充完成。放在页面中
	document.body.appendChild(this.dom);
}

// 清屏
Map.prototype.clear = function() {
	for(var i = 0; i < this.arr.length; i++) {
		for(var j = 0; j < this.arr[i].length; j++) {
			// this.arr[i][j].style.backgroundColor = "white";
			this.arr[i][j].style.backgroundImage = "";
		}
	}
}
