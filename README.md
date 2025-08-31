# Frontend Assessment

A comprehensive solution to a frontend assessment featuring advanced JavaScript utilities, Angular best practices, Material theming, and a unified showcase for all features.

---

## Features

### JavaScript Tasks

- **Deep Copy Function**
  - Creates a deep copy of any object, including nested structures.
  - **Usage:**  
    ```js
    import { deepCopy } from 'src/js-tasks/deepCopy';
    deepCopy(obj);
    ```

- **Equivalence Check Function**
  - Checks if two objects are equivalent.
  - Treats `undefined` and `null` as equal.
  - Supports primitives, objects, arrays, and dates.
  - **Usage:**  
    ```js
    import { checkEquivalence } from 'src/js-tasks/checkEquivalence';
    checkEquivalence(obj1, obj2);
    ```

- **Code Execution Function**
  - Executes a string of JavaScript code with provided variables.
  - Always-available globals:  
    - `$math`: `{ sum(a, b), mul(a, b) }`
    - `$logger`: `console.log` alias
  - Named code for debugging.
  - **Usage:**  
    ```js
    import { executeCode } from 'src/js-tasks/executeCode';
    executeCode('$logger("Sum:", $math.sum(a, b))', { a: 17, b: 3 });
    executeCode('$logger("Mul:", $math.mul(a, b))', { a: 17, b: 3 });
    ```

---

### Angular Tasks

- **Custom Sort Pipe**
  - Sorts arrays by one or more criteria.
  - Supports ascending/descending (prefix with `-` for descending).
  - Works with primitives, objects, arrays, and dates.
  - **Usage:**  
    ```html
    <div>Sorted by name: {{ options | customSort:'name' }}</div>
    <div>Sorted by -price: {{ options | customSort:'-price' }}</div>
    <div>Sorted by name then -price: {{ options | customSort:['name','-price'] }}</div>
    ```

- **Repeater Component**
  - Repeats its content for each item in an input array.
  - Exposes the current item as `item` in the template.
  - **Usage:**  
    ```html
    <app-repeater [option]="options">
      <ng-template let-item>
        {{ item }}
      </ng-template>
    </app-repeater>
    ```

---

### Unified Showcase

- All tasks are integrated into a single Angular Material-based showcase.
- Menu-driven navigation for demos.
- Dark mode toggle.
- JS/TS interop via `.d.ts` files for seamless imports.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Setup

Install dependencies:
```bash
npm install
```

Install Angular Material (if not already):
```bash
ng add @angular/material
```

Install Sass compiler:
```bash
npm install sass --save-dev
```

---

### Running the App

```bash
npm start
# or
nx serve
```

### Running Tests

```bash
npm test
# or
nx test
```

---

## Project Structure

```
src/app/js-tasks/        # JavaScript utility functions (deepCopy, checkEquivalence, executeCode) and their .d.ts files
src/app/angular-tasks/   # Angular pipes and components (customSort, repeater)
src/app/showcase/        # Unified Angular Material showcase component
src/styles.scss          # Global styles and Material theming (including dark mode)
```

---

## Usage Notes

- All JS functions are available in Angular via TypeScript declaration files.
- Dark mode can be toggled from the UI; theming is handled via global and `.dark-theme` styles.
- All demos are accessible from the main showcase menu.

---

## License

[MIT](LICENSE)