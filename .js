$(document).ready(function() {
	TicTacToe = (function(){ 
		var currentPlayer = 'X';
		var gameBoard = ['', '', '', '', '', '', '', '', ''];
		var twoPlayerMode = false;
		var boot = $("#malert");
		var cells = $('.cell');
		var resetButton = $('#reset');
		var twoPlayerButton = $('#twoPlayer');
		var vsComputerButton = $('#vsComputer');
		
		function alertBoot(txt) {
			boot.find('span').text(txt);
			$('.modal').modal('show');
		}
		
		function handleCellClick(event) {
			var cell = $(event.target);
			var index = cell.data('index');
			
			if (gameBoard[index] === '' && !isGameOver()) {
				gameBoard[index] = currentPlayer;
				cell.text(currentPlayer);
				cell.addClass(currentPlayer === 'X' ? 'text-danger' : 'text-primary');
				
				if (isGameOver()) {
					alertBoot(`Player ${currentPlayer} wins`);
					} else if (!gameBoard.includes('')) {
					alertBoot("It's a draw");
					} else {
					currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
					
					if (!twoPlayerMode && currentPlayer === 'O') {
						setTimeout(makeComputerMove, 500);
					}
				}
			}
		}
		
		function resetGame() {
			gameBoard = ['', '', '', '', '', '', '', '', ''];
			currentPlayer = 'X';
			cells.text('');
			cells.removeClass('text-primary');
			$('.modal').modal('hide');
		}
		
		function isGameOver() {
			var winningCombosL = [
				[0, 1, 2], [3, 4, 5], [6, 7, 8],
				[0, 3, 6], [1, 4, 7], [2, 5, 8],
				[0, 4, 8], [2, 4, 6]
			];
			
			for (var combo of winningCombosL) {
				var [a, b, c] = combo;
				if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
					return true;
				}
			}
			
			return false;
		}
		
		function moveAIndex() {
			
			for (let i = 0; i < 9; i++) {
				if (gameBoard[i] === '') {
					gameBoard[i] = currentPlayer;
					if (isGameOver()) {
						gameBoard[i] = '';
						return i;
					}
					gameBoard[i] = '';
				}
			}
			
			const opponent = currentPlayer === 'X' ? 'O' : 'X';
			for (let i = 0; i < 9; i++) {
				if (gameBoard[i] === '') {
					gameBoard[i] = opponent;
					if (isGameOver()) {
						gameBoard[i] = '';
						return i;
					}
					gameBoard[i] = '';
				}
			}
			
			
			const emptyCells = gameBoard.reduce((acc, value, index) => {
				if (value === '') {
					acc.push(index);
				}
				return acc;
			}, []);
			
			return emptyCells[Math.floor(Math.random() * emptyCells.length)];
		}
		
		
		function makeComputerMove() {
			var emptyCells = gameBoard.reduce((acc, value, index) => {
				if (value === '') {
					acc.push(index);
				}
				return acc;
			}, []);
			
			if (emptyCells.length > 0) {
				var computerIndex = moveAIndex();
				var computerCell = cells.eq(computerIndex);
				
				gameBoard[computerIndex] = currentPlayer;
				computerCell.text(currentPlayer);
				computerCell.addClass('text-primary');
				
				if (isGameOver()) {
					alertBoot(`Player ${currentPlayer} wins`);
					} else if (!gameBoard.includes('')) {
					alertBoot("It's a draw");
					} else {
					currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
				}
			}
		}
		
		
		
		cells.on('click', handleCellClick);
		
		resetButton.on('click', resetGame);
		twoPlayerButton.on('click', () => {
			twoPlayerMode = true;
			resetGame();
		});
		
		vsComputerButton.on('click', () => {
			twoPlayerMode = false;
			resetGame();
			if (currentPlayer === 'O') {
				setTimeout(makeComputerMove, 500);
			}
		});
	})();
})			