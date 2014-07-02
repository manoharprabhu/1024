var Game = function() {

	this.initializeBoard = function() {
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				this.setTileEmpty($('#' + i + '-' + j));
			}
		}
	};

	this.setRandomBoard = function() {
		for(i=1;i<=2;i++){
		var x = Math.floor(Math.random() * 10) % 4;
		var y = Math.floor(Math.random() * 10) % 4;
		this.setTileValue($('#' + x + '-' + y), Math.pow(2,i));
		}
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
};
