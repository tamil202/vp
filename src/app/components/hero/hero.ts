import { Component, OnInit, AfterViewInit, ElementRef, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  shape: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  particles: Particle[] = [];
  nameLetters = 'VISHNUPRABHA'.split('');
  typedText = 'Software Engineer';
  private typeInterval: any;
  private currentRole = 0;
  private currentChar = 17; // length of 'Software Engineer'
  private isDeleting = false;

  roles = ['Software Engineer', 'Full-Stack Developer', 'Angular Specialist', 'NestJS Expert'];

  ngOnInit() {
    this.initParticles();
    this.startTypewriter();
  }

  ngAfterViewInit() {
    this.animateHero();
  }

  initParticles() {
    const colors = ['#f472b6', '#a855f7', '#ec4899', '#8b5cf6', '#fbbf24', '#fb7185'];
    const shapes = ['✦', '✧', '★', '✿', '◆', '✶', '⬡'];
    this.particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * 100,
      y: 100 + Math.random() * 20,
      size: Math.random() * 14 + 8,
      delay: Math.random() * 12,
      duration: Math.random() * 12 + 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    }));
  }

  startTypewriter() {
    const speed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;

    const type = () => {
      const current = this.roles[this.currentRole];
      if (this.isDeleting) {
        this.typedText = current.substring(0, this.currentChar - 1);
        this.currentChar--;
        if (this.currentChar === 0) {
          this.isDeleting = false;
          this.currentRole = (this.currentRole + 1) % this.roles.length;
          this.typeInterval = setTimeout(type, 500);
          return;
        }
        this.typeInterval = setTimeout(type, deleteSpeed);
      } else {
        this.typedText = current.substring(0, this.currentChar + 1);
        this.currentChar++;
        if (this.currentChar === current.length) {
          this.typeInterval = setTimeout(() => { this.isDeleting = true; type(); }, pauseTime);
          return;
        }
        this.typeInterval = setTimeout(type, speed);
      }
    };
    this.typeInterval = setTimeout(type, 800);
  }

  animateHero() {
    /* Name letters animate via CSS @keyframes (see hero.css .name-char).
       GSAP handles the remaining elements after the name animates in. */
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('.hero-greeting',   { opacity: 0, y: 30,  duration: 0.7, ease: 'back.out(1.7)' })
      .from('.hero-typewriter', { opacity: 0, x: -20, duration: 0.6, ease: 'power3.out' }, '+=0.8')
      .from('.hero-bio',        { opacity: 0, y: 20,  duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from('.hero-tech-stack', { opacity: 0, y: 15,  duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero-btns',       { opacity: 0, y: 20,  duration: 0.5, ease: 'back.out(1.5)' }, '-=0.2')
      .from('.scroll-indicator',{ opacity: 0,          duration: 0.4 });
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const xRatio = (e.clientX / window.innerWidth - 0.5) * 30;
    const yRatio = (e.clientY / window.innerHeight - 0.5) * 30;
    gsap.to('.orb-1', { x: xRatio * 1.2, y: yRatio * 1.2, duration: 1.5, ease: 'power2.out' });
    gsap.to('.orb-2', { x: -xRatio * 0.8, y: -yRatio * 0.8, duration: 1.5, ease: 'power2.out' });
    gsap.to('.orb-3', { x: xRatio * 0.6, y: -yRatio * 0.6, duration: 1.5, ease: 'power2.out' });
  }

  scrollToAbout() {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  ngOnDestroy() {
    clearTimeout(this.typeInterval);
  }
}
