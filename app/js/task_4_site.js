// Необхідні змінні
let index = 0;
let paintings_list;

// Обробка бокового меню
function click_on_menu (object) {

   // Видаляємо клас "active" з усіх елементів меню
   $("li.nav-item").removeClass("active");

   // Отримуємо елемент, на який натиснули
   let item = $(object);

   // Задаємо активному елементу клас "active"
   item.addClass("active");

   // Отримуємо id активного елемента
   let id = item.attr('id');

   // Виконуємо необхідну дію
   switch (id) {

      // Перехід на головну сторінку
      case "menu_home": 
         setTimeout(() => {
            document.location.href = "../index.html";
         }, 500);
      break;

      // Відобразити список картин
      case "menu_painting":
         $("#div_task").attr("hidden", "");
         $("#div_galery").removeAttr("hidden");   
      break;

      // Відобразити завдання
      case "menu_task":
         $("#div_task").removeAttr("hidden");
         $("#div_galery").attr("hidden", "");   
      break;

      // Відобразити випадкову картину
      case "menu_random": console.log("Random"); break;
   }
}

// Обробка вибору картини
function click_on_painting (object) {

   console.log(`${$(object).attr("data")}`);

}

// Підвантаження нових даних
function load_more_paintings (count) {

   let id = 0;
   while (id < count) {

      if (index >= paintings_list.length) { disable_load_button();
                                            return; }

      $.get(`../data/text/${paintings_list[index]}.txt`, (data) => {

         let item_data = data.split("\n");

         let block =
            `<div class="col-md-6 col-lg-4">
               <div class="p-2 painting" onclick="click_on_painting(this)" data="${item_data[2]}">
                  <img src="../data/img/${item_data[2]}.jpg" class="w-100" alt="painting">
                  <div class="bg-primary text-center">${item_data[0]}</div>
               </div>
            </div>`;
   
         $("#paintings").append(block);
         
      });

      id++;
      index++;
   }
}

// Вимкнення кнопки "показати більше картин"
function disable_load_button() {
   $("#load").addClass("disabled");
}

// Завантаження початкових даних
$(document).ready(() => {    
   setTimeout(() => {
      $.get("../data/data.txt", (data) => {
         paintings_list = data.split("\n");
         paintings_list.splice(paintings_list.length - 1, 1);
         load_more_paintings(6);
      });
   }, 300);
});