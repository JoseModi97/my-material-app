import { Component } from '@angular/core';
// RouterOutlet removed as MainLayoutComponent will handle its own routing content area
// Material modules (MatSidenavModule, etc.) are also removed as MainLayoutComponent is standalone and imports what it needs.
import { MainLayout } from './main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [
    MainLayout
  ],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App {
  protected title = 'my-material-app';
}
