const prompt = require("prompt");
const prompt_sync = require('prompt-sync')();
const board = require("./board");
const fs = require("fs");
function getInfo() {
    prompt.start();
    const newgame = {
        name: "newgame",
        description: "Do you want to resume a saved game?(t/f)",
        type: "boolean",
        required: true
    };
    prompt.get(newgame, function (err, result) {
        if (result.newgame === true) {
            let fileName = prompt_sync('Which file you want to open as resuming the game? ');
            fs.stat(fileName, function (err, stat) {
                if (stat && stat.isFile()) {
                    fs.readFile(fileName, 'utf8', (err, data) => {
                        if (err) console.error("An error occurred while opening the file", err);
                        else {
                            board.resumeGame(data);
                        }
                    })
                } else {
                    throw 'No saved game!'
                }
            })
        } else {
            board.startgame();
        }
    });

}
getInfo();