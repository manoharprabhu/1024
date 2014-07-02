var Game = function() {

	var KEY_DOWN = 40;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var EMPTY = 0;

	var board = [[4,2,4,0],[4,2,4,16],[4,2,2,0],[0,4,0,0]];

	this.initializeBoard = function() {
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				this.setTileEmpty(this.getTileObject(i,j));
			}
		}
	};

	this.setRandomBoard = function() {
		for ( i = 1; i <= 2; i++) {
			var x = Math.floor(Math.random() * 10) % 4;
			var y = Math.floor(Math.random() * 10) % 4;
			board[x][y] = Math.pow(2, i);
		}
		this.redrawScreenFromArray();
	};

	this.setTileValue = function($tile, value) {
		$tile.css('background-color', '#EFEFEF');
		$tile.css('border', '1px');
		$tile.html(value);
	};

	this.setTileEmpty = function($tile) {
		$tile.css('border', '0px');
		$tile.css('background-color', '#FFFFFF');
		$tile.html('');
	};

	this.setEventListeners = function() {
		var self = this;
		$(document).keydown(function(event) {
			if (event.keyCode === KEY_LEFT) {
				self.leftEvent();
			} else if (event.keyCode === KEY_UP) {
				self.upEvent();
			} else if (event.keyCode === KEY_RIGHT) {
				self.rightEvent();
			} else if (event.keyCode === KEY_DOWN) {
				self.downEvent();
			}
		});
	};
	
	this.redrawScreenFromArray = function(){
		var i=0,j=0;
		for(i=0;i<4;i++){
			for(j=0;j<4;j++){
				if(board[i][j] === EMPTY || board[i][j] === undefined || isNaN(board[i][j])){
					this.setTileEmpty(this.getTileObject(i,j));
					board[i][j] = 0;
				} else {
					console.log('Got Value ' + board[i][j]);
					this.setTileValue(this.getTileObject(i,j),board[i][j]);
				}
			}
		}
	};
	
	this.getTileObject = function(i,j){
		return $('#'+i+'-'+j);
	};
	
	
	this.upEvent = function() {
		for(col=0;col<4;col++){
			var tempArray = [];
				tempArray = [];
			
			for(row=0;row<4;row++){
				if(board[row][col] != 0){
					tempArray.push(board[row][col]);
				}	
			}
			for(i=0;i<tempArray.length-1;i++){
				if(tempArray[i] === tempArray[i+1]){
					tempArray[i] = tempArray[i]+tempArray[i];
					tempArray[i+1] = 0;
				}
			}
			
			var pointer = 0;
			for(i=0;i<tempArray.length;i++){
				if(tempArray[i]!=0){
					tempArray[pointer] = tempArray[i];
					pointer++;
				}
			}
			while(pointer < tempArray.length){
				tempArray[pointer] = 0;
				pointer++;
			}
			
			for(i=0;i<4;i++){
				board[i][col] = tempArray[i];
			}
			
		}
		console.log(board);
		this.redrawScreenFromArray();
	};
	
	this.downEvent = function() {
		for(col=0;col<4;col++){
			var tempArray = [];
				tempArray = [];
			
			for(row=3;row>=0;row--){
				if(board[row][col] != 0){
					tempArray.push(board[row][col]);
				}	
			}
			for(i=0;i<tempArray.length-1;i++){
				if(tempArray[i] === tempArray[i+1]){
					tempArray[i] = tempArray[i]+tempArray[i];
					tempArray[i+1] = 0;
				}
			}
			
			var pointer = 0;
			for(i=0;i<tempArray.length;i++){
				if(tempArray[i]!=0){
					tempArray[pointer] = tempArray[i];
					pointer++;
				}
			}
			while(pointer < tempArray.length){
				tempArray[pointer] = 0;
				pointer++;
			}
			
			for(i=3;i>=0;i--){
				board[i][col] = tempArray[3-i];
			}
			
		}
		console.log(board);
		this.redrawScreenFromArray();
	};
	
	this.leftEvent = function() {
		alert('left');
	};
	
	this.rightEvent = function() {
		alert('right');
	};
	
};
