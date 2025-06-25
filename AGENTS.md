# Agent Instructions: Understanding and Modifying Routing

This document provides guidance for AI agents (and human developers) on how routing is implemented in this Angular project.

## Overview

This project uses Angular's component router to manage navigation between different views. Routes are defined, and navigation UI elements (like menu links) use `routerLink` directives to trigger navigation.

## Key Files and Concepts

1.  **`src/app/app.routes.ts`**:
    *   This is the primary file where application routes are defined.
    *   It exports a `const routes: Routes` array.
    *   Each route object in this array typically has a `path` (the URL segment) and a `component` (the Angular component to display for that path).
    *   Example: `{ path: 'button-examples', component: ButtonOverviewExample }`

2.  **`src/app/app.config.ts`**:
    *   This file contains the application configuration, including how the router is initialized.
    *   The `provideRouter(routes)` function (imported from `@angular/router`) is used in the `providers` array. This makes the defined `routes` available to the application.

3.  **`src/app/main-layout/main-layout.html`**:
    *   This HTML file for the `MainLayoutComponent` contains the main navigation structure (e.g., the sidenav menu).
    *   Navigation links use the `routerLink` directive to specify the destination path.
    *   Example: `<a mat-list-item routerLink="/button-examples">Button Examples</a>`
    *   It also contains a `<router-outlet></router-outlet>` tag where the routed components are rendered.

4.  **`src/app/main-layout/main-layout.ts`**:
    *   This is the TypeScript file for the `MainLayoutComponent`.
    *   Since `MainLayoutComponent` is a standalone component and its template (`main-layout.html`) uses `routerLink` and `<router-outlet>`, it must import `RouterModule` into its `imports` array.
    *   `CommonModule` is also typically imported for common directives like `*ngIf`, `*ngFor`.

5.  **Routed Components (e.g., `src/app/button-examples/button-examples.ts`)**:
    *   These are the components that are displayed when a route is activated.
    *   They are standard Angular components.
    *   Ensure they are correctly imported and referenced in `src/app/app.routes.ts`.

## How to Add a New Route and Navigation Link

1.  **Generate your Component**:
    *   Use the Angular CLI: `ng generate component your-feature-name`
    *   This will create the necessary HTML, TS, CSS/SASS, and spec files.

2.  **Define the Route**:
    *   Open `src/app/app.routes.ts`.
    *   Import your newly created component: `import { YourFeatureNameComponent } from './your-feature-name/your-feature-name.component';`
    *   Add a new route object to the `routes` array:
        ```typescript
        { path: 'your-feature-path', component: YourFeatureNameComponent }
        ```

3.  **Add a Navigation Link**:
    *   Open `src/app/main-layout/main-layout.html`.
    *   Add a new list item (or other appropriate UI element) for navigation:
        ```html
        <a mat-list-item routerLink="/your-feature-path">
          <mat-icon matListItemIcon>your_icon</mat-icon> <!-- Optional icon -->
          <span matListItemTitle>Your Feature Name</span>
        </a>
        ```

4.  **Component Imports**:
    *   Ensure your new component (`your-feature-name.component.ts`) imports any necessary modules it uses directly (e.g., `MatButtonModule`, `MatIconModule` if it's a standalone component).

5.  **Testing**:
    *   Run the application (`ng serve`) and test that your new link appears in the navigation and that clicking it correctly loads your new component.

By following these conventions, you can effectively manage and extend the navigation capabilities of this application.
