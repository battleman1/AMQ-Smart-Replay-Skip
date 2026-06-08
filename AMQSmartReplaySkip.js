// ==UserScript==
// @name         AMQ Smart Replay Skip
// @namespace    https://github.com/battleman1/  
// @version      0.0.4
// @description  Auto votes to skip replay phase of an amq song if you hit the song and will not vote to skip otherwise
// @author       battleman
// @match        https://animemusicquiz.com/*
// @downloadURL  https://github.com/battleman1/AMQ-Smart-Replay-Skip/raw/main/AMQSmartReplaySkip.js
// @updateURL    https://github.com/battleman1/AMQ-Smart-Replay-Skip/raw/main/AMQSmartReplaySkip.js
// @grant        none
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// ==/UserScript==

function setup() {
    AMQ_addScriptData({
        name: "AMQ Smart Replay Skip",
        author: "battleman",
        version: GM_info.script.version,
        link: "https://github.com/battleman1/AMQ-Smart-Replay-Skip/raw/main/AMQSmartReplaySkip.js",
        description: `<p>Auto votes to skip replay phase of an amq song if you hit the song and will not vote to skip otherwise</p>`
    });

    let listener = new Listener("answer results");
    listener.callback = (data) => {
        // Determine if player answered correctly
        let isCorrect;
        if (quiz.gameMode === "Nexus") {
        isCorrect = data.players[0]?.correct;
        } 
        else {
            isCorrect = quiz.isSpectator ? false : data.players.find((player) => player.gamePlayerId === quiz.ownGamePlayerId)?.correct;
        }

        // Vote skip if player correctly answered
        if (isCorrect) {
            setTimeout(() => {
                quiz.skipClicked();
            }, 500);
        }
    };
    listener.bindListener();
}

setTimeout(setup, 500);
