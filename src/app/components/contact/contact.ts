import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  sent = false;

  form = { name: '', email: '', subject: '', message: '' };

  contactInfo = [
    { icon: '📧', label: 'Email', value: 'vishnukprahbak@gmail.com', href: 'mailto:vishnukprahbak@gmail.com' },
    { icon: '📞', label: 'Phone', value: '+91 93441 54479', href: 'tel:+919344154479' },
    { icon: '📍', label: 'Location', value: 'Tamil Nadu, India', href: null }
  ];

  socials = [
    { icon: 'GH', label: 'GitHub', color: '#f1f5f9' },
    { icon: 'LI', label: 'LinkedIn', color: '#0ea5e9' },
    { icon: 'TW', label: 'Twitter', color: '#38bdf8' }
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('#contact .reveal, #contact .reveal-left, #contact .reveal-right')
      .forEach(el => this.observer!.observe(el));
  }

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.sent = true;
    setTimeout(() => {
      this.sent = false;
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 4000);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
