# Финес Студио: общий бриф для всех исполнителей

Клиент: «Финес Студио», студия из двух разработчиков: Telegram-боты, CRM, веб-сервисы, AI-автоматизация для бизнеса. Telegram: https://t.me/fines_studio (@fines_studio).
Реальные тексты сайта: `C:/Users/maya/fines-brand/_brief/content.json` (hero, statement, services с ценами, compare, guarantees, process, faq, contact, footer). Тексты бери ОТТУДА, не выдумывай новые цифры, клиентов, отзывы, лицензии и награды. Можно переформулировать и сокращать.
Старый сайт для справки: `_brief/old_index.html`, `old_site.css`, `old_site.js`.

## Главный логотип №67 (использовать на всех сайтах)
Тёмная плашка #14161c. Слово «финес» шрифтом Onest 800, 60px, letter-spacing -.06em, цвет #f4f1ea. Сразу после «с» стоит круглая точка 0.2em цвета #f2501c, она мягко светится:
```css
@keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(242,80,28,0)}50%{box-shadow:0 0 16px 5px rgba(242,80,28,.8)}}
.dot{display:inline-block;width:.2em;height:.2em;border-radius:50%;margin-left:.04em;background:#f2501c;animation:glow 2s ease-in-out infinite}
```
Под словом подпись «студио»: Onest 600, 18px, letter-spacing .1em, без капса, цвет #f2501c.
На светлом фоне слово «финес» пиши цветом #1c1b19, точка остаётся оранжевой. Фирменные цвета: оранжевый #f2501c, графит #14161c, молочный #f4f1ea / #fbfaf7, чернила #1c1b19.

## Шрифты: только легальные (жёсткое правило)
- Только шрифты под открытой лицензией (SIL OFL): Onest (основной), Manrope, Unbounded, Inter, Geologica, Golos Text, Cormorant Garamond, Playfair Display, JetBrains Mono, Fraunces.
- Каждый сайт подключает шрифты СВОИМИ файлами woff2 из своей папки (self-host), Google Fonts не подключаем (152-ФЗ, плюс работает без внешних запросов). Onest уже скачан: `_brief/onest-{cyrillic,latin}-{400,500,600,700,800}.woff2`, копируй в свою папку `assets/`. Другие OFL-шрифты качай так: `curl -o f.woff2 https://cdn.jsdelivr.net/fontsource/fonts/<id>@latest/<subset>-<weight>-normal.woff2` (id например manrope, unbounded, cormorant-garamond, playfair-display, golos-text, geologica, inter, fraunces, jetbrains-mono; subset cyrillic и latin). Проверь, что сервер ответил 200 и файл больше 1 КБ.
- ЗАПРЕЩЕНЫ фирменные шрифты банков (Styrene, Alfa Sans, TT Commons, Graphik, SF Pro, Circe, Gilroy, Museo, Helvetica Neue и любые платные). Копируем только подход к раскладке, НЕ фирменные ассеты: никаких логотипов, иллюстраций и картинок Альфа-Банка или Рокетбанка, никаких их названий в тексте.
- В подвале каждого сайта мелко укажи «Шрифты: <названия> — SIL Open Font License».

## Требования к «полноценно рабочему» сайту
- Один `index.html` и папка `assets/` (css/js/шрифты), только относительные пути: сайт хостится на GitHub Pages в подпапке.
- Работает всё: адаптив (360/768/1280+), бургер-меню на мобиле, якорная навигация, FAQ-аккордеон, переключатели и табы (если они есть), кнопки «Написать» ведут на https://t.me/fines_studio, форма заявки собирает текст и открывает t.me ссылкой (`https://t.me/fines_studio?text=...`) — без бэкенда и без сбора персональных данных. Калькулятор стоимости приветствуется: базовые цены бери из content.json.
- Без внешних CDN и без трекеров. Есть `prefers-reduced-motion`. На тёмном фоне контраст текста должен быть читаемым.
- Обязательная самопроверка в headless Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe --headless=new --screenshot=out.png --window-size=1440,4000 file:///...` и ширина 390 для мобилы). Скриншоты смотри через vision_analyze. Проверь: текст не налезает, нет горизонтального скролла, нет ошибок в консоли, шрифты реально загрузились (не fallback). Найденное исправь и проверь заново.
- Качество уровня реальной продакшн-студии, а не шаблона. Без лорем-ипсума.
- Git не трогай: не коммить и не пушь, это сделает родитель.
