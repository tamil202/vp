import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  isScrolled = signal(false);
  isMobileOpen = signal(false);
  activeSection = signal('home');

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  ngOnInit() {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 60);
    this.updateActiveSection();
  }

  updateActiveSection() {
    const ids = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          this.activeSection.set(id);
          break;
        }
      }
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    this.isMobileOpen.set(false);
  }

  toggleMobile() {
    this.isMobileOpen.update(v => !v);
  }
}
