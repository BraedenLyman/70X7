# 70X7 – Starter Clothing Brand Storefront

This is a starter React application for a clothing brand called **70X7**, focused on selling shirts.

It is built with **Vite + React** and includes:

- A home hero section themed around the 70×7 story (grace, second chances)
- A shirts collection grid with four starter products
- A slide-out cart with basic quantity controls and a subtotal

## Getting started

Make sure you have a recent version of **Node.js** (LTS recommended) and **npm** installed.

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`) in your browser.

## Project structure

- `src/App.jsx` – main storefront layout, hero, product grid, and cart drawer
- `src/data/products.js` – starter shirt product data
- `src/App.css` – layout and component styling for the 70X7 experience
- `src/index.css` – global base styles

## Next steps you can take

- Connect to a real backend or headless commerce platform for live inventory and checkout
- Swap the abstract shirt visuals for actual product photos
- Tune colors, copy, and typography to match your final brand guidelines

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
