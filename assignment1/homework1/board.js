const align = require('string-align');
const prompt = require('prompt-sync')();
const checkWinMethod = require('./checkwin');
const fs = require('fs');

function startgame() {
    const num_players = prompt('How many players are going to play?(Max 26 players): ');

    if (num_players >= 1 && num_players <= 26) {
        const board_size = prompt('How large is the board?(max 999): ');

        if (board_size >= 1 && board_size <= 999) {
            const winsequence = prompt('What is the win sequence count?: ');

            if (((board_size * board_size) / winsequence >= num_players - 1) && winsequence <= board_size) {
                game(num_players, board_size, winsequence);
            } else throw 'It is impossible to win!';
        } else throw 'The board size should be 1-999!';
    } else throw 'the number of players should be 1-26';

    function game(num_players, board_size, winsequence) {
        getBoard = (pieceArr, size) => {
            if (size > 999) throw "Error: size of the board must be smaller than 999";

            let outputStr = '   ';
            let intervalDash = '   ';

            for (let j = 0; j < size - 1; j++) {
                intervalDash += '---+';
            }

            intervalDash += '---';

            for (let i = 1; i <= size; i++) {
                outputStr = outputStr + align(i.toString(), 3, 'center') + ' ';
            }

            for (let i = 0; i < size; i++) {
                outputStr = outputStr + '\n' + (i + 1).toString().padEnd(3);

                for (let j = 0; j < size; j++) {

                    outputStr = outputStr + pieceArr[i][j];

                    if (j < size - 1)
                        outputStr += '|';
                }
                if (i < size - 1)
                    outputStr = outputStr + '\n' + intervalDash;
            }

            return outputStr;
        }

        creatChessData = (boardSize) => {
            let chess = new Array(boardSize);

            for (let a = 0; a < boardSize; a++) {
                chess[a] = new Array(boardSize);

                for (let b = 0; b < boardSize; b++) {
                    chess[a][b] = 0;
                }
            }

            return chess;
        }

        buildPieceMap = (size) => {
            let pieceMap = [];

            for (let row = 0; row < size; row++) {
                let rowArr = [];

                for (let column = 0; column < size; column++) {
                    rowArr.push('   ');
                }

                pieceMap.push(rowArr);
            }

            return pieceMap;
        }

        createSymbolForPlayers = (num) => {
            let players = [];
            let symbols = [' X ', ' O ', ' A ', ' B ', ' C ', ' D ', ' E ', ' F ', ' G ', ' H ', ' I ', ' J ', ' K ', ' L ', ' M ', ' N ', ' P ', ' Q ', ' R ', ' S ', ' T ', ' U ', ' V ', ' W ', ' Y ', ' Z '];

            for (let i = 0; i < num; i++) {
                players.push(symbols[i]);
            }

            return players;
        }

        setPiece = (symbol, row, column) => {
            if (typeof symbol == 'undefined') throw "playerSymbol is undefined";

            if (pieceMap[row - 1][column - 1] !== "   ") {
                console.log("The position you chose has been occupied, please choose another one!");
                return false;
            }
            else {
                pieceMap[row - 1][column - 1] = symbol;
                return true;
            }
        }

        checkWin = (x, y, player, boardSize, winSequence, chess) => {
            let win = false;

            if (checkWinMethod.checkVertical(x, y, player, boardSize, winSequence, chess)) {
                win = true;
            } else {
                if (checkWinMethod.checkHorizontal(x, y, player, boardSize, winSequence, chess)) {
                    win = true;
                } else {
                    if (checkWinMethod.checkLeftSlash(x, y, player, boardSize, winSequence, chess)) {
                        win = true;
                    } else {
                        if (checkWinMethod.checkRightSlash(x, y, player, boardSize, winSequence, chess)) {
                            win = true;
                        }
                    }
                }
            }

            return win;
        }

        let pieceMap = buildPieceMap(board_size);
        let playerSymbols = createSymbolForPlayers(num_players);
        let newChess = creatChessData(board_size);
        let i = 0;
        
        console.log(getBoard(pieceMap, board_size));

        while (i <= (board_size * board_size)) {
            let n = i % num_players;
            let r = prompt('Player ' + (n + 1) + ' please enter two number or Q to save and quit: ');

            if (r === 'Q' || r === 'q') {
                let saveOrNot = prompt("Do you want to save the game? (input S): ");
                if (saveOrNot === 'S' || saveOrNot === 's') {
                    let saveFile = prompt("Input the file name you want to save the game: ");
                    console.log(newChess);
                    fs.writeFile(saveFile, num_players + ',' + board_size + ',' + winsequence + ',' + i + ',' + '\n' + pieceMap + '\n' + newChess, (err, result) => {
                        if (err) throw err;
                        console.log("Successfully save the file");
                    });
                }
                break;
            } else {
                let row_col = r.split(" ");

                if (parseInt(row_col[0]) >= 1 && parseInt(row_col[0]) <= board_size && parseInt(row_col[1]) >= 1 && parseInt(row_col[1]) <= board_size) {
                    if (setPiece(playerSymbols[n], row_col[0], row_col[1]) === true) {

                        console.log(getBoard(pieceMap, board_size));
                        let x = row_col[0] - 1;
                        let y = row_col[1] - 1;

                        newChess[x][y] = n + 1;

                        let ifWin = checkWin(x, y, n + 1, board_size, winsequence, newChess);

                        if (ifWin) {
                            console.log('Player ' + (n + 1) + ' has won the game!');
                            break;
                        }
                        i++;
                    }
                } else {
                    console.log('The index of row and column should be smaller than the board size!');
                }
            }
        }
    }
}


