const START = /* input here */1;
const END = /* input here */1;

const isSixDigits = password => (password.toString().length === 6);

const twoAdjacentDigitsAreTheSame = password => {
    const passwordArray = password.toString().split('').map(Number);
    return passwordArray.reduce((isMatch, digit, index, array) => {
        if (index === 0) return isMatch;
        if (digit === array[index -1]) return true;
        return isMatch;
    }, false);
};

const digitsIncreaseFromLeftToRight = password => {
    const passwordArray = password.toString().split('').map(Number);
    let isValid = true
    return passwordArray.reduce((isMatch, digit, index, array) => {
        if (index === 0) return isMatch;
        if (digit < array[index -1]) isValid = false;
        return isValid;
    }, true);
};

const aTruePairExists = password => {
    const passwordArray = password.toString().split('').map(Number);
    let trueMatch = false;
    passwordArray.forEach((digit, index, array) => {
        let count = 1;
        if (index == 0) return;
        if (digit === array[index - 1]) count++;
        if (digit === array[index + 1]) count++;
        if (index > 1 && digit === array[index - 1] && digit === array[index - 2]) count++;
        if (index < 5 && digit === array[index + 1] && digit === array[index + 2]) count++;
        if (count === 2) trueMatch = true;
    });
    return trueMatch;
}

let input = [];
for (var i = START; i <= END; i++) {
    input.push(i);
}

const possiblePasswords = input.filter(isSixDigits)
    .filter(twoAdjacentDigitsAreTheSame)
    .filter(digitsIncreaseFromLeftToRight)
    .filter(aTruePairExists);

console.log(`Total number of possible passwords: ${possiblePasswords.length}`);