import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Experience {
  period: string;
  role: string;
  company: string;
  type: string;
  color: string;
  points: string[];
  techs: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;

  experiences: Experience[] = [
    {
      period: '2026 — Present',
      role: 'Software Engineer',
      company: 'Stellar Innovation',
      type: 'Full-time',
      color: '#f472b6',
      points: [
        'Designed and developed RESTful backend services using NestJS and MySQL with performance optimization',
        'Built scalable Angular modules and reusable UI components with virtual scrolling support',
        'Optimized change detection strategies to support high-volume data tables',
        'Debugged and resolved critical production issues across the full application stack'
      ],
      techs: ['Angular', 'NestJS', 'MySQL', 'Redis', 'TypeScript']
    },
    {
      period: '2025 — 2026',
      role: 'Junior Software Engineer',
      company: 'Stellar Innovation',
      type: 'Full-time',
      color: '#a855f7',
      points: [
        'Implemented frontend features using Angular, TypeScript, and RxJS with REST API integration',
        'Handled validation logic and error boundary patterns across modules',
        'Resolved production defects across frontend and backend modules',
        'Supported release stabilization and deployment workflows'
      ],
      techs: ['Angular', 'RxJS', 'NestJS', 'TypeScript', 'JWT']
    },
    {
      period: '2024 — 2025',
      role: 'Junior Software Developer',
      company: 'Stellar Innovation',
      type: 'Full-time',
      color: '#8b5cf6',
      points: [
        'Developed Angular components and assisted in integrating backend APIs in production',
        'Built reusable UI modules following Angular best practices',
        'Supported feature enhancements and bug fixes collaborating with senior developers',
        'Contributed to code reviews and technical documentation'
      ],
      techs: ['Angular', 'TypeScript', 'REST API', 'Git', 'Jira']
    }
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('#experience .reveal, #experience .reveal-left, #experience .reveal-right, #experience .reveal-scale')
      .forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
