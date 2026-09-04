import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechIconsComponent } from '../tech-icons/tech-icons';
import { ParallaxDirective } from '../../directives/parallax';

interface ExperienceGroup {
  label: string;
  points: string[];
}

interface Experience {
  period: string;
  role: string;
  company: string;
  type: string;
  color: string;
  groups: ExperienceGroup[];
  techs: string[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TechIconsComponent, ParallaxDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private lineObserver: IntersectionObserver | null = null;

  experiences: Experience[] = [
    {
      period: 'Jan 2024 — Present',
      role: 'Software Engineer',
      company: 'Stellar Innovation',
      type: 'Full-time',
      color: '#f472b6',
      groups: [
        {
          label: 'Backend',
          points: [
            'Designed and built RESTful APIs using NestJS, Node.js & Express.js with modular, maintainable service layers',
            'Modeled MySQL schemas with Prisma & Sequelize ORMs, adding JWT auth and Redis caching for secure, high-performance access',
            'Profiled and resolved backend performance bottlenecks, reducing query latency under production load'
          ]
        },
        {
          label: 'Frontend',
          points: [
            'Built scalable Angular modules and reusable UI component libraries used across multiple internal applications',
            'Implemented virtual scrolling and optimized change detection for smooth rendering of high-volume data tables',
            'Developed features end-to-end with Angular, TypeScript, RxJS, NgRx & Angular Signals, integrating REST APIs with full validation'
          ]
        },
        {
          label: 'Growth',
          points: [
            'Investigated and resolved production defects across frontend and backend, supporting multiple stable release cycles',
            'Promoted twice in two years — Junior Software Developer → Junior Software Engineer → Software Engineer'
          ]
        }
      ],
      techs: ['Angular', 'NestJS', 'MySQL', 'Redis', 'TypeScript']
    },
    {
      period: 'Sep 2022 — Dec 2023',
      role: 'Associate Software Engineer — Marketing Professional',
      company: 'Webberax',
      type: 'Full-time',
      color: '#a855f7',
      groups: [
        {
          label: '',
          points: [
            'Planned and executed large-scale bulk email marketing campaigns via PMTA on a dedicated IP, maximizing inbox placement',
            'Configured mail server infrastructure — DKIM, SPF, DMARC, and MX records — to meet email authentication standards',
            'Monitored server logs, bounce rates, and blacklist status to diagnose and resolve deliverability issues',
            'Maintained dedicated IP reputation through warm-up schedules and volume management across campaigns'
          ]
        }
      ],
      techs: ['PMTA', 'DKIM / SPF / DMARC', 'Mail Server Admin', 'Deliverability']
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

    const lineFill = document.querySelector('.timeline-line-fill');
    if (lineFill) {
      this.lineObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          lineFill.classList.add('drawn');
          this.lineObserver?.disconnect();
        }
      }, { threshold: 0.15 });
      this.lineObserver.observe(lineFill);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.lineObserver?.disconnect();
  }
}
