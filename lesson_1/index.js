const errorMessage = 'Некорректный ввод!';
const MIN_NUMBER_BASE = 2;
const MAX_NUMBER_BASE = 36;
const isNumber = value => !isNaN(value) && value !== '' && value !== null;
const calcToNumberSystem = (number, base) => parseInt(number, 10).toString(base);

function printToNumberSystem() {
    const firstValue = prompt('Введите число', '');
    const radix = prompt('Введите второе число(система счисления)', '');

    if (radix < MIN_NUMBER_BASE || radix > MAX_NUMBER_BASE) {
        console.log(`${errorMessage} Второе число должно быть от 2 до 36.
        Это число определяющее основание системы счисления.
        В системе счисления с основанием 2 числа записываются с помощью двух символов 0 и 1.
        В позиционной системе счисления с основанием 36 для записи любого числа используются цифры 0–9 и буквы латинского алфавита A–Z`);
        return;
    }

    if (isNumber(firstValue) && isNumber(radix)) {
        console.log(calcToNumberSystem(firstValue, radix));
        return;
    }

    console.log(errorMessage);
}

function printSumAndDivision() {
    const firstNum = prompt('Введите первое число', '');

    if (!isNumber(firstNum)) {
        console.log(errorMessage);
        return;
    }

    const secondNum = prompt('Введите первое число', '');

    if (!isNumber(secondNum)) {
        console.log(errorMessage);
        return;
    }

    console.log(`Ответ: ${Number(firstNum) + Number(secondNum)}, ${Math.round(firstNum / secondNum)}`);
}

printToNumberSystem();
printSumAndDivision();
