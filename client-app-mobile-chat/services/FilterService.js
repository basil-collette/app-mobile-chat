import { Text } from "react-native";

const getWordRegex = (value) => {
    const stringRegex = `(?<=[^a-zA-Z]|^)${value}(?=[^a-zA-Z]|$)`;
    return new RegExp(stringRegex);
}

const getRandomColor = () => {
    //
}

const getColor = () => {
    //return getRandomColor();
    return '#f74a62';
}

const getFilteredMessage = (text, translations) => {
    let resultArray = [text];

    for (let i = 0; i < translations.length; i++) {
        const insult = translations[i].insult;

        for (let j = 0; j < resultArray.length; j++) {

            if (typeof resultArray[j] != 'string') {
                continues;
            }

            let match = getWordRegex(insult).exec(resultArray[j]);
            if (!match) {
                continues;
            }

            let newElement = [];

            if (match.index > 0)
                newElement.push(resultArray[j].slice(0, match.index));

            newElement.push(
                <Text key={i + '-' + j + match[0]} style={{backgroundColor: getColor()}}>
                    {translations[i].translate}
                </Text>
            );

            let temp = resultArray[j].slice(match.index + match[0].length);
            if (temp.length > 0)
                newElement.push(temp);
            
            resultArray =
                resultArray.slice(0, j) //part before the matching element
                .concat(newElement) //match transformed into <Text>
                .concat(resultArray.slice(j + 1)); //part after the matching element
        }
    }   
    
    return resultArray;
}

module.exports = {
    getFilteredMessage
}