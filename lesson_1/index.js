const checkToNumber = value => isFinite(value) && value !== '' && value !== null;
const calcToNumberSystem = (number, base) => parseInt(number, 10).toString(base);

const firstValue = prompt('Введите число', '');
const radix = prompt('Введите второе число(система счисления)', '');

if (checkToNumber(firstValue) && checkToNumber(radix) && radix >=2 && radix <= 36) {
    console.log(calcToNumberSystem(firstValue, radix));
} else {
    console.log('Некорректный ввод!');
}

// 2
const firstNum = prompt('Введите первое число', '');

if (checkToNumber(firstNum)) {
    const secondNum = prompt('Введите второе число', '');
    if (checkToNumber(secondNum)) {
        console.log(`Ответ: ${+firstNum + Number(secondNum)}, ${Math.round(firstNum / secondNum)}`);
    } else {
        console.log('Некорректный ввод!');
    }
} else {
    console.log('Некорректный ввод!');
}
