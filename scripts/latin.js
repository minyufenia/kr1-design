// Меняем ВЕСЬ паспорт (все данные и подписи) на латиницу по клику на кнопку

// Находим все значения в паспорте (каждое лежит в <span>) и заголовок
const values = document.querySelectorAll(".passport span, .passport-title");
// Находим все поля паспорта (<p>): в начале каждого стоит подпись, например «Фамилия»
const fields = document.querySelectorAll(".passport p");
const button = document.getElementById("change");

// Запоминаем исходные (кириллические) тексты, чтобы потом вернуть их
const originalValues = [];
for (let i = 0; i < values.length; i++) {
    originalValues.push(values[i].innerText);
}
const originalLabels = [];
for (let i = 0; i < fields.length; i++) {
    originalLabels.push(fields[i].childNodes[0].textContent);
}

let isLatin = false;  // сейчас на странице кириллица

// Словарь: русская буква -> латинские буквы (как в загранпаспорте)
const letters = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "e",
    "ж": "zh", "з": "z", "и": "i", "й": "i", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
    "ъ": "ie", "ы": "y", "ь": "", "э": "e", "ю": "iu", "я": "ia"
};

// Подписи полей на английском, как в загранпаспорте
const labels = {
    "Паспорт выдан": "Issued by",
    "Дата выдачи": "Date of issue",
    "Код подразделения": "Authority code",
    "Фамилия": "Surname",
    "Имя": "Given name",
    "Отчество": "Patronymic",
    "Пол": "Sex",
    "Дата рождения": "Date of birth",
    "Место рождения": "Place of birth"
};

// Переводит текст в латиницу: идём по буквам и заменяем каждую по словарю
function toLatin(text) {
    let res = "";
    for (let letter of text.toLowerCase()) {
        if (letter in letters) {
            res = res + letters[letter];
        } else {
            res = res + letter;  // цифры, точки, пробелы оставляем как есть
        }
    }
    return res.toUpperCase();
}

// Переводит число в римские (латинские) цифры: 2008 -> MMVIII
function toRoman(number) {
    const nums = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let res = "";
    for (let i = 0; i < nums.length; i++) {
        while (number >= nums[i]) {
            res = res + symbols[i];
            number = number - nums[i];
        }
    }
    return res;
}

function changeAll() {
    if (isLatin === false) {
        // Все значения -> латиница, год рождения -> римские цифры
        for (let i = 0; i < values.length; i++) {
            if (values[i].id === "year") {
                values[i].innerText = toRoman(parseInt(originalValues[i]));
            } else {
                values[i].innerText = toLatin(originalValues[i]);
            }
        }
        // Все подписи -> английский
        for (let i = 0; i < fields.length; i++) {
            fields[i].childNodes[0].textContent = labels[originalLabels[i]];
        }
        button.innerText = "Вернуть кириллицу";
        isLatin = true;
    } else {
        // Возвращаем всё, что запомнили в начале
        for (let i = 0; i < values.length; i++) {
            values[i].innerText = originalValues[i];
        }
        for (let i = 0; i < fields.length; i++) {
            fields[i].childNodes[0].textContent = originalLabels[i];
        }
        button.innerText = "Перевести на латиницу";
        isLatin = false;
    }
}

// Событие: клик по кнопке запускает функцию changeAll
button.addEventListener("click", changeAll);
