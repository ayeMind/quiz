# QUIZ App

**Сайт для создания и прохождения викторин**

При создании викторины можно выбрать тип викторины:

- Стандартный: за каждый вопрос дают +1 балл
- Расширенный: за каждый вариант ответа каждого вопроса очки задаются самостоятельно (включая отрицательные)

Также вопросы могут быть как с возможностью выбрать только один вариант ответа, так и с возможностью выбирать сразу несколько. 

Для создания викторины сначала необходимо пройти авторизацию. Она сохранится в базе данных и будет доступна в каталоге. 

Уже сделанные викторины можно редактировать в разделе "Мои викторины"

**Стек: React, MobX, TailwindCSS, FastAPI, SQLAlchemy (Docker PostrgeSQL).**

![изображение](https://github.com/ayeMind/quiz/assets/119005871/752f2be9-c392-4ad6-9521-efe40f3dcc7c)

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
