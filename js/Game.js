var Game = function() {

	var KEY_DOWN = 40;
	var KEY_UP = 38;
	var KEY_LEFT = 37;
	var KEY_RIGHT = 39;
	var EMPTY = 0;
	var WINNING_SCORE = 1024;

	var globalTileSize = 0;
	var globalFontSize = '18';

	var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

	var colorPairs = {
		'2' : '#FF2222',
		'4' : '#22FF22',
		'8' : '#2222FF',
		'16' : '#12FFCC',
		'32' : '#DDEE11',
		'64' : '#22EE55',
		'128' : '#45EFFF',
		'256' : '#DE3245',
		'512' : '#346544',
		'1024' : '#889876',
		'2048' : '#679316',
		'4096' : '#233333',
		'8192' : '#442235',
		'16384' : '#000000'
	};

	var points = 0;

	this.initializeBoard = function() {
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				this.setTileEmpty(this.getTileObject(i, j));
			}
		}
		this.setHighScoreOnPage();
		this.setTableDataSize();
		$('table').center();
	};

	this.setRandomBoard = function() {
		for ( i = 1; i <= 2; i++) {
			var x = Math.floor(Math.random() * 10) % 4;
			var y = Math.floor(Math.random() * 10) % 4;
			board[x][y] = Math.pow(2, i);
		}
		this.redrawScreenFromArray();
	};

	this.generateRandomTile = function() {

		while (true) {
			var x = Math.floor(Math.random() * 10) % 4;
			var y = Math.floor(Math.random() * 10) % 4;
			var valPos = {};
			if (board[x][y] === 0) {
				//board[x][y] = Math.pow(2, (Math.floor(Math.random() * 10) % 2) + 1);
				valPos = {
					'x' : x,
					'y' : y,
					'val' : Math.pow(2, (Math.floor(Math.random() * 10) % 2) + 1)
				};
				break;
			}
		}

		return valPos;
	};

	this.isBoardFull = function() {
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				if (board[i][j] === 0)
					return false;
			}
		}
		return true;
	};

	this.setTableDataSize = function() {

		var width = $(window).width();
		var height = $(window).height();
		var min = 0;
		if (width < height)
			min = width;
		else
			min = height - 100;

		globalTileSize = (min / 8);

		globalFontSize = min / 18;

		$('td').css('width', globalTileSize + 'px');
		$('td').css('height', globalTileSize + 'px');

	};

	this.setTileValue = function($tile, value) {

		$tile.css('background-color', colorPairs[value]);
		$tile.css('border', '2px solid #9C5C13');
		$tile.css('border-radius', '4px');
		$tile.css('box-shadow', '2px 2px 1px #9C5C13');
		//$tile.css('color', '#FFFFFF');
		$tile.css('text-outline', '2px 2px #ff0000');
		$tile.css('font-weight', 'bold');	
		$tile.html(value);
	};

	this.setTileEmpty = function($tile) {
		$tile.css('border', '2px solid #9C5C13');
		$tile.css('border-radius', '4px');
		$tile.css('box-shadow', '2px 2px 1px #9C5C13');
		$tile.css('background-color', '#FFFFFF');
		$tile.html('');
	};

	this.executeAfterEvents = function(genFlag) {
		if (this.isGameOver()) {
			this.displayGameOver();
		}

		if (this.didWinGame()) {
			this.displayGameWin();
		}

		if (genFlag) {
			this.makeTileAppear(this.generateRandomTile());
		}

		this.updateHighScore(points);
		this.setHighScoreOnPage();
		this.redrawScreenFromArray();

	};

	this.makeTileAppear = function(valPos) {

		var $tile = this.getTileObject(valPos.x, valPos.y);
		board[valPos.x][valPos.y] = valPos.val;
		this.setTileValue($tile, valPos.val);
		$tile.css('opacity', '0');
		$tile.animate({
			opacity : 1
		}, 600);

	};

	this.setEventListeners = function() {
		var self = this;
		var genFlag = false;
		$(document).keydown(function(event) {
			genFlag = false;
			if (self.shouldGenerateRandomBlock(event.keyCode)) {
				genFlag = true;
			}

			if (event.keyCode === KEY_LEFT) {
				self.leftEvent();
			} else if (event.keyCode === KEY_UP) {
				self.upEvent();
			} else if (event.keyCode === KEY_RIGHT) {
				self.rightEvent();
			} else if (event.keyCode === KEY_DOWN) {
				self.downEvent();
			}

			self.executeAfterEvents(genFlag);
		});

		$(document).swipe({
			//Generic swipe handler for all directions
			swipe : function(event, direction, distance, duration, fingerCount, fingerData) {
				genFlag = false;
				if (direction === "up") {
					if (self.shouldGenerateRandomBlock(KEY_UP)) {
						genFlag = true;
					}
					self.upEvent();
				} else if (direction === "down") {
					if (self.shouldGenerateRandomBlock(KEY_DOWN)) {
						genFlag = true;
					}
					self.downEvent();
				} else if (direction === "left") {
					if (self.shouldGenerateRandomBlock(KEY_LEFT)) {
						genFlag = true;
					}
					self.leftEvent();
				} else if (direction === "right") {
					if (self.shouldGenerateRandomBlock(KEY_RIGHT)) {
						genFlag = true;
					}
					self.rightEvent();
				}

				self.executeAfterEvents(genFlag);

			},
			threshold : 0
		});

		$('#dismiss-gameover-popup-button').click(function(event) {
			$('#game-over-popup').css('display', 'none');
		});

		$(window).resize(function() {
			self.setTableDataSize();
			self.setNewFontSizes();
			$('table').center();
		});

	};

	this.setNewFontSizes = function() {

		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				var $tile = this.getTileObject(i, j);

				if (parseInt($tile.html()) < 16) {
					$tile.css('font-size', globalFontSize + 5 + 'pt');
				} else if (parseInt($tile.html()) < 128) {
					$tile.css('font-size', globalFontSize);
				} else {
					$tile.css('font-size', globalFontSize - 5 + 'pt');
				}
			}
		}

	};

	this.setHighScoreOnPage = function() {
		$('#highScore').html(this.getHighScore());
	};

	this.shouldGenerateRandomBlock = function(direction) {

		if (this.isBoardFull())
			return false;
		else
			return true;
	};

	this.displayGameOver = function() {
		$('.game-over-text').html('Game Over');
		$('#game-over-popup').css('display', 'block');
		$(document).unbind();
	};

	this.displayGameWin = function() {
		$('.game-over-text').html('You Win');
		$('#game-over-popup').css('display', 'block');
		$(document).unbind();
	};

	this.redrawScreenFromArray = function() {
		var i = 0, j = 0;
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				if (board[i][j] === EMPTY || board[i][j] === undefined || isNaN(board[i][j])) {
					this.setTileEmpty(this.getTileObject(i, j));
					board[i][j] = 0;
				} else {
					console.log('Got Value ' + board[i][j]);
					this.setTileValue(this.getTileObject(i, j), board[i][j]);
				}
			}
		}
		$('#score').html(points);
		this.setNewFontSizes();
	};

	this.getHighScore = function() {
		var highScore = 0;
		if (localStorage["HighScore"]) {
			highScore = localStorage["HighScore"];
		}
		return highScore;
	};

	this.updateHighScore = function(newScore) {
		var highScore = 0;
		if (localStorage["HighScore"]) {
			if (newScore > localStorage["HighScore"]) {
				localStorage["HighScore"] = newScore;
			}
		} else {
			localStorage["HighScore"] = 0;
		}

	};

	this.getTileObject = function(i, j) {
		return $('#' + i + '-' + j);
	};

	this.isGameOver = function() {
		var flag = true;
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				if (board[i][j] === 0) {
					flag = false;
					break;
				}
				if ((i < 3) && board[i][j] === board[i+1][j]) {
					flag = false;
					break;
				}
				if ((i > 0) && board[i][j] === board[i-1][j]) {
					flag = false;
					break;
				}
				if ((j < 3) && board[i][j] === board[i][j + 1]) {
					flag = false;
					break;
				}
				if ((j > 0) && board[i][j] === board[i][j - 1]) {
					flag = false;
					break;
				}
			}
		}
		return flag;
	};

	this.didWinGame = function() {
		for ( i = 0; i < 4; i++) {
			for ( j = 0; j < 4; j++) {
				if (board[i][j] === WINNING_SCORE) {
					return true;
				}
			}
		}
		return false;
	};

	this.shiftArrayElementsToLeft = function(tempArray) {
		var pointer = 0;
		for ( i = 0; i < tempArray.length; i++) {
			if (tempArray[i] != 0) {
				tempArray[pointer] = tempArray[i];
				pointer++;
			}
		}
		while (pointer < tempArray.length) {
			tempArray[pointer] = 0;
			pointer++;
		}
		return tempArray;
	};

	this.mergeNonZeroRepeatedElements = function(tempArray) {
		for ( i = 0; i < tempArray.length - 1; i++) {
			if (tempArray[i] === tempArray[i + 1]) {
				tempArray[i] = 2 * tempArray[i];
				points = points + tempArray[i];
				tempArray[i + 1] = 0;
			}
		}
		return tempArray;
	};

	this.upEvent = function() {
		for ( col = 0; col < 4; col++) {
			var tempArray = [];
			tempArray = [];

			for ( row = 0; row < 4; row++) {
				if (board[row][col] != 0) {
					tempArray.push(board[row][col]);
				}
			}

			tempArray = this.mergeNonZeroRepeatedElements(tempArray);
			tempArray = this.shiftArrayElementsToLeft(tempArray);

			for ( i = 0; i < 4; i++) {
				board[i][col] = tempArray[i];
			}

		}
		//console.log(board);
		this.redrawScreenFromArray();

	};

	this.downEvent = function() {
		for ( col = 0; col < 4; col++) {
			var tempArray = [];
			tempArray = [];

			for ( row = 3; row >= 0; row--) {
				if (board[row][col] != 0) {
					tempArray.push(board[row][col]);
				}
			}

			tempArray = this.mergeNonZeroRepeatedElements(tempArray);
			tempArray = this.shiftArrayElementsToLeft(tempArray);

			for ( i = 3; i >= 0; i--) {
				board[i][col] = tempArray[3 - i];
			}

		}
		//console.log(board);
		this.redrawScreenFromArray();
	};

	this.leftEvent = function() {
		for ( row = 0; row < 4; row++) {
			var tempArray = [];
			tempArray = [];

			for ( col = 0; col < 4; col++) {
				if (board[row][col] != 0) {
					tempArray.push(board[row][col]);
				}
			}

			tempArray = this.mergeNonZeroRepeatedElements(tempArray);
			tempArray = this.shiftArrayElementsToLeft(tempArray);

			for ( i = 0; i < 4; i++) {
				board[row][i] = tempArray[i];
			}

		}
		//console.log(board);
		this.redrawScreenFromArray();

	};

	this.rightEvent = function() {
		for ( row = 0; row < 4; row++) {
			var tempArray = [];
			tempArray = [];

			for ( col = 3; col >= 0; col--) {
				if (board[row][col] != 0) {
					tempArray.push(board[row][col]);
				}
			}

			tempArray = this.mergeNonZeroRepeatedElements(tempArray);
			tempArray = this.shiftArrayElementsToLeft(tempArray);

			for ( i = 3; i >= 0; i--) {
				board[row][i] = tempArray[3 - i];
			}

		}
		//console.log(board);
		this.redrawScreenFromArray();

	};

	//Borrowed code :)
	jQuery.fn.center = function() {
		this.css("position", "absolute");
		this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
		this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		return this;
	};

};
