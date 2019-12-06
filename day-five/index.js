const originalInput = [/* your data here */];
const inputNumber = undefined; // input to run the program

let didJump = false;
let currentIndex = 0;
let currentOperationSize = 4;
let finished = false;
let output = null;

const getOpCodeAndParamaterModes = (opcode) => {
    if (parseInt(opcode).length === 1) {
        return { code: opcode, mode1: 0, mode2: 0, mode3: 0 };
    }
    const opcodeString = opcode.toString();
    const code = parseInt(opcodeString.slice(-2))
    const params = opcodeString.slice(0, -2).split('');
    const mode1 = params.length === 0 ? 0 : parseInt(params.pop());
    const mode2 = params.length === 0 ? 0 : parseInt(params.pop());
    const mode3 = params.length === 0 ? 0 : parseInt(params.pop());

    return { code, mode1, mode2, mode3 };
};

const getParams = (opCode, input, index) => {
    return {
        param1: opCode.mode1 === 0 ? input[index+1] : index+1,
        param2: opCode.mode2 === 0 ? input[index+2] : index+2,
        param3: opCode.mode3 === 0 ? input[index+3] : index+3,
    };
};

const addition = (index, input, opCode) => {
    const { param1, param2, param3 } = getParams(opCode, input, index);
    input[param3] = input[param1] + input[param2];
};

const multiplication = (index, input, opCode) => {
    const { param1, param2, param3 } = getParams(opCode, input, index);
    input[param3] = input[param2] * input[param1];
};

const handleInput = (index, input, opCode) => {
    const { param1 } = getParams(opCode, input, index);
    input[param1] = inputNumber;
};

const handleOutput = (index, input, opCode) => {
    const { param1 } = getParams(opCode, input, index);
    const value = input[param1]
    return value;
}

const jumpIfTrue = (index, input, opCode) => {
    const { param1, param2 } = getParams(opCode, input, index);
    const shouldJump = input[param1];
    const jumpTo = input[param2];
    if (shouldJump !== 0) {
        currentIndex = jumpTo;
        return true;
    }
    return false;
};

const jumpIfFalse = (index, input, opCode) => {
    const { param1, param2 } = getParams(opCode, input, index);
    const shouldJump = input[param1];
    const jumpTo = input[param2];
    if (shouldJump === 0) {
        currentIndex = jumpTo;
        return true;
    }
    return false;
};

const lessThan = (index, input, opCode) => {
    const { param1, param2, param3 } = getParams(opCode, input, index);
    input[param3] = input[param1] < input[param2] ? 1 : 0;
}

const equalTo = (index, input, opCode) => {
    const { param1, param2, param3 } = getParams(opCode, input, index);
    input[param3] = input[param1] === input[param2] ? 1 : 0;
}

const intcodeProgram = puzzleInput => {
    const puzzleOutput = [...puzzleInput];
    const opCode = getOpCodeAndParamaterModes(puzzleOutput[currentIndex]);
    switch (opCode.code) {
        case 1:
            addition(currentIndex, puzzleOutput, opCode);
            currentOperationSize = 4;
            break;
        case 2:
            multiplication(currentIndex, puzzleOutput, opCode);
            currentOperationSize = 4;
            break;
        case 3:
            handleInput(currentIndex, puzzleOutput, opCode);
            currentOperationSize = 2;
            break;
        case 4:
            output = handleOutput(currentIndex, puzzleOutput, opCode);
            currentOperationSize = 2;
            break;
        case 5:
            didJump = jumpIfTrue(currentIndex, puzzleOutput, opCode);
            currentOperationSize = didJump ? 0 : 3;
            break;
        case 6:
            didJump = jumpIfFalse(currentIndex, puzzleOutput, opCode);
            currentOperationSize = didJump ? 0 : 3;
            break;
        case 7:
            lessThan(currentIndex, puzzleOutput, opCode);
            currentOperationSize = 4;
            break;
        case 8:
            equalTo(currentIndex, puzzleOutput, opCode);
            currentOperationSize = 4;
            break;
        case 99:
            finished = true;
            break;
        default:
            console.log(`got op code: ${opCode.code}`);
            return;
    }
    currentIndex += currentOperationSize;

    if (finished) {
        currentIndex = 0;
        finished = false;
        return output;
    }
    return intcodeProgram(puzzleOutput);
};

console.log(intcodeProgram(originalInput));
