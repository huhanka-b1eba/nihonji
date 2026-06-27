# Nihonji

**Nihonji** — это веб-приложение для поиска и просмотра аниме.

Проект сделан на **React + TypeScript** и использует открытое API **[Jikan](https://jikan.moe/)**.
В приложении можно смотреть популярные тайтлы, искать аниме, открывать подробную информацию и сохранять интересные тайтлы в избранное.

---

## Скриншоты

### Главная страница

На главной странице отображаются популярные аниме и основные разделы приложения.

![Главная страница](./docs/images/home.png)

### Каталог / поиск

В каталоге можно искать аниме по названию, фильтровать, сортировать список и открывать нужный тайтл.

![Каталог](./docs/images/catalog.png)

### Страница аниме

На странице тайтла показана подробная информация: описание, рейтинг, трейлер, студии, персонажи и рекомендации.

![Страница аниме](./docs/images/anime-page.png)

---

## Что умеет приложение

### Просмотр аниме

В приложении можно:

* смотреть список популярных аниме;
* искать аниме по названию;
* открывать страницу конкретного тайтла;
* смотреть описание, рейтинг, трейлер, студии и другую информацию;
* получать рекомендации и похожие тайтлы.

### Пользовательские функции

Также реализованы:

* добавление аниме в избранное;
* история просмотренных тайтлов;
* лайки;
* сохранение данных в `localStorage`;
* восстановление позиции скролла при возврате назад.

### Интерфейс

В интерфейсе есть:

* светлая и тёмная тема;
* адаптивная вёрстка для разных экранов;
* анимации;
* skeleton-загрузки;
* обработка ошибок;
* пагинация и бесконечная подгрузка.

---

## Архитектура проекта

Проект построен по подходу **Feature-Sliced Design**.

Структура выглядит так:

```text
src/
  app/          настройки приложения, роутинг, провайдеры
  pages/        страницы
  widgets/      крупные блоки интерфейса
  features/     пользовательские действия
  entities/     основные сущности: Anime, Character, Studio
  shared/       общие компоненты, API, утилиты и типы
```

Такой подход помогает держать проект понятным:
страницы лежат отдельно, бизнес-логика отдельно, общие компоненты отдельно.

---

## Технологии

В проекте используются современные инструменты для frontend-разработки:

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=20232A" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" />
</p>

### Состояние и работа с API

<p>
  <img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/RTK_Query-8A2BE2?style=for-the-badge&logo=redux&logoColor=white" />
  <img src="https://img.shields.io/badge/Jikan_API-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white" />
</p>

### Стили и интерфейс

<p>
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS_Modules-2965F1?style=for-the-badge&logo=cssmodules&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-FF4ECD?style=for-the-badge&logo=framer&logoColor=white" />
</p>

### Качество кода

<p>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=20232A" />
  <img src="https://img.shields.io/badge/Stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white" />
</p>

### Тестирование

<p>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white" />
</p>

### Дополнительно

<p>
  <img src="https://img.shields.io/badge/i18next-26A69A?style=for-the-badge&logo=i18next&logoColor=white" />
  <img src="https://img.shields.io/badge/localStorage-FFA500?style=for-the-badge&logo=googlechrome&logoColor=white" />
</p>

---

## API

Для получения данных используется открытое API **Jikan**.

Через API загружаются:

* списки аниме;
* подробная информация о тайтлах;
* персонажи;
* студии;
* рекомендации;
* трейлеры.

Запросы реализованы через **RTK Query**, поэтому данные кешируются и не загружаются лишний раз.

---

## Как запустить проект

Сначала установите зависимости:

```bash
npm install
```

Запуск проекта в режиме разработки:

```bash
npm run dev
```

Сборка проекта:

```bash
npm run build
```

Проверка кода:

```bash
npm run lint
```

Запуск тестов:

```bash
npm run test
```

---

## Что было важно в разработке

При разработке я уделял внимание:

* понятной структуре проекта по Feature-Sliced Design;
* переиспользуемым UI-компонентам;
* удобной работе с API через RTK Query;
* обработке состояний загрузки, ошибок и пустых данных;
* адаптивной вёрстке;
* сохранению пользовательских данных в localStorage;
* чистому и поддерживаемому коду.
