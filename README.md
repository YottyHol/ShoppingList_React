# Mayden Shopping Task

## Overview

As a healthcare company, there is a focus on healthy eating and an easy way to keep track of what is needed, what needs to be purchased, and spending within budget constraints.  
This project is a shopping list application built to satisfy that objective through a set of user stories.

## How To Run

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

This starts the Vite dev server.

### Run tests

```bash
npm run test
```

### Run tests once (CI-style)

```bash
npm run test:run
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Formatting

```bash
npm run format
npm run format:check
```

## Approach

### Time commitment and story selection

- Agreed time budget: up to **6 hours**.
- Actual time spent: approximately **5-6 hours**, including implementation, tests, and documentation.
- Story selection strategy: prioritise the highest value stories that deliver a complete and usable core experience first, then add targeted stretch stories where time allows.
- Implemented priorities:
  - Core CRUD stories (stories 1-4) to make the shopping list functional for daily use.
  - Additional stories (5, 7, 8) to improve practical value, especially budgeting and persistence.
- Trade-off notes:
  - Reordering is useful, but robust drag-and-drop ordering introduces additional complexity around indexing and UX.
  - Features such as email/login are valuable in larger products, but were deprioritised for this time boxed task in favour of core list and budgeting utility.

### Technology stack choice

- Stack used: **React + TypeScript + Vite + Vitest**.
- This stack was chosen for quick iteration, maintainability, and strong confidence in testing.
- Styling approach: Tailwind was selected over a larger UI framework to keep the build lightweight and allow granular control.

### Testing

- Current automated tests focus on success path behaviour for key flows.
- A natural next step would be to extend coverage for validation, edge cases, and error states.
- As this is currently frontend-only (no backend integration), runtime risk is lower, but additional negative case tests would still strengthen confidence.

## Final Note: Comparison To Previous Vue Example

- Previous implementation (Vue): [ShoppingList_GUI](https://github.com/YottyHol/ShoppingList_GUI)
- Key differences in this version:
  - **Stack:** React instead of Vue/PrimeVue, with a smaller and simpler setup for this scope.
  - **Story priorities:** This time budgeting and persistence were prioritised over reordering to better match the brief's practical goals.
  - **State management:** Vuex + API fetching in the earlier project vs Zustand + local persistence in this one, keeping closer to the selected user stories.
