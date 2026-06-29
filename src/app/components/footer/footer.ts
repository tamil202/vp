import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  year = new Date().getFullYear();

  navLinks = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

  scrollTo(id: string) {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
