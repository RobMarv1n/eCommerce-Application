# Ecobazar 🌱

Ecobazar is a modern e-commerce website designed for selling fresh, organic vegetables and fruits grown without the use of chemicals and pesticides. The project provides a convenient and enjoyable user experience, allowing customers to easily find the products they need, place orders online, and receive high-quality goods with fast delivery.

## General Overview 🔍
- [Project Goals](#project-goals-) 🎯
- [Technical Stack](#technical-stack-%EF%B8%8F) 🛠️
- [Getting Started](#getting-started-%EF%B8%8F) ⚙️
- [Available Scripts](#available-scripts-) 📑
- [Contacts](#contacts-) 📩

## Project Goals 🎯
🎍 Make organic products more accessible through a simple and user-friendly online platform for ordering fresh fruits and vegetables directly from farmers.

🌱 Raise customer awareness about healthy eating and sustainable consumption.

🌍 Promote an eco-friendly lifestyle by offering only certified products without chemical additives.

🖥️ Create an intuitive and visually appealing interface that makes buying organic products easy and enjoyable.

## Technical Stack 🛠️
Our project is built using the following modern technologies and tools:
* **Frontend:** React (v19) for building the user interface, TypeScript for static typing, HTML and CSS/SCSS for structure and styling.
* **Build & Development:** Vite as a fast module bundler and development server.
* **Testing:** Ensures reliability with Vitest, a modern unit testing framework for Vite-based projects.
* **Code Quality & Formatting:**
    * ESLint: For static code analysis, finding issues, and maintaining a consistent style (with configurations for React, TypeScript, Prettier, Unicorn).
    * Prettier: For automatic code formatting.
    * Stylelint: For linting and maintaining order in CSS/SCSS code (with `stylelint-config-standard`, `stylelint-config-clean-order` configurations).
    * TypeScript: For ensuring type safety during development.
* **Git Hooks:** Husky and lint-staged for automatically running linters and formatters before commits.
* **Commit Linting:** Commitlint (with `config-conventional`) for ensuring commit messages adhere to the Conventional Commits standard.

## Getting Started ⚙️
To run the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/RobMarv1n/eCommerce-Application.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd ecommerce-application
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the project in development mode:**
    ```bash
    npm run dev
    ```
    After this, the project will be available in your browser at the address shown in the terminal (usually `http://localhost:5173`).

## Available Scripts 📑
In the project directory, you can run the following scripts:

* `npm run dev`:
    Starts the application in development mode using Vite.

* `npm run build`:
    Compiles TypeScript (`tsc -b`) and builds the project for production into the `dist` folder using Vite.

* `npm run preview`:
    Starts a local server to preview the production build from the `dist` folder.

* `npm run lint`:
    Runs ESLint to check project files against linting rules.

* `npm run format`:
    Automatically formats the project's code using Prettier.

* `npm run stylelint`:
    Runs Stylelint to check CSS/SCSS files against rules.

* `npm run test`:
    Runs tests written with Vitest.

* `npm run prepare`:
    This script is automatically called after `npm install` and sets up Git hooks using Husky. You usually don't need to run it manually.

## Contacts 📩
 - Alexey Kandyba (GitHub: [@robmarvin](https://github.com/RobMarv1n))
 - Sergey Elsukov (GitHub: [@sergeyado](https://github.com/Sergey-Ado))
 - Aleksey Zaderiy (GitHub: [@howlight](https://github.com/howlight))