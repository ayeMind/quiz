# QUIZ App

Бета-версия. Пока не доступен онлайн, не сделаны все виды викторин, не доделан дизайн

Сайт для создания и прохождения викторин, с возможностью мультиплеера

Планируемый стек: React, MobX, TailwindCSS, FastAPI, SQLAlchemy (Docker PostrgeSQL). Возможно, мобильная версия (Flutter / Kotlin). За неимением устройств Apple, если она и будет, то скорее всего на Kotlin

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
