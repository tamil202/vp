import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

// ─── EmailJS config ───────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add an Email Service (Gmail/Outlook) → copy Service ID
// 3. Create an Email Template with variables:
//    {{from_name}}, {{from_email}}, {{subject}}, {{message}}
//    → copy Template ID
// 4. Go to Account → API Keys → copy Public Key
const EJ_SERVICE  = 'YOUR_SERVICE_ID';
const EJ_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EJ_PUBLIC   = 'YOUR_PUBLIC_KEY';
// ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  sent    = false;
  sending = false;
  error   = '';

  form = { name: '', email: '', subject: '', message: '' };

  contactInfo = [
    { icon: '📧', label: 'Email',    value: 'vishnukprahbak@gmail.com', href: 'mailto:vishnukprahbak@gmail.com' },
    { icon: '📞', label: 'Phone',    value: '+91 93441 54479',           href: 'tel:+919344154479' },
    { icon: '📍', label: 'Location', value: 'Tamil Nadu, India',         href: null }
  ];

  socials = [
    { icon: 'GH', label: 'GitHub',   color: '#f1f5f9' },
    { icon: 'LI', label: 'LinkedIn', color: '#0ea5e9' },
    { icon: 'TW', label: 'Twitter',  color: '#38bdf8' }
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

  async onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.sending = true;
    this.error   = '';

    // If EmailJS is not yet configured, fall back to mailto:
    if (EJ_SERVICE === 'YOUR_SERVICE_ID') {
      this.sendViaMailto();
      return;
    }

    try {
      await emailjs.send(
        EJ_SERVICE,
        EJ_TEMPLATE,
        {
          from_name:  this.form.name,
          from_email: this.form.email,
          subject:    this.form.subject || 'Portfolio Contact',
          message:    this.form.message,
          reply_to:   this.form.email
        },
        EJ_PUBLIC
      );
      this.onSuccess();
    } catch {
      // EmailJS failed — fall back to mailto: so message is never lost
      this.sendViaMailto();
    }
  }

  private sendViaMailto() {
    const body    = `Name: ${this.form.name}\nEmail: ${this.form.email}\n\n${this.form.message}`;
    const subject = this.form.subject || 'Portfolio Contact';
    window.location.href =
      `mailto:vishnukprahbak@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    this.onSuccess();
  }

  private onSuccess() {
    this.sending = false;
    this.sent    = true;
    setTimeout(() => {
      this.sent = false;
      this.form = { name: '', email: '', subject: '', message: '' };
    }, 4000);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
