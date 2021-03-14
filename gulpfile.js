const { src, dest, series } = require("gulp");
const gh_pages = require("gulp-gh-pages");

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

// Завантаження зібраного проекту на сервер
function deploy() {
    return src('build/**/*') // Беремо усі файли із папки build/
          .pipe(gh_pages()); // Заливаємо їх на віддалений сервер 
}

// Збирання проекту
exports.build = series(html, img);

// Відправка проекту на github
exports.deploy = series(html, img, deploy);


