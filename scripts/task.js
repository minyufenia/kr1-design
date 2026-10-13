// Задача 1012.
// Даны вещественные числа A, B, C. Определить, выполняются ли неравенства
// A < B < C или A < B > C и какое именно неравенство выполняется.

let result;          // текст результата
let check = false;   // true — задача решена и данные можно отправлять

// Находим элементы страницы по их id
const elementA = document.getElementById("a");
const elementB = document.getElementById("b");
const elementC = document.getElementById("c");
const elementResult = document.getElementById("result");

function verify() {
    // Числа вещественные, поэтому parseFloat (parseInt отбросил бы дробную часть)
    let a = parseFloat(elementA.value);
    let b = parseFloat(elementB.value);
    let c = parseFloat(elementC.value);
    console.log("a, b, c:", a, b, c);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        // Какое-то поле пустое или в нём не число
        result = "Ошибка: введите все три числа";
        check = false;
    } else if (a < b && b < c) {
        result = "Выполняется A < B < C";
        check = true;
    } else if (a < b && b > c) {
        result = "Выполняется A < B > C";
        check = true;
    } else {
        result = "Ни одно из неравенств не выполняется";
        check = true;
    }

    elementResult.value = result;
}

function send() {
    if (check) {
        // Отправляем форму: формулировку, A, B, C и результат — на сервер
        document.getElementById("UserEnter").submit();
    } else {
        alert("Сначала введите числа и нажмите «Проверить»");
    }
}

// Если числа поменяли после проверки — старый результат уже неверный
function resetResult() {
    check = false;
    elementResult.value = "не определен";
}

// Подписываемся на события
document.getElementById("verify").addEventListener("click", verify);
document.getElementById("send").addEventListener("click", send);
elementA.addEventListener("input", resetResult);
elementB.addEventListener("input", resetResult);
elementC.addEventListener("input", resetResult);
