const randomInt = (min, max) => {
    return Math.floor(
        Math.random() * ((max + 1) - min) + min
    )
}

const differentInt = (number, mbmax) => {
    let newnumber;

    do {
        newnumber = randomInt(1, mbmax);
    } while (number === newnumber)

    return newnumber;
}

module.exports = {
    randomInt,
    differentInt
};