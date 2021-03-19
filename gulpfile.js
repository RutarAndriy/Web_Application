// Підключаємо gulp
const { src, dest, series } = require("gulp");
// Підключаємо gh-pages - публікація сайту на github
const gh_pages = require("gh-pages");

// Обробляємо html файли
function html() {
    return src("app/**/*.html")  // Беремо файли з розширенням html із папки app/ та усіх підпапок
          .pipe(dest("build/")); // Переміщуємо у папку build/
}

// Обробляємо файли зображень
function img() {
    return src("app/img/*.{png,jpg,jpeg,gif}", // Беремо файли з розширеннями png, jpg, jpeg, gif
               { base: "app" })                // Задаємо параметр base, щоб зберегти вложеність файлів
          .pipe(dest("build/"));               // Переміщуємо у папку build/
}

// Публікуємо зібраний сайт на github
function deploy() {
return gh_pages.publish("build",                                  // Папка, вміст якої заливається на github
                       { message: "Auto-generated commit" },      // Текст коміту
                       (err) => {                                 // Виведення в консоль можливих помилок
                          if (err) { console.log(`Error: ${err}`); }
                       });

}

// Збирання проекту
exports.build = series(html, img);

// Публікація проекту на github
exports.deploy = deploy;

// Збирання проекту та публікація його на github
exports.build_and_deploy = series(html, img, deploy);

