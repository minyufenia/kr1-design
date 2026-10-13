// Меняем фамилию, имя и год рождения в паспорте на латиницу по клику на кнопку

// Находим нужные элементы по id
const surname = document.getElementById("surname");
const firstName = document.getElementById("name");
const year = document.getElementById("year");
const button = document.getElementById("change");

// Запоминаем исходные (кириллические) значения, чтобы потом вернуть их
const originalSurname = surname.innerText;
const originalName = firstName.innerText;
const originalYear = year.innerText;

let isLatin = false;  // сейчас на странице кириллица

// Словарь: русская буква -> латинские буквы (как в загранпаспорте)
const letters = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e",
    "ж": "zh", "з": "z", "и": "i", "й": "i", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
    "ъ": "ie", "ы": "y", "ь": "", "э": "e", "ю": "iu", "я": "ia"
};

// Переводит слово в латиницу: идём по буквам и заменяем каждую по словарю
function toLatin(text) {
    let res = "";
    for (let letter of text.toLowerCase()) {
        if (letter in letters) {
            res = res + letters[letter];
        } else {
            res = res + letter;  // не русская буква — оставляем как есть
        }
    }
    return res.toUpperCase();
}

// Переводит число в римские (латинские) цифры: 2008 -> MMVIII
function toRoman(number) {
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let res = "";
    for (let i = 0; i < values.length; i++) {
        while (number >= values[i]) {
            res = res + symbols[i];
            number = number - values[i];
        }
    }
    return res;
}

function changeAll() {
    if (isLatin === false) {
        surname.innerText = toLatin(originalSurname);            // KUKSA
        firstName.innerText = toLatin(originalName);                  // POLINA
        year.innerText = toRoman(parseInt(originalYear));        // MMVIII
        button.innerText = "Вернуть кириллицу";
        isLatin = true;
    } else {
        surname.innerText = originalSurname;
        firstName.innerText = originalName;
        year.innerText = originalYear;
        button.innerText = "Перевести на латиницу";
        isLatin = false;
    }
}

// Событие: клик по кнопке запускает функцию changeAll
button.addEventListener("click", changeAll);
