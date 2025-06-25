# Guide: Implementing Material Buttons in `ButtonOverviewExample`

This document explains how Angular Material buttons are implemented in the `ButtonOverviewExample` component, located within the `src/app/button-examples/` directory.

## Component Files

The implementation is spread across three main files:

1.  **`button-examples.html`**: Contains the HTML structure for displaying various button types.
2.  **`button-examples.ts`**: The TypeScript file defining the component logic and importing necessary Material modules. (Class name: `ButtonOverviewExample`)
3.  **`button-overview-example.css`**: Contains the CSS styles for the component.

## 1. HTML Structure (`button-examples.html`)

The HTML file is structured to demonstrate different categories of Material buttons.

*   **Sections**: Each button category (e.g., Text, Elevated, Outlined) is wrapped in a `<section>` tag.
*   **Labels and Rows**:
    *   `<div class="example-label">`: Displays the category name.
    *   `<div class="example-button-row">`: Contains the buttons for that category.
*   **Material Button Directives**:
    *   **Basic Text Buttons**: `<button matButton>Basic</button>`
    *   **Elevated Buttons**: `<button mat-elevated-button>Basic</button>` (Note: The user provided `matButton="elevated"`, which is not the standard API. The correct directive is `mat-elevated-button`. This guide reflects the standard API. If the user's version works due to custom setup or older/alternative APIs, that's specific to their environment. For general Material guidance, `mat-elevated-button` is standard. Similar logic applies to `filled`, `tonal`, and `outlined`.)
    *   **Outlined Buttons**: `<button mat-stroked-button>Basic</button>` (Standard for outlined)
    *   **Filled Buttons**: `<button mat-flat-button>Basic</button>` (Standard for filled, non-elevated)
    *   **Tonal Buttons**: (Material Design 3 introduces tonal buttons. If using an older Angular Material version, this might be achieved with `mat-flat-button` and custom styling or a specific theme. The user provided `matButton="tonal"`. The closest standard is often `mat-flat-button` with appropriate theming.)
    *   **Disabled State**: Achieved by adding the `disabled` attribute: `<button matButton disabled>Disabled</button>`
    *   **Links as Buttons**: An anchor tag `<a>` can be styled as a Material button: `<a matButton href="..." target="_blank">Link</a>`
*   **Icon Buttons**:
    *   `<button matIconButton aria-label="Description"> <mat-icon>icon_name</mat-icon> </button>`
    *   `matIconButton` is used for circular buttons containing only an icon.
*   **Floating Action Buttons (FABs)**:
    *   **Standard FAB**: `<button matFab aria-label="Description"> <mat-icon>icon_name</mat-icon> </button>`
    *   **Mini FAB**: `<button matMiniFab aria-label="Description"> <mat-icon>icon_name</mat-icon> </button>`
    *   **Extended FAB**: `<button matFab extended> <mat-icon>icon_name</mat-icon> Label </button>`
*   **Dividers**:
    *   `<mat-divider></mat-divider>` is used to visually separate sections of buttons.

**Example Snippet (Text Buttons):**
```html
<section>
  <div class="example-label">Text</div>
  <div class="example-button-row">
    <button matButton>Basic</button>
    <button matButton disabled>Disabled</button>
    <a matButton href="https://www.google.com/" target="_blank">Link</a>
  </div>
</section>
<mat-divider/>
```

## 2. TypeScript (`button-examples.ts`)

The component `ButtonOverviewExample` is a standalone Angular component.

*   **`@Component` Decorator**:
    *   `selector: 'button-overview-example'`: How the component is used in other templates (though in this case, it's routed directly).
    *   `templateUrl: './button-examples.html'`: Links to the HTML file.
    *   `styleUrl: './button-overview-example.css'`: Links to the CSS file.
    *   `imports: [MatButtonModule, MatDividerModule, MatIconModule]`: This is crucial for standalone components. It explicitly imports the necessary Angular Material modules required by the template.
        *   `MatButtonModule`: Provides all the button directives (`matButton`, `matFab`, etc.).
        *   `MatDividerModule`: Provides the `<mat-divider>` component.
        *   `MatIconModule`: Provides the `<mat-icon>` component.

**Component Definition:**
```typescript
import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'button-overview-example',
  templateUrl: './button-examples.html',
  styleUrl: './button-overview-example.css',
  imports: [MatButtonModule, MatDividerModule, MatIconModule], // Key for standalone
})
export class ButtonOverviewExample {}
```

## 3. CSS (`button-overview-example.css`)

The CSS file provides basic styling for layout and presentation.

*   `section`: Uses flexbox to align items.
*   `.example-label`: Styles the text label for each button category.
*   `.example-button-row`: Manages the layout of buttons within a row, including margins.
*   `.example-flex-container`: Used for icon and FAB button sections to manage spacing.

**Example CSS Snippet:**
```css
section {
  display: flex;
  align-items: center;
}

.example-label {
  font-size: 14px;
  margin: 0 16px 0 8px;
  min-width: 120px;
}

.example-button-row .mat-mdc-button-base { /* Targets Material buttons */
  margin: 8px 8px 8px 0;
}
```

## Key Angular Material Concepts Used

*   **Standalone Components**: `ButtonOverviewExample` is a standalone component. This means it declares its own dependencies (like `MatButtonModule`) directly in its `imports` array within the `@Component` decorator, rather than relying on an `NgModule`.
*   **Material Button Directives**: A suite of attribute directives (`matButton`, `mat-elevated-button`, `mat-stroked-button`, `mat-flat-button`, `matIconButton`, `matFab`, `matMiniFab`) are used to style native `<button>` and `<a>` elements with Material Design button styles.
*   **Material Icon (`<mat-icon>`)**: Used to display icons within buttons, typically from the Material Icons font.
*   **Material Divider (`<mat-divider>`)**: A component used to create thematic breaks between content sections.

This setup provides a comprehensive overview of various button types available in Angular Material and how to use them within a standalone component structure. Remember to always import the necessary Material modules into your standalone component's `imports` array.
