/**
 * Module to get Regex and to Test regex on value
 */

//EMAIL _________________________________________________________________________ EMAIL

const getEmailRegex = () => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
}

const testEmailRegex = (value) => {
    return getEmailRegex().test(value);
}

//PASSWORD ______________________________________________________________________ PASSWORD

const getPasswordRegex = () => {
    return /.{6,}/g;
}

const testPasswordRegex = (value) => {
    return getPasswordRegex().test(value);
}

//NAME _________________________________________________________________________ NAME

const getNameRegex = () => {
    return /[^0-9.]{2,}/g;
}

const testNameRegex = (value) => {
    return getNameRegex().test(value);
}

module.exports = {
    getEmailRegex,
    testEmailRegex,
    getPasswordRegex,
    testPasswordRegex,
    getNameRegex,
    testNameRegex,
}