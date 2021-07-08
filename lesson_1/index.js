const errorMessage = 'Некорректный ввод!';
const isNumber = value => isFinite(value) && value !== '' && value !== null;
const calcToNumberSystem = (number, base) => parseInt(number, 10).toString(base);

function printToNumberSystem() {
    const MIN_NUMBER_BASE = 2;
    const MAX_NUMBER_BASE = 36;
    const firstValue = prompt('Введите число', '');
    const radix = prompt('Введите второе число(система счисления)', '');

    if (isNumber(firstValue) && isNumber(radix) && radix >= MIN_NUMBER_BASE && radix <= MAX_NUMBER_BASE) {
        console.log(calcToNumberSystem(firstValue, radix));
        return;
    }
    console.log(errorMessage);
}

function printSumAndDivision() {
    const firstNum = prompt('Введите первое число', '');

    if (isNumber(firstNum)) {
        const secondNum = prompt('Введите второе число', '');
        if (isNumber(secondNum)) {
            console.log(`Ответ: ${Number(firstNum) + Number(secondNum)}, ${Math.round(firstNum / secondNum)}`);
        } else {
            console.log(errorMessage);
        }
    } else {
        console.log(errorMessage);
    }
}

printToNumberSystem();
printSumAndDivision();

