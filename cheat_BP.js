const wordScript = document.createElement('script');
wordScript.src = 'https://portfoliogeorgesc.000webhostapp.com/table_mots_bombparty.js';
document.body.appendChild(wordScript);

const accentsMap = new Map([
    ["A", "Á|À|Ã|Â|Ä"],
    ["a", "á|à|ã|â|ä"],
    ["E", "É|È|Ê|Ë"],
    ["e", "é|è|ê|ë"],
    ["I", "Í|Ì|Î|Ï"],
    ["i", "í|ì|î|ï"],
    ["O", "Ó|Ò|Ô|Õ|Ö"],
    ["o", "ó|ò|ô|õ|ö"],
    ["U", "Ú|Ù|Û|Ü"],
    ["u", "ú|ù|û|ü"],
    ["C", "Ç"],
    ["c", "ç"],
    ["N", "Ñ"],
    ["n", "ñ"],
]);
const reducer = (acc, [key]) =>
    acc.replace(new RegExp(accentsMap.get(key), "g"), key);
const removeAccents = (text) => [...accentsMap].reduce(reducer, text);

const cleanWordList = [...new Set(wordList)]; //enleve les doublons
console.log('cleanWordList instantié!')
let wordListUtil = cleanWordList;
let usedWord = [];

function intCheat() {

    setInterval(() => {

        const join = document.getElementsByClassName('joinRound')[0];
        if (join.offsetHeight > 0 && join.offsetWidth) {
            if (autoResetCB.checked) {
                wordListUtil = cleanWordList;
                usedWord = [];
            }
            if (autoJoinCB.checked) join.click();
        }

        if ($(".bottom .round .otherTurn .player").textContent.toUpperCase() != pseudotext.value.toUpperCase()) return;

        if (!noMoveCB.checked) {

            const syl = $(".middle .round .syllable").textContent.toUpperCase();

            let indexEl = -1;
            const word = wordListUtil.find(element => {
                if (removeAccents(element).toUpperCase().includes(syl.toUpperCase())) {
                    indexEl = wordListUtil.indexOf(element);
                    return true;
                }
            });
            if (indexEl > -1) {
                wordListUtil.splice(indexEl, 1);
            }

            if (word !== undefined) {
                const wordPush = removeAccents(word).toUpperCase();
                usedWord.push(wordPush);
                socket.emit("setWord", wordPush, true);
            } else {
                console.log("No more words with " + syl)
            }
        }

    }, 300);
}

const maDiv = document.createElement('div');
maDiv.setAttribute('id', 'maDiv');

const pseudotext = document.createElement('input');
pseudotext.setAttribute('id', 'pseudotext');
pseudotext.setAttribute('type', 'text');
pseudotext.setAttribute('placeholder', 'User name');
maDiv.appendChild(pseudotext);

const buttonExec = document.createElement('button');
buttonExec.innerHTML = 'inject';
buttonExec.setAttribute('id', 'inject');
buttonExec.addEventListener('click', () => {

    pseudotext.setAttribute('disabled', '');
    buttonExec.setAttribute('disabled', '');

    autoJoinCB.checked = true;
    autoResetCB.checked = true;

    intCheat();

});
maDiv.appendChild(buttonExec);

const br1 = document.createElement("br");
maDiv.appendChild(br1);

const btnReset = document.createElement('button');
btnReset.innerHTML = 'Reset used word list';
btnReset.setAttribute('id', 'resetList');
btnReset.addEventListener('click', () => {
    wordListUtil = cleanWordList;
    usedWord = [];
});
maDiv.appendChild(btnReset);

const br2 = document.createElement("br");
maDiv.appendChild(br2);

const noMoveCB = document.createElement("INPUT");
noMoveCB.setAttribute("type", "checkbox");
maDiv.appendChild(noMoveCB);

const noMoveLabel = document.createElement("label");
noMoveLabel.innerHTML = 'Do nothing';
maDiv.appendChild(noMoveLabel);

const br3 = document.createElement("br");
maDiv.appendChild(br3);

const autoJoinCB = document.createElement("INPUT");
autoJoinCB.setAttribute("type", "checkbox");
maDiv.appendChild(autoJoinCB);

const autoJoinLabel = document.createElement("label");
autoJoinLabel.innerHTML = 'Auto join';
maDiv.appendChild(autoJoinLabel);

const br4 = document.createElement("br");
maDiv.appendChild(br4);

const autoResetCB = document.createElement("INPUT");
autoResetCB.setAttribute("type", "checkbox");
maDiv.appendChild(autoResetCB);

const autoResetLabel = document.createElement("label");
autoResetLabel.innerHTML = 'Auto reset used word list';
maDiv.appendChild(autoResetLabel);

const br5 = document.createElement("br");
maDiv.appendChild(br5);

document.body.appendChild(maDiv);