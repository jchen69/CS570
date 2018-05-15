/*let boardSize = 4;
let chess = new Array(boardSize);
let winSequence = 4;

for(let i = 1; i <= boardSize; i++) {
	chess[i] = new Array(boardSize);
	for(let j = 1; j <= boardSize; j++) {
		chess[i][j] = 0;
	}
}
chess[1][4] = 1;
chess[2][3] = 1;
chess[4][1] = 1;*/

/*checkWin = (x, y, player, boardSize, winSequence) =>{
	let win = false;

	if (checkVertical(x, y, player, boardSize, winSequence)) {
		win = true;
	} else {
		if(checkHorizontal(x, y, player, boardSize, winSequence)) {
			win = true;
		} else {
			if (checkLeftSlash(x, y, player, boardSize, winSequence)) {
				win = true;
			} else {
				if (checkRightSlash(x, y, player, boardSize, winSequence)) {
					win = true;
				}
			}
		}
	}

	return win;
}*/

checkWin = (x, y, player, boardSize, winSequence, chess) =>{
	let win = false;

	if (checkVertical(x, y, player, boardSize, winSequence, chess)) {
		win = true;
	} else {
		if(checkHorizontal(x, y, player, boardSize, winSequence,chess)) {
			win = true;
		} else {
			if (checkLeftSlash(x, y, player, boardSize, winSequence, chess)) {
				win = true;
			} else {
				if (checkRightSlash(x, y, player, boardSize, winSequence, chess)) {
					win = true;
				}
			}
		}
	}

	return win;
}

checkVertical = (x, y, player, boardSize, winSequence, chess) => {
	let count = 1;
	let change = 1;

	while((x + change) <= (boardSize - 1) && player == chess[x + change][y]) {
		count++;
		change++;
	};

	change = 1;

	while((x - change) >= 0 && player == chess[x - change][y]) {
		count++;
		change++;
	};

	if(count >= winSequence) {
		return true;
	} else {
		return false;
	}
}

checkHorizontal = (x, y, player, boardSize, winSequence, chess) => {
	let count = 1;
	let change = 1;

	while((y + change) <= (boardSize - 1) && player == chess[x][y + change]) {
		count++;
		change++;
	};

	change = 1;

	while((y - change) >= 0 && player == chess[x][y - change]) {
		count++;
		change++;
	};

	if(count >= winSequence) {
		return true;
	} else {
		return false;
	}
}

checkLeftSlash = (x, y, player, boardSize, winSequence, chess) => {
	let count = 1;
	let xChange = -1;
	let yChange = -1;

	while((x + xChange) >= 0 && (y + yChange) >= 0 && player == chess[x + xChange][y + yChange]) {
		count++;
		xChange--;
		yChange--;
	};

	xChange = 1;
	yChange = 1;

	while((x + xChange) <= (boardSize - 1) && (y + yChange) <= (boardSize - 1) && player == chess[x + xChange][y + yChange]) {
		count++;
		xChange++;
		yChange++;
	};

	if(count >= winSequence) {
		return true;
	} else {
		return false;
	}
}

checkRightSlash = (x, y, player, boardSize, winSequence, chess) =>{
	let count = 1;
	let xChange = -1;
	let yChange = 1;

	while((x + xChange) >= 0 && (y + yChange) <= (boardSize - 1) && player == chess[x + xChange][y + yChange]) {
		count++;
		xChange--;
		yChange++;
	};

	xChange = 1;
	yChange = -1;

	while((x + xChange) <= (boardSize - 1) && (y + yChange) >= 0 && player == chess[x + xChange][y + yChange]) {
		count++;
		xChange++;
		yChange--;
	};

	if(count >= winSequence) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	checkVertical: checkVertical,
	checkHorizontal: checkHorizontal,
	checkLeftSlash: checkLeftSlash,
	checkRightSlash: checkRightSlash,
}






