Практична робота 2
https://aylok2018.github.io/typescript-project/ - посилання на сайт
<img width="1918" height="1079" alt="image" src="https://github.com/user-attachments/assets/b87347fe-740a-469c-bdbf-254d4979d60f" />
Інтерактивність сайту:

Модальне вікно: кнопка відкриває модаль; хрестик закриває його. Реалізація у src/main.ts функціями openModal() / closeModal().

Event listeners: click на кнопках (модальні, "Деталі" постів) та scroll (додає клас shrink шапці).

Анімації: появі постів додається клас .visible (opacity/translate).

Fetch даних: отримання постів з https://jsonplaceholder.typicode.com/posts з пагінацією; при кліку "Деталі" підвантажується конкретний пост по ID.

TypeScript: весь код у src/main.ts з типами (Post, number, HTMLElement), компілюється в docs/js/main.js, підключений у index.html.
