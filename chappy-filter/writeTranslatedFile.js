const fs = require('fs');

const insults = fs.readFileSync('./insultes.txt').toString().split("\r\n");

/* INSULT REMOVER FROM DICTIONNARY AND REMOV TWINS _________________________________________________________________________________________________ */

function removeItemOnceSearching(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
}

function removeInsult() {
    console.log('removing insult from dictionnary...');

    const words = fs.readFileSync('./liste_francais.txt').toString().split("\r\n");
    let wordsPurged = [...words];

    for(let i = 0; i < words.length; i++) {
        for(let j = 0; j < insults.length; j++) {
            if (words[i] == insults[j]) {
                wordsPurged = removeItemOnceSearching(wordsPurged, words[i]);
                console.log(words[i] + " is removed.");
            }
        }
    }

    fs.writeFileSync('./liste_francais.txt', wordsPurged.join('\r\n'), (err) => {
        if (err) throw err;
    })
    
    console.log('purging insult finished!');
}

/* ALGORYTMS _______________________________________________________________________________________________________________________________________ */

function getScore(testedWord, referenceWord) {
    let sameLetterCount = 0;

    if (testedWord.length > referenceWord.length) {
        for(let i = 0; i < referenceWord.length; i++) {
            if (testedWord[i] == referenceWord[i]) {
                sameLetterCount++;
            }
        }
        return 100 * sameLetterCount / testedWord.length;

    } else {
        for(let i = 0; i < testedWord.length; i++) {
            if (testedWord[i] == referenceWord[i]) {
                sameLetterCount++;
            }
        }
        return 100 * sameLetterCount / referenceWord.length;
    }
}

//Not working
function getLevenshteinScore(str1, str2) {
    const track = Array(str2.length + 1).fill(null).map(() => 
        Array(str1.length + 1).fill(null));

        for (let i = 0; i <= str1.length; i += 1) {
            track[0][i] = i;
        }

        for (let j = 0; j <= str2.length; j += 1) {
            track[j][0] = j;
        }

        for (let j = 1; j <= str2.length; j += 1) {
            for (let i = 1; i <= str1.length; i += 1) {
                const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1, // deletion
                    track[j - 1][i] + 1, // insertion
                    track[j - 1][i - 1] + indicator, // substitution
                );
            }
        }

        return track[str2.length][str1.length];
}

/* WRITE CSV OF INSULT/TRANSLATE ________________________________________________________________________________________________________________ */

function getResult(testedWord) {
    const words = fs.readFileSync('liste_francais.txt').toString().split("\r\n");

    let result = {
        score: 0,
        value: ""
    };

    for(let i = 0; i < words.length; i++) {
        const currentScore = getScore(words[i], testedWord);
        //const currentScore = getLevenshteinScore(words[i], testedWord);
    
        if (currentScore > result.score) {
            result = {
                score: currentScore,
                value: words[i]
            }
        }
    }

    return result.value;
}

function writeTranslate() {
    console.log('running translatation on csv...');

    let processPercentage = 0;

    try {
        fs.unlinkSync('./translate.csv');
    } catch (error) {
        console.log(error);
    }

    for(let i = 0; i < insults.length; i++) {
        const result = getResult(insults[i]);

        const line = (i+1) + "," + insults[i] + "," + result + "\r\n";

        fs.appendFileSync('./translate.csv', line, (err) => {
            if (err) throw err;
        })
        
        let newPercent = Math.round(100 * i / insults.length);
        if (newPercent > processPercentage) {
            processPercentage = newPercent;
            console.log(processPercentage + '%');
        }
    }
    
    console.log('program finished !');
}

/* APP INIT __________________________________________________________________________________________________________________________________ */

function run() {
    removeInsult();

    writeTranslate();
}

run();