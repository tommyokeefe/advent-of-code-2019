const originalInput = [/*input here*/];

let currentIndex = 0;
let finished = false;

const addition = (index, input) => {
    const locOne = input[index+1];
    const locTwo = input[index+2]
    const destination = input[index+3];
    input[destination] = input[locOne] + input[locTwo];
};

const multiplication = (index, input) => {
    const locOne = input[index+1];
    const locTwo = input[index+2]
    const destination = input[index+3];
    input[destination] = input[locOne] * input[locTwo];
};

const intcodeProgram = puzzleInput => {
    const puzzleOutput = [...puzzleInput];
    switch (puzzleOutput[currentIndex]) {
        case 1:
            addition(currentIndex, puzzleOutput);
            break;
        case 2:
            multiplication(currentIndex, puzzleOutput);
            break;
        case 99:
            finished = true;
            break;
        default:
            return;
    }

    currentIndex += 4;

    if (finished) {
        currentIndex = 0;
        finished = false;
        return puzzleOutput;
    }
    return intcodeProgram(puzzleOutput);
};

let noun = 0;
let verb = 0;

while(noun < 100) {
    while (verb < 100) {
        const input = [...originalInput];
        input[1] = noun;
        input[2] = verb;

        const output = intcodeProgram(input);

        if (output[0] == 19690720) {
            console.log((100 * noun) + verb);
            return;
        }

        verb++;
    }
    verb = 0;
    noun++;
}

console.log('no match');
