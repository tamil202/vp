import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  current: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private statsAnimated = false;

  stats: Stat[] = [
    { value: 2, suffix: '+', label: 'Years Experience', icon: '⚡', current: 0 },
    { value: 4, suffix: '+', label: 'Projects Completed', icon: '🚀', current: 0 },
    { value: 2, suffix: '+', label: 'Roles Held', icon: '💼', current: 0 },
    { value: 15, suffix: '+', label: 'Technologies', icon: '🛠️', current: 0 }
  ];

  highlights = [
    { icon: '🎯', text: 'Angular & NestJS specialist' },
    { icon: '🔧', text: 'RESTful API architecture' },
    { icon: '⚡', text: 'Performance optimization' },
    { icon: '🎨', text: 'Reusable UI component systems' },
    { icon: '🗄️', text: 'MySQL database schema design' },
    { icon: '🔴', text: 'Redis caching strategies' }
  ];

  ngAfterViewInit() {
    this.setupRevealObserver();
    this.setupStatsObserver();
  }

  setupRevealObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('#about .reveal, #about .reveal-left, #about .reveal-right, #about .reveal-scale')
      .forEach(el => this.observer!.observe(el));
  }

  setupStatsObserver() {
    const statsEl = document.querySelector('.about-stats');
    if (!statsEl) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.statsAnimated) {
        this.statsAnimated = true;
        this.animateStats();
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(statsEl);
  }

  animateStats() {
    this.stats.forEach((stat, i) => {
      const duration = 1500;
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        stat.current = Math.round(eased * stat.value);
        if (progress < 1) requestAnimationFrame(animate);
        else stat.current = stat.value;
      };
      setTimeout(() => requestAnimationFrame(animate), i * 150);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
