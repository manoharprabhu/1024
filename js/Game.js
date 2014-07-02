var Game = function() {

	var KEY_DOWN = 40;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var EMPTY = 0;

	var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

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
		for(i=0;i<4;i++){
			for(j=0;j<4;j++){
				if(board[i][j] === EMPTY){
					this.setTileEmpty(this.getTileObject(i,j));
				} else {
					this.setTileValue(this.getTileObject(i,j),board[i][j]);
				}
			}
		}
	};
	
	this.getTileObject = function(i,j){
		return $('#'+i+'-'+j);
	};
	
	
	this.upEvent = function() {
		alert('up');
	};
	
	this.downEvent = function() {
		alert('down');
	};
	
	this.leftEvent = function() {
		alert('left');
	};
	
	this.rightEvent = function() {
		alert('right');
	};
	
};
