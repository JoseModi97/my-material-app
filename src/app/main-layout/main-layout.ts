import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // For ngIf, ngFor, etc.
import { RouterOutlet } from '@angular/router'; // If you plan to use routing within the content

@Component({
  selector: 'app-main-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.sass'
})
export class MainLayout {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  opened = true; // Sidenav starts opened

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