function resumeGame(fileContent) {
    getBoard = (pieceArr, size) => {
        if (size > 999) throw "Error: size of the board must be smaller than 999";

        let outputStr = '   ';
        let intervalDash = '   ';

        for (let j = 0; j < size - 1; j++) {
            intervalDash += '---+';
        }

        intervalDash += '---';

        for (let i = 1; i <= size; i++) {
            outputStr = outputStr + align(i.toString(), 3, 'center') + ' ';
        }

        for (let i = 0; i < size; i++) {
            outputStr = outputStr + '\n' + (i + 1).toString().padEnd(3);

            for (let j = 0; j < size; j++) {

                outputStr = outputStr + pieceArr[i][j];

                if (j < size - 1)
                    outputStr += '|';
            }
            if (i < size - 1)
                outputStr = outputStr + '\n' + intervalDash;
        }

        return outputStr;
    }

    createSymbolForPlayers = (num) => {
        let players = [];
        let symbols = [' X ', ' O ', ' A ', ' B ', ' C ', ' D ', ' E ', ' F ', ' G ', ' H ', ' I ', ' J ', ' K ', ' L ', ' M ', ' N ', ' P ', ' Q ', ' R ', ' S ', ' T ', ' U ', ' V ', ' W ', ' Y ', ' Z '];

        for (let i = 0; i < num; i++) {
            players.push(symbols[i]);
        }

        return players;
    }

    setPiece = (symbol, row, column) => {
        if (typeof symbol == 'undefined') throw "playerSymbol is undefined";

        if (pieceMap[row - 1][column - 1] !== "   ") {
            console.log("The position you chose has been occupied, please choose another one!");
            return false;
        }
        else {
            pieceMap[row - 1][column - 1] = symbol;
            return true;
        }
    }

    checkWin = (x, y, player, boardSize, winSequence, chess) => {
        let win = false;

        if (checkWinMethod.checkVertical(x, y, player, boardSize, winSequence, chess)) {
            win = true;
        } else {
            if (checkWinMethod.checkHorizontal(x, y, player, boardSize, winSequence, chess)) {
                win = true;
            } else {
                if (checkWinMethod.checkLeftSlash(x, y, player, boardSize, winSequence, chess)) {
                    win = true;
                } else {
                    if (checkWinMethod.checkRightSlash(x, y, player, boardSize, winSequence, chess)) {
                        win = true;
                    }
                }
            }
        }

        return win;
    }

    let stringRow = fileContent.split('\n');
    let row1 = stringRow[0].split(',');
    let num_players = row1[0];
    let board_size = row1[1];
    let winSequence = row1[2];
    let turn = row1[3];
    let row2 = stringRow[1].split(',');
    let row3 = stringRow[2].split(',');
    let pieceMap = [];
    let newChess = new Array(board_size);
    let playerSymbols = createSymbolForPlayers(num_players);

    for (let i = 0; i < row2.length; i++) {
        for (let row = 0; row < board_size; row++) {
            let rowArr = [];
            for (let column = 0; column < board_size; column++) {
                rowArr.push(row2[i]);
                i++;
            }
            pieceMap.push(rowArr);
        }
    }

    for (let i = 0; i < row3.length; i++) {

        for (let a = 0; a < board_size; a++) {
            newChess[a] = new Array(board_size);

            for (let b = 0; b < board_size; b++) {
                newChess[a][b] = row3[i];
                i++;
            }
        }
    }
    console.log(getBoard(pieceMap, board_size));

    while (turn <= (board_size * board_size)) {
        let n = turn % num_players;
        let r = prompt('Player ' + (n + 1) + ' please enter two number or Q to save and quit: ');

        if (r === 'Q' || r === 'q') {
            let saveOrNot = prompt("Do you want to save the game? (input S): ");
            if (saveOrNot === 'S' || saveOrNot === 's') {
                let saveFile = prompt("Input the file name you want to save the game: ");
                console.log(newChess);
                fs.writeFile(saveFile, num_players + ',' + board_size + ',' + winsequence + ',' + i + ',' + '\n' + pieceMap + '\n' + newChess, (err, result) => {
                    if (err) throw err;
                    console.log("Successfully save the file");
                });
            }
            break;
        } else {
            let row_col = r.split(" ");

            if (parseInt(row_col[0]) >= 1 && parseInt(row_col[0]) <= board_size && parseInt(row_col[1]) >= 1 && parseInt(row_col[1]) <= board_size) {
                if (setPiece(playerSymbols[n], row_col[0], row_col[1]) === true) {

                    console.log(getBoard(pieceMap, board_size));
                    let x = row_col[0] - 1;
                    let y = row_col[1] - 1;

                    newChess[x][y] = n + 1;

                    let ifWin = checkWin(x, y, n + 1, board_size, winSequence, newChess);

                    if (ifWin) {
                        console.log('Player ' + (n + 1) + ' has won the game!');
                        break;
                    }
                    turn++;
                }
            } else {
                console.log('The index of row and column should be smaller than the board size!');
            }
        }
    }
}

module.exports = {
    startgame: startgame,
    resumeGame: resumeGame
};