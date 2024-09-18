import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isMinimized: boolean = true;  // Inicialmente minimizado
  isMobile: boolean = false;
  isMenuOpen: boolean = false;

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 329;
    this.isMinimized = this.isMobile ? true : this.isMinimized;
    
    if (!this.isMobile) {
      this.isMenuOpen = false;
    }
  }

  toggleSidebar() {
    this.isMinimized = !this.isMinimized;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
