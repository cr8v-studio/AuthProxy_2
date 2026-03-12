# AuthProxy Landing

Статический лендинг (HTML/CSS/JS), готовый к публикации на GitHub Pages.

## Структура

- `index.html` — основная страница
- `css/styles.css` — стили
- `js/main.js` — минимальная интерактивность (меню/FAQ)
- `components/` — дополнительные partial-файлы
- `assets/` — ассеты
- `.github/workflows/deploy-pages.yml` — автодеплой в GitHub Pages

## Локальный запуск

### Вариант 1: открыть напрямую
Откройте `index.html` в браузере.

### Вариант 2: через локальный сервер
```bash
python3 -m http.server 4173
```
Откройте: `http://localhost:4173`

## Публикация на GitHub

1. Создайте репозиторий на GitHub.
2. Выполните в этой папке:
```bash
git init
git add .
git commit -m "Initial landing"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```
3. На GitHub откройте `Settings -> Pages`.
4. В `Build and deployment` выберите `Source: GitHub Actions`.
5. После push в `main` workflow `deploy-pages.yml` опубликует сайт автоматически.

## Примечания

- Проект без сборки и зависимостей.
- Служебные файлы (`.DS_Store`) исключены через `.gitignore`.
