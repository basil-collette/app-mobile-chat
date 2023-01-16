const setInputStates = (originalInputs, inputName, value) => {

    if (!Object.keys(originalInputs).includes(inputName)) {
      throw new Error('event is binding on a wrong object property');
    }

    let tempRegisterInputs = {...originalInputs};
    tempRegisterInputs[inputName] = value;

    return tempRegisterInputs;
}

module.exports = {
    setInputStates,
}